---
id: ngong26_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2910
pdf: https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.pdf
---

# DP-VOXLET: Provable Speaker Anonymization for Disentangled Speech Representations

*Ivoline Ngong, Jack D'Iorio, Hailey Schoppe, Christopher Liberatore, Nichole Schimanski, Taisa Kushner, Joseph P. Near*

[PDF](https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ngong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2910)

**TL;DR** — DP-VOXLET introduces speaker differential privacy—a formal mathematical definition and mechanism for speaker anonymization using disentangled speech representations—achieving provable adversarial lower bounds on re-identification success (e.g., up to 41.2% Equal Error Rate) while maintaining high speech utility (3.4% Word Error Rate).

## Key contributions

- Formalizes speaker differential privacy, adapting Gaussian differential privacy to provide provable lower bounds on adversary re-identification success rates (Equal Error Rate) across any possible adversary.
- Develops a Gaussian speaker perturbation mechanism operating on bounded L2 global sensitivity that satisfies membership speaker privacy.
- Introduces DP-VOXLET, a modular framework integrating with existing voice conversion systems via a differentially private variational autoencoder (VAE) and L-infinity norm clamping to keep perturbed embeddings in well-conditioned spaces.
- Demonstrates through 2024 Voice Privacy Challenge benchmarks that the framework achieves empirical privacy competitive with top heuristic submissions while offering rigorous mathematical guarantees.

## Problem

Prior speaker anonymization systems rely on heuristic techniques like replacing speaker x-vectors with randomly selected vectors from a predefined pool or perturbing features without mathematical guarantees. Although these heuristics perform well on empirical privacy metrics like the Voice Privacy Challenge, they fail to provide theoretical lower bounds against a well-informed adversary. Existing differential privacy attempts either perturb all features (including semantic content, destroying utility) or rely on distance-based metric DP where protection degrades across speaker space. This work matters because safety-critical speech applications require provable privacy guarantees independent of specific empirical testing benchmarks.

## Method

DP-VOXLET assumes a voice conversion system structured into an encoder producing semantic content C and speaker embedding S, and a decoder mapping them back to a waveform. To prevent random perturbations from throwing embeddings into out-of-distribution regions that cause garbled audio, the framework trains a variational autoencoder (VAE) on speaker embeddings extracted from the Common Voice dataset to learn a low-dimensional latent space of valid speaker representations. 

The Gaussian speaker mechanism bounds the L2 global sensitivity of the latent representation by scaling embeddings to a maximum norm U, and then adds Gaussian noise with variance sigma squared, where sigma equals U divided by the privacy parameter mu. To protect against extreme outliers causing decoder failure, each dimension of the latent representation is clamped to bounded absolute values using an L-infinity norm constraint. This clamped, noisy latent vector is then passed through the VAE decoder to yield a valid target speaker embedding, which is subsequently fed into the voice conversion decoder alongside the original semantic content.

## Experimental setup

Evaluated using the 2024 Voice Privacy Challenge benchmark and the librispeech test dataset. Performance is measured using Equal Error Rate (EER) via a semi-informed speaker verification attacker and Word Error Rate (WER) via automated speech recognition (ASR). The base voice conversion system tested is OpenVoice using 192- or 256-dimensional speaker embeddings.

## Results

Using OpenVoice with DP-VOXLET, increasing the noise level sigma from 0 to 10 improves the EER privacy metric from 4.6% to 41.2% while keeping the Word Error Rate remarkably stable between 2.8% and 3.4% (reaching 3.4% at sigma = 10 and mu = 0.1). DP-VOXLET outperforms prior differential privacy speech work [19] which topped out below 20% EER. Out of 36 submissions to the 2024 Voice Privacy Challenge, only 6 achieved an EER above 40%, placing DP-VOXLET's 41.2% result directly competitive with top non-provable submissions.

| System / Condition | EER (%) | WER (%) |
|-------------------|---------|---------|
| Baseline ($\sigma=0$, $\mu=\infty$) | 4.6 | 3.0 |
| DP-VOXLET ($\sigma=0.5$, $\mu=2$) | 34.0 | 2.8 |
| DP-VOXLET ($\sigma=1$, $\mu=1$) | 37.3 | 3.1 |
| DP-VOXLET ($\sigma=2$, $\mu=0.5$) | 36.8 | 3.3 |
| DP-VOXLET ($\sigma=5$, $\mu=0.2$) | 39.2 | 3.5 |
| DP-VOXLET ($\sigma=10$, $\mu=0.1$) | 41.2 | 3.4 |

## Limitations

The framework assumes perfect disentanglement between semantic content and speaker identity (Assumption 1), meaning minor speaker attribute leakage into content C can bypass guarantees in practice. The approach relies on VAE training distribution coverage; extremely high noise levels or out-of-distribution voices might still degrade acoustic quality despite L-infinity clamping. Evaluation is currently constrained to English datasets (librispeech) and specific base architectures.

## Why read this

Speech and machine learning researchers seeking to transition speech anonymization from empirical heuristics to mathematically rigorous differential privacy frameworks should read this paper. It provides a blueprint for adapting latent-space VAE wrappers to satisfy formal privacy definitions without sacrificing downstream ASR intelligibility.

## Code

- https://github.com/uvm-plaid/dpvc

## Applications

Privacy-preserving speech data sharing, secure voice assistants, telephony anonymization, and protection against biometric voice profiling.

## Related

- (link related pages by id as the wiki grows)
