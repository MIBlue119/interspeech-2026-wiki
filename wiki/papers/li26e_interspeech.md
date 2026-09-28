---
id: li26e_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-512
pdf: https://www.isca-archive.org/interspeech_2026/li26e_interspeech.pdf
---

# Noisy Environment Adaptation of Neural Speech Codec via Focal Mask and Noise Feature Separation

[PDF](https://www.isca-archive.org/interspeech_2026/li26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-512)

**TL;DR** — FocalSE is a neural speech codec adaptation method for noisy environments that performs simultaneous feature denoising, noise feature separation, and noise recognition in the continuous embedding space, outperforming baseline models across various low-bitrate and low-SNR conditions.

## Problem

Real-world environmental noise severely degrades the performance of neural speech codecs, causing severe distortion and quality degradation in reconstructed signals. Traditional speech enhancement methods operate independently and cannot be seamlessly integrated into neural codec frameworks under low-bitrate constraints, while existing codec-based speech enhancement techniques neglect explicit learning of suppressed noise components.

## Method

FocalSE integrates into the continuous embedding space of the Descript Audio Codec (DAC) using a dual-branch Focal Mask Noise Separation (FMNS) module and a Noise Recognition (NR) module. The lower branch uses focal modulation-based compression/decompression combined with stacked Transformer blocks to capture global context and local mutual information, producing a focal mask via a learnable sigmoid to recover clean feature embeddings. The upper branch filters noisy embeddings using SEMamba and subtracts the enhanced embeddings to isolate noise feature embeddings, which are then classified by a 1D ResNet-18 network. The training pipeline involves a clean pre-training stage followed by a noisy adaptation stage using L1 losses for clean and noise embeddings, cross-entropy for noise classification, and DAC discriminator losses.

## Results

Evaluated on LibriTTS paired with ESC-50 noise categories at 16 kHz, using 6.0 kbps (16-layer codebooks, 12-bit quantization) and 2.5 kbps (8-layer codebooks, 10-bit quantization) bitrates across -5 dB to 10 dB SNR conditions. FocalSE is compared against DAC, SECE, and FD-CBR, achieving top performance in PESQ, STOI, and SI-SDR metrics (e.g., reaching 2.116 PESQ, 0.892 STOI, and 5.403 SI-SDR at -5 dB / 6 kbps, compared to 1.988 for SECE and 1.975 for FD-CBR). Ablations verify that removing either the noise feature separation or the noise recognition module causes progressive performance drops.

## Code

- https://github.com/shaokai1209/FocalSE

## Applications

Speech and ML engineers building robust neural communication systems, low-bitrate audio codecs, and on-device speech enhancement pipelines operating in adverse acoustic environments.

## Limitations

The model has a larger parameter footprint than competing baselines, with the full architecture totaling 222M parameters (including 63M for the NR module and 82M for the FMNS module).

## Related

- (link related pages by id as the wiki grows)
