---
id: fan26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2774
pdf: https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.pdf
---

# Cloud-Boosted Low-Compute Multi-Channel Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2774)

**TL;DR** — A collaborative edge-cloud framework uses delayed server outputs, intermediate feature boosting, and joint beamforming to boost lightweight speech enhancement performance, achieving up to 3.77 dB SI-SDR gains with under 5% edge computational overhead.

## Problem

Lightweight on-device speech enhancement models deployed on wearables are fundamentally constrained by strict compute and memory budgets, causing their performance to lag far behind massive server-grade models. While hybrid frameworks offload spatial filtering to mathematical beamformers driven by neural estimators, they frequently collapse in complex acoustic scenes when the edge model fails to accurately estimate target speech statistics. Simply conditioning edge models on delayed server outputs is insufficient to track rapid acoustic variations over network latency.

## Method

The framework pairs a frozen, high-capacity causal server-side SpatialNet with a lightweight edge-side TinyGRU featuring three collaborative techniques under a 64ms communication delay. First, delayed input concatenation feeds the server's enhanced audio spectrogram directly as auxiliary input channels before spatial convolution. Second, layerwise feature boosting extracts intermediate representations from layers 1, 4, 8, and 12 of the server model, compressing them and injecting them into the TinyGRU layers via Feature-wise Linear Modulation (FiLM). Third, collaborative multichannel Wiener filtering (MCWF) fuses cross-covariance statistics estimated independently by both the edge model and the delayed server model using an adaptive, per-frame weighting scalar. The edge model is trained using SNR loss with the Adam optimizer over 100 epochs on 16kHz audio.

## Results

Evaluated on Standard (SNR [0, 5] dB) and Challenging (SNR [-10, -5] dB) datasets generated using DNS-Challenge sources and Pyroomacoustics 8-channel circular microphone arrays, the full collaborative system improves SI-SDR from 1.97 dB to 5.74 dB on the Standard set and from -1.16 dB to 2.33 dB on the Challenging set over the TinyGRU+MCWF baseline. Incrementally adding delayed conditioning, layerwise boosting, and collaborative MCWF shows monotonic performance gains. A scaled-up edge baseline (TinyGRU-Large with 198% more parameters and 109% more MMACs) achieves only 2.75 dB SI-SDR on Standard, proving that server-side collaboration outperforms mere edge parameter scaling while adding only 1.5% parameters and 2.4% MMACs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers designing real-time communication systems for resource-constrained wearable hardware such as smart glasses and hearables operating in adverse acoustic environments.

## Limitations

Performance exhibits moderate degradation as server-edge delay increases from 64ms to 96ms and 128ms.

## Related

- (link related pages by id as the wiki grows)
