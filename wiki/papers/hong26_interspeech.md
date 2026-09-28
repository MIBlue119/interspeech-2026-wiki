---
id: hong26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1312
---

# Convolutional Dynamic Rotary Positional Encoding

**TL;DR** — Warping RoPE's rotary time index based on local acoustic context, instead of using fixed uniform steps, improves ASR word error rate and robustness to temporal perturbations with fewer parameters.

## Problem

Rotary Position Embedding (RoPE), a strong alternative to relative positional encoding in ASR encoders, uses a discrete, uniformly spaced time index that is mismatched with the continuous, semantically variable nature of speech.

## Method

Convolutional Dynamic RoPE (CD-RoPE) complements a Branchformer's attention path by warping the rotary temporal index based on local acoustic context via a lightweight depthwise-separable convolution, using additive position modulation to preserve RoPE's harmonic structure while allowing continuous, input-dependent shifts.

## Results

CD-RoPE consistently improves WER over relative positional encoding on Branchformer across all LibriSpeech test sets, with 2.2M fewer parameters, and shows its largest advantage under temporal perturbations on the Speech Robust Bench.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Drop-in positional encoding upgrade for Conformer/Branchformer-style ASR encoders seeking better accuracy and robustness to timing perturbations at no extra parameter cost.

## Related

- (link related pages by id as the wiki grows)
