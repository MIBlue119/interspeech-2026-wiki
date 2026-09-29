---
id: neumann26_interspeech
category: health-clinical
institutions: ["Modality.AI", "Verge Genomics", "2b Analytics", "University of California, San Francisco"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2841
pdf: https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.pdf
---

# Reducing Measurement Noise in Digital Speech Biomarkers: Interpretable Composite Index Scores for Longitudinal ALS Monitoring in Clinical Trials

*Michael Neumann, Hardik Kothare, Diego Cadavid, Robert H. Scannevin, Anil Tarachandani, Ines Hoffmann, Tara Haley, Shane Raines, Vikram Ramanarayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/neumann26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2841)

**Category:** `health-clinical`

**TL;DR** — This paper evaluates interpretable composite speech index scores to reduce measurement noise and improve longitudinal monitoring of amyotrophic lateral sclerosis (ALS) in clinical trials. By aggregating multi-domain speech features, the proposed index scores achieve excellent test-retest reliability (ICC > 0.9) and reduce minimal detectable change below patient standard deviations.

## Key contributions

- Investigated four weighted linear combination methods (equal weights, logistic regression, linear discriminant analysis, and stepwise models optimized for Youden's J) to construct composite speech scores.
- Targeted two clinically relevant constructs for weight optimization: bulbar impairment and perceived listener effort.
- Performed a systematic psychometric evaluation covering internal consistency, ICC, SEM, MDC95, test-retest reliability, and Bland-Altman limits of agreement.
- Demonstrated cross-context generalizability by training weights on a natural history dataset and successfully validating them on an independent Phase 1b clinical trial cohort.

## Problem

Single digital speech measures are frequently vulnerable to high measurement noise caused by varying recording conditions, participant fatigue, and Hawthorne effects, yielding a standard error of measurement that masks true disease progression. Traditional clinical scales like the ALSFRS-R suffer from subjective judgment and lack sensitivity during early-stage bulbar decline. While composite scores can mitigate random error and multiplicity issues, prior speech-based indices lacked systematic psychometric validation across independent datasets to establish their cross-context reliability and suitability as clinical trial endpoints.

## Method

The feature set comprises 10 acoustic and linguistic measures extracted from reading passages, sentence intelligibility tests, diadochokinesis (DDK), and picture descriptions using Praat (v6.2.17), Montreal Forced Aligner (v2.0.0.a22), and spaCy. Features capture duration, pause proportions (RPPPT, SITPPT), timing agreement (RPCTA), syllable counts (DDKSC), cepstral peak prominence (RPCPP), harmonics-to-noise ratio (SITHNR, DDKHNR), mean F0 (RPMFF), and lexical closed-class word ratios (PDCCWR). These 10 features were min-max normalized separately for male and female speakers based on natural history bounds, with missing values handled via participant-level longitudinal linear imputation.

Four weighting strategies were evaluated to build composite scores: a baseline with equal weights, logistic regression, linear discriminant analysis (LDA), and a stepwise linear model optimizing Youden's J statistic. Optimization targeted two binary constructs derived from the natural history dataset: bulbar impairment (ALSFRS-R bulbar subscore <= 12) and perceived listener effort rated on a visual analog scale. Linear mixed-effects (LME) models with random intercepts and slopes were then fitted to track longitudinal progression, using BLUPs to evaluate correlations with clinical variables like ALSFRS-R, PP/SVC, and neurofilament light (NfL).

## Experimental setup

Evaluated on two datasets: the Natural History dataset (EverythingALS ALS Austen Study; 146 participants, 2,124 total samples) used for model training, and the VRG50635 Phase 1b clinical trial dataset (NCT06215755; 54 participants, 716 samples, biweekly visits up to 40 weeks) used for validation. Performance was assessed using intraclass correlation coefficients ICC(2,1), standard error of measurement (SEM), minimal detectable change at 95% confidence (MDC95), coefficient of variation, and Spearman correlations against ALSFRS-R, PP/SVC, and NfL.

## Results

All composite index scores achieved excellent test-retest reliability with ICC values exceeding 0.90 (ranging from 0.91 to 0.95), outperforming a median ICC of 0.82 across individual features. Crucially, the MDC95 for all composite scores fell below the between-subject standard deviation (58% to 84% of SD), whereas 7 out of 10 individual features had MDC95 values exceeding their own SD (e.g., SITPPT at 162.5% SD), indicating that feature aggregation successfully drops the noise floor below the observable patient spread. All index scores exhibited strong Spearman correlations (|rho| > 0.6) with ALSFRS-R and PP/SVC, and moderate correlations with NfL, though reading passage duration (RPSD) alone also demonstrated high individual reliability (ICC 0.951).

| System / Condition | ICC(2,1) | SEM | MDC95 (%SD) | TRT r |
|---|---|---|---|---|
| Youden's J (LE) | 0.9562 | 0.0542 | 58.0 | 0.9563 |
| Logistic reg. (LE) | 0.9556 | 0.0310 | 58.4 | 0.9556 |
| Youden's J (BUL) | 0.9504 | 0.0586 | 61.7 | 0.9505 |
| Baseline (Equal) | 0.9286 | 0.0277 | 74.1 | 0.9292 |
| LDA (BUL) | 0.9092 | 0.0438 | 83.5 | 0.9095 |
| RPSD (Single Feature) | 0.9509 | 0.0359 | 61.4 | 0.9509 |

## Limitations

Reading passage duration (RPSD) dominated individual performance, raising questions about whether a reduced feature subset could match full composite performance. Noise robustness was evaluated via test-retest reliability rather than a formal controlled Gaussian perturbation analysis. Furthermore, all composite weights were optimized using binary classification tasks rather than continuous target constructs, and evaluation was restricted to ALS cohorts.

## Why read this

Researchers and engineers designing digital endpoints for clinical trials should read this paper to learn how classical psychometric evaluation and feature aggregation can systematically overcome measurement noise in remote speech monitoring.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote patient monitoring, digital endpoints for neurodegenerative clinical trials, and objective assessment of bulbar disease progression in ALS.

## Institutions / 機構

Modality.AI, Verge Genomics, 2b Analytics, University of California, San Francisco

## Related

- [Speech-based Digital Biomarkers can Accelerate ALS Clinical Trials: Insights from Time-to-Event and Hazard Rate Analysis](kothare26_interspeech.md) — same problem · relatedness 2.3/3
- [Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction](taghibeyglou26_interspeech.md) — same problem · relatedness 2.1/3
- [Towards Speech Impairment Prediction in German-Speaking Individuals with Amyotrophic Lateral Sclerosis](gonzalezmachorro26_interspeech.md) — same problem · relatedness 2.1/3
- [A multilingual composite speech index to assess passage reading in Huntington’s disease](constantin26_interspeech.md) — shared technique · relatedness 2.0/3
- [Toward an Articulatory Weakness Index for Speech Kinematics in Parkinson’s Disease](baligar26_interspeech.md) — shared technique · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
