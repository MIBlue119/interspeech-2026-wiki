---
id: wang26d_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-219
pdf: https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.pdf
---

# Back to Ear: Perceptually Driven High Fidelity Music Reconstruction

*Kangdi Wang, Zhiyue Wu, Rui Lin, Junyu Dai, Tao Jiang*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-219)

**TL;DR** — The paper introduces ear-VAE, an open-source continuous musical audio VAE that achieves state-of-the-art reconstruction quality (11.00 dB SI-SDR and 4.70 MOS) by integrating K-weighting perceptual filters, phase-aware correlation loss, and a Mid/Side/Left/Right (MSLR) supervision scheme.

## Key contributions

- Integrated a K-weighting perceptual filter prior to loss calculation to better align the VAE's objective with human auditory sensitivity for music signals compared to A-weighting.
- Proposed a DSP-driven phase-aware correlation loss operating on Left-Right channels to improve transient clarity, stereo coherence, and spatial consistency.
- Designed an MSLR supervision scheme applying magnitude loss to all MSLR components while restricting phase supervision solely to LR components.
- Utilized an asymmetric architecture featuring an efficient convolutional encoder and a transformer decoder with RoPE positional embeddings for global context modeling.

## Problem

Modern audio VAE models prioritize semantic generation or use discrete quantization (like EnCodec or DAC) which introduces information bottlenecks. Existing continuous VAEs often ignore psychoacoustic perceptual weighting, leading to phase errors, transient smearing, and poor stereo spatial representation. These flaws result in audible artifacts and limit their utility in professional music production and downstream diffusion-based generation.

## Method

The architecture combines an encoder built with strided convolutional blocks and SnakeBeta activations with an asymmetric decoder consisting of transposed convolutions and transformer blocks utilizing RoPE position embeddings. A Multi-Scale STFT Discriminator (MSD) guides adversarial training, avoiding CQT discriminators which distort high-frequency harmonics.

The training loss combines multi-scale log-magnitude STFT loss, feature-map matching loss, least-squares GAN adversarial loss, a regularizing KL divergence loss weighted at 1e-6, and a novel phase-aware correlation loss. The correlation loss calculates the mean cosine similarity of phase differences across time-frequency bins. A K-weighting filter (from ITU-R BS.1770) is applied to emphasize perceptually sensitive mid-to-high frequencies during reconstruction loss computation.

The model is trained on 8 A100 GPUs using AdamW (lr=3e-4, beta1=0.5, beta2=0.9) in three stages: a 10k-step generator warm-up, 1M steps of pre-training on public datasets (FSD50K, FMA, DISCO-10M), and 1M steps of continue-training on a 10,000-hour proprietary in-house dataset.

## Experimental setup

Evaluated on the MuChin dataset and an in-house validation split of professionally produced music at a 44.1 kHz sample rate. Compared against DAC, EnCodec, AudioGen (AGC), and Stable-Audio-Open (SAO). Metrics include Multi-Scale Mel distance, Multi-Scale STFT distance, SI-SDR, True Peak loudness difference (dbTP), a 5-point Likert scale MOS by 5 professional mixers, and two novel phase metrics: Individual Channel Phase Coherence (ICPC) and Cross Channel Phase Coherence (CCPC).

## Results

ear-VAE significantly outperforms baseline models, achieving an SI-SDR of 11.00 dB and a MOS of 4.70 on the in-house validation set, compared to DAC (6.68 dB / 3.63 MOS), SAO (5.23 dB / 3.46 MOS), and EnCodec (3.99 dB / 1.68 MOS). It also achieves the best ICPC (96.66%) and CCPC (96.52%) scores.

Ablations prove that K-weighting surpasses A-weighting (improving STFT distance to 1.01), adding the correlation loss increases SI-SDR to 9.85 dB, and incorporating transformer blocks pushes SI-SDR to 11.00 dB. Removing the auxiliary CQT discriminator successfully boosts full-band signal fidelity.

| System | Mel Dist ↓ | STFT Dist ↓ | ICPC ↑ (%) | CCPC ↑ (%) | SI-SDR ↑ (dB) | MOS ↑ |
|---|---|---|---|---|---|---|
| EnCodec | 0.80 | 1.49 | 90.07 | 89.42 | 3.99 | 1.68 |
| SAO | 0.64 | 1.34 | 90.37 | 91.12 | 5.23 | 3.46 |
| DAC | 0.67 | 1.21 | 94.49 | 90.47 | 6.68 | 3.63 |
| AudioGen (AGC) | 0.65 | 1.39 | 94.16 | 94.66 | 8.21 | 1.80 |
| ear-VAE (Ours) | 0.55 | 1.12 | 96.66 | 96.52 | 11.00 | 4.70 |

## Limitations

The model relies on proprietary in-house data (10,000 hours of professionally mastered music) to reach its top performance tier, which may limit full reproducibility using solely open-source assets. While it handles modern master clipping up to +1dB via true peak filtering, extreme audio clipping or highly degraded historical recordings are filtered out. Language and genre coverage beyond professional Western music production datasets are not explicitly detailed.

## Why read this

Speech and audio researchers building high-fidelity continuous VAEs for music generation or compression will learn how to integrate psychoacoustic K-weighting and phase correlation losses to bypass traditional phase smearing and spatial degradation.

## Code

- https://github.com/Eps-Acoustic-Revolution-Lab/EAR_VAE

## Applications

High-fidelity music compression, latent diffusion-based music generation, and professional audio editing pipelines.

## Related

- (link related pages by id as the wiki grows)
