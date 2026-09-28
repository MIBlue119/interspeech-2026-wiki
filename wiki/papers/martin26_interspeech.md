---
id: martin26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-777
pdf: https://www.isca-archive.org/interspeech_2026/martin26_interspeech.pdf
---

# Acoustic Biomarkers of Sleep Deprivation on French Read Speech: Interpretable and Frugal Modeling of Sleep Deprivation and Its Symptoms

[PDF](https://www.isca-archive.org/interspeech_2026/martin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/martin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-777)

**TL;DR** — This paper evaluates interpretable acoustic features and frugal classifiers to detect sleep deprivation and related symptoms from French read speech, achieving macro F1-scores up to 0.858 on psychomotor vigilance test metrics.

## Problem

Detecting sleep deprivation, sleepiness, and fatigue through passive smartphone voice recordings is crucial for preventing workplace and driving accidents, but modern deep learning approaches lack interpretability and incur high carbon footprints. Furthermore, existing speech-based health models often ignore underlying demographic biases related to age and sex, risking systemic inequality. This work addresses the need for frugal, transparent, and mechanistically interpretable models that can link specific acoustic perturbations to sleep-related cognitive impairments.

## Method

The study utilizes the SOMVOICE corpus, comprising 336 read-speech recordings from 28 screened participants undergoing normal and total sleep deprivation protocols, segmented into 818 chunks via rVAD. It extracts traditional interpretable acoustic descriptors: 88 eGeMAPS features, 27 Snack toolkit features, and their early fusion. Three conventional machine learning algorithms—Support Vector Classifier (SVC), Random Forest (RF), and HistGradientBoostingClassifier (GB)—are trained using a nested stratified group 10-fold cross-validation scheme to prevent data leakage and maximize Unweighted Average Recall (UAR). Model explanations are derived via scaled SHAP values, and demographic biases are evaluated using logistic regression on misclassification outcomes against age and sex interactions.

## Results

Across six binary classification tasks, the models achieved UAR and macro F1-scores ranging from 0.628 to 0.852. Psychomotor vigilance test speed (PVT-Speed) and response time divergence (PVT-RTD) were the easiest to estimate, yielding macro F1 scores around 0.801 to 0.858 (best achieved by early feature fusion with SVC). Sleep deprivation detection reached an F1-macro of 0.744 using early fusion with SVC, which significantly outperformed individual feature sets under McNemar tests. Subjective sleepiness (KSS) and fatigue (VAS-F) proved more challenging, yielding lower F1 scores between 0.631 and 0.686. Bias evaluations revealed significant age-sex interactions in several models, where misclassification rates decreased with age in women (by 4-5% per year) but increased with age in men (by 5-8% per year).

## Code

- https://github.com/vincentpmartin/Interspeech2026.SOMVOICE.classification

## Applications

Clinicians and occupational safety systems can use these lightweight, interpretable models to passively monitor sleep deprivation, fatigue, and cognitive performance degradation in natural settings via smartphone speech inputs.

## Limitations

The evaluation is restricted to a relatively small, controlled corpus of 28 French speakers performing a specific reading task, limiting broader demographic and cross-lingual generalisation.

## Related

- (link related pages by id as the wiki grows)
