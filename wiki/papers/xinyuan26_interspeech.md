---
id: xinyuan26_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-198
pdf: https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf
---

# Universal Speech Content Factorization

[PDF](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xinyuan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-198)

**TL;DR** — Universal Speech Content Factorization (USCF) extends speech content factorization to open-set voice conversion using least-squares optimization and small target-speaker samples, achieving competitive intelligibility and naturalness without extra neural network training.

## Problem

Prior speech content factorization and linear voice conversion methods are strictly closed-set, requiring target speakers to be present during the original decomposition phase. This limitation makes them unusable for open-set voice conversion or web-scale text-to-speech training where unseen speakers lack extensive pre-computed transformations. Overcoming this restriction is crucial for deploying factorized representations in diverse, crowd-sourced speech generation pipelines.

## Method

USCF uses a universal speech-to-content mapping learned via least-squares optimization on WavLM features from an anchor set of 40 speakers (truncated SVD rank r=75). It evaluates three mapping variants: W1 factoring out singular values, W2 inverting speaker transformations directly, and W3 assuming linear separability of content and timbre. Unseen speaker adaptation is performed by estimating a speaker transformation matrix using as little as 500 frames (10 seconds) of target speech.

## Results

Evaluated on LibriSpeech across 20-speaker test subsets, USCF variants achieve competitive Word Error Rates (WER 2.31% to 4.04%) and UTMOS quality scores (2.519 to 2.826) compared to baselines like kNN-VC, LinearVC, and closed-set SCF. Subjective MOS ratings show performance comparable to established methods (3.42 to 3.66 depending on W variant), though speaker similarity (Spk Sim 0.420 to 0.557) trails closed-set counterparts due to open-set adaptation limits.

## Code

- https://github.com/HSTEHSTEHSTE/uscf

## Applications

Speech and ML engineers can use USCF for training-free zero-shot voice conversion and as a timbre-disentangled acoustic representation target for training text-to-speech models.

## Limitations

Speaker similarity lags behind closed-set SCF and kNN-VC because the degradation stems directly from the open-set content-to-speaker transformation estimation.

## Related

- (link related pages by id as the wiki grows)
