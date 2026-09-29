# /// script
# requires-python = ">=3.11"
# ///
"""Step 3 of the Related pipeline: rewrite each wiki page's `## Related` section.

Reads the TypeSafe judgments in data/related/raw/scores.jsonl (every paper pair) and,
per paper, lists up to MAX_LINKS neighbours whose relatedness score reaches MIN_SCORE
(0-3 scale). Only the Related section is touched; everything else on the page is left
as is. Also writes data/related/top.jsonl: each paper's TOP_KEEP best neighbours, the
committed (git-sized) slice of the raw scores.

    uv run scripts/related/write.py
"""

import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WIKI = ROOT / "wiki" / "papers"
SCORES = ROOT / "data" / "related" / "raw" / "scores.jsonl"
TOP = ROOT / "data" / "related" / "top.jsonl"
MAX_LINKS = 5
TOP_KEEP = 20
MIN_SCORE = 1.5

RELATION_LABEL = {
    "same-problem": "same problem",
    "same-technique": "shared technique",
    "same-data-or-evaluation": "shared data / evaluation",
    "complementary": "complementary",
    "none": "",
}

SECTION = re.compile(r"^## Related\n.*?(?=^## |\Z)", re.S | re.M)


def title_of(page: str) -> str:
    return re.search(r"^# (.+)$", page, re.M).group(1).strip()


def main() -> None:
    pages = {p.stem: p.read_text() for p in WIKI.glob("*.md")}
    titles = {pid: title_of(t) for pid, t in pages.items()}

    neighbours = defaultdict(list)
    for d in map(json.loads, SCORES.open()):
        for x, y in ((d["a"], d["b"]), (d["b"], d["a"])):
            neighbours[x].append((d["s"], d["sc"], y, d["r"]))

    with TOP.open("w") as f:
        for pid in sorted(neighbours):
            for s, sc, other, rel in sorted(neighbours[pid], reverse=True)[:TOP_KEEP]:
                f.write(json.dumps({"id": pid, "other": other, "score": s, "score_conf": sc, "relation": rel}) + "\n")

    counts = defaultdict(int)
    for pid, text in pages.items():
        picks = sorted((n for n in neighbours[pid] if n[0] >= MIN_SCORE), reverse=True)[:MAX_LINKS]
        counts[len(picks)] += 1
        if picks:
            lines = []
            for score, _, other, rel in picks:
                label = RELATION_LABEL.get(rel, "")
                note = f"{label} · " if label else ""
                lines.append(f"- [{titles[other]}]({other}.md) — {note}relatedness {score:.1f}/3")
            body = "\n".join(lines)
        else:
            body = "- No closely related Interspeech 2026 papers found."
        section = (
            "## Related\n\n"
            + body
            + "\n\n<sub>All 950k paper pairs scored by TypeSafe Jev "
            "(`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>\n"
        )
        new, n = SECTION.subn(lambda _: section, text, count=1)
        if n == 0:
            new = text.rstrip("\n") + "\n\n" + section
        if new != text:
            (WIKI / f"{pid}.md").write_text(new)

    dist = ", ".join(f"{k} links: {counts[k]}" for k in sorted(counts))
    print(f"{len(pages)} pages written ({dist})", file=sys.stderr)


if __name__ == "__main__":
    main()
