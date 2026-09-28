---
id: variani26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2487
---

# Representational Instability in Decoupled Audio Encoders

**TL;DR** — Introduces a Stability-Rate-Distortion framework and finds that state-of-the-art audio tokenizers like EnCodec, SoundStream, and Whisper produce representations that shatter under small acoustic perturbations, especially once vector-quantized and especially for low-resource dialects.

## Problem

Neural audio encoders are optimized to reconstruct waveforms well (rate-distortion trade-off), but whether their representations stay stable under minor real-world acoustic variation, a property critical for downstream LLMs and ASR, is largely ignored.

## Method

The authors propose a Stability-Rate-Distortion (SRD) framework adding representational stability as a third evaluation axis, introduce the Continuous Edit Distance (CED) to quantify geometric drift, and analyze EnCodec, SoundStream, and Whisper across 26 dialects.

## Results

Continuous latents resist minor perturbations but the vector-quantization bottleneck shatters them into disparate discrete sequences (a 'Quantization Penalty'), and stability collapses specifically on low-resource dialects (a 'Language Tax'), showing high waveform fidelity is empirically at odds with representational stability at low bitrates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides design and evaluation of audio tokenizers used as inputs to downstream LLM/ASR pipelines, especially for robustness across dialects and acoustic conditions.

## Related

- (link related pages by id as the wiki grows)
