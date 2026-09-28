---
id: drimalla26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-671
pdf: https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.pdf
---

# Automatic Detection of Stress from Speech in the Trier Social Stress Test

[PDF](https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/drimalla26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-671)

**TL;DR** — This paper investigates automatic speech-based stress detection and stress-response prediction using a controlled between-subject design, achieving an XGBoost classification accuracy of 82% in distinguishing stressed speech from a friendly control condition.

## Problem

Prior speech-based stress detection studies often lack a proper non-stressed control condition, rely on within-subject designs susceptible to order effects and carry-over stress, or mix heterogeneous stressors. This makes it difficult to isolate genuine vocal biomarkers of acute psychosocial stress from contextual confounds. Validated protocols like the Trier Social Stress Test (TSST) and its friendly control counterpart (f-TSST) offer a rigorous framework, but need automated speech processing pipelines to reliably connect acoustic indicators to multi-dimensional physiological and affective outcomes.

## Method

The study collected speech data from 50 participants randomly assigned to either the TSST (stress) or f-TSST (friendly control) condition. Participant-only audio was isolated using NVIDIA NeMo's Sortformer diarization model, discarding overlaps and non-speech segments. A 144-dimensional feature vector was extracted per participant, combining 40 MFCCs (librosa), 15 classical voice parameters via Praat/Parselmouth, and 88 eGeMAPSv02 features via openSMILE, along with sex as a covariate. Four classifiers (Logistic Regression, SVM, Random Forest, XGBoost) and three regressors (SVR, Random Forest, XGBoost) were trained using nested cross-validation with feature z-standardization applied strictly within training folds.

## Results

The XGBoost classifier achieved the highest binary classification accuracy of 0.82 ± 0.11 (AUC = 0.82) distinguishing TSST from f-TSST speech, significantly outperforming the majority-class baseline (p < 0.001). Random Forest, Logistic Regression, and SVM yielded accuracies of 0.80, 0.78, and 0.74, respectively. SHAP feature-importance analysis revealed that spectral flux variability, low/very-low frequency spectral energy, voiced segment rate, and local shimmer variability were the most informative predictors. Support Vector Regression and XGBoost also successfully predicted physiological cortisol reactivity and changes in negative affect better than mean baselines, particularly within the TSST subsample.

## Code

- https://github.com/mbp-lab/tsst-speech-stress

## Applications

Behavioral researchers and clinical practitioners looking for unobtrusive, automated digital biomarkers to assess human stress responses, clinical anxiety, or mental health status.

## Limitations

Differences in committee interaction structures between the TSST and f-TSST limit direct comparability of pause behaviors, and sAA reactivity could not be predicted because the friendly control condition also elicited sympathetic nervous system arousal.

## Related

- (link related pages by id as the wiki grows)
