---
id: onda26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1668
---

# Leveraging Soft Distributions of SSL-Derived Discrete Speech Tokens for Downstream Inference

**TL;DR** — Using soft (probabilistic) token assignment only at inference time recovers information lost by discretizing SSL speech tokens, improving both ASR and speech synthesis without sacrificing training efficiency.

## Problem

Discrete speech tokens from self-supervised learning models compress data efficiently but discretization causes information loss, degrading performance relative to continuous SSL features.

## Method

The authors apply soft token assignment only during downstream inference (keeping hard discretization during training for efficiency), preserving training efficiency while enhancing token expressiveness at inference time.

## Results

The method outperforms conventional hard assignment on both ASR and speech synthesis tasks, generalizes especially well to out-of-domain data, and even surpasses continuous-SSL-feature models on ASR of non-native speech; the resulting representations also align more accurately with phonemes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving discrete-token-based downstream speech systems (ASR, TTS) without giving up the storage/compute benefits of discretization during training.

## Related

- (link related pages by id as the wiki grows)
