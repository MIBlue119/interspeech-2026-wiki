---
id: kamath26_interspeech
category: spatial-audio
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-252
pdf: https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.pdf
---

# Sensitivity Analysis of Generative Spatial Audio Metrics : A Study on Responsiveness, Smoothness, and Symmetry

*Purnima Kamath, Adrian S. Roman, Koichi Saito, Yuki Mitsufuji, Juan P. Bello*

[PDF](https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kamath26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-252)

**TL;DR** — This paper establishes a meta-evaluation framework to assess how generative spatial audio metrics respond to continuous spatial trajectory changes, finding that localization-informed embeddings (F-PSELD) and acoustic maps (MVDR-AM) outperform standard phase or intensity metrics in responsiveness, smoothness, and noise robustness.

## Key contributions

- Proposes a meta-evaluation sensitivity framework for generative spatial audio based on three explicit desiderata: Responsiveness, Smoothness, and Symmetry along continuous azimuth and elevation trajectories.
- Curates a large-scale controlled synthetic evaluation dataset comprising 68,400 First-Order Ambisonics (FOA) audio samples across varying scene complexities (single source, multi-source, multi-instance) and noise conditions.
- Comprehensively benchmarks distribution-based (FAD variants using VGGish, StereoCRW, GRAM, PSELDNets) and sample-based metrics (MVDR-AM, IV, GCCPHAT, LSD, IPD).
- Identifies key failure modes of traditional spatial metrics, showing that intensity vectors (IV) collapse under symmetric multi-source layouts and phase metrics (IPD, GCCPHAT) degrade severely under diffuse noise.

## Problem

Evaluating generative spatial audio models for First-Order Ambisonics (FOA) is hindered by an absence of agreed-upon metrics that reliably track explicit control parameters like azimuth and elevation. Prior works adapt distribution-based distances like Fréchet Audio Distance (FAD) or sample-based metrics like intensity vectors and log spectral distance without knowing whether these metrics behave monotonically or smoothly along spatial trajectories. This lack of rigorous metric validation makes it difficult to ascertain if generative models accurately follow spatial control commands, motivating a systematic sensitivity analysis to establish reliable evaluation criteria.

## Method

The authors define a meta-evaluation framework using controlled First-Order Ambisonics (FOA) sequences generated via SoundSpaces 1.0 RIRs and SpatialScaper, moving sources along circular trajectories at a 3-meter radius with 20-degree step sizes across 30 room environments. Metrics are evaluated on three criteria: Responsiveness (modeled by fitting a low-order smooth function to standardized distance curves to measure slope magnitude penalized by coefficient of determination R^2), Smoothness (computed via the standard deviation of squared distances between trajectory neighbors to penalize jitter or sharp discontinuities), and Symmetry (measured using RMSE between paired samples at opposite left-right trajectory positions, bound via inverse exponential).

Evaluated metrics span two major families: distribution-based FAD variants extracting embeddings from M-VGG (monophonic VGGish on averaged FOA channels), S-CRW (StereoCRW on converted L/W+Y, R/W-Y channels), F-GRAM (self-supervised FOA reconstruction), and F-PSELD (PSELDNets predicting multi-ACCDOA targets from log-mel spectrograms combined with intensity vectors); and sample-based metrics including MVDR-AM (minimum-variance distortionless response beamforming acoustic maps evaluated with LPIPS), Intensity Vectors (IV), Generalized Cross-Correlation Phase Transform (GCCPHAT), Log Spectral Distance (LSD), and Interchannel Phase Differences (IPD). Data generation comprises 68,400 ten-second samples across six experimental conditions spanning clean and noisy settings (Gaussian noise at 0 to 15 dB SNR) under single-source (SS), multi-source (MS), and single-source multiple-instances (SSMI) configurations.

## Experimental setup

The evaluation dataset consists of 68,400 synthetic 10-second FOA samples generated from SoundSpaces 1.0 room impulse responses and FSD50K monophonic sound events sampled at 16 kHz. The study compares nine representative distribution-based and sample-based metrics across azimuth and elevation sweeps under clean and additive noise conditions (0-15 dB SNR), measuring Responsiveness, Smoothness, and Symmetry scores.

## Results

Among sample-based metrics, MVDR-AM achieves the highest Responsiveness (outperforming IVs), whereas LSD, GCCPHAT, and IPD exhibit poor Responsiveness due to noise vulnerability. Among distribution-based metrics, spatially informed F-PSELD achieves the highest Responsiveness, outperforming mono/stereo baselines (M-VGG, S-CRW) and self-supervised reconstruction models (F-GRAM). In robustness evaluations under additive noise, MVDR-AM, IVs, and F-PSELD exhibit minimal score changes near 0%, whereas LSD, GCCPHAT, and IPD flatten out and become unresponsive. Under increasing scene complexity (SSMI conditions), raw intensity vectors (IV) collapse and introduce large distance discontinuities, whereas F-PSELD and F-GRAM maintain stable Smoothness.

| Metric | Format / Basis | Responsiveness | Smoothness | Noise Robustness ||
|---|---|---|---|---||
| **F-PSELD** | FOA / PSELDNet FAD | High | Moderate-High | High ||
| **MVDR-AM** | FOA / 2D Acoustic Maps | High | Moderate-High | High ||
| **IV** | FOA / Intensity Vectors | Moderate-High | Moderate | High ||
| **F-GRAM** | FOA / GRAM FAD | Low-Moderate | Moderate | Moderate ||
| **GCCPHAT** | FOA / Phase Transform | Low | High | Low ||
| **IPD / LSD** | FOA / Phase & Spectrum | Low | High | Low ||

## Limitations

The study is restricted to artificially synthesized FOA data from a single simulation platform (SoundSpaces 1.0) and evaluates a constrained set of metrics. The experiments test specific canonical trajectories (circular sweeps at a fixed 3-meter radius) and do not yet account for complex room geometries, varying reverberation times, real-world recorded audio data, or subjective human perceptual validation.

## Why read this

Speech and audio researchers building or evaluating generative spatial audio models should read this paper to avoid using fragile evaluation metrics like phase differences or raw spectral distances. It provides concrete guidance on why localization-trained embeddings (such as F-PSELD) and acoustic maps (MVDR-AM) are vastly superior for tracking spatial control trajectories.

## Code

- https://github.com/pkamath2/sa_sensitivity

## Applications

Benchmarking generative spatial audio models, spatial speech enhancement, immersive virtual reality audio synthesis, and interactive machine listening.

## Related

- (link related pages by id as the wiki grows)
