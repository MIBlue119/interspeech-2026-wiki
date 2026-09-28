---
id: ren26b_interspeech
category: sound-event-localization-and-detection
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1110
pdf: https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.pdf
---

# CoSTALA: Compositional Spatio-Temporal Audio-Language Alignment via Multi-Grain Hierarchical Contrastive Learning

[PDF](https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1110)

**TL;DR** — CoSTALA is a hierarchical contrastive learning paradigm for audio-language models that handles multi-event spatial audio sequences, improving text-to-audio R@1 spatial retrieval to 8.10%.

## Problem

Current audio-language models (ALMs) rely heavily on coarse-grained, static global alignment that compresses complex spatial audio into a single vector, causing context drift and an inability to resolve multiple sequential events. This limits their effectiveness in real-world spatial environments where multiple acoustic events unfold across distinct coordinates. The paper addresses this representation bottleneck through a hierarchical approach.

## Method

The architecture combines a RoBERTa-based text encoder and a HTSAT-driven hierarchical audio backbone with a dual-branch design to decouple acoustic semantic extraction from spatial localization. A dedicated Transformer-based temporal encoder with Rotated Position Embeddings (RoPE) models sequential dependencies from chunked audio representations. Training is driven by a multi-grain hierarchical loss system: contrastive losses for global alignment, a 3-way spatio-temporal loss to handle temporal/spatial hard negatives, a local alignment InfoNCE loss for semantic event purity, and a feature consistency MSE loss with stop-gradients.

## Results

Evaluated on a synthesized 375-hour spatial Clotho dataset consisting of 30,000 training and 9,000 evaluation samples, using bi-directional Recall@K (K=1, 5, 10). Compared against baselines SALM and T-CLAP, the full CoSTALA framework achieves a Text-to-Audio R@1 of 8.10% and Audio-to-Text R@1 of 19.86% on global spatio-temporal retrieval. Ablation studies confirm that combining local alignment and feature consistency losses is necessary to prevent feature collapse and reach peak performance.

## Code

- https://github.com/Cell778/CoSTALA26.git

## Applications

Speech and machine learning engineers developing spatial audio-language models, interactive spatial question-answering systems, and multi-event sound event localization and detection applications.

## Limitations

The approach relies on synthetic spatial audio data created via impulse response convolution and LLM-rewritten captions rather than complex real-world recordings.

## Related

- (link related pages by id as the wiki grows)
