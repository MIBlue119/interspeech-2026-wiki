---
id: kuznetsov26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2721
pdf: https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.pdf
---

# FastWave: Optimized Diffusion Model for Audio Super-Resolution

[PDF](https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kuznetsov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2721)

**TL;DR** — FastWave is an optimized, low-parameter diffusion model for audio super-resolution that achieves state-of-the-art performance while reducing parameters to 1.3M and computational complexity to ~50 GFLOPs.

## Problem

Current diffusion and flow models for audio super-resolution achieve high reconstruction quality but require massive computational resources and high-parametric networks, making them impractical for edge computing and real-time streaming on consumer devices. While GANs offer faster inference, they often lag in perceptual quality compared to diffusion baselines. Bridging this gap requires designing a parameter-efficient diffusion architecture with faster inference (fewer function evaluations) and reduced training overhead.

## Method

FastWave builds upon the NU-Wave 2 architecture by incorporating the EDM (Elucidating the Design Space of Diffusion-Based Generative Models) training framework and architectural improvements inspired by ConvNeXtV2. It replaces standard convolutions with depthwise separable convolutions in local processing blocks (FFC modules and BSFT shared MLPs) and adds Global Response Normalization (GRN) to enhance cross-channel interaction. The network is trained using a sigma-parameterized weighted L2 denoising loss with data-driven log-normal noise distribution scaling. Inference relies on a continuous noise schedule solved via a first-order Euler probability flow ODE with 4 to 8 NFEs.

## Results

Evaluated on the 44-hour VCTK dataset (100 speakers for training, 8 for testing) upsampling from 8, 12, 16, and 24 kHz to 48 kHz, FastWave is compared against NU-Wave 2, AudioSR, and FlowHigh. Trained for only 140 epochs on a single V100 GPU (compared to 649 epochs on dual A100s for the baseline), FastWave matches or exceeds the baseline reconstruction quality in SNR and Log-Spectral Distance (LSD) while slashing parameters to 1.3M (a 30% reduction) and lowering computational complexity to 12.87 GFLOPs per NFE.

## Code

- https://github.com/Nikait/FastWave

## Applications

Speech engineers and developers building real-time on-device audio upsampling, bandwidth extension, and streaming super-resolution applications for resource-constrained consumer hardware.

## Related

- (link related pages by id as the wiki grows)
