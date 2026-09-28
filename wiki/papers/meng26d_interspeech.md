---
id: meng26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1797
pdf: https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.pdf
---

# Neuromorphic Speech Enhancement with Dual-Branch Spiking Neural Networks

*Taiyu Meng, Wenbin Jiang, Haoyi Zhang, Yuhan Zhou, Haoyi Yin*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1797)

**TL;DR** — GSU-DBNet is a dual-branch, dual-path spiking neural network for speech enhancement that uses gated spiking units to jointly model magnitude and complex spectra, achieving a 3.04 PESQ with only 394K parameters.

## Key contributions

- Proposes GSU-DBNet, a dual-branch SNN architecture combining gated spiking units for joint magnitude-complex spectrum modeling and spatiotemporal feature extraction.
- Achieves a PESQ of 3.04 on VoiceBank+DEMAND using a compact footprint of 394K parameters, outperforming prior SNN methods (DPSNN and Spiking-FSN) and rivaling larger ANN models.
- Provides empirical ablation evidence showing that the binary output bottleneck makes a single-gate spiking unit optimal, whereas multi-gate expansions add redundancy without performance gains.

## Problem

High-performance speech enhancement models rely on large artificial neural networks (ANNs) with millions of parameters and heavy floating-point operations, making them impractical for low-power edge devices. Prior spiking neural network (SNN) approaches like DPSNN and Spiking-FullSubNet suffer from a noticeable quality gap against conventional ANNs and fail to exploit the complementary advantages of magnitude and complex spectra. Bridging this gap is critical to delivering energy-efficient speech enhancement compatible with neuromorphic hardware without sacrificing perceptual speech quality.

## Method

GSU-DBNet adopts an encoder-separator-decoder architecture. Noisy speech STFT yields a three-channel input (real, imaginary, magnitude). The encoder uses three convolutional blocks with Conv2d, GroupNorm, PReLU, and CBAM attention modules to compress frequency and project channels to 64. The separator stacks two dual-path GSU blocks: a bidirectional BiGSU frequency path for cross-frequency correlations and a unidirectional GSU time path for causal temporal modeling.

The GSU cell replaces standard LSTM cells by maintaining membrane potential via a single forget gate (controlling decay and implicit input) and emitting 1-bit binary spikes through a Heaviside step function approximated by a triangular surrogate gradient during backpropagation through time. A dual-branch decoder then splits into a complex branch (estimating DeepFilter coefficients via tanh) and a magnitude branch (estimating an energy mask via sigmoid), followed by weighted averaging and iSTFT.

The training loss is a hybrid combination of power-law-compressed spectral MSE (with compression exponent c=0.3, weighting alpha_c=30) and time-domain SI-SNR (weighting alpha_m=70). The network is trained with AdamW (initial lr 1e-3, ReduceLROnPlateau), batch size 18, and gradient clipping at 5.0 for up to 150 epochs.

## Experimental setup

Evaluated on the VoiceBank+DEMAND dataset (11,572 training utterances from 28 speakers across 10 noise types at 0-15 dB; 824 test utterances from 2 speakers across 5 unseen noise types at 2.5-17.5 dB, 16 kHz). Compared against ANN baselines (DCCRN, FullSubNet+, GaGNet, TSTNN) and SNN baselines (DPSNN, Spiking-FSN). Metrics include wideband PESQ, composite measures (CSIG, CBAK, COVL), segmental SNR (SSNR), DNSMOS, STOI, and SI-SNR.

## Results

GSU-DBNet achieves a PESQ of 3.04 with 394K parameters, outperforming SNN baselines DPSNN (PESQ 2.20) and Spiking-FSN (PESQ 2.66) by substantial margins of 0.84 and 0.38 PESQ points, respectively. It also surpasses larger representative ANN models like DCCRN (2.68 PESQ, 3.7M params), FullSubNet+ (2.88 PESQ, 8.67M params), and GaGNet (2.94 PESQ, 5.94M params) while using only 4.5% to 10.6% of their parameters. Ablations demonstrate that removing either the complex or magnitude branch drops PESQ to 2.94-2.96, and multi-gate variants (SLSTM-2G, SLSTM-3G) fail to improve performance over the single-gate baseline due to the binary output bottleneck. TSTNN maintains a slight edge in CSIG (4.33 vs 4.28), indicating minor room for improvement in raw speech signal consistency.

| System | #Params (K) | PESQ | CSIG | CBAK | COVL | SSNR |
|---|---|---|---|---|---|---|
| Noisy | - | 1.97 | 3.35 | 2.44 | 2.63 | 1.68 |
| DCCRN | 3700 | 2.68 | 3.88 | 3.18 | 3.27 | 8.62 |
| FullSubNet+ | 8670 | 2.88 | 3.86 | 3.42 | 3.57 | - |
| TSTNN | 920 | 2.96 | 4.33 | 3.53 | 3.67 | 9.70 |
| Spiking-FSN | 954 | 2.66 | 3.85 | 3.24 | 3.24 | 8.31 |
| GSU-DBNet (Ours) | 394 | 3.04 | 4.28 | 3.57 | 3.68 | 9.94 |

## Limitations

The evaluation is restricted to a single standard benchmark dataset (VoiceBank+DEMAND) at a fixed 16 kHz sampling rate, leaving open generalization to larger-scale diverse corpora or real-world acoustic settings. While hardware-friendly sparse spike activity is analyzed (mean firing rate of 37%), actual deployment energy consumption and latency measurements on physical neuromorphic hardware chips are not reported.

## Why read this

Read this paper if you are designing energy-efficient speech enhancement front-ends or working with spiking neural networks and want to understand how dual-path dual-branch spectral modeling can close the performance gap between SNNs and deep ANNs.

## Code

- https://meng-taiyu.github.io/dpnet-demo/

## Applications

Low-power edge devices, real-time communication systems, and hearing aid front-ends requiring high-fidelity speech enhancement under tight computational and energy constraints.

## Related

- (link related pages by id as the wiki grows)
