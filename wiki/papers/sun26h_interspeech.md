---
id: sun26h_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2166
---

# Activation Steering for Accent Adaptation in Large Audio Language Models

**TL;DR** — Locates accent information in a narrow band of middle encoder layers of large audio language models and shows that steering activations in that band at inference time, with no weight updates, consistently reduces word error rate across eight accents.

## Problem

Accent variability is a major source of ASR errors, but most adaptation approaches rely on fine-tuning without understanding where or how accent information is actually encoded inside the model.

## Method

The authors extract layer-wise encoder activations, estimate mean-shift directions capturing accent-induced representation shifts, inject these directions into individual layers to build a layer-wise accent-sensitivity profile, and then use this structure for parameter-free accent steering that modifies representations only at inference time.

## Results

Accent information concentrates in a narrow band of middle encoder layers, and the resulting parameter-free steering method yields consistent word error rate reductions across eight accents without any weight updates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight, deployment-time accent adaptation for large audio language models without retraining, useful for multi-accent ASR services.

## Related

- (link related pages by id as the wiki grows)
