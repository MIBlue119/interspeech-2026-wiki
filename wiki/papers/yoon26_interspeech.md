---
id: yoon26_interspeech
category: acoustic-scene-classification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-370
pdf: https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.pdf
---

# Robust Multi-Source-Free Domain Adaptation via Posterior Adjustment and Label Agreement

[PDF](https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-370)

**TL;DR** — FASOLA is a robust multi-source-free domain adaptation framework for acoustic scene classification that mitigates device heterogeneity using posterior adjustment and label agreement, achieving an average accuracy of 54.43% on DCASE 2020 Task 1A.

## Problem

Deploying acoustic scene classification models to unlabeled target environments suffers from severe performance drops due to device heterogeneity like varying microphone frequency responses. Multi-Source-Free Domain Adaptation offers privacy-compliant adaptation without source data, but existing model aggregation is hindered by persistent prediction biases and unreliable confidence scores under distribution shifts. Standard feature alignment via Adaptive Batch Normalization fails to correct these underlying label distribution mismatches.

## Method

The framework utilizes a set of frozen pre-trained source models with CP-ResNet backbones and incorporates two main strategies during target inference. First, a posterior adjustment module estimates global target class priors using momentum updates and recalibrates each source model's logits by aligning its marginal prediction distribution with these estimated priors. Second, a label agreement module computes adaptive importance weights based on how consistently each model's predictions align with the majority vote of the ensemble rather than relying on raw confidence. The final target prediction is obtained by a weighted aggregation of the adjusted posterior probabilities.

## Results

Evaluated on the DCASE 2020 Task 1A dataset using a leave-one-domain-out protocol across six simulated target devices (S1-S6) and real devices A, B, and C. FASOLA achieves an average accuracy of 54.43% and an F1-score of 54.04%, outperforming standard baselines including Uniform averaging (45.38% acc), DECISION (47.69% acc), CAiDA (47.39% acc), and Bi-ATEN (51.16% acc). Ablation studies demonstrate that combining both posterior adjustment and label agreement yields steady performance gains over naive aggregation and individual components under both raw and AdaBN pre-processed settings.

## Code

- https://github.com/snudatalab/FASOLA

## Applications

Engineers and researchers deploying acoustic scene classification or environmental audio monitoring systems across diverse, heterogeneous edge recording devices without access to original training data.

## Related

- (link related pages by id as the wiki grows)
