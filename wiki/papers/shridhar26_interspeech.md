---
id: shridhar26_interspeech
category: health
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-550
pdf: https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.pdf
---

# Lung-SRAD: Spectral-Aware Regularized Audio DASS with Dual-Axis Patch-Mix Contrastive Learning for Respiratory Sound Classification

[PDF](https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shridhar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-550)

**TL;DR** — This paper proposes Lung-SRAD, a state space model architecture for respiratory sound classification that uses spectral-aware regularization and dual-axis patch-mix contrastive learning to achieve an ICBHI score of 64.48%, outperforming the AST baseline by 5%.

## Problem

Audio Spectrogram Transformers (AST) rely on global self-attention with a CLS token, which behaves as a low-pass filter that suppresses mid-to-high spatial frequencies and reduces sensitivity to localized abnormal respiratory events like crackles and wheezes. Additionally, the quadratic time and memory complexity of self-attention makes Transformers computationally expensive for long audio sequences. Preserving these fine-grained spectro-temporal variations while maintaining efficiency is critical for accurate respiratory disease diagnosis.

## Method

The method builds on the Distilled Audio State Space (DASS) model utilizing a 2D Selective State Space (SS2D) backbone, initialized with AudioSet-distilled weights from Transformer teachers and fine-tuned on 8-second, 16 kHz mel-spectrograms. To overcome the spectral limitations of attention, the authors analyze intermediate layer filter responses and introduce spectral-aware layer regularization using depthwise separable 1D Gaussian convolutions applied to Stage 2 blocks (Blocks 2 and 3) to dampen dominant spectral peaks. Furthermore, they propose a Dual-Axis Patch-Mix supervised contrastive learning strategy tailored to 2D state space scanning paths by replacing consecutive temporal or frequency segments using Beta distribution ratios. All models are optimized using the Adam optimizer with a learning rate of 5 × 10−5 and a batch size of 16.

## Results

Evaluated on the ICBHI benchmark containing 5.5 hours of recordings across 6,898 breathing cycles, the approach is assessed using Sensitivity, Specificity, and the official ICBHI Score as the mean over five random seeds. The proposed DASS model with simple fine-tuning achieves 61.06% score, while the full Lung-SRAD system integrating Gaussian regularization and dual-axis patch-mix contrastive learning reaches 64.48% score. This represents a 5% absolute improvement over the Audio Spectrogram Transformer (AST) baseline.

## Code

- https://github.com/RSC-Toolkit/Lung-SRAD

## Applications

Engineers and researchers working on automated respiratory disease screening, health monitoring systems, and computer-aided auscultation tools can use this approach for more sensitive detection of abnormal lung sounds.

## Limitations

The text does not explicitly state notable limitations or scope bounds.

## Related

- (link related pages by id as the wiki grows)
