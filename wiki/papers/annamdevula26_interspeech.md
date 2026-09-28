---
id: annamdevula26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1744
---

# CrossAccent-TTS: Cross-Lingual Accent-Intensity Controllable Text-to-Speech via Disentangled Speaker and Accent Representations

**TL;DR** — CrossAccent-TTS lets a text-to-speech system dial accent strength up or down for Indic languages while keeping the target speaker's identity intact.

## Problem

Cross-lingual TTS for low-resource, phonetically diverse Indic languages generally gives little explicit control over accent character or how strong that accent sounds, even in modern LLM-based systems.

## Method

The system introduces an Accent Intensity Controller that injects weighted language embeddings into a learned accent subspace, letting the model interpolate smoothly between accents and tune accent strength at inference time while a separate representation preserves speaker identity.

## Results

On Indic Multilingual and L2-arctic data, the approach gives precise accent-intensity control and beats strong baselines on accent similarity and controllability without sacrificing speaker similarity or naturalness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Accent-customizable voice assistants, language-learning tools, and dubbing systems for Indic and other multilingual markets.

## Related

- (link related pages by id as the wiki grows)
