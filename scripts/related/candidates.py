# /// script
# requires-python = ">=3.11"
# dependencies = ["scikit-learn", "numpy"]
# ///
"""Step 1 of the Related pipeline: build a candidate shortlist per paper.

TF-IDF over each wiki page's title + TL;DR + key contributions + method, cosine
similarity, plus a small boost for a shared category / labels. Emits the top-K
neighbours per paper, deduplicated into unordered pairs, for TypeSafe to judge.

    uv run scripts/related/candidates.py            # writes data/related/candidates.jsonl
"""

import json
import re
import sys
from pathlib import Path

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

ROOT = Path(__file__).resolve().parents[2]
WIKI = ROOT / "wiki" / "papers"
OUT = ROOT / "data" / "related" / "candidates.jsonl"
TOP_K = 20


def section(body: str, name: str) -> str:
    m = re.search(rf"^## {re.escape(name)}\n+(.*?)(?=^## |\Z)", body, re.S | re.M)
    return m.group(1).strip() if m else ""


def parse(path: Path) -> dict:
    text = path.read_text()
    _, front, body = text.split("---", 2)
    meta = {}
    for line in front.strip().splitlines():
        k, _, v = line.partition(":")
        meta[k.strip()] = v.strip()
    labels = [x.strip() for x in meta.get("labels", "").strip("[]").split(",") if x.strip()]
    title = re.search(r"^# (.+)$", body, re.M).group(1).strip()
    tldr = re.search(r"^\*\*TL;DR\*\* — (.+)$", body, re.M)
    return {
        "id": meta["id"],
        "title": title,
        "category": meta.get("category", ""),
        "labels": labels,
        "tldr": tldr.group(1).strip() if tldr else "",
        "contributions": section(body, "Key contributions"),
        "method": section(body, "Method"),
    }


def main() -> None:
    papers = [parse(p) for p in sorted(WIKI.glob("*.md"))]
    docs = [
        " ".join([p["title"]] * 3 + [p["tldr"]] * 2 + [p["contributions"], p["method"][:2000]])
        for p in papers
    ]
    vec = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=2, max_df=0.3, sublinear_tf=True)
    X = vec.fit_transform(docs)
    sim = (X @ X.T).toarray()

    cats = np.array([p["category"] for p in papers])
    sim += 0.05 * (cats[:, None] == cats[None, :])
    labelsets = [set(p["labels"]) for p in papers]
    for i, a in enumerate(labelsets):
        for j, b in enumerate(labelsets):
            if a and b:
                sim[i, j] += 0.02 * len(a & b)
    np.fill_diagonal(sim, -1)

    pairs: dict[tuple[str, str], float] = {}
    for i, p in enumerate(papers):
        for j in np.argsort(-sim[i])[:TOP_K]:
            key = tuple(sorted((p["id"], papers[j]["id"])))
            pairs[key] = max(pairs.get(key, 0.0), float(sim[i, j]))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w") as f:
        for (a, b), s in sorted(pairs.items()):
            f.write(json.dumps({"a": a, "b": b, "tfidf": round(s, 4)}) + "\n")
    (OUT.parent / "papers.json").write_text(
        json.dumps({p["id"]: {k: p[k] for k in ("title", "category", "labels", "tldr", "contributions")} for p in papers}, ensure_ascii=False)
    )
    print(f"{len(papers)} papers -> {len(pairs)} unordered candidate pairs (top {TOP_K} each)", file=sys.stderr)


if __name__ == "__main__":
    main()
