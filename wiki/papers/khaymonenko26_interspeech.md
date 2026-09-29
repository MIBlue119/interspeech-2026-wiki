---
id: khaymonenko26_interspeech
category: asr
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-987
pdf: https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.pdf
---

# Scalable Keyword Spotting via Modular Network Expansion

*Viktor Khaymonenko, Dzmitry Saladukha, Aliaksei Rak, Alexander Rostov*

[PDF](https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/khaymonenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-987)

**Category:** `asr` · **Labels:** `efficient-on-device`

**TL;DR** — This paper presents a modular neural network expansion method for embedded keyword spotting that adds new trigger words without requiring original training data or causing regressions on existing keywords, reducing average new-keyword false reject rate (FRR) from 6.46% to 4.37% compared to a separate-model baseline.

## Key contributions

- A parameter-capped modular expansion architecture (≤10k added parameters) that completely freezes the base KWS model, batch-normalization statistics, and core classifier for strict non-regression guarantees.
- A core-first inference decision rule that runs the lightweight new-keyword branch only when the frozen core detector rejects the input, bounding worst-case compute.
- Comprehensive empirical evaluation across 5 held-out keyword pairs on Google Speech Commands v2, outperforming adapters, LoRA, and independent ensemble baselines.
- Demonstration of superior computational efficiency, requiring 16.34M MACs compared to 18.45M for adapters and 20.52M for LoRA under identical parameter budgets.

## Problem

Embedded keyword spotting models deployed on resource-constrained devices often require vocabulary updates after release to support new triggers or locales. Updating these models is challenging because original training data are frequently unavailable due to privacy or storage constraints, full retraining is too compute-intensive, and updates risk catastrophic forgetting or performance regressions on pre-existing keywords. Traditional open-vocabulary or few-shot alternatives sacrifice robustness under noisy real-world conditions and struggle to distinguish phonetically similar commands compared to dedicated fixed-vocabulary systems.

## Method

The base network follows a small-footprint SVDF-style encoder architecture consisting of Base Blocks with batch-normalization, hard-swish activations, and dropout, mapping 40-bin log-mel filterbank features to a core classification head (totaling ~150k parameters). During expansion, the entire base model is frozen—including batch-normalization running statistics and affine parameters—and a parameter-capped modular branch with a separate new-keyword head is attached. The expansion path comprises L Expanded Blocks (optimized at L=4 via ablation), where each block concatenates activations tapped from a frozen Base Block with the previous expanded state, passing them through a temporal 1D convolution, batch-normalization, and hard-swish activation. 

At inference, a core-first decision rule evaluates the shipped core model and its exact original per-keyword thresholds first; only if the input is rejected as background (∅) does the system evaluate the new-keyword head using its own calibrated thresholds. This guarantees that base model outputs and decisions remain bit-exact and unchanged for all inputs matching the core vocabulary. Training utilizes only the new-keyword dataset D2 (without access to D1 audio) via the Adam optimizer with a cosine learning-rate schedule for 10 epochs, incorporating SpecAugment on the log-mel features for robustness.

## Experimental setup

Experiments use the Google Speech Commands v2 (GSC) dataset evaluated across 5 held-out command pairs ({left, right}, {on, off}, {stop, go}, {up, down}, {yes, no}) serving as new keywords Y2, with the remaining 8 commands acting as the core set Y1. Mozilla Common Voice v17 is used as a negative-only corpus for false accept rate (FAR) calibration at 1%. Baselines include Full Finetune, Elastic Weight Consolidation (EWC), Head-Only tuning, independent Ensemble, Adapters, and LoRA. Performance is reported as macro false reject rate (FRR) averaged across 8 independent runs with 95% confidence intervals.

## Results

Modular expansion achieves an average new-keyword FRR of 4.37%, outperforming the independent ensemble baseline at 6.46%, LoRA at 6.41%, and adapters at 8.05%, while using fewer worst-case MACs (16.34M vs 18.45M for adapters and 20.52M for LoRA). Ablation studies on expansion depth reveal that tapping 4 base blocks achieves the optimal median FRR, whereas shallower expansions (1-3 blocks) suffer from insufficient semantic abstraction and deeper layers cause plateauing due to core-vocabulary over-specialization. Unconstrained full fine-tuning yields a catastrophic regression on core phrases, driving core FRR up from 2.71% to 69.08%.

| Method | Params (K) | MACs (M) | New-Keyword FRR (%) |
|---|---|---|---|
| Base Model / Full Finetune | 150 | 15.08 | 2.35 |
| Head-Only | 151 | 15.16 | 22.30 |
| Ensemble | 160 | 16.14 | 6.46 |
| Adapters | 160 | 18.45 | 8.05 |
| LoRA | 160 | 20.52 | 6.41 |
| Proposed (Modular Expansion) | 160 | 16.34 | 4.37 |

## Limitations

The evaluation is restricted to single-stage expansion of fixed-vocabulary keyword spotting on small embedded footprints, meaning multi-stage sequential expansion remains untested under these exact bounds. The study assumes disjoint sets of keywords and relies on Mozilla Common Voice exclusively for negative distribution calibration, which may not capture all domain-specific acoustic noise profiles. Furthermore, the parameter budget is strictly capped at 10k additional parameters, which may constrain capacity if scaling to significantly larger inventories.

## Why read this

Speech and ML engineers building always-on, embedded keyword spotting systems who need to add new vocabulary post-deployment without retraining on confidential base data or risking regressions on legacy triggers should read this paper. It provides a concrete blueprint for zero-forgetting modular expansion that beats parameter-efficient tuning methods like LoRA and adapters in both accuracy and inference compute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smartphones, IoT devices, wearables, and always-on voice-controlled embedded systems requiring safe, on-device vocabulary updates.

## Institutions / 機構

Yandex

## Related

- (link related pages by id as the wiki grows)
