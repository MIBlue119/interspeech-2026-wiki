---
id: fan26d_interspeech
category: enhancement-separation
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2774
pdf: https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.pdf
---

# Cloud-Boosted Low-Compute Multi-Channel Speech Enhancement

*Xulin Fan, Juan Azcarreta, Ashutosh Pandey, Jesus Alvarez, Ke Tan, Jacob Donley, Ritwik Giri, Buye Xu*

[PDF](https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fan26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2774)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`

**TL;DR** — A collaborative cloud-edge speech enhancement framework combines delayed server outputs, layerwise feature boosting, and collaborative multichannel Wiener filtering to improve low-compute on-device models. It achieves a 3.77 dB SI-SDR improvement on standard test conditions with only a 1.5% increase in edge parameters.

## Key contributions

- Delayed Input Concatenation: Feeds the server's enhanced audio as an auxiliary reference channel alongside microphone inputs to provide a clean temporal prior.
- Layerwise Feature Boosting: Transfers hierarchical representations from 4 points of a frozen server SpatialNet to a TinyGRU edge model via Feature-wise Linear Modulation (FiLM).
- Collaborative Multichannel Wiener Filter (MCWF): Fuses instantaneous edge covariance matrices with adaptively weighted, delayed server cross-covariance vectors to stabilize beamforming.
- Resource-Efficient Architecture: Yields significant performance gains under a 64 ms network delay while adding less than 2.5% to edge computational complexity (MMACs).

## Problem

Compact on-device speech enhancement models deployed on wearable devices are constrained by low parameter counts and shallow depths, restricting their capacity to model complex acoustic scenes and handle ultra-low SNR environments. High-capacity server networks perform well but are unsuitable for real-time edge execution due to excessive compute and memory footprints. Prior hybrid frameworks and basic knowledge boosting techniques fail to bridge this performance gap under communication latency because they cannot adapt to rapid non-stationary spectral variations or effectively leverage spatial statistics when offloaded.

## Method

The system features a frozen, causal SpatialNet server model (processing multichannel input) and a lightweight edge model based on TinyGRU. The edge model consists of a spatial convolution module (reducing multichannel input to single-channel), three SplitGRU temporal processing layers, and a complex-valued mask estimator that drives an MCWF beamformer. To handle communication delays, server outputs are delayed by τ frames (default 64 ms, corresponding to 8τ ms). The delayed complex server spectrogram is concatenated to the 2M-channel real/imaginary microphone inputs, resulting in 2(M+1) input channels.

For layerwise feature boosting, internal representations are sampled from SpatialNet layers {input, 4, 8, 12}, compressed via 1x1 convolutions, temporally delayed, and injected into TinyGRU via hierarchical FiLM conditioning to provide scale and shift parameters to the RNN layers. In the collaborative MCWF module, instantaneous spatial covariance matrices are computed locally from the edge input, whereas cross-covariance vectors between the input and target are computed independently by the edge and server. A per-frame scalar weight α(t) predicted by TinyGRU adaptively fuses the delayed server cross-covariance with the real-time edge cross-covariance, balancing spatial estimation quality against communication lag. These statistics undergo time-varying recursive smoothing using learned per-frequency weight vectors and per-frame scalar weights before computing the final MCWF beamformer coefficients.

## Experimental setup

Evaluated on Standard (SNR [-5, 10] dB) and Challenging (SNR [-10, -5] dB) simulated datasets using an 8-channel circular microphone array, generated via Pyroomacoustics with room sizes 3x3x2 to 10x10x5 meters and 8-16 interference speakers. The system processes 16 kHz audio via STFT with 256-sample frame size and 128-sample hop size. The server SpatialNet is pretrained for 100 epochs using PCM loss, while edge models are trained for 100 epochs using the Adam optimizer (AMSGrad) with an initial learning rate of 10^-3, decayed by 0.1 at epochs 50 and 80, and trained on SNR loss with 4-second chunks and batch size 32. Baselines include noisy input, vanilla TinyGRU+MCWF, and a scaled-up TinyGRU-Large model with 192 hidden dimensions.

## Results

On the Standard dataset, the baseline TinyGRU+MCWF achieves 1.97 dB SI-SDR and 82.36% STOI. Adding delayed server output conditioning raises SI-SDR to 3.05 dB, layerwise feature boosting further increases it to 4.47 dB, and the full collaborative MCWF model reaches 5.74 dB SI-SDR and 85.48% STOI (a total gain of 3.77 dB over the baseline). On the Challenging dataset, the full model improves SI-SDR from -1.16 dB (baseline) to 2.33 dB, outperforming a scaled-up TinyGRU-Large baseline (-0.37 dB SI-SDR) which uses 198% more parameters and 109% more MMACs. Increasing network latency to 96 ms and 128 ms causes graceful degradation, dropping Standard SI-SDR to 4.39 dB and 4.26 dB respectively, but still outperforming edge-only execution.

| System / Condition | SI-SDR (↑) Standard | PESQ (↑) Standard | STOI (↑) Standard | SI-SDR (↑) Challenging | PESQ (↑) Challenging | STOI (↑) Challenging |
|---|---|---|---|---|---|---|
| Noisy Input | -4.96 | 1.68 | 69.27 | -10.01 | 1.28 | 55.70 |
| TinyGRU + MCWF [4] | 1.97 | 2.29 | 82.36 | -1.16 | 1.90 | 70.49 |
| + Delayed Output (a) | 3.05 | 2.34 | 83.93 | -0.02 | 1.97 | 72.58 |
| + Layerwise Boosting (a,b) | 4.47 | 2.35 | 84.24 | 1.35 | 1.98 | 72.68 |
| Full Collaborative MCWF (a,b,c) | 5.74 | 2.33 | 85.48 | 2.33 | 1.95 | 73.73 |
| TinyGRU-Large + MCWF [4] | 2.75 | 2.33 | 83.54 | -0.37 | 1.95 | 72.19 |

## Limitations

The framework assumes a stable, continuous network connection with bounded round-trip latency (evaluated up to 128 ms), meaning packet loss or severe network jitter could destabilize the adaptive fusion weights. The approach requires a fixed, pretrained server-side model and relies on simulated acoustic conditions (DNS-Challenge with Pyroomacoustics RIRs), leaving real-world hardware deployment and variable acoustic mismatch across real microphone arrays unverified. Furthermore, evaluation is restricted to speech enhancement without testing multi-task generalization to tasks like speaker extraction or separation within the same cloud-edge loop.

## Why read this

Speech and ML engineers building real-time communication systems for wearables should read this to understand how to effectively fuse server-side spatial statistics with low-compute edge models under latency constraints. It provides a practical blueprint for outperforming massive edge-only capacity scaling using targeted feature modulation and covariance fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time communication on smart glasses, hearables, and other resource-constrained edge audio devices operating under noisy and reverberant conditions.

## Institutions / 機構

University of Illinois Urbana-Champaign, Meta

## Related

- (link related pages by id as the wiki grows)
