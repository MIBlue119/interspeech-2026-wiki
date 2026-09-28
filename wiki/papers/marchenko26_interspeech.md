---
id: marchenko26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-579
---

# TIMBRE: Layer-Wise Cross-Lingual Speech Emotion Recognition Across 49 Layers and 26 Corpora

**TL;DR** — The largest layer-wise study of cross-lingual speech emotion recognition to date (31,850 experiments), pinpointing a specific mid-depth wav2vec2 layer that transfers best across languages and showing acoustic features still win on some corpora.

## Problem

It is unclear which layer of a large multilingual self-supervised model like wav2vec2-xls-r-1b best supports cross-lingual, cross-corpus speech emotion recognition, and how language typology affects this.

## Method

Runs linear probing of mean-pooled representations from all 49 layers of wav2vec2-xls-r-1b across 26 corpora, 23 languages, and 14 language families, a 49×26×26 tensor of 31,850 experiments, and compares against 27-dimensional hand-crafted acoustic features on the same 26×26 matrix.

## Results

Cross-corpus transfer peaks at layer 15 (31% depth, F1=0.392) and collapses by 24.6% at layer 45; Romance languages show a U-shaped depth profile and tonal languages show growing advantage with depth; mean-pooled wav2vec2 outperforms acoustic features by 41% overall (F1 0.355 vs 0.252), though acoustic features still win on 3 of 26 corpora at far lower compute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides layer selection and feature choice when building cross-lingual speech emotion recognition systems, including low-compute deployments.

## Related

- (link related pages by id as the wiki grows)
