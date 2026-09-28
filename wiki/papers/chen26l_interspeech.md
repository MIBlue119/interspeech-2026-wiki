---
id: chen26l_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1148
---

# Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data

**TL;DR** — A two-stage rank-then-distill pipeline trains an audio-LLM to keep or drop noisy mined speech-to-speech translation pairs directly from audio, improving downstream translation by up to +1.4 ASR-BLEU.

## Problem

Large mined speech-to-speech translation (S2ST) corpora are abundant but noisy, containing misaligned or semantically incorrect pairs, and filtering this noise is important for training robust S2ST models.

## Method

The authors adopt a scalable Rank→Distill strategy: a lightweight ranker first produces keep/drop pseudo-labels for noisy speech pairs without manual annotation, and an audio large language model is then trained to predict keep/drop directly from raw paired speech, jointly capturing acoustic fidelity and cross-lingual semantic consistency.

## Results

On CVSS-C and SpeechMatrix, filtering training data with the learned audio-LLM classifier yields consistent improvements over training on unfiltered data, with gains of up to +1.4 ASR-BLEU for end-to-end S2ST.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Data curation pipelines for building large-scale speech-to-speech translation systems from noisy, web-mined speech pair corpora.

## Related

- (link related pages by id as the wiki grows)
