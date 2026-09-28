---
id: stasica26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1265
pdf: https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.pdf
---

# Revisiting Emotion-Based Triage: Evidence from French Emergency Call Data

[PDF](https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1265)

**TL;DR** — This study evaluates whether speech emotion recognition can predict medical urgency for emergency call triage, finding that metadata and speaker roles drastically outperform emotional features.

## Problem

Emergency call centers struggle with high volumes and time pressure, leading prior research to assume that caller emotions correlate with medical urgency. However, these emotion-based triage models have relied on simulated data or unvalidated assumptions without grounding in professional clinical priority scales. This study investigates whether speech emotion features genuinely correlate with clinically annotated priority levels using real-world emergency call data.

## Method

The study analyzes a balanced dataset of 250 real emergency audio calls from a French center (SAMU54), annotated into five medical priority levels (P3 to P0). Audio data is preprocessed using the DiariZen diarization model and manual verification to extract the main speaker's verbal segments. Two pretrained French SER systems are evaluated: a categorical Wav2Vec-based classifier (Lajavaness) predicting five emotion classes and a dimensional model (SpeechDimEmo) yielding frame-level arousal and valence aggregated via medians. These emotion representations are integrated into ordinal logistic regression models with proportional odds, alongside metadata predictors including patient age, sex, and speaker role (patient, family, clinician, or other).

## Results

Evaluating ordinal logistic regression models via AIC model selection reveals that categorical emotion categories do not reach statistical significance (p > 0.05) in predicting priority once metadata are included. For dimensional models, neither valence nor arousal shows a significant main effect, though arousal exhibits significant interactions with speaker role and valence (e.g., higher arousal in family calls correlates negatively with priority, β = -0.56). Across all specifications, patient age is a strong positive predictor of urgency (β = 0.035, p < 0.001), and speaker role heavily impacts assigned priority, with calls placed by third parties or family members assigned significantly higher priority levels than those from patients directly (e.g., third-party β = 2.13 to 2.50, p < 0.001).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emergency medical services and speech-processing engineers designing automated call-center triage assistants or decision-support tools.

## Limitations

The analysis is constrained to a single French emergency call center corpus with a balanced subset of 250 calls, and relies on external pretrained SER models rather than domain-finetuned architectures.

## Related

- (link related pages by id as the wiki grows)
