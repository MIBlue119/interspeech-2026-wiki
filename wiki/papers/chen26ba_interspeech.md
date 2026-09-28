---
id: chen26ba_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2506
---

# Probing Spatial Structure in Pretrained Audio Representations

**TL;DR** — The SARL benchmark probes what pretrained spatial audio encoders actually know about sound source position and room acoustics, finding that source properties (like azimuth) decode far more easily than room properties (like reverberation).

## Problem

Pretrained spatial audio encoders are increasingly used as general-purpose representations for perceptual tasks, but how well they actually capture spatial information — source location vs. room characteristics — is poorly understood.

## Method

The Spatial Audio Representation Learning (SARL) benchmark systematically probes source-level factors (azimuth, elevation, distance, sound class) and room-level factors (RT60, volume, shape) across a range of pretrained audio encoders, including sensitivity analysis under controlled perturbations.

## Results

Input configuration and training paradigm shape how well spatial information is encoded; source-level factors are consistently easier to decode than room-level factors; and different encoders respond heterogeneously to source vs. room perturbations, revealing systematic biases in current pretrained audio representations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and selecting pretrained audio encoders for spatial audio tasks such as sound source localization, room acoustic estimation, and immersive audio applications.

## Related

- (link related pages by id as the wiki grows)
