---
id: chung26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2770
---

# Robust Audio-Visual Emotion Recognition via Conditional Transformer U-Nets with Frequency-Injected Visual Stream

**TL;DR** — A dual convolutional-transformer U-Net architecture improves emotion recognition robustness in noisy, reverberant audio-visual conditions.

## Problem

Audio-visual emotion recognition (AVER) systems tend to degrade in noisy and reverberant real-world environments.

## Method

The proposed dual CTr-U-Net uses separate convolutional-transformer encoders to learn compact, modality-specific bottleneck features for audio and video, fused by an emotion decoder, with emotion-conditioned auxiliary decoders adding extra reconstruction supervision; the audio branch adds an inverse-filtering front-end and the visual branch frequency-injected spatial-spectral modeling of facial dynamics.

## Results

Improves robustness and accuracy relative to existing unimodal and multimodal AVER baselines under noise and reverberation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emotion-aware voice/video interfaces (e.g., call centers, in-car assistants) that must operate reliably in acoustically and visually degraded real-world settings.

## Related

- (link related pages by id as the wiki grows)
