---
id: kothare26b_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2850
pdf: https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.pdf
---

# Speech and Video Biomarkers Exhibit Reduced Within-Subject Variability in Early Parkinson’s Disease and Resistance to Placebo and Hawthorne Effects

*Hardik Kothare, Oliver Roesler, Lakshmi Arbatti, Michael Neumann, Karl Kieburtz, Andrew McGarry, Craig Thompson, Vikram Ramanarayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothare26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2850)

**Category:** `health-clinical`

**TL;DR** — Audiovisual and motor digital biomarkers (speech, facial expression, and finger-tapping) extracted via remote smartphone/computer assessments exhibit strong baseline correlations with clinician-rated MDS-UPDRS subscores, but demonstrate significantly lower within-subject variability and complete resistance to placebo and Hawthorne effects.

## Key contributions

- Evaluated remote digital speech, facial, and finger-tapping biomarkers from a Phase 2 Parkinson's disease clinical trial (ASCEND, NCT06006247) across 50 patients.
- Demonstrated significant baseline Spearman correlations between objective acoustic/kinematic features and corresponding MDS-UPDRS Part III clinician subscores (e.g., finger-tapping velocity/acceleration vs. item scores up to rho = -0.55).
- Showed that while clinical MDS-UPDRS total and subscores falsely indicate artificial motor improvements over time due to placebo/Hawthorne effects in a failed trial, objective digital biomarkers remain stable.
- Established via coefficient of variation (CV) analysis that objective biomarkers possess systematically lower within-participant variability than clinician-administered rating scales.

## Problem

Randomized clinical trials in central nervous system disorders like Parkinson's disease (PD) frequently fail to meet primary endpoints, often due to noisy, subjective, and episodic clinical rating scales like the MDS-UPDRS Part III. Furthermore, these clinical scales are heavily confounded by placebo responses—driven by dopamine release and examiner bias—and Hawthorne effects, where participants alter their behavior simply due to being observed. Early-stage PD trials are exceptionally vulnerable to these issues because symptoms are very mild, floor effects abound, and true disease modification signals are easily obscured by measurement noise.

## Method

The study analyzes data from 50 participants (out of 64 recruited; 26 placebo, 24 treatment with 150mg solengepras) with early, untreated PD who completed bi-weekly remote audiovisual assessments over 12 weeks via the Modality platform. Participants interacted with a conversational virtual guide performing tasks including consonant-vowel-consonant repetition, counting breaths, pitch glides (/i/), diadochokinesis (/pA, tA, kA/), sentence repetition, reading, picture description, spontaneous speech, and bilateral finger-tapping (Wide and Wide Fast tasks).

Data streams were transmitted to a secure cloud server, segmented, and processed near-real-time to extract kinematic and acoustic features. Extreme outliers beyond 5 standard deviations were discarded, followed by a 3-sigma rule filter (values beyond 3 SDs removed). Because the clinical trial failed to meet its primary endpoint and active treatment showed no divergence from placebo, cohorts were pooled (N=50) to evaluate noise and contextual biases.

Statistical validation involved Spearman correlation at baseline between digital measures and MDS-UPDRS items. Longitudinal changes were evaluated using linear mixed-effects models with change from baseline as the outcome, visit as a fixed effect, and subject as a random intercept, estimating least-squares (LS) means. Relative within-participant stability was quantified using the coefficient of variation (CV = SD / mean) for each participant, compared via paired non-parametric Wilcoxon rank-sum tests with cluster bootstrap confidence intervals.

## Experimental setup

Evaluated on data from 50 early, untreated Parkinson's disease participants (19 female, 31 male; mean age 67.08 +/- 7.66 years) from the ASCEND Phase 2 trial. Baselines compared included standard clinical rating instruments, specifically the MDS-UPDRS Total score, Part III Motor Examination subtotal, and individual domain subscores (Speech, Facial Expression, Finger Tapping). Metrics used include Spearman rank correlation coefficients (rho), least-squares mean trajectories across bi-weekly visits up to week 14, and coefficient of variation (CV) alongside Wilcoxon rank-sum tests.

## Results

At baseline, objective features correlated significantly with clinical severity: speech fundamental frequency SD (spontaneous speech) correlated with speech impairment (rho = -0.36, p = 0.01); eye blink rate during pitch glide down correlated with facial expression scores (rho = -0.46, p < 0.001); and 95th percentile finger-tapping velocity (Wide task) strongly correlated with left/right finger-tapping item scores (rho up to -0.55, p < 0.001). Longitudinal LS-means analysis revealed a spurious 'improvement' (placebo effect) in MDS-UPDRS total and subscores at weeks 2, 4, and 8 that reverted to baseline, which was statistically significant for clinician-rated finger-tapping items. Crucially, corresponding objective digital measures exhibited zero significant shifts across all visits, demonstrating resilience to placebo and Hawthorne effects. Furthermore, objective measures showed significantly lower coefficients of variation (CV) than clinician scores across almost all tested comparisons (p < 0.0001), indicating superior measurement stability.

| UPDRS Domain | Objective Measure | Mean CV (UPDRS) | Mean CV (Objective) | Delta CV | p-value |
| --- | --- | --- | --- | --- | --- |
| SPEECH | F0 SD, spontaneous speech | 0.872 | 0.243 | 0.629 | < 0.0001 |
| SPEECH | SNR during counting | 0.872 | 0.174 | 0.697 | < 0.0001 |
| FACIAL | Max lip aperture, pitch glide up | 0.445 | 0.136 | 0.309 | < 0.0001 |
| FTAP (Left) | Number of taps, Wide task | 0.682 | 0.260 | 0.422 | 0.001 |
| FTAP (Left) | 95th percentile acceleration, Wide Fast | 0.682 | 0.167 | 0.515 | < 0.0001 |
| FTAP (Right) | 95th percentile velocity, Wide task | 0.513 | 0.120 | 0.393 | < 0.0001 |

## Limitations

The study cohort is limited to early-stage, untreated Parkinson's disease patients, meaning findings may not generalize to heterogeneous or advanced PD populations. The dataset lacks an unblinded observational control arm without trial participation to strictly isolate natural disease progression from Hawthorne effects. Additionally, inherent rater variability and floor/ceiling effects in the reference MDS-UPDRS clinical scale complicate absolute error modeling.

## Why read this

Clinical trial designers and digital health researchers should read this paper to understand how remote audiovisual biomarkers can successfully bypass placebo and Hawthorne confounds that ruin traditional CNS clinical trial endpoints. It offers concrete evidence that digital metrics achieve substantially lower within-subject variance than the MDS-UPDRS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Remote patient monitoring, decentralized clinical trials for neurodegenerative disorders, and automated digital endpoint generation for Parkinson's disease therapeutics.

## Institutions / 機構

Modality.AI, CLINTREX, Cerevance, University of California, San Francisco

## Related

- (link related pages by id as the wiki grows)
