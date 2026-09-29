---
id: gao26b_interspeech
category: speaker
institutions: ["Chinese Academy of Sciences", "University of Chinese Academy of Sciences"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-244
pdf: https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.pdf
---

# HistoMatch: Unified Transient-Steady Assessment for Noise-Robust Semi-Supervised Speaker Verification

*Shenghan Gao, Xueshuai Zhang, Pengyuan Zhang, Yonghong Yan*

[PDF](https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-244)

**Category:** `speaker`

**TL;DR** — HistoMatch introduces a Dual-state History-based Stability Evaluator (DHSE) that combines transient confidence with steady-state historical prediction stability to filter pseudo-labels for semi-supervised speaker verification, achieving state-of-the-art EERs down to 0.91% on VoxCeleb1-O.

## Key contributions

- Proposes HistoMatch, a semi-supervised speaker verification framework tailored to handle noise-robustness and segmentation perturbations in pseudo-labeling.
- Develops the Dual-state History-based Stability Evaluator (DHSE) combining transient confidence thresholds with steady-state historical prediction consistency.
- Replaces Cross-Entropy loss in the Match framework with Additive Angular Margin (AAM) loss to align with cosine-based speaker verification scoring.
- Achieves new SOTA semi-supervised results on VoxCeleb1 test sets (O, E, H), approaching fully supervised performance levels.

## Problem

Semi-supervised speaker verification using pseudo-labeling often relies on transient confidence thresholds, which fail under acoustic variability caused by random audio segmentation slicing and strong noise/RIR augmentations. Prior methods like FixMatch, FlexMatch, FreeMatch, and SoftMatch yield marginal gains or low sample utilization when applied to speaker verification. This matters because acquiring large annotated speech datasets is expensive, yet standard match paradigms suffer from severe prediction drift in noisy, variable-length audio conditions.

## Method

HistoMatch builds upon a FixMatch-style semi-supervised pipeline using an ECAPA-TDNN encoder and an Additive Angular Margin (AAM) classification loss (with margin 0.2, scale 30) instead of standard Cross-Entropy, better matching hyperspherical speaker embedding geometry. The core innovation is the Dual-state History-based Stability Evaluator (DHSE), which performs joint filtering using a transient-state threshold (tau_t) over weak-augmentation probabilities and a steady-state historical convergence metric (S_t).

For steady-state filtering, HistoMatch maintains a temporal prediction queue Q_i = [q_i^{E-K}, ..., q_i^{E-1}] storing the argmax class predictions of each unlabeled sample over the preceding K epochs. The maximum identical prediction count S_t counts how often a sample is assigned to the same class, filtering out noise- or slicing-induced jitter. Thresholds for both states are dynamically updated using Exponential Moving Average (EMA) with a momentum factor of 0.999. The final loss combines supervised AAM loss on labeled data with consistency loss on dynamically selected high-confidence and historically stable unlabeled subsets.

## Experimental setup

Trained on the VoxCeleb2 dataset (1,092,009 utterances, 5,994 speakers) and evaluated on VoxCeleb1-O, VoxCeleb1-E, and VoxCeleb1-H test sets. Labeled data splits are configured as 4, 10, and 20 samples per speaker (where 10 samples represents 6% of the data). Baselines include FixMatch, FlexMatch, FreeMatch, SoftMatch, Int*-Match, and SpeakerMatch. The backbone is primarily ECAPA-TDNN with 1024 channels (ECAPA-L) alongside 512-channel variants (ECAPA-S) for ablations. Trained for 60 epochs (approx. 290k steps) with a 10-epoch linear warmup up to 0.3, decaying via cosine annealing to 1e-4, using a labeled batch size of 32 and an unlabeled-to-labeled ratio mu=7 with MUSAN and RIR augmentations.

## Results

HistoMatch establishes a new state-of-the-art across all VoxCeleb1 test sets. Under the 20 samples per speaker setting, it achieves EERs of 0.91% (Vox1-O), 1.13% (Vox1-E), and 2.13% (Vox1-H), delivering a 16.5% relative improvement over previous state-of-the-art methods and closely matching fully supervised performance (0.87%, 1.12%, 2.12%). Ablation experiments using the ECAPA-S backbone demonstrate that removing either the transient or steady-state filter degrades performance, with the full DHSE configuration reaching a 1.08% EER compared to 1.33% for baseline FixMatch and 1.87% when using only transient filtering.

| System | Vox1-O (EER%) | Vox1-E (EER%) | Vox1-H (EER%) |
|---|---|---|---|
| FixMatch* (10 samples) | 1.20 | 1.27 | 2.39 |
| FlexMatch* (10 samples) | 1.11 | 1.30 | 2.37 |
| SoftMatch* (10 samples) | 1.51 | 1.60 | 2.86 |
| SpeakerMatch (10 samples) | 1.19 | 1.40 | 2.57 |
| HistoMatch (ours, 10 samples) | 1.08 | 1.17 | 2.21 |
| Fully Supervised [19] | 0.87 | 1.12 | 2.12 |

## Limitations

The evaluation is restricted to clean and noisy benchmark splits derived from VoxCeleb, leaving real-world domain shifts like telephone telephony speech or extreme channel degradation unexplored. The historical prediction queue introduces memory and compute overhead across epochs. Language coverage is implicitly constrained by VoxCeleb's primarily English/multinational celebrity makeup.

## Why read this

Researchers and engineers working on semi-supervised speaker verification or audio representation learning facing noisy labels and data scarcity should read this to understand how historical stability queues solve augmentation-induced pseudo-label drift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building production-grade speaker verification and biometric authentication systems under low-resource, label-scarce conditions.

## Institutions / 機構

Chinese Academy of Sciences, University of Chinese Academy of Sciences

## Related

- [Self-supervised Speaker Verification with High-Confidence Pseudo-Label Selection and DINO-Style Self-Distillation Based on Pre-trained Models](li26ca_interspeech.md) — same problem · relatedness 2.9/3
- [Continuous 2D Spectral—Temporal Transformer for Speaker Verification](ham26_interspeech.md) — same problem · relatedness 2.5/3
- [Temporal Ensembling Threshold and Neighbor-Aware Label Mixup for Speaker Verification with Open-Set Noisy Labels](fang26_interspeech.md) — same problem · relatedness 2.4/3
- [Learning Multiple Utterance-Level Attribute Representations with a Unified Speech Encoder](bouziane26_interspeech.md) — shared data / evaluation · relatedness 2.3/3
- [ReDimNet2: Scaling Speaker Verification via Time-Pooled Dimension Reshaping](yakovlev26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
