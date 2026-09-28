---
id: wang26b_interspeech
category: audio-captioning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-112
pdf: https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.pdf
---

# FoleyGenEx: Unified Video-to-Audio Generation with Multi-Modal Control, Temporal Alignment, and Semantic Precision

[PDF](https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-112)

**TL;DR** — FoleyGenEx is a unified video-to-audio framework combining multi-modal control, frame-level temporal alignment, and adverb-enhanced semantic precision via a masked multi-modal diffusion transformer.

## Problem

Current video-to-audio methods force a strict trade-off: systems like MultiFoley provide diverse multi-modal conditioning but suffer from poor temporal alignment, while models like MMAudio achieve strong synchronization but lack reference audio conditioning and fine-grained semantic control. This gap prevents unified, precise audio synthesis across tasks like text-controlled generation, audio-controlled style transfer, and Foley extension. Furthermore, standard training benchmarks lack adverbial supervision, making it difficult for models to control nuances like speed, volume, and distance.

## Method

FoleyGenEx integrates a Multi-modal Diffusion Transformer (MMDiT) backbone with a single-modal DiT for iterative flow-matching audio generation, utilizing DAC-VAE for audio latent extraction and Synchformer for video synchronization features. It introduces a conditional injection mechanism via channel-wise concatenation and residual summation to support reference audio conditioning, paired with a stochastic multimodal dynamic masking strategy (masking 70–100% of audio latents during training) to ensure train-inference consistency. Additionally, a masked MSE loss isolates gradient updates to target frames, and an automated four-stage adverb-based data augmentation pipeline leverages signal processing and large language models to enrich training captions with nuanced speed, distance, and volume cues.

## Results

Evaluated on AudioCaps, VGGSound, and Greatest Hits, FoleyGenEx achieves competitive controllable video-to-audio performance against existing baselines across synchronization, multi-modal control, and semantic metrics. The framework successfully unifies text-to-audio, video-to-audio, text-controlled video-to-audio, audio-controlled video-to-audio, and Foley extension. Ablations and experiments confirm that the proposed conditional injection mechanism and adverb augmentation recover fine-grained semantic control without sacrificing temporal alignment.

## Code

- https://foleygenex.github.io/FoleyGenEx

## Applications

Engineers and content creators working on automated silent film dubbing, sound effect design, damaged audio track restoration, and fine-grained interactive audio-visual generation.

## Related

- (link related pages by id as the wiki grows)
