---
id: zhao26d_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-976
---

# Speech-Worthy Alignment for Japanese SpeechLLMs via Direct Preference Optimization

**TL;DR** — A preference-optimization approach adapts Japanese speech LLMs to produce concise, conversational outputs that sound natural when synthesized as speech, instead of inheriting the written-register style of their text-LLM backbones.

## Problem

SpeechLLMs typically combine ASR-trained encoders with text-based LLM backbones, causing them to inherit written-style output patterns unsuitable for TTS; this mismatch is especially pronounced in Japanese, where spoken and written registers differ substantially in politeness markers, sentence-final particles, and syntactic complexity.

## Method

The authors propose a preference-based alignment approach using Direct Preference Optimization to adapt Japanese SpeechLLMs toward concise, conversational, speech-worthy outputs, and introduce SpokenElyza, a benchmark for Japanese speech-worthiness derived from ELYZA-tasks-100 with auditory verification by a native expert.

## Results

The approach achieves substantial improvement on SpokenElyza while largely preserving performance on the original written-style evaluation; SpokenElyza is released to support future research.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building Japanese spoken dialogue systems and voice assistants whose LLM-generated text reads naturally when synthesized as speech.

## Related

- (link related pages by id as the wiki grows)
