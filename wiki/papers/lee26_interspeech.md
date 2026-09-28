---
id: lee26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-80
---

# AdaLTM: Adaptive Layer-wise Task Vector Merging for Categorical Speech Emotion Recognition with ASR Knowledge Integration

**TL;DR** — Merging separately fine-tuned ASR and SER "task vectors" into a frozen WavLM backbone with learnable per-layer coefficients lets speech emotion recognition benefit from linguistic context without the usual multi-task optimization conflicts.

## Problem

Adding ASR into speech emotion recognition (SER) provides useful linguistic context, but conventional feature fusion hits performance bottlenecks and multi-task joint training often suffers from optimization conflicts between the two objectives.

## Method

The authors propose Adaptive Layer-wise Task Vector Merging (AdaLTM), built on WavLM-Large: instead of joint optimization, they extract task vectors from separately fine-tuned in-domain ASR and SER models and integrate them into a frozen base model using layer-wise learnable coefficients, enabling depth-aware balancing of linguistic and paralinguistic knowledge without gradient interference.

## Results

On MSP-Podcast, AdaLTM effectively mitigates the conflict between ASR and SER objectives seen with conventional joint training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building SER systems that use ASR/linguistic knowledge without costly joint retraining, for call-center analytics or conversational AI emotion tracking.

## Related

- (link related pages by id as the wiki grows)
