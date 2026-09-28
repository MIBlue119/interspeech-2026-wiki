---
id: lay26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2582
---

# A Fast Solver for Interpolating Stochastic Differential Equation Diffusion Models for Speech Restoration

**TL;DR** — A fast sampler for the class of diffusion models (like SGMSE+) that interpolate toward a noisy observation rather than pure Gaussian noise, cutting speech-restoration inference down to as few as 10 network evaluations.

## Problem

Diffusion models for speech restoration such as SGMSE+ interpolate between the target distribution and a noisy observation rather than a standard Gaussian, so fast samplers built for standard diffusion probabilistic models don't directly apply, leaving reverse-process sampling slow.

## Method

Formalizes a class of interpolating Stochastic Differential Equations (iSDEs) that includes SGMSE+, and proposes a dedicated fast solver for this class.

## Results

The proposed solver enables fast sampling with as few as 10 neural network evaluations across multiple speech restoration tasks, without the many evaluations diffusion models normally require.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency deployment of diffusion-based speech enhancement/restoration systems where inference speed is a bottleneck.

## Related

- (link related pages by id as the wiki grows)
