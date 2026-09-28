---
id: ijjada26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2115
pdf: https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.pdf
---

# WaveNorm: A Low-Complexity Time-Domain Neural Adaptive Gain Control for Real-Time Speech Applications

[PDF](https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ijjada26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2115)

**TL;DR** — WaveNorm is a lightweight, fully time-domain neural adaptive gain control model that delivers stable loudness normalization for real-time speech while operating within resource constraints (49M MACs, 55 KB memory).

## Problem

Conventional automatic gain control (AGC) systems rely on heuristic envelope detectors with fixed attack and release constants, which fail to handle rapid amplitude shifts and fluctuating noise effectively, causing clipping, pumping artifacts, and background noise amplification. These limitations degrade the performance of downstream speech processing applications like ASR and teleconferencing. Operating in the time domain avoids the phase distortion and algorithmic latency introduced by STFT or filter-bank front ends while exploiting fine-grained waveform structures.

## Method

WaveNorm uses an encoder-bottleneck-decoder architecture that processes raw audio waveforms causally. The encoder employs three sequential dilated grouped 1D convolutional blocks with exponentially increasing dilation rates (2, 4, 8) and batch normalization to capture multi-scale envelope dynamics without spectral decomposition. A temporal bottleneck featuring a Gated Recurrent Unit (GRU) with 32 hidden units and dense layers with layer normalization summarizes loudness history to ensure smooth, temporally consistent gain trajectories. The decoder mirrors the encoder using three dilated grouped transposed 1D convolutions to reconstruct the full-resolution waveform. The model is trained using a hybrid objective combining time-domain Mean Squared Error (MSE) and multi-resolution spectral loss (MRSL).

## Results

Evaluated on noisy VoiceBank+DEMAND and clean TIMIT datasets, WaveNorm maps wide input RMS ranges into a compact, level-invariant output distribution compliant with ITU-T P.56 and P.79 recommendations. When used as a pre-processing front-end for Silero VAD, it achieves an improved AUC of 0.96 and the lowest false positive rate of 0.272 compared to WebRTC and Carnival AGC baselines. Furthermore, integrating WaveNorm before noise suppression models such as DeepFilterNet2, DTLN, and GTCRN consistently boosts perceptual speech quality metrics, yielding NISQA and DNSMOS improvements such as a +0.35 NISQA increase for DeepFilterNet2.

## Code

- https://github.com/wavenorm123/WaveNorm_AGC

## Applications

Engineers building real-time communication systems, voice activity detectors, or noise suppression pipelines on resource-constrained edge hardware will find this useful for robust loudness normalization.

## Related

- (link related pages by id as the wiki grows)
