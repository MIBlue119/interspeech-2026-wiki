---
id: kim26r_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2216
pdf: https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.pdf
---

# GradHarmony: A Gradient Alignment and Magnitude Normalization Strategy for Audio Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26r_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2216)

**TL;DR** — GradHarmony resolves gradient directional conflicts and magnitude imbalances during multi-augmentation training in audio deepfake detection, achieving an average 22% reduction in equal error rate on out-of-domain datasets across state-of-the-art models.

## Problem

Data augmentation is essential for generalizing audio deepfake detectors, but training with multiple simultaneous augmentations introduces optimization instability due to directional gradient misalignment and magnitude imbalances between clean and perturbed samples. These discrepancies cause parameters to be updated suboptimally or become biased toward dominant augmentation types. Because conventional gradient surgery methods only handle pairwise or multi-task scenarios without a clear unified reference, multi-augmentation ADD training suffers from persistent conflicts and scaling disparities.

## Method

The proposed GradHarmony strategy combines Clean-referenced Gradient Alignment (CGA) and Exponential Moving Average-based Magnitude Normalization (EMA-MN). CGA treats the gradient computed from clean training samples as a fixed optimization anchor and adjusts only those augmented gradients that exhibit a negative inner product with the clean reference. EMA-MN then stabilizes training by tracking the median gradient norm via exponential moving averaging (beta=0.99) and applying conflict-aware clipping thresholds (scale factor alpha=2 after a 100-iteration warm-up) exclusively to augmented gradients. Mini-batches are structured with a 50-50 split between clean samples and uniformly distributed augmentations (RawBoost, MUSAN, RIR). The approach is model-agnostic and evaluated across non-SSL architectures (AASIST, RawNet2, RawGATST) and self-supervised models (SSL-AASIST, SSL-Conformer).

## Results

Evaluated on ASVspoof 2019 Logical Access (training) and tested on ASVspoof 2021 DeepFake (DF21), In-the-Wild (ITW), DSD-Corpus (DSD), and Fake-or-Real (FoR) datasets using Equal Error Rate (EER). GradHarmony improves or restores in-domain performance on DF21 while yielding substantial out-of-domain error reductions (e.g., lowering AASIST's FoR EER from 36.55% baseline and 34.76% standard augmentation down to 26.08%). It also accelerates convergence, requiring significantly fewer training epochs than standard multi-augmentation baselines. Ablation studies confirm that combining both CGA and EMA-MN components is necessary to maximize generalization across diverse acoustic testing conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building robust speech anti-spoofing and audio deepfake detection systems that rely on diverse data augmentations to handle real-world acoustic variations.

## Related

- (link related pages by id as the wiki grows)
