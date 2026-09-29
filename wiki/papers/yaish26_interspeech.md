---
id: yaish26_interspeech
category: enhancement-separation
labels: [robustness-noise]
institutions: ["Ben-Gurion University of the Negev", "Tel Aviv University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-222
pdf: https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.pdf
---

# Active Constructive Interference for Speech

*Ofir Yaish, Yehuda Mishaly, Eliya Nachmani*

[PDF](https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yaish26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-222)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — Active Speech Enhancement (ASE) unifies traditional speech enhancement and active noise control by using a loudspeaker to actively shape the physical acoustic environment, attenuating distortions while amplifying speech frequencies. The proposed Transformer-Mamba model (ASE-TM) achieves a PESQ of 2.98 on additive denoising, substantially outperforming traditional adapted ANC baselines.

## Key contributions

- Formalized Active Speech Enhancement (ASE) as a paradigm combining noise/distortion suppression and signal enrichment via loudspeaker-based acoustic modification.
- Proposed the ASE-TM architecture, which integrates dense encoders, Mamba2 time-frequency blocks, and a hybrid multi-head attention block (inspired by Jamba) to model long-range dependencies.
- Designed a multi-level joint suppression-enrichment loss function combining time-domain L1/L2, magnitude, complex spectrum, anti-wrapping phase losses, metric-based adversarial objectives, and STFT consistency loss.
- Demonstrated superior performance across three diverse acoustic tasks: denoising (VoiceBank-DEMAND), dereverberation, and signal declipping.

## Problem

Traditional speech enhancement operates passively on digital signals, while Active Noise Cancellation (ANC) suppresses predictable or narrowband noise without actively modifying speech content or handling severe nonlinear distortions. Classic adaptive algorithms (like FxLMS and its variants) and earlier neural network ANC approaches (such as DeepANC and ARN) falter in non-stationary noise environments and fail to address complex multi-objective degradation like reverberation and clipping. This gap matters because real-world acoustic interfaces require real-time physical modification of sound fields to maximize intelligibility rather than mere subtraction.

## Method

The ASE-TM model processes 16 kHz audio via STFT using a Hann window of 400 samples, a hop length of 100, and a 400-point FFT, stacking magnitude and phase components. A dense encoder outputs 128 channels with 100 feature dimensions, passing through 8 TFMamba blocks utilizing Mamba2 layers. Midway through the network (after 4 TFMamba blocks), a 2D convolution reduces dimensions to 64 channels of size 50 before applying a 10-head multi-head attention layer with positional encoding, followed by a transposed convolution expansion and a residual connection. The generator outputs the complex spectrum of the cancellation signal $y(n)$, which is modulated by a simulated loudspeaker non-linearity using a Scaled Error Function (SEF) with parameter $\lambda^2$ and propagated through a secondary path impulse response ($L_{RIR}=512$ taps) to form the anti-signal $a(n)$ in a simulated 3x4x2m room.

The training objective is a multi-level composite loss: a hybrid L1/L2 time-domain loss, magnitude spectrum L1/L2 loss, complex spectrum L2 loss (real and imaginary parts), anti-wrapping phase losses (instantaneous phase, group delay, and angular frequency), metric-based adversarial loss via a PESQ-predicting discriminator, and a consistency loss enforcing agreement between decoder-predicted spectra and re-applied STFT. Training uses the AdamW optimizer ($\beta_1=0.8$, $\beta_2=0.99$) with an initial learning rate of $5 \times 10^{-4}$, batch size of 4, and 2-second audio segments (32,000 samples) for 350 epochs. Room reverberation time $T_{60}$ is randomly sampled from $[0.15, 0.17, 0.2, 0.225, 0.25]$ seconds and $\lambda^2$ from $[0.1, 1, 10, \infty]$ per batch.

## Experimental setup

Evaluated on the VoiceBank-DEMAND dataset for denoising (28 training speakers, 10 noise types at 0-15 dB SNR; test set with 824 utterances from 2 unseen speakers and 5 unseen noises at 2.5-17.5 dB SNR), alongside synthesized datasets for dereverberation and declipping using VoiceFixer RIRs and clipping thresholds ($\eta \in [0.1, 0.5]$). Baselines compared include THF-FxLMS, DeepANC (ConvLSTM), and ARN (Attention-based Recurrent Network) adapted to the ASE task. Metrics include Wide-band PESQ, STOI, composite perceptual scores (CSIG, CBAK, COVL), and Normalized Mean Squared Error (NMSE). The generator contains 22.3M parameters.

## Results

On the denoising task ($T_{60}=0.25\text{s}, \lambda^2=\infty$), ASE-TM achieves a PESQ of 2.98, STOI of 0.99, and NMSE of -21.76 dB, significantly outperforming THF-FxLMS (PESQ 2.37, NMSE -15.32 dB), DeepANC (PESQ 1.48), and ARN (PESQ 2.45). In dereverberation, ASE-TM reaches a PESQ of 2.43 and STOI of 0.93 compared to the unprocessed reverberant baseline of 1.60 and ARN's 1.35. For declipping ($\eta=0.25$), ASE-TM scores 3.09 PESQ and -1.70 dB NMSE, surpassing the clipped unprocessed baseline (2.17 PESQ) and best baseline ARN (1.67 PESQ). Ablation studies confirm that integrating Mamba2 over Mamba1 with the modified loss yields the largest performance jump, while attention modules accelerate training convergence.

| System / Condition | PESQ $\uparrow$ (Denoising) | STOI $\uparrow$ (Denoising) | NMSE $\downarrow$ (Denoising) | PESQ $\uparrow$ (Dereverberation) | PESQ $\uparrow$ (Declipping) |
|---|---|---|---|---|---|
| Unprocessed | 1.97 | 0.92 | -8.44 | 1.60 | 2.17 |
| THF-FxLMS | 2.37 | 0.97 | -15.32 | 1.43 | 1.92 |
| DeepANC | 1.48 | 0.93 | -12.80 | 1.06 | 1.05 |
| ARN | 2.45 | 0.97 | -20.64 | 1.35 | 1.67 |
| **ASE-TM (Ours)** | **2.98** | **0.99** | **-21.76** | **2.43** | **3.09** |

## Limitations

Evaluations rely heavily on synthetic acoustic simulations of primary paths, secondary paths, and loudspeaker non-linearities in a fixed rectangular room geometry, lacking real-world hardware deployment validations. The scope is bounded to synthetic single-speaker conditions at 16 kHz sampling rate without exploring multi-speaker or noisy interactive acoustic feedback loops.

## Why read this

Researchers and audio engineers working on active acoustic modification, smart speakers, or advanced spatial audio hardware should read this to see how combining Transformer-Mamba architectures with multi-objective loss formulations can unify active noise control and speech restoration.

## Code

- https://github.com/ofiryaish/ASE-TM

## Applications

Smart speakers, active noise-canceling headphones, and real-time acoustic communication hardware operating in reverberant or distorted environments.

## Institutions / 機構

Ben-Gurion University of the Negev, Tel Aviv University

## Related

- (link related pages by id as the wiki grows)
