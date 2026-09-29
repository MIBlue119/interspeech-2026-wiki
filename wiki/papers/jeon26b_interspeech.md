---
id: jeon26b_interspeech
category: enhancement-separation
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1530
pdf: https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.pdf
---

# Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions

*Chanhong Jeon, Jeongmin Lee, Hyungjoo Seo, Kyuhong Shim, Taewook Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1530)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper presents a lightweight, model-free speech enhancement framework tailored for UAV audition systems operating under extreme ego-noise, achieving 98.12% DoA accuracy at -25 dB SNR. It uses an ego-noise-aware spatial filtering pipeline that jointly optimizes DoA estimation, crossover-based hybrid noise covariance matrix estimation, and a variance-modulated post-filter.

## Key contributions

- Phase-consistency-guided time-frequency bin selection for robust direction-of-arrival (DoA) estimation that mitigates false alarms from temporally correlated drone noise.
- A crossover-based hybrid noise covariance matrix (NCM) estimation strategy that combines closeness gains at low frequencies and directional gains at high frequencies.
- A null-reference post-filter utilizing variance modulation to suppress residual stationary ego-noise without distorting the target speech.
- An ultra-lightweight signal processing architecture requiring only 0.021 GMAC/s without relying on pre-trained neural networks.

## Problem

Unmanned aerial vehicle (UAV) audition systems struggle under severe ego-noise characterized by strong temporal correlation, frequency-varying composition, and amplitude stationarity. Traditional spatial filtering methods fail because these noise properties destabilize direction-of-arrival (DoA) estimation, corrupt noise covariance matrix (NCM) estimation, and leave persistent residual noise after beamforming. Prior deep learning solutions demand heavy computation exceeding several GMAC/s, restricting real-time on-device deployment.

## Method

The system processes multichannel audio captured by a circular microphone array (radius 0.1 m, 4 mics) via the STFT domain (512 sample window, 75% overlap). First, a phase-consistency-guided temporal similarity metric computes phase delays between microphone pairs, and a dynamic threshold based on Median Absolute Deviation (MAD with k=2.5) selects speech-informative TF bins. Spatial likelihood is then aggregated over these selected bins to determine the global DoA via statistical mode. This shared DoA reference drives subsequent spatial filtering stages.

Next, a frequency-adaptive hybrid masking strategy is used to estimate the signal covariance matrix (SCM) and NCM for an MVDR beamformer. A crossover frequency nu is defined at 3 kHz (separating regimes based on the Speech Intelligibility Index). Below nu, a closeness gain (assuming a 10-degree DoA standard deviation) handles lower frequencies where directional resolution is poor; above nu, a directional gain combining maximum directivity factor (mDF) and delay-and-sum (DS) beamformers takes over to overcome high-frequency ego-noise dominance.

Finally, a null-reference post-filter suppresses stationary residual ego-noise from the MVDR output. Using a null direction steering vector corresponding to the minimum speech likelihood over selected bins, a null-space projection estimates residual noise. A variance-modulated primary Wiener gain scales suppression depending on signal versus noise variance, driving the gain toward unity when speech is present to prevent signal distortion.

## Experimental setup

Evaluated on 160 TIMIT speech sentences synthesized with real Syma Z4W drone ego-noise via Pyroomacoustics under both anechoic and reverberant (T60 = 0.3 s) conditions. Target DoAs were set to {-45, 0, 45} degrees across five input SNR levels (-25, -20, -15, -10, -5 dB), yielding 480 samples per SNR. Baselines include MPDR, direction-gain MVDR, closeness-gain MVDR, and MMSE beamformers. Metrics include SI-SDR, PESQ, ESTOI, DNSMOS P.835 (SIG, BAK, OVRL), DoA accuracy, and Mean Absolute Error (MAE).

## Results

At an input SNR of -25 dB under anechoic conditions, the proposed method achieves an SI-SDR of -2.446 dB (outperforming the best baseline MPDR variant at -10.150 dB), a PESQ of 1.449, an ESTOI of 0.249, and a DNSMOS OVRL of 2.245. Under reverberant conditions at -25 dB SNR, it reaches an SI-SDR of -5.134 dB and a PESQ of 1.379. DoA estimation accuracy reaches 98.12% in anechoic and 94.79% in reverberant conditions at -25 dB SNR. Ablations show that adding the proposed post-filter consistently improves PESQ and background noise (BAK) scores without harming speech intelligibility.

| System (-25dB Anechoic) | SI-SDR (dB) | PESQ | ESTOI | DNSMOS OVRL |
|---|---|---|---|---|
| Noisy Mixture | -24.826 | 1.110 | 0.138 | 1.196 |
| MPDR | -12.957 | 1.214 | 0.233 | 1.582 |
| MVDR (Directional) | -11.023 | 1.230 | 0.243 | 1.684 |
| MVDR (Closeness) | -10.150 | 1.252 | 0.242 | 1.774 |
| MMSE | -11.823 | 1.233 | 0.213 | 1.686 |
| Proposed Full System | -2.446 | 1.449 | 0.249 | 2.245 |

## Limitations

The evaluation is restricted to a simulated setup using static hovering drone recordings and synthetic room impulse responses. The framework assumes a stationary UAV state and does not account for acoustic dynamics or aerodynamic turbulence shifts during active flight or non-hovering movement maneuvers. Generalization to variable multi-drone environments or uncalibrated array geometries remains unproven.

## Why read this

Researchers and engineers designing real-time, resource-constrained audio front-ends for robotic platforms will learn how to tightly couple DoA estimation and hybrid spatial covariance masking using domain-specific noise properties rather than heavy neural networks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-board speech recognition, emergency communication, and acoustic human-robot interaction for unmanned aerial vehicles in noisy outdoor environments.

## Institutions / 機構

Sungkyunkwan University, University of Illinois Urbana-Champaign

**Funding / 經費:** National Research Foundation, IITP, KIAT

## Related

- (link related pages by id as the wiki grows)
