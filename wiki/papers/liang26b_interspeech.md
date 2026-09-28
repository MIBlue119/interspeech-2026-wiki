---
id: liang26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-531
pdf: https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.pdf
---

# FoleyImmersive: Decoupling What and Where for Video-to-First-Order Ambisonics

[PDF](https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-531)

**TL;DR** — FoleyImmersive is a modular two-stage video-to-first-order ambisonics generation framework that decouples content and geometry, achieving a state-of-the-art semantic Fréchet Audio Distance and spatial correlation coefficient of 0.741.

## Problem

Generating first-order ambisonics (FOA) directly from silent field-of-view videos suffers from sparse textual semantics in public corpora and content-geometry entanglement. End-to-end models often blur semantic content and spatial localization, whereas naive two-stage pipelines trade off semantic fidelity for spatial coherence.

## Method

The framework uses a semantics-augmented dataset, YT-AmbiSem, built by enriching YT-Ambigen with structured descriptions from Qwen2.5-VL-7B. Stage 1 generates mono channel W via a semantics-first diffusion model equipped with multi-rate cross-frame attention (MR-CFA) combining 1 fps slow and 4 fps fast visual features, alongside probabilistic time modulation (PTM) for continuous time gating. Stage 2 spatializes W into XYZ channels via a complex-STFT U-Net enhanced by a Directional Residual Mixer (DRM) with view-dependent bottleneck gating, trained with complex L2 and soft energy budget regularization.

## Results

Evaluated on the YT-AmbiSem dataset against baselines like ViSAGe, SpecVQGAN+Ambi Enc., and Diff-Foley+Ambi Enc., FoleyImmersive achieves superior performance across metrics. It records a KLDdec of 1.532 and FADavg of 4.126. In spatial metrics, it reaches an overall Cross-Correlation (CC) of 0.741 and Area Under Curve (AUC) of 0.851, outperforming traditional cascading spatializers. Ablations confirm that removing MR-CFA or DRM severely degrades semantic and spatial performance respectively.

## Code

- https://foleyimmersive2026.github.io/

## Applications

Audio engineers, immersive media developers, and XR system builders generating automatic spatial Foley and first-order ambisonics from in-the-wild silent videos.

## Limitations

Future work requires improving robustness and generalization to unseen and more complex acoustic scenes.

## Related

- (link related pages by id as the wiki grows)
