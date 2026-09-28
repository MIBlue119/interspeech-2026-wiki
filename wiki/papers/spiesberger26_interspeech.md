---
id: spiesberger26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1878
pdf: https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.pdf
---

# Predicting Menstrual Cycle Phases from Speech: A Paralinguistic Approach

[PDF](https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1878)

**TL;DR** — This paper investigates whether machine learning models can predict individual menstrual cycle phases (ovulation versus luteal) from speech, achieving a peak accuracy of 62.5% using handcrafted acoustic features.

## Problem

Prior research on vocal changes across the menstrual cycle has produced inconsistent results, largely due to reliance on small, predefined acoustic subsets and univariate statistical tests that miss complex multivariate patterns. Moreover, most work focuses on group-level means rather than individual-level prediction, leaving the practical feasibility of automated cycle tracking from voice unproven. Addressing this gap is important for non-invasive health monitoring and understanding hormone-speech interactions.

## Method

The study analyzes a German read speech dataset comprising 76 naturally cycling participants speaking 15 fixed sentences across ovulation and luteal phases, totaling 2,277 audio files (84.35 minutes). Two contrasting feature sets are evaluated: the interpretable 88-dimensional handcrafted eGeMAPS set extracted via openSMILE, and 1024-dimensional embeddings extracted from the penultimate layer of a wav2vec2-large-robust model fine-tuned for speech emotion recognition. Four standard classifiers—XGBoost, Support Vector Machines (SVM), Random Forest (RF), and Logistic Regression (LR)—are trained using nested cross-validation with leave-one-group-out outer loops and 3-fold group k-fold inner loops. Hyperparameters are tuned via grid search, and speaker-level predictions are generated via majority voting alongside Pearson correlation analyses against age and salivary hormone levels (estradiol, progesterone, testosterone).

## Results

Wilcoxon signed-rank tests with Bonferroni-Holm correction revealed no statistically significant individual features, though 25 eGeMAPS features showed small effect sizes (|r| > 0.2), with loudness, spectral flux, and formant amplitudes showing higher values in the luteal phase. For classification of ovulation versus luteal phases (50% chance baseline), eGeMAPS features achieved accuracies of 59.2% for XGBoost, 61.2% for SVM, 62.5% for RF, and 62.5% for LR. Conversely, wav2vec2-large-robust embeddings performed at chance level across all classifiers, yielding accuracies between 52.6% and 57.2% with confidence intervals spanning 50%. Speaker-level prediction accuracies showed strong internal consistency across classifiers (r between 0.64 and 0.98) but exhibited no significant correlations with age, absolute hormone levels, or inter-phase hormonal changes.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Health-tech engineers and researchers developing non-invasive, voice-based digital biomarkers for women's health and menstrual cycle tracking.

## Limitations

The study is limited to only two cycle phases (ovulation and luteal) in German-speaking participants not using hormonal contraceptives, yielding modest classification accuracies that highlight the need for personalization and multi-phase tracking.

## Related

- (link related pages by id as the wiki grows)
