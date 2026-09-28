---
id: akti26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1159
---

# Synthesizing the Lombard Effect: Multi-Level Control of Speech Clarity and Vocal Effort in TTS

**TL;DR** — A flow-matching TTS model that lets you dial in vocal effort and articulation independently, reproducing the human "Lombard effect" so synthesized speech stays intelligible in noise.

## Problem

Human speakers automatically speak louder and more clearly in noisy environments or when addressing hearing-impaired listeners (the Lombard effect); TTS systems don't replicate this adaptive clarity.

## Method

A flow-matching TTS model trained with pseudo-labels for vocal effort and articulation, giving continuous, disentangled control over both alongside word-level emphasis for specific segments.

## Results

The control mechanisms measurably shift clarity-related acoustic features, and speech-in-noise experiments show the model reproduces the intelligibility gains seen in human clear speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive TTS for hearing-impaired listeners, voice assistants operating in noisy environments, and accessibility-focused announcement systems.

## Related

- (link related pages by id as the wiki grows)
