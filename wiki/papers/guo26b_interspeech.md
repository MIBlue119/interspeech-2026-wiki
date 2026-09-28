---
id: guo26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1097
---

# COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation

**TL;DR** — A contextual-biasing framework for speech-augmented language models that scores how well audio segments match candidate rare-word entities, improving multi-entity ASR biasing at scale.

## Problem

Speech-augmented language models have limited context windows, so identifying which entities from a large biasing list are actually relevant is crucial, and prior methods can collapse in training when multiple rare words co-occur in an utterance.

## Method

COALA maps SLM latent representations into a discriminative space that quantifies the matching intensity between audio segments and candidate entities, specifically addressing the training collapse seen with multi-target utterances.

## Results

Consistently achieves superior contextual biasing performance on the LibriSpeech benchmark across a range of biasing-list scales.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

ASR systems needing accurate recognition of domain-specific names and entities at large biasing-list scale, such as contacts or product catalogs.

## Related

- (link related pages by id as the wiki grows)
