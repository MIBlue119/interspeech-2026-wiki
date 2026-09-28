---
id: liang26b_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-531
---

# FoleyImmersive: Decoupling What and Where for Video-to-First-Order Ambisonics

**TL;DR** — FoleyImmersive generates spatial (first-order ambisonics) audio from a silent video by separating the "what" (semantic sound content) from the "where" (spatial placement) into two stages, avoiding the blur that end-to-end models introduce between content and geometry.

## Problem

Generating immersive spatial audio directly from video is hindered by sparse semantic annotation in video-to-spatial-audio datasets, and by content-geometry entanglement, where end-to-end models blur what a sound is with where it comes from, while two-stage pipelines trade off semantic fidelity for spatial coherence.

## Method

The authors build YT-AmbiSem, a semantics-augmented dataset created by adding structured descriptions from Qwen2.5-VL-7B, then train a two-stage model: Stage 1 uses a semantics-first diffusion model with multi-rate cross-frame attention to generate mono content (WHAT), and Stage 2 spatializes it into XYZ ambisonic channels via a complex-STFT U-Net conditioned on per-frame visuals and camera direction, with a lightweight directional residual mixer for stable localization.

## Results

FoleyImmersive achieves state-of-the-art semantic and spatial metrics for video-to-ambisonics generation; demo and dataset are made available.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic spatial audio generation for immersive video, VR/AR content, and 360-degree video production from silent footage.

## Related

- (link related pages by id as the wiki grows)
