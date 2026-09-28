---
id: tipaksorn26_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1960
pdf: https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.pdf
---

# AV-FlowSep: Audio-Visual Target Speaker Separation via Flow Matching

[PDF](https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tipaksorn26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1960)

**TL;DR** — AV-FlowSep is an audio-visual target speaker separation system using conditional flow matching and a Diffusion Transformer that achieves high-quality separation in a single inference step.

## Problem

Deterministic audio-visual speech separation methods often produce over-smoothed spectrograms that lose fine-grained details, while existing generative diffusion approaches require costly multi-step iterative refinement and can introduce artifacts. These limitations hinder practical real-time deployment and robust perceptual quality under noisy or multi-talker conditions.

## Method

The architecture combines a TalkNet-based visual temporal encoder extracting target lip and facial features, a Diffusion Transformer (DiT-S with 12 layers, 6 attention heads, 384 hidden dimensions) predicting vector fields, and a Vocos vocoder for waveform reconstruction. Operating in the 100-dimensional log mel-spectrogram domain, it employs conditional flow matching with optimal transport paths straight from mixture to clean spectrograms, integrating visual cues via cross-attention and timesteps via adaptive layer normalization. It trains using the Adam optimizer with a 1e-4 learning rate and EMA decay of 0.999 over 1,000 epochs on a batch size of 8, and uses the Euler method with 1 or 5 steps during inference.

## Results

Evaluated on VoxCeleb2-2Mix and LRS2-2Mix datasets for speech-speech and speech-noise scenarios against baselines like SepFormer, VisualVoice, AV-MossFormer2, and AVDiffuSS. AV-FlowSep achieves competitive in-domain PESQ and superior speech-noise DNSMOS performance while matching or outperforming multi-step diffusion baselines like AVDiffuSS using only 1 to 5 ODE solver steps. It also demonstrates strong zero-shot cross-dataset generalization from VoxCeleb2 to LRS2 and more balanced separation between dominant and weaker speakers across gender conditions.

## Code

- https://github.com/CAI-NECTEC/AV-FlowSep

## Applications

Engineers building robust on-device or real-time communication tools, hearing aids, and video conferencing systems requiring target speaker extraction in noisy, multi-speaker cocktail party environments.

## Limitations

Vocoder-based waveform reconstruction can introduce minor compression and phase estimation artifacts.

## Related

- (link related pages by id as the wiki grows)
