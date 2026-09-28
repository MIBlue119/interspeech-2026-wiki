---
id: wang26e_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-271
pdf: https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.pdf
---

# Predictive Directional Selective Fixed-Filter Active Noise Control for Moving Sources via a Convolutional Recurrent Neural Network

[PDF](https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-271)

**TL;DR** — The paper introduces a predictive directional selective fixed-filter active noise control method using a convolutional recurrent neural network to proactively track and cancel noise from moving sources, achieving stable noise reduction above 15 dB across dynamic trajectories.

## Problem

Traditional active noise control (ANC) systems for moving sources rely on adaptive algorithms like FxLMS that suffer from slow convergence and divergence risks, while existing selective fixed-filter methods either lack spatial awareness or experience lagging responses due to frame delays. This delay leads to significant performance degradation during source transitions and non-stationary motion. Addressing this is crucial for effective acoustic attenuation in real-world environments with moving noise sources such as vehicles and appliances.

## Method

The framework couples a real-time sampling-rate controller with a frame-rate co-processor running a compact Convolutional Recurrent Neural Network (CRNN). The CRNN takes K=4 consecutive context frames of multichannel reference spectrograms (magnitude and phase concatenated across J=4 microphone channels), processes them through three 2D convolutional blocks with group normalization and max pooling, applies adaptive average frequency pooling, and routes the features through a Gated Recurrent Unit (GRU) to capture inter-frame temporal dynamics. A fully connected softmax layer classifies the next-frame Direction-of-Arrival (DoA) among V=36 discrete candidate angles. The system utilizes a pre-trained library of 36 control filters generated via the FxLMS algorithm on broadband white noise across uniformly sampled azimuths, deploying cross-entropy loss and the Adam optimizer for CRNN training with 0.05 million parameters and 480.08 million MACs.

## Results

Evaluated using simulated room impulse responses across multiple room sizes (e.g., 11x9x3.2 m), reverberation times (RT60 up to 0.83 s), and SNRs (10 to 50 dB) with UrbanSound8K and synthesized noise, the CRNN achieves over 90% DoA classification accuracy at 20 dB SNR and above. In comparison against FxLMS, directional SFANC (D-SFANC), and dynamic factor graph SFANC (DFG-SFANC) using vacuum cleaner noise under constant-rate (10 deg/s) and sinusoidal time-varying trajectories, the proposed method maintains stable noise reduction levels (NRL) above 15 dB. Unlike D-SFANC which exhibits a one-frame lag and DFG-SFANC which drops performance during rapid acceleration intervals, the predictive mechanism completely eliminates transition delays.

## Code

- https://github.com/Wang-Boxiang/PD-SFANC

## Applications

Engineers designing active noise control systems for dynamic, moving acoustic environments such as smart cabins, wearable devices, and automated machinery.

## Limitations

The current system formulation and evaluation are strictly limited to single-source moving scenarios.

## Related

- (link related pages by id as the wiki grows)
