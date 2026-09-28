---
id: kim26j_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1150
pdf: https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.pdf
---

# MeCo: One-Step MeanFlow-based Corrector for Multi-Channel Speech Separation

[PDF](https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1150)

**TL;DR** — MeCo is a one-step MeanFlow-based generative corrector for multi-channel speech separation that bypasses iterative sampling while achieving superior signal fidelity and human listening quality.

## Problem

While deep discriminative models for multi-channel speech separation optimize objective metrics like SI-SDR, they often produce unnatural auditory artifacts that hurt human listening quality. Standard generative refinement models avoid this by leveraging clean speech priors, but they rely on computationally expensive multi-step diffusion or flow matching inference. Existing one-step methods either suffer from trajectory truncation mismatches or depend purely on signal-fidelity losses that fail to optimize human perception.

## Method

MeCo operates in the complex STFT domain, using a conditional MeanFlow formulation to map initial discriminative estimates directly to clean speech in a single step without trajectory truncation. It introduces Data-Space Optimization (DSO), combining an xr-loss (which weights velocity errors by displacement length to function as a generative objective) and an Endpoint SI-SDR loss (which optimizes terminal signal fidelity). The neural network estimates the average velocity field conditioned on both the multi-channel spatial mixture and the initial discriminative speaker estimates.

## Results

Evaluated on in-domain WSJ0-WHAM! datasets and out-of-domain Librispeech/DEMAND and low-resource language datasets, MeCo achieves state-of-the-art performance with minimal computational overhead. It simultaneously improves reference-based signal fidelity metrics and reference-free human listening quality estimators like DNSMOS and UTMOS compared to discriminative baselines and multi-step generative correctors.

## Code

- https://github.com/rlaehghks5/MECO

## Applications

Engineers building real-time, multi-channel communication systems, smart speakers, or hearing assistance devices requiring both artifact-free human listening quality and low latency.

## Related

- (link related pages by id as the wiki grows)
