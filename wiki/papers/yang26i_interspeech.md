---
id: yang26i_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1524
---

# A Dynamic Knowledge Distillation Framework for Mitigating Spatial Ambiguity in Lightweight Dual-Channel Speech Enhancement

**TL;DR** — A dynamic distillation framework teaches lightweight dual-channel speech enhancement models to adaptively regulate reliance on spatial cues, fixing their weakness with closely-spaced sound sources at no extra inference cost.

## Problem

Lightweight dual-channel speech enhancement models exploit spatial cues to beat single-channel models on edge devices, but their performance degrades for closely-spaced sources because of unconstrained spatial reliance.

## Method

D-SKD (Dynamic Spatial-aware Knowledge Distillation) introduces a dynamic arbitration mechanism into the distillation process, using a spatially invariant single-channel teacher so the dual-channel model can adaptively regulate its spatial reliance without explicit angular supervision.

## Results

On dual-channel GTCRN and other models, D-SKD consistently improves performance for closely-spaced sound sources while preserving quality elsewhere, with no additional inference overhead or auxiliary inputs required.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight multi-microphone speech enhancement for edge devices (hearables, smart speakers) that must handle closely-spaced competing speakers.

## Related

- (link related pages by id as the wiki grows)
