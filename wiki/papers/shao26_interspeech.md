---
id: shao26_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2105
pdf: https://www.isca-archive.org/interspeech_2026/shao26_interspeech.pdf
---

# Phoneme-Aware Mamba Watermark: An Active Defense System Against Purified Speech Deepfakes

[PDF](https://www.isca-archive.org/interspeech_2026/shao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2105)

**TL;DR** — The paper introduces a phoneme-aware active watermarking defense system driven by a Mamba state space model to embed traceable identity bitstrings into speech, achieving near-perfect source tracing accuracy under strong diffusion-based purification attacks.

## Problem

Passive audio deepfake detectors struggle to generalize against novel synthesis models, while conventional active perturbation defenses are easily erased by advanced adversarial purification methods like PhonePuRe. This leaves a critical security gap where voice cloning can occur without leaving behind retrievable, verifiable source identification traces. A robust shadow-like defense paradigm is required to ensure that watermarks persist as intrinsic timbre features that survive both purification and voice cloning pipelines.

## Method

The framework utilizes a dual-branch encoder-decoder architecture where a frozen pretrained XLS-R 300M model extracts phonetic representations, and a dual-column bidirectional Mamba or multi-head Mamba (MH-Mamba) encoder generates spectral perturbations conditioned on speaker identity and phoneme guidance masks. The Montreal Forced Aligner (MFA) provides phoneme boundaries to construct a spectral stability mask targeting formants in the 100-1000 Hz band, ensuring watermark energy concentrates in stable acoustic regions. The system is trained jointly with an adversarial loop incorporating the PhonePuRe purification pipeline (RevDiffWave and spectral refiner) via a multi-objective loss function. Binary watermark messages are encoded using Hamming (6,3) error correction into a 36-bit sequence, repeatedly embedded across 1-second chunks, and decoded at inference using chunk-wise majority voting.

## Results

Evaluated on LibriSpeech train-clean-100 for training and 11 VCTK speakers for real-world threat simulations involving YourTTS and sv2TTS cloning pipelines. The Multi-Head Mamba (MH-Mamba) encoder achieves a watermark retention rate of 92.3% and a purified bit accuracy of 84.55% after PhonePuRe adversarial purification. In real-world voice cloning tracing tests over 165 cloned utterances, the system achieves a True Positive Rate (TPR) of approximately 99.9% to 100.0% with an ultra-low latency of roughly 1.0 to 1.1 seconds. High perceptual audio quality is maintained across all encoders, with PESQ scores above 3.5 and SNR values exceeding 35 dB.

## Code

- https://github.com/Silence-ai423/phoneme-aware-mamba-watermark

## Applications

Engineers and security architects building voice biometric systems, telecommunication platforms, or speech identity protection services to trace unauthorized voice cloning and deepfakes.

## Related

- (link related pages by id as the wiki grows)
