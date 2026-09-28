---
id: li26i_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-643
pdf: https://www.isca-archive.org/interspeech_2026/li26i_interspeech.pdf
---

# DAR-Boost: A Differentiable and Adaptive Raw Data Augmentation Framework for Robust Anti-Spoofing

*Yingdong Li, Chengxin Chen, Nanli Zeng, Jianguo Hu, Kun Zeng*

[PDF](https://www.isca-archive.org/interspeech_2026/li26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-643)

**TL;DR** — DAR-Boost is a fully differentiable, adaptive raw waveform data augmentation framework that replaces static heuristic noise with learnable adversarial perturbations and dynamic instance-aware routing. It achieves superior generalization across both speech and non-speech environmental sound deepfake detection domains.

## Key contributions

- Proposed the first end-to-end differentiable and adaptive raw waveform augmentation framework tailored for audio deepfake detection.
- Designed a generator-router dual system that synthesizes boundary-seeking adversarial perturbations and dynamically fuses them to prevent mode collapse.
- Demonstrated domain-agnostic generalization, effectively bridging speech and non-speech environments and significantly outperforming static baselines on environmental sound deepfake detection (EnvSDD).

## Problem

Traditional raw waveform augmentation methods like RawBoost rely on static parameters and telephony-based heuristics tailored specifically for speech, failing to generalize to broadband non-speech domains like environmental sounds. Furthermore, open-loop stochastic sampling operates independently of detector decision boundaries, wasting training iterations on trivial or unrealistic samples and requiring expensive grid searches. This acoustic mismatch and lack of automated, cost-effective optimization leave raw-domain data augmentation significantly under-explored for robust audio deepfake detection against unseen spoofing attacks.

## Method

The framework comprises a Differentiable Boost Module, a Parameter Generator, and an Adaptive Router. The boost module reconstructs Linear/Non-linear (LnL) and Stationary (SSI) noise injections using FIR notch filters with Hamming windows, alongside a Soft-Masking Impulsive Sound Distortion (ISD) module using a temperature-scaled Sigmoid mask to replace discrete rejection sampling.

The Parameter Generator uses lightweight convolutional encoders with a Gradient Reversal Layer (GRL) to predict Learnable Shape Parameters (center frequency, bandwidth, density) via adversarial maximization of the downstream task loss. Concurrently, Intensity Parameters (gains, SNRs) are strictly sampled from fixed Uniform distributions to prevent mode collapse and maintain physical realism. The Adaptive Router concatenates the raw input with the three augmented views, processing them through a lightweight convolutional encoder with Global Average Pooling and a Softmax head to assign instance-aware mixing weights.

The entire pipeline is trained via a hybrid objective combining task loss and diversity regularization. The downstream detector and adaptive router minimize the task loss using gradient descent, while the parameter generator is updated via reversed gradients from the GRL to maximize loss and synthesize boundary-seeking perturbations.

## Experimental setup

Evaluated on ASVspoof 2019 (LA) & 2021 (LA), CtrSVDD (singing voice benchmark), and EnvSDD (Text-to-Audio and Audio-to-Audio attack types). Compared against static RawBoost variants, WavAugment-style heuristics (Time-Drop, Band-Reject, Additive-Noise), and unaugmented baselines, integrated with backbones W2V-AASIST, RawNet2, and BEATs-AASIST. Metrics include Equal Error Rate (EER%) and minimum tandem Detection Cost Function (min t-DCF) implemented on an NVIDIA RTX 5090 GPU.

## Results

On the EnvSDD benchmark, full DAR-Boost achieves an EER of 4.82% on Text-to-Audio (TTA) and 0.90% on Audio-to-Audio (ATA), outperforming static RawBoost variants which suffer performance degradation (e.g., RawBoost LnL+ISD yields 9.49% TTA and 1.45% ATA EER). Ablation studies show that removing the Parameter Generator severely degrades performance below the baseline (7.63% TTA, 2.05% ATA EER), while removing the Adaptive Router drops ATA EER to 2.32%. In speech domains (ASVspoof 19LA/21LA, CtrSVDD), DAR-Boost matches the best-tuned static RawBoost configurations while eliminating manual grid searches.

| Method | 19LA min t-DCF | 19LA EER(%) | 21LA min t-DCF | 21LA EER(%) | CtrSVDD EER(%) | EnvSDD TTA EER(%) | EnvSDD ATA EER(%) |
|---|---|---|---|---|---|---|---|
| w/o DA | 0.00545 | 0.204 | 0.2728 | 3.33 | 12.1948 | 7.19 | 1.42 |
| RawBoost (LnL+ISD) | 0.00840 | 0.285 | 0.2081 | 0.89 | 11.1932 | 9.49 | 1.45 |
| RawBoost (LnL+ISD+SSI) | 0.00732 | 0.231 | 0.2317 | 1.67 | 10.6856 | 9.10 | 1.53 |
| DAR-Boost w/o Generator | - | - | - | - | - | 7.63 | 2.05 |
| DAR-Boost w/o Router | - | - | - | - | - | 5.63 | 2.32 |
| Ours (Full DAR-Boost) | 0.00364 | 0.136 | 0.2088 | 0.88 | 10.3851 | 4.82 | 0.90 |

## Limitations

The framework relies on task-specific tuning of the diversity regularization weight, requiring manual adjustment depending on artifact fragility (e.g., fragile TTA artifacts demand low weights like 0.01, whereas complex scenarios require up to 2.0). Evaluation is currently restricted to audio deepfake detection benchmarks, and scaling behavior across a wider variety of unseen acoustic corruptions or open-world recording conditions remains to be explored.

## Why read this

Speech and ML researchers focusing on audio forensics and robust representation learning should read this to learn how to replace heuristic data augmentation with end-to-end differentiable, adversarial, and adaptive waveform transformations.

## Code

- https://github.com/lydsera/DAR-Boost

## Applications

Audio deepfake detection, voice anti-spoofing systems, and environmental sound integrity verification.

## Related

- (link related pages by id as the wiki grows)
