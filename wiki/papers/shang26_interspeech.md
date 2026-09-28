---
id: shang26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-200
pdf: https://www.isca-archive.org/interspeech_2026/shang26_interspeech.pdf
---

# Seed-Enh: Generative Speech Enhancement in Decoupled Semantic and Timbre Spaces

[PDF](https://www.isca-archive.org/interspeech_2026/shang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-200)

**TL;DR** — Seed-Enh is a generative speech enhancement framework operating in decoupled semantic and timbre spaces that outperforms state-of-the-art baselines in overall audio quality on the DNS blindtest and LibriTTS+wham datasets.

## Problem

Most speech enhancement methods operate directly in entangled acoustic spaces (such as spectrograms), which causes models to rely on shortcut solutions resulting in speaker identity loss, background holes, and high-frequency attenuation. The lack of explicit semantic and timbre understanding makes it difficult to separate speech from noise when they share similar acoustic characteristics.

## Method

The framework processes noisy speech through a three-stage pipeline: extracting noise-robust semantic representations using a frozen Whisper-Large-v2 encoder, extracting global speaker embeddings via CAM++ and local timbre features via context learning, and fusing both spaces via a Diffusion Transformer (DiT) flow matching model. During training, an audio-splitting strategy feeds the second half of the audio to the semantic encoder and the first half to the timbre extractor to prevent information leakage. The DiT model is trained via a two-stage recipe using 101k hours of clean Emilia dataset audio and over 60,000 noise samples from the DNS Challenge, and inference generates clean Mel spectrograms solved via an ODE Euler solver before converting to waveforms using BigVGAN.

## Results

Evaluated on the DNS Challenge blind test set and simulated LibriTTS+wham datasets, Seed-Enh achieves top overall speech quality (OVRL) scores of 3.095 and 3.193, respectively, outperforming discriminative baselines like FullSubNet and TFGridNet as well as generative methods like StoRM, SGMSE, Schrodinger Bridge, AnyEnhance, and FlowSE. On LibriTTS+wham, it achieves a background noise suppression score (BAK) of 4.071, a speaker similarity (SIM) of 0.890, and a character error rate (CER) of 0.167. For zero-shot voice conversion using noisy inputs, Seed-Enh significantly outperforms Seed-VC in OVRL (3.225 vs. 2.461) and SIM (0.823 vs. 0.726).

## Code

- https://github.com/shangqwe123/Seed-Enh

## Applications

Engineers and researchers building robust communication systems, speech recognition front-ends, or zero-shot voice conversion pipelines that must operate under severe noise conditions.

## Limitations

The character error rate of the generative model is slightly higher than traditional discriminative models.

## Related

- (link related pages by id as the wiki grows)
