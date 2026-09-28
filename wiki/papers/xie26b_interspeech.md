---
id: xie26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1692
---

# FlashTTS: Fast Streaming TTS with MTP Acceleration and X-pred Mean Flow Distillation

**TL;DR** — FlashTTS is an open-source streaming TTS framework that natively processes streaming text and speech and generates high-fidelity mel output in just two function evaluations, eliminating the sentence-level buffering that slows down most LLM-based streaming TTS.

## Problem

Modern speech dialogue systems need TTS to be both low-latency and natively streaming, but most single-codebook LLM-based TTS methods use multi-stage pipelines that lack native streaming support and suffer high end-to-end latency from slow autoregressive prediction and multi-step flow matching.

## Method

FlashTTS introduces a lagged multi-track architecture that natively processes streaming text and speech inputs without sentence-level buffering, and accelerates acoustic generation by integrating parallel Multi-Token Prediction with an X-pred mean flow matching decoder that achieves high-fidelity token-to-mel generation in exactly two function evaluations.

## Results

By jointly optimizing input processing and decoding efficiency, FlashTTS provides a practical low-latency foundation for real-time speech dialogue systems, with experiments demonstrating strong streaming performance (further quantitative detail was cut off in the source abstract).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency streaming TTS for real-time voice dialogue systems and voice assistants.

## Related

- (link related pages by id as the wiki grows)
