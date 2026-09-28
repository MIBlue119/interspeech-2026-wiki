---
id: lemerle26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2863
---

# Low-Framerate Speech Tokenization via Two-Stage Latent Patch Modeling

**TL;DR** — Z-CODEC is a two-stage neural speech codec that reaches state-of-the-art low-bitrate, low-framerate reconstruction quality while being trainable on a single consumer GPU.

## Problem

Low-framerate, semantically rich speech tokenizers are valuable for downstream generative modeling like TTS, but achieving high perceptual quality at low bitrate and framerate usually needs expensive joint compression, adversarial training, and semantic supervision all at once.

## Method

Z-CODEC first trains a high-framerate variational autoencoder with adversarial objectives to capture fine acoustic detail, then in a second stage compresses within that latent space using flow matching with added semantic supervision, separating the expensive adversarial training from the final low-framerate compression step.

## Results

Z-CODEC achieves state-of-the-art reconstruction quality for both low-bitrate discrete tokenizers and continuous settings, matching or beating strong baselines, while its staged design makes training tractable on a single RTX 4070 GPU.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-cost, reproducible research and development of speech tokenizers for TTS and other generative speech systems, especially for teams without large-scale GPU clusters.

## Related

- (link related pages by id as the wiki grows)
