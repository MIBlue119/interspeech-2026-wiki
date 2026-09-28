---
id: wang26da_interspeech
category: cross-modal-learning
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2348
pdf: https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.pdf
---

# GACA-DiT: Diffusion-based Dance-to-Music Generation with Genre-Adaptive Rhythm and Context-Aware Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26da_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2348)

**TL;DR** — GACA-DiT is a diffusion transformer-based dance-to-music generation framework that employs genre-adaptive rhythm extraction and context-aware temporal alignment to achieve superior beat consistency and audio quality.

## Problem

Prior dance-to-music (D2M) generation methods rely on coarse global motion features or binarized joint rhythms, which fail to capture fine-grained rhythmic patterns across diverse dance styles. Furthermore, downsampling during feature encoding introduces severe temporal mismatches between dance rhythm representations and music latents, leading to poor cross-modal synchronization.

## Method

GACA-DiT utilizes a conditional flow matching framework driven by a diffusion transformer (DiT) consisting of 8 transformer blocks with a 512 hidden size and 10-head attention. It integrates a Genre-Adaptive Rhythm Extraction (GARE) module that combines multi-scale temporal Gabor wavelets and spatial phase histograms with joint-adaptive weighting to extract discriminative pose-based rhythm embeddings. A Context-Aware Temporal Alignment (CATA) module then bridges temporal length discrepancies between dance features and music latents using learnable context queries guided by query-driven attention pooling. The model conditions the DiT on aligned rhythm features, I3D video semantic features, and timestep embeddings, employing a 32-step Euler ODE solver during inference.

## Results

Evaluated on the AIST++ and TikTok datasets using 5-second audio clips at 44.1 kHz, GACA-DiT outperforms baseline methods including D2M-GAN, CDCD, LORIS, and MotionComposer across objective rhythm metrics and aesthetic evaluations. Specifically, it achieves a Beats Coverage Score (BCS) of 98.13 and Beats Hit Score (BHS) of 98.72 with an F1 score of 98.47 on AIST++, alongside a Fréchet Audio Distance (FAD) drop to 20.14. Ablation studies confirm that sequentially incorporating multi-scale wavelets, phase histograms, adaptive joint weighting, and the CATA module progressively improves beat consistency and reduces deviation.

## Code

- https://anonymous.4open.science/w/GACA-DiT/

## Applications

Audio-visual content creators and short-form video platforms can use this framework to automatically generate temporally synchronized and genre-appropriate musical accompaniments for user-uploaded dance videos.

## Related

- (link related pages by id as the wiki grows)
