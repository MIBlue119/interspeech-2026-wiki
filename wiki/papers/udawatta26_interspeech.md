---
id: udawatta26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1579
---

# Phonetically Grounded Vowel Space Metrics for Evaluating Synthetic Speech During TTS Model Training

**TL;DR** — Two vowel-space-based objective metrics that track perceptually meaningful accent similarity during TTS training, offering an interpretable alternative to opaque loss curves and costly listening tests.

## Problem

Synthetic speech is usually evaluated with subjective listening tests, which are costly and impractical during TTS training, while training loss curves lack linguistic interpretability and fail to reflect perceptual changes.

## Method

Proposes Vowel Space Overlap and Procrustes Normalised Disparity, phonetically grounded objective metrics quantifying the similarity between synthesized and ground-truth vowel space shapes, computed at training checkpoints for a TTS model fine-tuned on two accents, and correlated against human perception tests.

## Results

Both metrics show significant correlations with perceived accent similarity across both accents, indicating they are reliable, interpretable complements to loss curves during TTS training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Interpretable, low-cost monitoring of accent fidelity during TTS model development and fine-tuning.

## Related

- (link related pages by id as the wiki grows)
