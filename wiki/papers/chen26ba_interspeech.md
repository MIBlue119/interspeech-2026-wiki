---
id: chen26ba_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2506
pdf: https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.pdf
---

# Probing Spatial Structure in Pretrained Audio Representations

[PDF](https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2506)

**TL;DR** — The paper introduces the Spatial Audio Representation Learning (SARL) benchmark to systematically probe how well pretrained audio encoders capture source-level and room-level spatial factors.

## Problem

Current evaluation of spatially-aware audio models relies heavily on task-centric, end-to-end benchmarks like DCASE or LOCATA, which conflate representation quality with downstream architecture choices and supervision signals. Existing representation benchmarks (e.g., HEAR, SUPERB, MARBLE) focus primarily on monaural signals and semantic tasks, leaving spatial information poorly understood. This lack of controlled, architecture-agnostic probing frameworks makes it difficult to isolate what spatial attributes are actually encoded in learned embeddings.

## Method

The SARL benchmark uses a controlled simulation framework to evaluate 13 pretrained audio encoders spanning mono, stereo, binaural, and first-order Ambisonics (FOA) input formats, as well as supervised, self-supervised (SSL), and codec-based training paradigms. It evaluates encoders across seven probing tasks covering source-level factors (azimuth, elevation, distance, and event class using AudibleLight ray-traced room meshes) and room-level factors (RT60, volume, and shape using PyRoomAcoustics room impulse responses). Scene embeddings are obtained by mean-pooling frame-level representations or token sequences, and evaluated via linear classifiers trained with cross-entropy using Adam (lr = 1e-4) and cosine decay for 20 epochs. Additionally, a representation sensitivity analysis measures cosine similarity drops under controlled source and room perturbations.

## Results

Evaluated on synthesized datasets with 12,000/3,600/3,600 train/val/test splits, results show that multi-channel formats (especially FOA and binaural) outperform mono and stereo models, though spatial channel availability does not guarantee strong representations. Supervised localization models excel at azimuth estimation but perform poorly on room-level factors, whereas self-supervised learning yields more balanced spatial representations. Codec-based models show the weakest decodability, and input-space reconstruction objectives (such as GRAM-B and GRAM-F) preserve spatial information more effectively than abstract prediction or distillation objectives. Across all models, source-level factors are consistently easier to decode than room-level factors.

## Code

- https://github.com/chuyangchencd/SARL

## Applications

Speech and machine learning engineers developing immersive media, robotics, embodied AI, and acoustic scene understanding systems use this framework to select and diagnose pretrained audio representations.

## Limitations

Probing measures decodability from frozen embeddings but does not inherently reveal how these representations perform when fine-tuned end-to-end on downstream tasks.

## Related

- (link related pages by id as the wiki grows)
