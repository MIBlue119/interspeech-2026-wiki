---
id: zhou26h_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2280
---

# FineCombo-TTS: Collaborative and Precise Controllable Speech Synthesis Using Text Descriptions and Reference Speech

**TL;DR** — A controllable TTS framework that jointly uses reference speech and text descriptions through a unified acoustic representation and a flow-matching variance predictor, plus a new structured dataset for relative attribute edits, to give more precise and flexible style control than prior loosely-coupled approaches.

## Problem

Controllable TTS methods based on only reference speech or only text descriptions lack flexibility and precision, and existing joint approaches remain loosely coupled, typically letting speech control timbre and text control only global style separately.

## Method

FineCombo-TTS learns a unified acoustic representation instead of explicit attribute disentanglement, and introduces a Conditional Flow Matching-based Speech Variance Predictor to model fine-grained reference-to-target transformations guided by text descriptions, supported by FineEdit, a new structured paired dataset that explicitly encodes source-to-target attribute variations.

## Results

Experiments show FineCombo-TTS achieves flexible, precise, and expressive controllable TTS, improving on the loose coupling of prior joint reference-and-text-controlled approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fine-grained, precisely directable style and prosody control for TTS content creation combining a reference voice with descriptive text instructions.

## Related

- (link related pages by id as the wiki grows)
