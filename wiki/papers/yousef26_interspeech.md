---
id: yousef26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2777
pdf: https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.pdf
---

# Modeling Lombard Effects in Voice Disorders Using Daily-Life Monitoring of Ambient Noise and Voice Acoustics

*Ahmed Yousef, Trishul Chowdhury, Gregory Ciccarelli, Thomas F. Quatieri, Robert Hillman, Daryush Mehta*

[PDF](https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yousef26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2777)

**TL;DR** — This study analyzes ambulatory voice and environmental noise recordings from voice-disordered patients and healthy controls to model real-world Lombard effects, finding that cepstral peak prominence (CPP) and noise variability are superior predictors of disorder-specific vocal adaptations compared to traditional pitch and loudness measures.

## Key contributions

- Evaluated continuous real-life Lombard effects across 42 participants (24 voice-disordered patients across two subtypes and 18 healthy controls) using 2–4 days of synchronized ambulatory monitoring (accelerometer and shoulder-mounted microphone).
- Introduced voice-quality metrics (CPP and H1H2) alongside standard SPL and F0 to capture multidimensional phonatory adjustments in daily environments.
- Demonstrated that noise variability (Leq SD) provides complementary predictive power to average noise levels (Leq mean) for real-world acoustic adaptation.
- Identified voice-disorder subtype-specific Lombard patterns: phonotraumatic hyperfunction (PVH) exhibited steeper SPL and CPP slopes, whereas non-phonotraumatic hyperfunction (NPVH) showed a more limited adaptation profile.

## Problem

Prior research on the Lombard effect relies heavily on controlled laboratory experiments with playback noise and scripted tasks, which fail to capture the dynamic temporal variability of everyday acoustic environments. Furthermore, most clinical and ambulatory studies of voice disorders focus exclusively on sound pressure level (SPL) and fundamental frequency (F0), overlooking critical voice-quality metrics like cepstral peak prominence (CPP) and first-minus-second harmonic magnitude (H1H2) that indicate glottal closure and phonatory effort. Existing daily-life studies rarely examine patient populations with vocal hyperfunction who may exhibit maladaptive responses, leading to increased vocal tissue loading and unaddressed risks for voice disorders.

## Method

The study analyzed multi-day wearable recordings comprising a uniaxial accelerometer (ACC) placed on the anterior neck to track vocal signals via sigma-delta modulation at 11025 Hz, paired with a shoulder-mounted Spark 705P noise dosimeter measuring A-weighted equivalent sound level (Leq) at 1 Hz. Daily ACC-to-SPL calibration was performed using a reference microphone at 15 cm during sustained vowels with decreasing intensity. Audio data were segmented into non-overlapping 50 ms frames for voicing detection, extracting vocal SPL, F0, CPP, and H1H2 from voiced frames. Non-speech periods were isolated to compute continuous ambient Leq series, aligned with voice signals via cross-correlation during reading passages and sustained vowels.

Data were summarized across 3-minute non-overlapping analysis windows containing nine voice statistics and two ambient noise statistics (Leq mean and Leq SD), filtering out windows with under 0.5% voicing time. Predictive models were built to map Leq mean and Leq SD to representative voice statistics (CPP mean, median SPL, 95th percentile F0, median H1H2) across three speaker groups. Four regression families—linear regression, second-order polynomial Ridge/Lasso, and gradient-boosted regression trees (GBR)—were evaluated using 5-fold cross-validation and evaluated on an 80/20 train-test split (4,927/1,232 train/test windows for controls, 2,562/641 for NPVH, and 2,911/728 for PVH).

Nonlinear machine learning models (specifically GBR and polynomial Ridge/Lasso) were consistently selected over simple linear models across all 12 final configurations, confirming that real-world noise-to-voice mapping is fundamentally non-linear. Partial dependence plots (PDPs) with a grid resolution of 60 and model-based gain slopes were employed to quantify voice feature sensitivities per 1 dB increase in noise mean and noise variability.

## Experimental setup

The dataset comprised ambulatory recordings from 42 participants: 14 patients with phonotraumatic vocal hyperfunction (PVH, bilateral vocal fold nodules, 29 days), 10 patients with non-phonotraumatic vocal hyperfunction (NPVH, primary muscle tension dysphonia, 26 days), and 18 healthy controls (53 days), with each participant monitored for 2 to 4 full days (at least 10 hours per day). Baseline models compared linear regression, second-order polynomial Ridge/Lasso, and gradient-boosted regression trees (GBR), evaluated using holdout test r² and root mean square error (RMSE).

## Results

Holdout predictive performance was modest, with a maximum test r² of 0.32 achieved by GBR predicting CPP in the PVH group, indicating that noise predictors account for a portion of daily voice variability. CPP proved to be the most predictable voice feature across all groups (test r² values of 0.30 for controls, 0.16 for NPVH, and 0.32 for PVH), whereas F0 was the least predictable (test r² < 0.10 across all groups). Noise variability (Leq SD) frequently showed stronger partial dependence slopes than Leq mean, particularly for F0 (e.g., F0-Leq SD slopes exceeded mean slopes by >3.5 Hz/dB in all groups). PVH patients exhibited a steeper SPL slope relative to Leq mean (0.65 dB/dB) and Leq SD (0.86 dB/dB) than NPVH (0.47 and 0.66 dB/dB, respectively), while controls demonstrated the highest sensitivity to F0 shifts.

| System / Condition | CPP Test $r^2$ | SPL Test $r^2$ | H1H2 Test $r^2$ | F0 Test $r^2$ |
|---|---|---|---|---|
| Control (Best Model) | 0.30 (GBR) | 0.18 (Poly2-Lasso) | 0.15 (GBR) | 0.08 (Poly2-Ridge) |
| NPVH (Best Model) | 0.16 (Poly2-Ridge) | 0.12 (Poly2-Lasso) | 0.09 (GBR) | 0.10 (Poly2-Lasso) |
| PVH (Best Model) | 0.32 (GBR) | 0.16 (GBR) | 0.13 (Poly2-Lasso) | 0.08 (Poly2-Ridge) |

## Limitations

The study features demographic imbalances, including age and gender distribution differences across the diagnostic groups. The predictive power of noise metrics on voice features remains modest (test r² values peaking at 0.32), showing that ambient noise alone is insufficient to fully explain daily vocal fluctuations without additional conversational contexts. Furthermore, the evaluation lacks speaker-independent generalization tests to unseen subjects, restricting conclusions to descriptive and correlational interpretations within the cohorts.

## Why read this

Speech researchers and biomedical engineers should read this paper to understand how to design multimodal ambulatory monitoring pipelines that combine accelerometer-based phonatory quality metrics with ambient noise dosimeter data. It highlights why traditional linear models and pitch/loudness features fail to capture complex vocal pathology dynamics in everyday environments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Continuous ambulatory health monitoring systems, digital biomarkers for voice disorders, and wearable assistive devices for occupational vocal safety.

## Related

- (link related pages by id as the wiki grows)
