---
id: cui26b_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2881
pdf: https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.pdf
---

# Dictionary-Free Discrete Key-Value Attention for Improving Speech Enhancement

*Zihao Cui, Jinwei Huang, Tao Li, Rongxiu Zhong, Yingying Gao, Shilei Zhang, Chao Deng, Junlan Feng*

[PDF](https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cui26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2881)

**TL;DR** — The paper introduces Dictionary-Free Discrete Attention (DFDA), a data-driven quantization module applied to the keys and values of self-attention to improve speech enhancement. Combined with TFGridNet, the proposed approach improves PESQ by up to 0.19 and SISNR by up to 1.58 dB over the baseline.

## Key contributions

- Proposes Dictionary-Free Discrete Attention (DFDA), using Finite Scalar Quantization (FSQ) on keys and values to form a data-driven information bottleneck that suppresses noise-induced stochastic variations.
- Avoids explicit hand-crafted harmonic dictionaries, enabling effective modeling of both voiced and unvoiced speech components (unlike prior Harmonic Attention).
- Integrates DFDA into the TFGridNet architecture, replacing standard attention in initial blocks with minimal computational overhead (+0.48 GMACs).
- Demonstrates strong complementarity by combining DFDA with Harmonic Attention (HAtt), yielding superior performance across seen and unseen evaluation datasets.

## Problem

Supervised speech enhancement models increasingly rely on attention mechanisms, but existing approaches like Harmonic Attention (HAtt) depend heavily on hand-crafted harmonic priors, which excel at recovering voiced speech but underperform on unvoiced components. Classical DNNs and modern transformer backbones also struggle with nonstationary noise and stochastic variations. Without a structured codebook for keys and values, attention modules fail to effectively separate clean speech patterns from background acoustic degradation. This work aims to establish a data-driven latent dictionary representation inside the attention module to comprehensively restore both voiced and unvoiced speech without manual heuristics.

## Method

The proposed Dictionary-Free Discrete Attention (DFDA) module integrates Finite Scalar Quantization (FSQ) into the key and value projections of multi-head attention before the scaled dot-product computation. Input adapter layers project the query, key, and value vectors, after which the key and value representations pass through an FSQ core (configured with 15 dimensions for keys and 20 dimensions for values, each using 3 levels) followed by output adapter layers. This dictionary-free approach avoids explicit learnable codebooks like traditional Vector Quantization. By creating an information bottleneck, DFDA constrains attention capacity to preserve dominant speech patterns and suppress noise.

DFDA is integrated into a 4-layer TFGridNet backbone by replacing standard multi-head attention blocks in the first two layers. The model is trained using a composite loss function comprising a compressed magnitude loss (LM), a compressed complex loss (LC), and scale-invariant signal-to-noise ratio (SI-SNR) loss, weighted by hyperparameters alpha = 70 and beta = 60. Magnitude compression exponents are set to c = 0.3 and d = 0.7. Acoustic features are extracted using a 512-point STFT with a 32 ms Hann window and a 16 ms hop size.

Models are optimized using AdamW with an initial learning rate of 1e-3, beta_1 = 0.9, beta_2 = 0.999, exponential decay of gamma = 0.9, and gradient clipping with a maximum norm of 5.0. Inference processes 16 kHz audio signals through the hybrid TFGridNet-DFDA architecture, allowing queries to match against stable, discretized speech patterns while filtering out reverberation and background noise.

## Experimental setup

Models were trained on 25k hours of speech corpora mixed with DNS noise and Room Impulse Responses (RIRs). Evaluation utilized 400 seen utterances from the training corpus, and 400 unseen utterances from Emilia and LibriSpeech datasets. Signals were evaluated at 16 kHz with reverberation applied at a 50% probability during testing. Baselines include the original 4-layer TFGridNet (embedding dimension 32, 96 hidden units in BLSTM) and TFGridNet with Harmonic Attention (HAtt). Evaluation metrics include PESQ, ESTOI, SISNR, SSNR, SDR, DNSMOS, speaker similarity, and an unvoiced segmental SNR (UV SSNR) metric.

## Results

On the unseen LibriSpeech dataset, TFGridNet achieves a PESQ of 2.61, ESTOI of 84.6%, and SISNR of 14.24 dB. Adding DFDA improves PESQ to 2.72, ESTOI to 86.5%, and SISNR to 15.04 dB. Combining both HAtt and DFDA (TFGridNet+HAtt+DFDA) further boosts performance to 2.74 PESQ, 87.0% ESTOI, 15.32 dB SISNR, and a peak unvoiced SSNR (UV SSNR) of 8.26 dB compared to the baseline's 7.32 dB. On seen speech, the combined HAtt+DFDA model increases PESQ from 2.65 to 2.84 and SISNR from 14.99 dB to 16.10 dB. The primary limitation where DFDA incurs heavier resource usage is computational footprint when combined with HAtt, raising model GMACs from 7.74 (baseline) to 14.1 for the fully combined variant.

| Method | PESQ | ESTOI | SISNR (dB) | SDR (dB) | UV SSNR (dB) |
|---|---|---|---|---|---|
| Noisy | 1.39 | 67.5 | 6.11 | 6.01 | -0.58 |
| TFGridNet | 2.61 | 84.6 | 14.24 | 15.23 | 7.32 |
| +DFDA | 2.72 | 86.5 | 15.04 | 16.23 | 7.66 |
| +HAtt | 2.68 | 85.6 | 14.66 | 16.10 | 7.37 |
| +HAtt+DFDA | 2.74 | 87.0 | 15.32 | 16.53 | 8.26 |

## Limitations

The evaluation is restricted to 16 kHz speech data and simulated reverberation/noise environments, leaving real-world deployment robustness unverified. The compute cost increases significantly when DFDA is combined with Harmonic Attention, raising total GMACs from 7.74 to 14.1 per second of audio. Language coverage is evaluated primarily on English (LibriSpeech/Emilia) datasets, and generalization to multilingual or severely code-switched scenarios remains untested.

## Why read this

Researchers and audio engineers working on attention-based speech enhancement or neural audio codecs should read this paper to learn how to incorporate finite scalar quantization into self-attention keys and values. It provides a concrete recipe for replacing hand-crafted dictionaries with data-driven quantization to better recover unvoiced speech segments.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Telephony noise suppression, hearing aid front-ends, and pre-processing front-ends for automatic speech recognition and speaker verification.

## Related

- (link related pages by id as the wiki grows)
