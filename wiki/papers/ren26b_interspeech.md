---
id: ren26b_interspeech
category: audio-understanding
labels: [self-supervised, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1110
pdf: https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.pdf
---

# CoSTALA: Compositional Spatio-Temporal Audio-Language Alignment via Multi-Grain Hierarchical Contrastive Learning

*Peiwei Ren, Jinbo Hu, Fang Kang, Shan Liang, Yin Cao*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1110)

**Category:** `audio-understanding` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — CoSTALA is an audio-language alignment training paradigm designed to transition from coarse global representations to fine-grained spatio-temporal reasoning for multi-event spatial audio. It achieves an absolute text-to-audio Recall@1 of 8.10% (vs. 5.66% for T-CLAP) on a newly constructed spatial audio-text benchmark.

## Key contributions

- Proposes a multi-grain hierarchical contrastive learning framework that replaces single global vectors with a combination of hard, soft, and global embeddings.
- Introduces a 3-way spatio-temporal loss that jointly penalizes chronological (temporal) errors and spatial localization errors.
- Applies a local alignment loss and a feature consistency loss (with stop-gradient) to prevent temporal entanglement and semantic drift in long-duration audio streams.
- Constructs a 375-hour multi-event spatial dataset derived from Clotho via LLM-assisted (Qwen3-8B) spatial caption rewriting and simulated First-Order Ambisonics (FOA) SRIRs.

## Problem

Traditional audio language models (ALMs) like CLIP, CLAP, LAION-CLAP, and SALM rely heavily on static, global alignment which compresses dynamic sound streams into holistic vectors. This causes 'context drift' and information bottlenecks, blinding models to multi-event audio sequences where distinct sound occurrences unfold across different spatial coordinates and time steps. Prior temporal approaches like T-CLAP handle chronological sequences but are limited to two-channel audio and lack spatial awareness, failing to parse multi-event, multi-directional scenes.

## Method

CoSTALA integrates a RoBERTa-based text encoder with a hierarchical audio backbone driven by HTSAT, augmented by a dedicated Transformer temporal encoder equipped with Rotated Position Embedding (RoPE) and a dual-branch design separating acoustic semantics from spatial localization. The architecture processes audio via three pathways: Hard Embeddings ($E_{hard}^{c_i}$) from isolated spatial events to preserve semantic purity, Soft Embeddings ($E_{soft}^{c_i}$) from chunked representations of concatenated sequences ($C_1 \parallel C_2$), and Global Embeddings ($E_{global}$) for macroscopic features. The Soft embeddings feed the temporal encoder to extract chronological dependencies ($E_{temp}$), which are then combined with global features via a learnable residual scalar $\alpha$ to yield spatio-temporal representations ($E_{st}$).

The training objective is a weighted linear combination of four losses: (1) Contrastive Learning Loss ($L_{cl}$) combining semantic and macroscopic pairs against batch-mined hard negatives; (2) A 3-way Spatio-Temporal Loss ($L_{st}$) utilizing a learnable temperature parameter $\tau$ to explicitly force text and audio representations to distinguish temporal reversals from spatial swapping; (3) Local Alignment Loss ($L_{local}$) using InfoNCE on isolated hard chunks and directional spatial captions; and (4) Feature Consistency Loss ($L_{consist}$) applying an MSE constraint between hard anchors (with stop-gradients) and soft chunk representations to prevent representational collapse.

## Experimental setup

The model is trained on a 375-hour synthetic spatial dataset containing 30,000 training samples and 9,000 evaluation samples sampled at 24 kHz (64-dimensional log-mel spectrograms and intensity vectors from First-Order Ambisonics FOA using a 1,024-point Hanning window). Evaluated against SALM and T-CLAP using bi-directional spatial retrieval metrics (Recall@1, Recall@5, Recall@10). Trained for 15 epochs using the AdamW optimizer with a peak learning rate of $10^{-4}$, a 3-epoch linear warm-up, and a cosine annealing schedule.

## Results

CoSTALA achieves an 8.10% Text-to-Audio R@1 (compared to 5.66% for T-CLAP and 4.77% for SALM) and an 8.16% Audio-to-Text R@1 (compared to 5.92% for T-CLAP and 4.57% for SALM). Ablation studies show that removing the 3-way spatio-temporal loss drops Text-to-Audio R@1 down to 7.16%, while removing local alignment or feature consistency individually degrades performance. A zero-shot test using only semantic audio representations ($E_{sem}$) without spatial components collapses performance, underscoring the necessity of the spatial pathway.

| System / Loss Config | T2A R@1 | T2A R@5 | T2A R@10 | A2T R@1 | A2T R@5 | A2T R@10 |
|---|---|---|---|---|---|---|
| SALM | 4.77 | 14.37 | 21.27 | 4.57 | 14.28 | 21.23 |
| T-CLAP | 5.66 | 16.84 | 24.88 | 5.92 | 16.71 | 24.71 |
| CoSTALA ($L_{cl}$) | 5.84 | 17.68 | 26.07 | 6.58 | 18.49 | 26.01 |
| CoSTALA ($L_{cl}+L_{st}$) | 7.16 | 17.45 | 24.52 | 6.96 | 17.78 | 23.84 |
| CoSTALA (Full) | 8.10 | 19.86 | 27.68 | 8.16 | 20.49 | 27.08 |

## Limitations

The dataset is entirely synthetic, created by convolving monophonic Clotho audio with simulated Spatial Room Impulse Responses (SRIRs), which may limit zero-shot generalization to complex real-world acoustic environments and reverberation profiles. The spatial resolution is restricted to eight azimuth directions at 45-degree intervals, bypassing continuous 360-degree elevation and distance modeling.

## Why read this

Speech and ML researchers working on spatial audio understanding and multi-modal contrastive learning should read this paper to learn how to combine fine-grained local anchoring with global multi-event temporal loss objectives.

## Code

- https://github.com/Cell778/CoSTALA26.git

## Applications

Complex acoustic scene monitoring, spatially aware conversational agents, and multi-event augmented reality sound indexing.

## Institutions / 機構

Xi'an Jiaotong-Liverpool University, Xiaomi, University of Oulu, Chinese Academy of Sciences

**Funding / 經費:** Xi'an Jiaotong-Liverpool University

## Related

- (link related pages by id as the wiki grows)
