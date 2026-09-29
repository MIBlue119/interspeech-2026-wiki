---
id: rao26_interspeech
category: enhancement-separation
labels: [streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1608
pdf: https://www.isca-archive.org/interspeech_2026/rao26_interspeech.pdf
---

# A Causal Reference-Enhanced Keep-Speech Active Noise Control Method

*Li Rao, Xiaobin Rong, Yu Sun, Yiming He, Kai Chen, Haishan Zou, Jing Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/rao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1608)

**Category:** `enhancement-separation` · **Labels:** `streaming-real-time`

**TL;DR** — This paper introduces a causal, low-latency Reference-Enhanced Keep-Speech Active Noise Control (RSE-KSANC) framework that uses a neural network to suppress speech in the reference microphone signal, improving speech intelligibility and quality compared to conventional ANC.

## Key contributions

- Proposes a causal Reference Signal Enhancement (RSE) architecture combined with a conventional FIR control filter to maintain a strict causality margin for headphone ANC applications.
- Modifies the standard WaveNet architecture by replacing skip-connection 1x1 convolutions with causal convolutions and ReLU activations with tanh to better fit the RSE task.
- Formulates an error-domain joint objective loss function (Lenh) that evaluates both noise suppression and speech preservation using the optimal Wiener solution of the control filter.
- Demonstrates robust generalization across unseen speaker directions, noise trajectories, diverse real-world noise types (fan, engine, bearing, gearbox), and varying SNR conditions (-5 dB to 15 dB).

## Problem

Traditional active noise control (ANC) systems use reference microphones that capture both ambient noise and target speech. As a result, the generated anti-noise signal inadvertently suppresses speech at the user's ear alongside the noise, degrading communication quality. While prior keep-speech ANC (KSANC) methods like DeepANC use convolutional recurrent networks (CRNs) to directly replace the control filter, they introduce frame-level algorithmic latency that violates strict causality constraints required in real-time headphone applications.

## Method

The proposed system retains a traditional FIR control filter while deploying a modified time-domain WaveNet neural network to clean the reference signal. The neural network takes the original reference signal xv(n) and an estimate of the noisy speech at the error microphone d^v(n) (derived using a secondary path estimate s^) as inputs, outputting an enhanced reference signal x^(n) free of speech components. The core architecture comprises an initial causal convolution (kernel size 32, 128 channels) followed by four stacks of 12 layers (128 channels, kernel size 5). The output head uses three causal convolution layers with channel dimensions scaling from 128 down to 1.

Two training objectives are explored: an intermediate reference separation loss (Lrefsep) targeting noise extraction at the reference microphone, and a downstream error-domain loss (Lenh) that evaluates KSANC performance at the error microphone by incorporating the optimal Wiener solution of the FIR control filter. The model is trained for 100 epochs using the Adam optimizer with an initial learning rate of 5e-5, decayed by a factor of 0.9 every 10 epochs. The complete network contains approximately 9.53 million parameters and demands 38.12 G MACs per second of audio input.

The system utilizes measured headphone impulse responses at 8 kHz sampling rate with a truncated 128-tap secondary path. The RLS algorithm (forgetting factor 0.99999) adaptively updates the ANC control filter during operation.

## Experimental setup

Evaluated using measured headphone impulse responses (T60 ≈ 0.25 s) with speakers positioned at 0.6 m (speech) and 1.0 m (noise) across various azimuths. Training used 31 band-limited noise subbands and LibriTTS utterances across 200 speakers (sampled at SNRs of -5, 5, 15 dB); testing used disjoint frequency bands, 50 unseen speakers, and DCASE real-world noise recordings (fan, engine, bearing, gearbox) at SNRs from -5 to 15 dB. Baselines include Unprocessed, Ideal KSANC (using pure noise reference), Conventional ANC, and DeepANC. Metrics include STOI (%) and DNSMOS (OVRL).

## Results

RSE-based KSANC trained with Lenh achieves a superior STOI of 77.99% at -5 dB SNR (vs. 75.17% for Conventional ANC and 74.44% for DeepANC) and scales up to 94.64% at 15 dB SNR, closely tracking the Ideal KSANC upper bound (98.60%). Under real-world fan noise at -5 dB SNR, Lenh improves STOI to 67.58% compared to 59.99% (Unprocessed) and 63.90% (Conventional ANC). The error-domain objective (Lenh) significantly outperforms the reference-separation loss (Lrefsep), proving that direct alignment with downstream ANC error metrics is crucial for perceptual quality.

| Systems / Conditions (SNR = -5 dB) | STOI (%) | DNSMOS (OVRL) |
| :--- | :--- | :--- |
| Unprocessed | 76.71 | 1.60 |
| Ideal KSANC | 93.88 | 2.61 |
| Conventional ANC | 75.17 | 1.72 |
| DeepANC | 74.44 | 1.59 |
| RSE-based KSANC (Lrefsep) | 74.90 | 1.58 |
| RSE-based KSANC (Lenh) | 77.99 | 1.81 |

## Limitations

The model contains 9.53M parameters and requires high computational complexity (38.12 G MACs/sec), making direct deployment on resource-constrained, ultra-low-power hearable devices challenging without quantization or pruning. Evaluations were constrained to simulated directions and a fixed 8 kHz sampling rate, leaving wideband evaluation (e.g., 16-48 kHz) unverified. The framework assumes an unbiased secondary path estimate, which could degrade under dynamic headphone fit shifts in real-world scenarios.

## Why read this

Read this paper if you work on real-time audio enhancement or active noise control and want to learn how to inject deep neural networks into classical control loops without violating causality constraints.

## Code

- https://github.com/RaoLi666/RSE_KSANC.git

## Applications

ANC headphones, hear-through communication devices, and smart hearables operating in high-noise conversational environments.

## Institutions / 機構

Nanjing University, Nanjing Institute of Advanced Artificial Intelligence, Samsung Electronics

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
