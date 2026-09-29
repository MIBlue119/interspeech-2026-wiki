---
id: kuznetsov26_interspeech
category: speech-coding
labels: [efficient-on-device, generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2721
pdf: https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.pdf
---

# FastWave: Optimized Diffusion Model for Audio Super-Resolution

*Nikita Kuznetsov, Maksim Kaledin*

[PDF](https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2721)

**Category:** `speech-coding` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — FastWave is an optimized diffusion-based audio super-resolution model that scales any input sample rate to 48 kHz using only 1.3 million parameters and ~12.87 GFLOPs per second of audio. By combining EDM training formulations with ConvNeXtV2-inspired architectural blocks, it achieves competitive reconstruction quality while requiring significantly reduced training compute and 4-8 NFE inference.

## Key contributions

- Reduces parametric complexity by 30% compared to NU-Wave 2, resulting in a compact 1.3M parameter diffusion model.
- Adapts the EDM (Elucidating the Design Space of Diffusion-Based Generative Models) framework to audio super-resolution via denoising parameterization and log-normal noise distributions.
- Replaces standard convolutional layers with depthwise separable convolutions and integrates Global Response Normalization (GRN) based on ConvNeXtV2.
- Demonstrates flexible any-to-48 kHz bandwidth extension capable of running efficiently in low-resource and streaming settings.

## Problem

Audio super-resolution reconstructs missing high-frequency components from low-resolution recordings to improve perceptual clarity. While diffusion and flow-based generative models produce high-quality outputs, architectures like NU-Wave 2, FlowHigh, and AudioSR rely on heavy high-parametric networks with excessive computational demands during both training and inference. This high computational burden hinders their deployment on edge devices and consumer hardware where on-device, low-resource processing is required.

## Method

FastWave builds directly upon the flexible-input NU-Wave 2 architecture but shifts the diffusion paradigm from predicting noise to direct data denoising with sigma-parameterization inspired by EDM. The model applies explicit input-output preconditioning, with the data variance scale estimated empirically from the training set, and samples via a probability flow ODE using a first-order Euler solver across 4 to 8 number of function evaluations (NFE). The continuous noise schedule relies on a log-normal distribution where hyperparameters P_mean and P_std are driven by the data statistics to concentrate training steps on intermediate noise levels.

To compress the network, standard local convolutions in the feature-wise modulation (FFC) and band-split frequency transform (BSFT) modules are replaced with depthwise separable convolutions, which scale linearly rather than quadratically with channel counts. Additionally, Global Response Normalization (GRN) layers are inserted after shared BSFT MLPs and before output projections to maintain robust cross-channel interactions despite the parameter pruning. The model is trained using a weighted L2 denoising objective with the Adam optimizer at a learning rate of 2e-4 and batch size of 2.

## Experimental setup

Evaluated on the VCTK dataset comprising approximately 44 hours of 48 kHz speech from 110 speakers (split into 100 for training and 8 for testing). Benchmarked against upsampling tasks from 8, 12, 16, and 24 kHz to 48 kHz. Baseline comparisons include NU-Wave 2 (8 NFE), FlowHigh, and AudioSR. Metrics reported include Signal-to-Noise Ratio (SNR), Log-Spectral Distance (LSD), low- and high-frequency band LSD (LSD-LF, LSD-HF), Real-Time Factor (RTF), GFLOPs, and parameter counts. FastWave models were trained for up to 30 hours on a single NVIDIA V100 GPU.

## Results

FastWave achieves strong reconstruction metrics with a substantially lighter footprint. In the limited-resource setting, EDM training methodology allows FastWave to converge rapidly, outperforming the baseline NU-Wave 2 trained with standard schedules. Against pretrained large-capacity models, FastWave (1.3M parameters, ~12.87 GFLOPs) outperforms AudioSR across all benchmark frequencies while using a fraction of its computational cost (AudioSR requires >2,500 GFLOPs). While FlowHigh achieves slightly lower LSD scores, FastWave matches or exceeds it in SNR metrics, indicating superior phase reconstruction capabilities while maintaining an efficient RTF suitable for streaming.

| System | Params | GFLOPs | SNR (8kHz) | LSD (8kHz) | SNR (24kHz) | LSD (24kHz) |
|---|---|---|---|---|---|---|
| FastWave (4 NFE) | 1.3M | 12.87 | 18.75 | 1.18 | 27.09 | 0.93 |
| FastWave (8 NFE) | 1.3M | 12.87 | 18.53 | 1.19 | 27.22 | 0.83 |
| NU-Wave 2 (8 NFE) | 1.8M | 18.99 | 18.43 | 1.15 | 27.68 | 0.78 |
| FlowHigh | 49.40M | 30.39 | 18.04 | 0.96 | 27.80 | 0.74 |
| AudioSR | 1285.40M | 2536.20 | 13.75 | 1.55 | 23.03 | 1.27 |

## Limitations

The evaluation is restricted to clean English speech corpora (VCTK dataset) with synthetic downsampling conditions, leaving real-world acoustic degradations, noise, and cross-lingual generalization untested. The architecture is optimized specifically for monaural speech bandwidth extension rather than general music or multi-channel audio processing.

## Why read this

Speech and ML engineers looking to build lightweight, edge-deployable generative audio models will find valuable insights in FastWave's application of EDM and ConvNeXtV2 design principles to diffusion-based bandwidth extension.

## Code

- https://github.com/Nikait/FastWave

## Applications

On-device speech enhancement, real-time telephony bandwidth extension, and streaming audio upsampling for consumer hardware.

## Institutions / 機構

HSE University, VK LLC

## Related

- (link related pages by id as the wiki grows)
