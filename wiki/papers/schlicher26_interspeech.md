---
id: schlicher26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2383
---

# Daily Affect Inference from Longitudinal Speech-based Journals: A Comparison of Acoustic and Linguistic Models

**TL;DR** — A new 61-speaker, 769-recording longitudinal speech-journal dataset shows that language-based models (GBERT, Mistral-7B) far outperform acoustic models at predicting population-level mood/stress, but all models struggle to track individual day-to-day variation.

## Problem

Speech-based journaling could support mental-health monitoring by combining acoustic cues and semantic content, but how well current acoustic and linguistic models actually infer daily mood and stress from naturalistic longitudinal recordings was untested.

## Method

The authors build a longitudinal corpus of 61 speakers and 769 daily recordings labeled with standard mood and stress questionnaires, then compare eGeMAPS and wav2vec2 acoustic models against GBERT-large and zero-shot Mistral-7B-Instruct linguistic models.

## Results

Linguistic models dominate at the population level (GBERT reaches .122 concordance for arousal; Mistral reaches .466 for valence and .360 for stress) while acoustic model results are near zero, though acoustics do show a speaker-level relationship between pause patterns and valence, and Mistral is better suited to trait-like differences than day-to-day variation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides design of speech-based mental-health monitoring tools, highlighting the need for personalization rather than population-level models to track individual daily affect.

## Related

- (link related pages by id as the wiki grows)
