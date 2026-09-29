---
id: ryu26c_interspeech
category: enhancement-separation
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3266
pdf: https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.pdf
---

# SPOT-TSE: Spatial Point-Guided Target Speech Extraction

*Taewon Ryu, Joon-Hyuk Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ryu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3266)

**Category:** `enhancement-separation`

**TL;DR** — SPOT-TSE is a multi-channel point-guided target speech extraction framework that conditions separation on a continuous spatial point query (distance and azimuth) using spatial query encoding and Mamba-based TF-GridNet blocks, achieving an SDR of 11.05 dB and a WER of 0.22 on complex randomized simulation datasets.

## Key contributions

- Replaces rigid region-based target speech extraction with continuous spatial point-guided conditioning (distance and azimuth).
- Introduces Spatial Query Encoding (SQE) using Fourier feature mapping to represent continuous spatial point queries.
- Proposes ambiguity-aware training combining proximity-weighted soft targets to mitigate boundary sensitivity and hard-negative spatial sampling to resolve spatial overlap.
- Replaces LSTM blocks in the TF-GridNet backbone with BiMamba and causal Mamba blocks to reduce computational overhead for wearable deployment.

## Problem

Conventional wearable selective listening systems often require enrolment utterances or speaker embeddings, raising privacy concerns and proving impractical for spatial targeting. While multi-channel systems use azimuth or distance independently, they suffer from ambiguity when multiple interferers share the same azimuth or distance coordinate. Region-based interval selection approaches are vulnerable to boundary sensitivity, rigid binary limitations, and failures when a farther target is obstructed by a closer interferer along the same line of sight.

## Method

The multi-channel input is transformed via STFT and concatenated with inter-channel cues—inter-channel level difference (ILD), inter-channel phase difference (IPD), and coherent-to-diffuse ratio (CDR)—which are processed alongside complex STFT features. The backbone consists of a 6-layer streaming TF-GridNet where BiMamba models frequency-axis global spectral dependencies and causal Mamba handles streaming temporal modeling. Spatial query points q = (dq, θq) are normalized against workspace bounds, expanded via 32 Fourier frequency bands (L = 32), linearly projected into a 128-dimensional embedding (Dq = 128), and injected into backbone blocks (b >= 2) using Feature-wise Linear Modulation (FiLM).

During training, a proximity-weighted soft target is constructed using a generalized Gaussian weighting function with spread parameters (sigma_d = 0.5 m, sigma_theta = 5.0 deg) and sharpness factors (beta_d = beta_theta = 2) to smooth supervision near boundaries. Hard-negative spatial sampling uses margins tau_theta = 5 deg and tau_d = 0.5 m to force the model to handle overlapping spatial conditions (close azimuth/far distance, or close distance/far azimuth). The model is optimized using an SNR reconstruction loss (-SNR(s_target, s_hat)) for 200 epochs using the Adam optimizer with an initial learning rate of 1.2e-3, gradient clipping at 1.0, and automatic mixed precision (AMP) on 4.5 s random crops with a batch size of 4.

## Experimental setup

Experiments use simulated datasets built via pyroomacoustics with a 7-channel Project Aria smart glasses array topology at 24 kHz. The setup evaluates three datasets of increasing complexity: D1 (fixed room 7x8x3 m, fixed array center, fixed RT60 0.2s), D2 (fixed room 7x8x3 m, randomized array positions and yaw), and D3 (randomized room dimensions L:[5,8]W:[4,8]H:[2,4] m, randomized array positions/yaw, and randomized absorption [0.1, 0.9]). The main training uses 50,000 mixtures (5,000 validation, 5,000 test). Metrics include SDR, PESQ, STOI, and Word Error Rate (WER) computed using Whisper small.en.

## Results

On the baseline datasets D1, D2, and D3, SPOT-TSE improves SDR from mixture levels of -4.94, -4.79, and -4.64 dB up to 14.95, 13.94, and 11.05 dB, respectively. Concurrently, it reduces ASR WER from 1.05, 1.03, and 1.05 down to 0.12, 0.14, and 0.22. Ablations on reduced D3 show that removing hard-negative sampling drops azimuth-close SDR from 4.15 to 2.93 dB, removing soft targets lowers overall SDR to 7.31 dB, and replacing Spatial Query Encoding with simple scalar inputs reduces overall SDR by 0.61 dB. In terms of compute, replacing BiLSTM/LSTM layers with BiMamba/Mamba cuts MAC/s by 74% from 40.19 to 10.54 G/s while preserving separation performance (8.31 vs 8.29 dB SDR).

| Dataset | System | SDR (dB) | PESQ | STOI | WER |
|---|---|---|---|---|---|
| D1 | Mixture | -4.94 | 1.33 | 0.60 | 1.05 |
| D1 | SPOT-TSE | 14.95 | 2.94 | 0.93 | 0.12 |
| D2 | SPOT-TSE | 13.94 | 2.83 | 0.91 | 0.14 |
| D3 | SPOT-TSE | 11.05 | 2.59 | 0.87 | 0.22 |

## Limitations

The evaluation is restricted entirely to simulated acoustic environments using pyroomacoustics and synthetic VCTK/LibriSpeech mixtures, leaving real-world wearable device recordings untested. The approach assumes the user can precisely specify continuous distance and azimuth coordinates, which may be challenging in practical human-computer interaction scenarios without external sensors.

## Why read this

Researchers and engineers working on wearable spatial audio extraction, hearables, or enrollment-free selective listening should read this to see how state-space models (Mamba) and continuous query encodings replace heavy recurrent architectures for real-time edge processing.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart glasses, hearables, selective listening aids, and wearable AR/VR audio hardware.

## Institutions / 機構

Hanyang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, Ministry of Science and ICT

## Related

- (link related pages by id as the wiki grows)
