---
id: chung26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2066
pdf: https://www.isca-archive.org/interspeech_2026/chung26_interspeech.pdf
---

# Localizing and Editing Knowledge in Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/chung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2066)

**TL;DR** — This paper establishes the first audio benchmark and locate-then-edit framework for Large Audio-Language Models, revealing that factual knowledge is jointly stored across both the audio encoder and language backbone.

## Problem

Large Audio-Language Models can encode incorrect or outdated factual knowledge, but existing model editing methods are exclusively designed for text-only LLMs. Extending editing to LALMs is non-trivial because speech features are continuous waveforms spanning multiple frames rather than discrete tokens, and it remains unclear where facts are stored across multimodal layers. Fixing these errors via full retraining is computationally expensive, necessitating a targeted model editing approach for audio-based AI.

## Method

The authors propose a speech-driven locate-then-edit framework built on Qwen2-Audio-7B-Instruct. First, they apply speech-aware causal tracing by using WhisperX forced alignment to obtain word-level timestamps, corrupting the corresponding acoustic frames with Gaussian noise, and measuring indirect effects via state restoration. Second, they evaluate four editing strategies: single-layer editing, sequential cross-modal single-layer editing, projected multi-layer editing with null-space preservation constraints, and sequential cross-modal multi-layer editing. Edits are optimized using rank-one parameter updates over 10 gradient steps, utilizing mean-pooled word representations from aligned audio frames.

## Results

Experiments use CounterFact and Known-1000 benchmarks, converted to speech via Gemini 2.5 Flash TTS, filtering subsets of 100 to 250 instances for localization and 500 instances for editing. The causal tracing analysis reveals that factual knowledge is jointly encoded across layers in both the audio encoder and the language backbone, with the audio encoder playing a particularly prominent role. Coordinated cross-modal edits yield more effective fact updates than unimodal text/audio editing or standard fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers deploying Large Audio-Language Models in voice assistants and spoken dialogue systems can use this framework to efficiently patch incorrect factual outputs without full retraining.

## Related

- (link related pages by id as the wiki grows)
