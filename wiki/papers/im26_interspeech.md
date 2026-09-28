---
id: im26_interspeech
category: tgen
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-248
pdf: https://www.isca-archive.org/interspeech_2026/im26_interspeech.pdf
---

# PF-D2M: A Pose-free Diffusion Model for Universal Dance-to-Music Generation

[PDF](https://www.isca-archive.org/interspeech_2026/im26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/im26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-248)

**TL;DR** — PF-D2M is a pose-free diffusion model for universal dance-to-music generation that uses video visual features and progressive training to achieve state-of-the-art alignment and audio quality across diverse scenarios.

## Problem

Traditional dance-to-music systems rely heavily on motion features or 2D keypoints extracted from a single human dancer, which causes performance bottlenecks for multiple performers or non-human characters and leads to jitter. Furthermore, public dance-to-music datasets like AIST++ are extremely scarce, containing only 60 unique songs with simple backgrounds, causing severe overfitting and poor generalization to in-the-wild videos. These limitations prevent existing models from producing studio-quality, diverse musical accompaniments for real-world creative workflows.

## Method

PF-D2M adopts a Diffusion Transformer (DiT) architecture initialized with Stable Audio Open weights, leveraging a pre-trained VAE to compress stereo audio into latents. Instead of joint poses, it extracts global video representations using Synchformer, upsampling and conditioning the DiT via 1D convolutions and adaptive layer normalization (AdaLN) timestep summations alongside T5-based text prompt cross-attention. To overcome data scarcity, the model employs a three-step progressive training recipe: Stage 0 initializes text-to-audio weights; Stage 1 trains on VGGSound (500 hours) for raw audio-visual synchronization; and Stage 2 fine-tunes on a mixed dataset ratio of 2:4:1 combining AIST++ (dance-to-music), FMA and MoisesDB (text-to-music), and VGGSound using Qwen2-Audio generated tags. Classifier-free guidance with DPM-Solver++ is utilized during 100-step inference.

## Results

Evaluated on the AIST++ test set using LORIS benchmark splits (BCS, CSD, BHS, HSD, and F1), PF-D2M outperforms baselines like CDCD, LORIS, and Text-Inv, achieving a Beat Hit Score (BHS) of 99.8, Hit Standard Deviation (HSD) of 1.9, and F1 score of 94.3. Subjective listening tests across 20 challenging in-the-wild video samples (encompassing single/multiple human and non-human dancers) rated by 20 participants show that PF-D2M significantly surpasses competing models in both dance-music alignment and perceived music quality. Ablations confirm that Stage 2 fine-tuning is crucial for resolving the abrupt structural transitions and environmental noise present in Stage 1 outputs.

## Code

- https://jakeoneijk.github.io/pfd2m_project

## Applications

Choreographers, performers, and digital content creators generating synchronized background music from arbitrary dance videos, including multi-dancer routines and animated character performances.

## Limitations

The generated music clips are relatively short compared to real-world use cases, and standard objective rhythm metrics struggle to comprehensively evaluate perceived audio fidelity.

## Related

- (link related pages by id as the wiki grows)
