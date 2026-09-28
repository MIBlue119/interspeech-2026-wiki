---
id: li26i_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-643
pdf: https://www.isca-archive.org/interspeech_2026/li26i_interspeech.pdf
---

# DAR-Boost: A Differentiable and Adaptive Raw Data Augmentation Framework for Robust Anti-Spoofing

[PDF](https://www.isca-archive.org/interspeech_2026/li26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-643)

**TL;DR** — DAR-Boost is a fully differentiable and adaptive raw waveform augmentation framework that improves audio deepfake detection generalization across both speech and non-speech domains, reducing EER on environmental audio (ATA) to 0.90%.

## Problem

Traditional raw waveform augmentation methods like RawBoost rely on static, speech-centric heuristics and hyperparameters, such as telephony notch filters. This rigidity leads to destructive interference when applied to non-speech domains like environmental sounds by obliterating fine-grained high-frequency textures. Furthermore, open-loop stochastic sampling operates independently of the detector's decision boundary, wasting iterations on trivial or unrealistic examples.

## Method

DAR-Boost reformulates traditional convolutive (LnL), impulsive (ISD), and stationary (SSI) noise injections into fully differentiable layers governed by a lightweight auxiliary generator-router network containing 26.27K parameters. A parameter decoupling strategy separates control variables into learnable adversarial shape parameters optimized via a gradient reversal layer (GRL) and random intensity parameters sampled from uniform distributions. An adaptive router then concatenates the raw input with augmented views, applying a softmax head to dynamically compute blending weights. The framework is trained end-to-end using a hybrid task and diversity regularization loss.

## Results

Evaluated on speech (ASVspoof 2019/2021 LA, CtrSVDD) and environmental sound benchmarks (EnvSDD) using backbones like W2V-AASIST, RawNet2, and BEATs-AASIST. DAR-Boost matches the best static RawBoost baselines in speech tasks while significantly outperforming them in environmental detection, achieving an EER of 4.82% on TTA and 0.90% on ATA (compared to 7.19% and 1.42% for unaugmented baselines, respectively). Ablations show that removing either the adversarial parameter generator or the adaptive router severely degrades performance.

## Code

- https://github.com/lydsera/DAR-Boost

## Applications

Engineers building robust audio deepfake detection systems for telephony, singing voice verification, and broad-spectrum environmental sound authentication.

## Limitations

The framework requires careful tuning of the diversity loss weight across different tasks to balance adversarial aggression and stability.

## Related

- (link related pages by id as the wiki grows)
