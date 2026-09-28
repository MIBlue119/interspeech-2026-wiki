---
id: benslimane26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3301
pdf: https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.pdf
---

# RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices

[PDF](https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/benslimane26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3301)

**TL;DR** — RT-Tango is a real-time distributed binaural speech enhancement framework for hearing aids that achieves competitive quality while running at an ultra-low latency of 8 ms and a computational cost of 35.14 MMACs/s.

## Problem

Real-time binaural speech enhancement on hearing aids is constrained by strict energy limits, low-latency requirements, and limited inter-device communication bandwidth. Traditional single-channel models ignore spatial cues, whereas centralized multi-microphone setups demand excessive wireless transmission bandwidth between ears. Existing distributed methods fail to jointly satisfy low latency, low compute complexity, and perceptual quality.

## Method

RT-Tango uses a two-stage distributed architecture where each ear-node independently estimates speech/noise masks and computes a Speech Distortion Weighted Multichannel Wiener Filter before exchanging compressed signals. The framework combines an ERB-scaled filterbank for perceptually motivated frequency compression, grouped recurrent neural networks (GRNNs with G=8 for SN-DNN and G=2 for MN-DNN) for efficient localized spectral modeling, and fixed-rate temporal frame skipping for inference sparsification. Low-latency streaming is achieved via an asymmetric STFT configuration (32 ms analysis, 8 ms synthesis window) and online spatial covariance matrix estimation using an exponential moving average.

## Results

Evaluated on a subset of the BinauRec1 dataset across 1,200 binaural mixtures generated with real-world room impulse responses, RT-Tango and its streaming variant RT-Tango-OS are compared against Tango, Tango-RNN, and an adapted GTCRN baseline. RT-Tango-OS runs at 35.14 MMACs/s (0.49 MMACs/frame) with an 8 ms algorithmic latency, yielding SI-SDR scores of 20.5 dB (left) and 24.7 dB (right), and PESQ scores of 1.54 (left) and 1.63 (right). Ablations demonstrate that grouped RNNs and fixed-rate skipping reduce computational load by up to 75% for the single-node DNN with negligible quality loss.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers designing on-device hearing aids, wearable audio devices, or resource-constrained binaural communication systems.

## Limitations

Online SCM estimation causes a slight degradation in SI-SDR and SI-SAR compared to offline Oracle processing, and aggressive grouping in the multi-node DNN leads to a 0.8-1 dB drop in performance.

## Related

- (link related pages by id as the wiki grows)
