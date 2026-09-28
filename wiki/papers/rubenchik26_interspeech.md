---
id: rubenchik26_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1401
---

# Latent Flow Matching Based Speech Separation Using Speaker Diarization

**TL;DR** — Combining a speaker-diarization model's speaker representations with latent flow-matching generation, plus an adversarial guidance mechanism conditioned on mixture-derived speaker attractors, produces high-quality speech separation while training only a small generative U-Net.

## Problem

Discriminative DNN-based speech separation performs well, and generative models are emerging as strong perceptual-quality competitors, but combining the two — leveraging diarization-style speaker representations with a generative separator, while avoiding speaker confusion — remained an open design question.

## Method

The authors propose a framework combining a speaker diarization model's representational strength with latent-space Flow Matching's high-fidelity generation, training only the latent generative U-Net component, plus a novel Adversarial Speaker Guidance (ASG) mechanism that conditions on mixture-derived speaker attractors rather than traditional enrollment signals to mitigate speaker confusion.

## Results

The method achieves high-quality single-channel speech separation while requiring only the U-Net component to be trained, and the ASG mechanism improves intelligibility and reduces speaker confusion relative to using enrollment-based conditioning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

High-fidelity speech separation for meeting transcription, hearing aids, and other multi-speaker audio processing pipelines.

## Related

- (link related pages by id as the wiki grows)
