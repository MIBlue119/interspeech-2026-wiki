---
id: chen26j_interspeech
category: tts
labels: [efficient-on-device, generative-model]
institutions: ["Xi'an Jiaotong University", "Chinese Academy of Sciences"]
code: https://github.com/pymaster17/Spiking-Vocos
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1086
pdf: https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.pdf
---

# Spiking Vocos: An Energy-Efficient Neural Vocoder

*Yukun Chen, Zhaoxi Mu, Andong Li, Peilin Li, Xingyu Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1086)

**Category:** `tts` · **Labels:** `efficient-on-device`, `generative-model`

**TL;DR** — Spiking Vocos adapts the non-autoregressive frequency-domain Vocos architecture into a Spiking Neural Network (SNN) using Parametric Leaky Integrate-and-Fire (PLIF) neurons, a Temporal Shift Module, and self-architectural distillation. It matches the perceptual quality of its ANN counterpart (UTMOS 3.74 vs 3.82) while consuming only 14.7% of its energy.

## Key contributions

- Proposes the first SNN-based frequency-domain vocoder using an efficient Spiking ConvNeXt block to drastically cut MAC operations.
- Introduces an amplitude shortcut path inside the spiking block to mitigate the information bottleneck caused by binary spike saturation.
- Designs a vocoding-specific self-architectural knowledge distillation framework combining L1 log-magnitude loss and anti-wrapping phase losses.
- Validates the integration of a lightweight Temporal Shift Module (TSM) to overcome the causal partial-time dependency of SNNs in audio generation.

## Problem

Neural vocoders face a trade-off between synthesis quality and computational/power efficiency, with time-domain models requiring heavy upsample layers and frequency-domain ANNs failing to leverage event-driven hardware. Directly replacing ANNs with SNNs introduces severe performance drops due to information bottlenecks from binary all-or-none spike activations, temporal modeling constraints, and training instability. Overcoming this is crucial for deploying high-fidelity audio synthesis onto extreme low-power, resource-constrained edge devices.

## Method

Spiking Vocos builds on the non-autoregressive Vocos frequency-domain template by replacing standard ConvNeXt layers with Spiking ConvNeXt blocks. To maximize hardware efficiency, Parametric Leaky Integrate-and-Fire (PLIF) neurons—featuring learnable time constants tau—are placed directly before the computationally heavy pointwise convolutions, transforming continuous MAC operations into sparse event-driven AC operations. Because binary spike firing discards crucial amplitude dynamics, an amplitude shortcut path re-injects unquantized amplitude information back into the stream.

To bridge the ANN-SNN performance gap, a self-architectural distillation framework is employed using the pretrained Vocos ANN as a teacher. Layer-wise intermediate features are aligned via linear adapters using Mean Squared Error (MSE). For final spectral outputs, magnitude is supervised via L1 log-magnitude loss, while phase is constrained using a combination of instantaneous phase loss, group delay loss, and phase time difference loss mapped through an anti-wrapping function. Additionally, a Temporal Shift Module (TSM) splits channels into three groups shifted by -1, 0, and +1 timesteps with a residual weight alpha = 0.5 to fuse past and future context without heavy compute, where intermediate distillation points are shifted to subsequent blocks to prevent misalignment.

## Experimental setup

The model is trained on the complete LibriTTS training set (24 kHz audio compressed into 100-dim mel-spectrograms with nfft=1024, nhop=256) for 1 million generator and discriminator steps using AdamW (beta1=0.9, beta2=0.999). Evaluation is performed on the test-clean subset of LibriTTS using UTMOS, PESQ, ViSQOL, V/UV F1 score, periodicity error, and MOS/SMOS listening tests, compared against an ANN Vocos baseline, HiFiGAN, and ground truth.

## Results

The baseline ANN Vocos achieves a UTMOS of 3.82 and PESQ of 3.65. A vanilla 4-step Spiking Vocos drops severely to a UTMOS of 3.46 and PESQ of 3.31, while an 8-step version closes the gap but doubles latency. Introducing the Temporal Shift Module to the 4-step model lifts UTMOS to 3.71, and adding self-architectural distillation reaches 3.70 UTMOS. Combining both TSM and distillation achieves the best 4-step Spiking Vocos performance with a UTMOS of 3.74, PESQ of 3.45, ViSQOL of 4.65, V/UV F1 of 0.9558, and periodicity error of 0.116. Theoretically, this model operates at a firing rate of 17.6% and consumes 8.5 mJ (14.7% of the 58.0 mJ baseline energy), though a residual PESQ gap remains due to binary spike quantization.

| System | UTMOS ($\uparrow$) | PESQ ($\uparrow$) | ViSQOL ($\uparrow$) | V/UV F1 ($\uparrow$) | Energy (mJ) |
|---|---|---|---|---|---|
| Vocos (ANN Baseline) | 3.82 | 3.65 | 4.67 | 0.9600 | 58.0 |
| Spiking Vocos (8-step) | 3.80 | 3.49 | 4.66 | 0.9566 | 14.4 |
| Spiking Vocos (4-step) | 3.46 | 3.31 | 4.63 | 0.9522 | 6.4 |
| + TSM | 3.71 | 3.36 | 4.65 | 0.9539 | 6.9 |
| + Distillation | 3.70 | 3.43 | 4.65 | 0.9559 | 8.7 |
| + TSM & Distillation | 3.74 | 3.45 | 4.65 | 0.9558 | 8.5 |

## Limitations

The evaluation is restricted to clean English speech datasets (LibriTTS), leaving multi-lingual robustness and noisy condition handling untested. The model still shows a persistent deficit in signal-level metrics like PESQ compared to its floating-point ANN counterpart due to spike quantization errors. Furthermore, actual energy savings are theoretical estimates based on standard 45nm technology assumptions rather than raw measurements on neuromorphic hardware.

## Why read this

Speech and ML engineers looking to deploy high-fidelity generative audio models onto neuromorphic hardware or extreme low-power edge platforms should read this paper to learn how to combine surrogate-gradient SNNs, temporal shifting, and structural knowledge distillation.

## Code

- https://github.com/pymaster17/Spiking-Vocos

## Applications

On-device speech synthesis, low-resource audio generation, and energy-efficient real-time voice conversion or speech enhancement.

## Institutions / 機構

Xi'an Jiaotong University, Chinese Academy of Sciences

## Related

- [EffVOC: Low-Delay Efficient Speech Waveform Reconstruction from Spectral Representations Without Phase](shi26f_interspeech.md) — same problem · relatedness 2.8/3
- [SCNet: Enhancing GAN-based Speech Generation with Subband Condition Network and Magnitude-aware Phase Loss](xu26e_interspeech.md) — same problem · relatedness 2.3/3
- [One-Step Token-to-Waveform Generation with MeanFlow in Latent Space](dai26c_interspeech.md) — same problem · relatedness 2.3/3
- [RAF: Relativistic Adversarial Feedback For Universal Speech Synthesis](lee26e_interspeech.md) — same problem · relatedness 2.1/3
- [LavaSR: Fast and Flexible Audio Bandwidth Extension via Vocos](sharma26c_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
