---
id: yakovlev26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1447
pdf: https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.pdf
---

# ReDimNet2: Scaling Speaker Verification via Time-Pooled Dimension Reshaping

[PDF](https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yakovlev26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1447)

**TL;DR** — ReDimNet2 introduces time-pooling into the 1D pathway of the ReDimNet speaker verification architecture, achieving an improved accuracy-efficiency trade-off with an EER of 0.29% on Vox1-O using 12.3M parameters and 13 GMACs.

## Problem

In previous dimension-reshaping architectures like ReDimNet, preserving the full time resolution throughout the network caused the computational cost of 1D subblocks to grow quadratically as channel dimensions increased. This limitation restricted the ability to aggressively scale the channel width and hindered higher model capacity without excessive compute overhead. Overcoming this is crucial for building compact yet highly discriminative speaker embeddings suitable for resource-constrained or large-scale deployments.

## Method

The authors propose ReDimNet2, which integrates pooling over the time dimension within intermediate 1D processing pathways using the same strided convolutions originally reserved for frequency downsampling. Because 1D features remain reshaped versions of 2D features despite temporal subsampling, the volume-preserving dimension-reshape logic and residual connections remain fully valid. To resolve length mismatches during stage-wise weighted aggregation, nearest-neighbor upsampling restores all feature maps to the initial temporal resolution before final pooling. A family of seven configurations (B0-B6) ranging from 1.1M to 12.3M parameters and 0.33 to 13 GMACs was trained using a two-stage recipe (pretraining on VoxCeleb2 with SGD and SphereFace2-C loss, followed by a large-margin finetuning stage).

## Results

Evaluated on the VoxCeleb1 cleaned benchmarks (Vox1-O, Vox1-E, Vox1-H), ReDimNet2 improves the Pareto front across all compute budgets compared to the original ReDimNet. Specifically, ReDimNet2-B6 obtains 0.29% EER on Vox1-O, 0.52% on Vox1-E, and 0.99% on Vox1-H, representing a 28% relative EER reduction over ReDimNet-B6 while using 36% fewer GMACs. Out-of-domain evaluations on SITW, VOiCES, and Vox1-B confirm that the time-pooling modification also preserves robust generalization across diverse acoustic environments. Ablations comparing matched-compute configurations from B0 to B6 show consistent accuracy gains across all scales.

## Code

- https://github.com/PalabraAI/redimnet2

## Applications

Engineers and researchers deploying speaker verification, zero-shot text-to-speech speaker conditioning, personal voice activity detection, or speaker similarity evaluation in streaming and resource-constrained environments.

## Limitations

Training larger configurations (B4-B6) exhibits increased run-to-run variability in performance, indicating a need for careful regularization or hyperparameter tuning at higher scales.

## Related

- (link related pages by id as the wiki grows)
