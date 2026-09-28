---
id: jeon26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1530
---

# Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions

**TL;DR** — Exploiting the structural properties of drone self-noise for direction-of-arrival and beamforming yields 98.12% DoA accuracy at -25 dB SNR for UAV-mounted microphones.

## Problem

UAV (drone) microphone arrays suffer from severe self-generated "ego-noise" with three destabilizing properties: strong temporal correlation, frequency-varying composition, and amplitude stationarity, which respectively hurt direction-of-arrival estimation, noise covariance matrix estimation, and residual noise suppression after beamforming.

## Method

The authors build a drone-noise-aware speech enhancement pipeline that exploits these ego-noise properties directly: reliable DoA is obtained via phase-consistency-guided time-frequency bin selection, which then parameterizes a crossover-based hybrid noise covariance matrix estimator and a post-filter with data-driven null-direction and variance modulation to suppress residual noise.

## Results

Achieves 98.12% DoA accuracy at -25 dB SNR, with consistent SI-SDR and speech quality improvements over baselines in both anechoic and reverberant conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reliable voice capture and command recognition for UAV/drone-mounted audio systems operating in extremely noisy flight conditions.

## Related

- (link related pages by id as the wiki grows)
