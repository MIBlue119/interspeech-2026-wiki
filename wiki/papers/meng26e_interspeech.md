---
id: meng26e_interspeech
category: health-clinical
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2022
pdf: https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.pdf
---

# Steps toward a wearable-informed model of real-world listening effort and fatigue among adults with hearing loss

*David Meng, Marisa Poulos, Erin O'Neill, Qi Yang, Ivan Iotzov, Jorge Mejia*

[PDF](https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2022)

**Category:** `health-clinical`

**TL;DR** — A field study using consumer Apple Watches to collect ecological momentary assessments (EMAs), passive physiology, and acoustic context from adults with hearing loss demonstrates that wearable-informed models can classify high listening effort (F1: 84.6%) and daily fatigue (76.2% accuracy).

## Key contributions

- Evaluated a consumer wearable (Apple Watch) for unprompted, self-initiated ecological momentary assessments (EMAs) of listening challenges over a 7-10 day field study.
- Combined passive physiological sensing (heart rate, HRV, REM+deep sleep duration) and on-device acoustic context (sound level, spectral features) to predict moment-to-moment listening effort and daily cumulative fatigue.
- Formulated effort and fatigue prediction as binarized classification tasks, overcoming the limitations of noisy continuous Likert/scale ratings.
- Compared 23 bilateral hearing-aid users against 23 non-users, identifying trends in sound levels during reported high-effort listening situations.

## Problem

Individuals with hearing loss frequently experience high listening effort and mental fatigue even when using advanced hearing aids, as current device algorithms adapt strictly to acoustics without knowing the user's moment-to-moment cognitive state. Traditional measures rely on subjective post-hoc surveys or artificial laboratory paradigms that lack ecological validity. Bridging this gap requires non-invasive, continuous wearable sensing that integrates real-world physiological signals with objective acoustic contexts to track listening burden.

## Method

Forty-six adults with sensorineural hearing loss participated in a 7-10 day field study wearing Apple Watch SE (2nd generation) devices running a custom EMA app. During self-initiated check-ins triggered when facing listening challenges, the watch recorded a 30-second acoustic window (22,050 Hz) capturing metrics like A-weighted sound level, spectral flatness, entropy, zero-crossing rate, and reverberation, while concurrently logging heart rate (HR) and heart rate variability (HRV). Morning and evening smartphone surveys captured subjective sleep quality and daily fatigue.

Because continuous 5-point effort ratings proved too noisy, listening effort was binarized into High/Very High versus Not-High effort and modeled using a Random Under-Sampling and Boosting (RUSBoost) classifier on HR, HRV, loudness, and engineered interaction terms. Daily fatigue (scored 0-10 on evening surveys) was binarized into Fatigued (>=6) versus Not-Fatigued (<6) and modeled using a Random Forest classifier incorporating daily aggregates of maximum heart rate, mean HRV, prior-night objective sleep duration (REM + deep sleep), maximum daytime sound level, and daily counts of difficult listening situations.

## Experimental setup

The study analyzed data from 46 participants (23 hearing-aid users, 23 non-users) with mild-to-moderate sensorineural hearing loss, yielding 145 complete day-level records for fatigue modeling after accounting for missing entries (~32% missingness). Classifiers were evaluated using 70/30 train/test splits and leave-one-participant-out cross-validation (LOPOCV). Performance metrics included classification accuracy, sensitivity (recall), specificity, precision, F1 score, and ROC AUC.

## Results

For momentary listening effort classification under a 70/30 split, the RUSBoost model achieved an F1 score of 84.6% with 92.6% recall and 77.9% precision, outperforming chance baselines. Leave-one-participant-out cross-validation (LOPOCV) showed that 13 out of 25 qualified participants achieved individual F1 scores above 70%. For daily fatigue classification, a Random Forest model achieved an overall accuracy of 76.2% with balanced sensitivity and specificity under a 70/30 split, while LOPOCV yielded a median participant-level accuracy of 67% (mean 63.5%). Feature importance analysis revealed that mean A-weighted sound level during check-ins, maximum daytime heart rate, and prior-night REM+deep sleep duration were the most critical predictors of daily fatigue.

| System / Condition | Accuracy (%) | F1 Score (%) | Recall / Sensitivity (%) | Precision (%) | ROC AUC |
|---|---|---|---|---|---|
| RUSBoost (Listening Effort, 70/30 Split) | - | 84.6 | 92.6 | 77.9 | - |
| Random Forest (Daily Fatigue, 70/30 Split) | 76.2 | - | 76.2 | - | ~0.80 |
| Random Forest (Daily Fatigue, LOPOCV Median) | 67.0 | - | 63.2* | - | - |

## Limitations

Data completeness was an issue, with approximately 32% of expected daily records missing due to incomplete EMA check-ins, uncompleted phone surveys, or missing Apple Watch sleep tracks. Consumer wearables impose hardware constraints, such as coarse environmental sound sampling, absence of continuous ECG-grade cardiac signals, and wrist-level rather than ear-level acoustic acquisition. Furthermore, some LOPOCV folds contained only a single class label, preventing the calculation of individual sensitivity or specificity metrics.

## Why read this

Researchers and engineers building user-state aware hearing aids or wearable health tech should read this paper to understand how to leverage consumer-grade smartwatches for ecologically valid sensing of listening effort and fatigue.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time adaptive hearing aids that dynamically adjust processing strategies based on inferred user fatigue and listening effort, and longitudinal mobile health tools for tracking communication burden in daily life.

## Institutions / 機構

National Acoustic Laboratories, GN Store Nord

**Funding / 經費:** GN-NAL Research Alliance Fund

## Related

- (link related pages by id as the wiki grows)
