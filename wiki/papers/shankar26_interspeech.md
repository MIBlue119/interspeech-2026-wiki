---
id: shankar26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-822
---

# GC-LoRA: Gated Convolutional LoRA for Parameter-Efficient Acoustic Adaptation

**TL;DR** — A LoRA variant that injects Conformer-style local convolutions into speech foundation model adapters, cutting word error rate by up to 10.9% on mismatched acoustic domains with only a small addition of trainable parameters.

## Problem

Standard parameter-efficient fine-tuning methods like LoRA adjust global attention but lack the local context modeling needed to capture domain-specific acoustic variation, hurting speech foundation model performance in mismatched domains (degraded, bandlimited, dialectal, or child speech).

## Method

GC-LoRA integrates a lightweight Conformer-style gated convolutional adapter into the attention output projections of pretrained Transformer encoders, adding local acoustic modeling without disrupting the pretrained global representations.

## Results

Across acoustically-degraded, bandlimited, dialectal, and child speech datasets, GC-LoRA reduces WER by up to 10.9% compared to baselines while adding minimal trainable parameters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient domain adaptation of large speech foundation models for challenging acoustic conditions, e.g. children's speech, dialectal speech, or degraded audio, without full fine-tuning cost.

## Related

- (link related pages by id as the wiki grows)
