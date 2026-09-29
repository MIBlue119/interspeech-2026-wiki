---
id: kim26x_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3437
pdf: https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.pdf
---

# A Hierarchical Feature Engineering Framework for Automated Classification of Phonotraumatic and Non-Phonotraumatic Vocal Hyperfunction

*June-Woo Kim, Kangwook Jang, Minu Kim, Hyunju Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3437)

**Category:** `health-clinical`

**TL;DR** — This paper proposes a hierarchical feature engineering framework (static, dynamic, ratio, and coupling features) for classifying phonotraumatic and non-phonotraumatic vocal hyperfunction from ambulatory neck-surface acceleration, achieving an AUC of 0.917 for phonotraumatic detection on the challenge test set.

## Key contributions

- Proposes a hierarchical feature engineering framework combining static, dynamic, ratio-based, and physiologically motivated source-filter and stability-effort coupling features.
- Performs rigorous univariate statistical analysis via Welch's t-test and Benjamini-Hochberg FDR correction, exposing a stark separability gap between PVH and NPVH.
- Employs a recursive feature elimination cross-validation (RFECV) pipeline with XGBoost/LightGBM to capture high-dimensional feature redundancy and non-linear interactions.
- Evaluates performance on the NeckVibe Challenge dataset, establishing benchmark classification results across 10-fold subject-grouped cross-validation and held-out test sets.

## Problem

Distinguishing subtypes of vocal hyperfunction—phonotraumatic (PVH, like nodules) and non-phonotraumatic (NPVH, like muscle tension dysphonia)—from healthy controls using ambulatory neck-surface acceleration is exceptionally difficult due to high daily-life acoustic variability. Prior work relies on simplistic time-averaging of individual features or isolated aerodynamic measures via Impedance-based Inverse Filtering (IBIF), ignoring the interdependent and dynamic nature of speech production and physiological source-filter coupling. This leads to poor diagnostic reliability for subtle functional disorders that lack structural laryngeal lesions.

## Method

The framework extracts 14 core physical quantities (6 acoustic features like H1H2all, cppall, spectralTiltall, and 8 IBIF aerodynamic features like MFDR, acflow, oq, naq) restricted strictly to voiced frames, alongside the vocal dose percentage. These base measures are expanded into a hierarchy of 4 configurations: (i) Static features (99 total: mean, SD, P5, P95, skewness, kurtosis, IQR), (ii) Dynamic features (197 total: adding 1st/2nd-order delta statistics and linear trend slopes), (iii) Ratio-based features (253 total: relative variability measures like delta SD divided by absolute mean/dispersion), and (iv) Coupling features (203 total: combining dynamic features with 6 interaction terms capturing source-filter and stability-effort relationships).

Subject-level representation vectors are constructed by aggregating frame-level statistics. To combat high-dimensional redundancy, feature selection is performed exclusively inside training folds using RFECV with an XGBoost estimator. Five classifiers (logistic regression, Gaussian kernel SVM, random forest, XGBoost, LightGBM) are evaluated using a stratified 10-fold group cross-validation scheme where subject IDs act as grouping variables to prevent data leakage across folds, utilizing fixed hyperparameter configurations.

## Experimental setup

Evaluated on the NeckVibe Challenge dataset comprising 3,278 samples from 468 subjects (PVH task: 1,151 samples/171 subjects + 992 controls/136 subjects; NPVH task: 637 samples/93 subjects + 498 controls/68 subjects). Missing IBIF values (55 samples) were handled via median imputation inside training folds. Evaluated using AUC, Accuracy, Precision, Recall, and F1-score metrics under stratified 10-fold group cross-validation.

## Results

For Task 1 (PVH vs. Control), performance scales progressively with feature expressiveness: static features yield an AUC of 0.851, dynamic 0.869, ratio-based 0.885, and coupling features achieve the best cross-validation AUC of 0.891 (Logistic Regression), reaching an AUC of 0.917 on the unseen challenge held-out test set. In contrast, Task 2 (NPVH vs. Control) proves drastically harder: static features hover near chance (AUC = 0.556), dynamic features improve it to 0.682, and LightGBM-based coupling features peak at a cross-validation AUC of 0.728, which sharply drops to an AUC of 0.579 on the held-out challenge test set due to high distributional overlap and lack of robust univariate separability (zero features survived FDR correction for NPVH).

| System / Condition | Task 1 AUC | Task 1 F1 | Task 2 AUC | Task 2 F1 |
|---|---|---|---|---|
| Baseline | 0.820 | - | 0.780 | - |
| Static Features | 0.851 | 0.828 | 0.556 | 0.631 |
| Dynamic Features | 0.869 | 0.831 | 0.682 | 0.715 |
| Ratio-based Features | 0.885 | 0.838 | 0.608 | 0.639 |
| Coupling Features (Best) | 0.891 | 0.829 | 0.728 | 0.747 |

## Limitations

The framework relies heavily on manual feature extraction and aerodynamic inverse filtering (IBIF), which can suffer from missing values or propagation errors. The dataset scale is modest (fewer than 500 subjects total), and performance on non-phonotraumatic hyperfunction (NPVH) remains inadequate (test AUC 0.579), indicating that engineered summary statistics fail to capture subtle psychological or micro-tremor biomarkers inherent to functional voice disorders.

## Why read this

Researchers working on ambulatory voice monitoring, paralinguistic classification, or biomedical speech analysis should read this to understand how hierarchical feature engineering and physiological coupling terms impact structural versus functional laryngeal disorder detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated ambulatory health monitoring, wearable vocal hygiene trackers, and computer-aided clinical screening for voice disorders.

## Institutions / 機構

Wonkwang University, Gwangju Institute of Science and Technology, KAIST

**Funding / 經費:** InnoCORE program of the Ministry of Science and ICT, Regional Innovation System and Education program through the Jeonbuk RISE Center

## Related

- (link related pages by id as the wiki grows)
