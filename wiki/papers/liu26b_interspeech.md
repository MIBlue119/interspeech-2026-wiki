---
id: liu26b_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time, robustness-noise]
institutions: ["Alibaba"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-191
pdf: https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.pdf
---

# LMPAN: A Lightweight Multi-Path Alignment Network for Joint Full-Duplex Acoustic Echo Cancellation and Noise Suppression

*Chengwei Liu, Shaofei Xue, Haoyin Yan, Xiaotao Liang, Zheng Xue*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-191)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`, `robustness-noise`

**TL;DR** — LMPAN is a lightweight multi-path alignment network designed for on-device joint acoustic echo cancellation and noise suppression, achieving a competitive average MOS of 4.49 with only 480K parameters and 126 MACs.

## Key contributions

- A soft multi-path alignment module that corrects temporal and energy mismatches across reference, linear AEC, and microphone streams without hard delay estimators.
- An attention-based adaptive fusion mechanism that dynamically integrates enhanced linear AEC and microphone features across changing acoustic environments.
- A dynamic target generation strategy for post-filtering that prevents over-suppression and preserves speech integrity for downstream tasks like ASR and VAD.
- A two-stage training framework using frozen WavLM-Large representations as an SSL consistency regularizer to boost perceptual quality.

## Problem

Full-duplex spoken dialogue systems suffer severe performance degradation under adverse echo and noise conditions, exacerbated by heterogeneous hardware distortions, nonlinearities, and time-varying latencies ranging up to hundreds of milliseconds. Conventional DSP methods fail under complex hardware conditions, while existing neural end-to-end models lack explicit mechanisms to correct persistent temporal and energy shifts across streams. These misalignments distort feature fusion, create residual artifacts, and degrade downstream accuracy in automatic speech recognition and voice activity detection.

## Method

LMPAN operates on power-compressed complex short-time Fourier transform spectra (32-ms frame length, 16-ms frame shift, 0.3 magnitude compression factor). A sub-band time delay estimation algorithm and a normalized least mean square filter first compute the linear AEC (LAEC) output. To resolve temporal and energy misalignments, three parallel alignment blocks process pairs of far-end reference, microphone, and LAEC signals. Each alignment block max-pools features along the frequency axis (kernel size 1x4), projects queries and keys, applies synthetic delays up to a maximum of 1 second (100 candidate delays), and computes a softmax-based delay likelihood vector for soft temporal alignment.

The architecture utilizes a dual-stream paradigm where refined LAEC and microphone spectra are jointly optimized via GTCRN-based refinement branches utilizing PConv with 1x3 frequency kernels. An attention-based fusion module then applies multi-scale channel attention to construct an attention mask and its complement, combining local and global contextual features from both streams. Finally, a post-processing strategy with a residual scaling factor alpha = 0.4 suppresses neural network-induced nonlinear artifacts.

The training pipeline follows a two-stage strategy: Stage 1 freezes a pretrained WavLM-Large model and minimizes the mean squared error across all layers between SSL embeddings of the enhanced output and clean ground-truth speech; Stage 2 fine-tunes the network using a composite loss function combining spectral reconstruction loss (alpha_1 = 0.1), echo-aware loss (alpha_2 = 0.2), scale-invariant SNR loss, and PMSQE perceptual loss (alpha_3 = 0.8), with the SSL loss maintained as a consistency regularizer. Dynamic target generation controls residual noise and echo factors via target SNR and target SER (optimal SERt = 25 dB) to avoid over-suppression.

## Experimental setup

Experiments use ICASSP 2022/2023 AEC Challenge matched pairs, DNS Challenge noise, and a self-collected large-scale dataset comprising 180 minutes of recordings from each of 40 smartphones across varying playback volumes (30%-100%). Training data consists of 2,000 hours generated across 10,000 simulated rooms (RT60: 0.2-1.2s) with data augmentation including reference signal shifts of 0-80 ms. The model is trained using the AdamW optimizer for 100 epochs, with a peak learning rate of 0.001 reached after 4,000 warm-up steps, decayed by 0.98 per epoch. Performance is evaluated on the AEC Challenge 2023 blind test set and a real-world test set of 4,000 noisy double-talk utterances using AECMOS (EMOS, DMOS, MOSavg), ERLE, DCF for VAD, WER using Paraformer for ASR, and TIR for FDSDS.

## Results

On the AEC Challenge 2023 blind test, the final LMPAN model achieves a MOSavg of 4.49, outperforming the DeepVQE baseline (MOSavg 4.40) while requiring only 0.48M parameters and 126M MACs compared to DeepVQE's 0.82M parameters and 315M MACs. Adding multi-path alignment (MA) raises MOSavg from 4.17 to 4.31 and ERLE from 42.33 dB to 45.21 dB; incorporating the attention fusion module (AFM) further pushes ERLE to 48.22 dB. On real-world double-talk data with strong echo interference (SER in [-20, -15] dB), the complete system reduces VAD detection cost function (DCF) from 9.38% to 3.75%, lowers ASR word error rate (WER) from 24.25% to 14.38%, and improves true interruption rate (TIR) from 85.17% to 93.85% compared to the one-stage baseline.

| System / Condition | MOSavg | ERLE (dB) | ASR WER (%) | VAD DCF (%) |
|---|---|---|---|---|
| DeepVQE (E2E) [8] | 4.40 | 65.7 | - | - |
| Align-ULCNet [15] | 4.36 | - | - | - |
| One-stage Baseline | 4.17 | 42.33 | 24.25 | 9.38 |
| LMPAN (+MA) | 4.31 | 45.21 | 21.57 | 7.22 |
| LMPAN (+MA+AFM) | 4.39 | 48.22 | 19.38 | 5.85 |
| LMPAN (Full Pipeline) | 4.49 | 47.15 | 14.38 | 3.75 |

## Limitations

The evaluation relies heavily on simulated room impulse responses alongside a self-collected smartphone dataset that may not cover all global hardware configurations. The dynamic target adaptation requires careful tuning of target SER and SNR parameters, where improper tuning can trade off between PESQ/ERLE maximization and downstream ASR/VAD optimization. Additionally, reliance on frozen WavLM-Large representations introduces compute overhead during the first training stage.

## Why read this

Speech and machine learning engineers building on-device full-duplex dialogue systems should read this paper to learn how explicit soft multi-path alignment and SSL-guided two-stage training can yield state-of-the-art acoustic echo cancellation under 500K parameters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-device full-duplex spoken dialogue systems, smart speakers, real-time voice communication apps, and automotive voice assistants.

## Institutions / 機構

Alibaba

## Related

- (link related pages by id as the wiki grows)
