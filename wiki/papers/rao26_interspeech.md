---
id: rao26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1608
pdf: https://www.isca-archive.org/interspeech_2026/rao26_interspeech.pdf
---

# A Causal Reference-Enhanced Keep-Speech Active Noise Control Method

[PDF](https://www.isca-archive.org/interspeech_2026/rao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1608)

**TL;DR** — This paper proposes a causal, low-latency reference-enhanced keep-speech active noise control method that suppresses noise while preserving speech components, consistently improving speech intelligibility (STOI) and quality (DNSMOS) over conventional baselines.

## Problem

In conversational active noise control (ANC) headphone scenarios, the reference microphone captures both ambient noise and target speech, meaning standard ANC systems inadvertently suppress speech at the ear alongside noise. While recent deep learning alternatives like DeepANC replace control filters with CRNs, they introduce frame-level algorithmic latency that violates strict causality constraints. A keep-speech ANC (KSANC) framework that maintains low system latency while preventing speech attenuation is therefore essential for transparent, high-quality communication.

## Method

The method retains a conventional FIR control filter and introduces a time-domain WaveNet-based reference signal enhancement (RSE) network to process original reference signals and error microphone estimates. The network uses causal convolutions and tanh activations, totaling 9.53M parameters and requiring 38.12G MACs per second of audio. It is optimized using two strategies: reference separation loss (Lrefsep) and an error-domain performance loss (Lenh) that jointly evaluates noise suppression and speech preservation using the optimal Wiener solution of the control filter.

## Results

Evaluated using measured headphone impulse responses at 8 kHz across SNRs from -5 to 15 dB against band-limited and real-world DCASE noises (fan, engine, bearing, gearbox), the RSE-based KSANC trained with Lenh outperforms conventional ANC, DeepANC, and unprocessed baselines across STOI and DNSMOS (OVRL) metrics. For instance, at -5 dB SNR, Lenh achieves a STOI of 77.99% compared to 75.17% for conventional ANC and 74.44% for DeepANC. Ablations confirm that the error-domain training loss (Lenh) significantly outperforms reference-only training (Lrefsep).

## Code

- https://github.com/RaoLi666/RSE_KSANC.git

## Applications

Engineers building smart headphones, hearables, and communication headsets for noisy conversational environments requiring transparent or keep-speech active noise control.

## Limitations

The current WaveNet-based model has a relatively high parameter count and computational footprint, requiring future optimization for deployment on resource-constrained edge hardware.

## Related

- (link related pages by id as the wiki grows)
