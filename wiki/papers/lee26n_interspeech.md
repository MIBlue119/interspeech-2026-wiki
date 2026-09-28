---
id: lee26n_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1620
pdf: https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.pdf
---

# DroFiT: A Lightweight Band-Fused Frequency Attention Toward Real-Time UAV Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1620)

**TL;DR** — DroFiT is an ultra-lightweight, real-time speech enhancement network designed to suppress severe UAV ego-noise while reducing computation by up to 26 times compared to standard baselines.

## Problem

Unmanned aerial vehicles (UAVs) generate severe, wideband, periodic propeller and motor ego-noise that drastically degrades speech capture quality. Deploying deep learning speech enhancement models on resource-constrained UAV hardware is difficult because existing architectures either impose heavy computational demands or require excessive memory access that causes on-chip bottlenecks and high energy consumption.

## Method

DroFiT uses a decoupled temporal-spectral architecture combining a Pre-TCN to capture slow-moving harmonic drone noise, parallel full-band and sub-band encoders/decoders with learnable skip connections, and a frequency-wise Transformer operating over concatenated spectral tokens. The sub-band path groups 513 frequency bins into five Mel-like partitions (32 to 257 bins) processed via groupwise 1D convolutions, while the Transformer employs linear attention in variant configurations and depthwise-separable Conv-FFNs to reduce complexity. A Post-TCN performs temporal refinement before a Mask Generation Block outputs a complex-valued mask for time-frequency domain waveform reconstruction using a joint log-magnitude, complex-STFT, and negative SI-SDR loss function.

## Results

Evaluated on simulated VoiceBank-DEMAND mixtures with recorded DJI Flip drone noise spanning -30 dB to -5 dB input SNRs and 1300 real-world speaker samples. DroFiT contains only 168k parameters (0.168M), consumes 0.259 MACs, and achieves a peak memory of 1.21 MB. Compared against DTLN, DCCRN-E, DCU-net, and SMoLnet-T, DroFiT provides competitive or superior SI-SDR, PESQ, and ESTOI scores while operating at a fraction of the computational footprint. Ablations confirm that removing components like the Pre-TCN, sub-band module, or Conv-FFN degrades performance.

## Code

- https://ml-sp.github.io/DroFiT/

## Applications

Engineers building on-device speech enhancement and audition pipelines for resource-constrained UAVs, delivery drones, and emergency search-and-rescue aircraft.

## Related

- (link related pages by id as the wiki grows)
