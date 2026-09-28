---
id: chen26v_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2082
pdf: https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.pdf
---

# SARA: A Dual-Stream VAE for High-Fidelity Speech Generation via Integrating Semantic and Acoustic Representations

[PDF](https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26v_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2082)

**TL;DR** — SARA is a dual-stream VAE that integrates frozen SSL semantic anchors with a residual acoustic encoder, improving zero-shot TTS word error rate down to 1.74 on LibriSpeech-PC.

## Problem

Current speech tokenizers face a fundamental trade-off: acoustic codecs preserve fine-grained physical details but lack linguistic guidance, resulting in high word error rates during downstream zero-shot TTS, whereas pure self-supervised learning (SSL) representations offer precise content alignment but discard crucial acoustic features like speaker timbre and emotion. Existing attempts to bridge this gap using complex regularization losses are indirect and difficult to balance.

## Method

The framework uses a dual-stream variational autoencoder mapping 24 kHz waveforms to a 50 Hz, 64-dimensional latent space. It pairs a frozen W2v-BERT 2.0 model as a semantic anchor with a residual acoustic encoder built on Snake-activated CNN blocks and a two-layer unidirectional LSTM. The acoustic encoder utilizes striding factors of [2, 3, 4, 4, 5] (total downsampling 480) to yield a 1024-dimensional acoustic stream, which is temporally concatenated with the SSL semantic stream and projected. The VAE is optimized via a multi-scale mel-spectrogram loss, KL divergence, multi-period/multi-scale STFT discriminators, and L1 feature matching loss over 50,000 hours of LibriTTS and LibriHeavy data.

## Results

Evaluated on LibriSpeech test-clean and LibriSpeech-PC using F5-TTS as the generator backbone, SARA achieves a 1.79 WER with F5-TTS-Small and 1.74 WER with the base model, outperforming baseline models like CosyVoice, E2 TTS, and Semantic-VAE. For speech reconstruction on LibriSpeech test-clean, SARA reaches a PESQ of 4.389 and STOI of 0.993, surpassing Vocos and standard VAE baselines. Ablations confirm that removing either the residual acoustic encoder or the SSL encoder damages speaker similarity or linguistic stability respectively.

## Code

- https://pppjchen.github.io/SARA

## Applications

Speech engineers and researchers building zero-shot text-to-speech, neural speech coding, and large-scale generative audio systems.

## Limitations

The dual-stream encoder architecture introduces extra inference computational cost compared to single-stream models.

## Related

- (link related pages by id as the wiki grows)
