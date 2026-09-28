---
id: yousef26c_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3457
pdf: https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.pdf
---

# Measuring Vocal Efficiency in Daily Life in Patients with Voice Disorders Using Wireless Accelerometer and Microphone Sensors

*Ahmed Yousef, Emma Willis, Vahni Tagirisa, Robert Hillman, Daryush Mehta*

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3457)

**TL;DR** — This paper introduces ecological vocal efficiency (EVE)—defined as the ratio of microphone-derived sound pressure level (SPL) to accelerometer-estimated subglottal pressure (Ps)—to measure voice disorders in daily life. Ambulatory monitoring of 14 female participants revealed that patients with vocal nodules spent 92% of their voicing time outside the normative EVE range (vs. 36% for controls, p = 0.03, effect size r = 0.81).

## Key contributions

- Formulated ecological vocal efficiency (EVE) as the ratio of SPL (dB) to accelerometer-derived subglottal pressure (Ps, dB) for continuous ambulatory assessment.
- Built participant-specific linear regression calibration models mapping neck-surface accelerometer RMS amplitude to subglottal pressure using in-lab aerodynamic data.
- Demonstrated through a 3-day ambulatory study that daily-life EVE variability metrics (SD and IQR) separate patients from healthy controls more robustly than in-lab measurements (p = 0.016, r = 0.91).
- Quantified real-world vocal deviation by establishing personalized control-derived normative EVE ranges, showing patients spend a median of 92% of voicing time in atypical states.

## Problem

Clinical voice assessments have traditionally relied on brief, in-laboratory protocols utilizing specialized face masks and /p/-vowel sequences to measure vocal efficiency (VE). These laboratory tasks fail to capture real-world voice use and natural communication dynamics. Furthermore, relying purely on acoustic SPL or aerodynamic pressures in isolation misses the core physiological mechanism of laryngeal efficiency—how well aerodynamic lung power is converted into acoustic output. Prior work establishing accelerometer-to-subglottal pressure estimation had not yet been extended to continuous daily-life monitoring of pathological voice function.

## Method

The study utilized a two-phase data collection pipeline. During the initial in-lab calibration phase, participants wore a head-mounted condenser microphone (15 cm from lips), a pneumotachograph face mask with an intraoral tube to capture intraoral pressure as a proxy for subglottal pressure (Ps), and a miniature uniaxial neck-surface accelerometer (ACC) mounted midway between the thyroid prominence and sternum. Participants performed /pa/, /pi/, and /pu/ syllable sequences at varying loudness (loud to soft) across comfortable, high, and low pitch conditions. Microphone signals and intraoral pressure were sampled at 20 kHz (low-pass filtered at 8 kHz), and the ACC signal at 8,889 Hz. Individual-specific linear regression calibration models were fit to predict Ps from ACC RMS amplitude using the comfortable pitch trials.

In the ambulatory phase, participants wore a wireless neckband voice monitor incorporating the uniaxial ACC sensor and a built-in miniature microphone for 3 waking days (approximately 12 hours/day). The raw acoustic speech audio was discarded to protect privacy; the microphone signal was solely used to compute vocal sound pressure level (SPL) in ~50-ms non-overlapping frames. An ACC-based voice activity detector classified frames, restricting analyses to non-singing voiced speech. Using the participant-specific calibration factors, ACC RMS translated to estimated field Ps. Both metrics were converted to decibels to compute ecological vocal efficiency: EVE = SPL (dB SPL) / Ps (dB re cm H2O).

Distributions of EVE frames were summarized per participant via median, standard deviation (SD), interquartile range (IQR), 95th/5th percentiles, skewness, and kurtosis. Patient voiced frames were benchmarked against personalized normative thresholds (mean ± 1 SD of their matched control) to compute total percentage of daily voicing time spent outside the normal range.

## Experimental setup

The study evaluated 14 adult females: 7 patients diagnosed with vocal fold nodules (mean age 26.3 years) and 7 age-matched vocally healthy controls (mean age 25.0 years). Data encompassed 3 days of ambulatory monitoring per participant (~12 hours/day). Metrics included EVE distribution statistics (median, SD, IQR, p95, p5, skewness, kurtosis) and percent voicing time outside normative ranges. Group differences were evaluated using paired Wilcoxon signed-rank tests with effect sizes reported as Wilcoxon r.

## Results

In daily life, patients showed significantly restricted EVE dispersion compared to controls, with standard deviation (SD: 0.44 vs 1.02, p = 0.016, r = 0.91) and interquartile range (IQR: 0.59 vs 1.37, p = 0.016, r = 0.91) offering strong group separation. Patients spent a median of 91.8% of their daily voicing time outside the control-derived normative EVE range, compared to 35.9% for controls (p = 0.03, r = 0.81). While median daily EVE did not reach statistical significance (4.07 for patients vs 4.68 for controls, p = 0.078), laboratory median EVE did show significant separation (3.94 vs 4.83, p = 0.031).

| System / Condition | Median EVE (Lab) | Median EVE (Field) | SD EVE (Field) | % Time Outside Norm | p-value (Field) |
|---|---|---|---|---|---|
| Healthy Controls | 4.83 | 4.68 | 1.02 | 35.9% | - |
| Vocal Fold Nodules | 3.94 | 4.07 | 0.44 | 91.8% | 0.03 |

## Limitations

The study is limited by a small sample size of 14 total participants restricted to adult females with vocal fold nodules, which restricts broader demographic and pathology generalizability. Ambulatory ACC estimates can be susceptible to sensor movement artifacts, and microphone SPL can be influenced by head orientation and clothing friction. Furthermore, the reliance on individualized in-lab linear calibration models requires clinical visits that may not perfectly capture dynamic field conditions.

## Why read this

Speech researchers and biomedical engineers working on wearable health tech should read this paper to see how dual-sensor accelerometer-microphone setups can translate clinical aerodynamic metrics into privacy-preserving ambulatory biomarkers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Continuous ambulatory monitoring of vocal health, remote tracking of phonotraumatic voice disorders, and objective evaluation of speech therapy or laryngeal surgery outcomes.

## Related

- (link related pages by id as the wiki grows)
