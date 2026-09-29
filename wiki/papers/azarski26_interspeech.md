---
id: azarski26_interspeech
category: health-clinical
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1435
pdf: https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.pdf
---

# Temporal Partitioning of Vocal Activity for Detecting Vocal Hyperfunction from Neck-Surface Accelerometer Data

*Łukasz Łazarski, Bartłomiej Eljasiak, Szymon Szmajdziński, Teresa Makuch, Iwan Ryżenkow, Anna Plęs, Władysław Średniawa*

[PDF](https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azarski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1435)

**Category:** `health-clinical`

**TL;DR** — This paper presents a 1st-place ensemble framework for detecting phonotraumatic and nonphonotraumatic vocal hyperfunction from long-term neck-surface accelerometer data by applying customized temporal data segmentation and feature engineering strategies.

## Key contributions

- Achieved 1st place in the NeckVibe Challenge Task 1 for phonotraumatic vocal hyperfunction (PVH) detection with an AUC of 0.925 on the official test set.
- Proposed a ten-interval daily temporal segmentation strategy combined with speech-singing acoustic separation to capture intra-day vocal variation.
- Demonstrated that Logistic Regression and XGBoost ensembles robustly mitigate subject-level overfitting on small clinical datasets.
- Advanced state-of-the-art results for nonphonotraumatic vocal hyperfunction (NPVH) detection, reaching an AUC of 0.820 on the test set using optimized 5-minute windowing.

## Problem

Detecting vocal hyperfunction from ambulatory neck-surface accelerometer recordings is difficult due to high inter-subject variance and the complex, fluctuating nature of daily voice use. Prior approaches rely on full-day aggregated statistics or simple uniform windowing, which fail to capture distinct behavioral patterns across circadian rhythms or intermittent muscular tension. This limitation leads to poor generalization on unseen patients, making robust automated screening for phonotraumatic (PVH) and nonphonotraumatic (NPVH) vocal hyperfunction challenging.

## Method

The framework processes continuous neck-surface accelerometer signals into 50 ms frame-level time-series features, including fundamental frequency, sound pressure level, cepstral peak prominence, spectral tilt, harmonics differences (H1-H2), low-to-high power ratio, and impedance-based inverse filtering (IBIF) aerodynamic features. For PVH detection, the data is preprocessed using two distinct pipelines: Model 1 employs ten overlapping daily time windows (spanning 3 to 5 hours plus a night window) calculating five statistical descriptors plus voiced fractions (yielding 300 features), while Model 2 separates voiced speech and singing across four non-overlapping intervals. Model 1 uses a regularized XGBoost classifier (1000 trees, learning rate 0.03, max depth 6, min child weight 25, gamma 0.2, row/feature subsampling, and L1/L2 penalties), and Model 2 uses a regularized Logistic Regression classifier. The final PVH prediction averages the probabilities of both models without additional training. For NPVH detection, a different strategy is used based on 5-minute segments containing at least 10% speech/singing data, processed via an XGBoost model configured with 500 trees, max depth 4, gamma 7, high L2 regularization (25), and positive class weighting (8.5).

All models are trained and validated using Leave-One-Group-Out (LOGO) cross-validation at the subject level to prevent data leakage. Inference involves extracting the configured temporal segments per recording day, running feature extraction, generating frame- or window-level predictions, and averaging probabilities across days to produce final subject-level classifications.

## Experimental setup

The study utilized the NeckVibe Challenge dataset containing ambulatory accelerometer recordings from 582 individuals (213 PVH patients, 169 matched controls, 116 NPVH patients, and 84 matched controls). Models were evaluated against baseline approaches from Cortés et al. using ROC AUC, accuracy, precision, recall, and F1-score computed via Leave-One-Group-Out cross-validation.

## Results

On the official challenge test set, the PVH ensemble model achieved a headline ROC AUC of 0.925, securing 1st place and outperforming the baseline AUC of 0.82. For the subject-level LOGO cross-validation, the PVH ensemble reached an accuracy of 0.840 and an AUC of 0.891, improving upon Model 1 (AUC 0.871) and Model 2 (AUC 0.881). For the NPVH task, the optimized model achieved an ROC AUC of 0.820 on the test set, placing 4th in the challenge and surpassing the 0.78 baseline.

| System / Condition | ROC AUC | Accuracy | F1-Score |
|---|---|---|---|
| PVH Baseline [12] | 0.820 | - | - |
| PVH Model 1 (XGBoost) | 0.871 | 0.827 | 0.764 |
| PVH Model 2 (Logistic Reg.) | 0.881 | 0.831 | 0.772 |
| PVH Ensemble (Ours) | 0.891 | 0.840 | 0.792 |
| NPVH Baseline [12] | 0.780 | - | - |
| NPVH Optimized Model (Ours) | 0.820 | 0.799 | 0.807 |

## Limitations

The dataset is relatively small (582 total subjects), which constrained deep learning models like MLPs, CNNs, and LSTMs from avoiding severe overfitting. IBIF aerodynamic features were missing for a subset of participants due to collection limitations, requiring handling strategies. The approach was evaluated exclusively on the NeckVibe Challenge dataset, leaving cross-corpus generalization and performance across diverse linguistic or demographic populations unverified.

## Why read this

Speech and ML researchers working on ambulatory health monitoring should read this to understand how careful temporal feature engineering and tree-based ensembles outperform complex deep learning architectures under severe sample-size constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated ambulatory screening, continuous daily voice monitoring, and clinical biofeedback interventions for vocal hyperfunction disorders.

## Institutions / 機構

Samsung

## Related

- [Attention-Based Multiple Instance Learning with Tabular Stacking for Ambulatory Detection of PVH and NPVH](yerpude26_interspeech.md) — same problem · relatedness 3.0/3
- [A Hierarchical Feature Engineering Framework for Automated Classification of Phonotraumatic and Non-Phonotraumatic Vocal Hyperfunction](kim26x_interspeech.md) — same problem · relatedness 3.0/3
- [The Interspeech 2026 NeckVibe Challenge: Voice Disorder Detection via Real-World Monitoring of Neck-Surface Vibration](yousef26b_interspeech.md) — same problem · relatedness 2.9/3
- [Measuring Vocal Efficiency in Daily Life in Patients with Voice Disorders Using Wireless Accelerometer and Microphone Sensors](yousef26c_interspeech.md) — same problem · relatedness 2.0/3
- [Modeling Lombard Effects in Voice Disorders Using Daily-Life Monitoring of Ambient Noise and Voice Acoustics](yousef26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
