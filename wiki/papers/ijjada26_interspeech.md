---
id: ijjada26_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
institutions: ["Meeami Technologies"]
code: https://github.com/wavenorm123/WaveNorm_AGC
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2115
pdf: https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.pdf
---

# WaveNorm: A Low-Complexity Time-Domain Neural Adaptive Gain Control for Real-Time Speech Applications

*Deepika Ijjada, Charan Kumar Reddy B, Ashwini Hanaganti, Priyanka Devrao Jadhav, Varsha Uppalanchi, Balaji Padmanaban, Nivedita Chennupati, Karunakar Reddy Pucchakayala, Harish Rajamani, Naveen Ambati*

[PDF](https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2115)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — WaveNorm is a fully time-domain, causal neural adaptive gain control (AGC) model that normalizes speech loudness directly from raw waveforms using dilated grouped convolutions and a GRU bottleneck, achieving level-invariant outputs compliant with ITU-T P.56 and P.79 using only 49M MACs and 55 KB of memory.

## Key contributions

- Fully time-domain neural AGC architecture that avoids STFT/filter-bank phase distortions and reduces algorithmic latency.
- Combines multi-scale dilated grouped convolutions with a GRU-based temporal bottleneck to capture envelope dynamics and suppress pumping/breathing artifacts.
- Extremely lightweight edge footprint requiring only 49M MACs and 55 KB of memory for real-time processing.
- Demonstrated generalization as a model-agnostic front-end, consistently improving down-stream voice activity detection and noise suppression.

## Problem

Real-world speech exhibits severe dynamic range variability caused by speaker distance, room acoustics, and device differences, degrading downstream ASR, hearing aids, and teleconferencing tools. Conventional heuristic AGC relies on hand-crafted envelope detectors with fixed attack and release constants, which fail under rapid amplitude shifts, loud transients, or fluctuating background noise, resulting in clipping, pumping, delayed adaptation, and noise amplification. Recent deep learning methods exist, but many rely on spectral representations that introduce phase distortion, algorithmic latency, and excessive compute overhead unsuited for constrained edge platforms.

## Method

WaveNorm utilizes an encoder-bottleneck-decoder topology operating entirely on raw time-domain waveforms. The encoder comprises three sequential 1D dilated grouped convolutional blocks with exponentially increasing dilation factors (rates 2, 4, and 8, kernel size 3) and causal padding, followed by batch normalization and PReLU activations. This configuration yields a minimal receptive field of 27 samples (approx. 0.56 ms) for ultra-low latency while capturing short-, mid-, and long-term envelope structures.

The bottleneck features a Gated Recurrent Unit (GRU) with 32 hidden units paired with a dense layer (32 units) and layer normalization. This recurrent component integrates past loudness context to smooth out gain trajectories and prevent memoryless estimator artifacts like pumping or breathing. The decoder mirrors the encoder using three dilated grouped transposed Conv1D blocks with causal upsampling to reconstruct clean, gain-corrected waveforms without gridding artifacts.

The model is optimized via a hybrid objective combining time-domain Mean Squared Error (MSE) and a frequency-domain Multi-Resolution Spectral Loss (MRSL) calculated across STFT window sizes of 128, 256, 512, 1024, and 2048. Training runs for 200 epochs using the Adam optimizer with an initial learning rate of 1e-3, a batch size of 16, on NVIDIA A6000 GPUs, using synthesized hybrid utterances combining clean, noisy, and speech-free segments scaled from -10 dB to -60 dB RMS alongside multi-type noise augmentations (SNR -5 dB to +20 dB).

## Experimental setup

Evaluated on standalone attenuation using noisy VoiceBank+DEMAND (RMS -15 to -30 dB) and amplification using clean TIMIT (RMS -25 to -45 dB), alongside downstream VAD and noise suppression tests mixing TIMIT with DNS3 noise and room impulse responses. Baselines include WebRTC AGC and Carnival AGC, as well as un-processed baselines for Silero VAD, DeepFilterNet2 (DFN2), DTLN, and GTCRN. Metrics include FPR, FNR, Precision, Recall, AUC, NISQA, and DNSMOS.

## Results

WaveNorm successfully maps wide input RMS values (-10 to -60 dB) to a tight output distribution close to the target ITU-T P.56 active speech level (-26 dBov) and -26 to -28 LUFS. As a Silero VAD front-end, WaveNorm achieves the lowest False Positive Rate (0.272), highest AUC (0.96), and highest Precision (0.957), outperforming WebRTC and Carnival. When used as a preprocessor for noise suppression models (DFN2, DTLN, GTCRN), WaveNorm consistently boosts perceptual metrics, raising DFN2 NISQA from 3.22 to 3.57 and DNSMOS from 2.92 to 3.14.

| Front-end AGC | FPR ↓ | FNR ↓ | Prec. ↑ | Rec. ↑ | AUC ↑ |
|---|---|---|---|---|---|
| None (Baseline) | 0.302 | 0.028 | 0.952 | 0.972 | 0.92 |
| WebRTC | 0.304 | 0.019 | 0.953 | 0.981 | 0.93 |
| Carnival | 0.277 | 0.030 | 0.956 | 0.970 | 0.92 |
| WaveNorm (Ours) | 0.272 | 0.022 | 0.957 | 0.978 | 0.96 |

## Limitations

While trained at 48 kHz, evaluation relies heavily on standard 16 kHz datasets or resampled sets, and the paper focuses primarily on single-channel speech streams. Real-world performance under extreme multi-talker overlap or highly non-stationary acoustic catastrophes requires broader cross-lingual testing beyond standard benchmark corpora.

## Why read this

Speech and ML engineers building real-time, low-latency audio pipelines on resource-constrained edge hardware will find WaveNorm a practical blueprint for replacing brittle DSP-based AGC algorithms with an ultra-lightweight neural time-domain alternative.

## Code

- https://github.com/wavenorm123/WaveNorm_AGC

## Applications

Real-time edge speech enhancement, automatic speech recognition front-ends, teleconferencing systems, hearing assistance devices, and voice activity detection preprocessing.

## Institutions / 機構

Meeami Technologies

## Related

- [WaveNorm: Real-Time Neural AGC for Noise-Robust Speech Enhancement on Resource-Constrained Edge Devices](ijjada26b_interspeech.md) — shared technique · relatedness 3.0/3
- [SE-AGCNet: An End-to-End Framework for Joint Speech Enhancement and Loudness Control in Meeting Scenarios](zhang26n_interspeech.md) — same problem · relatedness 2.5/3
- [RT-SEMamba: Real-Time Speech Enhancement Mamba via Progressive Knowledge Distillation](chao26_interspeech.md) — same problem · relatedness 2.2/3
- [RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices](benslimane26_interspeech.md) — same problem · relatedness 2.0/3
- [Latency-Configurable Streaming Speech Enhancement via Asymmetric Temporal Padding](kim26g_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
