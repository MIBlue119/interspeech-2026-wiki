---
id: deng26d_interspeech
category: enhancement-separation
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2212
pdf: https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.pdf
---

# Joint Learning of Covariance Estimation and White Noise Gain for Robust MVDR Beamforming

*Yongyi Deng, Hanchen Pei, Jianbo Ma, Gongping Huang, Jingdong Chen, Jacob Benesty*

[PDF](https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/deng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2212)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper proposes a data-driven MVDR beamforming framework that jointly predicts a time-frequency noise mask and a frequency-dependent white noise gain (WNG) threshold using a dual-branch neural network, achieving superior speech enhancement and robustness against array mismatches compared to fixed-WNG baselines.

## Key contributions

- Reinterprets the white noise gain (WNG) constraint as a latent, frequency-dependent physical control variable rather than a static manually tuned hyperparameter.
- Introduces a dual-branch neural network architecture that jointly estimates a complex-valued time-frequency noise mask and an adaptive WNG constraint.
- Embeds a differentiable WNG-constrained MVDR layer with a quadratic eigenvalue problem (QEP) solver into an end-to-end training pipeline.
- Demonstrates consistent performance gains across SNR, SDR, STOI, and PESQ under both seen and unseen microphone array mismatch conditions.

## Problem

Traditional minimum variance distortionless response (MVDR) beamformers rely heavily on accurate spatial covariance matrix estimation and are acutely sensitive to array imperfections such as sensor position errors, gain mismatches, and microphone self-noise. To mitigate white noise amplification, practitioners typically enforce a white noise gain (WNG) threshold or apply diagonal loading. However, choosing a universal static WNG threshold is suboptimal because the ideal robustness-directivity trade-off shifts dynamically with varying acoustic environments, noise configurations, and device aging effects. Existing learning-based beamforming methods focus almost exclusively on improving noise mask estimation while treating the WNG or diagonal loading factor as an unoptimized external hyperparameter.

## Method

The framework processes multi-channel short-time Fourier transform (STFT) speech inputs using a multi-clue fusion backbone based on the multi-channel JNF architecture. This feature extractor combines four parallel RNN-FC modules: a frequency module capturing inter-frequency correlations, a narrowband temporal module modeling short-term temporal dynamics, a subband module using local frequency neighborhoods with a reference channel, and a fullband module utilizing cross-band context. The LSTM hidden dimensions for these four modules are 128, 256, 384, and 128, respectively. The subband module uses N1 = 2 adjacent frequency bins and the temporal module uses N2 = 5 contextual frames.

The fused multiscale features feed into two task-specific prediction heads. The WNG branch uses a lightweight linear layer to predict a frequency-dependent robustness threshold, while the complex mask branch uses a multi-layer perceptron (MLP) to output real and imaginary parts of a complex-valued time-frequency mask. The estimated noise component yields a Hermitian positive semi-definite noise spatial covariance matrix via temporal averaging across L frames. The system then solves for the MVDR beamformer weights via a closed-form quadratic eigenvalue problem (QEP) using a differentiable robust MVDR layer.

The network is optimized end-to-end using mean absolute error (MAE) between the enhanced output signal and an early-reference beamformed signal. Training uses the Adam optimizer at the utterance level with a batch size of 4, an initial learning rate of 1e-4 halved after 5 consecutive epochs of validation loss stagnation. Frame length is set to 16ms with 50% overlap and a 256-point FFT.

## Experimental setup

Speech sources are drawn from the VCTK dataset sampled at 16 kHz and segmented into 3-second clips. Multi-channel noisy mixtures are generated using an 8-microphone uniform linear array (ULA) with a nominal inter-element spacing of 2 cm (varied between 1 cm and 3 cm for unseen array mismatch tests, with Gaussian sensor perturbation standard deviation of 0.1 cm). Acoustic environments feature random room dimensions (5-10m length, 4-8m width, 2.5-4m height), reverberation times T60 between 0.1s and 0.4s, 1 to 4 interfering sources at azimuths from 90 to 270 degrees, SIRs from 0 to 10 dB, diffuse noise (0-10 dB SNR), and additive white Gaussian noise (10-40 dB SNR). Baselines include conventional MVDR utilizing a FullSubNet mask estimator with manually tuned optimal fixed WNG (-6 dB) or optimal diagonal loading epsilon. Evaluation metrics include SNR gain, Delta SDR, STOI, and PESQ.

## Results

Under seen array conditions (2.0 cm nominal spacing), the proposed adaptive MVDR framework achieves an SNR gain of 11.940 dB and a Delta SDR of 11.474 dB, outperforming conventional MVDR with optimal fixed WNG (10.543 dB SNR gain, 9.510 dB Delta SDR) and optimal diagonal loading epsilon (10.118 dB SNR gain, 9.275 dB Delta SDR). Under unseen array conditions with a 1.0 cm nominal spacing, the proposed model maintains superior performance with 10.225 dB SNR gain and 9.93 dB Delta SDR compared to 8.683 dB SNR gain for optimal WNG conventional MVDR. Under 3.0 cm spacing, it attains 11.586 dB SNR gain and 10.850 dB Delta SDR versus 9.952 dB SNR gain for the best baseline. Violin distributions confirm that the adaptive WNG strategy consistently yields tighter, higher-scoring clusters across PESQ, STOI, SDR, and SNR metrics.

| System / Condition | SNR gain (dB) | Delta SDR (dB) |
|---|---|---|
| Proposed MVDR (Seen: 2.0cm) | 11.940 | 11.474 |
| Conventional MVDR w/ optimal W0 (Seen) | 10.543 | 9.510 |
| Conventional MVDR w/ optimal epsilon (Seen) | 10.118 | 9.275 |
| Proposed MVDR (Unseen: 1.0cm) | 10.225 | 9.930 |
| Conventional MVDR w/ optimal W0 (Unseen: 1.0cm) | 8.683 | 8.476 |
| Proposed MVDR (Unseen: 3.0cm) | 11.586 | 10.850 |

## Limitations

The evaluation is restricted to simulated room impulse responses with uniform linear arrays (ULA) and simulated sensor position perturbations, lacking validation on real-world recorded multichannel hardware arrays. The language scope is limited to English speech data from the VCTK dataset, and the model complexity relies on heavy multi-module RNN-FC backbones which may challenge low-latency, resource-constrained on-device deployment.

## Why read this

Speech and ML researchers building multichannel enhancement systems should read this to learn how to integrate closed-form signal processing constraints like QEP-based robust beamforming into end-to-end differentiable neural architectures.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multichannel speech enhancement, smart speakers, hands-free communication devices, and hearing aids operating in dynamic acoustic environments with sensor mismatch.

## Institutions / 機構

Wuhan University, Dolby Laboratories, Northwestern Polytechnical University, University of Quebec

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
