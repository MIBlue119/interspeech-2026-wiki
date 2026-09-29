---
id: zhu26b_interspeech
category: enhancement-separation
labels: [robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2148
pdf: https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.pdf
---

# G-MaP-SE: Guided Speech Enhancement via GMM-Based Prior Matching

*Yike Zhu, Ziqian Wang, Zikai Liu, Xingchen Li, Zhuangqi Chen, Xianjun Xia, Chuanzeng Huang, Lei Xie*

[PDF](https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2148)

**Category:** `enhancement-separation` · **Labels:** `robustness-noise`

**TL;DR** — G-MaP-SE is a guided speech enhancement framework that refines noise-corrupted speaker embeddings by matching them to a precomputed clean-speech Gaussian Mixture Model (GMM) prior, recovering performance close to oracle clean-conditioning under domain shift without needing enrollment audio.

## Key contributions

- Proposes a Gaussian Mixture Model (GMM)-based prior matching (MaP) module to project noisy, distorted speaker embeddings onto a stable clean-speech subspace.
- Introduces a lightweight gated fusion block that injects the refined prior embedding into intermediate time-frequency (TF) feature maps of an MP-SENet backbone.
- Achieves plug-and-play domain adaptation by swapping the precomputed GMM prior to match target-domain data distributions without retraining the enhancement network.
- Eliminates the requirement for clean user enrollment audio at inference time while outperforming direct noisy conditioning across in-domain and cross-domain benchmarks.

## Problem

Personalized speech enhancement (PSE) relies on auxiliary speaker embeddings from enrollment audio to guide interference suppression, but clean enrollment recordings are rarely available in real-world deployment. Alternatively, extracting conditioning embeddings directly from noisy input audio makes them fragile and easily distorted by environmental noise or domain shifts. Directly injecting these corrupted embeddings into enhancement backbones often degrades output quality rather than helping. This creates a need for an un-enrolled guidance mechanism that is robust to acoustic corruption and distribution shifts.

## Method

The G-MaP-SE pipeline processes a noisy waveform through two parallel paths: a base enhancement model and a frozen feature extractor. The feature extractor uses a pretrained ECAPA-DNN model to output a 192-dimensional noisy embedding, which is then L2-normalized onto the unit hypersphere. A matching module (MaP) computes cosine similarity scores between the normalized noisy embedding and precomputed clean GMM component means, yielding soft assignment weights governed by a temperature parameter tau.

The matched prior embedding is formed as a mixture-weighted combination of the GMM means. This refined embedding and the intermediate TF feature maps from the MP-SENet encoder are projected via Linear-ReLU blocks, broadcast to match spatial dimensions, concatenated, and passed through a learnable linear projection with a sigmoid activation to compute an element-wise gating mask. The gated embedding is combined with the feature map before feeding into the sequence modeling blocks of MP-SENet.

The GMM prior is constructed offline using the expectation-maximization (EM) algorithm with diagonal covariances on L2-normalized embeddings extracted from clean training utterances. The generator loss combines a PESQ-based GAN discriminator loss, STFT consistency loss, magnitude loss, complex-spectrum loss, phase loss, and time-domain loss with weights set to 0.05, 0.1, 0.9, 0.1, 0.3, and 0.2 respectively.

## Experimental setup

Evaluated on the VoiceBank+DEMAND (VBD) dataset for in-domain testing and the DNS Challenge 2020 (DNS2020) evaluation set without reverberation for cross-domain evaluation. Compared against MP-SENet, MP-SENet with oracle clean-speech conditioning, and MP-SENet with direct noisy conditioning. Metrics include wideband PESQ (WB-PESQ), narrow-band PESQ (NB-PESQ), STOI, segmental SNR (SSNR), scale-invariant SDR (SI-SDR, and composite MOS measures CSIG, CBAK, COVL. Implemented using an MP-SENet backbone with 64 channels, 4 TF blocks, and 4 attention heads (total 2.288M trainable parameters). Trained on VBD for 500k steps with batch size 4 using AdamW (lr=0.0005, beta1=0.8, beta2=0.99, weight decay=0.01) on a single 32GB NVIDIA V100 GPU. Key hyperparameters: tau=0.2, K=192 GMM components.

## Results

On the in-domain VBD test set, MP-SENet + G-MaP achieves a WB-PESQ of 3.59, CSIG of 4.80, CBAK of 4.00, COVL of 4.33, and STOI of 96.10%, performing on par with noisy conditioning (3.56 WB-PESQ) and closely matching oracle conditioning (3.58 WB-PESQ). On the cross-domain DNS2020 test set without reverberation, MP-SENet + G-MaP (P_VBD) achieves 2.794 WB-PESQ, 3.349 NB-PESQ, 96.065% STOI, and 16.454 dB SI-SDR, substantially outperforming standard MP-SENet (2.790 WB-PESQ, 16.277 dB SI-SDR) and noisy conditioning (2.765 WB-PESQ, 16.340 dB SI-SDR), nearly matching oracle conditioning (2.796 WB-PESQ, 16.455 dB SI-SDR). Swapping the prior to one trained directly on DNS2020 clean data yields further improvements (2.794 WB-PESQ, 3.350 NB-PESQ, 16.454 dB SI-SDR). Ablations show performance peaks at matching temperature tau=0.2 and K=192 GMM components, with performance more sensitive to temperature than the exact number of components.

| System | WB-PESQ | CSIG | CBAK | COVL | STOI (%) | SI-SDR (dB) |
|---|---|---|---|---|---|---|
| Noisy / Unprocessed | 1.97 | 3.49 | 2.55 | 2.74 | 92.11 | 9.23 |
| MP-SENet | 3.60 | 4.81 | 3.99 | 4.34 | 96.12 | 16.28 |
| MP-SENet + Noisy-Cond | 3.56 | 4.79 | 4.00 | 4.31 | 96.09 | 16.34 |
| MP-SENet + Oracle-Cond | 3.58 | 4.80 | 4.00 | 4.33 | 96.05 | 16.46 |
| MP-SENet + G-MaP (PVBD) | 3.59 | 4.80 | 4.00 | 4.33 | 96.10 | 16.45 |
| MP-SENet + G-MaP (PDNS) | 3.58 | 4.80 | 3.99 | 4.32 | 96.07 | 16.45 |

## Limitations

In-domain gains on VoiceBank+DEMAND are minimal because the small dataset size limits the diversity of clean embeddings available for robust prior construction. For certain utterances, the matching process can assign noisy embeddings to suboptimal prototypes, failing to recover the exact clean embedding. The evaluation is restricted to denoising without reverberation, leaving open how severe room acoustics affect embedding similarity matching.

## Why read this

Speech enhancement and ML researchers working on personalized or conditioned speech processing should read this to learn how to stabilize noisy conditioning embeddings via offline GMM prior matching without requiring user enrollment audio or retraining enhancement backbones.

## Code

- https://github.com/Hello3orld/G-MaP-SE

## Applications

Real-time communication systems, mobile speech enhancement apps, and hearing assistive devices operating in noisy environments where enrollment utterances from target users are unavailable.

## Institutions / 機構

Northwestern Polytechnical University

## Related

- (link related pages by id as the wiki grows)
