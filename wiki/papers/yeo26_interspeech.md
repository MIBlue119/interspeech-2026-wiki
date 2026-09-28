---
id: yeo26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2063
pdf: https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.pdf
---

# Pushing the Limits of Compression: Sub-1-Bit Conformer via Variable-Rank Binary Decomposition

[PDF](https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yeo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2063)

**TL;DR** — LittleASR compresses Conformer-Transducer ASR models into the sub-1-bit regime using variable-rank binary low-rank decomposition and gradient-aware bit allocation, achieving a 7.1 MB model size at 15.19% dev-other WER on LibriSpeech.

## Problem

Standard integer quantization of ASR models hits a hard structural floor of 1 bit per parameter, creating an unbridgeable compression deadlock for extreme on-device deployment. Conformer components exhibit uneven sensitivity—the autoregressive decoder suffers catastrophic context collapse under low precision, while the encoder is highly redundant. Existing conservative strategies keep the decoder at high precision but cannot compress the encoder beyond 1 bit, leaving substantial memory footprints untouched.

## Method

The framework replaces heavy linear, pointwise convolution, and LSTM projection weights with a product of low-rank binary matrices and learnable full-precision row, column, and latent scales. By treating the internal rank as a continuously tunable control variable rather than a discrete integer step, it achieves quasi-continuous bit-widths from 0.1 to 2.0 bits. A gradient-aware sensitivity metric computes layer-wise mean squared gradients on a small calibration set to drive a differentiable bit allocation objective optimized with Adam. Post-optimization, a binary search enforces exact hardware memory budgets before applying Quantization-Aware Training (QAT).

## Results

Evaluated on the 120M-parameter Conformer-Transducer Large model using LibriSpeech, LittleASR is compared against full-precision FP32 (481.6 MB), RTN, and group-wise/tensor-wise AbsMean baselines. At a 1.0 bpw uniform rank, LittleASR achieves 6.34% WER on dev-other and 2.63% on test-clean, outperforming the tensor-wise AbsMean baseline. The gradient-aware mixed rank strategy improves this further to 6.01% dev-other WER at 1.0 bpw and scales down to extreme sub-1-bit budgets (0.2 bpw, 7.1 MB) where conventional integer quantization cannot operate. Ablations confirm that prioritizing decoder fidelity over encoder redundancy is essential for preserving recognition accuracy.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers deploying end-to-end automatic speech recognition models onto memory-constrained edge and on-device hardware.

## Limitations

The evaluation relies on theoretical operation counts (FLOPs and BOPs) rather than measured on-device latency, throughput, or actual hardware power consumption.

## Related

- (link related pages by id as the wiki grows)
