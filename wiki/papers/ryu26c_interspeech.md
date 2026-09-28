---
id: ryu26c_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3266
pdf: https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.pdf
---

# SPOT-TSE: Spatial Point-Guided Target Speech Extraction

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3266)

**TL;DR** — SPOT-TSE is a continuous spatial point-guided target speech extraction framework for wearable devices that uses spatial query encoding and Mamba-based TF-GridNet blocks to achieve 11.05 dB SDR and 0.22 WER in challenging multi-speaker environments.

## Problem

Conventional region-based target speech extraction models rely on fixed boundaries, making them sensitive to small spatial shifts and incapable of handling cases where multiple speakers fall within the same regional zone. Furthermore, methods conditioned purely on a single dimension like azimuth or distance break down under spatial overlap. This matters for wearable devices like smart glasses where users need precise, enrollment-free selective listening in complex, reverberant acoustic environments.

## Method

The model processes multi-channel audio via an STFT front-end, concatenating complex spectra with inter-channel level differences (ILD), inter-channel phase differences (IPD), and coherent-to-diffuse ratio (CDR) cues. The separation backbone employs a 6-layer TF-GridNet where recurrent blocks are replaced by BiMamba for global frequency modeling and causal Mamba for streaming temporal modeling. Continuous spatial point queries containing distance and azimuth coordinates are mapped via Fourier feature encoding and injected into separation blocks using feature-wise linear modulation (FiLM). Training incorporates an ambiguity-aware strategy with proximity-weighted soft targets derived from a generalized Gaussian function and hard-negative spatial sampling to handle confusable overlapping directions or distances.

## Results

Evaluated on simulated smart glass datasets with varying geometric complexity ranging from fixed rooms (D1) to randomized rooms and array positions (D3), SPOT-TSE achieves 11.05 dB signal-to-distortion ratio (SDR) and a word error rate (WER) of 0.22 on the randomized D3 setup. The system reduces computational costs compared to recurrent baselines while maintaining robustness against reverberation and noise. Ablations confirm the effectiveness of the spatial query encoding, proximity-weighted soft targets, and hard-negative spatial sampling components.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building wearable audio hardware, smart glasses, and hearables can use this framework to enable robust, enrollment-free selective listening and target speech extraction.

## Related

- (link related pages by id as the wiki grows)
