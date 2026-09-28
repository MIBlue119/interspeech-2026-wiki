---
id: rakotoarivony26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-119
pdf: https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.pdf
---

# Evolution Strategy-Based Calibration for Low-Bit Quantization of Speech Models

[PDF](https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rakotoarivony26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-119)

**TL;DR** — The paper introduces Evolution Strategy-Based Calibration (ESC), a two-step local-global optimization method for activation scaling in low-bit speech model quantization that achieves near-lossless INT4 and lossless INT8 performance.

## Problem

Audio activations exhibit exceptionally large dynamic ranges and compressed distributions compared to vision and NLP models, making standard calibration techniques produce unbalanced bins and severe information loss. Most prior post-training quantization (PTQ) work for speech neglects activation quantization or focuses narrowly on specific architectures, leaving a complete integer quantization pipeline for general speech models unsolved.

## Method

ESC formulates activation scaling as an explicit optimization problem solved via a two-step scheme. First, individual layer activation scales are initialized locally by minimizing the mean squared error (MSE) between FP32 and quantized layer outputs. Second, all scale factors are jointly refined globally using the covariance matrix adaptation evolution strategy (CMA-ES) algorithm to minimize the task-specific error. The study evaluates models with fully quantized weights and activations using a calibration set of 100 samples, an initial step size of 0.1, and an evolution budget of 100 evaluations.

## Results

Evaluated across five speech tasks using LibriSpeech (Conformer WER/CER), VoxCeleb (ECAPA EER/minDCF), VoiceBank-DEMAND (MP-SENet PESQ/STOI), LJSpeech (FastSpeech 2 Mel/PostNet loss), and Speech Commands V2 (AST Acc/mAP). ESC consistently outperforms baseline Max, Percentile, Entropy, and MSE calibration methods, achieving lossless performance for INT8 and near-lossless performance for INT4 (e.g., AST accuracy dropping by only 1.75% in 4-bit). Combining ESC with vision/NLP PTQ methods (such as HyQ or Adaround) further reduces performance degradation, and INT8 deployment yields memory reduction and an average inference speedup of 2.31x (up to 5.07x on AST).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers looking to deploy resource-efficient, low-bit integer-only speech models on edge devices or hardware accelerators with limited memory and compute.

## Limitations

The current exploration relies on 100 calibration samples and specific PTQ combinations, and the global CMA-ES refinement step introduces additional optimization overhead during calibration.

## Related

- (link related pages by id as the wiki grows)
