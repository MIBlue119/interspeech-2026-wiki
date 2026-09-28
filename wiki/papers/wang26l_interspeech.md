---
id: wang26l_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-648
pdf: https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.pdf
---

# An All-neural Distributed Filtering Algorithm for Speech Extraction in Wireless Acoustic Sensor Networks

[PDF](https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-648)

**TL;DR** — ANDFilter is an all-neural distributed filtering framework for wireless acoustic sensor networks that replaces iterative covariance optimization with end-to-end frame-wise complex filter weight synthesis.

## Problem

Traditional distributed speech enhancement methods like DANSE rely on explicit second-order statistics, synchronization assumptions, and iterative matrix inversion. These statistical solvers become fragile, numerically unstable, and prone to convergence failures in low-SNR and non-stationary acoustic environments. Additionally, hybrid architectures that patch deep learning models onto conventional linear filters suffer from high system complexity and hinder end-to-end optimization.

## Method

The framework models a fully-connected wireless acoustic sensor network and breaks distributed enhancement into three stages mirroring canonical setups: a single-node filter module (SNFM) for local spatio-spectral filtering using a U2-Encoder, S-TCN, and U2-Decoder backbone; a node selection module (NSM) utilizing an attention-based cosine-similarity weighting mechanism to selectively aggregate compressed inter-node signals; and a multi-node filter module (MNFM) sharing the SNFM architecture to fuse local observations with refined remote representations. The entire system is trained end-to-end using a joint RI-magnitude loss with root spectral compression and an entropy-regularization penalty on the NSM attention weights. It uses an Adam optimizer for 100 epochs with linear warmup and cosine decay.

## Results

Evaluated on simulated wireless acoustic sensor networks with 4 nodes (each with a 4-microphone 5 cm cross-array) mixing LibriSpeech speech and Freesound environmental noises across rooms of 3–8m length and 0.15–0.4s RT60. ANDFilter is compared against baselines including C-MWF, DANSE, C-PEVD, D-PEVD, and TANGO. In extremely low SNR ranges (-20 to -10 dB), ANDFilter achieves a PESQ of 2.26, ESTOI of 0.74, and DNSMOS of 2.37, outperforming TANGO (1.55/0.52/1.68) and DANSE (1.29/0.55/1.56). In the -10 to 0 dB SNR range, it records 2.57 PESQ, 0.79 ESTOI, and 2.52 DNSMOS, substantially exceeding all baseline models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers deploying microphone arrays or ad-hoc acoustic sensor networks for speech enhancement, noise suppression, and distributed communication-constrained audio processing.

## Related

- (link related pages by id as the wiki grows)
