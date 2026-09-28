---
id: hayden26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2749
---

# Accent-Emotion Entanglement in LM-Based Text-to-Speech Systems

**TL;DR** — A case study of two zero-shot TTS systems with similar speaker-similarity scores reveals that emotion conditioning can unintentionally shift accent, a failure standard speaker similarity metrics completely miss.

## Problem

Speaker similarity metrics are the standard quick way to evaluate zero-shot TTS systems, but the authors show these metrics can hide important errors, such as unwanted accent drift, even when speaker similarity scores look high.

## Method

Using two zero-shot TTS systems with comparable speaker similarity metric scores, the authors identify and name "accent-emotion entanglement" — where conditioning on emotion unintentionally alters the produced accent — and evaluate it with accent SMOS listening tests plus visualization and cosine-distance analysis of speaker embeddings.

## Results

One system shows substantial accent variability across emotions, with SMOS ranging from 1.17 to 4.13 and centroid cosine distances up to 0.06, while the other system remains accent-stable; standard speaker similarity metrics fail to flag this difference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Evaluation protocols for emotional/expressive TTS systems that need to catch accent drift and other hidden synthesis errors missed by speaker similarity alone.

## Related

- (link related pages by id as the wiki grows)
