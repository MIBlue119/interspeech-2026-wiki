---
id: bhosale26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2514
pdf: https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.pdf
---

# Echoes after Edits: Room Impulse Response Estimation for Geometry Update

[PDF](https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhosale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2514)

**TL;DR** — The paper introduces edit-conditioned room impulse response (RIR) estimation and proposes PG-RIR, a proxy-guided neural network that accurately predicts acoustic variations resulting from geometry edits using uniform-material simulation proxies.

## Problem

Traditional acoustic simulation requires expensive, fine-grained material annotations for every object, while neural field spatial interpolation demands multiple dense RIR measurements for every scene change. In everyday environments, room geometry changes frequently via furniture rearrangement or removal, rendering these traditional approaches impractical and inefficient. This creates a need for zero-shot RIR estimation under geometric edits using prior measurements and updated 3D meshes without requiring new acoustic captures or material labels.

## Method

The authors propose PG-RIR, an 11.9M-parameter model that estimates the residual log-spectrogram between pre- and post-edit RIRs in the time-frequency domain. It uses a shared ResNet-18 encoder to process the real pre-edit RIR alongside simulated proxy RIRs generated with globally uniform materials for both pre- and post-edit 3D meshes. Type and material embeddings are fused with acoustic features to produce context-aware queries, which drive a query-modulated hypernetwork to generate frequency-band-dependent temporal modulation weights. The final estimate is synthesized via inverse STFT using the phase of the pre-edit RIR, optimized with a combination of log-magnitude spectral loss and energy decay curve loss.

## Results

Evaluated on a leave-one-out protocol across 14 unseen base geometries and 264 edited variants containing 143,455 valid source-receiver pairs from the iGibson dataset, PG-RIR consistently outperforms the identity baseline and xRIR across metrics including T60, C50, and EDT. For instance, across the full evaluation, PG-RIR achieves a T60 absolute error of 0.0316 compared to 0.0432 for the identity baseline and over 0.05 for xRIR baselines. PG-RIR also demonstrates strong zero-shot generalization to unseen translation edits and multi-step sequential edit chains.

## Code

- https://github.com/merlresearch/geometry-edit-rir

## Applications

Speech and acoustic engineers building spatial audio systems, virtual reality environments, and smart home audio setups that need to dynamically adapt acoustic simulations when furniture or room layouts change.

## Limitations

Repeated forward passes through the network in multi-step edit chains accumulate spectral smoothing that gradually smears early-energy transients.

## Related

- (link related pages by id as the wiki grows)
