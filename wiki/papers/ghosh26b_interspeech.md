---
id: ghosh26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-518
---

# LipAdapter: Text-to-Video Alignment is All You Need for Lip-to-Speech

**TL;DR** — Adapting a frozen pretrained TTS model with a lightweight text-to-video alignment module gives state-of-the-art lip-to-speech synthesis using 15x less training data than prior end-to-end methods.

## Problem

Lip-to-speech synthesis aims to generate intelligible, natural, temporally synchronized speech from silent video, but existing end-to-end models need large amounts of training data and generalize poorly outside their training distribution.

## Method

LipAdapter is a modular framework that adapts a frozen pretrained Text-to-Speech model into a lip-synchronized speech generator, bridging frozen Visual Speech Recognition and TTS models by aligning phoneme representations with lip embeddings via a novel text-to-video alignment module.

## Results

Achieves state-of-the-art performance on multiple English benchmarks with 15x less training data than prior methods, and shows zero-shot multilingual lip-to-speech capability in French, German, Spanish, and Portuguese.

## Code

Code and demo released by the authors: https://lipadapter.github.io/

## Applications

Silent-video speech reconstruction for accessibility (e.g., dubbing, video calls in noisy environments) and multilingual lip-reading-based voice generation with limited per-language training data.

## Related

- (link related pages by id as the wiki grows)
