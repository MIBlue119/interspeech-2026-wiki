---
id: kim26z_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3467
---

# AudioGround: Fine-Grained Temporal Grounding in Audio via Deterministic Boundary Supervision

**TL;DR** — A new instruction-tuning dataset with exact timestamp labels, plus a SALMONN extension that conditions on those timestamps, teaches Large Audio Language Models to say not just what sound happened but when.

## Problem

Large Audio Language Models can describe the sounds present in audio but generally cannot localize when they occur, a critical gap for real applications; prior temporal-reasoning attempts either use coarse multiple-choice distinctions or rely on unverifiable LLM-inferred timestamps.

## Method

The authors build AudioGround-IT, a time-aware audio instruction-tuning dataset with deterministic boundary supervision (49.9K instructions over 835 hours of audio across four temporal tasks), and propose AudioGround, a lightweight extension of SALMONN using a sliding-window Q-Former to compress encoder features while conditioning on timestamps and absolute time embeddings.

## Results

Across multiple temporal grounding benchmarks, AudioGround substantially outperforms prior LALMs, showing that deterministic boundary supervision transfers effectively to real-world audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio event localization for surveillance, media indexing/search, and any audio-LLM application needing precise "when did this happen" answers, not just "what happened."

## Related

- (link related pages by id as the wiki grows)
