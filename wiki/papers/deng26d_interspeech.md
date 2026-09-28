---
id: deng26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2212
---

# Joint Learning of Covariance Estimation and White Noise Gain for Robust MVDR Beamforming

**TL;DR** — A neural network that jointly predicts both a noise mask and a frequency-dependent white-noise-gain threshold makes MVDR beamforming adapt automatically to changing microphone and array conditions.

## Problem

MVDR beamforming performs strong noise suppression while preserving the target signal, but is sensitive to microphone self-noise and array mismatches, and existing fixes rely on fixed, manually tuned white-noise-gain (WNG) thresholds or diagonal loading that don't adapt to unknown or time-varying conditions.

## Method

The authors propose a data-driven MVDR framework where a deep neural network jointly predicts a time-frequency noise mask for covariance estimation and a frequency-dependent WNG threshold, integrated into a differentiable robust MVDR layer that is trained end-to-end.

## Results

Experiments show consistent improvements in speech quality and intelligibility over conventional fixed-WNG MVDR beamforming methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multichannel speech enhancement for microphone arrays in smart speakers, conferencing systems, and hearing devices.

## Related

- (link related pages by id as the wiki grows)
