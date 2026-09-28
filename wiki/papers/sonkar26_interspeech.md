---
id: sonkar26_interspeech
category: speech-synthesis
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3023
pdf: https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.pdf
---

# Tongue2Speech: Real-Time Speech Synthesis from Tongue Ultrasound Videos via Spatiotemporal Transformers

*Yash Sonkar, Yasaswi Kilaru, Sudheera Yelimeli, Neil Shah, Vineet Gandhi*

[PDF](https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sonkar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3023)

**TL;DR** — Tongue2Speech is a lightweight non-autoregressive framework that maps tongue ultrasound video directly to mel-spectrograms using 3D spatio-temporal convolutions and a Transformer encoder. It achieves a state-of-the-art 15.93% WER in single-speaker settings and 31.64% WER in multi-speaker settings on the TaL corpus.

## Key contributions

- Proposes a lightweight non-autoregressive U2S architecture with 19.17M total parameters (6.25M excluding vocoder) combining a 3D CNN front-end and a Transformer encoder.
- Demonstrates that 3D spatial-temporal encoding with self-attention drastically outperforms legacy recurrent or purely convolutional architectures for modeling articulatory coarticulation.
- Comprehensively evaluates on the TaL corpus across single-speaker and multi-speaker settings, proving that ASR-based WER correlates with intelligibility better than spectral MSE.
- Shows that zero-shot multi-speaker generalization remains difficult, but fine-tuning on limited speaker-specific data successfully restores intelligibility for unseen users.

## Problem

Silent speech interfaces (SSIs) are vital for individuals with lost phonation caused by laryngectomy or neurological disorders, but prior methods rely on invasive intraoral sensors (EMA), expensive high-cost real-time MRI, or indirect muscle recordings (sEMG). Ultrasound tongue imaging (UTI) directly captures dynamic tongue surface geometry with portable hardware, yet prior UTI-to-speech models rely on convolutional-recurrent (LSTM) backbones that struggle with long-range coarticulation. Furthermore, prior literature depends heavily on weak spectral distortion metrics like MSE and MCD which do not track lexical intelligibility, and lacks large-scale multi-speaker and word error rate evaluations.

## Method

Tongue2Speech takes raw ultrasound scanline frames in polar coordinates (64 scanlines × 842 radial samples) and converts them to a Cartesian wedge representation of size 64 × 64 pixels per frame using GPU-accelerated bilinear grid sampling. The wedge sequences pass through four stacked 3D convolutional blocks (Conv3D + BatchNorm + ReLU) that jointly operate across spatial and short-term temporal dimensions, followed by adaptive average pooling along spatial dimensions to yield per-frame 256-dimensional latents. 

This latent sequence is fed into a 6-layer encoder-only Transformer with 8 attention heads per layer, a 1024 feed-forward hidden dimension, GELU activations, and sinusoidal positional encodings. The resulting hidden states are projected via a 2-layer MLP to 80-dimensional mel-spectrograms, trained using L1 loss. A HiFi-GAN neural vocoder then synthesizes the final waveform audio from the predicted mel-spectrograms.

## Experimental setup

Evaluated on the TaL corpus (TaL1 single-speaker across 5 sessions, and TaL80 multi-speaker across 81 speakers yielding ~24 hours of synchronized data). Compared against 6 baselines: Conformer-U2S, STN-CNN, 3D-CNN, 3D-CNN+BiLSTM, 3D-CNN+BiLSTM w/ Skip, and 2D-CNN+BiLSTM. Evaluated via OpenAI Whisper Medium ASR Word Error Rate (WER) and log-mel MSE. Multi-speaker personalization uses 1500 epochs of pre-training on 77 speakers, followed by 20 epochs of fine-tuning on 95% of data for held-out speakers.

## Results

Tongue2Speech achieves an overall single-speaker WER of 15.93% and MSE of 0.594 on TaL1, outperforming the strongest baseline (3D-CNN+BiLSTM w/ Skip at 24.15% WER, 0.793 MSE) by over 8 absolute WER points. Re-implemented Conformer-U2S and STN-CNN collapse on this task with near-saturated WERs near ~99% and high MSEs (1.8-1.9). In the multi-speaker TaL80 evaluation, Tongue2Speech achieves 31.64% WER versus 42.46% for standard 3D-CNN+BiLSTM and 33.23% for the skip variant. Speaker-specific fine-tuning on unseen held-out speakers successfully drops WER down to 27.62% for Speaker 80, demonstrating effective personalization.

| System | TaL1 WER (%) | TaL1 MSE | TaL80 WER (%) | TaL80 MSE |
|---|---|---|---|---|
| Conformer-U2S | 99.26 | 1.819 | - | - |
| STN-CNN | 99.08 | 1.877 | - | - |
| 2D-CNN + BiLSTM | 60.29 | 1.417 | - | - |
| 3D-CNN + BiLSTM | 36.46 | 0.906 | 42.46 | 0.981 |
| 3D-CNN + BiLSTM w/ Skip | 24.15 | 0.793 | 33.23 | 0.863 |
| Tongue2Speech (Ours) | 15.93 | 0.594 | 31.64 | 0.851 |

## Limitations

Zero-shot cross-speaker generalization remains difficult due to anatomical variability and probe placement differences, requiring speaker-specific fine-tuning. Evaluation is constrained to English speakers from the TaL corpus, leaving multilingual scalability unverified. Session-level variability (up to 9% WER fluctuations across days) demonstrates sensitivity to probe placement shifts.

## Why read this

Researchers and engineers building silent speech interfaces or articulatory-to-acoustic inversion models should read this paper to see how replacing recurrent networks with a lightweight 3D-CNN and Transformer backbone substantially boosts lexical intelligibility. It also provides a cautionary blueprint proving that spectral distortion metrics like MSE fail to indicate actual speech intelligibility.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Practical silent speech interfaces for individuals with voice impairments (e.g., laryngectomy patients) and auxiliary articulatory feature conditioning for speech recognition.

## Related

- (link related pages by id as the wiki grows)
