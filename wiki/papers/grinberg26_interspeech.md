---
id: grinberg26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-759
---

# ALARM: Audio–Language Alignment for Reasoning Models

**TL;DR** — A "self-rephrasing" training trick lets a 4B audio-language model align with reasoning-LLM backbones and beat larger models on audio-reasoning benchmarks.

## Problem

Standard adapter-training recipes for audio language models (ALMs), which freeze the LLM and train only an adapter on self-generated text targets, break down for reasoning LLMs (RLMs) because their chain-of-thought traces leak the textual surrogate input and produce unnatural responses.

## Method

The authors propose self-rephrasing, converting self-generated responses into audio-understanding variants compatible with RLMs while preserving distributional alignment, plus fusing and compressing multiple audio encoders for stronger representations; they train on a constructed 6M-instance multi-task corpus (2.5M unique prompts, 19K hours of speech/music/sound).

## Results

The resulting 4B-parameter ALM outperforms similarly sized models and surpasses most larger ALMs on audio-reasoning benchmarks while preserving textual capabilities at low training cost, achieving the best open-source result on MMAU-speech and MMSU and ranking third overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building compact, cost-efficient audio-reasoning assistants that need to combine strong chain-of-thought reasoning with audio understanding.

## Related

- (link related pages by id as the wiki grows)
