---
id: takaki26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html
pdf: https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf
---

# Head-Worn Dipole Microphone Array-based Speech Enhancement System for Single-Sided Deafness

[PDF](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/takaki26_interspeech.html)

**TL;DR** — This paper presents a head-worn glasses-mounted microphone array combining dipole and omnidirectional MEMS elements to enhance lateral speech intelligibility for single-sided deafness, improving signal-to-distortion ratio by 0.78 dB over traditional omnidirectional arrays.

## Problem

Conventional hearing aids and smart glasses employ forward-facing directional or omnidirectional microphone configurations optimized for front-arriving sounds. This leaves individuals with single-sided deafness (SSD) struggling to comprehend conversations occurring on their deaf side. Developing dedicated hardware and beamforming algorithms that target lateral directions is essential for bridging this accessibility gap.

## Method

The hardware consists of an 8-channel linear array attached to a pair of glasses, comprising four omnidirectional MEMS microphones (Infineon IM73D122V01) spaced at 12 mm and four dipole microphones (Soundskrit SKR0610) interleaved at midpoints with an acoustic path length of 11 mm. Captured pulse-density-modulation signals are converted to optical ADAT domains to minimize electrical noise before being routed to a PC processor. Signal processing utilizes a frequency-domain Minimum Variance Distortionless Response (MVDR) beamformer operating at a 16 kHz sampling rate with a 512-sample STF window and 128-sample hop size. The evaluation tests various configurations including a hybrid setup of two dipole and one omnidirectional microphones utilizing oracle noise covariance matrices.

## Results

Simulations using TIMIT speech data and speech-shaped noise played from diagonal directions evaluate performance across SDR, ESTOI, and PESQ metrics. For lateral speech (90 degrees), a beamformer combining two dipole and one omnidirectional microphone achieves an ESTOI of 0.495 and PESQ of 1.278, outperforming a 3-channel omnidirectional array baseline which yields an SDR of 2.28 dB compared to 3.06 dB for the proposed hybrid array and 3.24 dB for the 3-dipole array. Dipole-based beamformers also demonstrate superior performance over omnidirectional arrays in the -45 to 0 degree frontal-lateral transition zone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and hearing aid manufacturers can use these designs to build specialized wearable assistive listening devices for individuals with single-sided deafness.

## Limitations

The evaluation relies on simulated acoustic scenarios using dummy head transfer functions measured in an anechoic chamber rather than real-world patient trials.

## Related

- (link related pages by id as the wiki grows)
