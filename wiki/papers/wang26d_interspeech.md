---
id: wang26d_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-219
pdf: https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.pdf
---

# Back to Ear: Perceptually Driven High Fidelity Music Reconstruction

[PDF](https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-219)

**TL;DR** — The paper introduces ear-VAE, a continuous variational autoencoder for high-fidelity music reconstruction that achieves a state-of-the-art SISDR of 11.00 dB on in-house validation data by integrating psychoacoustic K-weighting, phase correlation loss, and a hybrid Conv-Transformer architecture.

## Problem

Modern audio VAEs often fail to integrate fine-grained perceptual weighting strategies, resulting in poor high-frequency harmonic reconstruction, transient smearing, and inaccurate stereo imaging. Existing open-source models also lack mechanisms to accurately supervise phase and spatial information parameterized by Mid/Side decomposition, which limits their suitability for professional music compression and generative tasks.

## Method

The model uses an asymmetric encoder-decoder VAE architecture with 141M parameters, combining strided convolutional blocks with SnakeBeta activation in the encoder and transposed convolutions paired with RoPE transformer bottleneck layers in the decoder. Training relies on a composite objective including an EnCodec-style multi-scale STFT magnitude loss pre-filtered with an ITU-R BS.1770 K-weighting curve, a DSP-driven phase correlation loss applied on Left-Right stereo channels, feature-matching loss, least-squares GAN adversarial loss using a multi-scale STFT discriminator, and KL regularization. It is trained in three stages (warm-up, pre-training on public sets like FSD50K, FMA, and DISCO-10M, and continuation on a proprietary 10,000-hour professional music dataset).

## Results

Evaluated on MuChin and an in-house validation split against baselines including DAC, EnCodec, AudioGen, and Stable-Audio-Open (SAO), ear-VAE achieves a 9.99 dB (MuChin) and 11.00 dB (in-house) SI-SDR, outperforming SAO (4.62 dB / 5.23 dB) and DAC (6.14 dB / 6.68 dB). It also achieves superior Individual Channel Phase Coherence (ICPC: 96.78%) and Cross Channel Phase Coherence (CCPC: 90.69%). Stepwise ablations confirm that replacing A-weighting with K-weighting improves SISDR to 10.86 dB, adding phase correlation loss increases SISDR from 8.73 dB to 9.85 dB, and adding transformer blocks further boosts SISDR to 11.00 dB.

## Code

- https://github.com/Eps-Acoustic-Revolution-Lab/EAR_VAE

## Applications

Speech and audio engineers and ML researchers building large-scale, high-fidelity audio generative models, diffusion frameworks, and professional neural audio codecs.

## Limitations

The model exhibits a tendency to attenuate subtle spatial effects, which the authors identify as a target for future work.

## Related

- (link related pages by id as the wiki grows)
