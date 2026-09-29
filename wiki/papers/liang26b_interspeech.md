---
id: liang26b_interspeech
category: audio-understanding
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-531
pdf: https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.pdf
---

# FoleyImmersive: Decoupling What and Where for Video-to-First-Order Ambisonics

*Liming Liang, Lingfeng Yang, Luo Chen, Chenxing Li, Yuexian Zou*

[PDF](https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-531)

**Category:** `audio-understanding` · **Labels:** `generative-model`

**TL;DR** — FoleyImmersive is a modular two-stage framework for generating first-order ambisonics (FOA) from silent videos by decoupling semantic generation ("what") from spatialization ("where"), achieving state-of-the-art semantic and spatial metrics.

## Key contributions

- YT-AmbiSem: A semantics-augmented FOA dataset containing 102,364 clips enriched with structured textual descriptions (captions, event lists, and summaries) generated via Qwen2.5-VL-7B.
- Stage 1 (What): A semantics-first diffusion model incorporating Multi-Rate Cross-Frame Attention (MR-CFA) and Probabilistic Time Modulation (PTM) to produce clean mono audio (W).
- Stage 2 (Where): A complex-STFT spatializer equipped with a Directional Residual Mixer (DRM) that applies view-dependent bottleneck gating for minimal-interference spatialization.
- State-of-the-art performance across semantic metrics (FADdec, KLDdec) and spatial metrics (CC, AUC) compared to prior single-stage and two-stage pipelines.

## Problem

Extending video-to-audio (V2A) generation from mono to multi-channel First-Order Ambisonics (FOA) encounters two major bottlenecks: limited textual semantics in public video-FOA corpora, and content-geometry entanglement in system design. End-to-end models often blur semantic content and spatial direction, whereas naive two-stage pipelines trade semantic fidelity for spatial coherence or vice versa. This decoupling failure limits automatic Foley generation for in-the-wild content, where precise audio-visual grounding and directional stability are both required.

## Method

FoleyImmersive operates via a decoupled two-stage pipeline. Stage 1 generates the omni-directional mono channel W conditioned on multi-rate visual features and structured text. It extracts fast visual features at 4 fps using CLIP (ViT-B/32) and slow visual features at 1 fps, fusing them via MR-CFA where fast queries attend to local context windows (w=1) of slow features. A time detector provides probabilistic time modulation (PTM) via continuous scalar gating (gb(t)) to suppress spurious activations in silent regions without hard on/off masks. Stage 2 freezes Stage 1's output W and feeds its complex STFT representation (Re(SW), Im(SW)) into a 2D U-Net spatializer to predict X, Y, and Z channels. To prevent Stage 2 from distorting semantic content, the Directional Residual Mixer (DRM) injects a lightweight, view-and-vision-gated residual at the U-Net bottleneck. The camera direction D = (phi, theta) is mapped to a unit vector and combined with downlinked visual features to drive channel-wise gating tensors (gamma_t') initialized near zero. Training minimizes a complex-domain L2 loss combining magnitude, phase, and energy budget penalties with softplus-weighted learnable loss weights, supplemented by a W-perturbation curriculum.

Both stages are trained using AdamW with a learning rate of 10^-4 and a batch size of 32 per GPU for 200 epochs on audio resampled to 16 kHz (n_fft = 1024, hop = 256). Stage 1 uses 50 DDIM steps at inference, while Stage 2 operates in a single pass.

## Experimental setup

Evaluated on the YT-AmbiSem dataset (81,594 training, 9,604 validation, and 11,166 test clips of 5-second duration). Baseline models include ViSAGe, Diff-Foley + Ambi Enc., and SpecVQGAN + Ambi Enc. Metrics include semantic quality (FADdec, FADavg, KLDdec evaluated via FOA-to-mono decoding) and spatiality (correlation CC and AUC against ground-truth energy maps at All/1 fps/5 fps granularities). Dataset construction consumed approximately 840 NVIDIA H20 GPU hours.

## Results

FoleyImmersive achieves a KLDdec of 1.532, significantly outperforming ViSAGe (1.833), SpecVQGAN+Ambi Enc. (2.698), and Diff-Foley+Ambi Enc. (3.26). For semantic Fréchet Audio Distance, it scores 4.253 (FADdec) and 4.126 (FADavg), outperforming ViSAGe's 4.701 and 4.478. In spatial metrics, FoleyImmersive reaches a CC (All) of 0.741 and AUC (All) of 0.851, surpassing ViSAGe (CC 0.617, AUC 0.831) and non-DRM ablations (CC 0.534, AUC 0.732). In subjective 5-point MOS evaluations, FoleyImmersive scores 4.01 for Semantics, 4.16 for Spatiality, and 4.08 Overall, outperforming ViSAGe (3.68 Overall) and baseline cascades (~3.0 Overall).

| Method | KLDdec ↓ | FADdec ↓ | CC(all) ↑ | AUC(all) ↑ | Overall MOS ↑ |
|---|---|---|---|---|---|
| Diff-Foley + Ambi Enc. | 3.260 | 8.243 | 0.350 | 0.687 | 2.89 |
| SpecVQGAN + Ambi Enc. | 2.698 | 6.299 | 0.352 | 0.688 | 3.06 |
| ViSAGe | 1.833 | 4.701 | 0.617 | 0.831 | 3.68 |
| FoleyImmersive (ours) | 1.532 | 4.253 | 0.741 | 0.851 | 4.08 |

## Limitations

The framework relies on a modular separation that, while protecting semantic content, depends heavily on the accuracy of Stage 1's mono generation. Evaluation is restricted to 5-second FoV clips, and generalization to longer-form videos, highly complex multi-source acoustic scenes, or unseen out-of-domain environments remains constrained by the diversity of the YT-Ambigen/YT-AmbiSem data distribution.

## Why read this

Speech and machine learning researchers working on spatial audio generation will find this paper valuable for its clean architectural decoupling of semantic content and spatial geometry via directional residual mixing, which solves the content-distortion tradeoff common in two-stage audio models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automatic Foley generation for in-the-wild monocular videos, immersive XR media production, and 3D spatial audio synthesis.

## Institutions / 機構

Peking University, South China University of Technology, Tencent

## Related

- (link related pages by id as the wiki grows)
