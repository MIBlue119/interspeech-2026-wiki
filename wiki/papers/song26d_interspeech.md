---
id: song26d_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1857
pdf: https://www.isca-archive.org/interspeech_2026/song26d_interspeech.pdf
---

# ARTT: Augmented Reverberant-Target Training for Unsupervised Monaural Speech Dereverberation

*Siqi Song, Fulin Wu, Zhong-Qiu Wang*

[PDF](https://www.isca-archive.org/interspeech_2026/song26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1857)

**TL;DR** — Augmented Reverberant-Target Training (ARTT) is a two-stage unsupervised monaural speech dereverberation framework that uses synthetic relative transfer functions and mean-teacher self-distillation to achieve state-of-the-art results without clean reference signals. It reaches 7.3 dB SI-SDR on the WSJ0CAM-DEREVERB test set, outperforming existing unsupervised and even supervised baselines.

## Key contributions

- Proposes Reverberant-Target Training (RTT), a Stage I strategy that trains a network to recover observed reverberant mixtures from further-reverberated inputs using synthetic statistical room impulse responses.
- Introduces an online self-distillation mechanism (Stage II) adapted from mean-teacher / BYOL frameworks, using an Exponential Moving Average (EMA) teacher for stable pseudo-label generation.
- Implements an asymmetric input construction where the teacher processes slightly noisy inputs and the student processes inputs corrupted by both synthetic relative reverberation and additive noise.
- Employs a unified combined loss function containing time-domain and time-frequency domain losses alongside an auxiliary reference constraint to prevent model collapse.

## Problem

Monaural blind speech dereverberation is a notoriously challenging, ill-posed inverse problem because acquiring clean, anechoic target signals for real-world reverberant mixtures is practically impossible. Supervised deep learning models suffer from severe domain mismatch when trained on simulated room impulse responses and deployed in real acoustic environments. Prior unsupervised approaches such as WPE rely on delayed linear prediction and miss rich speech priors, physical-consistency methods like USDnet require multi-channel constraints to work robustly, generative diffusion models (e.g., BUDDy) incur heavy computational burdens via iterative joint estimation, and noise-subtraction frameworks like NyTT fail because room reverberation is a highly-correlated convolutional process violating independent noise assumptions.

## Method

The architecture is built around TF-GridNet using complex spectral mapping to predict real and imaginary components from STFT representations (32 ms window size, 8 ms hop size, Hann window). TF-GridNet hyperparameters are set to D=128, B=4, I=1, J=1, H=200, L=3, and E=4. The STFT uses a square root of the Hann window.

Stage I (RTT) trains the model to map a further-reverberated signal z = y * h_syn to the original observation y. The synthetic statistical RTF h_syn consists of a unit impulse followed by an exponentially decaying diffuse tail driven by white Gaussian noise, with decay rate corresponding to a randomly sampled T60 in U(0.5, 1.2) s and direct-to-reverberant ratio (DRR) in U(-16, -6) dB. The training loss uses a unified reconstruction objective L_rec combining time-domain and time-frequency domain distance functions.

Stage II (Self-Distillation) refines the model using a mean-teacher framework where the teacher parameters are updated via an EMA momentum factor alpha = 0.999. An asymmetric input structure is created: the teacher receives a stable input y_tilde = y + epsilon_T, and the student receives a hard input z_tilde = y * h_rel + epsilon_S, where h_rel is a physically simulated correction filter derived via spectral deconvolution from pyroomacoustics room simulations (room sizes length/width 5.0-10.0 m, height 3.0-4.0 m, T60 0.2-1.3 s). Independent Gaussian noises epsilon_T and epsilon_S are injected with standard deviations set to 0.02 times the standard deviation of y. The total loss combines the primary self-distillation alignment loss and an auxiliary regularization term using the original observation y with a weighting term omega = 1.2, optimized via stop-gradient operations on the teacher.

## Experimental setup

Evaluated on the WSJ0CAM-DEREVERB dataset comprising 39,293 training mixtures (~77.7 hours), 2,968 validation mixtures (~5.6 hours), and 3,262 test mixtures (~6.4 hours) derived from WSJ0CAM. Background noise is added from REVERB dataset diffuse air-conditioning noise at SNRs from 5 to 25 dB, with reverberation times T60 between 0.2 and 1.3 s at 16 kHz sampling rate using 1-channel inputs. Baselines include WPE (1-ch and 8-ch), USDnet (1-ch with 1-loss and 8-loss), BUDDy, and supervised DNN-WPE. Metrics include narrowband PESQ, eSTOI, and SI-SDR.

## Results

ARTT Stage I achieves an SI-SDR of 3.3 dB, PESQ of 2.18, and eSTOI of 0.740, outperforming single-channel unsupervised baselines like USDnet (-2.1 dB SI-SDR) and BUDDy (2.1 dB SI-SDR). When Stage II self-distillation is added, performance leaps to a state-of-the-art 7.3 dB SI-SDR, 2.61 PESQ, and 0.832 eSTOI, surpassing even the supervised baseline DNN-WPE (2.8 dB SI-SDR). Ablations show that removing the auxiliary reference loss drops SI-SDR to 6.0 dB, while removing noise injection drops it to 3.1 dB, proving both components are critical for stability and artifact reduction.

| System | Unsupervised | Channels | SI-SDR (dB) | PESQ | eSTOI |
|---|---|---|---|---|---|
| Mixture | - | 1 | -3.6 | 1.64 | 0.494 |
| WPE [18] | Yes | 1 | -1.7 | 1.78 | 0.529 |
| USDnet [6] | Yes | 1 | -2.1 | 1.76 | 0.561 |
| BUDDy [24] | Yes | 1 | 2.1 | 2.49 | 0.802 |
| DNN-WPE [40] | No | 1 | 2.8 | 2.16 | 0.744 |
| ARTT Stage II | Yes | 1 | **7.3** | **2.61** | **0.832** |

## Limitations

The approach assumes monaural stationary or quasi-stationary background noise profiles matched by Gaussian perturbations and simulated room geometries. While evaluated across diverse T60 values (0.2–1.3s), real-world acoustic anomalies such as highly non-linear distortion, moving speakers, or extreme impulse responses outside simulated room parameter bounds were not comprehensively tested.

## Why read this

Researchers and engineers tackling monaural unsupervised speech enhancement should read this paper to see how combining statistical reverberation augmentation with mean-teacher self-distillation can bypass the need for clean target signals and outperform supervised models.

## Code

- https://arttdemo.github.io/artt_demo/

## Applications

Unsupervised speech preprocessing for automatic speech recognition (ASR), speaker verification, and hands-free communication devices operating in highly reverberant and noisy rooms.

## Related

- (link related pages by id as the wiki grows)
