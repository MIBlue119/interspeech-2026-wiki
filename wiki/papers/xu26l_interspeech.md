---
id: xu26l_interspeech
category: audio-understanding
labels: [low-resource, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1173
pdf: https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.pdf
---

# Audio-Language Prompt Learning for Few-Shot Audio Classification

*Qisheng Xu, Xiaoyi Tan, Wuyang Chen, Yutao Dou, Kele Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1173)

**Category:** `audio-understanding` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — MALP introduces a multi-modal prompt learning framework that jointly optimizes audio-specific, text-specific, and shared prompts to overcome the limitations of text-centric prompt adaptation in audio-language models, achieving a new average accuracy of 78.35% under a 16-shot setting across eleven benchmarks.

## Key contributions

- Identifies structural limitations in text-centric audio-language prompt learning, which causes imbalanced cross-modal optimization and struggles with acoustically similar classes.
- Proposes MALP, a unified multi-modal framework that decouples modality specialization and cross-modal alignment using audio-specific, text-specific, and shared prompts.
- Implements a progressive optimization strategy combining residual adaptation for modality-specific features and vector concatenation for shared prompt fusion.
- Demonstrates consistent outperformance across eleven diverse audio classification datasets over baselines including CoOp, CoCoOp, and PALM.

## Problem

Audio-language models (ALMs) exhibit strong zero-shot and few-shot generalization, but current adaptation strategies rely almost exclusively on text-centric prompt learning (such as CoOp, CoCoOp, and PALM). This leaves the audio encoder frozen without task-specific tuning, leading to imbalanced cross-modal optimization. Consequently, models fail to capture subtle acoustic differences when categories share similar semantic descriptions (e.g., distinguishing guitars from basses), severely limiting discriminative capacity in low-data regimes.

## Method

The framework builds upon PENGI as the frozen backbone audio-language model, with both audio and text encoders projecting inputs into a shared d-dimensional space. MALP introduces three learnable prompt vectors: an audio-specific prompt $P^{audio} \in \mathbb{R}^d$, a text-specific prompt $P^{text} \in \mathbb{R}^d$, and a shared prompt $P^{shared} \in \mathbb{R}^d$. 

Modality-specific adaptation is performed via residual formulations where $f_A^e(x) = f_A(x) + \lambda_A P^{audio}$ and $f_T^e(p) = f_T(p) + \lambda_T P^{text}$, using learnable scaling coefficients ($\lambda_A = \lambda_T = 0.2$) to preserve pre-trained global structures while injecting task-specific information. Following this specialization, cross-modal alignment is enforced by concatenating the identical shared prompt vector $P^{shared}$ to both modality embeddings, creating fused representations compared via cosine similarity in an expanded space.

The entire model is trained end-to-end minimizing standard multi-class cross-entropy loss over the few-shot training split, optimizing exclusively the lightweight prompt parameters via SGD with a batch size of 16, a learning rate of 0.05, and trained for 50 epochs.

## Experimental setup

Evaluated on eleven public datasets spanning varied acoustic domains (Beijing-Opera, NS-Instruments, ESC50, ESC50-Actions, UrbanSound8K, CREMA-D, RAVDESS, VocalSound, SESA, TUT2017, GT-MusicGenre) under a 16-shot setting. Compared against zero-shot PENGI, CoOp, CoCoOp, and PALM. Implemented in PyTorch on a single NVIDIA RTX 3090 GPU equivalent, with results averaged over three random seeds.

## Results

Under the 16-shot setting, MALP achieves a top average accuracy of 78.35%, outperforming the zero-shot baseline (39.69%), CoOp (71.14%), CoCoOp (73.47%), and PALM (76.58%). Notable improvements manifest on fine-grained benchmarks like Beijing-Opera (98.17%), CREMA-D (39.06%), and RAVDESS (46.98%). Ablation studies demonstrate that adding audio-specific prompts lifts PALM's performance from 76.58% to 77.33%, adding shared prompts reaches 76.89%, and combining both achieves the full 78.35%.

| System | Beijing-Opera | ESC50 | RAVDESS | UrbanSound8K | Average |
|---|---|---|---|---|---|
| Zero-shot | 28.81 | 49.65 | 12.22 | 53.49 | 39.69 |
| CoOp | 95.34 | 93.82 | 33.20 | 75.48 | 71.14 |
| CoCoOp | 97.74 | 94.27 | 38.83 | 76.52 | 73.47 |
| PALM | 5.33 | 95.93 | 45.96 | 80.77 | 76.58 |
| MALP (Ours) | 98.17 | 96.27 | 46.98 | 81.29 | 78.35 |

## Limitations

The evaluation is restricted to a fixed 16-shot setup and standard classification benchmarks, leaving ultra-low-shot regimes (e.g., 1-shot or 4-shot) and heavy domain-shift scenarios underexplored. The method inherits the computational dependency and vocabulary bounds of the underlying PENGI audio-language backbone.

## Why read this

Speech and ML researchers focusing on parameter-efficient few-shot adaptation of audio-language models should read this to see how dual modality-specific and shared prompt mechanisms resolve cross-modal optimization imbalances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Few-shot environmental sound classification, rare event detection, medical audio analysis, and acoustic scene recognition with limited labeled supervision.

## Institutions / 機構

National University of Defense Technology, Hunan Normal University, Hunan University

**Funding / 經費:** National Science and Technology Major Project, National University of Defense Technology

## Related

- (link related pages by id as the wiki grows)
