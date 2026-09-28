---
id: bhattacharya26b_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3055
pdf: https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.pdf
---

# Exploiting Neural Audio Codec Latents for Adversarial Audio Attacks

[PDF](https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhattacharya26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3055)

**TL;DR** — A generative adversarial attack framework operating in the continuous latent space of a neural audio codec achieves targeted attack success rates up to 99% in under 7 ms per sample.

## Problem

Traditional optimization-based audio adversarial attacks like PGD and Carlini-Wagner require computationally expensive iterative updates in the high-frequency waveform domain, making them impractical for real-time threat assessments. Conversely, prior generative single-shot methods often introduce perceptible artifacts or are restricted by task-specific architectures that limit their applicability to general audio classification and speaker verification. This creates a security evaluation gap for streaming audio systems that require both ultra-low latency and high-fidelity adversarial perturbations.

## Method

The framework utilizes a frozen Descript Audio Codec (DAC) encoder to map raw audio waveforms to a continuous, lower-dimensional latent space (C x L). A trainable conditional generator fuses the pristine latent with target class or speaker embeddings via linear projection, ReLU, and four stacked Conv1D-BatchNorm-ReLU blocks with a learnable scaling parameter and zero-initialized terminal layer. To ensure training stability, weights are maintained using an Exponential Moving Average (EMA). An end-to-end differentiable acoustic feature extractor bridges the reconstructed adversarial waveform from the frozen DAC decoder to downstream victim models, trained using a composite loss combining cross-entropy or cosine similarity alignment, a Carlini-Wagner margin loss, and an L2 latent regularization term.

## Results

Evaluated on Google Speech Commands, UrbanSound8K, DCASE2019, and LibriSpeech using AST, PANNs CNN14, and ECAPA-TDNN victim models. The method achieves untargeted/targeted attack success rates of 96.58%/77.65% on Speech Commands, 99.11%/97.17% on UrbanSound8K, 100%/94.07% on DCASE2019, and 100%/99.80% on LibriSpeech. It yields inference latencies between 0.0035 and 0.0067 seconds per sample, providing up to 24x speedups over generative baselines like FAPG and thousands of times speedups over iterative methods.

## Code

- https://github.com/VCBSL/DAC-GAN

## Applications

Speech and ML engineers studying audio security vulnerabilities, robustness testing, and threat assessments of real-time automatic speech recognition, environmental classification, and voice biometric systems.

## Limitations

Targeted attack success drops to 77.65% on the 1-second Google Speech Commands dataset due to the challenge of manipulating localized phonemes using global latent representations.

## Related

- (link related pages by id as the wiki grows)
