---
id: he26f_interspeech
category: on-device
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1766
---

# Task-Aware Joint Pruning and Distillation for Efficient Audio Deepfake Detection

**TL;DR** — A pruning-plus-distillation method tailored to keep forgery-relevant structure shrinks a 300M+ parameter deepfake detector to 32M parameters with only a 1.3% average accuracy drop.

## Problem

Self-supervised-learning-based audio deepfake detectors achieve state-of-the-art performance but their 300M+ parameter size prevents deployment on resource-constrained devices, and generic compression methods designed for content-centric tasks struggle to preserve forgery-discriminative performance.

## Method

The authors propose a Task-Aware Joint Pruning and Distillation framework that combines cross-domain knowledge distillation with movement-guided structured pruning to transfer forgery-discriminative knowledge and preserve critical structure under aggressive compression.

## Results

The framework reduces the model to 31.9M parameters with a 6.3x FLOPs reduction, with an average performance drop of only 1.30% across multiple datasets compared to the uncompressed baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device or edge deployment of audio deepfake and voice-spoofing detectors, e.g. on phones or in call-authentication systems.

## Related

- (link related pages by id as the wiki grows)
