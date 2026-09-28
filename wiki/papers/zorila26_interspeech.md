---
id: zorila26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3291
---

# From Noisy Speech to Accurate APIs: LLM-driven Embedding Steering for Resilient Tool Retrieval

**TL;DR** — Steering tool-embedding representations using LLM-generated synthetic queries makes speech-driven API/tool retrieval far more resilient to the ASR errors that noisy, reverberant speech conditions introduce, without retraining any model.

## Problem

Embedding-based tool retrieval often fails in real deployments because API descriptors don't match what embedding models were originally trained on, normally requiring fine-tuning or retraining; this problem is amplified for speech-driven queries, where background noise degrades ASR output before retrieval even happens.

## Method

The authors present a training-free, offline method that uses an LLM to generate diverse, user-style synthetic queries, tasks, and scenarios for each tool, then averages (steers) the resulting embeddings to form a semantically enriched tool representation, evaluated under simulated reverberation and additive noise before ASR.

## Results

Across multiple embedding models and tool datasets, the proposed method provides a simple yet effective way to enhance tool retrieval reliability under realistic noisy speech conditions without any model retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Making voice-driven assistants and agentic systems more reliable at selecting the correct API or tool when operating in noisy, real-world acoustic environments.

## Related

- (link related pages by id as the wiki grows)
