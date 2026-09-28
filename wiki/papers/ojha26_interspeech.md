---
id: ojha26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-964
---

# Bridging Self-Supervised Learning and Speech Enhancement: A Wav2Vec2-Conditioned Framework

**TL;DR** — Injecting frozen wav2vec 2.0 phonetic features into a diffusion speech enhancement model's U-Net bottleneck via FiLM modulation, aggregated by exponential smoothing for causal temporal compression, gives a consistent 0.4-point PESQ improvement over an unconditioned baseline.

## Problem

Diffusion models show promise for speech enhancement but lack explicit linguistic guidance during generation.

## Method

The authors condition a diffusion-based enhancement model on wav2vec 2.0 features extracted from noisy input, injected at the U-Net bottleneck via Feature-wise Linear Modulation (FiLM); a frozen wav2vec 2.0 encoder extracts features while a learned FiLM generator produces scale/shift parameters, with FiLM coefficients aggregated via exponential smoothing motivated by an optimal Bayesian causal estimator.

## Results

On VoiceBank-DEMAND and LibriMix, the method shows competitive performance against the unconditioned baseline on PESQ, STOI, SI-SDR, and DNSMOS, with a consistent 0.4-point PESQ improvement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Suggests self-supervised phonetic conditioning as a low-overhead way to boost diffusion-based speech enhancement quality in telephony, hearing aids, or conferencing systems.

## Related

- (link related pages by id as the wiki grows)
