---
id: kothare26_interspeech
category: health-clinical
institutions: ["Modality.AI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2847
pdf: https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.pdf
---

# Speech-based Digital Biomarkers can Accelerate ALS Clinical Trials: Insights from Time-to-Event and Hazard Rate Analysis

*Hardik Kothare, Michael Neumann, Vikram Ramanarayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2847)

**Category:** `health-clinical`

**TL;DR** — This paper demonstrates that speech and facial digital biomarkers identify functional decline in ALS significantly faster than the clinical gold-standard ALSFRS-R, enabling dramatic reductions in clinical trial sample sizes and durations. Across 144 participants, maximum lip width and acoustic features detected meaningful decline within 4 to 14 days for 20% of patients, compared to 208 to 660 days for ALSFRS-R subscores.

## Key contributions

- Applied non-parametric Kaplan-Meier survival and hazard rate modeling to longitudinal speech and facial biomarkers in ALS, bypassing the non-linear assumptions and limitations of linear mixed-effects models.
- Established concrete sample size and trial duration reductions: achieving 80% power at alpha=0.05 with n=30 per arm required only 4 to 14 months for digital biomarkers versus up to 137 months for the ALSFRS-R bulbar subscore.
- Integrated conservative Minimal Clinically Important Difference (MCID) thresholds for nine acoustic, linguistic, and facial features to robustly define clinical 'events' and handle right-censoring from patient dropouts.
- Demonstrated that remote, asynchronous multimodal data collection (via the Modality cloud platform) mitigates clinic proximity barriers in neurodegenerative disease trials.

## Problem

Amyotrophic lateral sclerosis (ALS) is a rapidly progressive motor neuron disease with a median survival of 3 to 5 years, yet very few clinical trials have demonstrated statistically significant drug efficacy. The current clinical gold standard, the ALSFRS-R questionnaire, captures disease progression nonlinearly, lacks sensitivity during early bulbar involvement, and suffers from coarse ordinal scoring. Prior statistical evaluations using linear mixed-effects models struggle with non-normal random effects and heteroscedasticity, failing to capture the heterogeneous and non-linear trajectories of neurodegenerative decline.

## Method

Longitudinal multimodal data (audio, video, transcripts) were collected remotely every two weeks from 144 ALS participants via the Modality cloud-based dialogue platform during standardized tasks including reading passages (RP), sentence intelligibility tests (SIT), oral diadochokinesis (DDK), and picture descriptions (PD). Speech features (fundamental frequency F0, harmonics-to-noise ratio HNR, cepstral peak prominence CPP, speaking duration, canonical timing alignment CTA, and percentage pause time PPT) were extracted using Praat and the Montreal Forced Aligner. Facial kinematic measures (such as maximum lip width) were derived from MediaPipe Face Mesh landmarks normalized by inter-caruncular distance, and linguistic metrics from spaCy transcripts.

To handle irregular follow-ups and patient dropouts without parametric trajectory assumptions, the study formulated progression as a time-to-event analysis. An 'event' was strictly defined as crossing the most conservative MCID threshold for each measure (e.g., RP max lip width rise >= 0.0609, RP mean F0 rise >= 7.88 Hz, or RP CTA drop >= 7.36 percentage points) or a 1-point/3-point decline for ALSFRS-R speech/bulbar scores. Kaplan-Meier survival curves were estimated using the sksurv package, with pairwise differences assessed via log-rank tests.

Event-specific hazard rates lambda(t) were approximated exponentially from KM curves, and sample sizes per arm for a two-arm trial were calculated under hazard ratios of HR = 0.5 and HR = 0.8 using standard log-rank test formulations for 80% power at alpha = 0.05. These choices were designed to translate high-frequency, granular acoustic and facial tracking into actionable statistical parameters for future Phase III clinical trial design.

## Experimental setup

The dataset comprised 144 participants (110 non-bulbar, 34 bulbar) yielding 3,463 total sessions (mean 24.3 sessions per participant) collected remotely between November 2020 and April 2024 via EverythingALS. Baselines compared included the ALSFRS-R Bulbar subscore (-3 point decline) and the ALSFRS-R Speech score (-1 point decline). Metrics included Kaplan-Meier event probability curves, log-rank p-values, required sample size per arm across 3-to-24 month trial durations, and required trial duration for fixed n=30 per arm at HR=0.5.

## Results

Kaplan-Meier survival curves revealed that all nine digital biomarkers exhibited much steeper declines than ALSFRS-R scores. The most sensitive digital biomarker was maximum lip width during reading passage, where 20% of patients experienced a clinically meaningful change in just 14 days, whereas the least sensitive digital marker (reading passage duration) took 100 days. In stark contrast, reaching the same 20% event probability took 208 days for the ALSFRS-R speech score and 660 days for the bulbar subscore. Pairwise log-rank tests confirmed that all digital measures differed significantly from the ALSFRS-R bulbar subscore (p < 0.001).

For clinical trial design at HR = 0.8 over a 12-month duration, the ALSFRS-R bulbar subscore required 2,551 participants per arm, whereas digital biomarkers required drastically fewer: e.g., RP max lip width required 58 participants/arm, mean F0 rise required 108/arm, and CTA drop required 247/arm. For a fixed trial size of n=30 per arm at HR = 0.5, detecting efficacy using the ALSFRS-R bulbar subscore demanded 137 months, whereas speech and facial biomarkers achieved the same statistical power in 4 to 14 months (e.g., lip width in 4 months, SIT PPT in 5 months, mean F0 rise in 6 months).

| Endpoint / Measure | Required Sample Size/Arm (HR=0.8, 12 mo) | Required Trial Duration (n=30/arm, HR=0.5) |
|---|---|---||
| ALSFRS-R Bulbar subscore (-3pt) | 2,551 | 137 months |
| ALSFRS-R Speech score (-1pt) | 875 | 47 months |
| RP CTA drop (>= 7.36%) | 247 | 14 months |
| RP Mean F0 rise (>= 7.88 Hz) | 108 | 6 months |
| RP Max lip width rise (>= 0.0609) | 58 | 4 months |

## Limitations

The study's hazard rate estimates may be influenced by underlying patient heterogeneity and population stratification. Approximating hazard rates using an exponential assumption implies a constant risk over time, which may misrepresent the non-linear acceleration of ALS progression. Furthermore, potential biases from censoring due to incomplete follow-ups or dropouts were not fully mitigated, and generalizability across broader linguistic and demographic populations requires further validation.

## Why read this

Speech and machine learning researchers designing clinical trials or remote health monitoring tools should read this paper to see how non-parametric survival analysis translates granular acoustic/facial features into concrete trial duration and sample size savings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accelerating pharmaceutical clinical trials for neurodegenerative diseases and deploying remote, automated digital biomarker monitoring for ALS functional decline.

## Institutions / 機構

Modality.AI

**Funding / 經費:** National Institutes of Health

## Related

- [Reducing Measurement Noise in Digital Speech Biomarkers: Interpretable Composite Index Scores for Longitudinal ALS Monitoring in Clinical Trials](neumann26_interspeech.md) — same problem · relatedness 2.3/3
- [Multi-Phonation Graph Learning with Self-Supervised Speech Embeddings for ALS Detection and Progression Prediction](taghibeyglou26_interspeech.md) — same problem · relatedness 2.1/3
- [Towards Speech Impairment Prediction in German-Speaking Individuals with Amyotrophic Lateral Sclerosis](gonzalezmachorro26_interspeech.md) — same problem · relatedness 2.1/3
- [Speech and Video Biomarkers Exhibit Reduced Within-Subject Variability in Early Parkinson’s Disease and Resistance to Placebo and Hawthorne Effects](kothare26b_interspeech.md) — shared technique · relatedness 2.0/3
- [A multilingual composite speech index to assess passage reading in Huntington’s disease](constantin26_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
