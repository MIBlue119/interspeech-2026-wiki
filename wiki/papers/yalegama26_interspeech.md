---
id: yalegama26_interspeech
category: enhancement-separation
institutions: ["University of Moratuwa", "Australian National University"]
code: https://github.com/oshanyalegama/Denoised_ReTM_DL
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2524
pdf: https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.pdf
---

# Deep Learning Based Relative Transfer Matrix Estimation for Multiple Sources and Multiple Microphones

*Oshan A. B. Yalegama, Wageesha N. Manamperi*

[PDF](https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2524)

**Category:** `enhancement-separation`

**TL;DR** — This paper introduces three deep learning frameworks—SCoNet, FuSNet, and LAeNet—for estimating the Relative Transfer Matrix (ReTM) in multi-source, multi-microphone environments, consistently outperforming traditional covariance-based methods in estimation accuracy and downstream speech enhancement.

## Key contributions

- Proposes SCoNet, an STFT-domain convolutional network utilizing depthwise convolutions across time and channel axes for ReTM estimation.
- Proposes FuSNet, a time-domain convolutional network that parameterizes inter-group transfer matrices using QA×QB learnable 1D filters.
- Proposes LAeNet, an STFT-domain autoencoder network leveraging a shared bidirectional-LSTM to capture narrow-band spatial features.
- Evaluates the models across diverse acoustic scenarios using five objective metrics (SDR, MSE, LSD, APD, RSE) and validates them in a speech denoising task.

## Problem

Traditional Relative Transfer Matrix (ReTM) estimation relies exclusively on statistical covariance matrix relationships between microphone groups, which degrades in complex multi-source acoustic environments. While deep learning has advanced single-source Relative Transfer Function (ReTF) estimation, exploring machine learning for multi-source ReTM mappings remains largely unaddressed. Overcoming this gap is vital for improving multi-source speech enhancement, speaker separation, and robot audition under reverberant conditions.

## Method

The paper formulates ReTM estimation in both the time domain and the Short-Time Fourier Transform (STFT) domain. SCoNet operates in the STFT domain by stacking real and imaginary parts as channels and applying 2D depthwise convolutions across time and frequency channels, learning distinct parameters per frequency component. FuSNet operates directly in the time domain using QA x QB learnable 1D convolutional filters of length L equal to the segment size, operating on a 3L context window to match room reverberation constraints. LAeNet processes concatenated STFT vectors independently per frequency bin through a shared bidirectional-LSTM (BiLSTM), layer normalization, temporal averaging, and a feedforward network to map ReTM coefficients.

All networks are jointly optimized using a weighted multi-domain loss combining time-domain negative signal-to-distortion ratio (SDR) and STFT-domain relative spectrum error (RSE), configured with factor weights alpha = 1 and beta = 10. Training utilizes the Adam optimizer with an adaptively reduced learning rate based on validation performance. For inference, SCoNet and FuSNet offer low latency (6.61-6.77 ms and 1.07-2.41 ms respectively), whereas LAeNet exhibits higher latency (~1.80 seconds) due to its recurrent sequence processing.

## Experimental setup

Evaluated using simulated room impulse responses in a 6x7x3 m rectangular room (T60 = 500 ms) with 7 to 12 microphones configured into groups A and B. Scenarios include white Gaussian noise (A1), air conditioner/music noise (A2), and multi-source environments combining speech, air conditioner, and music (B and C), with 40 dB SNR white noise added. Compared against a traditional covariance-based baseline using SDR, MSE, LSD, APD, and RSE metrics, and implemented using PyTorch on an NVIDIA GeForce RTX 3090 GPU.

## Results

FuSNet achieved the highest ReTM estimation accuracy in controlled scenarios, yielding up to 40.33 dB SDR and -62.89 dB MSE in scenario C, significantly outperforming the covariance-based baseline. However, in downstream speech denoising applications, FuSNet suffered from residual echo artifacts (achieving 2.21 dB SDR in scenario B), whereas time-frequency domain models excelled. LAeNet achieved the highest speech denoising performance with an average SDR of +10.55 dB and an STOI of 92% in scenario B, while SCoNet secured second place with an average SDR of +8.41 dB.

| System | Scenario B SDR (dB) | Scenario B STOI | Scenario C SDR (dB) | Scenario C STOI |
|---|---|---|---|---|
| Noisy | -2.70 | 0.54 | -2.70 | 0.54 |
| Baseline | 6.06 | 0.87 | 4.07 | 0.85 |
| SCoNet | 6.45 | 0.87 | 4.96 | 0.87 |
| FuSNet | 2.21 | 0.80 | -1.19 | 0.67 |
| LAeNet | 8.67 | 0.92 | 7.03 | 0.91 |

## Limitations

The evaluation is restricted to simulated static acoustic environments with stationary sound sources and fixed room geometry (T60 = 500 ms). Time-domain filters like FuSNet scale linearly in memory usage with window length and suffer from phase/echo degradations in speech denoising tasks without explicit dereverberation. Furthermore, testing is limited to simulated mixtures of up to three sources without real-world acoustic capture validation.

## Why read this

Speech and audio researchers working on multi-microphone array processing and spatial audio enhancement will find this a foundational baseline for replacing covariance heuristics with neural ReTM estimators. It offers clear architectural trade-offs between STFT-domain (SCoNet, LAeNet) and time-domain (FuSNet) models.

## Code

- https://github.com/oshanyalegama/Denoised_ReTM_DL

## Applications

Multi-source speech enhancement, teleconferencing systems, hearing aids, robot and drone audition, and acoustic echo cancellation.

## Institutions / 機構

University of Moratuwa, Australian National University

**Funding / 經費:** Accelerating Higher Education Expansion and Development, World Bank

## Related

- (link related pages by id as the wiki grows)
