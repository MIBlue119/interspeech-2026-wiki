---
id: yerpude26_interspeech
category: health-clinical
institutions: ["Seoul National University of Science and Technology", "Medisensing"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2355
pdf: https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.pdf
---

# Attention-Based Multiple Instance Learning with Tabular Stacking for Ambulatory Detection of PVH and NPVH

*Kiran Yerpude, Seung Gyu Jeong, Seong-Eun Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yerpude26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2355)

**Category:** `health-clinical`

**TL;DR** — A dual-branch stacking architecture combining a subject-level CatBoost model on day-aggregated distributional statistics and a deep multiple-instance learning (MIL) model with gated attention pooling achieves official test AUCs of 0.891 for PVH and 0.861 for NPVH on the NeckVibe Challenge 2026.

## Key contributions

- Robust ambulatory preprocessing pipeline selecting voiced, non-singing, device-on frames while explicitly encoding missingness and sensor dropout.
- Dual-branch architecture pairing a tabular CatBoost model on day-level statistics with a deep MIL branch using SE-ResNet encoders and gated attention pooling.
- Stacked ensemble combining rank-normalized probabilities via logistic regression to reconcile fold-wise calibration drift.
- Comprehensive empirical validation demonstrating complementary strengths across transient phonatory events (PVH) and sustained inefficiencies (NPVH).

## Problem

Clinical assessment of vocal hyperfunction traditionally relies on limited laboratory recordings that fail to capture real-world vocal behavior. Prior ambulatory monitoring approaches depend on hand-crafted summary features and shallow models, operating at the subject level despite underlying data splitting into short, highly variable segments where informative parts are difficult to isolate under weak supervision. Detecting phonotraumatic vocal hyperfunction (PVH) and nonphonotraumatic vocal hyperfunction (NPVH) accurately from multi-day, noisy neck-surface accelerometer (ACC) recordings is critical for early diagnosis.

## Method

The preprocessing pipeline filters 50 ms ACC frames to retain only voiced, non-singing, device-on segments, removes amplitude outliers via robust z-scores, and appends binary missingness indicators to distinguish true zeros from sensor dropout.

The tabular branch utilizes CatBoost trained on day-level robust statistics (mean, variance, skewness, kurtosis, IQR, MAD, tail percentiles, Gini coefficients, frame-to-frame differences) aggregated across days via mean, min, and max. For NPVH, extra interaction features such as phonation efficiency (CPP/f0), closure-periodicity ratios, and harmonic stability ratios are engineered. Hyperparameters include depth, learning rate ~0.01, iterations ~1500, L2 regularization, and class weighting.

The MIL branch models each subject as a bag of fixed-length windows (24 sampled windows of 12 s each). For PVH, each frame contains 12 raw acoustic channels, energy, a global missingness flag, and 117 auxiliary broadcasted day-level stats (131 channels total). Windows pass through a 1D convolutional stem and four residual blocks with squeeze-and-excitation (SE) modules, outputting 256-dimensional embeddings. Gated attention pooling aggregates window embeddings, followed by a 3-layer MLP with LayerNorm and dropout (0.3), trained with class-weighted cross-entropy and focal loss.

The stacking ensemble applies quantile transformers to normalize OOF probabilistic predictions and builds a 4-dimensional meta-feature vector (base probabilities, absolute difference, product). A logistic regression meta-classifier with balanced class weights yields the final decision.

## Experimental setup

Evaluated on the NeckVibe Challenge dataset containing long-term neck-surface accelerometer recordings from 582 individuals (213 PVH patients, 169 matched controls, 116 NPVH patients, 84 matched controls). Evaluated using 5-fold stratified GroupKFold cross-validation with subject ID grouping. The primary metric is subject-level area under the ROC curve (AUC), supplemented by accuracy, F1-score, precision, sensitivity, and specificity.

## Results

The proposed system achieved an official test AUC of 0.891 for PVH (rank 3) and 0.861 for NPVH (rank 1). In internal 5-fold cross-validation, the stacked ensemble obtained an OOF AUC of 0.885 [0.850, 0.917] for PVH, outperforming MIL-only (0.835) and CatBoost-only (0.875). For NPVH, the stacked OOF AUC was 0.757 [0.697, 0.810], marginally outperforming CatBoost-only (0.751) and MIL-only (0.717). Ablations show that removing the MIL branch drops PVH AUC by 0.010, while dropping interaction features hurts PVH by 0.027 and NPVH by 0.027.

| System / Condition | PVH AUC | NPVH AUC |
|---|---|---|
| CNN-LSTM baseline | 0.764 | 0.673 |
| MIL only (no stacking) | 0.871 | 0.718 |
| CatBoost only | 0.885 | 0.751 |
| w/o quantile normalization | 0.874 | 0.739 |
| **Full system (proposed)** | **0.886** | **0.753** |

## Limitations

The study relies on a single dataset (NeckVibe Challenge) with specific device form-factors and recording conditions, leaving cross-dataset generalization unproven. NPVH classification remains challenging due to high intra-class diversity and severe class imbalance, resulting in underconfident probability calibrations. The deep branch yields only marginal AUC gains over the optimized tabular baseline, indicating potential redundancy or optimization limits in the temporal modeling.

## Why read this

Speech and machine learning researchers working on multi-day biomedical time-series or weakly supervised audio classification should read this paper to learn how to effectively combine global distributional tabular models with attention-based multiple-instance learning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated ambulatory health monitoring systems for early detection and continuous tracking of vocal hyperfunction disorders.

## Institutions / 機構

Seoul National University of Science and Technology, Medisensing

**Funding / 經費:** National Research Foundation of Korea, AI Seoul Tech Research Support Program, Seoul Future Foundation

## Related

- [A Hierarchical Feature Engineering Framework for Automated Classification of Phonotraumatic and Non-Phonotraumatic Vocal Hyperfunction](kim26x_interspeech.md) — same problem · relatedness 3.0/3
- [Temporal Partitioning of Vocal Activity for Detecting Vocal Hyperfunction from Neck-Surface Accelerometer Data](azarski26_interspeech.md) — same problem · relatedness 3.0/3
- [The Interspeech 2026 NeckVibe Challenge: Voice Disorder Detection via Real-World Monitoring of Neck-Surface Vibration](yousef26b_interspeech.md) — shared data / evaluation · relatedness 2.9/3
- [Measuring Vocal Efficiency in Daily Life in Patients with Voice Disorders Using Wireless Accelerometer and Microphone Sensors](yousef26c_interspeech.md) — same problem · relatedness 1.9/3
- [Stuttering Classification and Segmentation with Attention-Based Multiple Instance Learning](susac26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
