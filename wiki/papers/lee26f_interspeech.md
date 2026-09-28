---
id: lee26f_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-665
---

# SEMamba++: A General Speech Restoration Framework Leveraging Global, Local, and Periodic Spectral Patterns

**TL;DR** — Extends the SEMamba state-space speech-denoising model with speech-specific inductive biases for spectral periodicity and multi-resolution frequency structure, achieving the best restoration performance among baselines while staying computationally efficient.

## Problem

State-space models like SEMamba advanced speech denoising but were not designed around speech-specific properties such as spectral periodicity or multi-resolution frequency structure, limiting general speech restoration quality.

## Method

The authors introduce a Global, Local, and Periodic (GLP) frequency-feature-extraction module, a multi-resolution parallel time-frequency dual-processing block to capture diverse spectral patterns, and a learnable mapping layer, combining them into SEMamba++.

## Results

SEMamba++ achieves the best performance among the compared baseline models on general speech restoration while remaining computationally efficient.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

General-purpose speech restoration (denoising and related distortion removal) for telephony, recording cleanup, and downstream ASR/TTS pipelines.

## Related

- (link related pages by id as the wiki grows)
