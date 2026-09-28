---
id: xu26c_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-702
---

# HRIR-Former: Grid-Free Time-Domain Reconstruction of Head-Related Impulse Responses with a Spatially Encoded Transformer

**TL;DR** — A time-domain, grid-free transformer that reconstructs a listener's personalized head-related impulse responses at any direction from just a few sparse measurements, improving on prior frequency-domain, fixed-grid methods.

## Problem

Individualized head-related impulse responses enable realistic binaural audio rendering but require costly dense per-listener measurements, and prior spatial up-sampling methods work in the frequency domain with minimum-phase assumptions and fixed direction grids, which can hurt temporal fidelity and spatial continuity.

## Method

HRIR-Former operates directly in the time domain at arbitrary (grid-free) directions using sinusoidal spatial features, a Conv1D refinement module, and auxiliary heads predicting interaural time and level differences, reconstructing HRIRs from a listener's sparse measured set.

## Results

On the SONICOM dataset, HRIR-Former improves normalized mean squared error, cosine distance, and ITD/ILD errors over prior methods, and ablations show minimum-phase preprocessing (used by prior methods) is actually unnecessary.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Personalized binaural audio rendering for headphones and VR/AR from only a handful of individualized HRIR measurements.

## Related

- (link related pages by id as the wiki grows)
