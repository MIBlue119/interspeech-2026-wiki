---
id: song26g_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3119
pdf: https://www.isca-archive.org/interspeech_2026/song26g_interspeech.pdf
---

# Real-Time Speech Enhancement on Edge Devices Guided by Harmonic and Voice-Activity Cues Utilizing Skin-Attachable Accelerometer

*Yonghun Song, Yeongmin Kim, Yunsik Kim, Yeeun Kim, Yoonyoung Chung*

[PDF](https://www.isca-archive.org/interspeech_2026/song26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3119)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`, `robustness-noise`

**TL;DR** — LAU-NetV2 is a lightweight, multimodal speech enhancement network that uses skin-attachable accelerometer (ACC) cues to modulate an acoustic microphone (AM) U-Net via Feature-wise Linear Modulation (FiLM), improving PESQ from 1.78 to 2.78 on extremely noisy data while running in 48.66 ms on a microcontroller.

## Key contributions

- Proposes a cue-guided FiLM mechanism to inject noise-robust bone-conducted ACC representations (VAD and harmonic structures) into an AM enhancement U-Net without costly parallel encoders or attention blocks.
- Achieves a compact design with only 45.59k parameters and 65.71M MACs/s, drastically reducing parameter count compared to prior multimodal architectures (e.g., 68× fewer than VibVoice).
- Applies 40% structured channel pruning to reduce microcontroller inference time from 87.12 ms to 48.66 ms, fitting within a strict real-time algorithmic latency budget.
- Validates real-time feasibility on a physical wearable prototype using an STM32H753 MCU operating under severe server-room noise (92.27 dBA).

## Problem

Acoustic microphones degrade severely in high-noise or low-SNR environments (below 0 dB), while prior lightweight single-channel networks lack the capacity to recover fine harmonic structures. Conversely, existing multimodal setups combine accelerometer (ACC) and microphone signals using heavy parallel encoders or cross-attention blocks, generating multi-megabyte footprints that exceed the hundred-kilobyte RAM limits of standard microcontroller units (MCUs). This prevents advanced robust speech enhancement from running on resource-constrained wearable edge devices.

## Method

The system processes 8 kHz noisy AM and ACC streams using log-magnitude STFTs with a 512-sample Hanning window and 128-sample hop size. The network backbone is a U-Net with three frequency-axis downsampling convolution blocks, a bottleneck containing both a frequency-axis GRU (FGRU) and a time-axis GRU (TGRU), and three upsampling blocks. ACC signals provide noise-robust structural vibrations from which two cues are extracted: a frame-level power voice activity detection (VAD) mask and a fundamental frequency-derived soft harmonic mask.

These cues are passed through a lightweight two-layer 1D convolution block to generate scaling (gamma) and shifting (beta) FiLM parameters matching the bottleneck dimensions. Harmonic-guided FiLM conditions features before the FGRU to preserve voiced structures, and VAD-guided FiLM conditions features before the TGRU to suppress non-speech regions. The enhanced AM spectrogram is reconstructed via inverse STFT using the noisy AM phase. Training minimizes mean squared error (MSE) on log-magnitude spectrograms for 100 epochs using AdamW (learning rate 4e-4, batch size 64).

To meet real-time constraints on an STM32H753 microcontroller (480 MHz, 1 MB RAM, 2 MB Flash) with an end-to-end latency budget of 176 ms (leaving 58.25 ms for model inference), structured channel pruning at a 40% ratio is applied based on mean absolute activations. The pruned model is subsequently fine-tuned to recover enhancement performance.

## Experimental setup

Evaluated on the TAPS dataset (AM and ACC paired recordings from 60 speakers: 40 train, 10 val, 10 test) mixed with 6,000 DNS Challenge noise clips at SNRs uniformly distributed from -20 dB to 20 dB. Compared against noisy-AM-only baselines (FSPEN, LiSenNet) and multimodal baselines (VibVoice, LAU-NetV1, FT-JNF S). Evaluated via narrowband PESQ, STOI, DNSMOS P.835, parameter count, MACs/s, and on-device inference latency.

## Results

LAU-NetV2 achieves a PESQ of 1.996 at -20 dB SNR and 2.744 at 0 dB SNR, outperforming VibVoice (1.778 and 2.634) and FSPEN (1.292 and 1.961) while using only 45.59k parameters and 65.71M MACs/s. On the full test set across all SNRs, the full model achieves a PESQ of 2.78 and STOI of 0.88, compared to 1.78 PESQ and 0.69 STOI for the baseline U-Net. Ablations confirm that adding the ACC input, VAD-FiLM, and Harmonic-FiLM incrementally improves PESQ from 1.78 to 2.42, 2.50, 2.58, and finally 2.78. Disabling the multiplicative scaling term (gamma = 0) causes a substantially larger drop in PESQ (down to 1.85 for VAD and 2.24 for harmonic) than disabling the additive shift (beta = 0), proving scaling dominates enhancement efficacy. On the target MCU, 40% structured channel pruning drops inference time from 87.12 ms to 48.66 ms while keeping PESQ at 2.62 and reducing the memory footprint from 224.38/232.32 KiB Flash/RAM to 153.73/151.22 KiB.

| Method | Parameters | MACs/s | PESQ (-20dB) | PESQ (0dB) | STOI (0dB) |
| --- | --- | --- | --- | --- | --- |
| Noisy AM | - | - | 1.331 | 1.590 | 0.764 |
| VibVoice [21] | 3.10M | 5,080M | 1.778 | 2.634 | 0.774 |
| LAU-NetV1 [26] | 92.98k | 38.98M | 1.916 | 2.660 | 0.890 |
| FSPEN [7] | 79k | 89M | 1.292 | 1.961 | 0.816 |
| LiSenNet [8] | 37k | 56M | 1.277 | 2.212 | 0.832 |
| LAU-NetV2 (ours) | 45.59k | 65.71M | 1.996 | 2.744 | 0.893 |

## Limitations

The evaluation relies on a single dataset (TAPS) restricted to 60 Korean speakers, leaving cross-lingual and speaker-generalization scope bounds unverified. Signals are downsampled to 8 kHz, which limits the recovery of high-frequency acoustic details above 4 kHz. Furthermore, real-world deployment assumes rigid skin attachment of the accelerometer; loose placement or motion artifacts could degrade bone-conduction cue extraction.

## Why read this

Researchers and edge-AI engineers building wearable speech interfaces should read this paper to learn how to inject auxiliary sensor modalities via lightweight FiLM modulation instead of costly attention blocks.

## Code

- https://github.com/yhsong06/LAU-NetV2

## Applications

Real-time speech enhancement on resource-constrained wearable hardware such as smart glasses, hearing aids, and specialized earbuds operating in extremely noisy environments.

## Institutions / 機構

Pohang University of Science and Technology, Intus

**Funding / 經費:** National Research Foundation, Institute of Information & Communications Technology Planning & Evaluation, High-Performance Computing Support Project, Regional Innovation System & Education project

## Related

- (link related pages by id as the wiki grows)
