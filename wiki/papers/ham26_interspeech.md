---
id: ham26_interspeech
category: speaker
institutions: ["Soongsil University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-963
pdf: https://www.isca-archive.org/interspeech_2026/ham26_interspeech.pdf
---

# Continuous 2D Spectral—Temporal Transformer for Speaker Verification

*Seongwook Ham, Thien-Phuc Doan*

[PDF](https://www.isca-archive.org/interspeech_2026/ham26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ham26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-963)

**Category:** `speaker`

**TL;DR** — The Continuous 2D Spectral–Temporal Transformer (C2D-ST) preserves the explicit 2D time-frequency grid structure throughout its feature extraction backbone rather than collapsing the frequency axis prematurely, achieving a competitive 0.507 average EER on VoxCeleb with only 6.9M parameters.

## Key contributions

- Proposes a continuous spectral-temporal attention backbone that preserves the 2D grid format across five transformer stages before applying temporal-only aggregation.
- Introduces axial attention operating along both the temporal and frequency axes directly within the spectral-temporal domain for global dependency modeling.
- Combines neighborhood attention with value-side relative positional encoding (RPE) and relative position bias (RPB) for robust local spatial modeling.
- Demonstrates superior parameter efficiency compared to larger hybrid baselines like ReDimNet-B6 and ECAPA2 while reducing average EER.

## Problem

Recent hybrid speaker verification systems frequently collapse the spectral axis into a 1D temporal format early or intermittently during stage-wise processing (e.g., ReDimNet), destroying the explicit 2D spectral-temporal grid structure prior to global dependency modeling. This premature flattening limits the network's capacity to learn comprehensive 2D contextual patterns and degrades parameter efficiency. Addressing this gap requires examining whether maintaining an uninterrupted 2D spectral-temporal representation during global dependency learning yields more discriminative and compact speaker embeddings.

## Method

The C2D-ST architecture accepts 80-dimensional log Mel filterbank features ($B \times C \times F \times T$) and processes them through a backbone comprising 5 spectral-temporal attention stages totaling 16 transformer layers. Each stage incorporates Neighborhood Attention (NA) for local 2D spatial context using relative position bias (RPB) and value-side relative positional encoding (RPE), followed by a stage-final Axial Attention layer that decomposes global dependencies into separate frequency and temporal branches. 

Unlike architectures with frequent format interleaving, C2D-ST maintains the 2D grid throughout the backbone. The outputs of multiple backbone stages are aggregated via learnable scalar weights, projected to a 1D channel format, and passed to a final temporal modeling stage consisting of 8 temporal layers (NA and temporal Global Attention). Finally, Attentive Statistics Pooling (ASP) extracts the speaker embedding.

The model is pretrained from scratch on VoxCeleb2 using random 3-second segments for 20 epochs with AdamW (initial lr=0.008, weight decay=0.05) under SphereFace2 (C-type) loss with margin 0.2, utilizing speed perturbation, MUSAN noise, and simulated RIRs. Large-margin finetuning (LMFT) is subsequently performed for 2 epochs on 6-second segments with lr=0.003 and margin 0.3 without augmentations.

## Experimental setup

Trained on the VoxCeleb2 development set and evaluated on VoxCeleb1 (VoxCeleb1-O, VoxCeleb1-E, and VoxCeleb1-H test protocols). Evaluated using Equal Error Rate (EER) and minimum Detection Cost Function (minDCF), alongside adaptive score normalization (AS-Norm with 500 cohort speakers) and quality-measure scoring (QMF). Implemented using an adaptation of ESPnet-SPK.

## Results

C2D-ST achieves an average EER of 0.507 and minDCF of 0.051 on VoxCeleb1 using 6.9M parameters, outperforming ReDimNet-B6 (15.0M params, 0.633 average EER) and ECAPA2 (27.1M params, 0.617 average EER). Ablation studies reveal that removing axial attention and relying solely on neighborhood attention spikes the average EER to 0.693, whereas restricting axial attention to time-only yields 0.533. Replacing the proposed 2D neighborhood attention blocks with ConvNeXt convolutional blocks increases average EER to 0.580.

| Model | Params | LMFT | QMF | Vox1-O | Vox1-E | Vox1-H | AvgEER | AvgminDCF |
|---|---|---|---|---|---|---|---|---|
| ReDimNet-B6 [7] | 15.0M | ✓ | ✗ | 0.37 / 0.030 | 0.53 / 0.051 | 1.00 / 0.097 | 0.633 | 0.059 |
| ECAPA2 [3] | 27.1M | ✓ | ✓ | 0.34 / 0.029 | 0.52 / 0.058 | 0.99 / 0.098 | 0.617 | 0.062 |
| C2D-ST | 6.9M | ✗ | ✗ | 0.37 / 0.039 | 0.55 / 0.054 | 0.96 / 0.093 | 0.627 | 0.062 |
| + LMFT | 6.9M | ✓ | ✗ | 0.31 / 0.034 | 0.44 / 0.045 | 0.80 / 0.077 | 0.517 | 0.052 |
| + LMFT + QMF | 6.9M | ✓ | ✓ | 0.29 / 0.034 | 0.44 / 0.044 | 0.79 / 0.076 | 0.507 | 0.051 |

## Limitations

Evaluated exclusively on the VoxCeleb benchmark dataset, leaving generalization to heavily noisy, reverberant real-world telephony, or cross-lingual scenarios unexplored. The computational overhead of continuous 2D attention grids on extremely long audio streams or edge devices is not measured.

## Why read this

Researchers building high-efficiency speaker verification models should read this to understand how preserving continuous 2D spectral-temporal grids with axial attention outperforms early frequency-collapse strategies.

## Code

- https://github.com/roadroller0501/C2D-ST

## Applications

Speaker verification, speaker recognition, and voice biometrics systems requiring high accuracy under constrained parameter budgets.

## Institutions / 機構

Soongsil University

## Related

- (link related pages by id as the wiki grows)
