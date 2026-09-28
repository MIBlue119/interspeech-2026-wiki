---
id: kim26x_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3437
pdf: https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.pdf
---

# A Hierarchical Feature Engineering Framework for Automated Classification of Phonotraumatic and Non-Phonotraumatic Vocal Hyperfunction

[PDF](https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26x_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3437)

**TL;DR** — A hierarchical feature engineering framework incorporating static, dynamic, ratio, and coupling properties from neck-surface acceleration achieves an AUC of 0.891 for phonotraumatic and 0.728 for non-phonotraumatic vocal hyperfunction detection.

## Problem

Distinguishing subtypes of vocal hyperfunction—specifically phonotraumatic (PVH) and non-phonotraumatic (NPVH)—from healthy controls via ambulatory neck-surface acceleration remains difficult due to high daily-life acoustic variability and a failure of standard pipelines to model dynamic feature interactions. While clinical diagnosis is established, existing automated methods rely on simple time-averages of individual parameters and neglect physiological source-filter coupling. This makes it challenging to build robust biomarkers for daily voice disorder screening.

## Method

The framework extracts 14 core physical quantities (6 acoustic and 8 impedance-based inverse filtering aerodynamic measures) exclusively from voiced frames. It aggregates these into a hierarchical feature set consisting of static statistical descriptors (99 features), dynamic trend descriptors using delta and delta-delta statistics (197 features), ratio-based relative variability measures (253 features), and physiologically motivated source-filter and stability-effort coupling terms (203 features). Missing values are handled via median imputation inside training folds. The pipeline employs recursive feature elimination cross-validation (RFECV) with an XGBoost estimator for feature selection, and evaluates standard classifiers including logistic regression, support vector machines, random forests, XGBoost, and LightGBM.

## Results

Evaluated on the NeckVibe Challenge dataset containing 3,278 samples from 468 subjects using stratified 10-fold group cross-validation. For Task 1 (PVH vs. Control), logistic regression with coupling features achieves an AUC of 0.891 and an F1-score of 0.829, with many features surviving Benjamini-Hochberg FDR correction and showing large effect sizes (|d| ≈ 0.9–1.0). For Task 2 (NPVH vs. Control), LightGBM with coupling features reaches an AUC of 0.728 and an F1-score of 0.747, though no features survive FDR correction and effect sizes are smaller (|d| ≈ 0.3), demonstrating that NPVH requires non-linear interaction modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and clinical researchers building wearable or ambulatory health monitoring tools for non-invasive detection and screening of voice disorders.

## Limitations

Non-phonotraumatic vocal hyperfunction exhibits poor univariate separability and lower overall classification performance compared to phonotraumatic cases.

## Related

- (link related pages by id as the wiki grows)
