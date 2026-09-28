---
id: silverman26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-641
---

# Learning Self-Supervised Spatial Representations via Soft Acoustic Contrastive Alignment

**TL;DR** — A new self-supervised loss that aligns binaural audio embeddings by shared spatial acoustic properties (directionality, diffuseness) without any labels consistently improves downstream spatial parameter estimation like direction-of-arrival and reverberation.

## Problem

Most audio self-supervised learning works on single-channel input and learns spectral representations that are often insufficient for spatially sensitive tasks like direction-of-arrival or reverberation estimation.

## Method

The authors propose a self-supervised framework for binaural audio that integrates spatial priors directly into pretraining, introducing the Soft Acoustic Contrastive (SAC) loss, a geometric objective that structures the latent space by aligning embeddings based on shared acoustic properties such as directionality and diffuseness without ground-truth labels.

## Results

The method consistently outperforms baselines across five downstream spatial parameter estimation tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Pretraining backbones for spatial audio applications such as sound source localization, binaural hearing devices, and spatial audio understanding.

## Related

- (link related pages by id as the wiki grows)
