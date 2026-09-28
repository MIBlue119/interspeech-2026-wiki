---
id: getman26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-50
---

# Data Filtering Trade-offs in Self-Supervised Speech Representation Learning: A Study on Unconstrained Broadcast Audio

**TL;DR** — A controlled comparison of pretraining-data filtering strategies for self-supervised speech models finds that neural VAD combined with language ID substantially improves downstream ASR, but no single filtering strategy is best for every metric.

## Problem

When preparing raw broadcast audio for self-supervised pretraining, common filtering choices (keep only speech, restrict to the target language) are typically made by heuristic without systematic evaluation of their downstream effects.

## Method

The authors compare four filtering strategies of increasing selectivity on Finnish broadcast data — no filtering, energy-based VAD, neural VAD, and neural VAD plus language ID — measuring effects on ASR accuracy, general audio understanding, and preprocessing cost.

## Results

Energy-based VAD consistently hurts representation quality versus no filtering; neural VAD substantially helps ASR, especially combined with LID (up to 12.7 points absolute WER reduction using only 42% of the data), but more selective filtering degrades general audio understanding by up to 9 points, showing no universally optimal strategy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides practitioners curating large-scale broadcast or web audio corpora for self-supervised pretraining on how to balance filtering aggressiveness against downstream task needs.

## Related

- (link related pages by id as the wiki grows)
