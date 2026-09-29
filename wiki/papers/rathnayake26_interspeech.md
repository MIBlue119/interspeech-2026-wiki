---
id: rathnayake26_interspeech
category: paralinguistics-emotion
labels: [low-resource, dataset-or-benchmark-release]
institutions: ["University of Auckland", "Te Hiku Media"]
code: https://speechresearch.auckland.ac.nz/maori-emotions
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1543
pdf: https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.pdf
---

# Pā‑Kakare: The First Emotional Speech Database for Te Reo Māori

*Himashi Rathnayake, Jesin James, Sally Akevai Nicholas, Gianna Leoni, C. I. Watson, Peter J Keegan*

[PDF](https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rathnayake26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1543)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`, `dataset-or-benchmark-release`

**TL;DR** — P¯a-Kakare introduces the first emotional speech database for te reo M¯aori, capturing 16 culturally grounded emotion categories across 3,840 high-quality utterances. Preliminary acoustic analysis demonstrates that fundamental frequency, intensity, and speech rate systematically differentiate these categories (ANOVA p < 0.001).

## Key contributions

- Constructed the first emotional speech corpus for te reo M¯aori comprising 3 hours and 45 minutes of professional recordings.
- Adopted 16 community-defined, culturally relevant emotion categories instead of relying strictly on universal Ekman-based taxonomies.
- Performed a preliminary acoustic analysis across fundamental frequency, mean intensity, and speech rate, establishing baseline prosodic trends.
- Conducted perceptual validation tests with native speakers demonstrating listener recognition accuracy significantly above chance levels.

## Problem

Speech Emotion Recognition research predominantly targets high-resource languages, largely ignoring Indigenous languages like te reo M¯aori. Existing emotional speech corpora typically rely on presumed universal emotion categories derived from Ekman's model, which often fail to capture culture-specific emotional nuances and lack Indigenous community involvement. Addressing these gaps is crucial for building culturally grounded speech-emotion technologies and supporting language revitalization efforts.

## Method

The corpus contains acted speech designed to ensure high audio fidelity and eliminate speaker overlap. Recordings feature four professional M¯aori voice actors (two male, two female, aged 27-40) executing 15 sentences per emotion across 16 categories: ngenge, haumaru, aroha, huakore, p¯ouri, harikoa, manawanui, pai, kaik¯a, whai whakaaro, whakarihariha, whakah¯ıh¯ı, h¯oh¯a, h¯ıkaka, ohorere, and ¯awangawanga. Each emotion set consists of 5 emotion-specific sentences and 10 neutral-context sentences paired with leading phrases (which were excluded during analysis), ensuring balanced phonetic coverage of short and long vowels. Audio was captured using a Shure SM7B dynamic microphone at a 44.1 kHz sample rate with 16-bit PCM encoding in WAV format.

For acoustic analysis, fundamental frequency (f0) and mean intensity were extracted using Praat's Autocorrelation algorithm via the Python Parselmouth library. Speech rate was computed in morae per second, reflecting M¯aori's mora-timed structure. The emotion category 'pai' (good/well) was utilized as a neutral/calm baseline reference in place of traditional ambiguous neutral labels. Statistical evaluation used one-way ANOVA and post-hoc Tukey HSD tests to assess feature separability across the 120 possible emotion pairs.

## Experimental setup

The dataset comprises 3,840 utterances totaling 3 hours and 45 minutes (3.31 GB) recorded over two separate days. Perception evaluations involved 18 participants rating 288 sentences via an online Qualtrics questionnaire split into two subsets to manage cognitive load. Metrics include listener recognition accuracy (percentage correct against chance level of 12.5% for 8 classes), F-statistics for ANOVA, and Tukey HSD post-hoc pairwise significance.

## Results

The perception test yielded an overall recognition accuracy of 36.15% for the eight-class classification task (38.89% and 33.41% for subsets 1 and 2 respectively), well above the 12.5% chance level. Female actors achieved higher recognition (51% and 40%) compared to male actors (30% and 26%). Narrowing the choice set to four options increased overall accuracy to 51.46%, indicating that errors stem primarily from listener cognitive load with large category sets.

One-way ANOVA revealed highly significant effects of emotion categories on mean f0 (F(15, 3824) = 25.59, p < 0.001), mean intensity (F(15, 3824) = 39.65, p < 0.001), and speech rate (F(15, 3824) = 35.88, p < 0.001). Post-hoc Tukey HSD tests demonstrated significant differences in mean f0 for 62 out of 120 pairs, in intensity for 76 pairs, and in speech rate for 74 pairs. High-arousal categories like h¯ıkaka (excited) and ohorere (surprised) exhibited elevated f0 and intensity, while lower-arousal states like haumaru (safe) and ngenge (tired) showed lower values. Limitations in prosodic separation occurred primarily between confusable emotion pairs sharing similar arousal levels (e.g., haumaru–aroha, manawanui–pai), where prosody alone was insufficient for discrimination.

| System / Condition | Accuracy (8-Class) | Accuracy (4-Class) | f0 ANOVA p-value | Intensity ANOVA p-value | Speech Rate ANOVA p-value |
|---|---|---|---|---|---|
| Full Perception Test (18 Users) | 36.15% | - | < 0.001 | < 0.001 | < 0.001 |
| Subset 1 Evaluation | 38.89% | - | - | - | - |
| Subset 2 Evaluation | 33.41% | - | - | - | - |
| Follow-up Evaluation (10 Users) | - | 51.46% | - | - | - |

## Limitations

The corpus relies entirely on acted speech, which may not fully capture the natural acoustic and pragmatic variability of spontaneous emotional expressions. The speaker pool is restricted to four professional actors, limiting representation across regional dialects, age groups, and broader speaker demographics. The acoustic analysis is strictly limited to prosodic measures (f0, intensity, and speech rate), omitting glottal-source, vocal-tract, and spectral voice-quality features. Access to the dataset is governed by a Kaitiakitanga license requiring prospective users to apply and demonstrate cultural understanding.

## Why read this

Researchers building speech emotion recognition systems for low-resource or Indigenous languages should read this paper to learn how to operationalize culturally specific emotion taxonomies. It provides a blueprint for community-led corpus collection and data sovereignty governance.

## Code

- https://speechresearch.auckland.ac.nz/maori-emotions

## Applications

Development of culturally sensitive speech-emotion recognition technologies, voice assistants, and computer-assisted language learning platforms for te reo M¯aori and other Indigenous Pacific languages.

## Institutions / 機構

University of Auckland, Te Hiku Media

**Funding / 經費:** Science for Technological Innovation National Science Challenge, Ministry of Business, Innovation and Employment, Te Hiku Media, University of Auckland

## Related

- (link related pages by id as the wiki grows)
