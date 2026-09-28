---
id: cui26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2881
pdf: https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.pdf
---

# Dictionary-Free Discrete Key-Value Attention for Improving Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2881)

**TL;DR** — The paper introduces Dictionary-Free Discrete Attention (DFDA), which uses finite scalar quantization to discretize key and value representations in attention blocks, improving speech enhancement quality and intelligibility over baseline TFGridNet.

## Problem

Existing harmonic attention mechanisms rely heavily on hand-crafted harmonic dictionaries that effectively model voiced speech spectrum structures but underperform on unvoiced components. This hand-crafted limitation prevents comprehensive speech representation learning within attention modules. Addressing this gap requires a data-driven approach to structure both voiced and unvoiced speech components without manual priors.

## Method

The paper proposes Dictionary-Free Discrete Attention (DFDA), integrating Finite Scalar Quantization (FSQ) into a lightweight encoder-quantizer-decoder structure applied to keys and values prior to dot-product attention computation. This acts as an information bottleneck that suppresses noise-induced stochastic variations while encouraging queries to match stable speech patterns. DFDA is incorporated into the first two attention blocks of a 4-layer TFGridNet backbone (32 embedding dimension, 96 BLSTM hidden units) and is also combined with Harmonic Attention (HAtt). Training uses a combination loss function consisting of compressed magnitude loss, compressed complex loss, and scale-invariant signal-to-noise ratio (SI-SNR) loss on 25k hours of speech data mixed with DNS noise and room impulse responses.

## Results

Evaluated on seen speech, Emilia, and LibriSpeech datasets using metrics including PESQ, ESTOI, SI-SNR, SSNR, SDR, DNSMOS, speaker similarity, and an unvoiced segmental SNR (UV SSNR) metric. On the seen dataset, TFGridNet+DFDA improves baseline TFGridNet PESQ from 2.65 to 2.74, ESTOI from 87.6% to 88.9%, and SI-SNR from 14.99 dB to 15.51 dB. Combining HAtt and DFDA (TFGridNet+HAtt+DFDA) yields further performance gains, achieving 2.84 PESQ, 89.6% ESTOI, and 16.10 dB SI-SNR on seen data, and outperforming single-mechanism models on unseen LibriSpeech (2.74 PESQ, 16.53 dB SDR). The DFDA module introduces a computational overhead of only 0.48 GMACs on a 1-second audio input.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech enhancement systems, telecommunications hardware, hearing aids, and as a front-end preprocessor for automatic speech recognition and speaker verification pipelines.

## Related

- (link related pages by id as the wiki grows)
