---
id: huang26p_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3532
---

# EII-SCL: Harnessing Emotional Inertia for Multimodal Emotion Recognition in Conversation

**TL;DR** — Explicitly modeling 'emotional inertia' — the tendency for emotion to persist across nearby conversational turns — via a supervised contrastive module consistently improves multimodal emotion recognition without needing extra data.

## Problem

Multimodal emotion recognition in conversation (MERC) models complex contextual dependencies but often overlooks the effect of emotional inertia on emotion shifts, leading to suboptimal performance.

## Method

The authors propose EII-SCL, an Emotional Inertia-Informed Supervised Contrastive Learning module that constructs inertia-affected samples within temporal windows to inform the contrastive training objective, designed to plug into existing MERC models without extra data.

## Results

Extensive experiments on IEMOCAP and MELD show the approach consistently outperforms state-of-the-art MERC methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improves emotion tracking for conversational AI, call-center sentiment analysis, and dialogue systems that need to model how emotions carry over between turns.

## Related

- (link related pages by id as the wiki grows)
