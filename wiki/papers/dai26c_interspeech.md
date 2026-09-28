---
id: dai26c_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-791
---

# One-Step Token-to-Waveform Generation with MeanFlow in Latent Space

**TL;DR** — Applies MeanFlow generation in a compressed latent space to turn multi-step flow-matching audio decoding into a single step, cutting synthesis latency roughly 17x with little quality loss.

## Problem

The Token-to-Waveform decoder in LLM-based TTS and codec pipelines is a quality/efficiency bottleneck: multi-step flow-matching decoders sound good but are slow due to iterative sampling.

## Method

The proposed decoder models average rather than instantaneous velocity (MeanFlow) to enable true one-step generation, operates in a highly compressed latent space to avoid the memory/stability problems of waveform-level flows, and adds decoder-only and end-to-end joint fine-tuning refinements to correct latent mismatch without added inference cost.

## Results

The method achieves up to a 17x improvement in real-time factor over multi-step baselines with negligible quality degradation; code and demos are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency Token2Wav decoding for LLM-based TTS, voice assistants, and other neural-codec-driven speech and audio generation systems.

## Related

- (link related pages by id as the wiki grows)
