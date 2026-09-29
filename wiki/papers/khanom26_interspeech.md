---
id: khanom26_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2571
pdf: https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.pdf
---

# SpiroPhonia: Non-Invasive Respiratory Health Assessment from Spontaneous Speech

*Roksana Khanom, Shafia Supty, Nirupam Roy, Ashok Agrawala*

[PDF](https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khanom26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2571)

**Category:** `health-clinical`

**TL;DR** — SpiroPhonia introduces a machine learning framework for non-invasive Chronic Obstructive Pulmonary Disease (COPD) detection from unconstrained spontaneous speech, achieving 78% accuracy and an 87% AUC on a 201-speaker dataset.

## Key contributions

- Curated the SpiroPhonia dataset comprising 201 speakers (102 COPD, 99 healthy controls) sourced from real-world spontaneous conversational speech.
- Identified a compact, physiologically grounded set of acoustic, spectral, and temporal markers that remain discriminative under uncontrolled recording conditions.
- Proposed a two-stage feature optimization pipeline combining correlation pruning and recursive feature elimination with cross-validation (RFECV).
- Demonstrated that lightweight classifiers (Linear SVM with 5 features) achieve competitive performance (78.05% accuracy) suitable for on-device and mobile deployment.

## Problem

COPD affects over 400 million individuals globally and is the third leading cause of death, yet early-stage detection remains constrained by infrastructure-bound, clinic-based tools like spirometry. Prior computational approaches rely heavily on elicited speech tasks—such as sustained vowels, scripted reading, or guided breathing maneuvers—collected in structured laboratory environments. These explicit protocols require user compliance and specialized equipment, making them ill-suited for continuous, passive, at-home respiratory monitoring. SpiroPhonia addresses this gap by testing whether latent biomarkers embedded in everyday, unscripted conversational speech can reliably indicate respiratory impairment under subject-independent evaluation.

## Method

The SpiroPhonia framework processes audio converted to 44.1 kHz, 16-bit mono WAV format. Signals are segmented into 10-30 second windows using energy-based voice activity detection (VAD) with manual refinement, amplitude-normalized, band-pass filtered between 100 Hz and 5000 Hz, and denoised using light spectral subtraction.

From these segments, the pipeline extracts three feature groups: 25 acoustic perturbation features (mean and variance of F0, local jitter, RAP, DDP, PPQ5, shimmer, HNR, and formants F1-F4), 65 spectral features (13 MFCCs plus 5 summary statistics per coefficient), and 3 pulmonary-inspired temporal features (pause ratio, pauses per minute, total pause duration) using a -40 dB threshold and 100 ms minimum pause duration.

The feature optimization pipeline operates in two stages on a training partition of 160 samples. First, near-zero variance and highly correlated features (|r| > 0.9) are pruned based on effect size, reducing the set to 67 non-redundant features. Second, classifier-specific Recursive Feature Elimination with Cross-Validation (RFECV) using a stratified 5-fold scheme selects optimal feature subsets by maximizing cross-validation accuracy. Five classifiers are evaluated: Linear SVM, Gradient Boosting, Random Forest, Logistic Regression, and a shallow Neural Network, with default scikit-learn hyperparameters.

## Experimental setup

Evaluated on the SpiroPhonia dataset consisting of 201 speakers (102 with respiratory conditions, 99 healthy controls, age range 45-95, English language). Data is split via a stratified split into a 160-sample training set and a 41-sample held-out test set. Baselines include prior literature using sustained vowels (Idrisoglu et al.) and read/clinical spontaneous speech (Sankey-Olsen et al., Chun et al.). Metrics include Accuracy, Balanced Accuracy, AUC, Sensitivity, Specificity, and F1-score, evaluated with bootstrap 95% confidence intervals over 1,000 speaker-level resamples.

## Results

Linear SVM and Gradient Boosting both achieved a headline accuracy of 78.05% on the held-out test set. Linear SVM attained high specificity (85.00%, 95% CI: [66.6, 100]) using only 5 features, whereas Gradient Boosting achieved higher sensitivity (85.71%, 95% CI: [68.7, 100]) and an F1-score of 80.00% using 59 features. Random Forest reached the highest AUC of 87.14% (95% CI: [74.6, 96.7]) with 59 features. Logistic Regression and the Neural Network attained accuracies of 73.17% and 70.73% respectively using 14 features. The performance is competitive with laboratory-controlled studies (which report 67% to 84.6% accuracy) despite operating on unconstrained spontaneous speech.

| System / Condition | Accuracy (%) | AUC (%) | Sensitivity (%) | Specificity (%) | F1-Score (%) |
|---|---|---|---|---|---|
| Linear SVM (5 feat.) | 78.05 | 79.05 | 71.43 | 85.00 | 76.92 |
| Gradient Boosting (59 feat.) | 78.05 | 84.76 | 85.71 | 70.00 | 80.00 |
| Random Forest (59 feat.) | 75.61 | 87.14 | 85.71 | 65.00 | 78.26 |
| Logistic Regression (14 feat.) | 73.17 | 80.48 | 76.19 | 70.00 | 74.42 |
| Neural Network (14 feat.) | 70.73 | 78.10 | 66.67 | 75.00 | 70.00 |

## Limitations

The dataset is limited to 201 speakers, which restricts the capacity to train data-intensive deep learning models. Evaluation is restricted to English-language speech and retrospective online interviews, lacking broad cross-environment, cross-device validation and prospective clinical trial deployment.

## Why read this

Researchers and engineers building voice-based health monitoring tools will learn how to extract compact, physiologically interpretable acoustic and temporal markers from unconstrained spontaneous speech rather than relying on controlled laboratory protocols.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Passive, continuous health monitoring and early screening for chronic respiratory conditions via smartphone apps and smart home voice assistants.

## Institutions / 機構

University of Maryland, DR. M R Khan Shishu Hospital & Institute of Child Health

**Funding / 經費:** National Science Foundation

## Related

- (link related pages by id as the wiki grows)
