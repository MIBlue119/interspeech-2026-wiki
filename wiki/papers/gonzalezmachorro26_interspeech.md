---
id: gonzalezmachorro26_interspeech
category: health
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1052
pdf: https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.pdf
---

# Towards Speech Impairment Prediction in German-Speaking Individuals with Amyotrophic Lateral Sclerosis

[PDF](https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gonzalezmachorro26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1052)

**TL;DR** — This paper proposes automated speech analysis models to predict speech impairment and quality of life scores in German-speaking individuals with amyotrophic lateral sclerosis (ALS), achieving a concordance correlation coefficient of up to 0.86 in a personalized within-speaker setting.

## Problem

Amyotrophic Lateral Sclerosis (ALS) is a progressive motor neuron disease that causes bulbar dysfunction, leading to heterogeneous and hard-to-track speech impairments. Current clinical monitoring relies heavily on subjective, coarse scales like ALSFRS-R-speech and QOL-Dys, while existing speech-based machine learning approaches lack data standardization and cross-study comparability—particularly for German speakers.

## Method

The study evaluates a German ALS cohort of 66 patients (96 total sessions) performing five speech tasks: sustained /a:/, picture description, reading passage, and two diadochokinetic syllable repetition tasks (/da/-/da/, /da/-/ba/). Audio data is processed using voice activity detection and spectral gating noise reduction. Three feature sets are extracted: hand-crafted eGeMAPS, Whisper-large-v3 encoder embeddings, and Wav2vec2 embeddings. Support Vector Machines (SVM), Random Forests (RF), and XGBoost (XGB) are trained via GroupKFold cross-validation under two paradigms: cross-sectional (speaker-independent) and within-speaker (temporal split using baseline sessions to predict follow-ups).

## Results

In the cross-sectional setting, the reading passage with Whisper features predicted ALSFRS-R-speech with a Concordance Correlation Coefficient (CCC) of 0.65, while diadochokinetic tasks achieved a CCC of 0.62 for QOL-Dys. In the within-speaker setting, the read passage yielded a CCC of 0.71 for ALSFRS-R-speech, and the /da/-/da/ task reached a peak CCC of 0.86 for QOL-Dys using Whisper features and SVM. QOL-Dys scores were consistently more predictable than ALSFRS-R-speech due to their continuous nature compared to ordinal scales.

## Code

- https://github.com/monicagoma98/IS_AIMnd_2026

## Applications

Clinicians and researchers in speech pathology can use these automated speech analysis pipelines to non-invasively monitor disease progression and therapeutic outcomes in German-speaking ALS patients.

## Limitations

Simple task fusion strategies did not reliably outperform single-task models, and the evaluation is limited to a single German-speaking cohort.

## Related

- (link related pages by id as the wiki grows)
