---
id: zhang26ga_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3314
---

# A Dual-Stream Discrete Neural Codec with Fixed-Length Global Speaker Tokens and Dynamic Frame Rates for Low-Bitrate Speech Tokenization

**TL;DR** — Separating speaker identity into a small set of fixed global tokens and content into a dynamically-rate-adjustable stream gives a low-bitrate speech codec better quality/bitrate trade-offs while preserving speaker similarity.

## Problem

Discrete speech tokens are a good interface for speech language models, but many codecs are inefficient due to high token rates and mix speaker characteristics with content-related variation, adding to the modeling burden for downstream models.

## Method

The authors propose a low-bitrate dual-stream discrete codec with a time-varying content token stream from a single codebook plus a small set of fixed-length global speaker tokens, using similarity-based dynamic frame aggregation to merge consecutive frames (with controllable token rate via a single threshold at inference) and an adaptive deaggregation module to restore the base frame rate for waveform reconstruction.

## Results

The codec achieves strong intelligibility and audio quality at low bitrates, with improved bitrate-quality trade-offs over fixed-rate baselines while maintaining speaker similarity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient, low-bitrate speech tokenization for speech language models and streaming/storage-constrained TTS and voice applications.

## Related

- (link related pages by id as the wiki grows)
