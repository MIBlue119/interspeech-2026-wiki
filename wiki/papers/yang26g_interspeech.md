---
id: yang26g_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1224
pdf: https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.pdf
---

# Pitch-Injected Residual Adapter for Tonal Language in Neural Audio Codec

[PDF](https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1224)

**TL;DR** — The Pitch-Injected Residual Adapter (PIRA) is a lightweight plug-and-play module that restores tonal information in frozen neural audio codecs by injecting explicit fundamental frequency and voiced/unvoiced side-information, reducing codec-induced Tone Error Rate by 35.7% on average across five codecs and three tonal languages.

## Problem

Neural audio codecs are predominantly trained on non-tonal corpora and optimized for perceptual metrics that ignore fundamental frequency, leading to severe F0 distortion, smoothing, and voicing confusion. For tonal languages where F0 marks lexical distinctions, this causes a critical intelligibility failure that cannot be fixed by standard fine-tuning without risking catastrophic forgetting and high compute costs.

## Method

PIRA operates in the quantized latent space of frozen neural audio codecs using 1.25M to 1.65M trainable parameters, leaving encoder and decoder weights untouched. F0 and voiced/unvoiced features are extracted via WORLD Harvest, 4-bit quantized, and passed through a 6-layer dilated convolutional residual injector with a 9.7-second receptive field to capture long-range tone sandhi dependencies. A confidence network conditions on spectral latent context and voicing state to learn per-frame gating, suppressing injection for checked tones and unvoiced segments where pitch is not the primary cue. Training minimizes time-domain L1, multi-resolution STFT, mel-spectrogram losses, and a CREPE embedding loss computed over penultimate layer activations of frozen CREPE-Tiny.

## Results

Evaluated on Hokkien (Taiwan-Tongues-ASRCE), Cantonese (MDCC), and Vietnamese (VIVOS) using five state-of-the-art codecs (EnCodec, DAC, Mimi, WavTokenizer, BigCodec), PIRA reduces codec-induced Tone Error Rate (dTER) by an average of 35.7% across 15 configurations. On EnCodec specifically, PIRA lowers dTER by 56.7% and reduces F0-RMSE to 43.1 cents compared to 117.9 cents for the unadapted baseline. Unlike full or decoder-only fine-tuning—which severely degrades English dWER on LibriSpeech to .068–.084 due to catastrophic forgetting—PIRA preserves English quality at .013–.014 dWER with zero degradation. Ablation studies confirm that removing confidence gating causes large voicing decision error spikes and removing CREPE loss severely degrades F0-RMSE.

## Code

- https://github.com/Jie-shiang/Pitch-Injected-Residual-Adapter

## Applications

Speech and ML engineers deploying neural audio codecs or discrete token-based speech language models for downstream generation and speech synthesis tasks in tonal languages.

## Limitations

The current setup relies on WORLD Harvest for feature extraction which incurs latency bottlenecks, and introduces a small bitrate overhead of up to 0.4 kbps.

## Related

- (link related pages by id as the wiki grows)
