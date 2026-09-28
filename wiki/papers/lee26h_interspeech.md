---
id: lee26h_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-909
---

# UR-BERT: Scaling Text Encoders for Massively Multilingual TTS Through Universal Romanization and Speech Token Prediction

**TL;DR** — UR-BERT unifies diverse writing systems into a shared Romanized representation and adds a speech-token prediction objective, scaling a multilingual TTS text encoder to 495 languages and outperforming G2P-limited baselines, including on unseen languages.

## Problem

Conventional grapheme-to-phoneme (G2P)-based TTS text encoders are limited to about 100 languages by the availability of reliable G2P resources.

## Method

UR-BERT is a Romanized-transcription-based TTS text encoder that scales to 495 languages by unifying diverse writing systems into a shared Romanization representation, and introduces a speech-token prediction training objective to encourage speech-aware phonetic representations in a data-efficient manner.

## Results

TTS systems built on UR-BERT consistently outperform recent text encoder baselines across a wide range of languages and resource conditions, with strong generalization to unseen languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables massively multilingual TTS coverage, including low-resource languages that lack mature G2P tooling.

## Related

- (link related pages by id as the wiki grows)
