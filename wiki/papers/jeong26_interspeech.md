---
id: jeong26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1549
---

# An Empirical Analysis of Task-Induced Encoder Bias in Fréchet Audio Distance

**TL;DR** — Shows that Fréchet Audio Distance scores for text-to-audio generation are systematically biased by the training task of whichever encoder computes them, and no single encoder is a universal evaluator.

## Problem

FAD is the standard metric for evaluating text-to-audio generation, but its scores depend heavily on the embedding space of the encoder used, and how the encoder's original training task biases those scores was not well characterized.

## Method

The authors decompose FAD evaluation into Recall, Precision, and Alignment (further split into semantic and structural dimensions) with log-scale normalization for fair comparison, then run controlled experiments across six encoders and two datasets to trace a four-axis trade-off in encoder behavior.

## Results

Reconstruction-trained AudioMAE is most precision-sensitive, ASR-trained Whisper detects structural differences well but is blind to signal degradation, and classification-trained VGGish maximizes semantic detection while penalizing legitimate within-class variation — confirming no single encoder is a universal evaluator.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides researchers and toolmakers in choosing or designing FAD-style evaluation encoders for text-to-audio generation benchmarks.

## Related

- (link related pages by id as the wiki grows)
