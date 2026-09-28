---
id: cheng26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-158
---

# Diffusion Reconstruction towards Generalizable Audio Deepfake Detection

**TL;DR** — An audio deepfake detector trained on diffusion-reconstructed "hard" fake samples so it generalizes better to attack types it has never seen.

## Problem

Audio deepfake detectors struggle to generalize to unseen synthesis and generation methods as generative models continue to evolve rapidly.

## Method

Generates hard training samples via diffusion-based reconstruction, identified as the best of several tested reconstruction paradigms, then trains with multi-layer feature aggregation and a Regularization-Assisted Contrastive Learning (RACL) objective.

## Results

The approach achieves a significant reduction in average Equal Error Rate compared to the baseline, demonstrating superior generalization to unseen attacks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Anti-spoofing modules for voice authentication and platforms combating synthetic-voice misinformation.

## Related

- (link related pages by id as the wiki grows)
