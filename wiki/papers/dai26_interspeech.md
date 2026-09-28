---
id: dai26_interspeech
category: sound-event-detection
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-353
pdf: https://www.isca-archive.org/interspeech_2026/dai26_interspeech.pdf
---

# Consistency-Regularized Dual-Branch Network with Performance-Aware Mean Teacher for Sound Event Detection

[PDF](https://www.isca-archive.org/interspeech_2026/dai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-353)

**TL;DR** — This paper introduces a consistency-regularized dual-branch network with a performance-aware mean teacher for sound event detection, achieving a state-of-the-art Score of 1.309 on the DCASE 2024 Challenge Task 4 dataset.

## Problem

Sound event detection models using multi-layer pre-trained feature extractors often suffer from scale inconsistency between independent shallow and deep branches, leading to local optima during training. Furthermore, standard semi-supervised mean teacher frameworks employ a fixed exponential moving average update rate that ignores non-monotonic training fluctuations in student models. Addressing these issues is vital for improving temporal localization and classification performance under noisy, weakly-labeled, or semi-supervised acoustic settings.

## Method

The architecture utilizes a pre-trained Audio Teacher Student Transformer (ATST) front-end feeding a cascaded dual-branch Conformer back-end (each with 4 layers and a feature dimension of 256) that separately models shallow and deep normalized features. A temporal topology consistency (TTC) loss enforces structural alignment by calculating the mean squared error between the normalized temporal self-similarity matrices of both branches. A performance-aware mean teacher (PA-MT) framework uses an adaptive exponential moving average where the teacher model update magnitude dynamically switches between a fast and slow decay factor based on whether the student's reference loss achieves a new minimum. Finally, a cross-stage fusion strategy combines the outputs of models before and after fine-tuning the pre-trained encoder.

## Results

Evaluated on the DCASE 2024 Challenge Task 4 dataset (comprising DESED and MAESTRO Real clips supplemented with AudioSet data), the proposed method achieves 0.541 PSDS1, 0.768 mpAUC, and an overall Score of 1.309, outperforming baseline models such as ATST-DBC and CP-JKU. Ablation studies confirm that removing either the TTC loss or the PA-MT framework degrades performance, lowering the combined Score to 1.303 and 1.300 respectively, while omitting both drops the Score to 1.291. The complete two-stage training with cross-stage fusion consistently establishes superior metrics across PSDS1 and mpAUC compared to single-stage or uncombined variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building domestic, industrial, or smart-home audio monitoring systems for robust sound event detection and temporal localization.

## Related

- (link related pages by id as the wiki grows)
