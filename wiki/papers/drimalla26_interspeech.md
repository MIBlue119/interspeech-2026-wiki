---
id: drimalla26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-671
pdf: https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.pdf
---

# Automatic Detection of Stress from Speech in the Trier Social Stress Test

*Hanna Drimalla, Wieland R. Cremer, Christine Kraus, Oliver T. Wolf*

[PDF](https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-671)

**TL;DR** — This paper investigates automatic stress detection and the prediction of physiological/affective stress responses from speech using a controlled between-participant Trier Social Stress Test (TSST) and friendly-TSST (f-TSST) dataset, achieving 82% classification accuracy with XGBoost. It demonstrates that acoustic-prosodic features can reliably distinguish stressed speech and predict cortisol reactivity and negative affect changes.

## Key contributions

- Evaluated speech-based acute psychosocial stress detection in a fully controlled, between-subject setting comparing TSST against a matched friendly-TSST (f-TSST) control condition.
- Built a participant-level feature processing pipeline combining librosa (40 MFCCs), Praat (15 classical voice parameters via Parselmouth), and openSMILE (88 eGeMAPSv02 functionals) totaling 144 dimensions.
- Achieved significant binary stress classification accuracy of 0.82 using an XGBoost classifier, outperforming a majority-class baseline.
- Demonstrated partial predictability of physiological (cortisol reactivity) and affective (negative affect changes) stress responses using support vector regression and XGBoost.

## Problem

Stress is traditionally measured via self-reports and physiological biomarkers (cortisol, sAA) that are sensitive to context and hard to collect unobtrusively at scale. Prior speech-based ML work often suffered from inconsistent stressors (acted stress, foreign language tasks) or lacked a true non-stressed control condition. Within-subject control designs like the friendly-TSST (f-TSST) also suffer from carry-over effects where the control task induces mild stress if conducted after the TSST. This work addresses the gap by using a fully between-participant design with matched control conditions to evaluate whether acoustic features genuinely reflect acute psychosocial stress and its physiological/affective outcomes.

## Method

Audio data was recorded using eye-tracking glasses at 16 kHz, trimmed to 9-minute segments starting at minute 7, and processed via NVIDIA NeMo's Sortformer for end-to-end speaker diarization to isolate participant-only audio (yielding mean lengths of ~4.13 min for TSST and ~6.51 min for f-TSST). A 144-dimensional feature vector per participant was constructed by concatenating 40 MFCCs (librosa), 15 voice parameters (Praat/Parselmouth), and the 88-dimensional eGeMAPSv02 feature set (openSMILE), alongside participant sex as a covariate. Features were z-standardized per cross-validation training fold.

Four classification models (Logistic Regression, SVM, Random Forest, and XGBoost) and three regression models (Support Vector Regression, Random Forest Regressor, XGB Regressor) were evaluated. Classification utilized a nested 10-fold outer and 3-fold inner cross-validation with hyperparameter tuning, while regression used a nested Leave-One-Out (LOO) outer and 5-fold inner cross-validation scheme. Feature importance was interpreted globally via SHAP values averaged across folds to identify critical acoustic drivers like spectral flux variability and voiced segment rates.

## Experimental setup

Data was collected from 50 healthy German-speaking university students (25 per condition; 46% female, mean age 23.24 years) who completed either a modified TSST or f-TSST. Baselines included majority-class classification baselines and mean-value baseline MAEs for regression, tested for significance using corrected paired t-tests by Nadeau and Bengio. Model sizes were tuned over standard hyperparameter grids (e.g., XGB trees: 50, 100, 150; max depth: 1, 2, 4, 8; learning rate: 0.03, 0.1, 0.2).

## Results

The XGB classifier achieved the highest binary classification accuracy of 0.82 ± 0.11 (AUC = 0.82) in distinguishing TSST from f-TSST speech, significantly outperforming the baseline (corrected t = 8.05, p < 0.001). Random Forest achieved 0.80 accuracy, Logistic Regression 0.78, and SVM 0.74. Dimensionality reduction via PCA did not improve performance. Top SHAP features for classification included spectral flux variability, low-frequency spectral energy, voiced segment rate, and local shimmer variability.

For stress-response regression, SVR predicted cortisol reactivity in the full sample with lower MAE than baseline (MAE 3.10 vs 4.04, corrected t = 2.01, p = 0.02, though Spearman ρ was 0.01). For negative affect changes (∆NA), the XGB regressor outperformed the baseline specifically in the TSST subsample (MAE 2.08 vs 3.22, corrected t = 2.11, p = 0.02, ρ = 0.67). sAA reactivity and 20-min post-manipulation cortisol values were not consistently predicted above baseline.

| System / Condition | Accuracy | AUC | Cortisol Reactivity MAE | ∆NA MAE |
|---|---|---|---|---|
| Majority Baseline | 0.50 | - | 4.04 | 3.14 |
| Logistic Regression | 0.78 | 0.81 | - | - |
| SVM | 0.74 | 0.77 | 3.10 | 3.37 |
| Random Forest | 0.80 | 0.85 | 3.73 | 3.17 |
| XGBoost | 0.82 | 0.82 | 3.41 | 3.10 |

## Limitations

The study relies on a relatively small cohort of 50 healthy university students, limiting demographic diversity and generalizability. Protocol-related structural differences between the TSST and f-TSST (such as committee interactions and follow-up questions) introduce potential confounding variables into the pause structures and acoustic profiles. Furthermore, sAA reactivity and 20-minute post-task cortisol levels could not be reliably predicted from the extracted features.

## Why read this

Researchers and engineers building speech-based affective computing systems will find this paper valuable for its rigorous between-subject experimental design that isolates psychosocial stress from social interaction artifacts. It offers concrete insights into mapping standard acoustic functionals (eGeMAPS, MFCCs, Praat) to endocrine and self-reported stress outcomes.

## Code

- https://github.com/mbp-lab/tsst-speech-stress

## Applications

Unobtrusive digital biomarker screening for psychological stress in clinical assessments, remote behavioral monitoring, and workplace wellness applications.

## Related

- (link related pages by id as the wiki grows)
