---
id: zhang26fa_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2485
---

# MPA-KWS: Multi-Modal Phoneme-Level Alignment for Streaming Open-Vocabulary Keyword Spotting

**TL;DR** — A streaming keyword-spotting method extends phoneme-level alignment beyond text-only enrollment to multimodal (audio+text) alignment, using CTC-based forced alignment and hard-negative mining to hit the best results on LibriPhrase.

## Problem

Phoneme-level alignment improves open-vocabulary keyword spotting on acoustically confusable words, but most existing methods are non-streaming, and the few streaming CTC-based alignment approaches are limited to text-only enrollment.

## Method

The authors propose a streaming multimodal open-vocabulary keyword spotting method based on phoneme-level alignment, achieving fine-grained modeling with training-inference consistency through a W-CTC forced alignment algorithm and multimodal phoneme-level contrastive learning, plus a CTC-beam-search-based data augmentation method that dynamically mines hard negative samples.

## Results

On the LibriPhrase dataset, the proposed method achieves the best results among compared approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, streaming open-vocabulary keyword/wake-word spotting for voice assistants that support both audio and text-based keyword enrollment.

## Related

- (link related pages by id as the wiki grows)
