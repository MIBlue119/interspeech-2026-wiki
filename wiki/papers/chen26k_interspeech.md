---
id: chen26k_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1118
---

# Causal Tracing of Audio-Text Fusion in Large Audio Language Models

**TL;DR** — Causal tracing reveals that large audio-language models fuse audio and text information differently by architecture — some blend gradually, others fuse abruptly late — with a final-token bottleneck and an attention-like query mechanism that pulls in task-relevant audio.

## Problem

It remains unclear exactly how and where large audio language models (LALMs) integrate acoustic features with textual context internally.

## Method

The authors adapt causal tracing to LALMs and perform layer-wise and token-wise analyses of hidden-state causal effects across three models (DeSTA, Qwen, Voxtral) during audio comprehension tasks.

## Results

Layer-wise analysis shows different fusion strategies per model, from progressive integration to abrupt late fusion; token-wise analysis identifies the final sequence token as an informational bottleneck and reveals an attention-like query mechanism at intermediate positions that pulls in task-relevant audio context.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provides interpretability tooling useful to researchers debugging or designing audio-text fusion architectures in large audio-language models.

## Related

- (link related pages by id as the wiki grows)
