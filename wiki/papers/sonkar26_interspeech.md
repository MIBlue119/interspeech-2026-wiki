---
id: sonkar26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3023
---

# Tongue2Speech: Real-Time Speech Synthesis from Tongue Ultrasound Videos via Spatiotemporal Transformers

**TL;DR** — A lightweight spatiotemporal-transformer model that synthesizes intelligible speech directly from tongue ultrasound video, a step toward practical silent speech synthesis.

## Problem

Ultrasound-to-Speech aims to synthesize intelligible speech from tongue ultrasound video, but prior approaches rely on purely convolutional or recurrent architectures and are typically evaluated with spectral distortion metrics that are weak indicators of actual lexical accuracy.

## Method

Combines explicit 3D spatiotemporal encoding of the tongue ultrasound video with a multi-layer Transformer to model long-range articulatory dynamics, and evaluates using word error rate rather than spectral distortion alone.

## Results

On the English TaL corpus, achieves 15.93% WER in single-speaker and 31.64% WER in multi-speaker settings, outperforming six strong baselines, with speaker-specific fine-tuning further improving intelligibility for unseen users.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Silent speech interfaces for people who cannot vocalize, and communication in noise-restricted or silence-required environments.

## Related

- (link related pages by id as the wiki grows)
