---
id: kamath26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-252
pdf: https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.pdf
---

# Sensitivity Analysis of Generative Spatial Audio Metrics : A Study on Responsiveness, Smoothness, and Symmetry

[PDF](https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-252)

**TL;DR** — This paper establishes a meta-evaluation framework for generative spatial audio metrics, finding that localization-specific embeddings (F-PSELD) and 2D acoustic maps (MVDR-AM) provide the most robust responsiveness, smoothness, and symmetry across varying scene complexities.

## Problem

Evaluating generative First-Order Ambisonics (FOA) spatial audio models remains difficult because there is no consensus on how existing metrics respond to explicit spatial control parameters like azimuth and elevation. Without understanding metric sensitivity and behavior along continuous spatial trajectories or under increasing scene complexity, researchers cannot reliably assess model performance or fidelity.

## Method

The authors propose a meta-evaluation framework defining three core desiderata for spatial evaluation metrics: Responsiveness (sensitivity magnitude along a trajectory using a fitted smooth function and R-squared penalty), Smoothness (regularity via squared neighbor distance variance), and Symmetry (left-right trajectory consistency using RMSE). They analyze a custom dataset of 68,400 FOA samples synthesized via SpatialScaper using SoundSpaces 1.0 RIRs and FSD50K monophonic events. The evaluation tests distribution-based embedding metrics (M-VGG, S-CRW, F-GRAM, F-PSELD) and sample-based spatial metrics (MVDR-AM acoustic maps, Intensity Vectors, GCCPHAT, Log Spectral Distance, and IPD) across single-source, multi-source, and multi-instance layouts, with and without additive Gaussian noise (0-15 dB SNR).

## Results

Experiments across 68,400 synthesized FOA samples reveal that spatially-informed distribution metrics like F-PSELD achieve the highest mean responsiveness and outperform non-spatial baselines like M-VGG and S-CRW. For sample-based metrics, MVDR-AM acoustic maps attain the highest responsiveness and robust smoothness, whereas traditional phase-based features like GCCPHAT and IPD suffer severely from noise sensitivity, and intensity vectors degrade as scene complexity increases. F-GRAM yielded comparatively lower scores due to sensitivity artifacts under artificial stress-testing conditions.

## Code

- https://github.com/pkamath2/sa_sensitivity

## Applications

Speech and ML engineers developing generative spatial audio, immersive media, or sound event localization and detection systems can use these findings to select reliable evaluation metrics.

## Limitations

The study's conclusions on certain metrics like F-GRAM are tied to specific artificial stress-testing conditions and synthetic scene layouts.

## Related

- (link related pages by id as the wiki grows)
