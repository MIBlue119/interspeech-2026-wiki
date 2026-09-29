---
id: hu26c_interspeech
category: asr
institutions: ["National Taiwan Normal University", "E.SUN Financial Holding Co., Ltd", "United Link Co., Ltd"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1130
pdf: https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.pdf
---

# Personalized Keyword Spotting for User-Defined Keywords Leveraging Text-Independent Speaker Verification

*Ming-Hsiang Hu, Kuan-Tang Huang, Chien-Chun Wang, Hung-Shin Lee, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hu26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1130)

**Category:** `asr`

**TL;DR** — ZP-KWS is a 1.55M-parameter framework for zero-shot personalized keyword spotting that uses a GE2E-pretrained speaker encoder and a phoneme-supervised audio encoder combined via multiplicative late fusion, reducing target-only FRR at 1% FAR by up to 60% relative to prior baselines.

## Key contributions

- Adopts an ultra-compact EfficientTDNN-Small (~0.9M parameters) optimized with GE2E loss to stabilize sub-second text-independent speaker verification embeddings, achieving a 62% relative EER reduction.
- Applies frame-level phoneme supervision via an auxiliary classification head and Forced Alignment (MFA) to strengthen phonetic structure in the trainable audio stream.
- Introduces a modular multiplicative late-fusion strategy that enforces a strict logical AND between semantic content and speaker identity, granting each branch independent veto power.
- Supports dynamic operating mode switching (conventional C-KWS, target-biased TB-KWS, and target-only TO-KWS) at inference time without requiring model retraining.

## Problem

Existing zero-shot user-defined keyword spotting (UD-KWS) systems learn text-invariant representations that discard speaker characteristics, leaving them vulnerable to impostor attacks (such as bystanders or playback audio uttering the correct keyword). Prior attempts to integrate speaker verification like PK-MTL rely on text-dependent assumptions, requiring both the KWS classifier and speaker enrollment to be retrained whenever the keyword changes, which breaks zero-shot flexibility. Furthermore, traditional text-independent speaker verification models (>10M parameters) suffer from severe discriminability drops on sub-second utterances and are too heavy for resource-constrained edge devices.

## Method

ZP-KWS decouples tasks into two functionally separated branches: a text-independent speaker verification branch and a phoneme-supervised keyword content branch. The speaker branch uses an EfficientTDNN-Small encoder (about 0.9M parameters) initialized on VoxCeleb2 and fine-tuned with GE2E loss on 460 hours of LibriPhrase; it extracts 192-dimensional embeddings that are mapped via a logistic function with fixed hyperparameters ($w_{spk}=10, b_{spk}=-5$) to a probability $p_{spk} \in [0, 1]$.

The audio encoder computes frame-level representations via two parallel streams: a frozen pre-trained embedder producing 96-dimensional features every 80ms (upsampled to 20ms via transposed convolution) and a trainable stream processing 40-dimensional log-Mel features through two Conv1D layers (128 and 256 channels, kernel size 5, batch norm, ReLU), a two-layer bidirectional GRU (128 hidden units/direction), and a 128-dimensional FC projection. These are combined via addition with LayerNorm on the trainable stream. The text encoder converts keywords to phonemes via G2P and projects them into semantic embeddings. A pattern extractor (single-head scaled dot-product self-attention with causal mask) processes concatenated audio and text sequences, while a pattern discriminator uses a single-layer GRU and FC layers to yield utterance-level match probability $p_{utt}$ and phoneme-level match sequence $p_{phon}$.

Training optimizes an unweighted multi-objective loss combining binary cross-entropy losses for utterance matching ($L_{utt}$), phoneme sequence matching ($L_{phon}$), and a label-smoothed cross-entropy frame-level alignment loss ($L_{align}$, with smoothing parameter $\epsilon=0.1$ using MFA targets on 42-dimensional auxiliary outputs) applied exclusively to the trainable audio stream. At inference, multiplicative late fusion combines semantic and speaker probabilities ($p_{final} = p_{utt} \cdot p_{spk}$), enforcing a strict AND condition. Optimization uses AdamW with a learning rate of $10^{-4}$ and a batch size of 2048 on a single NVIDIA RTX 5090 GPU.

## Experimental setup

Evaluated on LibriPhrase (Easy and Hard splits) as an in-domain benchmark, alongside Google Speech Commands (GSC) and Qualcomm Keyword Speech datasets for out-of-domain generalization across unseen keywords and speakers. Compared against PhonMatchNet and a modified PK-MTL baseline using PhonMatchNet's zero-shot keyword backbone. Metrics include Equal Error Rate (EER) and False Rejection Rate (FRR) at 1% and 10% False Alarm Rates (FAR) across C-KWS, TB-KWS, and TO-KWS modes. Built with a 1.55M total parameter budget (~0.65M KWS branch + ~0.90M speaker encoder).

## Results

In the stringent target-only (TO-KWS) mode at 1% FAR, ZP-KWS reduced FRR to 29.47% on LibriPhrase Easy and 33.12% on Qualcomm, achieving relative reductions of ~60% and ~41% over PK-MTL, and ~70% and ~64% over PhonMatchNet. On LibriPhrase Easy, ZP-KWS also attained the lowest C-KWS EER of 2.38% compared to PhonMatchNet's 3.34% and PK-MTL's 3.46%.

Ablations demonstrated that removing GE2E pre-training caused the catastrophic degradation of TO-KWS FRR@1% on LibriPhrase Easy from 29.47% to 73.42%, confirming its necessity for stabilizing short-utterance embeddings (reducing standalone speaker EER from 22.19% to 8.41%). Omitting score calibration caused TO-KWS EER to jump from 8.16% to 15.24% by failing to align raw cosine similarities with the probability space, while dropping auxiliary phoneme supervision increased C-KWS EER on Qualcomm from 6.88% to 10.81%.

| System/Condition | C-KWS EER (%) | TB-KWS EER (%) | TO-KWS FRR@1% (%) | TO-KWS EER (%) |
|---|---|---|---|---|
| PhonMatchNet (LibriPhrase Easy) | 3.34 | 3.36 | 97.00 | 25.16 |
| PK-MTL (LibriPhrase Easy) | 3.46 | 3.35 | 72.79 | 17.74 |
| ZP-KWS (LibriPhrase Easy) | **2.38** | **2.36** | **29.47** | **8.16** |
| ZP-KWS w/o GE2E Pre-training | 2.45 | 2.69 | 73.42 | 18.02 |
| ZP-KWS w/o Calibrated Linear Layer | 2.46 | 2.42 | 32.39 | 15.24 |
| ZP-KWS w/o Phoneme Supervision | 2.88 | 2.69 | 28.89 | 7.92 |

## Limitations

The framework assumes clean enrollment utterances per target user, and its performance depends on the quality of G2P conversion and forced alignment boundaries derived from MFA during training. While out-of-domain tests on Google Speech Commands and Qualcomm show robust generalization, performance under highly noisy, reverberant, or mismatched acoustic enrollment conditions is explicitly noted as a scope bound requiring future confidence calibration work.

## Why read this

Speech and ML engineers building on-device voice assistants should read this paper to learn how to inject biometric speaker gating into zero-shot user-defined keyword spotting without incurring massive model footprints or retraining overhead.

## Code

- https://github.com/Padawan101/ZP-KWS

## Applications

Secure, personalized edge voice user interfaces, wake-word detection systems, and always-on smart home or mobile device assistants resistant to playback attacks and impostors.

## Institutions / 機構

National Taiwan Normal University, E.SUN Financial Holding Co., Ltd, United Link Co., Ltd

**Funding / 經費:** Realtek Semiconductor Corporation

## Related

- (link related pages by id as the wiki grows)
