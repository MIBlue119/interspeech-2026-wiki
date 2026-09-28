---
id: guan26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2194
---

# UniVoice: Unifying Autoregressive ASR and Flow-Matching based TTS with Large Language Models

**TL;DR** — UniVoice unifies ASR and TTS in one LLM using continuous (rather than discrete-token) representations and a dual-attention masking mechanism, matching or beating state-of-the-art single-task models on both recognition and zero-shot cloning.

## Problem

LLMs now dominate both ASR and TTS, but existing frameworks treat the two tasks as isolated, and discrete tokenization needed for joint modeling causes information loss that compromises accuracy and synthesis quality.

## Method

UniVoice is a unified LLM that integrates ASR and TTS via continuous representations rather than discrete tokens, using a dual-attention masking mechanism to dynamically switch between causal masks for ASR and bidirectional masks for TTS, plus text-prefix guided speech infilling for zero-shot voice cloning.

## Results

UniVoice achieves competitive or superior performance versus state-of-the-art single-task ASR and TTS models; code and weights are released publicly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A step toward unified end-to-end speech interaction systems that handle both understanding (ASR) and generation (TTS) within a single model.

## Related

- (link related pages by id as the wiki grows)
