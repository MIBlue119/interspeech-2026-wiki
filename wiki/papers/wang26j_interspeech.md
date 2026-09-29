---
id: wang26j_interspeech
category: health-clinical
labels: [robustness-noise]
institutions: ["Nagoya Institute of Technology", "University of Wollongong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-465
pdf: https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.pdf
---

# Layer-wise Multi-factor Adaptive Disentanglement for Cross-corpus Speech Depression Detection

*Minggang Wang, Shohei Kato, Wen Gu, Fenghui Ren, Jun Yan*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-465)

**Category:** `health-clinical` · **Labels:** `robustness-noise`

**TL;DR** — The paper introduces Layer-wise Multi-factor Adaptive Disentanglement (LMAD), a framework that uses layer-wise Hilbert-Schmidt Independence Criterion (HSIC) constraints and gradient-aware adaptive weights to suppress speaker and corpus bias across network hierarchies while preserving depression-related cues, improving cross-corpus speech depression detection macro-F1 from 0.39 to 0.62 on DAIC-WoZ to Androids.

## Key contributions

- Proposed a layer-wise multi-factor disentanglement framework that suppresses speaker and corpus dependence at key intermediate encoder layers while explicitly preserving depression-related cues.
- Designed a gradient-aware adaptive weighting strategy combining inter-layer and intra-layer HSIC dependence statistics with gradient direction agreement to dynamically modulate disentanglement strength.
- Demonstrated consistent cross-corpus improvements over standard baselines, speaker-only disentanglement, and output-level domain adaptation across bidirectional DAIC-WoZ and Androids transfers.
- Validated the approach using two distinct backbone architectures, DepAudioNet and ECAPA-TDNN, showing robust generalization across network designs.

## Problem

Automated speech depression detection models often overfit to training corpora due to domain shifts arising from entangled nuisance factors like speaker identity, recording conditions, and language protocols. Prior approaches typically apply speaker disentanglement or domain alignment only at the final encoder output layer. However, deep networks accumulate and amplify domain bias across intermediate layers, and uniform disentanglement strengths often over-regularize task-relevant information or leave residual nuisance biases.

## Method

LMAD operates under an unsupervised domain adaptation (UDA) setting where a source corpus with depression labels and an unlabeled target corpus (with non-overlapping speakers) are jointly used for training. Given frame-level 40-dimensional Fbank acoustic features, an encoder network extracts intermediate representations from a pre-selected set of $k$ layers. For DepAudioNet, 4 layers are constrained; for ECAPA-TDNN, 7 layers spanning convolutional, SE-Res2Block, pooling, and fully-connected layers are targeted.

To control representation geometry, the framework estimates statistical dependence between flattened layer representations and factor labels (speaker $u$, corpus $c$, and source-only depression $y$) using the Hilbert-Schmidt Independence Criterion (HSIC) with linear kernels, normalized via Centered Kernel Alignment. Base adaptive weights are computed as the product of inter-layer and intra-layer dependence proportion scores. These base weights are further modulated by gradient direction agreement (quantified via cosine similarity between the main classification loss gradient and the layer-wise factor loss gradient) and normalized along the inter-layer direction.

The overall objective function combines a supervised binary cross-entropy loss for the main depression detection task (computed on source samples using a sigmoid-activated fully connected classifier on top of the final embedding) with weighted layer-wise regularization terms. Specifically, speaker and corpus dependence terms are minimized, while the depression dependence term is maximized (included with a negative sign) to prevent the erosion of task-discriminative information across the hierarchy.

## Experimental setup

Evaluated on DAIC-WoZ (English clinical-interview corpus, 189 total subjects: 107 train, 35 valid, 47 test) and Androids (Italian spontaneous-speech corpus, 118 subjects: 64 depressed, using a 5-fold cross-validation protocol). Audio recordings are segmented into 3.84-second clips and converted to 40-dimensional Fbank features (64 ms window, 32 ms shift). Baselines include raw backbones (DepAudioNet, ECAPA-TDNN), Spk-Disen, NUSD, and MDFA. Models are trained for 100 epochs using the Adam optimizer with an initial learning rate of 0.01 (decayed by 0.9 every 10 epochs) and a batch size of 512 (1:1 source-target ratio). Metrics include subject-level macro-F1 and per-class F1 for healthy controls (hc) and depressed (dp) subjects, aggregated via majority vote.

## Results

LMAD with adaptive weighting (LMAD^w) substantially outperforms backbones and prior domain adaptation methods under cross-corpus transfer. On DAIC-WoZ to Androids using the ECAPA-TDNN backbone, LMAD^w achieves a macro-F1 of 0.62 (hc: 0.60, dp: 0.65), vastly outperforming the baseline Eb (0.39) and MDFA (0.42). On Androids to DAIC-WoZ transfer, LMAD^w with ECAPA-TDNN reaches 0.56 macro-F1 compared to baseline Eb's 0.44 and MDFA's 0.51. Within-corpus performance is also maintained or improved, with DAIC-WoZ within-corpus macro-F1 rising from 0.65 to 0.70.

Ablation comparisons show that incorporating gradient-aware adaptive weighting (LMAD^w) consistently surpasses unweighted layer-wise disentanglement (LMAD^n), which suffered from oscillatory inter-layer allocation (e.g., dropping to 0.31 depression proportion at the final layer). UMAP visualizations confirm that LMAD^w successfully removes corpus-induced separation while preserving clean boundaries between healthy and depressed subjects.

| System / Condition | DAIC -> Androids (Macro-F1) | Androids -> DAIC (Macro-F1) | DAIC Within (Macro-F1) |
| :--- | :--- | :--- | :--- |
| ECAPA-TDNN Baseline | 0.39 | 0.44 | 0.65 |
| MDFA [13] | 0.42 | 0.51 | 0.72 |
| LMAD^n (Unweighted, Eb) | 0.52 | 0.55 | 0.73 |
| LMAD^w (Adaptive, Eb) | **0.62** | **0.56** | **0.76** |

## Limitations

The set of key encoder layers targeted for disentanglement is selected manually and a priori, which may not represent the globally optimal layer configuration for alternative backbones. Evaluation is currently constrained to bidirectional transfer between two specific clinical and spontaneous-speech corpora (English and Italian), leaving multi-corpus and multilingual scalability unverified.

## Why read this

Speech and ML researchers tackling domain generalization and representation shift in paralinguistic tasks should read this paper to learn how to combine layer-wise HSIC dependence constraints with gradient-aware weighting. It offers a principled blueprint for preventing nuisance accumulation across deep network hierarchies without destroying task-relevant geometry.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated cross-corpus mental health screening, remote speech-based depression monitoring, and robust paralinguistic diagnostic tools for clinical deployment.

## Institutions / 機構

Nagoya Institute of Technology, University of Wollongong

**Funding / 經費:** Ministry of Education, Culture, Sports, Science and Technology-Japan, National Institute of Information and Communications Technology

## Related

- [Learning to Attend to Depression-Related Patterns: An Adaptive Cross-Modal Gating Network for Depression Detection](yu26c_interspeech.md) — same problem · relatedness 2.7/3
- [Moot-Court: Training-Free Dialectical Reasoning for Depression Detection](sun26i_interspeech.md) — same problem · relatedness 2.6/3
- [Label Correction Enhanced Dual-Stream Multiple Instance Learning for Weakly-Supervised Depression Detection in Speech](sun26e_interspeech.md) — same problem · relatedness 2.6/3
- [Who is Speaking or Who is Depressed? A Controlled Study of Speaker Leakage in Speech-Based Depression Detection](yeh26_interspeech.md) — same problem · relatedness 2.5/3
- [FedMPA: A Novel Privacy-Performance Optimization Approach for Multimodal Speech-Based Depression Detection](manamalage26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
