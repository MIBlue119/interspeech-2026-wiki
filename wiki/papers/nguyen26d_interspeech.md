---
id: nguyen26d_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1043
---

# DiFlow-TTS: Compact and Low-Latency Zero-Shot Text-to-Speech with Discrete Flow Matching

**TL;DR** — Doing flow matching in discrete token space instead of continuous space gives a compact zero-shot TTS model low latency without the usual optimization headaches of continuous flow-based methods.

## Problem

Zero-shot TTS has advanced at replicating unseen voices, but balancing generation quality and inference efficiency remains hard: autoregressive models are slow, diffusion approaches are locked into training-time configurations, and most flow-based methods work in continuous token space, which is harder to optimize than discrete space.

## Method

The authors propose DiFlow-TTS, a zero-shot TTS framework based on discrete flow matching, combining a deterministic Phoneme-Content Mapper for linguistic modeling with a Factorized Discrete Flow Denoiser that simultaneously generates prosody and acoustic token streams.

## Results

Experiments across multiple evaluation metrics demonstrate the effectiveness of the approach, indicating it is compact and low-latency relative to autoregressive and continuous flow-based alternatives.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fast, resource-efficient zero-shot voice cloning for on-device or latency-sensitive TTS products.

## Related

- (link related pages by id as the wiki grows)
