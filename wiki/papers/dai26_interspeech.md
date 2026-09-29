---
id: dai26_interspeech
category: audio-understanding
institutions: ["University of Science and Technology of China"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-353
pdf: https://www.isca-archive.org/interspeech_2026/dai26_interspeech.pdf
---

# Consistency-Regularized Dual-Branch Network with Performance-Aware Mean Teacher for Sound Event Detection

*Lipeng Dai, Qing Wang, Wu Guo, Peng Gao, Zhijun Zhang, Kuiliang Li, Jinjie Fu*

[PDF](https://www.isca-archive.org/interspeech_2026/dai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-353)

**Category:** `audio-understanding`

**TL;DR** — This paper presents a consistency-regularized dual-branch network combined with a performance-aware mean teacher framework for sound event detection, achieving a state-of-the-art official score of 1.309 on the DCASE 2024 Challenge Task 4 dataset. The key innovations are a temporal topology consistency loss that aligns self-similarity patterns across feature branches and an adaptive exponential moving average update strategy for semi-supervised learning.

## Key contributions

- Proposed a temporal topology consistency (TTC) loss that minimizes mean squared error between temporal self-similarity matrices of shallow and deep feature branches, synchronizing event evolution without losing feature diversity.
- Introduced a performance-aware mean teacher (PA-MT) framework with an adaptive exponential moving average (EMA) that dynamically adjusts the teacher model update rate based on student validation loss drops.
- Employed a cross-stage fusion (CSF) strategy that averages predictions from frozen-encoder (Stage1) and fine-tuned (Stage2) models to reconcile the performance trade-off in pre-trained model adaptation.
- Established a new single-system state-of-the-art on the DESED and MAESTRO Real datasets with 0.541 PSDS1, 0.768 mpAUC, and a 1.309 overall Score.

## Problem

Sound event detection (SED) requires identifying both sound categories and precise temporal boundaries from audio clips, but suffers from a severe scarcity of large-scale annotated data, necessitating semi-supervised learning. While pre-trained models like ATST combined with dual-branch Conformer networks can capture multi-layer features, the independent branches often suffer from scale inconsistency, and standard distillation techniques like KL divergence fail to capture non-probabilistic intermediate temporal dynamics. Furthermore, standard mean teacher frameworks rely on a fixed EMA decay factor that overlooks the non-monotonic, fluctuating nature of the student's training process.

## Method

The system utilizes a front-end feature extractor based on pre-trained ATST (12 Transformer layers split into shallow and deep weighted outputs) feeding a cascaded back-end dual-branch Conformer network (4 Conformer layers per branch, feature dimension 256). To regularize these branches, the TTC loss computes pairwise similarities across time steps via feature dot products ($H^	op H$) over the feature dimension $C$, minimizing the mean squared error between the shallow and deep self-similarity matrices ($M_s$ and $M_d$).

For semi-supervised training, the PA-MT framework evaluates the student model using original labeled data within each mini-batch to compute a reference binary cross-entropy loss ($L_{ref}$). If $L_{ref}$ achieves a new minimum, a fast EMA decay factor ($\lambda_{fast} = 0.991$) is triggered to aggressively incorporate student parameters; otherwise, a slow decay factor ($\lambda_{slow} = 0.999$) maintains stability. The overall objective combines supervised BCE loss ($L_{sup}$), alignment MSE loss ($L_{PA-MT}$), and the TTC loss ($L_{TTC}$) with fixed loss weights $\alpha=0.5$ and $\beta=0.5$, and tuned $\gamma$.

Training occurs in two stages: Stage1 trains only the context network for 200 epochs using the AdamW optimizer (learning rate $10^{-3}$, batch size 36), while Stage2 fine-tunes the ATST via adapters for 250 epochs (adapter learning rate $10^{-4}$, context lr $10^{-3}$, batch size 28). A cross-stage fusion strategy averages predictions from the optimal Stage1 and Stage2 models at inference time to combine general and task-specific representations.

## Experimental setup

Evaluated on the DCASE 2024 Challenge Task 4 dataset (DESED and MAESTRO Real), consisting of 10,000 synthetic strongly-labeled clips, 1,578 weakly-labeled clips, 14,412 unlabeled clips, and additional strongly/softly-labeled clips, augmented with roughly 7,000 strongly-labeled AudioSet clips. Performance is measured using PSDS1 (temporal precision), mpAUC (low-FPR classification), and their sum (Score). Baselines include BEATs-CRNN, ATST-SED, ATST-DBC, and CP-JKU.

## Results

The proposed method achieves an official Score of 1.280 in Stage1 and 1.293 in Stage2. Following cross-stage fusion, it reaches 0.541 PSDS1, 0.768 mpAUC, and a top Score of 1.309, outperforming existing single-system approaches like ATST-DBC (1.288) and approaching multi-model ensembles like CP-JKU. Ablation studies confirm that removing the TTC loss drops the Stage1 Score to 1.271, and replacing PA-MT with standard MT drops the score to 1.269. The method occasionally trails slightly in pure PSDS1 compared to specialized ensemble baselines before fusion.

| System / Condition | PSDS1 | mpAUC | Score |
|---|---|---|---|
| BEATs-CRNN | 0.509 | 0.724 | 1.233 |
| ATST-SED (Stage 2) | 0.539 | 0.719 | 1.258 |
| ATST-DBC (Stage 2) | 0.530 | 0.758 | 1.288 |
| CP-JKU (Iter.2, Stage 2) | 0.548 | 0.750 | 1.298 |
| Proposed (Stage 2) | 0.525 | 0.768 | 1.293 |
| Proposed + CSF (Final) | 0.541 | 0.768 | 1.309 |

## Limitations

The approach relies heavily on pre-trained feature extractors (ATST) and inherits domain-specific biases from AudioSet and DESED training distributions. The performance-aware EMA mechanism introduces extra validation checks during training iterations, and the two-stage training plus cross-stage fusion pipeline increases overall training and inference complexity.

## Why read this

Researchers working on sound event detection or semi-supervised representation learning will find the performance-aware mean teacher and temporal topology consistency loss valuable for stabilizing multi-branch architectures. It provides a blueprint for leveraging multi-layer pre-trained features without running into scale inconsistency or unstable teacher-student updates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart home audio monitoring, industrial acoustic fault detection, automated security surveillance, and environmental sound logging.

## Institutions / 機構

University of Science and Technology of China

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [BG-CRNN: Boundary-Guided Dynamic Attention for Sound Event Detection in Complex Scenarios](lin26k_interspeech.md) — same problem · relatedness 2.6/3
- [Teacher-Agnostic Temporal Knowledge Distillation for Resource-Efficient Sound Event Detection](son26_interspeech.md) — same problem · relatedness 2.2/3
- [A Semantic-Anchor-based Method for Open-Vocabulary Sound Event Detection](liu26f_interspeech.md) — same problem · relatedness 2.0/3
- [Align-Consistency: Improving Non-autoregressive and Semi-supervised ASR with Consistency Regularization](huang26i_interspeech.md) — shared technique · relatedness 1.9/3
- [POP-SED: Prototype Orthogonal Projection for Robust Few-shot Sound Event Detection](kagoshima26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
