---
id: lee26j_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-943
---

# WAND: Windowed Attention and Knowledge Distillation for Efficient Autoregressive Text-to-Speech Models

**TL;DR** — A fine-tuning framework that adapts pretrained autoregressive TTS models to use windowed attention instead of full self-attention, cutting KV-cache memory by up to two-thirds with near-constant latency and no quality loss.

## Problem

Decoder-only autoregressive TTS models produce high-fidelity speech, but their memory and compute cost scales quadratically with sequence length due to full self-attention.

## Method

WAND splits attention into persistent global attention over conditioning tokens and local sliding-window attention over generated tokens, uses curriculum learning that progressively tightens the window to stabilize fine-tuning, and distills from a full-attention teacher to recover synthesis quality data-efficiently.

## Results

Evaluated on three modern AR-TTS models, WAND preserves original quality while achieving up to 66.2% KV-cache memory reduction and length-invariant, near-constant per-step latency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying long-form, low-latency autoregressive TTS on memory-constrained servers or edge devices.

## Related

- (link related pages by id as the wiki grows)
