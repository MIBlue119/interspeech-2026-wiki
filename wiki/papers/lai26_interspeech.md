---
id: lai26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1199
pdf: https://www.isca-archive.org/interspeech_2026/lai26_interspeech.pdf
---

# Lung-CL: Spectrum-aware Distillation and Generative Replay for Continual Learning based buffer-free Respiratory Sound Classification

*Qinben Lai, Lukui Shi, Jiaxin Zhao, Wenjuan Wang, Shuai Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/lai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1199)

**TL;DR** — Lung-CL is a buffer-free continual learning framework for respiratory sound classification that uses Class-Specific Latent Replay and Multi-Level Spectrum-Aware Distillation, achieving a backward transfer (BWT) of -4.00% on sequential clinical datasets.

## Key contributions

- A unified buffer-free domain-incremental learning framework that avoids storing patient audio, complying with GDPR and HIPAA data privacy regulations.
- Class-Specific Latent Replay (CSLR) strategy using lightweight Class-Specific Gaussian Mixture Models (CS-GMMs) to synthesize pseudo-features at the semantic bottleneck.
- Multi-Level Spectrum-Aware Distillation (MLSAD) featuring an Energy-Gated Distillation (EGD) module to filter out device-specific and background noise.
- Rigorous evaluation across three heterogeneous clinical datasets (ICBHI, SPRSound, and HF) demonstrating superior anti-forgetting compared to existing buffer-free and select buffer-based baselines.

## Problem

Real-world respiratory sound classifiers experience severe performance degradation due to domain shifts when deployed across different hospitals, recording devices, and patient cohorts. Standard continual learning approaches fail because replay methods violate patient privacy regulations by storing raw audio, while buffer-free knowledge distillation techniques are completely agnostic to time-frequency sparsity. Consequently, prior methods struggle to isolate true pathological sounds like wheezes and crackles from low-energy device-specific artifacts and background noise.

## Method

Lung-CL uses a Teacher-Student architecture built on top of an Audio Spectrogram Transformer (AST) backbone, which is structurally partitioned into a frozen feature extractor (the first 6 layers, denoted as G) and an adaptive semantic learner (the last 6 layers and classification head, denoted as H). Because the low-level weights in G are frozen, the intermediate representations remain stationary during sequential learning, providing a stable latent feature space for fitting lightweight Class-Specific Gaussian Mixture Models (CS-GMMs) with diagonal covariance matrices. The optimal number of mixture components K (up to a maximum of 10) is dynamically determined for each class using the Bayesian Information Criterion (BIC).

To prevent catastrophic forgetting without storing real patient audio, the CSLR module samples synthetic pseudo-features from the stored CS-GMM memory and feeds them directly into the trainable semantic learner H alongside incoming current-domain data. Concurrently, the Multi-Level Spectrum-Aware Distillation (MLSAD) mechanism tackles acoustic domain interference by combining three objectives: (1) Energy-Gated Distillation (EGD), which uses an energy-weight matrix to concentrate the student-teacher feature alignment on high-energy time-frequency bands containing valid pathological cues while downweighting background noise; (2) a Global Cosine Embedding Loss to align bottleneck semantic directions independent of amplitude shifts; and (3) a Kullback-Leibler (KL) divergence distillation loss over output logits softened by temperature parameter tau to preserve inter-class relationships.

The student model is trained end-to-end via a combined objective function comprising classification loss, EGD loss (LEGD), cosine similarity loss (LCosine), and standard knowledge distillation loss (LKD). Input recordings are standardized to 16 kHz, with a fixed sample duration of 8 seconds (798 frames) mapped into Mel-spectrograms spanning 50-2000 Hz.

## Experimental setup

Evaluated on three heterogeneous clinical datasets: ICBHI (diverse demographics and equipment), SPRSound (pediatric patients), and HF (critical care adults with heavy ventilator background noise). Performance is measured using classification accuracy (ACC), Backward Transfer (BWT) for forgetting, and Incremental Learning Metric (ILM), along with the ICBHI Score (average of sensitivity and specificity). The framework is implemented in PyTorch on an NVIDIA A30 GPU using the Adam optimizer with a learning rate of 5e-5, cosine annealing schedule, a batch size of 8, and trained for 30 epochs per task sequence.

## Results

In the S1 sequence (ICBHI -> SPRSound -> HF), Lung-CL achieves an overall accuracy of 61.81% and a state-of-the-art BWT score of -4.00%, outperforming parameter regularization baselines like EWC (-8.89%) and SI (-10.86%), and even beating buffer-based models like Experience Replay (ER) which scored -4.15%. In the S3 sequence (HF -> SPRSound -> ICBHI), Lung-CL achieves an accuracy of 61.81% and a BWT of -5.05%. Ablation experiments demonstrate that adding the CSLR generative replay improves BWT from -14.11% (naive fine-tuning) to -8.20%, while incorporating the Energy-Gated Distillation (LEGD) further pushes BWT to the optimal -4.00%.

| Approach | S1 ACC (%) | S1 BWT (%) | S2 ACC (%) | S2 BWT (%) | S3 ACC (%) | S3 BWT (%) |
|---|---|---|---|---|---|---|
| Naive | 58.70 | -14.11 | 53.32 | -22.68 | 55.77 | -18.73 |
| Cumulative | 70.20 | -1.30 | 69.54 | -2.12 | 69.04 | -3.05 |
| EWC [11] | 61.33 | -8.89 | 57.54 | -12.75 | 60.18 | -11.54 |
| ER [29] | 66.04 | -4.15 | 59.82 | -9.83 | 61.11 | -11.70 |
| Lung-CL (Ours) | 61.81 | -4.00 | 61.20 | -9.60 | 61.81 | -5.05 |

## Limitations

The framework assumes a fixed label space mapped across diverse datasets, which may limit flexibility when encountering entirely novel disease categories in future unseen clinical domains. Although CS-GMM avoids raw data storage, fitting and sampling Gaussian mixtures on high-dimensional feature spaces requires careful hyperparameter tuning of component counts via BIC to avoid singular solutions. The evaluation is restricted to three specific respiratory databases, and performance bounds on extremely noisy ambulatory audio outside clinical settings remain unverified.

## Why read this

Researchers and engineers working on privacy-preserving continual learning for medical audio or speech classification will find this paper valuable for its novel combination of generative latent replay via GMMs and energy-gated feature distillation.

## Code

- https://github.com/ben100118/Lung-CL

## Applications

Privacy-preserving automated respiratory disease screening and acoustic diagnostic tools deployed across heterogeneous hospital devices and portable edge hardware.

## Related

- (link related pages by id as the wiki grows)
