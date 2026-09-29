---
id: schlicher26_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
institutions: ["Technical University of Munich", "University Hospital of Tubingen", "University of Erlangen-Nuremberg", "Imperial College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2383
pdf: https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.pdf
---

# Daily Affect Inference from Longitudinal Speech-based Journals: A Comparison of Acoustic and Linguistic Models

*Michelle D Schlicher, Andreas Triantafyllopoulos, Nadine N Schmitt, Johanna Löchner, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2383)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — This paper investigates how well acoustic and linguistic models can infer daily mood and stress from a new longitudinal speech-based journaling corpus of university students. It finds that linguistic models (such as zero-shot Mistral-7B-Instruct) clearly dominate population-level predictions—reaching a concordance correlation coefficient of 0.466 for valence—while acoustic models perform near zero.

## Key contributions

- Collection and release of a longitudinal speech journaling corpus comprising 61 university students and 769 daily recordings paired with EMA-based psychometric ratings (MDBF and PSS-4).
- Comprehensive benchmark comparison evaluating both acoustic (eGeMAPS, wav2vec2-large-robust-emo) and linguistic (GBERT-large, zero-shot Mistral-7B-Instruct) models for daily affective state tracking.
- Discovery that text-based models vastly outperform acoustic models in population-level mood and stress prediction, challenging assumptions that paralinguistic streams alone capture daily states effectively.
- Speaker-level and linear mixed-effects analyses demonstrating that zero-shot LLMs capture trait-like differences rather than daily intra-speaker fluctuations, while pause-related acoustic features correlate with valence variations.

## Problem

Mental health is increasingly understood as a dynamic, context-dependent state rather than a static trait, creating a need for ecological momentary assessment (EMA) tools. While questionnaires are standard, they neglect natural spoken language, leading researchers to explore speech-based journaling as a high-validity alternative. However, prior deep learning and statistical approaches report moderate (r < 0.5) or zero correlations between speech features and self-reported EMA scores, struggling particularly with global modeling and intra-individual temporal sensitivity.

## Method

The study analyzes daily spoken audio and EMA ratings collected over a 2-week observational study of 61 German-speaking university students (769 valid samples after filtering out participants with <50% adherence or transcription failures). Audio waveforms were resampled to 16 kHz and segmented into phrases using an energy-based approach (pauses >= 1s with intensity 14 dB below mean loudness). Transcriptions were windowed into 5 consecutive phrases with a 3-phrase stride. For text models, the authors employed fine-tuned GBERT-large (using AdamW with differential learning rates 1e-5 for BERT and 1e-3 for the linear head, batch size 16, 10 epochs, 10% warm-up) and zero-shot Mistral-7B-Instruct-v0.2 (8-bit quantization, greedy decoding, max 50 tokens, prompted in German to act as a psychologist rating valence, arousal, and stress). 

For acoustic models, 88 eGeMAPS features plus rhythm, duration, pause count, and valence/arousal/dominance predictions from a pretrained wav2vec2-large-robust-emo model (totaling 92 features) were extracted, normalized, and fed into a multi-output random forest regressor. Additionally, wav2vec2-large-robust-emo was fine-tuned directly for regression using Adam (1e-3, batch size 16, up to 12 epochs). 

To capture intra-speaker dynamics, speaker-level associations were investigated using linear mixed-effects (LME) models fitted individually for each acoustic feature (person-mean-centered to isolate day-level deviations), with p-values adjusted via Benjamini-Hochberg FDR correction. These design choices were made to systematically compare the predictive ceilings of semantic content versus paralinguistic cues in free-form daily mental health tracking.

## Experimental setup

The dataset contains 769 audio samples from 61 speakers (90.2% female, mean age 23.0 years) evaluated on MDBFA (arousal), MDBFV (valence), and PSS-4 (stress) targets scaled to [0,1]. Models except Mistral were evaluated using 5-fold cross-validation on fixed speaker-independent 80/20 splits, comparing against a training-set mean predictor baseline. Performance is measured using Root Mean Squared Error (RMSE) and Concordance Correlation Coefficient (CCC).

## Results

Mistral-7B-Instruct achieved the strongest overall performance in terms of CCC, yielding 0.466 for valence and 0.360 for stress, significantly outperforming GBERT-large (0.227 for valence, 0.209 for stress). For arousal, GBERT-large achieved the highest CCC of 0.122, whereas Mistral scored 0.094. In stark contrast, acoustic models (eGeMAPS and wav2vec2-emo) yielded CCCs near zero or negative across arousal and stress, and only marginal improvements over the mean baseline for valence (eGeMAPS CCC of 0.031). 

Speaker-level error analysis for Mistral revealed that prediction errors varied systematically with participants' average scores: higher mean arousal increased error (slope = 0.836), while higher mean stress decreased error (slope = -0.789). Acoustic LME models showed that only pause count and wav2vec2-predicted valence possessed significant speaker-level associations with valence after Benjamini-Hochberg correction, with no significant acoustic features surviving for stress or arousal.

| System | Arousal (CCC) | Valence (CCC) | Stress (CCC) |
|---|---|---|---||
| Mean Predictor | 0.017 | 0.013 | -0.014 |
| eGeMAPS + RF | -0.007 | 0.031 | 0.007 |
| wav2vec2-emo | -0.047 | 0.017 | 0.000 |
| GBERT-large | 0.122 | 0.227 | 0.209 |
| Mistral-7B-Instruct | 0.094 | 0.466 | 0.360 |

## Limitations

The dataset suffers from a small sample size (61 speakers) and a severe gender imbalance (90.2% female university students in Germany). Self-reported EMA questionnaires are susceptible to recall bias, social desirability, and variable interpretation of reflective daily summaries rather than momentary affect. Furthermore, low within-person variability in some participants and uncontrolled contextual confounders like fatigue or recording quality limited acoustic sensitivity.

## Why read this

Researchers and engineers building speech-based digital phenotyping or mental health monitoring systems should read this paper to understand the performance ceiling of current text vs. acoustic models on naturalistic longitudinal data. It provides a cautionary empirical benchmark showing that zero-shot LLMs capture trait-like differences rather than genuine intra-individual state shifts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-based journaling applications for remote mental health monitoring, ecological momentary assessment augmentation, and clinical tracking of daily stress and mood trajectories.

## Institutions / 機構

Technical University of Munich, University Hospital of Tubingen, University of Erlangen-Nuremberg, Imperial College London

## Related

- [Looking for Affect in Spontaneous Finnish Speech through Linguistic Interpretability](lahtinen26_interspeech.md) — same problem · relatedness 2.4/3
- [ACR-Net: Mitigating Semantic Dominance via Contrastive Acoustic-Semantic Decoupling](zhang26ca_interspeech.md) — same problem · relatedness 2.1/3
- [Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity](park26l_interspeech.md) — same problem · relatedness 2.0/3
- [Investigating LLMs Behavior in Depression Severity Prediction](yu26_interspeech.md) — shared technique · relatedness 1.9/3
- [Automatic Detection of Stress from Speech in the Trier Social Stress Test](drimalla26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
