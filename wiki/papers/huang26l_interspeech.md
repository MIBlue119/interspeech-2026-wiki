---
id: huang26l_interspeech
category: speech-coding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1641
pdf: https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.pdf
---

# Unified Neural Speech Coding for Multiple Sampling Rates

[PDF](https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1641)

**TL;DR** — This paper proposes a unified neural speech codec supporting 16, 24, and 48 kHz audio within a single set of model weights, matching the performance of rate-specific models while eliminating external resampling.

## Problem

Current neural speech codecs are typically bound to a fixed sampling rate, leading to temporal and spectral inconsistencies when handling diverse rates. Systems must currently rely on computationally expensive external resampling pipelines or maintain multiple rate-specific models, which significantly increases deployment and maintenance complexity.

## Method

The architecture features a fully shared time-domain encoder-decoder backbone and a universal Residual Vector Quantization (RVQ) module, enhanced by two lightweight components: a Sampling-Rate Adapter (SRAT) for learnable waveform-level conversion to a unified internal temporal grid, and a Sampling-Rate Modulator (SRMT) applying FiLM-like conditional affine transformations for intermediate feature calibration. The network utilizes SEANet-style blocks combined with an LSTM layer for long-range dependency modeling. Training relies on a three-stage progressive strategy: first pre-training on 48 kHz data for reconstruction/commitment loss, then joint multi-sampling-rate training with SRAT/SRMT enabled, and finally perceptual refinement using a shared multi-scale STFT discriminator with adversarial and feature-matching losses.

## Results

Evaluated on LibriTTS (16/24 kHz) and VCTK (48 kHz), the model uses a fixed parameter count of 19.65M and incurs 2.14, 2.58, and 2.34 G MACs at 16, 24, and 48 kHz respectively at 1.5 kbps. At 24 kHz and 1.5 kbps, it achieves a ViSQOL of 4.22 and a PESQ of 2.353, while reaching a PESQ of 2.750 at 48 kHz and 1.5 kbps. Ablation studies confirm that removing either SRAT or SRMT leads to consistent degradation in ViSQOL, STOI, and PESQ across sampling rates, and latent consistency analysis using Maximum Mean Discrepancy (MMD) demonstrates that the full model significantly reduces feature distribution shifts across different sampling-rate pairs.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and audio engineers deploying streaming communication systems, telephony, or multi-media applications across devices with varying native sampling rates (16, 24, and 48 kHz).

## Limitations

Future work is needed to extend the framework to broader sampling-rate coverage and variable-bitrate operation.

## Related

- (link related pages by id as the wiki grows)
