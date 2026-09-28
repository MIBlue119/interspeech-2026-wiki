---
id: chen26u_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1979
pdf: https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.pdf
---

# Latent-Mark: An Audio Watermark Robust to Neural Codec Compression

[PDF](https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1979)

**TL;DR** — Latent-Mark is a zero-bit audio watermarking framework that survives neural codec compression by optimizing waveforms to induce a detectable directional shift within the codec's invariant latent space.

## Problem

Modern neural audio codecs act as non-linear manifold projectors that map audio through a quantized latent bottleneck, treating traditional additive watermarks as off-manifold noise and discarding them. This vulnerability creates a critical security gap as codec-based generative pipelines become ubiquitous, rendering existing watermarks ineffective after a single encode-decode pass. Consequently, a robust watermarking paradigm must survive lossy neural compression without degrading audio fidelity or overfitting to specific codec architectures.

## Method

The framework optimizes the input audio waveform via gradient descent to maximize alignment with a secret manifold vector in the latent space, subject to an L-infinity norm bound and Signal-to-Distortion Ratio constraint to ensure perceptual transparency. To achieve zero-shot transferability across black-box architectures, it employs Cross-Codec Optimization, jointly training the waveform perturbations against multiple surrogate codecs (such as EnCodec, SNAC, and DAC) to target shared latent invariants. The detector then evaluates the presence of the watermark by measuring the directional shift along the secret axis within the latent representation. The approach operates as a test-time optimization method without requiring modifications to downstream generative model weights.

## Results

Evaluations demonstrate that Latent-Mark achieves robust zero-shot transferability to unseen neural codecs while preserving high perceptual imperceptibility and competitive resilience against traditional digital signal processing attacks like Gaussian noise, amplitude scaling, filtering, and resampling.

## Code

- https://github.com/yenshan0530/Latent-Mark

## Applications

Audio platform operators and content creators use this to protect intellectual property and verify provenance for audio assets distributed through neural compression or generative speech pipelines.

## Limitations

The framework operates as a zero-bit watermarking scheme encoding only presence rather than arbitrary payloads.

## Related

- (link related pages by id as the wiki grows)
