---
id: ma26c_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1961
---

# MeanVC 2: Robust Low-Latency Streaming Zero-Shot Voice Conversion

**TL;DR** — Fixes three weaknesses of the streaming zero-shot voice conversion model MeanVC — training-length blowup, small-chunk quality loss, and reference-sensitive timbre encoding — cutting latency from 211ms to 110ms while improving quality.

## Problem

MeanVC pioneered lightweight streaming zero-shot voice conversion, but its chunkwise autoregressive denoising doubles effective training sequence length, quality drops under small chunk sizes, and its timbre encoder is overly sensitive to reference audio quality since it relies directly on reference melspectrograms.

## Method

MeanVC 2 introduces future-receptive chunking (FRC), which schedules bounded past and future receptive fields across diffusion transformer decoder layers and drops clean-chunk teacher forcing, enabling stable 40ms-chunk conversion, plus a universal timbre token encoder that builds timbre representations from a global speaker embedding and retrieves fine-grained cues via cross-attention.

## Results

MeanVC 2 significantly outperforms MeanVC in conversion quality while cutting latency from 211ms to 110ms; audio samples are released and code is planned for release.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time streaming voice conversion for live dubbing, gaming, or voice-changing applications requiring low latency and robustness to imperfect reference audio.

## Related

- (link related pages by id as the wiki grows)
