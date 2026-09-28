---
id: gao26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-64
---

# NoiseLoRA-SV: Hierarchical Noise-Conditioned Adaptation with Embedding Distillation for Robust Speaker Verification

**TL;DR** — Generating LoRA adapter weights on-the-fly from a noise embedding, instead of using static parameters, gives speaker verification lower error rates under non-stationary noise.

## Problem

Speaker verification (SV) models, including LoRA-adapted variants, rely on static inference-time parameters and show limited robustness to non-stationary noise.

## Method

NoiseLoRA-SV injects noise-conditioned LoRA modules into a lightly fine-tuned backbone: a convolutional recurrent network extracts hierarchical noise representations, where global embeddings drive a hypernetwork that generates LoRA matrices on-the-fly and local embeddings control a frame-level time-varying gate, trained with InfoNCE-based contrastive distillation to align noisy embeddings with clean speaker representations.

## Results

On VoxCeleb1 with MUSAN and unseen NonSpeech100 noise, NoiseLoRA-SV consistently achieves lower equal error rates than static baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust voice authentication and speaker verification in noisy, real-world settings such as mobile devices or call centers.

## Related

- (link related pages by id as the wiki grows)
