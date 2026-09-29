---
id: gonzalez26_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["Technical University of Denmark"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-659
pdf: https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.pdf
---

# Absorbing Discrete Diffusion for Speech Enhancement

*Philippe Gonzalez*

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-659)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — ADDSE applies absorbing discrete diffusion to the latent space of a neural audio codec for non-autoregressive speech enhancement, achieving strong non-intrusive objective metrics especially at low signal-to-noise ratios with very few sampling steps.

## Key contributions

- Proposes ADDSE, the first application of absorbing discrete diffusion (ADD) for speech enhancement within a neural audio codec latent space.
- Introduces RQDiT, a non-autoregressive sequence modeling architecture combining Transformers along space (frame) and depth (RVQ) dimensions.
- Adapts reparameterized time-independent score networks for discrete diffusion, allowing step-skipping and near 2x inference speedups.
- Demonstrates exceptional low-SNR robustness and cross-corpus generalization on challenging test sets (Libri-TUT and Clarity-FSD50K).

## Problem

Traditional speech enhancement methods operate in the continuous STFT domain where high dimensionality yields massive computational overhead, while neural codec approaches rely heavily on autoregressive next-code prediction that bottlenecks inference speed. Prior discrete generative efforts like MaskGIT lack a principled probabilistic likelihood framework. Furthermore, ignoring the hierarchical structure of residual vector quantization (RVQ) codes scales poorly with sequence length. Addressing these gaps is crucial for deploying high-fidelity, efficient speech enhancement systems.

## Method

The ADDSE framework uses a custom mirrored convolutional neural audio codec (NAC) operating at 16 kHz with 4 codebooks of 1024 entries each (yielding a 2 kbps bitrate). Clean and noisy waveforms are encoded into discrete codes, and an absorbing discrete diffusion process is modeled over the clean speech codes conditioned on the noisy codes. The mask state M is mapped to a zero vector.

The core architectural engine is RQDiT, consisting of two interacting Diffusion Transformers (DiTs). The first DiT processes time frames using rotary position embeddings (RoPE) and aggregates codebook depths; its output is added to the hidden activations. The second DiT processes individual frames independently across the depth dimension. Conditioning on noisy codes uses adaptive layer normalization (adaLN) across multi-head self-attention and MLP blocks.

Training minimizes the denoising cross-entropy (DCE) objective over independent diffusion processes for each frame and depth coordinate. During inference, sampling starts from a fully masked state and utilizes Euler or Tweedie tau-leaping. Thanks to the time-independent score reparameterization, if no code unabsorbs during a step, the predicted conditional distribution is cached and reused, decreasing function evaluations (NFE) by nearly half at larger step counts.

## Experimental setup

Models are trained dynamically mixing clean speech from DNS5, LibriSpeech, MLS, VCTK, and EARS with noise from DNS5, WHAM!, FSD50K, FMA, and DEMAND at SNRs between -5 dB and 15 dB. Evaluation uses two 1000-mixture test splits: Libri-TUT (unseen TUT noise) and Clarity-FSD50K (unseen Clarity speech and FSD50K events). Baseline systems include Conv-TasNet, BSRNN, SGMSE+, EDM-SE, NAC-SE, and EDM-NAC-SE. RQDiT model sizes span from XS (4M params) to XL (580M params).

## Results

While intrusive metrics like PESQ, ESTOI, and SDR are hindered by the NAC's lack of phase reconstruction, ADDSE excels on non-intrusive metrics. ADDSE-XS (4M params) and larger variants outperform Conv-TasNet and SGMSE+ on DNSMOS and NISQA across both datasets. Ablations show NISQA peaks at just N_steps = 8, while other metrics plateau at N_steps = 16, proving high efficiency. ADDSE displays exceptional robustness at low input SNRs (-5 to 0 dB), outperforming or matching several generative baselines on perceptual speech quality.

| System | Params (M) | Libri-TUT PESQ | Libri-TUT DNSMOS | Clarity-FSD50K PESQ | Clarity-FSD50K DNSMOS |
|---|---|---|---|---|---|
| Noisy | - | 1.31 | 2.92 | 1.34 | 2.90 |
| Conv-TasNet | 5 | 2.44 | 3.58 | 2.54 | 3.47 |
| BSRNN | 13 | 2.77 | 3.79 | 3.11 | 3.72 |
| SGMSE+ | 66 | 1.96 | 3.36 | 2.31 | 3.47 |
| ADDSE-S | 17 | 1.56 | 3.72 | 1.56 | 3.72 |
| ADDSE-XL | 580 | 1.68 | 3.76 | 1.70 | 3.76 |

## Limitations

The current system is constrained to 16 kHz audio, leaving full-band speech enhancement unexplored. The NAC bottleneck prevents direct phase recovery, resulting in lower scores on phase-sensitive intrusive metrics like traditional SDR and PESQ. Semantic conditioning is not integrated, and compute costs scale steeply with the 580M-parameter XL variant.

## Why read this

Speech and audio ML researchers should read this paper to see how absorbing discrete diffusion can be effectively combined with neural codecs and dual-dimension DiT architectures for non-autoregressive speech tasks. It provides a blueprint for bypassing the slow inference speeds of standard autoregressive code models and continuous STFT diffusion.

## Code

- https://philgzl.com/addse-demo

## Applications

Real-time communication software, hearing aids, and on-device speech cleanup modules requiring robust noise suppression under severe low-SNR conditions.

## Institutions / 機構

Technical University of Denmark

## Related

- (link related pages by id as the wiki grows)
