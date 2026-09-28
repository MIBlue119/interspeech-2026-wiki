---
id: ye26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2941
pdf: https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.pdf
---

# ZipCodec: Simple and Pretrained-Model-Free Speech Tokenizer via Flow-Matching

[PDF](https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ye26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2941)

**TL;DR** — ZipCodec is an ultra-lightweight, single-stage speech tokenizer using a Zipformer-based flow-matching decoder that achieves competitive semantic and acoustic performance while using an encoder of only 4.4M parameters.

## Problem

Traditional speech tokenizers rely on massive pretrained models, auxiliary semantic teachers, labeled data, or multi-stage pipelines to bridge the semantic gap, which dramatically increases parameter counts and system complexity. This overhead complicates deployment and training pipelines for downstream speech-language modeling tasks. ZipCodec addresses this by demonstrating that heavy encoders are unnecessary for acquiring semantically rich discrete speech tokens.

## Method

ZipCodec operates on mel-spectrograms at 24 kHz via a single-stage diffusion autoencoder pipeline incorporating a convolutional downsampler, an ultra-lightweight Zipformer encoder (4.4M parameters), a Finite Scalar Quantization (FSQ) bottleneck (operating at ~1.97 kbps and 23.44 Hz), and a Zipformer-based conditional flow-matching (CFM) decoder. To enhance semantic extraction without external models or labels, it introduces an Encoder Consistency Regularization (ECR) loss that enforces cosine-similarity representation consistency between clean and noise-augmented speech views. For fast inference, a flow-distillation variant reduces the required number of function evaluations (NFEs) from 10 down to 3.

## Results

Evaluated on Emilia and LibriTTS for training, and tested on Librispeech PC test-clean and SeedTTS (en/zh) datasets using metrics like WER, SIM-o, PESQ, ViSQOL, and UTMOS. ZipCodec outperforms tokenizers with encoders over 20 times larger across reconstruction and zero-shot text-to-speech (TTS) tasks, achieving a low WER of 2.16% and superior SIM-o/UTMOS when integrated into a non-autoregressive TTS backbone. Ablations confirm that an ECR loss weight of λ=0.25 yields a 5.4% relative WER reduction over the baseline without ECR.

## Code

- https://github.com/winlaic/ZipCodec

## Applications

Speech and ML engineers building large language models for speech understanding, zero-shot text-to-speech (TTS), and audio generation.

## Limitations

The upper bound of reconstruction quality is constrained by the Vocos vocoder used to invert mel-spectrograms back to waveforms.

## Related

- (link related pages by id as the wiki grows)
