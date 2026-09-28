---
id: ojha26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-964
pdf: https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.pdf
---

# Bridging Self-Supervised Learning and Speech Enhancement: A Wav2Vec2-Conditioned Framework

[PDF](https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ojha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-964)

**TL;DR** — A diffusion-based speech enhancement framework conditions a U-Net score network on frozen wav2vec 2.0 features via bottleneck Feature-wise Linear Modulation (FiLM), yielding a consistent 0.4 PESQ improvement on VoiceBank-DEMAND.

## Problem

Generative diffusion models for speech enhancement excel at naturalness but struggle to generalize to unseen acoustic environments and lack explicit linguistic guidance. Discriminative mapping methods frequently cause audible artifacts and spectral over-smoothing at low signal-to-noise ratios. Incorporating self-supervised representations can provide vital phonetic anchoring, but requires memory-efficient conditioning strategies suitable for iterative diffusion loops.

## Method

The framework uses a frozen wav2vec 2.0 base model to extract 768-dimensional transformer features from noisy input audio at a 20ms frame rate. A three-layer multi-layer perceptron (MLP) acts as a FiLM generator, projecting features into scale and shift parameters that modulate the U-Net bottleneck features via element-wise affine transformation. To manage temporal memory limits in diffusion training, the sequence of FiLM coefficients is temporally compressed using exponential moving average (EMA) smoothing, whose factor is derived from the optimal causal Kalman filter under a linear-Gaussian state-space model. The underlying score network follows the NCSN++ U-Net architecture integrated into the StoRM framework, evaluated in 128-channel (55.1M parameters) and lightweight 32-channel (3.6M parameters) configurations using 30 reverse diffusion sampling steps.

## Results

Evaluated on VoiceBank-DEMAND and LibriMix datasets using intrusive (PESQ, STOI, SI-SDR) and non-intrusive metrics (DNSMOS SIG, BAK, OVRL). On VoiceBank-DEMAND, the 128-channel proposed model increases PESQ from 2.88 (StoRM baseline) to 3.28, improves STOI to 0.8673, and achieves DNSMOS OVRL of 3.300. On LibriMix with 32 channels, the proposed model reaches a PESQ of 2.0099 compared to the 1.6385 baseline. Ablation studies demonstrate that bottleneck-only conditioning outperforms applying FiLM across all four encoder resolutions, and that higher smoothing degrees improve perceptual quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building speech enhancement systems for telephony, hearing aids, or voice assistants requiring robust noise suppression and high perceptual speech quality.

## Limitations

The model incurs a slight trade-off in SI-SDR scores due to aggressive noise suppression tendencies, and lightweight variants increase runtime factor (RTF) by roughly 52% over unconditioned baselines.

## Related

- (link related pages by id as the wiki grows)
