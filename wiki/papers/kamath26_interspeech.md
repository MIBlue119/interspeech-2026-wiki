---
id: kamath26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-252
---

# Sensitivity Analysis of Generative Spatial Audio Metrics: A Study on Responsiveness, Smoothness, and Symmetry

**TL;DR** — Defines three desiderata (responsiveness, smoothness, symmetry) for evaluating spatial-audio quality metrics and finds that Fréchet-Audio-Distance-style and acoustic-map metrics satisfy them better than intensity vectors as spatial scenes get more complex.

## Problem

It is unclear how well common evaluation metrics for generative First-Order Ambisonics spatial audio actually track meaningful changes in spatial parameters like azimuth and elevation.

## Method

The authors build a sensitivity-analysis framework that varies spatial parameters continuously over controlled FOA scenes of increasing complexity, and assess distribution-based and sample-based metrics (including Fréchet Audio Distance, intensity vectors, and acoustic maps) against the responsiveness, smoothness, and symmetry desiderata.

## Results

Localization-specific FAD embeddings and acoustic maps show high responsiveness with robust smoothness and symmetry across conditions, while intensity-vector-based metrics degrade as scene complexity increases.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides metric selection and design for evaluating generative spatial-audio systems used in immersive audio, VR/AR, and ambisonic content generation.

## Related

- (link related pages by id as the wiki grows)
