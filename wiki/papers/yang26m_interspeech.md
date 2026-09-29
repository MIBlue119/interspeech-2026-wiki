---
id: yang26m_interspeech
category: enhancement-separation
institutions: ["Wuhan University"]
code: https://b23ca07a.github.io/MVTF-Gridnet/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2035
pdf: https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.pdf
---

# Multi-View Based Audio Visual Target Speaker Extraction

*Peijun Yang, Zhan Jin, Juan Liu, Ming Li*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2035)

**Category:** `enhancement-separation`

**TL;DR** — The paper introduces Multi-View Tensor Fusion (MVTF), an audio-visual target speaker extraction framework that leverages synchronized multi-perspective lip videos during training via tensor outer products to learn robust representations, yielding an average SI-SDR of 15.718 dB for single-view testing (a 1.616 dB gain over frontal-only baselines).

## Key contributions

- Proposes the Multi-View Tensor Fusion (MVTF) module to capture multiplicative cross-view articulatory interactions through pairwise tensor outer products.
- Formulates a multi-view training strategy that boosts single-view and multi-view inference performance without requiring multiple cameras at test time.
- Demonstrates superior robustness to continuous real-world head rotations and pose changes compared to traditional face frontalization pipelines.
- Achieves state-of-the-art performance on the MEAD dataset, outperforming previous pose-invariant methods like PIAVE by over 2.6 dB in average SDR.

## Problem

Most audio-visual target speaker extraction (AVTSE) systems rely exclusively on frontal-view videos (e.g., from datasets like LRS3 and VoxCeleb2), assuming stable face visibility. In real-world scenarios, head rotations and non-frontal camera angles severely degrade the extraction performance of these models. Prior attempts to correct this via face frontalization or pose-invariant generation often fail and discard critical non-frontal articulatory information, while multi-camera methods demand rigid hardware setups during both training and inference.

## Method

The architecture builds upon the TF-GridNet audio separation backbone. Mixture audio is processed via STFT and mapped to complex spectrograms with real and imaginary channels concatenated. Visual inputs consist of video frames containing lip regions of interest (ROIs) from multiple camera views, which are passed through a pre-trained ResNet-18 lipreading encoder to obtain 512-dimensional spatiotemporal embeddings. Because audio and video frames operate at different temporal resolutions, linear interpolation upsamples the visual sequence to match the audio time frames (Ta), followed by a 1D convolution layer to project them into a common subspace of dimension F.

To fuse features across views while mitigating noise, the MVTF module processes each view's feature sequence through a shared single-layer LSTM. It then computes pairwise outer products across the LSTM outputs, augmented with constant bias terms to model both unimodal and bimodal interactions. The resulting high-dimensional tensor for each view pair is flattened, projected back to dimension F via LayerNorm and linear layers, and averaged across all available pairs. During training, the model uses 3 distinct camera views out of 7 per batch; during inference, it seamlessly accepts single-view inputs (by repeating the single view) or multi-view inputs symmetrically, without altering camera configurations.

The system is optimized end-to-end using the Scale-Invariant Signal-to-Distortion Ratio (SI-SDR) loss function.

## Experimental setup

Experiments are conducted on the MEAD emotional audio-visual dataset using exclusively neutral-emotion videos across 7 camera views (front, top, down, left/right 30°, left/right 60°). The dataset is split into 10,000 training mixtures, 1,000 validation mixtures, and 1,000 test mixtures with no speaker overlap, mixed at random SNRs between -10 dB and 10 dB at 16 kHz audio and 25 FPS video. Baselines include single-view GridNet (front or random) and alternative fusion strategies like Projected Addition and Attention Fusion. Models are trained using the Adam optimizer with an initial learning rate of 1e-3, gradient clipping (L2-norm max 1), and early stopping for up to 100 epochs on PyTorch.

## Results

MVTF-GridNet trained with random multi-view data achieves an average SI-SDR of 15.718 dB across all 7 test views, outperforming the frontal-only GridNet baseline (12.406 dB) by 3.312 dB and the random single-view GridNet baseline (15.089 dB). Under challenging top-view test inputs, MVTF-GridNet scores 15.196 dB SI-SDR compared to 7.731 dB for frontal-only GridNet. In robustness tests simulating continuous head rotations with mixed view segments, MVTF-GridNet maintains an SI-SDR of 15.834 dB, whereas frontal-only GridNet drops to 10.425 dB. Compared to alternative fusion strategies, MVTF outperforms Projected Addition (14.591 dB) and Attention Fusion (13.938 dB) while introducing minimal parameter overhead (7.561M vs 7.235M parameters and 471.8 GFLOPs vs 470.7 GFLOPs for the base model).

| System | Training Strategy | Front SI-SDR | Top SI-SDR | AVG(7) SI-SDR |
|---|---|---|---|---|
| Mixture | – | – | – | -0.191 |
| GridNet | Front | 13.290 | 7.731 | 12.406 |
| GridNet | Random | 15.259 | 14.765 | 15.089 |
| Projected Addition | Random | 14.733 | 14.191 | 14.591 |
| Attention Fusion | Random | 13.938 | 13.931 | 13.938 |
| MVTF-GridNet (Ours) | Random (3/7 views) | **15.836** | **15.196** | **15.718** |

## Limitations

The evaluation is restricted to clean neutral-emotion settings from a single dataset (MEAD) with simulated head movements, meaning real-world extremes like severe illumination changes, occlusions, or extreme head pitch/yaw outside the 7 discrete camera angles remain untested. The framework assumes that multi-view data or single-view approximations are available during training, and scaling to dozens of unconstrained in-the-wild camera angles has not been evaluated.

## Why read this

Researchers and engineers working on audio-visual speech separation or target speaker extraction facing real-world head movement challenges should read this to learn how tensor outer products can effectively model cross-view articulatory interactions without multi-camera inference overhead.

## Code

- https://b23ca07a.github.io/MVTF-Gridnet/

## Applications

Real-time hearing aids, robust video conferencing systems, and automated transcription tools operating under unconstrained head motion.

## Institutions / 機構

Wuhan University

**Funding / 經費:** National Key Research and Development Program of China

## Related

- [TGTSE: Token-Guided Target Speaker Extraction with Visual Cue](ling26_interspeech.md) — same problem · relatedness 3.0/3
- [Plug-and-Steer: Decoupling Separation and Selection in Audio-Visual Target Speaker Extraction](kwak26_interspeech.md) — same problem · relatedness 2.9/3
- [AV-SNINet: A multi-channel audio-visual speech-noise interaction network for Target Speaker Extraction with cross-beam attention](tu26c_interspeech.md) — same problem · relatedness 2.9/3
- [Online Audio-Visual Target Speaker Extraction with Viseme-Guided Lightweight Visual Pretraining](li26n_interspeech.md) — same problem · relatedness 2.8/3
- [WeSep: A Modular and Cue-Composable Framework for Target Speaker Extraction](zhang26k_interspeech.md) — same problem · relatedness 2.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
