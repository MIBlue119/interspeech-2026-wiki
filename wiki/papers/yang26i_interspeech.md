---
id: yang26i_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1524
pdf: https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.pdf
---

# A Dynamic Knowledge Distillation Framework for Mitigating Spatial Ambiguity in Lightweight Dual-Channel Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1524)

**TL;DR** — The paper introduces a dynamic spatial-aware knowledge distillation framework that mitigates spatial ambiguity in lightweight dual-channel speech enhancement models, improving closely-spaced source separation without adding inference overhead.

## Problem

Lightweight multi-channel speech enhancement models leverage microphone arrays to improve separation via spatial cues, but their performance drops significantly when target speakers and interferers are closely spaced due to spatial ambiguity and unconstrained spatial reliance. Existing methods to address this either require expensive joint distance estimation multi-task frameworks, depend on explicit direction-of-arrival metadata, or add auxiliary components that inflate deployment overhead on edge devices. Overcoming this is crucial for maintaining robust real-time front-end processing in challenging acoustic environments.

## Method

The proposed Dynamic Spatial-aware Knowledge Distillation (D-SKD) framework transfers robust spectral-only invariants from a pre-trained single-channel teacher (SC-GTCRN) to a dual-channel student (DC-GTCRN) during training. It introduces a Dynamic Arbitrator Module (DAM) that computes sample-wise relative performance gaps and applies a smooth gating function via hyperbolic tangent and ReLU to activate distillation exclusively when the teacher outperforms the student. The total training loss combines the standard hybrid loss (combining SI-SNR and complex spectral losses) with a dynamic distillation loss, ensuring spatial processing capabilities are preserved elsewhere. The method requires zero additional parameters, memory, or computational overhead during inference.

## Results

Evaluated on simulated 16 kHz DNS-3 datasets across segmented-angle, average-angle, and angular-scan test sets at 5 dB SNR, the proposed D-SKD framework consistently boosts DC-GTCRN performance. On the closely-spaced 0 degrees to 15 degrees test set, D-SKD raises PESQ from 1.742 to 1.793 and STOI from 71.80% to 72.96%, outperforming hard arbitration and non-arbitrated distillation baselines while preserving or improving scores across wider angular intervals.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building real-time speech enhancement front-ends for resource-constrained edge devices like smart glasses, wearables, and teleconferencing hardware.

## Limitations

Evaluated primarily on single interferer scenarios with fixed two-microphone arrays spaced at 4 cm under simulated room impulse responses.

## Related

- (link related pages by id as the wiki grows)
