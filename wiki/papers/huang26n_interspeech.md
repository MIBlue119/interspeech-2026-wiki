---
id: huang26n_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1996
---

# EmoEUS: Uncertainty Supervision for Multimodal Emotion Recognition in Conversation

**TL;DR** — A multimodal emotion-recognition-in-conversation model that explicitly supervises per-utterance uncertainty so it can dynamically down-weight noisy or conflicting modalities, beating prior fusion methods.

## Problem

Multimodal emotion recognition in conversation typically fuses modalities without accounting for utterance-specific uncertainty caused by conflicting cues, varying noise, or missing modality signals.

## Method

EmoEUS performs uncertainty-aware fusion by dynamically weighting modalities using learned variance estimates, and adds an explicit supervised loss that aligns each utterance's predicted variance with its distance from the emotion- and modality-specific cluster center.

## Results

On IEMOCAP and MELD, EmoEUS consistently outperforms state-of-the-art multimodal emotion-recognition-in-conversation methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Conversational AI and call-center analytics systems that need robust emotion tracking despite noisy or partially missing audio/video/text signals.

## Related

- (link related pages by id as the wiki grows)
