---
id: cooper26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1521
---

# A Large-Scale Dataset of Listener Impressions of Emotional TTS

**TL;DR** — Releases the first large-scale human-rated dataset pairing 18k+ emotional synthetic and natural speech samples with listener judgments of quality, emotion category, and valence/arousal/dominance.

## Problem

There is no large public resource of human listener impressions for emotional synthesized speech, which limits development of automatic quality and emotion-fidelity predictors for emotional TTS.

## Method

The authors collect 18,208 samples in five emotional styles from 13 state-of-the-art synthesis systems plus natural emotional speech, gather ratings from 262 listeners across quality and multiple emotional dimensions, and benchmark pretrained emotion recognizers, speech-quality predictors, and LLM-as-judge methods against the human ratings.

## Results

Analyses reveal how the different rating types relate to each other, and automatic predictors show reasonable but inconsistent correlation with human ratings, with performance varying notably by emotion category.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training and benchmarking automatic quality/emotion-fidelity evaluators for emotional TTS systems, and studying which acoustic factors drive perceived emotional expressiveness.

## Related

- (link related pages by id as the wiki grows)
