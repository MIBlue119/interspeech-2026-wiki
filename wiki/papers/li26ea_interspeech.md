---
id: li26ea_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2390
pdf: https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.pdf
---

# U2A-Net: Physically Motivated Ultrasound‑to‑Audio Neural Modeling for Parametric Array Loudspeakers

[PDF](https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ea_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2390)

**TL;DR** — U2A-Net is a multi-rate neural ultrasound-to-audio framework for parametric array loudspeakers that decouples the modulation process to achieve an average nonlinear distortion modeling error below 1.62%.

## Problem

Parametric array loudspeakers (PALs) generate directional sound via airborne self-demodulation of ultrasonic waves, but this strong nonlinearity introduces substantial harmonic and intermodulation distortion. Conventional audio-to-audio (A2A) deep learning models entangle ultrasonic modulation, transducer response, and demodulation into a difficult black-box mapping, while traditional Volterra filters struggle with exponential parameter scaling at higher orders.

## Method

The paper introduces U2A-Net, which directly maps modulated ultrasonic driving signals (sampled at 192 kHz) to purified audible outputs (sampled at 48 kHz). The network is built on a modified WaveNet backbone featuring 16 residual blocks, dilated causal convolutions, channel size 16, and learnable downsampling modules (two consecutive 1D convolutions with stride 2 and kernel size 64) to bridge the 4x temporal resolution gap. Training uses a joint time-frequency loss function combining waveform MSE and spectrogram MSE.

## Results

Evaluated on a laboratory USBAM-based PAL dataset containing roughly 3 hours of synchronized audio recorded at 1.8 m in an anechoic chamber, U2A-Net is compared against an A2A-Net baseline and a second-order U2A-Volterra filter (U2A-VF). Across four input amplitude levels (0.3 to 1.0), U2A-Net achieves average absolute THD deviations ranging from 0.17% to 0.52% and IMD deviations from 1.02% to 1.62%, consistently outperforming A2A-Net and vastly surpassing U2A-VF.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers designing high-fidelity directional sound systems, private speech communication setups, or spatial audio reproduction equipment.

## Limitations

The advantage of U2A-Net is less pronounced at the lowest input excitation level (0.3) where nonlinearity is mild.

## Related

- (link related pages by id as the wiki grows)
