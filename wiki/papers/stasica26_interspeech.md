---
id: stasica26_interspeech
category: health-clinical
institutions: ["University of Lorraine", "CNRS", "Inria", "CHRU-Nancy", "INSERM"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1265
pdf: https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.pdf
---

# Revisiting Emotion-Based Triage: Evidence from French Emergency Call Data

*Elio Stasica, Clément Joly, Amandine Lecomte, Vincent P. Martin, Romain Serizel, Emmanuel Vincent, Tahar Chouihed*

[PDF](https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/stasica26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1265)

**Category:** `health-clinical`

**TL;DR** — This paper evaluates whether speech emotion recognition (SER) adds predictive value to automatic emergency call triage using 250 real French emergency calls. Results show that categorical and dimensional emotions fail to outperform or reliably augment basic metadata (age, sex, and speaker role) in predicting clinically grounded priority levels.

## Key contributions

- Evaluates SER models on real, naturalistic emergency call data (SAMU54) annotated with official 5-level clinical priority codes (P3 to P0).
- Compares categorical SER (Lajavaness Wav2Vec classifier) and dimensional SER (SpeechDimEmo arousal/valence) using ordinal logistic regression models selected via AIC.
- Exposes a counter-intuitive inverse relationship where higher caller arousal associates with lower priority levels, heavily modulated by speaker role.
- Demonstrates that demographic metadata (age, sex) and speaker context (patient vs. family vs. clinician) vastly outperform emotion features for triage prediction.

## Problem

Prior speech emotion recognition (SER) research for emergency triage relies heavily on simulated or acted datasets, assumes emotion directly maps to medical urgency without clinical validation, and treats callers as a homogeneous group. These unvalidated assumptions and corpus mismatches between acted data and naturalistic emergency call center (ECC) recordings limit real-world deployment. This work questions whether speech emotion actually correlates with professional dispatcher triage decisions in real clinical workflows.

## Method

The study analyzes a balanced dataset of 250 audio recordings (50 per priority level P0-P3) from the SAMU54 emergency center spanning January to December 2024. Main-speaker audio segments are extracted using DiariZen diarization followed by manual verification in Praat, excluding overlapping speech and dispatcher turns. Two public French SER models are used: Lajavaness (a 5-class Wav2Vec categorical classifier outputting pleased, relaxed, neutral, sad, tense) and SpeechDimEmo (estimating frame-level arousal and valence, aggregated via median per recording).

Statistical analysis employs ordinal logistic regression with proportional odds models (using the MASS package in R). Model 1 tests priority against categorical emotion, speaker role, patient age, and patient sex (AIC = 726.2). Model 2 tests priority against median valence, arousal, speaker role, patient age, patient sex, and interaction terms (arousal × speaker role, arousal × valence; AIC = 718.4). Stratified regressions per speaker role are also conducted to isolate effects.

## Experimental setup

Evaluated on a controlled subset of 250 real French emergency calls from SAMU54 (50 calls per priority level P0, P1, P2 SNP, P2 AMU, P3), totaling 250 speakers with annotated age, sex, duration (mean 37.0s), and caller type (patient, family, healthcare professional, other). Compared across categorical vs. dimensional SER feature sets within ordinal logistic regression models. Implemented in R 4.5.1 using the MASS and MuMIn packages.

## Results

Neither categorical nor dimensional emotion features provided meaningful predictive power over metadata. In Model 1 (categorical), age ($eta = 0.035, p < 0.001$) and speaker role (other: $eta = 2.13, p < 0.001$; family: $eta = 1.25, p < 0.001$; clinician: $eta = 1.21, p = 0.022$) strongly predicted priority, whereas none of the emotion categories reached statistical significance relative to neutral. The relaxed emotion was never predicted across the entire dataset, and tense was the most frequent category across all priority levels.

In Model 2 (dimensional), arousal and valence main effects were non-significant ($p = 0.645$ and $p = 0.243$). Unexpectedly, higher arousal interacted negatively with family calls ($eta = -0.56, p = 0.059$) and other callers ($eta = -1.00, p = 0.024$), meaning high caller arousal correlated with lower assigned priority. Age ($eta = 0.035, p < 0.001$), male sex ($eta = 0.493, p = 0.046$), and speaker role remained the dominant predictors.

| System / Model Condition | Predictors Included | AIC | Key Significant Drivers ($p < 0.05$) |
|---|---|---|---|
| Baseline Metadata Only | Age, Sex, Speaker Role | ~725 | Age, Speaker Role (Family/Other/Clinician) |
| Model 1: Categorical SER | Emotion, Age, Sex, Speaker Role | 726.2 | Age, Speaker Role (Emotions non-significant) |
| Model 2: Dimensional SER | Valence, Arousal, Interactions, Age, Sex, Speaker Role | 718.4 | Age, Sex, Speaker Role, Arousal $	imes$ Other/Valence |

## Limitations

The study is limited by a small sample size of 250 calls from a single French emergency center (SAMU54), restricting generalizability. P0-level calls lack direct patient speech because patients are unconscious or in cardiac arrest, biasing speaker availability. Audio recordings contain sensitive clinical data and cannot be made publicly available, limiting external replication.

## Why read this

Speech and ML researchers building affective computing systems for high-stakes healthcare should read this paper to understand the limitations of treating speech emotion as a proxy for clinical urgency. It offers a cautionary empirical baseline showing that basic metadata heavily outperforms complex emotion features in real ECC environments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emergency call center analytics, clinical triage decision-support systems, and robust speech affective computing evaluation.

## Institutions / 機構

University of Lorraine, CNRS, Inria, CHRU-Nancy, INSERM

**Funding / 經費:** Grand Est ENACT AI Cluster

## Related

- [Speech-based Psychological Crisis Assessment using LLMs](chiba26_interspeech.md) — same problem · relatedness 2.0/3
- [TriageSim: A Conversational Emergency Triage Simulation Framework from Structured Electronic Health Records](srirag26_interspeech.md) — same problem · relatedness 2.0/3
- [From Game-Based Annotation to Representation Probing: Cross-Validated Prosodic Speech and Privacy Implications](sepanta26_interspeech.md) — shared technique · relatedness 1.8/3
- [Synthetic Speech, Real Signal: Paralinguistic Preservation and Cross-Lingual Augmentation via Voice Cloning](polle26_interspeech.md) — complementary · relatedness 1.8/3
- [TIMBRE: Layer-Wise Cross-Lingual Speech Emotion Recognition Across 49 Layers and 26 Corpora](marchenko26_interspeech.md) — complementary · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
