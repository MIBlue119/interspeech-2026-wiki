---
id: li26ca_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1965
---

# Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models

**TL;DR** — Selecting high-confidence pseudo-labels via multi-layer clustering agreement and adding DINO-style self-distillation for unlabeled samples lets a self-supervised speaker verification system trained on pre-trained models match current state-of-the-art performance.

## Problem

Self-supervised speaker verification (SS-SV) needs reliable pseudo-labels without ground-truth speaker identity, but noisy clustering-derived labels can hurt training.

## Method

The authors select the top-K most speaker-discriminative Transformer layers from pre-trained models, cluster their representations separately to generate multiple pseudo-label sets, and retain only samples with consistent clustering as high-confidence labeled data (label alignment); for the remaining unlabeled data, an EMA teacher provides DINO-style soft distillation targets with a consistency loss, all trained jointly with label-noise correction loss.

## Results

On VoxCeleb, the SS-SV method achieves performance comparable to current state-of-the-art speaker verification approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reduces reliance on costly labeled speaker data for building speaker verification systems, useful where labeled voice data is scarce or privacy-restricted.

## Related

- (link related pages by id as the wiki grows)
