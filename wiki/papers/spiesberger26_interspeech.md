---
id: spiesberger26_interspeech
category: health-clinical
institutions: ["Technical University of Munich", "Munich Center for Machine Learning", "Friedrich-Schiller-University Jena", "Imperial College London", "Munich Data Science Institute"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1878
pdf: https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.pdf
---

# Predicting Menstrual Cycle Phases from Speech: A Paralinguistic Approach

*Anika A. Spiesberger, Andreas Triantafyllopoulos, Melanie Weirich, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/spiesberger26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1878)

**Category:** `health-clinical`

**TL;DR** — This paper investigates computational paralinguistics to predict menstrual cycle phases (ovulation vs. luteal) from read speech, achieving a maximum accuracy of 62.5% using handcrafted acoustic features while learned embeddings perform at chance level.

## Key contributions

- Evaluates and compares handcrafted EGEMAPS acoustic features and deep WAV2VEC2.0 embeddings for menstrual cycle phase classification.
- Analyzes a German read speech dataset of 76 naturally cycling participants across ovulation and luteal phases (2,277 audio files, ~84 minutes total).
- Explores correlations between speaker-level classification accuracy and physiological variables including absolute hormone levels, inter-phase hormonal changes, and age.
- Demonstrates that classification difficulty stems primarily from speaker-specific characteristics rather than the choice of machine learning classifier.

## Problem

Hormones fluctuate systematically across the menstrual cycle and interact with sex hormone receptors on vocal folds, yet prior literature reports conflicting acoustic findings. Traditional studies rely on univariate inferential statistics over small predefined acoustic parameter sets, which fail to capture subtle, multivariate acoustic variations or evaluate predictability at the individual speaker level. Overcoming these limitations is necessary to determine whether speech can serve as a non-invasive marker for physiological states like hormonal tracking.

## Method

The study extracts two distinct acoustic representations from the speech data: the 88-dimensional handcrafted EGEMAPS feature set via the openSMILE toolkit, and 1024-dimensional embeddings extracted from the penultimate layer of a WAV2VEC2.0-large-robust model fine-tuned for speech emotion recognition. Features are standardized prior to classification. Four standard machine learning classifiers—eXtreme Gradient Boosting (XGBoost), Support Vector Machines (SVM), Random Forests (RF), and Logistic Regression (LR)—are trained and evaluated using a nested cross-validation scheme with a leave-one-group-out outer loop and a group k-fold (k=3) inner loop for grid-search hyperparameter tuning.

Inference relies on majority voting across each participant's 15 sentence-level utterances per phase to yield a single prediction per person per phase. Comparative statistical analysis is performed using Wilcoxon signed-rank tests with Bonferroni-Holm correction and rank-biserial effect sizes. Speaker-level accuracies are subsequently correlated with salivary hormone measurements (estradiol, progesterone, testosterone) and age using Pearson's r to investigate inter-individual performance variance.

## Experimental setup

The dataset consists of read German speech from 76 female participants aged 18-44 years with regular cycles and no hormonal contraceptive use, yielding 2,277 sentence-level audio files (~84.35 minutes). Models are evaluated using classification accuracy and 95% confidence intervals derived from bootstrap resampling (1,000 iterations). Baselines include four distinct classifiers (XGBoost, SVM, RF, LR) compared across two modalities (EGEMAPS vs. WAV2VEC2.0), with chance performance at 50%.

## Results

Handcrafted EGEMAPS features achieve headline accuracies of 59.2% for XGBoost, 61.2% for SVM, and 62.5% for both Random Forest and Logistic Regression. Conversely, WAV2VEC2.0 embeddings fail to exceed chance, yielding accuracies between 52.6% and 57.2% with confidence intervals overlapping 50%. Wilcoxon signed-rank tests show no features passing Bonferroni-Holm significance, though 25 EGEMAPS features (including loudness, formant amplitudes F1-F3, spectral flux, and H1-H2) exhibit small effects (|r| > 0.2), generally showing higher values in the luteal phase. Speaker-level accuracies correlate strongly across classifiers (r = 0.64 to 0.98), but show no significant linear correlation with age, mean hormone levels, or inter-phase hormonal deltas.

| System / Condition | EGEMAPS Accuracy (%) | WAV2VEC2.0 Accuracy (%) |
|---|---|---|
| XGBoost | 59.2 [51.3; 66.4] | 55.9 [48.0; 63.2] |
| SVM | 61.2 [53.9; 68.4] | 52.6 [44.1; 60.5] |
| Random Forest | 62.5 [54.6; 69.7] | 57.2 [48.7; 64.5] |
| Logistic Regression | 62.5 [54.6; 69.7] | 52.6 [44.7; 60.5] |

## Limitations

The study is restricted to read speech in a single language (German) from a modest cohort of 76 participants, potentially limiting generalizability to spontaneous or conversational speech and diverse populations. Loudness was not strictly controlled during recording, introducing potential technical confounds. Furthermore, the analysis uses binary phase approximations and linear correlation methods (Pearson's r) that may obscure non-linear relationships with age or hormonal sensitivity.

## Why read this

Researchers in computational paralinguistics and digital health should read this paper to understand the limits of standard speech embeddings versus handcrafted acoustic features for subtle physiological state detection. It provides a realistic benchmark for menstrual cycle phase classification and highlights the necessity of speaker personalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Non-invasive digital health tools for menstrual cycle tracking, continuous hormonal monitoring, and paralinguistic speaker state analysis.

## Institutions / 機構

Technical University of Munich, Munich Center for Machine Learning, Friedrich-Schiller-University Jena, Imperial College London, Munich Data Science Institute

**Funding / 經費:** Deutsche Forschungsgemeinschaft

## Related

- (link related pages by id as the wiki grows)
