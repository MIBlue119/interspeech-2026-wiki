---
id: yousef26c_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3457
pdf: https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.pdf
---

# Measuring Vocal Efficiency in Daily Life in Patients with Voice Disorders Using Wireless Accelerometer and Microphone Sensors

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3457)

**TL;DR** — This study introduces ecological vocal efficiency (EVE), calculated as the ratio of sound pressure level to accelerometer-predicted subglottal pressure, finding that patients with vocal nodules exhibit significantly lower and less variable EVE during daily life than healthy controls.

## Problem

Voice disorders are fundamentally linked to inefficient phonation, but current clinical assessments rely on brief, artificial in-lab voice tasks that fail to capture real-world communicative demands. Without continuous ambulatory monitoring, clinicians lack objective, physiologically meaningful markers to evaluate how patients actually use their voices during daily life. This gap hinders the accurate characterization of vocal pathology and the assessment of treatment outcomes in natural environments.

## Method

The authors evaluated 14 adult females (7 with vocal fold nodules and 7 matched healthy controls) using both an in-lab calibration protocol and 3 days of continuous ambulatory monitoring. During the lab visit, participants wore a head-mounted microphone, a pneumotachograph face mask with an intraoral tube, and a uniaxial neck-surface accelerometer (ACC) while producing /p/-vowel syllables across varied loudness and pitch. Individual-specific linear regression models were trained on lab data to predict subglottal pressure (Ps) from ACC RMS amplitude. For the 12-hour-per-day field phase, participants wore a wireless neckband voice monitor streaming synchronized ACC and built-in microphone signals to an Android smartphone. Ecological vocal efficiency was computed in ~50-ms non-overlapping frames as the ratio of microphone-derived SPL to ACC-estimated Ps, and summarized using distribution metrics and personalized normative range deviations.

## Results

In ambulatory monitoring, patients showed significantly reduced EVE variability compared to controls (standard deviation 0.44 vs 1.02, Wilcoxon r = 0.91; IQR 1.37 vs 0.47, r = 0.91). Patients spent a median of 92% of their voicing time outside their customized normative range, compared to 36% for controls (p = 0.03, r = 0.81). While in-lab median EVE cleanly separated the groups (3.94 vs 4.83, p = 0.031, r = 0.81), daily-life median EVE differences were not statistically significant (4.07 vs 4.68, p = 0.078). Normative range comparisons revealed that 3 out of 7 patients exhibited opposite deviation directions between lab and field settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Clinicians and speech-language pathologists can use this dual-sensor monitoring framework to objectively assess vocal function, monitor treatment response, and quantify real-world behavioral changes in patients with voice disorders.

## Limitations

The study is limited by a small sample size of 14 female participants, restricting generalizability, and potential susceptibility of ambulatory subglottal pressure estimates to accelerometer sensor movement and clothing noise.

## Related

- (link related pages by id as the wiki grows)
