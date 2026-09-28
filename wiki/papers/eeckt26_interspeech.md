---
id: eeckt26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3169
---

# Parameter-Efficient Continual Learning for Automatic Speech Recognition

**TL;DR** — Restricting adaptation to low-energy singular-value subspaces of pretrained weights reduces catastrophic forgetting when continually fine-tuning ASR foundation models on new tasks.

## Problem

Sequentially fine-tuning large speech foundation models on new ASR tasks causes catastrophic forgetting of earlier tasks, and parameter-efficient continual learning (PECL), though studied in NLP and vision, has received little attention for ASR.

## Method

The authors partition pretrained weight matrices into head and tail subspaces by singular value, restrict adaptation to approximate rotations within the low-energy tail subspace to preserve dominant components, and combine rotations from successive tasks via weight averaging to further reduce forgetting.

## Results

Reduces forgetting and achieves superior overall performance compared to recent PECL baselines across two benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Continually updating deployed ASR systems with new domains or languages without full retraining or degrading previously learned tasks.

## Related

- (link related pages by id as the wiki grows)
