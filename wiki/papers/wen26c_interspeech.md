---
id: wen26c_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2156
pdf: https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.pdf
---

# End-Fire Degradation-Robust DOA Estimation for Compact Linear Microphone Arrays

[PDF](https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2156)

**TL;DR** — This paper analyzes and mitigates end-fire degradation in compact linear microphone arrays by introducing a CRLB-driven steered response power method and a cosine-domain weighted least squares TDOA fusion strategy, achieving superior localization accuracy and stability.

## Problem

Direction-of-arrival (DOA) estimation using uniform linear arrays suffers from severe performance degradation and high instability when sources are located near end-fire directions. The authors show theoretically that this issue stems from an ill-conditioned nonlinear mapping between time-difference-of-arrival (TDOA) and azimuth under the far-field model, where minor noise or reverberation is amplified into massive angular errors. Furthermore, prior studies lacked a dedicated real-world evaluation dataset for end-fire robustness, hindering systematic benchmarking.

## Method

The paper builds upon a reliability-aware phase transform framework and introduces two complementary techniques for compact arrays without increasing aperture: a CRLB-driven inverse-variance weighting strategy for wideband steered response power (SRP), and a GCC-WLS method that refines TDOA estimates with 16x oversampling and performs weighted least-squares fusion in the linear cosine domain prior to the ill-conditioned arccos inversion. The system uses a 4-microphone uniform linear array with a total aperture of 10.5 cm, operating across 800 Hz to 4500 Hz. The evaluation benchmarks zero-shot, training-free signal processing baselines.

## Results

The authors collected a real-world dataset in a reverberant room (5m x 4m x 3m, 10-20 dB SNR) using clean speech at 1 m and 2 m distances across azimuths from 20 to 160 degrees. Evaluated using root mean square error (RMSE) and Cauchy soft-accuracy (S-ACC@5 degrees), the proposed methods significantly outperform conventional SRP-PHAT and SRP-MVDR baselines. Specifically, the approaches demonstrate substantially lower localization error and higher stability specifically in the challenging end-fire regions (20-40 and 140-160 degrees) while retaining competitive performance across the full azimuth range.

## Code

- https://github.com/WwHhYy666/ULA_End_Fire_Robust_ASL

## Applications

Engineers designing low-complexity, resource-constrained edge audio devices like smart TVs and spatial capture hardware can use these methods for robust, training-free acoustic source localization.

## Limitations

The evaluation is restricted to a single-source far-field plane-wave model on a horizontal plane using a 4-microphone compact linear array.

## Related

- (link related pages by id as the wiki grows)
