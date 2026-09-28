---
id: islam26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-506
pdf: https://www.isca-archive.org/interspeech_2026/islam26_interspeech.pdf
---

# CAPS: A Cascaded Reconstruction Model to Power Saving in Hearables Using Sub-Nyquist Sampling with Bandwidth Extension

*Tarikul Islam, Sajid F. Dipto, Luke B. Baja-Ricketts, David C. Vergano, Anomadarshi Barua*

[PDF](https://www.isca-archive.org/interspeech_2026/islam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/islam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-506)

**TL;DR** — CAPS is a cascaded reconstruction framework that jointly performs sub-Nyquist sampling (4 kHz) and low bit resolution (8-bit) in hearables to achieve a 3.3x reduction in hardware power consumption, while utilizing a mobile-hosted network to restore high-resolution wideband audio in 55.11 ms.

## Key contributions

- Proposes a multimodal sub-Nyquist sampling scheme for hearables combining air conduction microphones (ACMs) and bone conduction microphones (BCMs) to achieve a 3.31x ADC power reduction (dropping from 24 kHz/12-bit to 4 kHz/8-bit).
- Introduces a cascaded architecture featuring a Spectral Enhancement Network (SEN) with a 2D-adapted Mamba bottleneck, an upsampling network, and an Amplitude-Phase Enhancement Network (APEN) for cross-modal fusion.
- Engineers custom anti-wrapping instantaneous phase and group delay loss functions alongside a light multi-period time-domain loss to maintain perceptual fidelity.
- Demonstrates real-time streaming capability on mobile hardware (Google Pixel 7 and Samsung Galaxy S21) with an inference time of 55.11 ms and a memory footprint of 11.04 MB.

## Problem

Hearable devices require high sampling frequencies and bit resolutions to capture wideband audio, which drains their limited battery capacity. Existing speech enhancement (SE) and bandwidth extension (BWE) frameworks (such as ATS-UNet, TFiLM, AFiLM, TRAMBA, AERO, EBEN, HiFi++, NVSR, and NU-Wave) either target single-modal audio or fail to operate under reduced bit-resolution and sub-Nyquist ADC settings. Consequently, there is a lack of efficient multimodal SE methods capable of reconstructing wideband, high-fidelity signals from low-power, narrowband hearable inputs.

## Method

CAPS processes low-resolution (4 kHz), noisy 2D T-F spectrograms from ACMs through a Spectral Enhancement Network (SEN). The SEN utilizes a 2D convolutional U-Net with 5 residual encoder/decoder layers and a Mamba sequence bottleneck—created by flattening spatial dimensions into a sequence for linear-time complexity and reshaping back—to model inter-phoneme dependencies. The spectrum is then converted to a 1D waveform via an Upsampling Network (UN) inspired by HiFi-GAN v2, employing four transposed convolution stages (8x, 8x, 2x, 2x) combined with dilated residual blocks (dilation rates 1, 3, 9) to achieve a 256x resolution increase.

Next, the Amplitude-Phase Enhancement Network (APEN) concatenates the 1D waveform with raw, less-noisy 1D BCM vibration signals. The APEN processes amplitude and phase streams in parallel using mutual coupling through large-kernel depth-wise 1D convolutions (kernel size 7x1) and point-wise linear layers, interleaved with Layer Normalization and GELU activations. The model is trained using a multi-period loss (periods 5 and 7 computed via MAE on reshaped 2D tensors), anti-wrapping instantaneous phase and group delay losses, and a 3-scale waveform MAE loss (1x, 2x, 4x downsampling).

The complete PyTorch model is converted via ONNX to TensorFlow Lite (TFLite) and deployed onto mobile platforms utilizing GPU/TPU delegates, running at an inference latency of 1.36 ms on a desktop GPU and 55.11 ms on a Google Pixel 7.

## Experimental setup

Evaluated on a collected multimodal dataset of 20 speakers (45 minutes per speaker at 22 kHz, 12/10/8-bit) using VCTK-derived text, high-pass filtered at 5 Hz, mixed with non-speech noises and LibriSpeech speech noise at -7 to 5 dB. Also evaluated on the MagnaTagATune music dataset. Compared against six baselines (TFiLM, VibVoice, AERO, EBEN, HiFi++, SEANet). Metrics include LSD, VISQOL, NISQA-MOS, SI-SDR, PESQ, and STOI, evaluated on hardware including an Intel Silver 4310 desktop with an RTX 4090, Google Pixel 7 (Tensor G2, Mali-G710 MP7), and Samsung Galaxy S21.

## Results

CAPS achieves superior or competitive performance against heavier SOTA models while operating at a fraction of the footprint. On 4-16 kHz VCTK noisy evaluations, CAPS achieves an LSD of 0.87, VISQOL of 4.15, NISQA-MOS of 4.13, SI-SDR of 16.99 dB, PESQ of 2.99, and STOI of 0.90, outperforming HiFi++ (LSD 0.89, PESQ 2.85) while using 25x fewer parameters (2.85M vs 72.2M) and a 4.63x faster desktop inference time (1.36 ms vs 6.3 ms). When replacing the Mamba bottleneck with Transformers, training time per epoch surges from 212s to 369s with higher parameter count (2.98M) for negligible metric gains. Removing APEN severely degrades performance (SI-SDR drops from 16.99 to 7.12 dB).

| System | LSD ↓ | VISQOL ↑ | NISQA ↑ | SI-SDR ↑ | PESQ ↑ | STOI ↑ |
|---|---|---|---|---|---|---|
| Unprocessed | 2.78 | 1.84 | 1.27 | 8.54 | 1.11 | 0.79 |
| TFiLM [15] | 4.85 | 1.68 | 3.73 | 10.28 | 2.03 | 0.81 |
| AERO [9] | 0.97 | 4.16 | 4.03 | 17.03 | 2.93 | 0.89 |
| HiFi++ [17] | 0.89 | 4.18 | 4.11 | 17.48 | 2.85 | 0.90 |
| SEANet [2] | 1.39 | 3.89 | 3.78 | 14.31 | 2.43 | 0.89 |
| CAPS (Ours) | 0.87 | 4.15 | 4.13 | 16.99 | 2.99 | 0.90 |

## Limitations

The framework does not incorporate audio stream encryption between the hearable device and the mobile platform. Furthermore, standard audio codecs were omitted during the evaluation of transmission power, performance, and efficiency, and language coverage is constrained by the English-centric VCTK and LibriSpeech data sourcing.

## Why read this

Researchers and embedded engineers building resource-constrained hearables or low-latency mobile streaming audio pipelines should read this paper to learn how to combine sub-Nyquist sensor sampling with Mamba-backed neural bandwidth extension and cross-modal fusion.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time voice communication, hearable audio enhancement, and low-power wearable audio streaming.

## Related

- (link related pages by id as the wiki grows)
