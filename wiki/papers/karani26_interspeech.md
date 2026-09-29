---
id: karani26_interspeech
category: enhancement-separation
labels: [generative-model, robustness-noise]
institutions: ["Birla Institute of Technology and Science, Pilani"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2330
pdf: https://www.isca-archive.org/interspeech_2026/karani26_interspeech.pdf
---

# mmWave Radar Aware Dual-Conditioned GAN for Speech Reconstruction of Signals With Low SNR

*JASH KARANI, Adithya Chittem, Deepan Roy, Sandeep Joshi*

[PDF](https://www.isca-archive.org/interspeech_2026/karani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/karani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2330)

**Category:** `enhancement-separation` · **Labels:** `generative-model`, `robustness-noise`

**TL;DR** — RAD-GAN is a two-stage speech reconstruction and bandwidth extension pipeline designed for low-SNR (-5 dB to -1 dB) band-limited mmWave radar captures. It achieves superior perceptual and intelligibility scores (weighted score of 0.333 vs. 0.288 for standard HiFi-GAN) without requiring data augmentations or external pre-trained modules.

## Key contributions

- Radar-Aware Dual-conditioned Generative Adversarial Network (RAD-GAN) for reconstructing full-bandwidth speech (0-4 kHz) from band-limited mmWave radar inputs (0-1 kHz).
- Multi-Mel Discriminator (MMD) featuring dual parallel spectral-norm and weight-norm 2D convolutional branches for enhanced time-frequency spectral realism.
- Residual Fusion Gate (RFG) that dynamically combines noisy inputs with auxiliary WaveVoiceNet (WVN) mel-spectrogram features via a frame-wise pointwise Conv1D gating mechanism.
- A stable two-stage training strategy comprising low-band speech pre-training with MR-STFT/L1 losses followed by adversarial fine-tuning.

## Problem

Millimeter-wave radar captures subtle human diaphragm or surface vibrations contact-free, but the resulting signals are heavily contaminated by noise, band-limited, and suffer from extremely low SNR (-5 dB to -1 dB). Prior enhancement approaches either rely on massive external datasets, require complex pre-trained modules, or fail under realistic, severely adverse propagation environments such as capturing signals through glass walls or secondary aluminum foil reflectors. Recovering clean speech under these constrained resources and adverse acoustic-radar domains remains an open challenge.

## Method

The system utilizes an unmodified HiFi-GAN generator architecture containing 87,000,536 trainable parameters that maps 80-bin mel-spectrograms to 4 kHz waveforms via transposed-convolution upsampling and Multi-Receptive Field (MRF) residual blocks. Stage 1 pre-trains the generator on clean speech clipped to 1 kHz using an L1 mel loss with high-frequency weighting ($\lambda_{\text{mel}}=45.0$, $w_m=5.0$ above 1 kHz) and a multi-resolution STFT loss ($\lambda_{\text{stft}}=5.0$) across FFT sizes of {256, 512, 1024}. Stage 2 performs adversarial fine-tuning using a multi-branch discriminator setup combining HiFi-GAN's Multi-Period Discriminator (MPD) and Multi-Scale Discriminator (MSD) with the proposed Multi-Mel Discriminator (MMD), alongside an adversarial loss weight $\lambda_{\text{adv}}=0.5$.

To enrich conditioning during fine-tuning, a frozen WaveVoiceNet (WVN) module extracts auxiliary magnitude features ($\mathbf{M}_w$), which are fused with noisy radar mel features ($\mathbf{M}_n$) using the Residual Fusion Gate: $\mathbf{M}_f = \mathbf{M}_n + \sigma(a) \cdot \mathbf{G} \odot (\mathbf{M}_w - \mathbf{M}_n)$. Here, $\mathbf{G}$ is a pointwise Conv1D local mask ($160 \to 80$ channels) and $a$ is a learnable scalar logit initialized to $-2.0$ for conservative early training. This gate allows the pipeline to dynamically fall back to the noisy baseline when WVN cues are unreliable while amplifying corrections in stable regions.

## Experimental setup

Evaluated on the RASE 2026 Challenge dataset containing ~42 hours of paired radar-captured (through glass walls via TI AWR2243BOOST FMCW radar) and microphone-recorded clean speech sampled at 8 kHz (4-second clipped segments). Task 1 (direct vibration) has 6,093 samples; Task 2 (secondary aluminum foil reflector vibration, more challenging) has 5,978 samples. Baselines include WaveVoiceNet (M0), HiFi-GAN (M1), DCCTN (M2), AP-BWE (M3), DiffWave (M4), and CDiffuSE (M5). Evaluated via PESQ, ESTOI, CS-MFCC, and DNSMOS, combining them into a weighted score (W) favoring Task 2. Implemented in PyTorch on an NVIDIA A6000 GPU; pre-training ran for 66K steps (batch size 16, ~6 hours), and fine-tuning ran for 100K steps (batch size 16, ~14 hours) using AdamW ($eta=(0.9, 0.99)$, initial LR $10^{-4}$).

## Results

RAD-GAN achieves the highest overall weighted score of 0.333, outperforming standard HiFi-GAN (0.288) and WaveVoiceNet (0.260), with superior per-task performance on Task 1 (0.387) and Task 2 (0.297). It specifically excels in DNSMOS (2.688 vs 2.286 for HiFi-GAN) and ESTOI (0.190 vs 0.144), balancing temporal envelope tracking and spectral clarity. Incremental ablations confirm that adding MMD and MR-STFT, pre-training, and WVN conditioning progressively raise the weighted score from 0.288 (baseline) to 0.290, 0.312, and finally 0.333.

| System / Condition | PESQ | ESTOI | CS-MFCC | DNSMOS | Weighted Score |
| :--- | :--- | :--- | :--- | :--- | :--- |
| M0: WaveVoiceNet | 1.302 | 0.173 | 0.675 | 1.558 | 0.260 |
| M1: HiFi-GAN | 1.311 | 0.144 | 0.627 | 2.286 | 0.288 |
| M2: DCCTN | 1.547 | 0.080 | 0.377 | 1.318 | 0.172 |
| M3: AP-BWE | 1.174 | 0.065 | 0.449 | 1.472 | 0.165 |
| M6: RAD-GAN (Ours) | 1.310 | 0.190 | 0.669 | 2.688 | 0.333 |

## Limitations

The evaluation is restricted to a single radar hardware setup (TI AWR2243BOOST) and specific propagation scenarios (glass walls and aluminum foil reflectors), limiting generalization to arbitrary wall materials or distances. The model lacks a dedicated explicit phase recovery branch, relying entirely on vocoder-based implicit phase generation which can occasionally introduce phase artifacts under extremely low SNR. Furthermore, the 87M-parameter model has not yet been optimized for real-time edge deployment or on-device inference latency.

## Why read this

Researchers working on ultra-low-SNR sensor fusion, bandwidth extension, or non-acoustic speech recovery will find this a blueprint for combining lightweight gated residual mel conditioning with multi-mel discriminators. It demonstrates how to achieve robust speech reconstruction from heavily degraded physical signals without relying on massive pre-trained foundation models.

## Code

- https://github.com/chitadi/RADGAN

## Applications

Contact-free speech capture in secure rooms, smart-home ambient sensing, and audio recovery through physical barriers using radar.

## Institutions / 機構

Birla Institute of Technology and Science, Pilani

**Funding / 經費:** Anusandhan National Research Foundation

## Related

- (link related pages by id as the wiki grows)
