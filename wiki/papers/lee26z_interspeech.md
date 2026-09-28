---
id: lee26z_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3557
pdf: https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.pdf
---

# Trajectory Variance: An Unsupervised Measure of Developmental Vocal Plasticity in Birdsong

[PDF](https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3557)

**TL;DR** — Trajectory variance uses a counterfactual displacement model in a VAE latent space to quantify developmental vocal plasticity without type labels, successfully separating learned song syllables from innate calls.

## Problem

Traditional acoustic descriptors characterize what a sound is at a specific moment rather than how it evolves across developmental stages. Quantifying vocal plasticity typically relies on manual annotations or static acoustic categorizations, failing to capture the dynamic trajectory of how individual vocalizations change over time. This unsupervised approach matters because it offers a label-free counterfactual framework to study developmental changes in animal vocalization and learning.

## Method

The pipeline consists of a convolutional VAE, an age-conditioned displacement model, and a variance calculation across counterfactual predictions. The VAE compresses 123x100 spectrograms into a 128-dimensional latent space using masked MSE reconstruction, KL divergence, and L2 regularization. An age-conditioned displacement model—a 6-layer residual MLP with adaptive layer normalization (AdaLN) driven by sinusoidal age embeddings—predicts latent shifts via minibatch optimal transport training pairs using the Hungarian algorithm. For each vocalization, counterfactuals are generated across T=7 target ages, and trajectory variance is computed as the summed per-dimension variance of the resulting counterfactual latents.

## Results

Evaluated on developmental recordings from three zebra finches containing 183K to 274K vocalizations each (40 to 101 days post-hatch), the displacement model successfully separates song syllables from innate calls after duration-residualization, achieving Cohen's d effect sizes of 0.29 to 0.57 and AUC values of 0.58 to 0.67. In contrast, nonparametric baselines—Gaussian optimal transport, per-age k-NN, and per-age optimal assignment—fail to achieve consistent positive separation across all birds. Furthermore, trajectory variance exhibits a robust correlation with spectral flatness across all subjects (r = -0.48 to -0.75), indicating that more plastic vocalizations tend to possess more tonal, structured spectra.

## Code

- https://github.com/hwiora/trajectory_variance

## Applications

Animal behavior researchers and bioacoustics engineers studying vocal learning, acoustic plasticity, and developmental milestones in songbirds or other vocalizing species.

## Limitations

The raw trajectory variance score is strongly confounded by vocalization duration (r = 0.70 to 0.80) due to fixed-length VAE padding, requiring post-hoc residualization, and relies purely on cross-sectional data without true longitudinal ground truth.

## Related

- (link related pages by id as the wiki grows)
