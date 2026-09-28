---
id: zhu26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-230
---

# Content-Aware Dynamic Compression for Efficient Speech Recognition based on Large Language Model

**TL;DR** — A Continuous Integrate-and-Fire-based content-aware compression method adaptively downsamples speech embeddings to match transcription token counts, cutting LLM input length while preserving or boosting ASR accuracy and lowering time-to-first-token.

## Problem

Current LLM-based ASR systems use fixed-rate downsampling for acoustic representations, ignoring speech content dynamics, which causes information loss or redundancy.

## Method

The authors propose a content-aware dynamic acoustic mapping method via the Continuous Integrate-and-Fire (CIF) mechanism, adaptively aligning speech embeddings with transcription token counts to enable content-guided downsampling during both training and inference, cutting LLM input length.

## Results

On AISHELL-1 and LibriSpeech, the method achieves 12-26% relative error reduction at comparable average speech embedding length, and over 45% ASEL reduction with 7-19% lower time-to-first-token across utterance lengths while maintaining comparable performance; GigaSpeech results confirm scalability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improves the efficiency (latency, compute) of LLM-based speech recognition systems for real-time or resource-constrained ASR deployment.

## Related

- (link related pages by id as the wiki grows)
