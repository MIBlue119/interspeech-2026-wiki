---
id: shen26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1255
---

# LaS-LCA: Layer-Selected Latent Cross-Attention Adapters and Margin-Mixup for Robust Cross-Lingual Speaker Verification

**TL;DR** — LaS-LCA adapts frozen large pretrained speaker models to be robust across languages by selecting and fusing the right backbone layers through a latent cross-attention adapter, plus a margin-mixup training trick to fight overfitting on limited cross-lingual data.

## Problem

Cross-lingual speaker verification suffers significant performance degradation from language mismatch, and stably isolating speaker traits from linguistic variation across diverse languages remains difficult.

## Method

LaS-LCA strategically selects backbone layers to isolate speaker traits from linguistic noise, uses a shared latent cross-attention and convolutional module inside the adapter to distill multi-layer features into a consistent, language-independent latent space, and adds an embedding-level margin-mixup strategy during training to reduce overfitting on limited cross-lingual data.

## Results

On the TidyVoiceX benchmark, LaS-LCA reaches an EER of 1.40%, significantly outperforming baseline models and showing superior robustness across diverse linguistic conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multilingual speaker verification for voice biometrics and authentication systems deployed across language communities.

## Related

- (link related pages by id as the wiki grows)
