---
id: yalegama26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2524
pdf: https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.pdf
---

# Deep Learning Based Relative Transfer Matrix Estimation for Multiple Sources and Multiple Microphones

[PDF](https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yalegama26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2524)

**TL;DR** — This paper proposes three supervised deep learning frameworks for Relative Transfer Matrix (ReTM) estimation in multi-source, multi-microphone acoustic environments, outperforming conventional covariance-based methods in estimation accuracy and achieving competitive speech enhancement performance.

## Problem

Estimating the Relative Transfer Function (ReTF) is crucial for tasks like speech enhancement and localization, but traditional ReTF assumes single-active sources and fails when multiple simultaneous sources violate W-disjoint orthogonality. The recently introduced Relative Transfer Matrix (ReTM) generalizes ReTF to multi-source environments, yet existing estimation relies solely on statistical covariance matrix methods. This paper addresses the lack of deep learning approaches for direct ReTM estimation from multichannel audio recordings.

## Method

The authors introduce three fully supervised deep learning architectures: (1) SCoNet, an STFT-domain network using depthwise 2D convolutions across time and channel axes; (2) FuSNet, a time-domain network utilizing QA × QB learnable 1D convolutional filters corresponding to the discrete-time ReTM; and (3) LAeNet, an autoencoder processing STFT bins through a shared bidirectional LSTM (BiLSTM), layer normalization, time-averaging, and a feedforward network. Models are trained using a joint hybrid loss combining negative time-domain signal-to-distortion ratio (SDR) and STFT-domain relative spectrum error (RSE) optimized via the Adam optimizer. Experiments simulate 6x7x3 m rooms with T60 = 500 ms, testing receiver group configurations with Q = 7 (QA = 3, QB = 4) and Q = 12 (QA = 5, QB = 7) microphones under 40 dB SNR white Gaussian noise and complex noise scenarios.

## Results

Evaluated across five metrics (SDR, MSE, LSD, APD, and RSE) against a baseline covariance-based method, the proposed deep learning models consistently demonstrate superior ReTM estimation accuracy, particularly in time-domain metrics like MSE and SDR. For instance, in scenario C (12 microphones, 3 sources), FuSNet achieves an outstanding average SDR of 38.88 dB and MSE of −61.98 dB, vastly outperforming the baseline's 23.25 dB SDR and −43.35 dB MSE. STFT-domain models like SCoNet also consistently outperform the baseline, while speech denoising experiments show the proposed frameworks yield speech enhancement performance on par with traditional methods. Computational analysis shows FuSNet has the smallest footprint (98.3k–286.8k parameters and 1.07–2.41 ms latency on an RTX 3090) compared to LAeNet, which incurs the highest latency and parameter count.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers working on multichannel speech enhancement, speaker separation, and source localization for smart speakers, hearing aids, robot audition, and drone audio systems.

## Limitations

The models assume a stationary acoustic environment where all sound sources are unmoving, and model memory usage scales linearly with window length for convolutional architectures.

## Related

- (link related pages by id as the wiki grows)
