---
id: li26ca_interspeech
category: speaker
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1965
pdf: https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.pdf
---

# Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models

*Yishuang Li, Yi Yu, Wanli Dong, Weihao Gan*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1965)

**Category:** `speaker` · **Labels:** `self-supervised`

**TL;DR** — A self-supervised speaker verification method combining multi-layer pre-trained model clustering consensus for high-confidence pseudo-labeling with DINO-style teacher-student self-distillation for low-confidence data, achieving a 1.09% EER on VoxCeleb1-O.

## Key contributions

- High-confidence pseudo-label selection (HCPLS) using multi-layer clustering consistency and Hungarian matching across speaker-discriminative pre-trained Transformer layers.
- A joint training framework coupling pseudo-supervised learning (with label noise correction) on high-confidence data and DINO-style self-distillation (with confidence gating) on low-confidence data.
- Iterative refinement procedure leveraging chunk-level offline label correction, reaching an EER of 1.09% on VoxCeleb1-O in 4 iterations.

## Problem

Current high-performance speaker verification relies on costly, large-scale labeled datasets, which are constrained by privacy laws. Existing self-supervised speaker verification methods suffer from pseudo-label noise caused by single-layer clustering imperfections or struggle with data inefficiency by discarding low-confidence or ambiguous samples. Prior contrastive methods also risk treating same-speaker negatives as false negatives, while naive pseudo-supervised approaches overfit to label errors.

## Method

The system utilizes the Large variant of WavLM (7-layer conv + 24 Transformer layers) as a pre-trained model. First, layer-wise Equal Error Rate (EER) is evaluated on validation trials to identify the top-K speaker-discriminative layers (layers 9, 10, and 11). Utterance representations from each selected layer are clustered independently using Infomap. A co-occurrence matrix and Hungarian matching align cluster IDs across layers, and only samples with identical cross-layer assignments are retained as high-confidence set H; remaining samples and small clusters form the unlabeled set L.

The student architecture consists of a PTM sub-network (using the first 10 layers of WavLM combined via learnable weighted sum) feeding an ECAPA-TDNN encoder and classifier. An Exponential Moving Average (EMA) teacher (decay α = 0.999) provides targets. The training loss combines supervised Label Noise Correction (LNC) loss on H (with time-dependent weight β_t increasing to 1.0) and unsupervised objectives on L. For L, two augmented views are generated; the teacher provides soft probability distributions with temperature T = 2.0, filtered by a confidence threshold τ = 0.6. Knowledge distillation loss (L_kd) is computed using KL divergence over confident indices, and a view-invariant embedding consistency loss (L_cons) is applied batch-wise, weighted by λ = 0.5.

After training, offline label correction splits utterances into chunks to filter ambiguous labels (discarding utterances where the majority label appears in under 50% of chunks), and the model is iteratively retrained for 4 total iterations, updating the pseudo-labels via clustering on embeddings from the current model.

## Experimental setup

Trained on VoxCeleb2 dev (1,092,009 utterances from 5,994 speakers) using 2-second non-overlapping chunks with MUSAN and RIR data augmentation. Evaluated on VoxCeleb1-O using Equal Error Rate (EER) and minimum normalized detection cost function (MinDCF at P_target = 0.01). Implemented using AdamW with a cyclic learning rate schedule across a two-stage training recipe (10 epochs freezing PTM-sub, 5 epochs full fine-tuning with max learning rates 5e-4 and 1e-5). Compared against baselines including MBPC, AT-HT, CA-DINO, LGL, PTM-LC, and IPL.

## Results

In Iteration-1, baseline S1 (PTM-LC equivalent using single-layer H1) achieves 2.64% EER. Adding HCPLS with K=3 layers (S3) improves EER to 2.40%. Incorporating DINO-style self-distillation on the low-confidence set (S5) further reduces EER to 2.10% (a 20.5% relative drop over S1) with a MinDCF of 0.212. Ablating the knowledge distillation loss (S7) causes a sharp degradation to 2.40% EER, demonstrating it is the primary driver over the consistency loss (S6, 2.17%). Across 4 iterative refinement cycles, the full method reaches 1.09% EER and 0.131 MinDCF on VoxCeleb1-O, outperforming prior arts like PTM-LC (1.25%) and IPL (1.14% in 11 iterations).

| System | Train Set | EER (%) | MinDCF |
|---|---|---|---|
| PTM-LC [21] | H1 | 2.55 | - |
| S1 (Baseline) | H1 | 2.64 | 0.259 |
| S3 (HCPLS K=3) | H3 | 2.40 | 0.236 |
| S5 (HCPLS + DINO-SD) | H3 + L3 | 2.10 | 0.212 |
| Proposed (Iter-4) | Iterative | **1.09** | **0.131** |

## Limitations

The evaluation is restricted to the VoxCeleb benchmark datasets, leaving multi-domain or cross-corpus robustness under-explored. The framework relies on a validation trial set to select top-K PTM layers, which introduces dependency on labeled validation data domain characteristics. Additionally, the multi-stage iterative pipeline with heavy pre-trained models demands substantial GPU compute resources.

## Why read this

Read this if you work on self-supervised speaker recognition and want to learn how to effectively combine multi-layer pre-trained feature hierarchies with teacher-student self-distillation to handle noisy pseudo-labels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Privacy-preserving speaker verification, forensic audio analysis, and large-scale speaker diarization pipelines using unlabeled speech.

## Institutions / 機構

Malanshan Audio and Video Laboratory

## Related

- (link related pages by id as the wiki grows)
