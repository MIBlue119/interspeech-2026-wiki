---
id: du26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-235
---

# Streaming T5-based Text-to-Speech Synthesis with Limited Lookahead

**TL;DR** — A streaming variant of T5-TTS that starts speaking after just a few words, using causal masking and multi-source distillation to keep quality close to a full-context model despite the limited lookahead.

## Problem

Cascaded LLM-TTS pipelines suffer latency because most TTS models must see the whole text before generating any speech, which is impractical for low-latency conversational AI.

## Method

S5-TTS extends T5-TTS with encoder-decoder language modeling and monotonic alignment learning to synthesize speech word-by-word, adds a lookahead-causal masking mechanism with convolutional auxiliary attention to preserve intelligibility and speaker similarity under limited context, and uses interleaved multi-source distillation to restore naturalness.

## Results

S5-TTS matches the quality of full-context T5-TTS, supports zero-shot synthesis with high speaker similarity, and substantially reduces end-to-end latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency conversational AI and voice assistants where speech must start playing almost as soon as text is generated.

## Related

- (link related pages by id as the wiki grows)
