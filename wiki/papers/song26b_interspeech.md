---
id: song26b_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-951
pdf: https://www.isca-archive.org/interspeech_2026/song26b_interspeech.pdf
---

# MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/song26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-951)

**TL;DR** — MSMC introduces a multi-scale masked convolution network for speech emotion recognition that matches heavy SSL performance while requiring significantly fewer computational resources, achieving 76.0% weighted accuracy on IEMOCAP.

## Problem

While large self-supervised learning foundation models excel at speech emotion recognition, their immense parameter counts and computational overhead render them impractical for real-time edge deployment. Conversely, lightweight spectrogram-based CNNs are efficient but lack the capacity to model long-range global dependencies and suffer from information leakage when processing masked spectral regions. This creates a trade-off between recognition accuracy and computational efficiency in interactive speech applications.

## Method

The architecture uses a parallel dual-branch mean teacher framework where a lightweight student processes heavily time-masked 128-band log-Mel spectrograms (60% mask ratio) and a teacher processes the clean unmasked view via exponential moving average updates. A leak-free Masked Convolution Encoder (MCE) dynamically renormalizes convolutions using partial convolution principles to extract local micro-prosodic features without boundary contamination. Conditional Positional Encoding and physical token dropping route only visible tokens into a lightweight Transformer block to eliminate quadratic attention overhead. The student is jointly optimized via multi-scale feature reconstruction loss and global cosine distillation loss, while a supervised cross-entropy loss is applied exclusively to the teacher's classification head.

## Results

Evaluated on the improvised subset of the IEMOCAP dataset using a 10-fold Leave-One-Speaker-Out (LOSO) cross-validation protocol across four emotion classes (angry, happy, neutral, sad). MSMC achieves 76.0% Weighted Accuracy (WA) and 68.8% Unweighted Accuracy (UA) with 6.77M parameters and 0.9G MACs. It outperforms lightweight baselines like ResNet-18 (58.5% WA) and matches heavyweight SSL models like WavLM-base (67.2% WA, 21.5G MACs) while requiring roughly 16x fewer parameters and 23x fewer MACs. Ablations confirm that combining MCE, conditional positional encoding, and the full multi-scale distillation teacher framework boosts vanilla CNN accuracy from 58.5% to 76.0% WA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech dialogue systems, call center monitoring, educational software, and on-device affective computing assistants.

## Related

- (link related pages by id as the wiki grows)
