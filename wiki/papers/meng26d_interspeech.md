---
id: meng26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1797
pdf: https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.pdf
---

# Neuromorphic Speech Enhancement with Dual-Branch Spiking Neural Networks

[PDF](https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1797)

**TL;DR** — The paper introduces GSU-DBNet, a dual-branch spiking neural network that performs joint magnitude and complex spectrum speech enhancement, achieving a PESQ score of 3.04 with only 394K parameters.

## Problem

Spiking neural networks offer high energy efficiency for edge devices but historically underperform classical artificial neural networks in speech enhancement due to binary activation constraints and suboptimal architectures. Existing spiking models typically process only a single spectral dimension, failing to exploit the complementary benefits of combining magnitude and complex spectra. This work bridges that gap to provide high-quality noise suppression under strict neuromorphic hardware constraints.

## Method

The proposed GSU-DBNet utilizes an encoder-separator-decoder layout starting with a three-layer convolutional encoder equipped with CBAM attention. The separator stacks dual-path blocks containing a bidirectional BiGSU for frequency-dimension cross-correlation and a unidirectional GSU for causal temporal modeling. The GSU cell operates via a leaky integrate-and-fire inspired single-gate forget mechanism using a triangular surrogate gradient for backpropagation through time. A dual-branch decoder reconstructs audio via parallel transposed-convolutions: a complex branch predicting DeepFilter coefficients via tanh activation, and a magnitude branch predicting energy envelopes via sigmoid activation, fused through weighted averaging.

## Results

Evaluated on the VoiceBank+DEMAND benchmark, GSU-DBNet achieves a PESQ score of 3.04, CSIG of 4.28, CBAK of 3.57, COVL of 3.68, and SSNR of 9.94 dB while using only 394K parameters. This parameter count represents just 4.5% to 10.6% of representative artificial neural network models like DCCRN, FullSubNet+, and GaGNet, while improving PESQ by 0.84 over DPSNN and 0.38 over Spiking-FSN. Ablation studies confirm that removing either the magnitude or complex branch degrades PESQ to 2.96 and 2.94 respectively, and expanding the single gate into multi-gate variants reduces efficiency due to the binary output bottleneck.

## Code

- https://meng-taiyu.github.io/dpnet-demo/

## Applications

Low-power edge devices, hearing aids, and real-time communication hardware requiring energy-efficient speech enhancement front-ends.

## Limitations

The model lags slightly behind certain larger architectures in speech signal consistency metrics like CSIG.

## Related

- (link related pages by id as the wiki grows)
