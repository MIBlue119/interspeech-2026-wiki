---
id: truong26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1098
---

# QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection

**TL;DR** — QAMO replaces one-class deepfake detection's single bona-fide centroid with multiple quality-aware centroids representing distinct speech-quality subspaces, plus an ensemble scoring strategy that needs no quality labels at inference, reaching 5.21% EER on the In-the-Wild benchmark.

## Problem

One-class learning (OCL) detects unseen deepfakes by modeling a compact distribution of bona fide speech around a single centroid, but this oversimplifies the bona fide class and ignores useful cues like speech quality/naturalness.

## Method

QAMO (Quality-Aware Multi-Centroid One-Class Learning) introduces multiple quality-aware centroids, each optimized to represent a distinct speech-quality subspace to better capture intra-class variability of bona fide speech, and supports a multi-centroid ensemble scoring strategy that improves the decision threshold and removes the need for quality labels at inference.

## Results

QAMO achieves a 5.21% equal error rate on the In-the-Wild dataset, outperforming prior one-class-learning and quality-aware speech deepfake detection systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improves robustness of speech deepfake/spoofing detectors deployed against unseen synthesis methods in real-world ('in the wild') audio.

## Related

- (link related pages by id as the wiki grows)
