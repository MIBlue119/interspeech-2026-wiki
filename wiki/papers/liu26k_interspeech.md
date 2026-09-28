---
id: liu26k_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1498
pdf: https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.pdf
---

# HWB-plus: A Lightweight Speech Bandwidth Extension Method with Separate Modeling for Consonants and Vowels

[PDF](https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1498)

**TL;DR** — HWB-plus is a lightweight speech bandwidth extension method that uses separate modeling for consonants and vowels, achieving superior perceptual speech quality with a footprint of 194K parameters and 12.39M MACs/s.

## Problem

Existing lightweight neural speech bandwidth extension (BWE) models face a structural mismatch in consonant high-frequency modeling because standard half-wave rectification harmonic generators fail to produce coherent outputs for aperiodic consonant frames. Furthermore, parameter initialization in prior mixture models is mostly empirical rather than tied to human auditory frequency resolution, limiting training efficiency and performance on resource-constrained edge devices.

## Method

The architecture introduces DualWGMM, replacing single Gaussian mixture models with parallel VowelWGMM (targeting periodic vowel components via half-wave rectified features) and ConsWGMM (targeting aperiodic consonant components using a white-noise base signal). VowelWGMM parameters are initialized using mel-scale filter center frequencies and bandwidths, while log-magnitude spectral processing stabilizes training dynamics. The model contains 194K parameters, utilizes Grouped GRUs and 1D convolutions, and is trained using a 4-loss adversarial framework combining waveform L1, multi-resolution STFT loss, generator adversarial loss, and feature matching loss.

## Results

Evaluated on the VCTK dataset resampled to 22.05 kHz with 2-3 kHz low-pass filtering, HWB-plus outperforms lightweight baselines such as HWB-Net and BAE-Lite. It achieves a DNSMOS P.808 score of 3.55 (vs. 3.31 for HWB-Net and 3.25 for BAE-Lite), a PESQ score of 3.83 (vs. 3.35 and 3.37), and a NISQA score of 3.93, while maintaining a lightweight compute profile of 12.39M MACs/s. Ablations confirm that removing DualWGMM degrades DNSMOS from 3.55 to 3.36, and removing mel-scale initialization increases log-spectral distance from 0.94 to 1.07.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing real-time telephony, smart speakers, and voice interaction pipelines for resource-constrained edge devices.

## Related

- (link related pages by id as the wiki grows)
