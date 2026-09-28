---
id: yang26k_interspeech
category: speech-coding
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1759
pdf: https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.pdf
---

# HARP: Harmonic-Aware Residual Partitioning for Neural Audio Codecs

[PDF](https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1759)

**TL;DR** — HARP introduces a training strategy that orders neural audio codec residual vector quantization stages into frequency-specialized groups via cumulative decoding and soft subband supervision, achieving superior audio reconstruction without changing inference architecture.

## Problem

Standard neural audio codecs using residual vector quantization (RVQ) treat all frequencies uniformly, causing spectral entanglement where truncating codebook stages removes unpredictable mixes of bass and treble. Conversely, parallel band decomposition methods split audio into separate frequency bands with isolated networks, destroying crucial cross-frequency harmonic coherence and creating fragmented token streams that complicate downstream language modeling. Addressing these issues is essential for robust, predictable bitrate scaling and natural-sounding audio reconstruction across speech, music, and general sound.

## Method

The paper introduces Harmonic-Aware Residual Partitioning (HARP), which divides the nine RVQ stages into four frequency-ordered groups targeting progressively higher bands. It employs cumulative decoding, ensuring each higher group's decoder receives the latent representations of all lower frequency bands to preserve overtone and fundamental phase-amplitude coherence. During training, HARP utilizes subband contribution supervision to target specific spectral improvements and applies learnable Gaussian weights over mel bins as soft band weighting to prevent sharp edge artifacts. Crucially, these modifications apply strictly to the training loss, leaving network parameters, model sizes, and inference identical to standard RVQ.

## Results

Evaluated on speech, music, and general audio datasets including LibriTTS, MUSDB18-HQ, and AudioSet, HARP outperforms standard RVQ and parallel band decomposition baselines across objective metrics and MUSHRA listening tests at multiple low-bitrate conditions. Truncating stages under HARP cleanly removes treble before bass, yielding graceful quality degradation rather than erratic distortions. Subjective MUSHRA evaluations confirm notable perceptual improvements in timber preservation and harmonic clarity across diverse acoustic signals.

## Code

- https://github.com/QiaoyuYang/HARP

## Applications

Speech and audio engineers building neural compression systems, text-to-speech pipelines, and discrete audio tokenizers for speech language models.

## Related

- (link related pages by id as the wiki grows)
