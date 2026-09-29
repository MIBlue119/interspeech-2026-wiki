---
id: pludra26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2522
pdf: https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.pdf
---

# Automatic Assessment of L2 Speech Intelligibility: Segmental Error Ranking

*Agnieszka Pludra, Izabela Krysińska, Matuesz Jekiel*

[PDF](https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/pludra26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2522)

**Category:** `applications-other`

**TL;DR** — This paper introduces an intelligibility-centered computer-assisted pronunciation training (CAPT) approach that uses an AdaBoost regression model over phoneme substitution errors to predict L2 speech intelligibility and rank errors by communicative impact. The proposed AdaBoost Decision Tree model achieves a 0.74 Pearson correlation with human intelligibility ratings, outperforming standard ASR Word Error Rate baselines.

## Key contributions

- Operates an intelligibility-centered CAPT framework driven by phoneme mispronunciations and substitutions rather than native-speaker proximity.
- Curates a balanced multi-corpus evaluation dataset of 600 speech samples (combining VoxPopuli, speechocean762, and internal Pearson logs) rated by 120 crowd-sourced human evaluators.
- Extracts 791 sparse segmental error features, applying sparsity pruning (reducing to 0.38 sparsity) to prevent overfitting during regression.
- Proposes an interpretable feature-importance-based ranking of segmental errors using AdaBoost, revealing that specific phonemes (such as /z/, /E/, /@/, and /s/) disproportionately impact communicative effectiveness.

## Problem

Current Computer-Assisted Pronunciation Training (CAPT) systems penalize any deviation from native-speaker norms, yielding non-actionable feedback that overwhelms learners and misaligns with the primary goal of language acquisition: effective communication. While extensive research shows that suprasegmental features critically impact intelligibility, they remain difficult to automatically annotate and assess robustly. Consequently, there is a need for a pragmatic, segmental-based operationalization of intelligibility that pinpoints and prioritizes the exact phonemic errors breaking down communication.

## Method

The method processes speech samples through automatic phoneme recognition using Azure AI Speech services, aligning recognized phonemes with canonical IPA transcriptions to extract two primary feature sets: mispronounced phoneme ratios ($mispronounced_a$) and phoneme pair substitution ratios ($substitution_{a,b}$). This yields 791 sparse features (0.81 sparsity), of which 27% are pruned based on hyperparameter tuning to reduce sparsity to 0.38 and mitigate overfitting. 

Several regression architectures are evaluated to predict human 5-point intelligibility ratings: Support Vector Regression (SVR with an RBF kernel), Gaussian Process Regression (GPR with a rational quadratic kernel and L-BFGS-B optimizer), K-Neighbors Regression (KNR with KDTree and 5 neighbors), Gradient Boosting Regression (GBR with squared error loss, learning rate 0.1, 100 estimators), Random Forest Regression (RFR), and Adaptive Boosting with Decision Tree Regression (AdaBoost DTR, configured with 50 estimators and a minimum sample split of 5).

The models are trained and validated using leave-one-out cross-validation across 600 folds. The AdaBoost DTR framework leverages Gini importance averaged across constituent decision trees to establish an actionable error ranking, quantifying the distinct perceptual penalty of individual vowel and consonant mispronunciations.

## Experimental setup

Evaluated on a filtered subset of 600 audio recordings (mean length 7.81s) drawn from VoxPopuli (175 samples, 15 L1s), speechocean762 (50 adult samples, L1 Chinese), and an internal Pearson corpus (275 samples, diverse L1s). Human ground truth was gathered via 120 Prolific raters assessing each recording on a 5-point scale (Krippendorff’s Alpha = 0.67). Baselines include random prediction, mean human score, and ASR Word Error Rate (WER) correlation (0.67).

## Results

The AdaBoost DTR and RFR models achieve the top headline Pearson correlation of 0.74, outperforming the Azure ASR WER baseline (0.67), SVR (0.65), KNR (0.68), and GBR (0.70). AdaBoost DTR records the lowest MSE at 0.48 and MAE at 0.52 (tied with RFR/GPR at 0.19 MAPE), improving correlation by 0.07 over the ASR WER baseline. Feature importance analysis reveals that fricatives like /z/ (importance 0.092) and vowels like /E/ (0.072), /@/ (0.066), and /I/ (0.064) dominate intelligibility degradation.

| Model | MSE | MAE | MAPE | Corr |
|---|---|---|---|---|
| random | 4.52 | 1.74 | 0.49 | 0.04 |
| mean | 1.07 | 0.83 | 0.31 | - |
| SVR | 0.63 | 0.61 | 0.22 | 0.65 |
| GBR | 0.55 | 0.58 | 0.20 | 0.70 |
| RFR | 0.49 | 0.55 | 0.19 | 0.74 |
| AdaBoost DTR | 0.48 | 0.52 | 0.19 | 0.74 |

## Limitations

The study relies on third-party automatic phoneme recognition (Azure AI Speech), which can propagate acoustic and decoding errors into substitution ratios. The evaluation dataset skews toward higher proficiency levels (mean rating 3.83, few low-proficiency samples), limiting generalizability to absolute beginners. Additionally, the model ignores word-level positional context and suprasegmental features.

## Why read this

Speech and NLP researchers building inclusive CAPT systems should read this to learn how to operationalize speech intelligibility via interpretable AdaBoost feature importance instead of enforcing native-accent perfection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computer-assisted pronunciation training (CAPT) platforms, automated language testing, and personalized ESL feedback applications.

## Institutions / 機構

Pearson Central Europe, Adam Mickiewicz University

## Related

- (link related pages by id as the wiki grows)
