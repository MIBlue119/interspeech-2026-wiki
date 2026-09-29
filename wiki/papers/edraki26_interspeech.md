---
id: edraki26_interspeech
category: enhancement-separation
institutions: ["Huawei"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-319
pdf: https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.pdf
---

# Energy Redistribution in the Spectro-Temporal Modulation Domain for Near-End Listening Enhancement

*Amin Edraki, Amirhossein Hajavi, Irina Kezele, Yuanhao Yu*

[PDF](https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/edraki26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-319)

**Category:** `enhancement-separation`

**TL;DR** — This paper proposes a near-end listening enhancement (NELE) framework that redistributes speech energy in the spectro-temporal modulation (STM) domain using a globally learned mask optimized via a differentiable ESTOI loss, achieving consistent intelligibility and ASR word error rate improvements over time-frequency baselines. Across all evaluated conditions, the separable STM method yields an average ESTOI gain of 0.096 and STGI gain of 0.240.

## Key contributions

- Replaces conventional time-frequency NELE energy redistribution with a Spectro-Temporal Modulation (STM) domain framework using a modulation power spectrum (MPS) representation.
- Formulates a differentiable optimization objective derived directly from the Extended Short-Time Objective Intelligibility (ESTOI) index to train global modulation masks.
- Performs a comprehensive ablation study proving that jointly modifying spectral and temporal modulation dimensions outperforms single-dimension masking.
- Demonstrates through a separable mask formulation that structured modulation-domain control achieves comparable performance to a dense joint mask with a parameter reduction from 16K to 260.
- Evaluates across multiple metrics (ESTOI, wSTMI, STGI, Whisper-small ASR WER) and includes preliminary subjective listening tests on Mandarin Chinese matrix sentences.

## Problem

Traditional near-end listening enhancement (NELE) algorithms operate strictly in the time-frequency domain by shifting a fixed energy budget across spectral bands (such as boosting mid and high frequencies). However, speech perception is heavily governed by Spectro-Temporal Modulation (STM) patterns like formant transitions that cannot be selectively targeted in standard time-frequency representations. Prior heuristic and optimization-based time-frequency NELE approaches (e.g., SSDRC, OptimalSII, iMetricGAN) fail to manipulate these crucial modulation structures directly, limiting their overall intelligibility gains in adverse acoustic environments.

## Method

The clean speech waveform is resampled to 16 kHz and transformed via STFT using a Gaussian window (sigma_t = 5 ms, 5 sigma overlap, length 6 sigma_t). Spectrograms are divided into 50% overlapping segments of length 101 frames, and a Modulation Power Spectrum (MPS) is computed per segment via a 2D Fourier transform over time and frequency bins. A real-time, non-negative, globally learned STM mask M is applied via Hadamard product to the MPS to reallocate energy under an overall signal energy constraint.

The mask parameters are segment-independent free parameters optimized using gradient descent with a differentiable ESTOI loss function. To enhance perception, a Gaussian bandpass filter (center frequency f_0 = 2,000 Hz, std w_0 = 1,000 Hz, gain g = 2.35) is applied per frame. The modified MPS is inverted back to the spectrogram domain via inverse 2D Fourier transform (reusing original phase) and reconstructed to the time domain via iSTFT. Finally, total signal energy is normalized to match the unprocessed clean reference.

The ablation evaluates temporal-only, spectral-only, joint (16K parameters), and separable (260 parameters) masks. The separable mask factorizes into independent temporal and spectral components whose outer product forms the joint mask, and was selected for baseline comparisons due to its high efficiency and near-identical performance to the full joint mask.

## Experimental setup

Training utilized 5-second segments from 4,000 utterances of LibriSpeech train-clean-100 mixed with random AudioSet environmental noise at SNRs between -15 and 0 dB, batch size 32, for up to 50 epochs with early stopping on validation ESTOI. Objective evaluations used 100 random utterances from LibriSpeech dev-clean mixed with DEMAND noise (restaurant, living room, station) and speech-shaped noise (SSN) at -10 and -5 dB SNRs, measured via ESTOI, wSTMI, STGI, and Whisper-small WER. Baselines include SSDRC, OptimalSII, and iMetricGAN. Subjective evaluation tested Mandarin Chinese matrix sentences with 5 normal-hearing listeners at -5 dB restaurant noise.

## Results

Averaged across all conditions, the proposed STM mask achieves mean improvements of 0.096 in ESTOI, 0.240 in STGI, 0.235 in wSTMI, and 0.235 in WER, outperforming the strongest baseline SSDRC (which scored 0.079, 0.211, 0.143, and 0.192 respectively). At -5 dB SNR, the STM method yields statistically significant gains over all baselines across all noise types and metrics. In subjective evaluations with Mandarin sentences, STM filtering achieves an intelligibility score of 0.92 compared to 0.46 for unprocessed noisy speech, 0.90 for SSDRC, 0.78 for optimalSII, and 0.82 for iMetricGAN. The method does not uniformly dominate at -10 dB SNR, where SSDRC occasionally achieves higher mean ESTOI under SSN and station noise.

| System | ESTOI Gain (-5 dB) | STGI Gain (-5 dB) | wSTMI Gain (-5 dB) | WER Gain (-5 dB) |
|---|---|---|---|---|
| Unprocessed | 0.000 | 0.000 | 0.000 | 0.000 |
| iMetricGAN | 0.046 - 0.057 | 0.114 - 0.165 | 0.102 - 0.116 | 0.084 - 0.170 |
| optimal SII | 0.025 - 0.051 | 0.055 - 0.204 | 0.118 - 0.150 | 0.101 - 0.280 |
| SSDRC | 0.029 - 0.093 | 0.061 - 0.266 | 0.100 - 0.166 | 0.101 - 0.290 |
| STM Masking (Proposed) | 0.100 - 0.114 | 0.091 - 0.304 | 0.237 - 0.273 | 0.130 - 0.358 |

## Limitations

The subjective evaluation is limited in scale, involving only 5 participants, a single noise type (restaurant), and one SNR condition (-5 dB). Training and primary objective benchmarks focus solely on English (LibriSpeech), while the subjective validation uses Mandarin Chinese, leaving broader cross-language generalization under-explored. Additionally, the globally learned mask is static per segment type rather than dynamically adaptive to rapidly changing local acoustic environments.

## Why read this

Speech and audio engineers working on playback enhancement, hearing aids, or public address systems should read this to understand how shifting from time-frequency magnitude reallocation to spectro-temporal modulation (STM) domain processing yields superior intelligibility gains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Public address systems, consumer listening devices, and hearing assistive technology operating in loud acoustic environments.

## Institutions / 機構

Huawei

## Related

- [Balancing Speech Reconstruction and Noise Suppression Using Dual-Asymmetric Loss](carson26_interspeech.md) — same problem · relatedness 2.0/3
- [Post-Training Speech Enhancement Language Models with Perceptual Rewards](berdo26_interspeech.md) — same problem · relatedness 2.0/3
- [PhASE-Flow: Phonetic-Conditioned Acoustic Flow Matching in SSL Representation Domain for Speech Enhancement](gao26e_interspeech.md) — same problem · relatedness 2.0/3
- [RT-Tango: Real-Time Distributed Binaural Speech Enhancement for Low-Power Hearing Aid Devices](benslimane26_interspeech.md) — same problem · relatedness 2.0/3
- [Time–Frequency Weighted Losses for Phoneme Reconstruction in DNN-Based Speech Enhancement](monir26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
