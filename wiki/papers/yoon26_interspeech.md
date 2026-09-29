---
id: yoon26_interspeech
category: audio-understanding
labels: [robustness-noise]
institutions: ["Seoul National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-370
pdf: https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.pdf
---

# Robust Multi-Source-Free Domain Adaptation via Posterior Adjustment and Label Agreement

*Hoyoung Yoon, U Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yoon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-370)

**Category:** `audio-understanding` · **Labels:** `robustness-noise`

**TL;DR** — FASOLA is a robust multi-source-free domain adaptation framework for acoustic scene classification that corrects device-induced prediction biases and weights models via label agreement, improving average accuracy to 54.43% on DCASE 2020 Task 1A.

## Key contributions

- Proposes FASOLA, an MSFDA framework combining posterior adjustment and label agreement for privacy-compliant acoustic scene classification across heterogeneous devices.
- Introduces a posterior adjustment module that estimates target class priors without labels and recalibrates source model logits to eliminate device-specific prediction biases.
- Develops a label agreement module that replaces unreliable confidence measures with prediction consistency to dynamically prioritize trustworthy source models.
- Demonstrates state-of-the-art performance across six unseen target devices (S1-S6) on DCASE 2020 Task 1A, outperforming prior unsupervised aggregation baselines.

## Problem

Real-world acoustic scene classification suffers from severe performance degradation due to device heterogeneity, such as varying microphone frequency responses. While multi-source-free domain adaptation (MSFDA) protects privacy by avoiding raw source data sharing, aggregating diverse pre-trained models on unlabeled target domains is hindered by persistent prediction biases and unknown acoustic similarities. Prior methods rely heavily on confidence or entropy measures that fail under distribution misalignment, often misguiding adaptation by reinforcing biased predictions or overemphasizing miscalibrated models.

## Method

FASOLA takes a set of $K$ frozen source models and an unlabeled target dataset $D = \{\mathbf{x}_j\}_{j=1}^{|D|}$ to predict target labels without accessing source training data. The pipeline consists of three sequential steps per target sample: logit calibration via posterior adjustment, source reliability weighting via label agreement, and weighted probability aggregation.

The posterior adjustment module addresses class-frequency prediction bias by re-centering each source model's outputs. It computes the empirical marginal prediction distribution $\hat{\mathbf{p}}^k$ for the $k$-th model over the unlabeled target set and estimates the global target class prior $\hat{\mathbf{q}}$ iteratively using a momentum update rate $\alpha$. The calibrated logit $\tilde{\mathbf{z}}_j^k$ is obtained by subtracting the log source prediction bias and adding the log estimated target prior, scaled by a correction strength hyperparameter $\tau$: $\tilde{\mathbf{z}}_j^k = \mathbf{z}_j^k - \tau (\log \hat{\mathbf{p}}^k - \log \hat{\mathbf{q}})$.

The label agreement module computes source importance weights without relying on uncalibrated confidence scores. For each model, it measures prediction consistency against the majority vote of the other source models using an indicator function over argmax predictions. The resulting agreement scores are normalized using a sharpness control parameter $\gamma$ to yield adaptive ensemble weights $w_k$. Finally, the predictions are combined via weighted aggregation of the adjusted softmax probabilities to yield the final classification.

## Experimental setup

Evaluated on the DCASE 2020 Task 1A dataset, which features 10 acoustic scene classes across real (A, B, C) and simulated (S1-S6) recording devices using a Leave-One-Domain-Out protocol where each simulated device serves as an unseen target in turn. The backbone architecture is CP-ResNet with models pre-trained independently and frozen, and AdaBN pre-processing applied to align batch normalization statistics. Compared against Oracle, Uniform ensemble, DECISION, CAiDA, DATE, and Bi-ATEN.

## Results

FASOLA achieves an average accuracy of 54.43% and an average F1-score of 54.04% across all six unseen target devices (S1-S6), outperforming the Uniform ensemble (50.68% Acc), DECISION (51.88%), CAiDA (51.57%), and Bi-ATEN (50.39%). On Target S6 specifically, FASOLA reaches 50.74% accuracy and 50.53% F1-score. Ablation studies confirm that combining posterior adjustment and label agreement outperforms using either component in isolation under both raw and AdaBN pre-processed settings. Furthermore, FASOLA achieves the highest correlation with true target accuracy among evaluated source weighting techniques, with a Pearson correlation $r = 0.9365$ and Spearman rank correlation $\rho = 0.9286$.

| Method | Target S1 Acc | Target S2 Acc | Target S3 Acc | Target S4 Acc | Target S5 Acc | Target S6 Acc | Average Acc |
|---|---|---|---|---|---|---|---|
| Oracle | 38.89 | 40.37 | 48.06 | 49.81 | 55.00 | 43.15 | 45.88 |
| Uniform | 42.69 | 42.69 | 56.94 | 55.56 | 59.17 | 47.04 | 50.68 |
| DECISION [9] | 43.52 | 44.07 | 57.31 | 57.87 | 60.83 | 47.69 | 51.88 |
| CAiDA [30] | 43.15 | 44.63 | 59.81 | 56.67 | 58.24 | 46.94 | 51.57 |
| Bi-ATEN [32] | 42.59 | 43.33 | 56.11 | 55.19 | 58.06 | 47.04 | 50.39 |
| FASOLA (proposed) | 46.20 | 48.89 | 59.81 | 60.00 | 60.93 | 50.74 | 54.43 |

## Limitations

The framework relies on offline global target statistics across the entire target dataset to estimate priors, making it unsuitable for real-time streaming or single-sample edge deployment without modification. Evaluation is restricted to acoustic scene classification on the DCASE 2020 dataset, leaving broader speech domains like ASR or speaker verification unverified.

## Why read this

Researchers working on source-free domain adaptation and multi-model ensembling will learn how explicit posterior alignment and consensus-based weighting overcome the failure modes of confidence-based selection under severe domain shifts.

## Code

- https://github.com/snudatalab/FASOLA

## Applications

Deploying robust acoustic scene classification models on edge devices with heterogeneous microphones without accessing raw user audio data.

## Institutions / 機構

Seoul National University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Korea government (MSIT), XVoice: Multi-Modal Voice Meta Learning, AI Star Fellowship Support Program, Global AI Frontier Lab, Artificial Intelligence Graduate School Program

## Related

- (link related pages by id as the wiki grows)
