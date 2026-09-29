---
id: kim26r_interspeech
category: deepfake-security
labels: [robustness-noise]
institutions: ["Soongsil University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2216
pdf: https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.pdf
---

# GradHarmony: A Gradient Alignment and Magnitude Normalization Strategy for Audio Deepfake Detection

*Inho Kim, Thien-Phuc Doan, Souhwan Jung*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2216)

**Category:** `deepfake-security` · **Labels:** `robustness-noise`

**TL;DR** — GradHarmony introduces a Clean-referenced Gradient Alignment (CGA) and EMA-based Magnitude Normalization (EMA-MN) strategy to stabilize multi-augmentation training in audio deepfake detection, achieving an average 22% reduction in equal error rate (EER) on out-of-domain datasets across state-of-the-art models.

## Key contributions

- Identifies and categorizes two key optimization pathologies in multi-augmentation audio deepfake training: directional conflicts (angles > 90°) and gradient magnitude imbalances.
- Proposes Clean-referenced Gradient Alignment (CGA), which anchors augmented gradients against the clean reference gradient to maintain directional consistency without independent task objectives.
- Proposes Exponential Moving Average-based Magnitude Normalization (EMA-MN) with conflict-aware clipping to prevent scale dominance from heterogeneous augmentation signals.
- Demonstrates consistent model-agnostic generalization gains and faster convergence (fewer epochs) across both non-SSL (AASIST, RawNet2, RawGATST) and SSL-based (SSL-AASIST, SSL-Conformer) architectures.

## Problem

In audio deepfake detection (ADD), data augmentation is critical for generalization, but standard multi-augmentation training introduces severe optimization instability due to conflicting gradient directions and magnitude discrepancies between clean and perturbed samples. Prior multi-task gradient alignment methods like PCGrad and GradVac assume independent task objectives and perform pairwise alignment, failing to provide a coherent reference direction when multiple augmented views coexist with clean data. Furthermore, while previous methods address directional misalignment in single-augmentation settings, they completely overlook gradient magnitude imbalances where specific perturbations dominate the parameter update trajectory. This optimization friction degrades out-of-domain generalization and causes training inefficiency in ADD models.

## Method

GradHarmony processes mini-batches composed of 50% clean and 50% augmented samples (equally split across RawBoost, MUSAN, and Room Impulse Response perturbations). Separate losses are computed for the clean subset and each augmentation type to obtain independent gradients g^(C) and g^(k). 

First, Clean-referenced Gradient Alignment (CGA) acts on augmented gradients exhibiting negative inner products with the clean reference gradient, modifying them via PCGrad-style projection (g_tilde^(k) = g^(k) - ((g^(k) . g^(C)) / ||g^(C)||^2) g^(C)) so that all aligned gradients satisfy the condition <g^(C), g_tilde^(k)> >= 0. The clean gradient itself remains fixed as an un-updated optimization anchor.

Second, Exponential Moving Average-based Magnitude Normalization (EMA-MN) stabilizes gradient scales. After a 100-iteration warm-up (N_w), the median L2 norm of mini-batch gradients is smoothed via an EMA with coefficient beta = 0.99. A conflict-aware clipping threshold is then applied, utilizing a stricter scale for gradients that originally conflicted with the clean reference while applying a multiplier alpha = 2 to non-conflicting ones. The normalized gradients are summed with the clean gradient to form the final parameter update, avoiding magnitude dominance while preserving directional alignment.

## Experimental setup

Models were trained on the ASVspoof 2019 Logical Access dataset and evaluated on out-of-domain and in-domain benchmarks including ASVspoof 2021 DeepFake (DF21), In-the-Wild (ITW), DSD-Corpus (DSD), and Fake-or-Real (FoR), measuring performance via Equal Error Rate (EER %). Evaluated architectures include non-SSL models (AASIST, RawNet2, RawGATST) and self-supervised models (SSL-AASIST, SSL-Conformer) implemented using an NVIDIA RTX Pro 6000 GPU with fixed hyperparameters (beta=0.99, alpha=2, N_w=100).

## Results

GradHarmony consistently outperforms standard baselines and naive multi-augmentation training across architectures and evaluation domains, achieving an average 22% reduction in EER on out-of-domain benchmarks. For AASIST, GradHarmony reduces DF21 EER from 21.07% (baseline) to 17.70%, ITW from 43.00% to 33.71%, DSD from 36.55% to 26.08%, and FoR from 26.59% to 21.68%, while decreasing required training epochs from 60 to 45. Ablation studies confirm that combining both CGA and EMA-MN is necessary; using CGA alone or EMA-MN alone yields inconsistent or inferior cross-domain results, and replacing PCGrad with GradVac preserves the performance gains.

| System | DF21 (%) | ITW (%) | DSD (%) | FoR (%) |
|---|---|---|---|---|
| AASIST (Baseline) | 21.07 | 43.00 | 36.55 | 26.59 |
| AASIST (Augmentation) | 18.49 | 37.86 | 34.76 | 26.67 |
| AASIST + GradHarmony (PCGrad) | 17.70 | 33.71 | 26.08 | 21.68 |
| SSL-AASIST (Baseline) | 3.81 | 10.44 | 26.49 | 9.71 |
| SSL-AASIST (Augmentation) | 5.36 | 11.60 | 25.28 | 7.77 |
| SSL-AASIST + GradHarmony (PCGrad) | 3.74 | 7.04 | 19.98 | 6.48 |

## Limitations

The strategy relies on a fixed hyperparameter scale factor (alpha) and a static choice of clean data as the optimization reference anchor without adaptive data-driven selection. Evaluation is restricted to standard audio deepfake datasets and three traditional augmentation types (RawBoost, MUSAN, RIR), leaving broader hyper-scale web data variations and multi-language acoustic scenarios unverified.

## Why read this

Speech and security researchers building robust audio deepfake detectors should read this paper to understand how multi-augmentation optimization failures manifest as gradient conflicts and magnitude imbalances, and how to fix them with clean-referenced anchors and EMA normalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio deepfake detection systems, voice biometrics security, forensic audio authentication, and robust anti-spoofing modules for conversational speech interfaces.

## Institutions / 機構

Soongsil University

**Funding / 經費:** Korea Institute of Police Technology, Korean National Police Agency, National Research Foundation of Korea, Ministry of Science and ICT

## Related

- [Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection](liu26g_interspeech.md) — same problem · relatedness 2.8/3
- [Diffusion Reconstruction towards Generalizable Audio Deepfake Detection](cheng26_interspeech.md) — same problem · relatedness 2.8/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.7/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.7/3
- [DGS-MLDG: Domain Gradient Surgery Guided Meta-Learning for Domain Generalization in Speech Deepfake Detection](qin26_interspeech.md) — same problem · relatedness 2.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
