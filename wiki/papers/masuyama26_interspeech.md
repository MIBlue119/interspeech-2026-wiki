---
id: masuyama26_interspeech
category: spatial-audio
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1391
pdf: https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.pdf
---

# HRTF Personalization via Sim-to-Real Neural Field

[PDF](https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1391)

**TL;DR** — The paper introduces a sim-to-real neural field (S2RNF) for measurement-free head-related transfer function (HRTF) personalization, outperforming physical simulations and existing refinement baselines on spectral distortion metrics.

## Problem

Personalized HRTFs are essential for high-fidelity immersive binaural audio, but acquiring them traditionally requires lengthy measurement sessions in specialized anechoic chambers with dense spatial grids. Measurement-free alternatives like numerical simulations from 3D head meshes avoid this but suffer from high-frequency acoustic artifacts, while pure data-driven mapping requires extensive anthropometric features. This paper bridges the sim-to-real gap by refining simulated HRTFs into realistic ones without needing laboratory measurements.

## Method

S2RNF models HRTFs as a neural field that conditions on direction input (processed via random Fourier features), subject-specific parameters, and domain-specific parameters distinguishing simulated from measured data. It uses an Implicit Gradient Origin Network (IGON) framework to compute subject-specific parameters via a one-step gradient descent directly from simulated HRTFs without an explicit encoder network. During training, the framework jointly optimizes core network parameters alongside simulated and measured domain-specific biases using a combined loss function. The architecture employs 4 hidden fully-connected layers of size 512 with Swish activations, leveraging BitFit-style bias tuning where subject-specific and domain-specific biases are injected.

## Results

Evaluated on an extended SONICOM dataset of 200 subjects (160 train, 15 validation, 25 test) across 793 directions at 48 kHz, S2RNF outperformed the average non-personalized baseline across root mean squared error (RMSE), mean absolute error (MAE), and Polar RMSE, yielding an MAE standard deviation of 0.48 versus 0.59 for the baseline (validated via a paired one-sided t-test with p = 1.5%). On the HUTUBS dataset containing 91 evaluated subjects across 440 directions, S2RNF achieved superior spectral distortion compared to BEM-DNN by over 1 dB in MAE and slightly outperformed Proto. DNN while eliminating the need for an anthropometric feature encoder. Ablation experiments demonstrated that including the simulation loss term during training consistently prevents performance degradation.

## Code

- https://github.com/MERL/S2RNF

## Applications

Speech and audio engineers developing virtual reality, augmented reality, and immersive spatial audio systems where personalized binaural rendering is required without user-facing anechoic chamber measurements.

## Limitations

The method currently relies on high-fidelity 3D head meshes provided by official datasets and leaves interaural time difference personalization and photogrammetry-based mesh reconstruction for future work.

## Related

- (link related pages by id as the wiki grows)
