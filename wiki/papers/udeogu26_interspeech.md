---
id: udeogu26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2464
pdf: https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.pdf
---

# From Continuous Speech to Subglottal Resonances: Automatic Signal Generation, Estimation, and Tracking Framework

[PDF](https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/udeogu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2464)

**TL;DR** — This paper presents a framework that uses multi-scale spectral learning to generate subglottal-containing accelerometer signals directly from speech, achieving root mean square errors of approximately 30 Hz, 50 Hz, and 80 Hz for the first three subglottal resonances.

## Problem

Subglottal resonances are valuable for speech processing tasks like speaker normalization and health monitoring, but acquiring them typically requires costly, invasive, or non-invasive accelerometer hardware setups. Furthermore, existing estimation techniques usually target each resonance manually or semi-automatically rather than tracking them concurrently. Overcoming these barriers would democratize access to subglottal acoustic features for various downstream applications.

## Method

The authors employ a U-Net-like encoder-decoder architecture termed PrimeK-Net, featuring Group Prime-Kernel (GPK) convolutions to process spectral inputs across multiple time scales using prime-sized kernels (7, 13, 19, 29). The model is trained from scratch on 16 kHz downsampled speech spectrograms to predict corresponding accelerometer waveforms. For automatic estimation and tracking, the framework uses Silero VAD and pYIN pitch detection to isolate voiced speech regions, selects the optimal voiced segment via a joint energy-duration criterion, and applies adaptive linear predictive coding (LPC order 12) with dynamic pre-emphasis.

## Results

Evaluated on the WashU-UCLA corpus (50 speakers, 17,500 pairs) and TIMIT, the method achieved a PESQ score of 3.55 and a Log Spectral Distance (LSD) of 0.75 on seen speakers using prime kernel sizes (7, 13, 19, 29). On unseen speakers, the framework achieved RMSE values of about 30 Hz, 50 Hz, and 80 Hz for Sgr1, Sgr2, and Sgr3, respectively, while keeping speaker height estimation errors below 7 cm. Coefficient of variation (%COV) and standard deviation metrics closely matched or outperformed baseline manual measurement methods.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers studying speaker normalization, speaker height estimation, and lung health monitoring can use this system to extract subglottal resonances without physical accelerometer hardware.

## Limitations

The estimation algorithm focuses specifically on vowel sounds within periodic regions of continuous voiced speech.

## Related

- (link related pages by id as the wiki grows)
