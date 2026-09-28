---
id: huang26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-366
---

# GISNO: Neural Operator-based HRTF Personalization from 3D Meshes via Differentiable Helmholtz Rendering

**TL;DR** — GISNO reframes HRTF prediction as a continuous, discretization-invariant operator-learning problem using a differentiable Helmholtz-integral renderer, outperforming baselines and generalizing zero-shot to unseen spatial densities, distances, and frequencies.

## Problem

Individualized head-related transfer functions (HRTFs) are essential for immersive audio but hard to acquire, and existing deep-learning approaches are constrained by fixed discrete sampling grids and lose fine morphological detail during mesh preprocessing.

## Method

GISNO integrates a discretization-invariant neural operator with a differentiable Helmholtz-integral renderer to map 3D head geometry directly to continuous boundary pressure fields, avoiding fixed-grid discretization.

## Results

On the HUTUBS dataset, GISNO outperforms representative baselines in log-spectral distortion, and the physics-integrated architecture enables multi-dimensional zero-shot generalization across unseen spatial densities, distances, and frequencies.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Enables scalable, personalized HRTF generation for immersive/spatial audio products (VR/AR headsets, 3D audio rendering) without dense individual measurement.

## Related

- (link related pages by id as the wiki grows)
