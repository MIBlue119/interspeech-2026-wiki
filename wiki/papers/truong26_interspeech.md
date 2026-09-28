---
id: truong26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1098
pdf: https://www.isca-archive.org/interspeech_2026/truong26_interspeech.pdf
---

# QAMO: Quality-aware Multi-centroid One-class Learning For Speech Deepfake Detection

[PDF](https://www.isca-archive.org/interspeech_2026/truong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/truong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1098)

**TL;DR** — QAMO improves speech deepfake detection by replacing single-centroid one-class learning with multiple quality-aware centroids, achieving an equal error rate of 5.21% on the In-the-Wild dataset.

## Problem

Traditional speech deepfake detection treats detection as binary classification, which overfits known spoof attacks and struggles to generalize to unseen ones. Conventional one-class learning mitigates this by modeling real speech around a single centroid, but oversimplifies the diverse nature of genuine speech by ignoring intra-class speech quality variations.

## Method

The QAMO framework assigns discrete quality levels (low and high) to training samples using predicted Mean Opinion Scores and introduces multiple learnable bona fide centroids associated with each quality subspace. These centroids are jointly optimized using an AM-Softmax quality classification objective combined with a customized QAMO distance metric and data augmentation where augmented samples are treated as low quality. During inference, QAMO avoids requiring explicit quality labels by deploying a softmax-weighted ensemble scoring strategy that aggregates similarities across all quality centroids. The approach is evaluated using XLSR-Nes2NetX and XLSR-Conformer-TCM backbones.

## Results

Evaluated across ASVspoof2021 LA, ASVspoof2021 DF, In-the-Wild (ITW), and Fake-or-Real (FoR) benchmarks using Equal Error Rate (EER) as the primary metric. When using the XLSR-Conformer-TCM backbone, QAMO achieves EERs of 1.63% on 21DF, 5.21% on ITW, and 3.45% on FoR, outperforming conventional single-centroid OC-Softmax and prior quality-aware NACL systems. Ablations demonstrate that removing the quality classification loss or swapping ensemble-score inference for max-score inference degrades performance on out-of-domain sets.

## Code

- https://github.com/ductuantruong/QAMO

## Applications

Speech engineers and security systems developers building robust anti-spoofing countermeasures and deepfake detection pipelines against unseen synthetic audio attacks.

## Limitations

Relying on a proxy or external MOS predictor for training quality assignments introduces setup dependencies, though inference bypasses quality label requirements via ensemble scoring.

## Related

- (link related pages by id as the wiki grows)
