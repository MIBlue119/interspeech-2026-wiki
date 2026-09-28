---
id: karani26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2330
pdf: https://www.isca-archive.org/interspeech_2026/karani26_interspeech.pdf
---

# mmWave Radar Aware Dual-Conditioned GAN for Speech Reconstruction of Signals With Low SNR

[PDF](https://www.isca-archive.org/interspeech_2026/karani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/karani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2330)

**TL;DR** — The paper introduces RAD-GAN, a two-stage generative adversarial network that performs 1kHz-to-4kHz bandwidth extension and speech reconstruction on extremely low-SNR (-5 dB to -1 dB) mmWave radar captures, achieving a top weighted evaluation score of 0.333.

## Problem

Millimeter-wave radar provides contact-free, non-intrusive voice detection through obstacles, but captures are heavily contaminated by noise, band-limited, and information-poor, making intelligible speech reconstruction exceptionally difficult. Existing approaches often rely on large datasets, massive compute, or pre-trained modules, and fail to perform robustly under adverse low-SNR settings (-5 dB to -1 dB).

## Method

The architecture comprises a HiFi-GAN-based generator, a Multi-Period Discriminator, a Multi-Scale Discriminator, and an mmWave-tailored Multi-Mel Discriminator (MMD) utilizing dual spectral- and weight-normalization branches. It features a Residual Fusion Gate (RFG) that combines noisy inputs with enhanced mel spectrograms from a WaveVoiceNet (WVN) auxiliary module via frame-wise cross-frequency mixing. The training protocol uses a two-stage approach: a pre-training phase on synthetically clipped clean speech utilizing L1 mel loss and multi-resolution STFT loss, followed by fine-tuning on real radar recordings with full adversarial and feature-matching objectives. The model contains 87,000,536 parameters and is trained on ~42 hours of paired speech data across two capture scenarios.

## Results

Evaluated on the RASE 2026 Challenge dataset comprising direct diaphragm vibration (Task 1) and secondary surface reflection through glass walls (Task 2), RAD-GAN is benchmarked against baselines including WaveVoiceNet, HiFi-GAN, DCCTN, AP-BWE, DiffWave, and CDiffuSE. Using a weighted aggregate score across PESQ, ESTOI, CSMFCC, and DNSMOS (weighting Task 2 at 0.6 due to higher difficulty), RAD-GAN achieves the best overall score of 0.333 (Task 1: 0.387, Task 2: 0.297), compared to 0.260 for WaveVoiceNet and 0.288 for HiFi-GAN. An incremental ablation study confirms that adding MMD/MR-STFT, pre-training, and WVN conditioning provides steady cumulative gains over the base HiFi-GAN architecture.

## Code

- https://github.com/chitadi/RADGAN

## Applications

Speech and ML engineers working on non-contact acoustic sensing, secure communications, or ambient assisted living systems utilizing radar hardware.

## Limitations

The model currently lacks real-time deployment validation and requires model compression or distillation for efficient edge inference.

## Related

- (link related pages by id as the wiki grows)
