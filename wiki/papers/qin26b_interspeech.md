---
id: qin26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1778
---

# Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection

**TL;DR** — DADG-MoE adds a dual-gating mechanism (Sinc-layer filters on raw waveforms plus SSL representations) and domain prototypes to route lightweight affine experts, cutting equal error rate by up to 40.8% relative on challenging out-of-dataset deepfake benchmarks.

## Problem

Mixture-of-Experts (MoE) speech deepfake detectors improve generalization, but existing gating networks often overlook acoustic and temporal cues specific to deepfakes, limiting robustness to unseen attack types and acoustic conditions.

## Method

DADG-MoE (Domain-Adaptive Dual-Gating MoE) uses a dual-gating mechanism leveraging Sinc-layer-based filters to process both low-level raw waveforms and high-level SSL speech representations, incorporating domain prototypes to guide expert routing based on implicit deepfake patterns, with lightweight affine experts processing routed inputs.

## Results

DADG-MoE significantly outperforms the baseline, achieving up to a 40.8% relative equal error rate reduction on challenging out-of-dataset benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to speech deepfake detection systems that must generalize to novel, previously unseen synthesis attacks in production.

## Related

- (link related pages by id as the wiki grows)
