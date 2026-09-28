---
id: tseng26c_interspeech
category: voice-conversion
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2763
pdf: https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.pdf
---

# VOSSA: Voiceprint Optimization for Streaming Speech Architectures

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2763)

**TL;DR** — VOSSA is a streaming voice conversion framework that eliminates the need for a separate speaker encoder by extracting speaker identity directly from intermediate layers of the content encoder, achieving improved target-speaker similarity and prosody while reducing parameter count by 19%.

## Problem

Real-time streaming voice conversion typically relies on frozen automatic speaker verification (ASV) embeddings, which are optimized to suppress intra-speaker phonetic and prosodic variations. This creates a representational mismatch against frame-level acoustic generation needs like formant structures, while alternative joint-training approaches introduce added model complexity and memory overhead from separate speaker encoder branches.

## Method

Built on the TVTSyn streaming backbone, VOSSA extracts features from the last CNN layer and alternating layers of the 8-layer content encoder's multi-head self-attention stack. These representations are aggregated via attentive statistics pooling (ASP) and a two-layer projection network to yield a global speaker embedding without an external encoder. The model is trained using a dual-path protocol combining self-reconstruction and cross-speaker voice conversion, optimized via L1 reconstruction, adversarial and feature-matching losses, a cosine distance speaker consistency loss, and a symmetric NT-Xent (InfoNCE) contrastive loss.

## Results

Evaluated across LibriTTS, VoxCeleb, EMIME, ARCTIC, L2-ARCTIC, and VCTK datasets, VOSSA achieves a NISQA-MOS of 3.79, word error rate (WER) of 0.17, and a normalized target speaker similarity (Sim_{syn}^{trg}) of 0.54, outperforming or matching baseline models like TVTSyn, DarkStream, GenVC-s, and slt24. It reduces Wasserstein distance for F1 vowel height distributions (e.g., 28.9 for high vowels compared to TVTSyn's 42.3) and achieves lower pitch MAE (31.4) and higher Pearson's correlation coefficient (0.40) for F0 dynamics. Perceptual tests show VOSSA preferred in human listening evaluations for speaker similarity (54% vs 46%), intelligibility (56% vs 44%), and vibrancy (52% vs 48%), while reducing total model parameters from 162.8M to 132.4M.

## Code

- https://morris88826.github.io/VOSSA/

## Applications

Speech engineers and developers building real-time, low-latency applications such as VoIP communication, live voice anonymization, and streaming voice conversion.

## Related

- (link related pages by id as the wiki grows)
