---
id: zhang26z_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1679
pdf: https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.pdf
---

# Time-Unconditional Generative Speech Enhancement via Autonomous Rectified Flow

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26z_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1679)

**TL;DR** — The paper introduces Autonomous Rectified Flow (ARF), a time-unconditional generative speech enhancement framework that eliminates explicit time-step conditioning to achieve a competitive PESQ of 3.11 with 5 function evaluations and an RTF of 0.02 with a single step.

## Problem

Most generative speech enhancement models rely on explicit time-step embeddings to modulate vector fields, which forces them to learn trajectory-specific noise scales and makes them prone to overfitting temporal paths. This temporal conditioning is mathematically redundant for linear-path boundary-anchored tasks because the target vector field is inherently time-invariant. Removing this dependency improves generation robustness, avoids numerical deviation errors during inference, and enhances computational efficiency.

## Method

The paper proposes the Autonomous Rectified Flow (ARF) framework, which models the generative process using an autonomous ordinary differential equation (ODE) system that completely discards time-step information. Based on a linear interpolation path between clean speech and noisy observations, the target velocity vector field is proven to be equivalent to modeling the underlying noise distribution plus stochastic regularization. The neural network architecture is built upon the NCSN++ backbone with a parameter size of 65.6M (and 27.8M for ablations), where the time-step input and noise scheduling modules are frozen or removed. Training uses the Adam optimizer with a learning rate of 1e-4, batch size of 4, and EMA decay of 0.999 over 100 epochs, while inference employs a multi-step Euler solver with uniform backward integration.

## Results

Evaluated on the VoiceBank+DEMAND dataset, ARFSE achieves a PESQ score of 3.11, eSTOI of 0.88, SI-SDR of 18.02 dB, and DNSMOS of 4.27 at NFE=5. When reduced to a single function evaluation (NFE=1), ARFSE maintains strong performance with a PESQ of 3.00, SI-SDR of 19.91 dB, and an RTF reduced to 0.02. It is benchmarked against generative baselines FlowSE and BBED under identical parameter configurations. Results show that ARFSE outperforms or matches existing single-step and multi-step generative speech enhancement baselines while significantly lowering computational overhead.

## Code

- https://github.com/zhangwen0821/ARFSE.git

## Applications

Speech/ML engineers working on real-time speech enhancement, noise suppression, and high-fidelity speech restoration for communication devices or telephony systems.

## Related

- (link related pages by id as the wiki grows)
