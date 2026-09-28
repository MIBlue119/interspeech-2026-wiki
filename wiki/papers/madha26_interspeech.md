---
id: madha26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-788
---

# DLLM-TTS: Block Discrete Diffusion Language Model for Text-to-Speech Synthesis

**TL;DR** — DLLM-TTS formulates TTS as block discrete diffusion over neural codec tokens, decoding blocks sequentially but tokens within each block in parallel, achieving a real-time factor of 0.15 and competitive quality from just a 0.6B-parameter model trained on 20K hours.

## Problem

TTS systems face a tradeoff between autoregressive codec language models (highly intelligible but large, slow, sequential) and non-autoregressive approaches (fast but often less linguistically accurate).

## Method

DLLM-TTS formulates TTS as conditional block discrete diffusion over X-Codec2 neural audio codec tokens, decomposing sequences into blocks, applying masked diffusion within each block while processing blocks sequentially, and enabling parallel token prediction within blocks at inference.

## Results

The 0.6B-parameter model trained on 20K hours achieves competitive performance on the Seed-TTS-eval benchmark with a real-time factor of 0.15, demonstrating practical, data-efficient parallel-generation TTS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Suited to latency-sensitive TTS deployment scenarios that want near-autoregressive quality with much faster, partially parallel generation.

## Related

- (link related pages by id as the wiki grows)
