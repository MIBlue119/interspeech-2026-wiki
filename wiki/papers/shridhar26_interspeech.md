---
id: shridhar26_interspeech
category: health-clinical
labels: [self-supervised]
institutions: ["MODULABS", "Wonkwang University"]
code: https://github.com/RSC-Toolkit/Lung-SRAD
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-550
pdf: https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.pdf
---

# Lung-SRAD: Spectral-Aware Regularized Audio DASS with Dual-Axis Patch-Mix Contrastive Learning for Respiratory Sound Classification

*Hemansh Shridhar, Miika Toikkanen, June-Woo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-550)

**Category:** `health-clinical` · **Labels:** `self-supervised`

**TL;DR** — Lung-SRAD adapts a distilled audio state space model (DASS) for respiratory sound classification, using spectral-aware layer regularization and dual-axis patch-mix contrastive learning to achieve a 64.48% score on the ICBHI benchmark.

## Key contributions

- First application of a distilled State Space Model (DASS) as an efficient alternative to Transformers for respiratory sound classification.
- Identification of low-pass vs. mid-to-high frequency feature behavior in SSMs via Fourier-domain spectral response curves.
- Introduction of spectral-aware layer regularization via separable depthwise Gaussian convolution on selected intermediate blocks.
- Design of Dual-Axis Patch-Mix supervised contrastive learning tailored specifically to 2D Selective State Space (SS2D) traversal directions.

## Problem

Respiratory anomalies such as crackles and wheezes manifest as short-duration, localized spectro-temporal structures. Popular Transformer backbones like the Audio Spectrogram Transformer (AST) rely on softmax self-attention, which acts as a low-pass filter that suppresses high-frequency inter-token variations and creates an attention sink on the CLS token. This spectral bias causes Transformers to miss sparse, localized abnormalities buried in normal breathing patterns, motivating the exploration of State Space Models that preserve mid-to-high spatial-frequency components.

## Method

The architecture utilizes DASS, a hierarchical audio state space model built upon VMamba that processes melspectrograms through 2D Selective State Space (SS2D) scanning blocks across four stages. SS2D converts 2D feature maps into four directional sequences (row-wise, column-wise, and their reverses) processed independently by selective SSMs and merged, ensuring linear complexity while capturing multi-directional context. Pretrained weights are transferred from an AudioSet-distilled ensemble of AST and HTS-AT teachers.

To prevent intermediate layers from overfitting to excessive local variations, spectral-aware regularization applies depthwise separable 1D Gaussian kernels (kernel size K=5, sigma=3) specifically to Stage 2 blocks (Blocks 2 and 3) that exhibit prominent mid-to-high frequency peaks. This attenuates dominant spectral peaks while preserving harmonic structure, improving specificity.

For representation learning, Dual-Axis Patch-Mix contrastive learning replaces flat random patches with axis-aligned temporal and frequency mixing ratios sampled from a Beta distribution (beta=1.0). An asymmetric gradient strategy with stop-gradients on mixed samples prevents collapse of structured state-space dynamics. The objective function combines standard cross-entropy with time-only and frequency-only InfoNCE contrastive losses (temperature tau=0.20).

## Experimental setup

Evaluated on the ICBHI dataset comprising 5.5 hours of audio and 6,898 breathing cycles, using the official 60% train and 40% test patient-independent split (4,142 train cycles, 2,756 test cycles). Cycles are standardized to 8 seconds, resampled to 16 kHz, and augmented with SpecAugment (max mask length 160 frames, 48 frequency bins). Models are trained using the Adam optimizer with a learning rate of 5e-5 and batch size 16 over five random seeds. Metrics include Sensitivity (Se), Specificity (Sp), and the official ICBHI Score (Sc = (Se + Sp) / 2).

## Results

On the 4-class ICBHI task, baseline DASS fine-tuning achieves a 61.06% Score (Sp: 74.68%, Se: 47.43%). Adding spectral-aware regularization raises the Score to 62.22% (Sp: 76.72%, Se: 47.72%). Combining regularization with Dual-Axis Patch-Mix contrastive learning (Lung-SRAD) pushes the Score to 64.48% (Sp: 79.53%, Se: 49.42%), outperforming the AST baseline by 5%. In the 2-class normal vs. abnormal setting (derived from 4-class weights), Lung-SRAD reaches a 72.57% Score, outperforming prior published benchmarks.

| System / Condition | Sp (%) | Se (%) | Score (%) |
| --- | --- | --- | --- |
| AST Baseline (Fine-tuning) [8] | 77.14 | 41.97 | 59.55 |
| AST + Patch-Mix CL [8] | 81.66 | 43.07 | 62.37 |
| DASS Fine-tuning (Ours) | 74.68 | 47.43 | 61.06 |
| DASS + Spectral-Aware Reg. (Ours) | 76.72 | 47.72 | 62.22 |
| Lung-SRAD [DASS + Reg + Dual-Axis CL] | 79.53 | 49.42 | 64.48 |

## Limitations

The evaluation is restricted to a single benchmark dataset (ICBHI) of limited duration (5.5 hours), leaving open questions regarding cross-dataset generalization to unseen hospital recording devices and acoustic environments. The approach relies heavily on AudioSet distillation and requires careful hyperparameter tuning of the Gaussian kernel size and temperature to avoid degrading sensitivity.

## Why read this

Researchers and engineers working on bioacoustic classification or efficient non-Transformer architectures should read this paper to see how to adapt State Space Models for spectrogram processing by diagnosing and regularizing their spectral response profiles.

## Code

- https://github.com/RSC-Toolkit/Lung-SRAD

## Applications

Automated respiratory disease screening, smart stethoscope diagnostics, and on-device continuous health monitoring for conditions like asthma, COPD, and pneumonia.

## Institutions / 機構

MODULABS, Wonkwang University

**Funding / 經費:** Regional Innovation System & Education program, National Research Foundation of Korea

## Related

- [Quality Adaptive Angular Margin Learning for Respiratory Sound Classification](kim26k_interspeech.md) — same problem · relatedness 2.9/3
- [Zero-Shot Respiratory Sound Classification through LLM-Augmented Audio-Text Alignment](ilerisoy26_interspeech.md) — same problem · relatedness 2.6/3
- [Lung-CL: Spectrum-aware Distillation and Generative Replay for Continual Learning based buffer-free Respiratory Sound Classification](lai26_interspeech.md) — same problem · relatedness 2.3/3
- [From Signals to Patterns: Non-Invasive Tuberculosis Detection from Cough Audio using Bandit Weighted Hyperbolic Prototypes](akhtar26_interspeech.md) — same problem · relatedness 2.1/3
- [Similarity as Evidence: An Explainable Siamese Framework for Snore Sound Classification](meng26f_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
