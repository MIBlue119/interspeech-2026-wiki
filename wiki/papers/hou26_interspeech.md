---
id: hou26_interspeech
category: keyword-spotting
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1577
---

# UGPCB: Uncertainty-Gated Phonetic Contextual Biasing for Improving Hotword Recognition in Large Speech Models

**TL;DR** — A training-free, decode-time method that reduces both over-biasing and homophone confusion in hotword recognition by gating contextual biasing on model uncertainty.

## Problem

Contextual biasing improves ASR hotword recognition, but existing methods still face over-biasing and homophone misclassification even after speech-matching techniques resolve subword fragmentation.

## Method

UGPCB is a training-free decode-time framework using an entropy-driven gating mechanism plus bimodal contrastive penalties, evaluated on the Dolphin base model.

## Results

Improves recall by 16.04% (reaching 90.81% F1) while restricting precision loss to 0.78%, and still gains 14.26% recall even with 1,000 distractor hotwords introduced.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and dictation systems needing reliable recognition of user-specific names or hotwords without retraining.

## Related

- (link related pages by id as the wiki grows)
