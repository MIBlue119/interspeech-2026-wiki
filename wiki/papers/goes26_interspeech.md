---
id: goes26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2277
---

# PhonemeCVAE: Contrastive Latent Clustering with Class-Conditioned Priors for Controllable Phoneme Interpolation

**TL;DR** — PhonemeCVAE learns a structured, phoneme-conditioned latent space that lets a TTS-oriented model smoothly interpolate between phoneme classes for controllable pronunciation editing.

## Problem

High-quality TTS pronunciation control depends on structured, disentangled phoneme representations, but standard variational autoencoders don't naturally produce compact, well-separated phoneme clusters.

## Method

PhonemeCVAE introduces class-conditioned Gaussian priors for each phoneme plus a contrastive objective that pulls same-phoneme representations together and pushes different phonemes apart, producing a continuous latent space that supports smooth interpolation at inference time.

## Results

The contrastive regularization and phoneme-conditioned priors together produce a structured latent topology that generalizes across English speech datasets, supporting consistent phoneme interpolation without hurting synthesis quality.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Pronunciation-controllable TTS systems and tools for phonetic and articulation research that need smooth, class-aware manipulation of synthesized speech.

## Related

- (link related pages by id as the wiki grows)
