---
id: fu26b_interspeech
category: enhancement-separation
labels: [efficient-on-device, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2465
pdf: https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.pdf
---

# Learnable Schrödinger Bridge and Activations for Efficient Diffusion-based Speech Enhancement

*Yihui Fu, Wouter Tirry, Tim Fingscheidt*

[PDF](https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2465)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — EffDiffSE+ is an efficient single-iteration Schrödinger bridge (SB) speech enhancement model combining a discriminative condition DNN with a generative bridge DNN and a learned initialization. It achieves a top subjective MOS of 3.95 and an overall rank of 1.27 while requiring only 3.84 GMAC/s.

## Key contributions

- Proposed a single-iteration SB with Gaussian distribution initialization for the reverse process, matching conditions between training and inference.
- Introduced an auxiliary network for learnable adaptivity to estimate the initial state mean and standard deviation of the bridge DNN.
- Applied sub-pixel convolution and sub-band Conv/DeConv blocks to extract band-aware features and eliminate checkerboard artifacts.
- Integrated Snake/SnakeBeta periodic activations and a feature-level interaction module between condition and bridge encoders.

## Problem

Vanilla diffusion and Schrödinger bridge speech enhancement models rely on costly multi-iteration reverse processes that incur high inference computational complexity. Existing single-step or few-step methods often struggle to balance residual noise compression with faithful speech component reconstruction and suffer from mismatched training/inference conditions. Addressing this is crucial for deploying high-fidelity generative enhancement on resource-constrained or real-time speech systems.

## Method

EffDiffSE+ uses a hybrid discriminative-generative architecture where a condition DNN first outputs a pre-enhanced speech estimate and condition features (SC_i). The bridge DNN then operates in the STFT domain (K=512, 25% frameshift) to model the stochastic data-to-data pathway from noisy to clean speech. Unlike multi-step SDE/ODE solvers, EffDiffSE+ uses a single-iteration ODE sampler initialized via a learnable auxiliary network.

The auxiliary network takes concatenated magnitudes of the condition estimate, noisy speech, and a latent variable, passing them through a frequency-axis convolution and linear layers to dynamically predict the bridge inputs wt^X, wt^Y, and sigma_Xt. Network blocks incorporate sub-band Conv/DeConv (splitting features 1:3 into low/high bands with stride 1 and 3) to capture band-aware representations, sub-pixel convolution for artifact-free upsampling, and SnakeBeta activations [f(x) = x + (1/beta) * sin^2(beta * x)] to model periodic speech features. Training optimizes a composite objective combining Braun's psychoacoustic loss on the condition DNN and an L1 waveform loss on the final output, running for 1 million steps on a single NVIDIA RTX 3080 Ti with batch size 16.

## Experimental setup

Evaluated on a 634.5-hour training split (D^train) and a 32.7-hour validation split (D^val) derived from the URGENT 2024 Challenge dataset (excluding CommonVoice 11.0 English due to background noise) with SNRs from -5 to 20 dB, alongside a 1,000-waveform test set (D^test). Compared against 8 baselines including SGMSE+, BBED, SB, CRP, CDiffuSE, StoRM, Universe++, and EffDiffSE. Metrics include PESQ, POLQA, DNSMOS, NISQA, UTMOS, ESTOI, LPS, SBScore, SpkSim, WAcc, and ITU-T P.808 subjective MOS evaluated by 8 native English speakers.

## Results

On the test set, EffDiffSE+ achieves a PESQ of 2.58, POLQA of 3.55, DNSMOS of 3.19, NISQA of 4.07, UTMOS of 3.11, ESTOI of 0.84, LPS of 0.84, and a subjective MOS of 3.95 (closely trailing clean speech at 3.96), outperforming all baseline models. In comparison to EffDiffSE (overall rank 3.09) and heavy multi-iteration models like SB (7,605 GMAC/s), EffDiffSE+ achieves an overall top rank of 1.27 with only 3.84 GMAC/s and 9.40 M parameters. Ablations confirm that combining the auxiliary network with sub-band convolutions and SnakeBeta activations yields cumulative gains across all perceptual and intelligibility metrics.

| Method | # Param. (M) | GMAC/s | PESQ | POLQA | DNSMOS | ESTOI | MOS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Noisy | - | - | 1.41 | 2.26 | 1.94 | 0.68 | 2.12 |
| SGMSE+ [4] | 65.59 | 7605.65 | 2.00 | 3.02 | 2.86 | 0.78 | 3.43 |
| SB [6] | 65.59 | 7605.65 | 1.87 | 2.91 | 3.22 | 0.81 | 3.89 |
| CRP [12] | 65.59 | 126.76 | 2.18 | 3.08 | 3.07 | 0.81 | 3.80 |
| EffDiffSE [13] | 8.50 | 3.90 | 2.45 | 3.42 | 3.10 | 0.83 | 3.79 |
| EffDiffSE+ (Proposed) | 9.40 | 3.84 | 2.58 | 3.55 | 3.19 | 0.84 | 3.95 |

## Limitations

Evaluated exclusively on 16 kHz wideband audio sampled from specific challenge distributions, leaving ultra-wideband (48 kHz) or telephony-band (8 kHz) performance untested. The model's reliance on a discriminative condition network means its generative capacity is bounded by the quality and domain adaptation of the initial pre-enhanced speech estimate. Evaluation focuses on English speech datasets, lacking multilingual generalization analysis.

## Why read this

Speech and ML researchers focusing on generative audio models should read this to learn how to collapse multi-step diffusion/Schrödinger bridge inference into a single step without sacrificing speech quality. It provides a blueprint for combining learnable network initializations, custom periodic activations, and sub-band processing to achieve state-of-the-art performance at ultra-low compute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication systems, hearing aids, voice assistants, and on-device speech enhancement running under strict compute budgets.

## Institutions / 機構

TU Braunschweig, Goodix Technology

## Related

- (link related pages by id as the wiki grows)
