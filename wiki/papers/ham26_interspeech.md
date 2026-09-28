---
id: ham26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-963
pdf: https://www.isca-archive.org/interspeech_2026/ham26_interspeech.pdf
---

# Continuous 2D Spectral—Temporal Transformer for Speaker Verification

[PDF](https://www.isca-archive.org/interspeech_2026/ham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-963)

**TL;DR** — The Continuous 2D Spectral–Temporal Transformer (C2D-ST) maintains the explicit spectral–temporal grid representation throughout its backbone to achieve competitive speaker verification with an average EER of 0.507 using 6.9M parameters.

## Problem

Recent hybrid speaker verification architectures frequently collapse the spectral–temporal grid into a one-dimensional temporal representation before applying global dependency modeling. This early collapse destroys explicit spectral–temporal structure, raising questions about whether preserving 2D representations throughout the backbone improves speaker representation learning and parameter efficiency.

## Method

The C2D-ST architecture comprises five spectral–temporal attention stages with 16 total transformer layers, operating on 80-dimensional log Mel filterbanks. Local dependencies are modeled via Neighborhood Attention with both relative position bias and value-side relative positional encoding, while global dependencies are handled directly on the 2D grid using Axial Attention along both frequency and temporal axes. Stage-wise feature aggregation and a 1D projection feed into a final temporal modeling stage consisting of eight temporal attention layers before attentive statistics pooling. The model is trained on VoxCeleb2 using SphereFace2 loss and large-margin finetuning.

## Results

Evaluated on VoxCeleb1 (Vox1-O, Vox1-E, and Vox1-H test protocols) using Equal Error Rate and minimum Detection Cost Function with AS-Norm and QMF, C2D-ST achieves an average EER of 0.507 and an average minDCF of 0.051. It outperforms ReDimNet-B6 (0.633 EER, 15.0M params) and ECAPA2 (0.617 EER, 27.1M params) while utilizing only 6.9M parameters. Ablations confirm that removing axial attention increases average EER to 0.693, and collapsing the spectral dimension prior to global modeling raises EER to 0.557.

## Code

- https://github.com/roadroller0501/C2D-ST

## Applications

Speech engineers and biometric system developers building high-efficiency speaker verification models for deployment scenarios requiring strong performance with restricted model capacity.

## Limitations

The evaluation is restricted to the VoxCeleb benchmark datasets, and computational overhead from 2D axial attention during training is not explicitly detailed.

## Related

- (link related pages by id as the wiki grows)
