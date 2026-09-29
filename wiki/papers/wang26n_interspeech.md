---
id: wang26n_interspeech
category: speech-coding
institutions: ["University of Southern California"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-811
pdf: https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.pdf
---

# Towards Interpretable Framework for Neural Audio Codecs via Sparse Autoencoders: A Case Study on Accent Information

*Shih-Heng Wang, Tiantian Feng, Aditya Kommineni, Thanathai Lertpetchpun, Bowen Yi, Xuan Shi, Shrikanth Narayanan*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-811)

**Category:** `speech-coding`

**TL;DR** — This paper introduces a Sparse Autoencoder (SAE) framework to quantify and compare the task-level interpretability of Neural Audio Codecs (NACs) using accent classification as a case study. The results reveal that acoustic-oriented codecs (like DAC) encode accent via activation magnitudes, whereas phonetic-oriented codecs (like SpeechTokenizer) rely on activation positions.

## Key contributions

- Proposed an interpretable framework leveraging TopK Sparse Autoencoders (SAEs) to decompose dense neural audio codec representations into monosemantic sparse activations.
- Introduced a relative performance index (delta-F1) measured against raw NAC reference classifiers to fairly compare interpretability across different model architectures and latent dimensions.
- Designed a position-versus-magnitude feature decomposition strategy to isolate how accent information is structurally encoded within sparse latent dimensions.
- Demonstrated that lower-bitrate codecs (e.g., EnCodec 1.5 kbps) achieve higher task-level interpretability compared to higher-bitrate counterparts.

## Problem

While neural audio codecs (NACs) such as EnCodec, DAC, Mimi, and SpeechTokenizer have become foundational for speech foundation models and generative systems, their internal representations remain largely uninterpretable "black boxes." This lack of transparency restricts their safe deployment in sensitive domains like healthcare and assistive technologies where algorithmic accountability is mandatory. Prior interpretability work focused heavily on text language models or raw ASR encoders, leaving how discrete speech tokens capture entangled linguistic and paralinguistic attributes—specifically challenging speaker traits like accent—unexplored.

## Method

The framework first extracts utterance-level continuous representations u from audio waveforms by applying mean pooling over time on the decoder input/encoder output of a given Neural Audio Codec (NAC). To dissect these representations, a TopK Sparse Autoencoder (SAE) is trained to map u into a higher-dimensional sparse latent space z using a linear encoder and decoder without bias terms, optimized via Mean Squared Error (MSE) reconstruction loss. Sparsity is strictly enforced by retaining only the top-k largest non-zero activations based on a relative sparsity parameter s.

To understand the geometric organization of accent information, the sparse representation z is decoupled into two complementary components: a position feature z_pos (binary indicator of active latent indices) and a magnitude feature z_mag (descending-sorted active scalar values). Logistic regression (LR) classifiers are subsequently trained on z, z_pos, and z_mag for binary accent classification tasks (US vs. UK, and US vs. Non-US-UK). Task-level interpretability is quantified using delta-F1, measuring the performance delta between classifiers trained on sparse representations versus the raw baseline NAC representation u.

Hyperparameters span 16 configurations formed by varying the latent ratio q in {2, 5, 10, 20} (scaling latent dimension z relative to codec dimension d_codec) and relative sparsity s in {0.5, 0.25, 0.1, 0.05}. Models are trained using the Adam optimizer (lr=1e-5, batch size 1024) for 200 to 500 epochs depending on convergence rates, with LR models trained using the SAGA solver and L1 regularization.

## Experimental setup

Experiments use the Vox-Profile benchmark, aggregating 11 open-source datasets with self-reported English accents across more than 16 regional dialects. Two binary classification settings are established: US vs. UK (US=69.90% of test set) and US vs. Non-US-UK (US=63.98% of test set), utilizing predefined speaker-disjoint splits. Four NAC models are evaluated: EnCodec (24 kHz, 1.5/6/12 kbps, d_codec=128), DAC (24 kHz, d_codec=1024), SpeechTokenizer (16 kHz, d_codec=1024), and Mimi (24 kHz, d_codec=512). Baselines comprise raw NAC utterance representations u evaluated via logistic regression macro-F1 scores.

## Results

In the US vs. UK setting, DAC achieves the highest overall interpretability, ranking first in 13 out of 16 SAE configurations, closely followed by SpeechTokenizer. In the US vs. Non-US-UK setting, SpeechTokenizer dominates, taking first place in 14 of 16 configurations. Across all models, high sparsity (s=5%) incurs the steepest performance drop (delta-F1), which approaches zero as sparsity decreases (s >= 25%).

Ablations decoupling position versus magnitude reveal a strict architectural dichotomy: acoustic-oriented NACs (EnCodec, DAC) retain better accent classification performance using magnitude-only features (e.g., DAC delta-F1 of -3.32% vs position -10.93% at q=20), whereas phonetic-oriented NACs (SpeechTokenizer, Mimi) rely primarily on activation positions (e.g., SpeechTokenizer position delta-F1 of -7.20% vs magnitude -27.03%). Furthermore, bitrate analysis on EnCodec shows that lower-bitrate variants achieve significantly higher interpretability (1.5 kbps delta-F1 > -10%) compared to 6 kbps and 12 kbps models, likely due to fewer entangled codebooks.

| System / Condition | US vs. UK Reference F1 (%) | US vs. Non-US-UK Reference F1 (%) |
|---|---|---|
| EnCodec (1.5 kbps) | 81.11 | 57.19 |
| EnCodec (6.0 kbps) | 80.20 | 60.93 |
| EnCodec (12.0 kbps) | 80.17 | 61.98 |
| DAC | 79.74 | 61.33 |
| Mimi | 88.79 | 75.70 |
| SpeechTokenizer | 92.44 | 75.98 |

## Limitations

The framework evaluates task-level interpretability on utterance-level representations, omitting fine-grained frame-level dynamics and localized phonetic variations. Absolute sparse capacity constraints may disadvantage lower-dimensional codecs like EnCodec. The study is restricted to English accents and binary classification tasks, leaving multilingual transferability and non-accent paralinguistic traits like emotion or speaker identity unexplored.

## Why read this

Speech and ML researchers investigating foundation model interpretability should read this paper to learn how to apply Sparse Autoencoders to discrete audio tokens. It provides a blueprint for dissecting how acoustic versus phonetic-oriented codecs structure paralinguistic information in latent space.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Auditing and improving neural audio codec representations for trustworthy speech generation, voice cloning, and healthcare assistive technologies where model transparency is legally or ethically required.

## Institutions / 機構

University of Southern California

**Funding / 經費:** Office of the Director of National Intelligence, Intelligence Advanced Research Projects Activity, ARTS Program

## Related

- (link related pages by id as the wiki grows)
