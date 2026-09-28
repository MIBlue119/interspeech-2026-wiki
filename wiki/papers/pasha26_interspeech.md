---
id: pasha26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-31
---

# A Novel Transfer Learning Approach for Room Impulse Response Estimation and Speech Dereverberation Across Geometrically Diverse and Data-Scarce Environments

**TL;DR** — A transfer learning approach with a frozen geometry-aware encoder and physics-informed decoder adapts room impulse response models trained on data-rich rectangular rooms to irregular, data-scarce room geometries with only 10 training rooms, cutting error substantially and improving downstream dereverberation quality.

## Problem

Accurate room impulse response (RIR) estimation is critical for audio reproduction, echo cancellation, and dereverberation, but traditional methods are computationally expensive and generalize poorly across room shapes and materials.

## Method

The authors propose a transfer learning framework with a geometry-aware encoder extracting shape-invariant features and a physics-informed decoder enforcing echo sparsity and energy decay, freezing the encoder during fine-tuning and updating only the decoder to adapt from data-rich rectangular rooms to L-shaped and irregular geometries.

## Results

The method achieves 56% lower MSE and 37% lower LSD on unseen target geometries with merely 10 training rooms, and downstream speech dereverberation shows PESQ of 3.24 vs. 2.78 and STOI of 0.89 vs. 0.79 compared to GAN baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for acoustic echo cancellation and dereverberation products that must be deployed in diverse, non-rectangular room shapes without collecting extensive per-room training data.

## Related

- (link related pages by id as the wiki grows)
