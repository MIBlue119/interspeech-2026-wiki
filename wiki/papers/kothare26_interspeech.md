---
id: kothare26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2847
pdf: https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.pdf
---

# Speech-based Digital Biomarkers can Accelerate ALS Clinical Trials: Insights from Time-to-Event and Hazard Rate Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kothare26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2847)

**TL;DR** — Speech-derived digital biomarkers detect amyotrophic lateral sclerosis (ALS) functional decline significantly faster than traditional clinical questionnaires, enabling drastically smaller clinical trial sample sizes and shorter durations.

## Problem

The clinical gold standard for assessing ALS, the ALSFRS-R questionnaire, tracks disease progression non-linearly and lacks sensitivity during early bulbar involvement. Traditional linear mixed-effects models used to analyze speech biomarkers often fail due to heteroscedasticity and non-normality, prompting the need for robust time-to-event frameworks that naturally accommodate right censoring and irregular patient dropouts.

## Method

The study analyzed longitudinal remote multimodal sessions from 144 ALS participants collected via a cloud-based dialogue system between November 2020 and April 2024. Nine speech and facial biomarkers—including fundamental frequency, cepstral peak prominence, harmonics-to-noise ratio, canonical timing alignment, and maximum lip width via MediaPipe Face Mesh—were extracted. Time-to-event analyses utilized Kaplan-Meier survival curves implemented via scikit-survival, defining events based on conservative minimal clinically-important differences (MCID). Exponential approximations of hazard rates derived from the survival curves were subsequently applied in log-rank test formulas to estimate required clinical trial sample sizes and durations across varying hazard ratios.

## Results

Kaplan-Meier analyses demonstrated that all speech-based digital biomarkers exhibit steeper declines and detect clinically meaningful changes much earlier than ALSFRS-R subscores (p<0.001 via pairwise log-rank tests). Maximum lip width during reading passages was the most sensitive measure, taking only 14 days for 20% of patients to reach an MCID event, compared to 660 days for a 3-point decline in the ALSFRS-R bulbar subscore. Hazard rate modeling revealed that trials using speech biomarkers require a fraction of the participants; for instance, detecting moderate effects (HR=0.5) with 30 participants per arm requires just 6 months of trial duration for reading passage mean fundamental frequency, compared to 137 months for the ALSFRS-R bulbar subscore.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinical trial designers, neurologists, and pharmaceutical researchers can use these speech-based digital biomarkers to optimize endpoint selection, patient stratification, and sample size planning for ALS therapeutic trials.

## Related

- (link related pages by id as the wiki grows)
