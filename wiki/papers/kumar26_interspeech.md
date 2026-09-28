---
id: kumar26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-593
---

# Listening with Attention: Entropy-Guided Explainability for Transformer-Based Audio Models

**TL;DR** — LEAF-X combines entropy-guided attention weighting, multi-layer rollout, and optional causal ablation to produce sparse, faithful token-to-frame explanations for transformer ASR models like Whisper, outperforming perturbation-based and raw-attention explainers.

## Problem

Transformer ASR models such as Whisper are highly accurate but hard to interpret, and existing explainable-AI methods often lack faithfulness and precise temporal grounding.

## Method

LEAF-X (Listening with Entropy-guided Attention for Faithful eXplainability) combines entropy-guided attention weighting, multi-layer attention rollout, and optional causal ablations to identify low-entropy, high-impact attention heads and layers, producing sparse token-to-frame attributions from the model's internal structure rather than external perturbation.

## Results

LEAF-X produces more faithful and stable attributions than strong baselines, supporting more transparent and auditable ASR.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for auditing and debugging ASR systems in high-stakes or regulated settings where transcription decisions need to be explainable.

## Related

- (link related pages by id as the wiki grows)
