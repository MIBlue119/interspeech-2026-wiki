---
id: kim26g_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-817
pdf: https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.pdf
---

# Latency-Configurable Streaming Speech Enhancement via Asymmetric Temporal Padding

*Yunsik Kim, Yoonyoung Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-817)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — LaCo-SENet introduces asymmetric temporal padding and dual-buffer streaming to configure algorithmic latency continuously in a convolutional speech enhancement model, achieving PESQ 3.35 at a fully causal 12.5 ms latency.

## Key contributions

- Asymmetric temporal padding redistributes past and future context inside convolutions as a training-time hyperparameter without changing parameter count or receptive field.
- A dual-buffer streaming framework uses input lookahead, feature buffers, and selective state updates to guarantee training-inference consistency.
- A fixed 1.37M-parameter model spans a latency regime of 12.5 ms to 75.0 ms, outperforming prior causal baselines at lower latencies.
- Demonstrates exact numerical equivalence between chunk-wise streaming inference and full-sequence inference.

## Problem

Existing streaming speech enhancement models are locked to a rigid, binary choice between fully causal or fixed non-causal configurations, preventing systematic exploration of the latency-quality trade-off within a single architecture. Prior approaches like DeepFilterNet and cached convolution rely on strict constraints (e.g., global shifts or symmetric kernels) that explicitly avoid per-layer asymmetric padding to prevent state corruption. Naively applying asymmetric padding in chunk-based streaming records lookahead frames into convolution state buffers, causing severe state contamination and audio distortion over time. Resolving this gap is critical for optimizing real-time telephony, hearing aids, and on-device interfaces where algorithmic latency directly dictates responsiveness.

## Method

LaCo-SENet builds upon PrimeK-Net with 1.37M parameters, using 64 dense channels, DSDDB depth 4, and four Time-Frequency sequence blocks. The backbone processes compressed magnitude and phase spectrograms (STFT window/hop/fft: 400/100/400 samples at 16 kHz) to predict magnitude masks and enhanced phases.

To configure latency, the temporal padding ratio r = (rL, rR) with rL + rR = 1 controls the past-to-future context split across asymmetric convolutions while keeping the total padding P_tot constant. Streaming deployment requires three mechanisms: (1) an encoder input lookahead buffer extending input by L_enc frames; (2) a decoder feature buffer that waits for buffered frames >= C + L_dec before invoking parallel mask/phase decoders; and (3) a selective state update operator pi_C(x) = x_1:C that records only current-chunk frames into convolution state buffers while blocking lookahead frames from polluting future chunks.

Streaming-specific modifications replace InstanceNorm with chunk-invariant BatchNorm and global AdaptiveAvgPool1d in channel attention with causal depthwise CausalConv1d (K_sca = 11). The loss combines magnitude, phase, complex, consistency, and MetricGAN metric terms (L = 0.9 L_mag + 0.3 L_pha + 0.1 L_com + 0.05 L_con + 0.05 L_gan).

## Experimental setup

Evaluated on the VoiceBank+DEMAND dataset at 16 kHz (11,572 training and 824 test utterances mixed across 10 noise types and 4 SNR levels). Baselines include causal systems RNNoise, GaGNet, DeepFilterNet3, and aTENNuate, alongside non-causal PrimeK-Net. Metrics include wideband PESQ, STOI, CSIG, CBAK, and COVL. Implemented with AdamW (lr = 5e-4, batch size 8, 400K steps) using three random seeds per configuration, and measured for steady-state RTF using ONNX Runtime on a single Intel Xeon Silver 4510 thread.

## Results

At a fully causal 12.5 ms latency, LaCo-SENet achieves a PESQ of 3.35, outperforming prior causal baselines like aTENNuate (3.27 at 46.5 ms). Increasing lookahead raises PESQ to 3.40 at 50 ms and 3.43 at 75 ms, retaining 93-95% of non-causal PrimeK-Net's performance (3.61) with 1.37M parameters. Ablations confirm that disabling selective state update (SSU) causes catastrophic performance collapse across all asymmetric settings, dropping PESQ below the noisy baseline (1.97). Streaming RTF improves from 4.59 at chunk size C=1 down to ~0.23-0.30 at C=64.

| System | Latency (ms) | Params | PESQ | STOI | CSIG |
|---|---|---|---|---|---|
| Noisy | — | — | 1.97 | 0.921 | 3.35 |
| RNNoise | 10.0 | 0.06M | 2.33 | 0.922 | 3.40 |
| DeepFilterNet3 | 40.0 | 2.13M | 3.17 | 0.944 | 4.34 |
| aTENNuate | 46.5 | 0.84M | 3.27 | — | 4.57 |
| LaCo-SENet (Ours) | 12.5 | 1.37M | 3.35 | 0.952 | 4.61 |
| LaCo-SENet (Ours) | 75.0 | 1.37M | 3.43 | 0.954 | 4.66 |

## Limitations

Evaluated exclusively on the VoiceBank+DEMAND dataset which features clean English speech mixed with synthetic background noises, leaving multi-language and real-world acoustic generalization unverified. The framework targets convolutional architectures and requires explicit tuning of the temporal padding ratio r during training rather than dynamic runtime adaptation.

## Why read this

Speech and ML engineers building real-time audio systems should read this to learn how to decouple streaming latency configuration from model architecture using asymmetric padding and selective state updates.

## Code

- https://github.com/yskim3271/LaCo-SENet

## Applications

Real-time telephony, web conferencing, hearing aids, and on-device voice assistant pipelines requiring configurable streaming speech enhancement.

## Institutions / 機構

Pohang University of Science and Technology, Intus

**Funding / 經費:** National Research Foundation of Korea, Ministry of Science and ICT, Institute of Information & Communications Technology Planning & Evaluation, Regional Innovation System & Education project, High-Performance Computing Support Project

## Related

- (link related pages by id as the wiki grows)
