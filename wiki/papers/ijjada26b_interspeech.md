---
id: ijjada26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.pdf
---

# WaveNorm: Real-Time Neural AGC for Noise-Robust Speech Enhancement on Resource-Constrained Edge Devices

[PDF](https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.html)

**TL;DR** — WaveNorm AGC introduces a lightweight, time-domain neural adaptive gain control system that achieves stable real-time loudness normalization and ~6 dB noise reduction on edge devices.

## Problem

Traditional rule-based AGC methods rely on heuristic envelope tracking and fixed time constants that lack speech-noise separation, resulting in delayed adaptation, clipping, and background noise amplification. Meanwhile, time-frequency learning approaches introduce high latency that makes them unsuitable for streaming edge applications. WaveNorm AGC bridges this gap by providing a causal, low-latency, content-aware normalization model designed specifically for resource-constrained edge hardware.

## Method

The architecture operates entirely in the time domain using an encoder-bottleneck-decoder layout with 20 ms frames and 10 ms shifts. The encoder applies causal Conv1D layers with grouped convolutions and dilations (2, 4, 8) across a 27-sample receptive field (~0.56 ms latency). A GRU-based temporal bottleneck with a hidden size of 32 models long-term dependencies, followed by fully connected layers and a symmetric transposed Conv1D decoder. Trained via an end-to-end hybrid loss combining time-domain Mean Squared Error and Multi-Resolution Spectral Loss (MRSL) across five STFT sizes, the model requires 49M MACs and 55 KB of memory.

## Results

Evaluated on an in-house 48 kHz corpus, VoiceBank+DEMAND, and TIMIT datasets across dynamic ranges down to -70 dB, WaveNorm AGC successfully maintains Active Speech Level near -26 dBov and loudness between -26 and -28 LUFS to satisfy ITU-T P.56 and P.79 standards. It outperforms WebRTC and Carnival baselines by avoiding input-dependent gain variance while achieving ~6 dB of background noise suppression. As a front-end for noise suppression models like DeepFilterNet2, DTLN, and GTCRN, it delivers up to +0.35 NISQA score improvements on unseen test sets.

## Code

- https://github.com/CARNIVAL-IITP/Automatic

## Applications

Speech and ML engineers building real-time teleconferencing tools, hearing aids, and edge-based automatic speech recognition systems can use this model for robust loudness normalization and noise suppression.

## Related

- (link related pages by id as the wiki grows)
