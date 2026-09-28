---
id: sung26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1947
pdf: https://www.isca-archive.org/interspeech_2026/sung26_interspeech.pdf
---

# fMRI Decoding of Speech Conditions Across Brain Regions of Interest for Neural Evaluation of Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/sung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1947)

**TL;DR** — The paper introduces NeuroPAS-Net, a three-phase transfer learning framework that decodes clean versus noisy speech from fMRI data with a peak accuracy of 79.3% in the right precentral gyrus.

## Problem

Decoding clean versus noisy speech from high-dimensional fMRI multivoxel patterns is hindered by high cross-subject variability and complex functional organization. Furthermore, existing decoding methods are rarely translated into continuous, objective metrics that can evaluate and rank speech enhancement (SE) algorithms against behavioral intelligibility.

## Method

The framework, NeuroPAS-Net, relies on a three-phase training recipe using a CNN encoder: self-supervised learning (SSL) via masked reconstruction on unlabeled data (Phase 1), task-incremental learning (IL) with replay for binary condition classification (Phase 2), and supervised fine-tuning (SFT) on target subject data (Phase 3). It was evaluated on 25 participants listening to 96 sentences across clean, noisy (-3 dB speech-shaped noise), and enhanced conditions (using SEMamba for DNN-SE and MMSE for Classic-SE). The model leverages up to 11,669 voxels per region of interest (ROI).

## Results

Evaluated across 12 bilateral speech-related ROIs using leave-one-run-out cross-validation, NeuroPAS-Net consistently outperformed L2-regularized SVM and standard CNN baselines. The right precentral gyrus (R PreCG) achieved the highest decoding accuracy of 79.3%. An ablation study across five top ROIs showed that adding SSL and IL progressively improved performance over SFT alone (e.g., L PreCG rising from 66.5% to 69.3%). The derived NeuroPAS metric correlated with subjective intelligibility (Spearman rho = 0.43) and showed that DNN-SE elicits neural patterns closer to clean speech (mean score 0.60) than Classic-SE (0.41).

## Code

- https://github.com/JohnSung0501/fMRI-Decoding

## Applications

Speech and ML engineers evaluating or designing neural speech enhancement algorithms using brain imaging data.

## Limitations

Evaluated on a relatively small cohort of 25 normal-hearing young adults listening to Mandarin sentences.

## Related

- (link related pages by id as the wiki grows)
