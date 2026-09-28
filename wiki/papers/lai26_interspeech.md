---
id: lai26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1199
pdf: https://www.isca-archive.org/interspeech_2026/lai26_interspeech.pdf
---

# Lung-CL: Spectrum-aware Distillation and Generative Replay for Continual Learning based buffer-free Respiratory Sound Classification

[PDF](https://www.isca-archive.org/interspeech_2026/lai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1199)

**TL;DR** — Lung-CL is a buffer-free continual learning framework for respiratory sound classification that uses class-specific latent replay and spectrum-aware distillation to mitigate catastrophic forgetting across heterogeneous clinical domains.

## Problem

Automated respiratory sound diagnostic models suffer from severe performance degradation and catastrophic forgetting when deployed across heterogeneous clinical environments with different recording devices, patient demographics, and background noise. Traditional continual learning solutions either rely on storing raw patient samples which violates strict medical data privacy laws like GDPR and HIPAA, or employ buffer-free knowledge distillation methods that are entirely agnostic to the time-frequency sparse characteristics of audio.

## Method

The framework utilizes an Audio Spectrogram Transformer (AST) backbone split into a frozen feature extractor (first 6 layers) and an adaptive semantic learner (last 6 layers and head). To avoid storing raw audio, it introduces Class-Specific Latent Replay (CSLR) using Class-Specific Gaussian Mixture Models (CS-GMMs) with diagonal covariances and Bayesian Information Criterion (BIC) component selection to synthesize pseudo-features at the semantic bottleneck. It also incorporates a Multi-Level Spectrum-Aware Distillation (MLSAD) mechanism featuring an Energy-Gated Distillation (EGD) module that weights intermediate feature differences to ignore low-energy background noise and focus on high-energy pathological patterns. Training uses an end-to-end composite loss combining EGD, global cosine embedding, KL divergence distillation, and classification losses.

## Results

Evaluated across three sequential domain-incremental scenarios using the ICBHI, SPRSound, and HF datasets mapped to a unified four-class label space (Normal, Crackle, Wheeze, Both), Lung-CL achieves a top overall accuracy of 61.81% on S1 and S3 while securing state-of-the-art backward transfer (BWT) scores of -4.0% in S1 and -5.05% in S3. Ablation tests demonstrate that adding CSLR improves BWT from -14.11% to -8.20%, and the complete integration of EGD and distillation losses further elevates performance.

## Code

- https://github.com/ben100118/Lung-CL

## Applications

Speech and machine learning engineers developing robust, privacy-preserving diagnostic tools for medical auscultation and portable respiratory monitoring devices deployed across multiple hospitals.

## Related

- (link related pages by id as the wiki grows)
