---
id: kim26u_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3088
---

# ETC-TTS: Emotion Trajectory Learning for Controllable Emotional Text-to-Speech

**TL;DR** — An emotional TTS system that explicitly learns smooth emotion-intensity trajectories during training, instead of just interpolating between fixed emotion embeddings at inference.

## Problem

Controllable emotional TTS usually scales or interpolates emotion embeddings only at inference time, so intermediate emotional states are never explicitly learned, limiting intensity control stability.

## Method

ETC-TTS models emotion intensity as continuous trajectories in latent style space, using a residual vector quantization (RVQ)-based style extractor for emotion-aware representations and a flow-matching objective that learns transitions between neutral and target emotions during training.

## Results

On Korean and English datasets, ETC-TTS improves controllability while preserving speech quality, with subjective and objective evaluations showing more stable emotional expressions than baseline methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Expressive voice assistants, audiobook narration, and character voices needing fine-grained, stable control over emotional intensity.

## Related

- (link related pages by id as the wiki grows)
