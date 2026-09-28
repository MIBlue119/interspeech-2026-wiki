---
id: lin26n_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3228
---

# WQ-Fusion: Dynamic Gated Attention for Cross-Domain Audio Representation

**TL;DR** — A dual-encoder framework that dynamically fuses Whisper and Qwen audio representations with gated attention, beating the strongest single-encoder baseline on a cross-domain audio-encoder benchmark.

## Problem

Pre-trained audio models excel at specialized tasks, but learning a single universal representation that works well across diverse acoustic domains remains hard, and simple static concatenation of multiple encoders is limited.

## Method

WQ-Fusion combines Whisper and Qwen encoders via an Adaptive Feature Modulation module and an element-wise gated attention mechanism, enabling the model to dynamically select and emphasize the more relevant acoustic or semantic features per input.

## Results

On the Interspeech 2026 Audio Encoder Capability Challenge (Track A) benchmark, WQ-Fusion reaches an overall score of 0.836, significantly outperforming the strongest single-encoder baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

General-purpose cross-domain audio representation learning for downstream tasks that need to combine acoustic and semantic strengths of different pretrained encoders.

## Related

- (link related pages by id as the wiki grows)
