---
id: masuyama26_interspeech
category: applications-other
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1391
pdf: https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.pdf
---

# HRTF Personalization via Sim-to-Real Neural Field

*Yoshiki Masuyama, Gordon Wichern, Christoph Boeddeker, Julius Richter, Takahiro Edo, Swapnil Bhosale, Jonathan Le Roux*

[PDF](https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masuyama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1391)

**Category:** `applications-other`

**TL;DR** — The paper introduces Sim-to-Real Neural Field (S2RNF), a measurement-free HRTF personalization method that maps physics-simulated head-related transfer functions to realistic ones, outperforming baseline simulations and prior neural refinement models.

## Key contributions

- Proposes S2RNF, incorporating domain-specific parameters alongside subject-specific parameters into a neural field to bridge the domain gap between simulated and real HRTFs.
- Eliminates the need for specialized anechoic chamber measurements by inferring subject-specific latent parameters directly from simulated HRTFs computed on 3D head meshes.
- Leverages the Implicit Gradient Origin Network (IGON) framework for one-step gradient-based encoding, removing the need for a separate encoder network.
- Demonstrates superior spectral distortion metrics compared to previous sim-to-real and anthropometry-based baselines on both the SONICOM and HUTUBS datasets.

## Problem

Individual head-related transfer functions (HRTFs) are essential for high-fidelity immersive binaural audio, but acquiring them requires tedious physical measurements inside specialized anechoic chambers. While alternative measurement-free approaches attempt to simulate HRTFs from 3D meshes or predict them from anthropometric features using deep learning, simulations suffer from severe high-frequency artifacts. Prior deep learning models also require extra encoder architectures or manual feature curation, highlighting the need for robust sim-to-real transfer mechanisms.

## Method

S2RNF models the log-magnitude response of HRTFs using a neural field architecture that takes random Fourier features (RFF) of the sound source direction as input. The network comprises fully connected layers with BitFit-style conditioning, injecting subject-specific biases (z_i) and domain-specific biases (w_j, where j=0 for simulated and j=1 for measured) into the hidden core blocks. 

During inference, subject-specific parameters z_i are extracted directly from simulated HRTFs via one-step gradient descent (IGON) using domain parameters w_0. Realistic HRTFs are then synthesized by switching the domain parameter to w_1. The model is trained end-to-end by jointly minimizing a loss on predicted realistic HRTFs (L_1) and simulated HRTFs (L_0) with a balancing weight of lambda = 1, ensuring the computational graph flows cleanly through the gradient-based parameter extraction step.

## Experimental setup

Evaluated on an extended SONICOM dataset (200 pairs of measured/simulated HRTFs at 48 kHz across 793 directions, split into 160/15/25 for train/val/test) and the HUTUBS dataset (85 training, 5 validation, 6 test subjects, 440 directions). Compared against raw Mesh2HRTF simulations, non-personalized average baselines, SPCA-DNN, BEM-DNN, and Proto. DNN. Metrics include Mean Absolute Error (MAE), Root Mean Squared Error (RMSE) / Log-Spectral Distortion (LSD), and Polar RMSE (PolRMSE). Implemented with 4 hidden layers of 512 units using Swish activations, optimized via RAdam at a constant learning rate of 0.0005 for 1500 epochs.

## Results

On the SONICOM dataset, S2RNF achieves an RMSE of 4.90 dB and MAE of 3.60 dB, outperforming the non-personalized average baseline (RMSE 5.05 dB, MAE 3.78 dB) and raw Mesh2HRTF simulation (RMSE 10.53 dB, MAE 7.50 dB). Ablation studies confirm that removing the simulation loss L_0 degrades RMSE to 4.98 dB. On the HUTUBS dataset, S2RNF achieves an MAE of 3.66 dB and RMSE of 5.02 dB, beating BEM-DNN (4.80 dB MAE) and performing competitively with Proto. DNN (3.69 dB MAE) while requiring no dedicated encoder network.

| System | MAE [dB] | RMSE [dB] | PolRMSE [degree] |
|---|---|---|---|
| Mesh2HRTF (SONICOM) | 7.50 | 10.53 | 42.27 |
| Avg. HRTF (SONICOM) | 3.78 | 5.05 | 41.63 |
| S2RNF (SONICOM) | **3.60** | **4.90** | **40.89** |
| BEM-DNN (HUTUBS) | 4.80 | - | - |
| Proto. DNN (HUTUBS) | 3.69 | 5.10 | **32.90** |
| S2RNF (HUTUBS) | **3.66** | **5.02** | 33.22 |

## Limitations

The evaluation relies on pre-computed official simulated HRTFs derived from high-fidelity 3D head meshes rather than noisy meshes scanned in everyday environments. The study focuses purely on log-magnitude responses and minimum-phase reconstructions, deferring individual interaural time difference (ITD) personalization to future work.

## Why read this

Speech and audio researchers building accessible immersive spatial audio pipelines will find this a clean blueprint for bridging the gap between physics-based acoustic simulators and real-world neural representations without requiring manual anthropometric data or physical lab sessions.

## Code

- https://github.com/merlresearch/s2rnf

## Applications

Virtual reality, augmented reality, immersive gaming, and personal audio listening devices requiring customized binaural sound rendering.

## Institutions / 機構

Mitsubishi Electric Research Laboratories, University of Surrey

## Related

- (link related pages by id as the wiki grows)
