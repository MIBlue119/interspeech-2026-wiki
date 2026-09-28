---
id: gao26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-244
pdf: https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.pdf
---

# HistoMatch: Unified Transient-Steady Assessment for Noise-Robust Semi-Supervised Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gao26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-244)

**TL;DR** — HistoMatch introduces a dual-state stability evaluator combining transient confidence and historical prediction consistency for noise-robust semi-supervised speaker verification, achieving an EER of 0.91% on VoxCeleb1-O.

## Problem

Standard pseudo-labeling approaches in semi-supervised learning rely on instantaneous confidence thresholds, making them fragile against random segmentation and noise augmentations typical in speaker verification pipelines. This vulnerability leads to prediction drift, inaccurate pseudo-labels, and underutilization of valid training data. Overcoming this limitation is crucial for training high-performing speaker recognition models when large annotated datasets are unavailable.

## Method

The proposed HistoMatch framework integrates a Dual-state History-based Stability Evaluator (DHSE) that combines transient-state confidence filtering with steady-state historical prediction consistency. For each unlabeled sample, the system maintains a temporal prediction queue over the preceding K epochs to tally maximum identical class prediction counts, recovering high-quality samples that fall below transient confidence thresholds due to segmentation or noise artifacts. Cross-entropy loss is replaced with Additive Angular Margin (AAM) loss to optimize hyperspherical feature embedding and class separability. The network utilizes an ECAPA-TDNN backbone trained with 4-second input segments, dual-stage MUSAN and RIR data augmentations, and exponential moving average (EMA) adaptive thresholds.

## Results

Evaluated on VoxCeleb1 test sets (VoxCeleb1-O, E, and H) using VoxCeleb2 as the training source with varying label proportions (4, 10, and 20 samples per speaker), HistoMatch establishes new state-of-the-art results among semi-supervised methods. Under the 20-samples-per-speaker setting, it achieves EERs of 0.91%, 1.13%, and 2.13% on VoxCeleb1-O, E, and H respectively, yielding a 16.5% relative improvement over prior art and closely matching fully supervised performance. Ablation studies confirm that removing either the transient or steady-state threshold components results in severe performance drops.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners developing speaker verification systems in domains where large-scale labeled audio data is scarce or expensive to acquire, such as healthcare and finance.

## Related

- (link related pages by id as the wiki grows)
