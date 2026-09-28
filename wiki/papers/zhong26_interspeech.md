---
id: zhong26_interspeech
category: dysarthria-assessment
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-692
pdf: https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.pdf
---

# Uncovering Dimension-Specific Layer Preferences in Wav2Vec2 for Fine-Grained Perceptual Assessment of Dysarthric Speech

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-692)

**TL;DR** — This paper performs a systematic layer-wise analysis of Wav2Vec2 across 25 Darley–Aronson–Brown (DAB) perceptual dimensions for dysarthric speech assessment, showing that learnable scalar mixing across layers outperforms single-layer baselines.

## Problem

Auditory-perceptual analysis using clinical frameworks like the DAB system is the gold standard for assessing motor speech disorders like dysarthria, but automated tools are hindered by a scarcity of granular clinical annotations and the common default practice of extracting features from only the final layer of self-supervised models. Because DAB dimensions reflect diverse acoustic-linguistic traits tied to different speech subsystems, relying on a single layer discards vital cues distributed across the encoder hierarchy, while prior datasets predominantly offer coarse global severity labels rather than multi-dimensional clinical ratings.

## Method

The authors propose a two-stage framework built on the Speech Accessibility Project (SAP) corpus containing 368,155 utterances from 959 speakers. In Stage 1, unsupervised domain adaptation (UDA) is performed on Wav2Vec2-Large using LoRA adapters (rank 32 across all 24 transformer layers) with the contrastive masked prediction objective on unrated SAP data. In Stage 2, the adapted encoder is frozen, and features are extracted to train dimension-specific CORAL loss heads either via single-layer linear probing or via global and per-dimension learnable scalar mixing combined with a refinement convolutional neck.

## Results

Evaluated on a speaker-disjoint stratification of SAP's labeled subset (8,637 training, 1,029 dev, and 1,392 test utterances) using Mean Absolute Error (MAE) and Spearman's rank correlation (rho), LoRA-based UDA improves representation quality across most layers. Probing demonstrates that the optimal layer varies by dimension (the final layer is optimal for zero dimensions under the adapted model). Scalar mixing improves overall performance over the single-layer baseline with a refinement neck, reducing MAE from 0.47 to 0.43-0.44 and increasing average Spearman correlation from 0.41 to 0.46-0.47. Learned layer weights align intuitively with speech subsystems, where phonation dimensions favor earlier layers and articulatory/global outcomes favor upper-mid layers.

## Code

- https://github.com/Kanelmis/UDS

## Applications

Speech-language pathologists and clinical engineers building automated, multi-dimensional speech profiling systems for objective diagnosis and progress tracking of motor speech disorders.

## Limitations

The study evaluates only Wav2Vec2-Large, uses a lightweight architecture for scalar mixing, and does not explicitly address severe label imbalance and skewness toward typical values across several perceptual dimensions.

## Related

- (link related pages by id as the wiki grows)
