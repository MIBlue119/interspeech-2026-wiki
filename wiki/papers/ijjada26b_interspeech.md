---
id: ijjada26b_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time, robustness-noise]
institutions: ["Meeami Technologies"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.pdf
---

# WaveNorm: Real-Time Neural AGC for Noise-Robust Speech Enhancement on Resource-Constrained Edge Devices

*Deepika Ijjada, Charan Kumar Reddy B, Ashwini Hanaganti, Priyanka Devrao Jadhav, Varsha Uppalanchi, Nivedita Chennupati, Karunakar Reddy Pucchakayala, Balaji Padmanaban, Harish Rajamani, Naveen Ambati*

[PDF](https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ijjada26b_interspeech.html)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`, `robustness-noise`

**TL;DR** — WaveNorm AGC is a lightweight, time-domain neural adaptive gain control and noise reduction system designed for edge devices, achieving stable loudness normalization across a dynamic range up to -70 dB with ~6 dB noise reduction while requiring only 55 KB of memory.

## Key contributions

- Proposes a fully causal, time-domain neural adaptive gain control (AGC) model mapping raw waveforms directly to level-invariant, noise-reduced speech.
- Combines an encoder-decoder structure built with causal grouped dilated convolutions and a GRU temporal bottleneck (32 hidden units) to eliminate pumping and gain-hunting artifacts.
- Achieves extreme hardware efficiency with 49M MACs and a tiny 55 KB memory footprint, suitable for constrained edge deployment.
- Maintains strict adherence to ITU-T P.56 and P.79 loudness standards across a wide dynamic range down to -70 dB while yielding ~6 dB of background noise suppression.

## Problem

Real-world speech undergoes severe amplitude variations due to distance, acoustics, and hardware, degrading downstream tasks like ASR and teleconferencing. Traditional DSP-based heuristics like WebRTC AGC rely purely on signal energy without separating speech from noise, causing clipping, delayed adaptation, and noise amplification. Existing learning-based alternatives often operate in the time-frequency domain, introducing excess algorithmic latency that precludes real-time edge deployment.

## Method

WaveNorm operates in the time domain on 20 ms frames with a 10 ms shift, featuring an algorithmic latency of ~0.56 ms (27 samples receptive field). The encoder uses causal Conv1D layers with kernel size 3 and dilation rates of 2, 4, and 8, combined with grouped convolutions for parameter efficiency across channels. These features pass through a GRU-based temporal bottleneck with a hidden size of 32, followed by 32 fully connected units, which models long-term dependencies to enforce smooth gain transitions and prevent pumping. The decoder mirrors the encoder using Transposed Conv1D layers with reversed dilation rates (8, 4, 2) to reconstruct the clean, normalized waveform directly.

The system is optimized end-to-end using a hybrid loss function combining time-domain Mean Squared Error (MSE) and frequency-domain Multi-Resolution Spectral Loss (MRSL) computed across STFT bin sizes of 128, 256, 512, 1024, and 2048. Training utilizes an in-house 48 kHz corpus compiled from DNS3 clean speech scaled between -10 and -70 dB RMS, augmented with stationary and non-stationary noises at -5 to +20 dB SNR. Models are trained using the Adam optimizer (learning rate 10^-3 with ReduceLROnPlateau) and a batch size of 16 for 200 epochs on NVIDIA A6000 GPUs.

## Experimental setup

Evaluated on an in-house 48 kHz dataset, noisy VoiceBank+DEMAND (-15 to -30 dB RMS), and clean TIMIT (-25 to -45 dB RMS) mixed with unseen DNS3 noise and room impulse responses (RIRs). Metrics include Active Speech Level, ITU-T P.56 and P.79 loudness compliance (target -26 to -28 LUFS), and NISQA perceptual quality scores when paired with front-ends like DeepFilterNet2, DTLN, and GTCRN. Baselines include traditional WebRTC AGC and Carnival.

## Results

WaveNorm produces level-invariant outputs with smooth transitions, consistently keeping Active Speech Level near -26 dBov and loudness between -26 and -28 LUFS while achieving ~6 dB of noise reduction. When used as a preprocessing front-end with DeepFilterNet2, DTLN, and GTCRN on unseen DNS3 noise mixtures, it yields up to +0.35 NISQA score improvements over baseline systems.

| System / Condition | Active Speech Level | Loudness | Noise Reduction | NISQA Gain |
| --- | --- | --- | --- | --- |
| WebRTC AGC [1] | Input-Dependent | Variable | 0 dB | Baseline |
| Carnival [2] | Variable | Variable | Moderate | +0.00 |
| WaveNorm AGC (Proposed) | ~-26 dBov | -26 to -28 LUFS | ~6 dB | Up to +0.35 |

## Limitations

The evaluation relies heavily on synthetic mixtures derived from DNS3, VoiceBank+DEMAND, and TIMIT datasets, which may not fully span extreme real-world acoustic anomalies. Hardware-specific constraints such as fixed-point quantization impacts on edge microcontrollers are not evaluated in detail. The paper focuses primarily on 48 kHz and 16 kHz telephony/edge setups, leaving ultra-low-power sub-10 KB MCU deployments unexplored.

## Why read this

Audio and edge-AI engineers building real-time communication hardware or software pipelines will learn how to replace fragile DSP heuristic AGC blocks with a sub-milligram latency neural network that jointly performs normalization and denoising.

## Code

- https://github.com/CARNIVAL-IITP/Automatic

## Applications

Real-time teleconferencing, hearing aids, edge-based speech communication devices, and robust front-ends for automatic speech recognition.

## Institutions / 機構

Meeami Technologies

## Related

- (link related pages by id as the wiki grows)
