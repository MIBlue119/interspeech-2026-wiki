---
id: sonkar26_interspeech
category: speech-synthesis
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3023
pdf: https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.pdf
---

# Tongue2Speech: Real-Time Speech Synthesis from Tongue Ultrasound Videos via Spatiotemporal Transformers

[PDF](https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3023)

**TL;DR** — Tongue2Speech is a lightweight silent speech interface that maps tongue ultrasound videos to mel-spectrograms using a 3D spatio-temporal front-end and a Transformer, achieving 15.93% word error rate on single-speaker English data.

## Problem

Ultrasound-to-speech conversion allows individuals with impaired phonation to communicate silently, but existing models rely on recurrent or purely convolutional layers that struggle to capture long-range coarticulation. Furthermore, prior literature depends heavily on weak spectral distortion metrics like MSE rather than perceptual intelligibility, and zero-nosed cross-speaker generalization remains difficult due to anatomical and probe-placement variations.

## Method

The framework processes raw ultrasound scanlines converted into Cartesian wedge representations via GPU-accelerated bilinear grid sampling. Four stacked 3D convolutional blocks extract joint spatio-temporal features, followed by spatial average pooling to yield frame-level latents. A 6-layer, 8-head encoder-only Transformer with sinusoidal positional encodings and GELU activation models long-range dependencies, and a 2-layer MLP projects the states to 80-dimensional mel-spectrograms. A pre-trained HiFi-GAN vocoder synthesizes the final waveform, keeping the total parameter count at 19.17M (6.25M for the core model and 13.92M for the vocoder).

## Results

Evaluated on the English TaL corpus using OpenAI Whisper Medium ASR for Word Error Rate (WER) and L1 mel loss / MSE. On the single-speaker TaL1 dataset, Tongue2Speech achieves an overall 15.93% WER and 0.594 MSE, outperforming six baselines including Conformer-U2S and STN-CNN (which saturate near 99% WER). On the multi-speaker TaL80 dataset, it obtains 31.64% WER, outperforming 3D-CNN+BiLSTM (42.46%) and its skip-connection variant (33.23%). Speaker-specific fine-tuning on held-out speakers further restores intelligibility, achieving speaker WERs down to 27.62%.

## Code

- https://tongue2speech.github.io/

## Applications

Speech engineers and medical researchers developing silent speech interfaces for individuals with laryngectomy or neurogenic speech disorders.

## Limitations

Zero-shot cross-speaker generalization remains challenging due to inter-speaker anatomical differences and probe placement variability, necessitating speaker-specific fine-tuning.

## Related

- (link related pages by id as the wiki grows)
