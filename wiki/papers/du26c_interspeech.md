---
id: du26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3003
---

# Orthogonal Feature Projection and Manifold-Constrained Neural PLDA for the TidyVoice2026 Cross-Lingual Speaker Verification Challenge

**TL;DR** — The winning TidyVoice2026 challenge system decouples language-specific features from speaker embeddings via orthogonal projection and pairs them with a manifold-constrained neural PLDA back-end, achieving first place among 42 teams.

## Problem

Cross-lingual speaker verification systems tend to over-rely on language-specific features extracted by self-supervised front-ends, hurting robustness across languages.

## Method

The Fosafer team's system uses orthogonal feature projection to decouple redundant self-supervised features and integrate language-agnostic components into speaker embeddings, paired with a manifold-constrained neural PLDA back-end trained with a dynamic hard-sample-mining strategy for multilingual data.

## Results

The final fused system achieved equal error rates of 1.39% and 1.95% on the two TidyVoice2026 test tracks, ranking 1st among 42 participating teams.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Directly applicable to cross-lingual voice biometric and authentication systems that must generalize speaker verification across many languages.

## Related

- (link related pages by id as the wiki grows)
