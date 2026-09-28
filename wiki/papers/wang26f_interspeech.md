---
id: wang26f_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-409
---

# Dual-Space Constrained Face-Based Zero-Shot Text-to-Speech Synthesis

**TL;DR** — Training a face-conditioned zero-shot TTS model to stay identity-consistent in both a speaker-embedding space and a shared face-voice identity space, not just at inference time, fixes the identity drift common in face-based TTS.

## Problem

A human face conveys rich cues about speaker identity that could enable face-based zero-shot TTS for unseen speakers, but in modular face-based TTS systems the acoustic model is usually trained on speech-derived embeddings while face-derived representations are only introduced at inference, often causing identity drift.

## Method

The authors propose Dual-Space Constrained TTS (DSC-TTS), a modular framework that enforces identity consistency during acoustic model training in both the speaker embedding space and a shared identity space learned through face-voice alignment.

## Results

Experiments show higher speaker similarity and stronger identity consistency than existing face-based TTS methods, while preserving speech quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Face-driven voice generation for avatars, dubbing, or accessibility tools where only a face image (not a voice sample) is available for the target speaker.

## Related

- (link related pages by id as the wiki grows)
