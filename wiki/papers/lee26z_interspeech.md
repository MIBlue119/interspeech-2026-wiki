---
id: lee26z_interspeech
category: audio-understanding
institutions: ["University of Zurich", "ETH Zurich"]
code: https://github.com/hwiora/trajectory_variance
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3557
pdf: https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.pdf
---

# Trajectory Variance: An Unsupervised Measure of Developmental Vocal Plasticity in Birdsong

*Kanghwi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3557)

**Category:** `audio-understanding`

**TL;DR** — Trajectory variance uses counterfactual age-conditioned latent shifts to quantify vocal developmental plasticity without type labels, successfully separating learned zebra finch song syllables from innate calls (AUC = 0.58–0.67).

## Key contributions

- Introduces trajectory variance, an unsupervised per-vocalization plasticity score derived from predicted age-conditioned shifts in latent space.
- Implements a mini-batch optimal transport pairing strategy and an adaptive layer-normalized (AdaLN) residual MLP displacement model for single-pass counterfactual inference.
- Demonstrates consistent song/cal separation across three zebra finch datasets (Cohen's d = 0.29–0.57 after duration residualization), outperforming nonparametric baselines like Gaussian OT and per-age k-NN.
- Establishes a significant negative correlation between trajectory variance and spectral flatness (r = -0.48 to -0.75), showing that more plastic vocalizations are more tonal.

## Problem

Traditional speech and vocalization analyses rely on static acoustic descriptors (duration, spectral shape, energy) that characterize a sound at production but fail to measure how it evolves over developmental time. Existing categorization approaches require manual annotation or rely on repertoire dating and static repertoire classification. In animal models and human speech development, researchers lack label-free, per-vocalization quantitative measures of developmental plasticity, making it difficult to automatically distinguish plastic learned utterances (such as song syllables) from stable innate calls without explicit supervision.

## Method

The pipeline consists of three sequential stages: a convolutional variational autoencoder (VAE), an age-conditioned displacement model, and trajectory variance computation. Spectrograms (32 kHz, 512-sample window, 128-sample hop length, 123 linear frequency bins, padded to 100 frames) are encoded by a VAE into 128-dimensional latent vectors z. The VAE uses three Conv1d layers (123 to 128 to 256 to 512 channels, kernel size 3, stride 2) with batch normalization and GELU activations, trained with masked MSE reconstruction, KL divergence weight of 10^-3, and L2 latent regularization of 10^-4.

Because longitudinal tracking of identical vocalizations does not exist, training pairs for the displacement model are constructed via mini-batch optimal transport, computing pairwise squared Euclidean distances between source and target age latents and solving assignments using the Hungarian algorithm. The displacement model is a 6-layer residual MLP with adaptive layer normalization (AdaLN) and sinusoidal age embeddings, featuring a zero-initialized output layer to ensure near-zero displacement at initialization. It is trained with AdamW (lr = 3x10^-4, weight decay 10^-4, gradient clipping 1.0) over 200 epochs to minimize MSE on latent displacements.

For inference, trajectory variance Vi is calculated as the summed per-dimension variance of counterfactual latent vectors generated across T = 7 evenly spaced target ages spanning the developmental range (40–101 days post-hatch). High variance denotes high developmental plasticity, while low variance indicates stability.

## Experimental setup

Evaluated on developmental recordings from three juvenile male zebra finches (Bird A: 222K vocalizations, Bird B: 274K vocalizations, Bird C: 183K vocalizations) spanning 40 to 101 days post-hatch. Baselines include Gaussian OT (population-level affine map), per-age k-NN (k=10), and per-age optimal transport (Hungarian assignment between pools). Evaluation metrics include Pearson correlation against acoustic features, Cohen's d on duration-residualized trajectory variance (dr), and Area Under the ROC Curve (AUC) on a 3K evaluation subset per bird.

## Results

The displacement model achieves consistent song/call separation after duration residualization with Cohen's d (dr) ranging from +0.29 to +0.57 and AUC from 0.58 to 0.67 across the three birds (Bird A: dr=+0.57, AUC=0.67; Bird B: dr=+0.32, AUC=0.65; Bird C: dr=+0.29, AUC=0.58). In contrast, nonparametric baselines fail: Gaussian OT yields erratic separation (Bird B dr=-0.16), per-age k-NN collapses to chance (AUC approx 0.50), and per-age OT exhibits a severe reversal (dr = -0.19 to -0.41, AUC = 0.39–0.45) due to pool composition sensitivity.

Raw trajectory variance correlates strongly with vocalization duration (r = 0.70 to 0.80), necessitating duration residualization. Furthermore, trajectory variance exhibits a consistent negative correlation with spectral flatness across all birds (r = -0.48 to -0.75), indicating that structurally tonal sounds possess higher developmental plasticity.

| System / Condition | Bird A (dr / AUC) | Bird B (dr / AUC) | Bird C (dr / AUC) |
|---|---|---|---|
| Displacement (Ours) | +0.57 / 0.67 | +0.32 / 0.65 | +0.29 / 0.58 |
| Gaussian OT | +0.06 / 0.52 | -0.16 / 0.44 | +0.07 / 0.52 |
| Per-age k-NN | -0.05 / 0.50 | -0.07 / 0.49 | -0.03 / 0.46 |
| Per-age OT | -0.19 / 0.45 | -0.41 / 0.39 | -0.24 / 0.42 |

## Limitations

The study relies purely on cross-sectional data without longitudinal ground truth, meaning counterfactual predictions cannot be verified against actual individual maturation trajectories. Raw trajectory variance is heavily confounded by vocalization duration (r = 0.70–0.80), requiring explicit residualization. The evaluation is limited to a single bird species from one colony, and the song/call label heuristic (based on temporal proximity bouts) introduces boundary classification errors.

## Why read this

Researchers and engineers working on unsupervised developmental modeling, representation learning, or counterfactual trajectory forecasting will find a novel formulation for quantifying plasticity without class labels. It demonstrates how mini-batch optimal transport and conditional MLPs can be combined to replace complex ODE-based flow matching for single-pass latent displacement.

## Code

- https://github.com/hwiora/trajectory_variance

## Applications

Unsupervised analysis of animal vocal learning, tracking acoustic development and plasticity in bioacoustics, and evaluating developmental trajectories in low-resource longitudinal speech corpora.

## Institutions / 機構

University of Zurich, ETH Zurich

**Funding / 經費:** Swiss National Science Foundation

## Related

- [How does children's pronunciation develop? Capturing syllabic change with children's growth using unsupervised syllable discovery](horii26_interspeech.md) — shared technique · relatedness 1.8/3
- [Progressive Learnable Counterfactual Attention for Music Classification](lin26_interspeech.md) — shared technique · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
