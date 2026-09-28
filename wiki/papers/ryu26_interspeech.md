---
id: ryu26_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1399
---

# Modality Importance is Not Static: Temporal Dynamics via Gating in Multimodal Emotion Recognition

**TL;DR** — Modeling how much each modality (text/speech/visual) matters as it changes moment-to-moment, via GRU-based emotion-query gating, beats static fusion by 9 points and outperforms Transformer fusion with fewer parameters.

## Problem

Multimodal emotion recognition is inherently dynamic since the relative importance of text, speech, and visual signals shifts over time, but most existing systems use static fusion that implicitly assumes time-invariant modality contribution.

## Method

The authors present a temporal fusion framework modeling modality importance as a time-varying, class-conditional distribution, using a GRU-based module with emotion-query gating to adapt modality weights across dialogue context.

## Results

Under 6-class IEMOCAP leave-one-speaker-out evaluation, temporal modeling improves over static fusion by +9.01 in mean(F1, UA), gating adds a further +1.63 over temporal modeling without gating, and the approach outperforms Transformer-based fusion with fewer parameters; perturbation-based occlusion analysis confirms modality importance is non-stationary over time.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More accurate, compact multimodal emotion recognition systems for dialogue and conversational AI that need to track shifting modality reliability over a conversation.

## Related

- (link related pages by id as the wiki grows)
