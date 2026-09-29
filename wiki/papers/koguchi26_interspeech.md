---
id: koguchi26_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["CyberAgent"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3202
pdf: https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.pdf
---

# Instantaneous Pitch Estimation via Wave-U-Net-Based Fundamental Waveform Enhancement

*Junya Koguchi, Tomoki Koriyama*

[PDF](https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/koguchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3202)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — This paper formulates instantaneous pitch estimation (IPE) as a speech enhancement task, employing a modified Wave-U-Net to directly extract fundamental waveforms from complex audio without heuristic channel selection. It achieves a raw pitch accuracy of 88.47% under clean conditions and maintains 86.40% at 0 dB SNR.

## Key contributions

- Reformulates fundamental waveform filtering as a speech enhancement problem, eliminating the need for complex filterbank channel-selection heuristics.
- Proposes a hybrid loss function combining time-domain mean absolute error (MAE) on both fundamental and residual components with a masked instantaneous frequency (IF) loss.
- Demonstrates robust instantaneous pitch estimation across diverse domains including speech, singing voices, musical instruments, and low-SNR noise conditions.
- Provides a thorough frequency-modulation response analysis (CAPRICEP) comparing deep learning and traditional signal processing estimators under clean and noisy conditions.

## Problem

Traditional instantaneous pitch estimators rely on deterministic band decomposition and channel-selection rules like autocorrelation or standard deviation (e.g., IRAPT, Halcyon, NINJAL) to isolate fundamental frequencies. These multi-component signal approaches struggle with non-stationary pitch movements, abrupt variations, and unseen noise conditions because instantaneous frequency lacks a unique definition in multi-component signals. This brittleness causes unnatural discontinuities, octave errors, and tracking failures in real-world acoustic environments containing harmonics and aperiodic noise.

## Method

The architecture builds on Wave-U-Net, featuring $L=6$ downsampling (DS) and upsampling (US) blocks, a bottleneck layer, and an output 1D convolutional layer with a tanh activation. Each DS block applies a 1D CNN with Leaky ReLU and a downsampling layer that discards every other sample; US blocks use interpolation-based upsampling followed by 1D convolution to prevent aliasing artifacts. Skip connections concatenate center-cropped encoder feature maps with decoder layers to preserve high-resolution local cues.

The model takes a 16 kHz speech waveform $x_{sp}(t)$ and outputs the fundamental waveform $\hat{x}_{fund}(t)$. Training utilizes a multi-task loss: $L = L_{wave} + \lambda L_{IF}$, where $\lambda = 5.0$. $L_{wave}$ computes the mean absolute error (MAE) over both the fundamental component and the residual component ($x_{res} = x_{sp} - x_{fund}$), enforcing mixture consistency. $L_{IF}$ penalizes instantaneous frequency errors calculated from analytic signals, using a dynamic mask $m(t)$ to suppress gradients in unvoiced or silent regions where instantaneous amplitude falls below an amplification threshold $\epsilon_{amp}$.

The dataset comprises 20.67 hours of audio across 42 speakers, 19 singers, and 25 musical instruments (Bagshaw, Keele, CMU ARCTIC, PTDB-TUG, MOCHA-TIMIT, MIR1K, and MDB-stem-synth), resampled to 16 kHz/16-bit. Training uses the RAdam optimizer with ScheduleFree ($\beta_1 = 0.9$, $\beta_2 = 0.999$, learning rate $1.0 \times 10^{-4}$), batch size 16, and random crops of 4096 samples for 30 epochs. Data augmentation randomly injects NOISEX92 and QUT-NOISE at 0 to 30 dB SNR with a 30% probability.

## Experimental setup

Evaluated on a strictly disjoint split of 20.67 hours combining speech, singing, and instrumental datasets. Compared against three deterministic baseline estimators: IRAPT, Halcyon, and NINJAL. Metrics include cent error, Raw Pitch Accuracy (RPA) at various cent thresholds (5, 25, 50 cents), SNR robustness down to 0 dB, and CAPRICEP frequency modulation response.

## Results

Under clean conditions, the proposed method achieves an RPA of 88.47% (at 50 cents), outperforming Halcyon (86.80%), NINJAL (84.87%), and IRAPT (83.84%). At a strict 5-cent threshold under clean conditions, it hits 38.50% RPA. Under additive white noise at 0 dB SNR, the proposed method maintains an RPA of 86.40%, showing vastly superior noise robustness compared to Halcyon (76.30%), IRAPT (81.41%), and NINJAL (62.35%), which suffer sharp performance drops.

Modulation-response analyses reveal that while NINJAL excels at tracking clean, rapid frequency modulations with minimal random responses, its performance degrades heavily under noise. The proposed approach exhibits some residual nonlinear and random components under clean conditions, which the authors attribute to downsampling-induced aliasing.

| Method | Clean RPA (5¢) | Clean RPA (25¢) | Clean RPA (50¢) | 0 dB SNR RPA (50¢) |
|---|---|---|---|---|
| IRAPT | 17.35 | 65.54 | 83.84 | 81.41 |
| Halcyon | 37.01 | 78.57 | 86.80 | 76.30 |
| NINJAL | 38.22 | 76.73 | 84.87 | 62.35 |
| Proposed | 38.50 | 79.11 | 88.47 | 86.40 |

## Limitations

The downsampling operations in Wave-U-Net introduce aliasing artifacts that can affect phase calculations, causing minor residual harmonic leakage and higher random modulation responses compared to specialized signal-processing methods like NINJAL. The evaluation is restricted to 16 kHz audio and relies on synthetic noise augmentations (NOISEX92 and QUT-NOISE), leaving real-world acoustic evaluations and multi-speaker overlapping speech unverified.

## Why read this

Speech and audio researchers building robust pitch extractors or signal analysis front-ends for noisy environments will learn how to reformulate filterbank channel selection as a supervised waveform enhancement task using Wave-U-Net and joint time-IF losses.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust prosody analysis, singing voice transcription, musical instrument pitch tracking, and speech frontend processing in adverse acoustic environments.

## Institutions / 機構

CyberAgent

## Related

- [FCPE: A Fast Context-based Pitch Estimation Model](luo26_interspeech.md) — same problem · relatedness 2.4/3
- [HFMSE: Harmonic-Guided Speech Enhancement with Flow Matching](li26l_interspeech.md) — same problem · relatedness 2.0/3
- [Amadea: An AI Companion for Pitch-Aware Spoken Language Practice](agrawal26_interspeech.md) — complementary · relatedness 1.8/3
- [Bridging Self-Supervised Learning and Speech Enhancement: A Wav2Vec2-Conditioned Framework](ojha26_interspeech.md) — shared technique · relatedness 1.8/3
- [Robust Audio-Visual Emotion Recognition via Conditional Transformer U-Nets with Frequency-Injected Visual Stream](chung26b_interspeech.md) — shared technique · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
