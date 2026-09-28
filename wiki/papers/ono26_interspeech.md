---
id: ono26_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2139
pdf: https://www.isca-archive.org/interspeech_2026/ono26_interspeech.pdf
---

# Fast Multichannel Nonnegative Matrix Factorization with Directivity Regularization for DOA-Informed Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/ono26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ono26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2139)

**TL;DR** — The paper introduces a directivity-regularized FastMNMF algorithm incorporating continuous angular uncertainty via von Mises distributions, improving DOA-informed multichannel speech separation.

## Problem

Conventional FastMNMF operates as a blind source separation method and does not utilize external direction-of-arrival (DOA) priors, leading to suboptimal performance in non-blind speech enhancement scenarios like smart glasses. While geometrically constrained approaches exist, they typically rely on rigid point estimates that fail to account for DOA estimation errors, user head movement, and directional source variations. This lack of robust spatial guidance causes iterative optimization to fall into poor local optima in reverberant acoustic environments.

## Method

The proposed method augments the FastMNMF negative log-likelihood objective with a directivity regularization term applied to the joint-diagonalization matrix. To tolerate DOA errors and head motion, angle-dependent weights are modeled using von Mises probability density functions centered on target speaker directions (passbands) and interfering speaker directions (nulls). The concentration parameter controls the sharpness of the beam pattern, generalizing hard geometric constraints into soft probabilistic penalties. All parameters, including the source models via multiplicative updates and the spatial model via vector coordinate descent (VCD), are optimized iteratively in closed form.

## Results

Experiments evaluated simulated noisy simultaneous speech mixtures in a reverberant room using a 5-microphone arc-shaped array across various speaker configurations. The proposed directivity-regularized FastMNMF consistently outperformed standard FastMNMF and baseline unregularized configurations in separation performance metrics. Ablations analyzing the von Mises concentration parameter demonstrate that soft angular weighting effectively balances robustness against DOA uncertainty with spatial selectivity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech enhancement and multi-speaker separation front-ends for wearable devices, smart glasses, and distant-microphone automatic speech recognition systems operating in noisy environments with available visual or sensor-based DOA tracking.

## Limitations

The approach assumes that external sensors or camera-based object detection can provide reliable directional priors (DOAs) for the target and interfering sources.

## Related

- (link related pages by id as the wiki grows)
