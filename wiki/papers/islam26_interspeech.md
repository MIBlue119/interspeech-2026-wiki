---
id: islam26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-506
pdf: https://www.isca-archive.org/interspeech_2026/islam26_interspeech.pdf
---

# CAPS: A Cascaded Reconstruction Model to Power Saving in Hearables Using Sub-Nyquist Sampling with Bandwidth Extension

[PDF](https://www.isca-archive.org/interspeech_2026/islam26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/islam26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-506)

**TL;DR** — CAPS is a cascaded reconstruction model that lowers ADC sampling rates and bit resolutions in hearables for power savings, achieving a 3.3x reduction in energy consumption while maintaining streaming capability on mobile platforms.

## Problem

Traditional hearable systems require high-resolution sampling (over 16 kHz and 12 bits) to capture wideband audio, resulting in excessive power draw on resource-constrained hardware. Existing speech enhancement and bandwidth extension frameworks either ignore lower bit resolution constraints or fail to jointly process multimodal air-conduction and bone-conduction data. Without a sub-Nyquist reconstruction pipeline bridging low-power hearables and mobile processors, it is impractical to save hardware power without severely degrading speech intelligibility.

## Method

CAPS combines a Spectral Enhancement Network (SEN), an Upsampling Network (UN), and an Amplitude-Phase Enhancement Network (APEN) in a cascaded architecture. The SEN uses a 2D U-Net with a Mamba bottleneck block to process 4 kHz, 8-bit spectrograms from air-conduction microphones (ACM). The UN converts spectra to 1D waveforms via transposed convolutions and dilated residual blocks (HiFi-GAN v2 style) with an overall 256x upsampling factor. Finally, the APEN fuses the upsampled ACM stream with a clean bone-conduction microphone (BCM) waveform using mutually coupled depthwise and pointwise 1D convolutions across amplitude and phase streams. Training utilizes multi-period losses, multi-scale MAE losses, and instantaneous phase/group delay anti-wrapping losses.

## Results

Evaluated on custom multi-speaker datasets collected from 20 participants using both ACMs and BCMs under speech and non-speech noise conditions (-7 to 5 dB) against six baselines. CAPS achieves a 3.31x reduction in power consumption by stepping down from {24 kHz, 12-bit} to {4 kHz, 8-bit} ADC configurations. On mobile hardware (Google Pixel 7), it demonstrates a total inference time of 1.36 ms (well below the ITU 150 ms streaming threshold) and a memory footprint of 11.04 MB.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing low-power hearables, earbuds, and wearable audio accessories will use this for joint power-saving sub-Nyquist sampling and multimodal speech enhancement.

## Related

- (link related pages by id as the wiki grows)
