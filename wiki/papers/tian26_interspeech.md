---
id: tian26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-873
---

# Bagpiper-TTS: Natural Language Guided Universal Speech Synthesis

**TL;DR** — A universal TTS system that takes a free-form natural language request, reasons out a rich caption blueprint from it, and then synthesizes anything from plain TTS to multi-talker, roleplay, or singing voice.

## Problem

Classical TTS systems rely on rigid input formats and predefined metadata slots, limiting their ability to fulfill flexible, natural-language user requests spanning many task types.

## Method

Bagpiper-TTS first reasons over a natural language prompt to derive a rich caption, a comprehensive textual blueprint covering both transcription and nuanced metadata, then uses this caption to guide synthesis of the target speech across tasks including multi-talker, intent-to-speech, roleplay, and singing voice synthesis.

## Results

Achieves 1.7% WER on the Seed-TTS-Eval benchmark and matches the performance of dedicated task-specific models in both LLM-as-a-judge and human subjective evaluations across multiple applications.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A single flexible TTS backend for products needing diverse speech generation modes, such as roleplay chatbots, audiobooks, and singing voice tools, driven by natural language instructions.

## Related

- (link related pages by id as the wiki grows)
