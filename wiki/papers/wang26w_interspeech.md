---
id: wang26w_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1244
---

# An Efficient vLLM-Based Inference Pipeline for Unified Audio Understanding and Generation

**TL;DR** — Extends the vLLM high-throughput inference engine to natively support multi-stream speech-token generation and classifier-free guidance for unified speech understanding and generation, keeping 80% of non-CFG throughput despite CFG usually halving it.

## Problem

High-throughput multimodal LLM inference engines lack native support for multimodal generation, which is especially problematic for speech language models that generate multi-layered audio tokens via decoupled AR+NAR or synchronous multi-token prediction with delay-pattern interleaving, conflicting with standard single-stream decoding loops.

## Method

The authors extend autoregressive decoding in a vLLM-based pipeline to natively execute delay-pattern de-interleaving and coordinated multi-stream sampling with an on-GPU acoustic decoder for end-to-end waveform synthesis, and co-schedule paired conditional/unconditional requests within a continuous batch to implement classifier-free guidance efficiently.

## Results

The CFG implementation sustains 80% of non-CFG throughput by absorbing dual-request and logit-merging overhead, overturning the common assumption that CFG halves throughput; the framework is open-sourced.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

High-throughput production serving of unified speech understanding-and-generation language models, e.g. speech assistants that both comprehend and speak.

## Related

- (link related pages by id as the wiki grows)
