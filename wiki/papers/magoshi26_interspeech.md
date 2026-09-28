---
id: magoshi26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-977
---

# Refining Pseudo-Audio Prompts with Speech-Text Alignment for Text-Only Domain Adaptation in LLM-Based ASR

**TL;DR** — A text-only domain-adaptation method for LLM-based ASR that generates expressive pseudo-audio prompts by explicitly modeling speech-text alignment, closing the modality gap without paired audio data.

## Problem

LLM-based ASR adapts poorly to new domains when paired speech-transcript data is scarce; fine-tuning the LLM alone ignores acoustic context, while prior pseudo-audio-prompt methods either scale poorly or produce inexpressive, text-only prompts.

## Method

Proposes a framework that explicitly models speech-text alignment to generate highly expressive pseudo-audio prompts that bridge the audio-text modality gap for text-only domain adaptation.

## Results

Outperforms existing text-only adaptation methods, improving both overall error rates and out-of-vocabulary coverage.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Adapting LLM-based ASR systems to new domains or vocabularies when only text data, not paired audio, is available.

## Related

- (link related pages by id as the wiki grows)
