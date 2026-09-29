---
id: hasan26_interspeech
category: paralinguistics-emotion
labels: [low-resource]
institutions: ["Bangladesh University of Engineering and Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3374
pdf: https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.pdf
---

# Dual-Stream DNN-KAN Networks with Bangla-Specific Features for Speech Emotion Recognition

*Kazi Reyazul Hasan, Muhammad Abdullah Adnan*

[PDF](https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hasan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3374)

**Category:** `paralinguistics-emotion` · **Labels:** `low-resource`

**TL;DR** — A 1.1M-parameter dual-stream DNN-KAN network combining MFCC spectral features with statistically optimized prosodic descriptors achieves 92.12% speaker-independent accuracy on the SUBESCO Bangla SER dataset.

## Key contributions

- A dual-stream architecture routing MFCCs through factorized DNNs and prosodic descriptors through lightweight KANs with shared quadratic B-spline basis functions.
- A systematic statistical feature selection pipeline (using eta-squared thresholds > 0.94) that identifies 15 highly discriminative acoustic features yielding 51 prosodic descriptors across 3 temporal scales.
- A cross-attention mechanism and emotion-adaptive gating network that dynamically weights spectral and prosodic streams based on predicted emotional arousal.
- Enforcement of rigorous speaker-independent (SI) evaluation protocols for Bangla SER to prevent speaker memorization from inflating accuracy.

## Problem

Speech emotion recognition for Bangla—spoken by over 300 million people—remains underexplored, and models trained on English generalize poorly. Large pre-trained models like wav2vec2 (326M parameters) are computationally prohibitive and lack interpretability, whereas traditional CNN-LSTM models process generic spectral features while ignoring language-specific prosodic properties. Furthermore, prior Bangla SER literature predominantly relies on speaker-dependent evaluation, yielding inflated metrics driven by speaker memorization rather than genuine emotional generalization.

## Method

The model ingests a 131-dimensional vector composed of an 80-dimensional spectral descriptor (40 frame-level LLDs summarized by mean and std) and 51 prosodic descriptors. Spectral features pass through factorized DNN blocks using GELU activations and linear projection shortcuts ($d_{mid} \approx 181$), reducing parameters by ~29%. Prosodic features pass through lightweight Kolmogorov-Arnold Networks (KANs) featuring shared quadratic B-spline basis functions across inputs combined with unique control points per output neuron, cutting spline parameters by 98%. 

Bidirectional cross-attention modules facilitate feature exchange between streams at early (128D) and late (256D) stages. An emotion-adaptive gating network processes the concatenated features to generate emotion-specific stream weights without teacher forcing, allocating higher prosodic weight to high-arousal emotions like anger (0.87) and higher spectral weight to low-arousal emotions like sadness. The fused 512D representations pass through a bottleneck layer (512 -> 384 -> 512) and a classification head.

The system is trained using PyTorch on an NVIDIA P100 with a learning rate of 5×10⁻⁴, weight decay of 0.015, dropout of 0.3, and a batch size of 16 for up to 200 epochs with early stopping (patience 50). Data augmentation is entirely excluded to maintain strict reproducibility.

## Experimental setup

Evaluated on five corpora: SUBESCO (7,000 utterances, 20 speakers, 7 classes), BanglaSER (1,979 utterances, 34 speakers, 6 classes), RAVDESS, EMOVO, and EmoDB. Performance is primarily measured via speaker-independent (SI) accuracy using strict speaker-disjoint splits (16/4 split for SUBESCO, 25/9 for BanglaSER), supplemented by speaker-wise 5-fold cross-validation.

## Results

Under speaker-independent evaluation, the 1.1M-parameter DNN-KAN model achieves 92.12% accuracy on SUBESCO and 82.79% on BanglaSER, outperforming emotion2vec (25M parameters, 89.42% SI) by 2.70% and wav2vec2-xlsr (326M parameters, 91.05% SI) by 1.07% on SUBESCO while utilizing 23x to 300x fewer parameters. 

Ablation studies show that adding statistical prosodic features improves the DNN-only baseline from 79.83% to 83.14%, upgrading the prosodic processor to a KAN adds +1.22%, cross-attention contributes +1.64%, and emotion gating adds +0.81% to reach 92.12%. Cross-dataset tests on Western corpora show performance drops due to domain shift, but retraining the feature-selection pipeline directly on EmoDB elevates EmoDB accuracy from 87.85% to 93.92%.

| System / Condition | Params | SUBESCO (SI Acc %) | BanglaSER (SI Acc %) |
|---|---|---|---|
| Baseline (DNN only) | 0.6M | 79.83 | — |
| emotion2vec [21] | 25M | 89.42 | 80.41 |
| wav2vec2-xlsr [35] | 326M | 91.05 | 85.17 |
| Ours (Full DNN-KAN) | 1.1M | 92.12 | 82.79 |

## Limitations

Feature-discriminability analysis was performed exclusively on SUBESCO data, contributing to a noticeable 9.33-point SI performance drop on the more conversational BanglaSER corpus. The KAN component provides modest standalone gains, and the cross-domain performance drop lacks a formal underlying distributional analysis.

## Why read this

Researchers and engineers looking to build highly efficient, interpretable speech emotion recognition systems for low-resource languages will find a concrete blueprint for replacing massive self-supervised models with statistically optimized feature engineering and KANs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Empathetic human-computer interaction, mental health monitoring, and automated customer service systems.

## Institutions / 機構

Bangladesh University of Engineering and Technology

**Funding / 經費:** Basic Research Grant from Bangladesh University of Engineering and Technology

## Related

- [SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition](vo26_interspeech.md) — same problem · relatedness 2.5/3
- [Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition](song26c_interspeech.md) — same problem · relatedness 2.4/3
- [Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention](wang26u_interspeech.md) — same problem · relatedness 2.4/3
- [MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition](song26b_interspeech.md) — same problem · relatedness 2.3/3
- [SISER: Speaker-Invariant Speech Emotion Recognition with Entropy-Based Adversarial Training](choi26e_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
