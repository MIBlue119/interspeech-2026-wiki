---
id: song26b_interspeech
category: paralinguistics-emotion
labels: [efficient-on-device]
institutions: ["Singapore Institute of Technology", "Duke Kunshan University", "NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-951
pdf: https://www.isca-archive.org/interspeech_2026/song26b_interspeech.pdf
---

# MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition

*Haoyu Song, Ian McLoughlin, Xiaoxiao Miao, Aik Beng Ng, Simon See, Timothy Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/song26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-951)

**Category:** `paralinguistics-emotion` · **Labels:** `efficient-on-device`

**TL;DR** — MSMC is a lightweight spectrogram-based Speech Emotion Recognition (SER) architecture that combines a leak-free masked convolution encoder with a mean teacher distillation framework, achieving 76.0% WA on IEMOCAP while using 14x fewer parameters than SSL baselines.

## Key contributions

- A Masked Convolution Encoder (MCE) featuring dynamically re-weighted convolutions to extract local micro-prosodic features without mask boundary information leakage.
- A multi-scale consistency distillation strategy that aligns intermediate local feature maps and global latent semantic vectors from a full-view teacher to a heavily masked student.
- Physical token dropping in the student transformer block to process only unmasked tokens (40% ratio), eliminating quadratic self-attention overhead.
- State-of-the-art efficiency among lightweight SER models, matching heavy SSL performance at 6.77M parameters and 0.9G MACs.

## Problem

Large Self-Supervised Learning (SSL) foundation models like HuBERT and WavLM achieve strong SER performance but incur prohibitive computational overhead (hundreds of millions of parameters, ~21.5G MACs) that prevents real-time edge deployment. Conversely, lightweight log-Mel spectrogram models using traditional CNNs lack the capacity to model long-range global emotional dependencies. Prior masking approaches in vision (MAE/AudioMAE) suffer from information leakage when applied directly via zero-padding, or rely on exorbitant transformer-based attention modules.

## Method

The framework utilizes a parallel dual-branch Mean Teacher architecture. The student branch processes a log-Mel spectrogram ($X \in \mathbb{R}^{F \times T}$) subjected to continuous 60% temporal masking ($X\tilde{} = X \odot M$), while the teacher branch processes the clean uncorrupted view. Both feed into a hierarchy of Masked Convolution Encoder (MCE) blocks, where convolutions are dynamically normalized based on binary mask validity ($M$) and receptive field areas to prevent feature leakage. Conditional Positional Encoding (CPE) is added to preserve temporal topology.

Following the MCE blocks, features pass through a lightweight Transformer block where the student employs physical token dropping to discard masked regions, reducing computation. The framework is optimized via a decoupled strategy: the student is updated using a 1:1 weighted sum of a multi-scale reconstruction loss ($L_{rec}$, normalized MSE on intermediate dense MCE feature maps against teacher maps) and a global latent distillation loss ($L_{glob}$, cosine distance on multi-head attention pooled vectors $\mathbf{z}_{stu}$ and $\mathbf{z}_{tea}$). The teacher network is updated via an Exponential Moving Average (EMA) of the student weights with momentum $\tau = 0.99$, and its unmasked outputs are supervised solely via cross-entropy loss ($L_{CE}$) for emotion classification.

At inference time, the teacher backbone, EMA updates, and masking mechanisms are completely discarded. Only the lightweight student network processes the full unmasked log-Mel spectrogram followed by the classification head, ensuring ultra-fast execution suitable for edge hardware.

## Experimental setup

Evaluated on the improvised subset of the IEMOCAP dataset (10 unique speakers, 5 sessions, 4 emotion categories: angry, happy, neutral, sad; 2,280 total utterances). Evaluated using a strict 10-fold Leave-One-Speaker-Out (LOSO) cross-validation protocol. Acoustic features are 128-band log-Mel spectrograms extracted from 16 kHz mono audio. Trained for 80 epochs from scratch using the AdamW optimizer with a differential learning rate ($10^{-4}$ for base encoder, $5 \times 10^{-4}$ for classification head) and cosine annealing. Compared against heavyweight SSL baselines (wav2vec 2.0-base, HuBERT-base, WavLM-base) and lightweight models (Speech-Swin, DistilHuBERT, ResNet-18, Light-SERNet). Metrics reported are Weighted Accuracy (WA) and Unweighted Accuracy (UA).

## Results

The full MSMC network achieves a Weighted Accuracy (WA) of 76.0% and Unweighted Accuracy (UA) of 68.8% on IEMOCAP under 10-fold LOSO cross-validation, closely matching the performance of heavy SSL models like WavLM-base (67.2% WA, 70.2% UA) while requiring 14x fewer parameters (6.77M vs 94.7M) and ~23x fewer MACs (0.9G vs 21.5G). Compared to lightweight competitors, MSMC outperforms Speech-Swin (75.2% WA, 65.5% UA) and standard ResNet-18 (58.5% WA, 59.2% UA).

In ablations, removing the teacher distillation framework (MSMC student only trained from scratch) drops WA to 69.1% and UA to 63.6%, demonstrating that the multi-scale consistency distillation contributes nearly 7% WA. A baseline CNN+Transformer configuration yields 66.5% WA, highlighting the specific value of the MCE blocks and CPE.

| System | Params | MACs | WA (%) | UA (%) |
|---|---|---|---|---|
| WavLM-base | 94.7M | 21.5G | 67.2 | 70.2 |
| Speech-Swin | 28.3M | 4.5G | 75.2 | 65.5 |
| ResNet-18 (re-impl.) | 11.2M | 1.8G | 58.5 | 59.2 |
| MSMC (Student only) | 6.77M | 0.9G | 69.1 | 63.6 |
| **MSMC (Full)** | **6.77M** | **0.9G** | **76.0** | **68.8** |

## Limitations

Evaluated exclusively on the IEMOCAP dataset, which contains acted/improvised English speech in a lab setting, leaving open-world robustness unproven. The study is restricted to a 4-class emotion taxonomy and a single language (English), lacking multilingual and zero-shot cross-corpus evaluations. The computational gains rely heavily on offline log-Mel feature extraction rather than raw end-to-end waveform processing.

## Why read this

Speech and ML engineers building real-time, resource-constrained SER systems will find MSMC's combination of leakage-free masked convolutions and mean-teacher distillation a practical blueprint for matching SSL accuracy without transformer bloat.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech emotion recognition in call center dialogue systems, educational applications, and resource-constrained edge devices.

## Institutions / 機構

Singapore Institute of Technology, Duke Kunshan University, NVIDIA

## Related

- (link related pages by id as the wiki grows)
