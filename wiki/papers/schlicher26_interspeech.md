---
id: schlicher26_interspeech
category: paralinguistics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2383
pdf: https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.pdf
---

# Daily Affect Inference from Longitudinal Speech-based Journals: A Comparison of Acoustic and Linguistic Models

[PDF](https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/schlicher26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2383)

**TL;DR** — This paper evaluates acoustic and linguistic models for longitudinal speech-based daily mood and stress tracking, showing that zero-shot LLMs outperform acoustic models with a valence CCC of 0.466.

## Problem

Tracking mental health via daily ecological momentary assessment typically relies on self-reported questionnaires, which miss natural spoken language cues. While speech-based journaling captures both acoustic and semantic content for mental health monitoring, current models struggle to reliably infer dynamic affective states from longitudinal audio data, and global population models often fail to capture individual fluctuations.

## Method

The authors collected a German longitudinal corpus of 61 university students providing 769 daily voice journals about their highlights and lowlights, paired with MDBF (valence, arousal) and PSS-4 (stress) questionnaire scores. Audio was transcribed using Whisper Large-v3 and segmented into overlapping windows of 5 phrases. The evaluation compares acoustic models (openSMILE extracting 88 eGeMAPS features, and fine-tuned wav2vec2-large-robust-12-ft-emotion-mspdim) against text models (fine-tuned GBERT-large with AdamW, and zero-shot quantized Mistral-7B-Instruct-v0.2 prompted in German as a psychologist). Additionally, speaker-level linear mixed-effects models analyzed acoustic feature variations.

## Results

Evaluated using 5-fold speaker-independent cross-validation and reported via Concordance Correlation Coefficient (CCC) and RMSE, linguistic models clearly dominated population-level inference. Zero-shot Mistral-7B-Instruct achieved the highest CCC for valence (.466) and stress (.360), whereas GBERT-large led on arousal (.122 CCC). In contrast, acoustic features (eGeMAPS and wav2vec2) yielded CCCs near zero for arousal and stress, and only marginal improvements for valence. Speaker-level analysis revealed that acoustic pause variations correlate with valence deviations within individuals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers building mobile health applications, speech-based journaling tools, or digital phenotyping systems for automated mental health monitoring.

## Limitations

The dataset features a small sample size, a strong gender imbalance (90.2% female), and self-reported EMA targets potentially affected by recall bias or social desirability.

## Related

- (link related pages by id as the wiki grows)
