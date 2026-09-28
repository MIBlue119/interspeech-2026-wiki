---
id: diwan26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1437
---

# ParaSpeechCLAP: A Dual-Encoder Speech-Text Model for Rich Stylistic Language-Audio Pretraining

**TL;DR** — ParaSpeechCLAP is a family of CLAP-style dual-encoder models trained to map speech and richly descriptive style captions (pitch, texture, emotion, and more) into a shared embedding space, and it works well both for retrieval and as a reward signal for style-prompted TTS.

## Problem

Existing speech-style embedding models handle only a narrow set of stylistic descriptors, leaving out much of the intrinsic (speaker-level) and situational (utterance-level) richness that natural language can describe.

## Method

The authors train separate Intrinsic and Situational dual-encoder models plus a unified Combined model on speech and style-caption pairs, finding that specialized models win on individual style dimensions while the Combined model wins on compositional style descriptions, and add a classification loss with class-balanced training for the Intrinsic model.

## Results

ParaSpeechCLAP outperforms baselines on most metrics across three applications: style caption retrieval, speech attribute classification, and use as an inference-time reward model for style-prompted TTS; models and code are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Style-controllable TTS systems, speech attribute classifiers, and retrieval tools that need to search or condition on rich natural-language style descriptions rather than a fixed label set.

## Related

- (link related pages by id as the wiki grows)
