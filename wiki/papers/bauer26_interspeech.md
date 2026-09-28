---
id: bauer26_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2523
---

# VAD to the Bone: Ultra-Tiny Speech Activity Detection for Edge Deployment

**TL;DR** — kiloVAD is a voice activity detector small enough to run on tightly constrained embedded hardware while still setting a new accuracy record for causal, deployment-ready VAD.

## Problem

Always-on voice activity detection must run under strict memory, latency, and compute budgets, but many accurate compact VAD models depend on components — learnable filterbanks, recurrent layers, non-causal processing — that embedded platforms don't widely support.

## Method

kiloVAD uses only standard Mel features and CNN-only layers with tunable context and spectral parameters, trained with per-layer structured pruning plus self-distillation and an angle-based quantization-aware training scheme that improves on standard QAT by 1-4%.

## Results

Evaluated per-frame under causal conditions, kiloVAD reaches 0.850 AUC on AVA-Speech using only about 2.1k parameters and 200 ms of context, a new state of the art for causal, deployment-ready VAD.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Always-on wake-word and voice-trigger systems on microcontrollers, hearables, and other extremely resource-constrained edge devices.

## Related

- (link related pages by id as the wiki grows)
