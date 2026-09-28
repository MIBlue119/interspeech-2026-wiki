---
id: luo26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2577
---

# Visually-Guided Spatial Audio Generation for 360° In-the-Wild Speech Scenes

**TL;DR** — A new YouTube-derived dataset and a two-stage video-conditioned model reconstruct full spatial (Ambisonics) audio for 360° videos from just the omnidirectional soundtrack and the video itself.

## Problem

Spatial audio is essential for immersive 360° media, but high-quality spatial capture is rare in real-world, speech-dominant scenes, so most in-the-wild 360° video only has an omnidirectional (non-directional) audio track.

## Method

The authors study visually guided First-Order Ambisonics (FOA) speech spatialization: given aligned 360° video and an omnidirectional audio track, recover the missing directional FOA components, introducing YT-SPEECH, a speech-oriented 360° video-FOA dataset from YouTube, and a two-stage Localizer-Renderer framework where an audio-visual segmentation backbone provides frame-wise spatial heatmaps and a conditional complex-domain U-Net reconstructs the directional signals, stabilized by confidence-based gating under ambiguous conditions.

## Results

Experiments show improved reconstruction fidelity, spatial accuracy, and perceptual speech quality compared to ablated variants and prior approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Retrofitting spatial audio onto existing mono/omnidirectional 360° video content for VR/AR and immersive media platforms.

## Related

- (link related pages by id as the wiki grows)
