---
id: yang26n_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2398
---

# U-Codec: Neural Speech Codec under Extreme Temporal Compression for Fast High-Fidelity Speech Generation

**TL;DR** — U-Codec pushes neural speech codec frame rate down to an extreme 5Hz using a Transformer-based inter-frame dependency module and tuned RVQ configuration, tripling LLM-based TTS inference speed over high-frame-rate codecs while maintaining similarity and naturalness.

## Problem

Extreme temporal compression in neural speech codecs typically causes severe intelligibility and spectral detail loss, limiting how fast autoregressive LLM-based TTS can run.

## Method

U-Codec introduces a Transformer-based inter-frame long-term dependency module and systematically explores residual vector quantization (RVQ) depth and codebook size to find optimal configurations at an ultra-low 5Hz frame rate, then applies the codec to an LLM-based autoregressive TTS model with a global/local hierarchical architecture to capture dependencies across multi-layer tokens.

## Results

U-Codec improves LLM-based TTS inference speed by 3x over high-frame-rate codecs while maintaining similarity and naturalness, validating the feasibility of 5Hz discrete tokens for fast, high-fidelity speech synthesis.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables faster, lower-latency LLM-based TTS deployment for interactive voice applications without sacrificing perceived speech quality.

## Related

- (link related pages by id as the wiki grows)
