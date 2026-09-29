---
id: niu26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-533
pdf: https://www.isca-archive.org/interspeech_2026/niu26_interspeech.pdf
---

# Semantic-VAE: Semantic-Alignment Latent Representation for Better Speech Synthesis

*Zhikang Niu, Shujie Hu, Jeongsoo Choi, Yushen Chen, Peining Chen, Pengcheng Zhu, Yunting Yang, Bowen Zhang, Jian Zhao, Chunhui Wang, Xie Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/niu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/niu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-533)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — Semantic-VAE introduces semantic alignment regularization to VAE latent spaces for non-autoregressive speech synthesis, resolving the reconstruction-generation dilemma and achieving a state-of-the-art 2.10% WER on LibriSpeech-PC.

## Key contributions

- Identifies and analyzes the optimization dilemma in high-dimensional speech VAE latents: higher dimensions improve reconstruction/similarity but hurt intelligibility, while lower dimensions do the reverse.
- Proposes Semantic-VAE, incorporating semantic alignment regularization using frozen pre-trained self-supervised learning (SSL) speech models into the VAE training framework.
- Utilizes a negative cosine similarity loss for latent-to-SSL alignment via an interpolation and 1D convolution layer, avoiding the over-constraining absolute numerical penalties of L1 or MSE.
- Demonstrates consistent downstream improvements when integrated into non-autoregressive TTS models like F5-TTS and E2 TTS, alongside faster training convergence and robust cross-lingual transfer.
- Performs thorough ablations identifying specific optimal SSL guidance configurations, such as using the 23rd layer of WavLM rather than the final layer to prevent the loss of speaker cues.

## Problem

Prior non-autoregressive zero-shot TTS models rely either on redundant, phase-lacking mel-spectrograms or unconstrained VAE latent spaces. Vanilla VAE representations suffer from a fundamental optimization trade-off: lower-dimensional latents capture semantic content but fail to preserve acoustic/speaker detail, whereas higher-dimensional latents retain rich acoustic information but introduce redundancy and severely complicate downstream semantic modeling in diffusion transformers. Existing approaches fail to provide a clean latent space that satisfies both high reconstruction fidelity and straightforward generative modeling.

## Method

Semantic-VAE builds on a variational autoencoder architecture where the 16 kHz input speech is downsampled via a convolutional encoder with factors [4, 4, 5, 5] to produce a 64-dimensional latent representation at a frame rate of 40 Hz. The decoder is replaced with an AMP Block-based decoder that upsamples the latent with factors [5, 5, 2, 2, 2, 2] to reconstruct waveforms. The model is trained using a multi-scale frequency domain reconstruction loss (L1 on mel-spectrograms), a KL divergence term weighted by lambda_KL = 0.01, and an adversarial objective using a multi-period discriminator and a multi-band multi-scale STFT discriminator with HingeGAN and L1 feature-matching loss.

To bridge the reconstruction-generation gap, a semantic regularization loss aligns the VAE latent space with features extracted from a frozen pre-trained SSL model (such as WavLM). The hidden states of the SSL model are projected to match temporal and feature dimensions using an interpolation layer followed by a 1D convolution layer. The core semantic constraint uses a negative cosine similarity loss computed across sequence timesteps between the aligned VAE latent and the SSL features. The total objective integrates this alignment loss with lambda_Align = 1, lambda_adv = 1, lambda_feat = 2, and lambda_recon = 15.

Semantic-VAE is trained for 600k iterations with a global batch size of 64 using the Adam optimizer (learning rate 1e-4, exponential decay gamma = 0.9996) on 3-second audio segments. Downstream TTS integration replaces mel-spectrograms with these semantic-aligned latents inside F5-TTS, trained using AdamW with a learning rate of 7.5e-5, and sampled at inference using sway sampling and an Euler ODE solver.

## Experimental setup

Semantic-VAE was trained on 6,000 hours of audio combining LibriTTS and the small/medium subsets of Libriheavy. Downstream low-resource TTS models were trained on LibriTTS (0.6k hours) and evaluated on the LibriSpeech-PC test-clean dataset using Word Error Rate (WER), Speaker Similarity (SIM-o), and UTMOS. Reconstruction performance was evaluated on LibriTTS test-other using PESQ, STOI, and UTMOS. High-resource scaling experiments utilized 100k hours of Emilia under a 400k-update budget, compared against baselines including F5-TTS, E2 TTS, USLM, CosyVoice, and FireRedTTS.

## Results

In the low-resource LibriSpeech-PC setting, F5-TTS integrated with Semantic-VAE achieves a 2.10% WER, 0.64 speaker similarity, and 4.17 MOS, outperforming both the vanilla F5-TTS mel baseline (2.23% WER, 0.60 SIM, 3.99 MOS) and the vanilla VAE variant (2.65% WER, 0.60 SIM, 4.13 MOS). In reconstruction tasks on LibriTTS test-other, Semantic-VAE maintains competitive quality (3.74 PESQ, 0.96 STOI, 3.56 UTMOS) matching vanilla VAE (3.75 PESQ) while drastically outperforming Vocos on mel-spectrograms (3.57 PESQ). Ablations show that negative cosine similarity drastically outperforms L1 or MSE alignment losses (which yield 4.37% and 3.12% WER respectively), and that using the 23rd layer of WavLM yields an optimal balance, whereas final-layer SSL features drastically degrade speaker similarity due to task-specific distribution shifts.

| System | WER (%) ↓ | SIM ↑ | MOS / UTMOS ↑ |
|---|---|---|---|
| F5-TTS (Mel Baseline) | 2.23 | 0.60 | 3.99 |
| F5-TTS + Vanilla VAE | 2.65 | 0.60 | 4.13 |
| F5-TTS + Semantic-VAE (Ours) | 2.10 | 0.64 | 4.17 |
| E2 TTS | 3.51 | 0.61 | 3.68 |
| E2 TTS + Semantic-VAE (Ours) | 2.41 | 0.62 | 3.88 |

## Limitations

The current exploration is primarily validated on English corpora for its core low-resource setups, and while cross-lingual generalization to Chinese is observed during large-scale Emilia training, explicit multi-lingual ablation is limited. The approach depends heavily on the quality and layer choice of the pre-trained SSL backbone, requiring careful tuning to balance acoustic feature retention versus semantic abstraction. Furthermore, scaling introduces significant compute overhead during the joint VAE-SSL alignment phase prior to downstream diffusion training.

## Why read this

Speech researchers and engineers working on non-autoregressive TTS or latent diffusion models should read this to understand how to bypass the VAE reconstruction-generation dilemma using explicit SSL semantic alignment. It provides concrete recipes for hyperparameters, architectural modifications, and SSL layer selections that accelerate convergence and boost speaker similarity.

## Code

- https://zhikangniu.github.io/semantic-vae/

## Applications

Zero-shot text-to-speech, personalized voice cloning, and high-efficiency on-device speech synthesis systems.

## Institutions / 機構

Shanghai Jiao Tong University, Shanghai Innovation Institute, Chinese University of Hong Kong, KAIST, Geely

**Funding / 經費:** National Natural Science Foundation of China, Shanghai Municipal Science and Technology Major Project, Yangtze River Delta Science and Technology Innovation Community Joint Research Project

## Related

- (link related pages by id as the wiki grows)
