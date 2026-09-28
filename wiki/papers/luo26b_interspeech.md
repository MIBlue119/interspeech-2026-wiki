---
id: luo26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2577
pdf: https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.pdf
---

# Visually-Guided Spatial Audio Generation for 360° In-the-Wild Speech Scenes

[PDF](https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2577)

**TL;DR** — The paper introduces a two-stage localizer-renderer framework for visually guided First-Order Ambisonics speech spatialization from 360-degree video, alongside a curated 8.9-hour dataset called YT-SPEECH.

## Problem

Real-world speech-dominant 360-degree video lacks paired spatial audio datasets in First-Order Ambisonics (FOA) format, forcing reliance on simulated data or limited binaural recordings. Existing video-to-spatial-audio methods either depend on unconstrained self-supervised decomposition that introduces reconstruction artifacts or use direct binaural rendering that is restricted by listener orientation. This limits the development of accurate, visually grounded spatial audio reconstruction for immersive telepresence and virtual reality.

## Method

The paper proposes a two-stage Localizer-Renderer framework that takes an equirectangular 360-degree video and an omnidirectional audio track to synthesize missing directional FOA components (Y, Z, X). The Localizer uses an audio-visual segmentation backbone with a fine-tuned spatial prior head to generate dense horizontal wrap-around spatial heatmaps using circular padding. The Renderer employs a complex-domain U-Net that conditions intermediate decoder features via gated Feature-wise Linear Modulation (FiLM), using a confidence-gated mechanism derived from the spatial prior's entropy and peak concentration. The model is first pretrained on Sphere360 and then fine-tuned on YT-SPEECH using a combination of multi-resolution STFT loss, magnitude consistency loss, and waveform L2 loss.

## Results

Evaluated on the 8.9-hour YT-SPEECH dataset consisting of 5-second 24 kHz clips, the proposed method is benchmarked against ablated variants and SpatialAudioGen (SAG). The full model achieves superior reconstruction fidelity with an l2 loss of 1.15 x 10^-3, improved spatial accuracy with a mean angular error (delta ang) of 2.41 degrees, and enhanced perceptual speech quality yielding a PESQ of 3.42. Subjective evaluations demonstrate higher mean opinion scores for both overall audio quality (MOS-Q) and perceived spatial accuracy (MOS-P) compared to analytic DOA rendering baselines and unconditioned variants.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building immersive media, virtual reality platforms, and telepresence systems can use this framework to generate spatially coherent First-Order Ambisonics speech tracks from standard 360-degree video feeds.

## Limitations

The spatial prior confidence gating mechanism can become ambiguous under highly diffuse or visually uncertain acoustic conditions.

## Related

- (link related pages by id as the wiki grows)
