---
id: kamel26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2736
pdf: https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.pdf
---

# Spectral Masking and Interpolation Attack (SMIA): A Black-box Adversarial Attack against Voice Authentication and Anti-Spoofing Systems

[PDF](https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kamel26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2736)

**TL;DR** — The paper introduces the Spectral Masking and Interpolation Attack (SMIA), a black-box adversarial method that manipulates inaudible frequency bins of AI-generated speech to simultaneously bypass voice authentication systems and anti-spoofing countermeasures with up to 100% attack success rate.

## Problem

While anti-spoofing countermeasures (CMs) exist alongside voice authentication systems (VASs), many rely on static detection models that are vulnerable to adversarial spoofing attacks. Existing black-box attacks either target only CMs or experience drastic drops in success against combined pipelines, leaving a critical security gap in full voice biometric stacks. SMIA addresses this by presenting a realistic, gradient-free threat model capable of defeating end-to-end authentication architectures.

## Method

SMIA operates under a black-box assumption requiring only 10 seconds of victim audio, utilizing tool-independent cloning (e.g., Fish Speech) to generate base spoofed audio. It employs a Tree-structured Parzen Estimator (TPE) Bayesian optimization framework to iteratively query the target endpoint (leveraging either continuous scores or binary labels) for up to Niter=100 trials. The core perturbation module targets low-energy, perceptually insignificant time-frequency spectrogram bins governed by a decibel threshold tdb and a normal distribution N(mu, sigma_p^2) for stochastic probability sampling. It implements three perturbation modes: masking (zeroing magnitudes), interpolation (reconstructing bins via 1D linear interpolation from high-energy anchor points across time), and a hybrid approach.

## Results

Evaluated on ASVspoof 2019 LA and LibriSpeech datasets against multiple CMs (RawNet2, RawGAT-ST, RawPC-Darts) and VASs (X-Vectors, DeepSpeaker, Microsoft Azure Speaker Verification API), SMIA achieves up to 100% Attack Success Rate (ASR) against standalone CMs, 97.5% against standalone VASs, and up to 97-100% against combined CM and VAS pipelines. On LibriSpeech, ASR reaches 100% in most end-to-end configurations, though it dips to 66.5% for DeepSpeaker combined with RawPC-Darts due to strict feature trade-offs. The framework is tested across 13 attack types (650 utterances) and demonstrates resilience under simulated over-the-line and over-the-air transmission channels.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Security engineers and researchers in speech biometrics use this evaluation framework to audit and harden voice authentication systems and anti-spoofing countermeasures against advanced adversarial deepfakes.

## Limitations

Strong perturbations required to defeat robust anti-spoofing countermeasures like RawPC-Darts can occasionally degrade speaker biometric properties and cause verification failure.

## Related

- (link related pages by id as the wiki grows)
