---
id: zheng26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-806
---

# CycleCodec: Distillation-Free Factorized Neural Speech Codec via Cycle-Consistent Speaker Swapping

**TL;DR** — A neural speech codec that disentangles content from speaker identity without needing a pretrained SSL or ASR teacher model, using a cycle-consistent speaker-swapping self-supervision signal, making it usable for low-resource languages.

## Problem

Factorized neural speech codecs usually rely on distillation from pretrained self-supervised or ASR teacher models to separate content from speaker information, which limits their use for low-resource languages that lack reliable teacher models.

## Method

CycleCodec trains from scratch without distillation, introducing cycle-consistent speaker swapping as a codec-internal self-supervision signal that reduces cross-stream leakage, plus limited temporal capacity, a query-based Transformer speaker aggregator, and a speaker contrastive loss to improve disentanglement.

## Results

On in-domain English and unseen languages (Mandarin and Vietnamese), CycleCodec outperforms other distillation-free baselines and achieves more robust speaker-content disentanglement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Neural speech codecs and voice-conversion pipelines for low-resource languages lacking pretrained teacher models for content/speaker disentanglement.

## Related

- (link related pages by id as the wiki grows)
