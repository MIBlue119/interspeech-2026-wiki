---
id: kim26k_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1213
pdf: https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.pdf
---

# Quality Adaptive Angular Margin Learning for Respiratory Sound Classification

[PDF](https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1213)

**TL;DR** — QLung is a quality-adaptive angular margin learning framework for respiratory sound classification that improves feature generalization, achieving a 2.46% performance gain on the ICBHI dataset over cross-entropy baselines.

## Problem

Public respiratory sound datasets frequently contain variable-quality recordings and severe class imbalance, which cause standard models to amplify noise or overfit to majority classes. This heterogeneity undermines clear decision boundaries, reducing generalization and reliability in real-world clinical deployments.

## Method

The framework utilizes an angular classifier that L2-normalizes both feature vectors and class weights to enforce decisions purely on angular similarity. It incorporates Dual Factor Angular Margin Regularization (DFAM), which combines a no-reference Audio Quality Score derived from spectral entropy and RMS energy with a log-scaled class-imbalance margin. The model is trained jointly using standard cross-entropy and the DFAM loss. Experiments were conducted using Audio Spectrogram Transformer (AST) and Audio-CLAP backbones, processing 8-second respiratory cycles into 128-dimensional log-Mel filterbanks.

## Results

Evaluated on the ICBHI dataset (60-40% official split) and the out-of-distribution SPRSound dataset using specificity, sensitivity, and their arithmetic mean (Score). On ICBHI with an AST backbone, QLung improved the Score from 59.55% to 62.01%, and with an Audio-CLAP backbone from 62.56% to 63.39%. On the SPRSound out-of-distribution benchmark, QLung achieved the best score of 59.80%. Ablations confirm that incrementally adding the angular margin, audio quality score, class-imbalance correction, and angular classifier progressively boosts the performance.

## Code

- https://github.com/RSC-Toolkit/QLung

## Applications

Engineers and researchers building automated medical diagnostic systems for respiratory disease screening and acoustic analysis from lung sound recordings.

## Limitations

While overall performance increases, the framework exhibits a minor reduction in individual accuracy for specific sub-classes like crackles while significantly improving normal and overlapping event classification.

## Related

- (link related pages by id as the wiki grows)
