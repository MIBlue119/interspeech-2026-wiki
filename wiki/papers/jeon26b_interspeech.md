---
id: jeon26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1530
pdf: https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.pdf
---

# Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1530)

**TL;DR** — This paper presents a model-free, low-complexity ego-noise suppression framework for UAV audition that achieves 98.12% direction-of-arrival accuracy at -25 dB SNR.

## Problem

Unmanned aerial vehicles (UAVs) generate severe ego-noise that exhibits strong temporal correlation, frequency-varying composition, and amplitude stationarity. These properties disrupt conventional direction-of-arrival (DoA) estimation, corrupt noise covariance matrix (NCM) calculations, and leave persistent residual noise after beamforming. Addressing this is vital for enabling reliable audio communication and acoustic sensing on mobile drone platforms operating in extreme low-SNR environments.

## Method

The proposed framework requires no pre-trained model and operates using only 0.021 GMAC/s. It utilizes phase-consistency-guided time-frequency bin selection via temporal similarity measures and dynamic median absolute deviation thresholding to obtain reliable DoA estimates. A frequency-adaptive hybrid masking strategy combines a closeness gain at lower frequencies and a directional gain at higher frequencies (separated by a crossover frequency of 3 kHz) to estimate the noise covariance matrix for an MVDR beamformer. Finally, a null-reference post-filter employs variance modulation to suppress stationary residual ego-noise while preserving target speech components.

## Results

Experiments were conducted on simulated multichannel speech using recorded Syma Z4W drone noise mixed with TIMIT corpus utterances at input SNRs ranging from -25 dB to -5 dB under both anechoic and reverberant (T60 = 0.3 s) conditions across target DoAs of {-45, 0, 45} degrees. The system achieves a 98.12% DoA estimation accuracy at an extreme -25 dB SNR. It consistently outperforms baseline beamforming methods across SI-SDR and objective speech quality metrics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

UAV developers and roboticists can use this system for on-device spoken communication and acoustic sensing on drones deployed in search and rescue, public safety, and delivery applications.

## Related

- (link related pages by id as the wiki grows)
