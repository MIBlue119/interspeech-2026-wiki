---
id: koo26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-712
pdf: https://www.isca-archive.org/interspeech_2026/koo26_interspeech.pdf
---

# VeRe-Flow: Guiding Flow Matching toward Clean Speech via Velocity Contrastive Regularization and Representation Alignment for Noise-Robust Bandwidth Expansion

[PDF](https://www.isca-archive.org/interspeech_2026/koo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-712)

**TL;DR** — VeRe-Flow is a clean-guided flow matching framework for noise-robust bandwidth expansion that achieves state-of-the-art speech quality by using velocity contrastive regularization and representation alignment.

## Problem

Noise-robust bandwidth expansion requires simultaneously reconstructing missing high-frequency spectrums and suppressing background noise. Standard flow matching models suffer from velocity estimation ambiguities under noisy conditions, causing generative trajectories to drift away from the clean speech manifold.

## Method

The framework utilizes a sandwich architecture combining DiC-style convolutional residual blocks and transformer blocks, conditioned on frame-wise SSL features from a frozen noise-robust XEUS encoder. It employs conditional flow matching with a Gaussian prior and a linear interpolation path to map noisy inputs to clean high-resolution mel-spectrograms. Training is governed by two key objectives: a representation alignment loss that pulls intermediate hidden states toward clean SSL embeddings using a 3-layer MLP projection, and velocity contrastive regularization (VeCoR) which provides bidirectional supervision by attracting predicted velocities toward clean trajectories and repelling them from noisy ones. Waveform reconstruction is handled by BigVGAN.

## Results

Evaluated on the Valentini-Botinhao noisy test set downsampled to 8 kHz, VeRe-Flow achieves the lowest Log-Spectral Distance (LSD of 1.10) and highest DNSMOS overall score (OVRL 3.12) among all compared generative and non-generative methods. It also obtains the highest subjective Mean Opinion Score (MOS of 4.14) among generative baselines. Ablation studies confirm that both VeCoR and representation alignment contribute incremental gains to speech quality metrics.

## Code

- https://vere-flow.github.io/VeRe-Flow-Demo/

## Applications

Engineers building speech communication or enhancement pipelines for telephony, hearing aids, or audio restoration facing low-bandwidth and noisy recording conditions.

## Related

- (link related pages by id as the wiki grows)
