---
id: chen26ba_interspeech
category: resources-evaluation
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["New York University"]
code: https://github.com/chuyangchencd/SARL
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2506
pdf: https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.pdf
---

# Probing Spatial Structure in Pretrained Audio Representations

*Chuyang Chen, Sivan Ding, Adrian S. Roman, Juan P. Bello*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2506)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — The paper introduces the Spatial Audio Representation Learning (SARL) benchmark to systematically probe source- and room-level spatial factors in frozen pretrained audio models, revealing that current models encode source properties far better than global room properties. First-order Ambisonics (FOA) and binaural inputs combined with self-supervised masked spectrogram reconstruction yield the most robust spatial representations.

## Key contributions

- A controlled simulation-based spatial audio dataset providing independent, balanced variation of source-level (azimuth, elevation, distance, class) and room-level (RT60, volume, shape) factors.
- A unified linear probing protocol for architecture-agnostic evaluation of pretrained spatial audio representations using frozen backbones.
- A systematic multi-axis evaluation of 13 diverse pretrained audio encoders across input formats, training paradigms, and sensitivity to controlled perturbations.
- Demonstration of a persistent source-room gap, showing that global acoustic environment properties are significantly harder to recover from learned embeddings than local source attributes.

## Problem

Pretrained spatial audio encoders are increasingly deployed in robotics, embodied AI, and immersive media, yet their internal spatial capabilities remain poorly understood. Existing representation benchmarks (like HEAR, SUPERB, X-ARES, MARBLE) focus primarily on monaural signals and semantic tasks, while spatial audio challenges (like DCASE, LOCATA, CHiME, REVERB) rely on end-to-end task pipelines that conflate representation quality with downstream architecture and supervision strategies. This lack of a controlled, architecture-agnostic probing framework prevents researchers from isolating how spatial cues—such as directional coordinates or room geometry—are actually captured in learned representations.

## Method

The SARL benchmark evaluates seven probing tasks split into source-level (azimuth in 36 bins, elevation in 12 bins, distance in 20 bins, and 7 event classes) and room-level factors (RT60 in 29 bins, volume in 5 logarithmic bins, and 4 shape classes: cube, flat, corridor, rectangular). Source-level scenes are synthesized using AudibleLight on realistic Gibson meshes (azimuth [-180°, 180°], elevation [-60°, 60°], distance [0.5, 2.5]m) for geometrically faithful ray-traced propagation. Room-level tasks use PyRoomAcoustics to generate room impulse responses (RIRs) sampling RT60 [0.1, 3.0]s and room volume [60, 2500] m³. Each dataset split renders 15,000/3,000/3,000 train/val/test scenes per epoch by convolving dry source clips (7 classes from ESC-50, MUSAN, UrbanSound8K; 10s length, 24kHz, RMS normalized to -24 dBFS) with disjoint room RIRs, identically rendered across stereo, binaural, and First-Order Ambisonics (FOA).

Models use frozen backbones where frame-level embeddings or token sequences are mean-pooled to obtain scene-level representations. Linear classifiers are trained using cross-entropy with the Adam optimizer (lr = 1×10⁻⁴) and cosine decay for 20 epochs. Discretized continuous factors employ Gaussian soft labels centered at the ground-truth bin, evaluated via normalized mean absolute error metrics mapped to performance scores (1 - MAE/R), while categorical factors use one-hot targets evaluated via macro-F1. To measure representation geometric sensitivity, cosine similarity shifts Δ(x, x') are computed between reference scenes and paired variants modified only in target factor groups, normalized against expected random-pair similarities estimated from 10,000 random test pairs.

## Experimental setup

Evaluated 13 pretrained models spanning mono (A-MAE, SELD-S), stereo (EnCodec, SR-VAE, BANC, SELD-S), binaural (GRAM-B, S-AST, SFD, W-JEPA, AVSA), and First-Order Ambisonics (EINv2, SELD-F, GRAM-F). Evaluated across 7 probing tasks with datasets comprising 12,000 training, 3,600 validation, and 3,600 test room impulse responses, rendered into 15,000/3,000/3,000 scenes per epoch. Metrics include baseline-normalized probing performance scores, normalized mean absolute error for continuous factors, macro-F1 for categorical factors, and normalized cosine similarity drop for representation sensitivity.

## Results

Multichannel formats generally outperform mono/stereo, with FOA and binaural encoders achieving the strongest performance across spatial tasks. FOA models show clear advantages for elevation and room properties (RT60, volume, shape), whereas source-level factors (azimuth, distance, class) are captured comparably well by binaural and FOA models. Supervised localization models (e.g., SELD-S, SELD-F, EINv2) dominate azimuth estimation but perform poorly on global room properties. Self-supervised reconstruction models (specifically GRAM-B and GRAM-F) yield the most balanced and robust spatial representations, outperforming latent prediction (W-JEPA) and feature distillation (SFD) approaches. Codec-based models (EnCodec, SR-VAE, BANC) consistently perform the worst across all spatial probing tasks.

| System / Model | Input Format | Azimuth (Norm. Score) | Elevation (Norm. Score) | RT60 (Norm. Score) | Room Volume (Norm. Score) |
|---|---|---|---|---|---|
| GRAM-F | FOA | High | High | High | Moderate |
| EINv2 | FOA | Very High | Moderate | Low | Low |
| GRAM-B | Binaural | High | High | Moderate | Moderate |
| A-MAE | Mono | Low | Low | Moderate | Moderate |
| EnCodec | Stereo | Very Low | Very Low | Very Low | Very Low |

## Limitations

The benchmark relies on simulated single-source acoustic scenes with isolated variations, limiting direct generalizability to complex multi-source real-world environments. Evaluations use mean-pooled frozen representations and linear probes, which capture linearly accessible information but may miss non-linearly encoded spatial structures preserved in pre-pooled features. The tested models are evaluated under data distributions that differ from their original training conditions, and language/multilingual spatial coverage was not tested.

## Why read this

Speech and audio ML researchers designing spatial audio encoders or self-supervised representation learning objectives should read this paper to understand the severe representation gap between local source tracking and global room geometry. It provides an actionable diagnostic benchmark (SARL) demonstrating that masked spectrogram reconstruction on Ambisonics/binaural inputs preserves spatial structure far more effectively than compression or latent prediction.

## Code

- https://github.com/chuyangchencd/SARL

## Applications

Benchmarking and diagnosing spatial awareness in foundation audio models for robotics, embodied AI, acoustic scene analysis, and immersive spatial audio systems.

## Institutions / 機構

New York University

**Funding / 經費:** NYU / SONY Audio Institute for Music Business and Technology

## Related

- (link related pages by id as the wiki grows)
