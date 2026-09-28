---
id: tse26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2165
---

# AudioNoisePrints: Model-free audio watermarking using spatial correlation in flow matching TTS

**TL;DR** — A training-free watermarking method for flow-matching and diffusion TTS that exploits the natural correlation between the initial noise seed and the generated audio, needing no retraining and no quality loss.

## Problem

Watermarking flow-matching and diffusion TTS outputs typically requires retraining the model or accepting reduced generation quality.

## Method

AudioNoisePrints exploits the inherent correlation between the initial Gaussian noise and the generated output in diffusion/flow-matching models, using simple cosine correlation between the noise and output as a watermark, plus a lightweight trained detector for robustness against aggressive augmentation.

## Results

Outperforms AudioSeal, a strong baseline, under strong augmentations; tested on F5TTS and other TTS/vocoder models, all show similar spatial correlation properties, suggesting broad applicability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Provenance tracking and misuse detection for AI-generated speech from flow-matching and diffusion TTS systems.

## Related

- (link related pages by id as the wiki grows)
