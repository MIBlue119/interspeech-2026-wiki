# /// script
# requires-python = ">=3.11"
# dependencies = ["typesafe-sdk"]
# ///
"""Step 2 of the Related pipeline: judge every paper pair with TypeSafe (Jev).

By default every unordered pair of the 1379 papers is judged (~950k requests);
`--candidates` restricts the run to the TF-IDF shortlist from candidates.py.
One request per pair asks two questions over the same state:
  - relatedness (Score, 0-3): how useful one paper is to a reader of the other
  - relation    (Choice):     what the two papers share

Results are appended to data/related/raw/scores.jsonl; reruns skip pairs already scored.

    TYPESAFE_API_KEY=... uv run scripts/related/score.py [--candidates] [--limit N] [--concurrency 64]
"""

import argparse
import asyncio
import json
import itertools
import sys
from pathlib import Path

from typesafe_sdk import AsyncTypeSafeClient, Choice, Score

ROOT = Path(__file__).resolve().parents[2]
DIR = ROOT / "data" / "related"
MODEL = "jev-latest"

RELATEDNESS = Score(
    instructions=(
        "Two Interspeech 2026 papers are given as `paper_a` and `paper_b`. "
        "How related are they, from the point of view of a researcher who just read one "
        "and is deciding whether the other is worth reading next?"
    ),
    criteria=[
        "Unrelated: they only share the broad field of speech and audio processing.",
        "Same broad area (for example both are ASR papers) but they address different problems with different techniques, so reading one gives little reason to read the other.",
        "They share a specific problem, target population, setting, or core technique (for example both use pseudo-labeling, or both target elderly speech), so a reader of one would find the other useful.",
        "They tackle essentially the same problem, or one is a direct alternative, baseline, or extension of the other, so their results are directly comparable.",
    ],
)

RELATION = Choice(
    instructions="What is the main thing `paper_a` and `paper_b` have in common?",
    criteria={
        "same-problem": "They target the same task, population, or application setting, whatever their methods.",
        "same-technique": "They share a core method or modelling idea, applied to different problems.",
        "same-data-or-evaluation": "Their main overlap is a dataset, benchmark, metric, or evaluation methodology.",
        "complementary": "One produces a resource, analysis, or component that the other's line of work could directly use.",
        "none": "Nothing specific beyond the broad field.",
    },
)


def card(p: dict) -> dict:
    return {
        "title": p["title"],
        "category": p["category"],
        "labels": p["labels"],
        "tldr": p["tldr"],
    }


async def score_pair(client, papers, a, b):
    r = await client.system_one(
        model=MODEL,
        state={"paper_a": card(papers[a]), "paper_b": card(papers[b])},
        questions={"relatedness": RELATEDNESS, "relation": RELATION},
    )
    s, c = r.scores["relatedness"], r.choices["relation"]
    return {
        "a": a, "b": b,
        "s": round(s.score, 3), "sc": round(s.confidence, 3),
        "r": c.choice, "rc": round(c.confidence, 3),
    }, r.usage.input_tokens or 0


async def worker(client, papers, queue, out, stats):
    while True:
        pair = await queue.get()
        if pair is None:
            return
        try:
            row, tok = await score_pair(client, papers, *pair)
        except Exception as e:  # keep going; failed pairs are retried on the next run
            stats["failed"] += 1
            print(f"FAIL {pair[0]} {pair[1]}: {e}", file=sys.stderr)
            continue
        out.write(json.dumps(row) + "\n")
        stats["done"] += 1
        stats["tok"] += tok
        if stats["done"] % 10000 == 0:
            out.flush()
            print(f"  {stats['done']:,} scored, {stats['failed']} failed, {stats['tok']:,} input tokens", file=sys.stderr)


async def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--candidates", action="store_true", help="only the TF-IDF shortlist")
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--concurrency", type=int, default=64)
    args = ap.parse_args()

    papers = json.loads((DIR / "papers.json").read_text())
    if args.candidates:
        pairs = [(d["a"], d["b"]) for d in map(json.loads, (DIR / "candidates.jsonl").open())]
    else:
        pairs = list(itertools.combinations(sorted(papers), 2))
    scores_path = DIR / "raw" / "scores.jsonl"
    scores_path.parent.mkdir(parents=True, exist_ok=True)
    done = set()
    if scores_path.exists():
        done = {(d["a"], d["b"]) for d in map(json.loads, scores_path.open())}
    todo = [p for p in pairs if p not in done]
    if args.limit:
        todo = todo[: args.limit]
    print(f"{len(pairs):,} pairs, {len(done):,} already scored, {len(todo):,} to go", file=sys.stderr)

    stats = {"done": 0, "failed": 0, "tok": 0}
    queue: asyncio.Queue = asyncio.Queue(maxsize=args.concurrency * 4)
    async with AsyncTypeSafeClient() as client:
        with scores_path.open("a") as out:
            workers = [asyncio.create_task(worker(client, papers, queue, out, stats)) for _ in range(args.concurrency)]
            for p in todo:
                await queue.put(p)
            for _ in workers:
                await queue.put(None)
            await asyncio.gather(*workers)
    print(f"done: {stats['done']:,} scored, {stats['failed']} failed, {stats['tok']:,} input tokens", file=sys.stderr)


if __name__ == "__main__":
    asyncio.run(main())
