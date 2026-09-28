---
id: li26fa_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2437
---

# Language-Invariant Multilingual Speaker Verification for the TidyVoice 2026 Challenge

**TL;DR** — A language-adversarially trained speaker verification system built on w2v-BERT 2.0, augmented with synthetic multilingual speech, achieves competitive results in the TidyVoice 2026 multilingual speaker verification challenge.

## Problem

Multilingual speaker verification is hampered by limited cross-lingual training data and by speaker embeddings that inadvertently encode language identity alongside speaker identity.

## Method

The system fine-tunes the multilingual self-supervised w2v-BERT 2.0 backbone with Layer Adapters and Multi-scale Feature Aggregation, applies language-adversarial training via a Gradient Reversal Layer to promote language-invariant embeddings, and augments training data with a multilingual zero-shot TTS system to increase language diversity.

## Results

Fine-tuning the large pretrained backbone gives competitive performance, language-adversarial training further improves robustness, and synthetic speech augmentation provides additional gains under limited training data; source code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker verification for multilingual voice-biometric systems, particularly where labeled cross-lingual speaker data is scarce.

## Related

- (link related pages by id as the wiki grows)
