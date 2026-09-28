---
id: meng26e_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2022
pdf: https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.pdf
---

# Steps toward a wearable-informed model of real-world listening effort and fatigue among adults with hearing loss

[PDF](https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/meng26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2022)

**TL;DR** — Consumer wearables capture daily listening effort and fatigue in adults with hearing loss, achieving binarized classification accuracies of 68% and 76% using ecological momentary assessments, physiological tracking, and acoustic descriptors.

## Problem

Listening-associated fatigue is prevalent among individuals with hearing loss even when using advanced hearing aids, largely driven by cumulative real-world listening effort. Traditional assessment methods rely heavily on subjective questionnaires or artificial laboratory paradigms that fail to capture the complex, variable nature of daily environments. Developing non-invasive, objective ways to quantify moment-to-moment listening effort and daily fatigue in the field is vital for enabling future user-state-aware hearing technologies.

## Method

Forty-six adults with sensorineural hearing loss participated in a 7-10 day field study using an Apple Watch SE (2nd gen) running a custom ecological momentary assessment (EMA) app. Participants logged self-initiated check-ins during difficult listening moments while the watch simultaneously recorded 30-second acoustic windows (at 22.05 kHz) and passive physiological data (heart rate and heart-rate variability). Participants also completed morning sleep surveys and evening fatigue surveys on an iPhone. Because fine-grained prediction struggled, tasks were formulated as binary classifications using Random Under-Sampling and Boosting (RUSBoost) for momentary effort and a Random Forest classifier for daily fatigue aggregated from physiological, acoustic, and sleep features.

## Results

For momentary listening effort, a RUSBoost model trained on heart rate, heart-rate variability, and loudness features achieved 92.6% recall and 77.9% precision (F1 of 84.6%) under a 70/30 train/test split. For daily fatigue prediction, a Random Forest classifier achieved 76.2% accuracy and balanced sensitivity/specificity on a binarized scale (fatigued vs. not fatigued). The most influential predictors for fatigue included mean A-weighted sound level during watch check-ins, maximum daytime heart rate, and prior-night deep/REM sleep duration. Leave-one-participant-out cross-validation showed overall median accuracy of 67% for fatigue across individuals, though generalizability varied widely.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Hearing aid engineers and researchers would use this approach to develop real-time, user-state-aware acoustic processing and to monitor cumulative listening burden and fatigue in daily life.

## Limitations

Missing data accounted for roughly 32% of expected daily records due to incomplete EMA logs, and consumer wearables impose hardware constraints such as coarse environmental sound sampling and lack of continuous clinical-grade ECG.

## Related

- (link related pages by id as the wiki grows)
