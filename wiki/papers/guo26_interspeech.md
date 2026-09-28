---
id: guo26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1022
---

# GLAD: Global-Local Aware Dynamic Mixture-of-Experts for Multi-Talker ASR

**TL;DR** — GLAD is the first global-local fusion Mixture-of-Experts routing scheme for multi-talker ASR, outperforming Serialized Output Training baselines on overlapping speech.

## Problem

End-to-end multi-talker ASR struggles to accurately transcribe overlapping speech because speaker-specific acoustic characteristics — essential for telling speakers apart — tend to get diluted as they pass through deep network layers.

## Method

GLAD (Global-Local Aware Dynamic Mixture-of-Experts) introduces a routing mechanism that dynamically fuses speaker-aware global context with fine-grained local acoustic detail to adaptively select experts, applying a global-local fusion MoE strategy to multi-talker ASR for the first time.

## Results

On LibriSpeechMix and CH109, GLAD significantly outperforms existing Serialized Output Training (SOT)-based multi-talker ASR approaches, with especially strong robustness in challenging, high-overlap scenarios.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Meeting and multi-speaker transcription systems that need to robustly separate and transcribe heavily overlapping speech.

## Related

- (link related pages by id as the wiki grows)
