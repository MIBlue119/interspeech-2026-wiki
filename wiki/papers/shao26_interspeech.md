---
id: shao26_interspeech
category: deepfake-security
labels: [streaming-real-time]
institutions: ["Beijing University of Posts and Telecommunications", "Beijing Institute of Technology"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2105
pdf: https://www.isca-archive.org/interspeech_2026/shao26_interspeech.pdf
---

# Phoneme-Aware Mamba Watermark: An Active Defense System Against Purified Speech Deepfakes

*Yanda Shao, Mengke Zhang, Zhixin Lin, Tianyi Yang*

[PDF](https://www.isca-archive.org/interspeech_2026/shao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/shao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2105)

**Category:** `deepfake-security` · **Labels:** `streaming-real-time`

**TL;DR** — This paper proposes a phoneme-aware active speech watermarking defense using a Multi-Head Mamba (MH-Mamba) architecture to embed traceable identity bitstrings that survive state-of-the-art diffusion-based purification attacks. It achieves 99.9% source tracing accuracy on cloned speech with an ultra-low latency of roughly 1.1 seconds and high perceptual quality (35.67 dB SNR).

## Key contributions

- First application of the Mamba state space architecture and its dual-column bidirectional/multi-head variants to active audio watermarking, yielding linear O(T) computational complexity.
- A phoneme-guided embedding mechanism utilizing Montreal Forced Aligner (MFA) steady-state regions (100–1000 Hz) to protect watermarks against phone-conditioned diffusion purification attacks like PhonePuRe.
- An anti-purification adversarial training loop that incorporates differentiable PhonePuRe attacks during optimization, ensuring the watermark transfers robustly through modern zero-shot TTS and VC pipelines.

## Problem

Traditional passive audio deepfake detection (ADD) models like wav2vec 2.0, XLS-R, and Conformer fail to generalize against novel artifacts from emerging diffusion generators like DiffWave. Surface-level active defense perturbations (e.g., AntiFake, VoiceGuard) are fragile and can be completely wiped out by adversarial purification frameworks like PhonePuRe, which use wave-level diffusion denoising and spectral refinement. This vulnerability creates an urgent need for an intrinsic, shadow-like watermark defense paradigm that survives downstream voice cloning and purification while maintaining perceptual transparency.

## Method

The framework utilizes a unified encode-inject-decode design. A frozen pretrained XLS-R 300M model extracts phonetic representations H from raw speech x, while parallel STFT generates complex spectrogram S. A watermark encoder, conditioned on a speaker-identity code w_s, maps H to a spectral perturbation delta_spec. This perturbation is modulated by a phoneme stability mask M(f, t) derived from the Montreal Forced Aligner (MFA) to target steady-state formant regions within the 100-1000 Hz band (with stable bins <= 1.5, unstable bins >= 0.2), and then additively injected into S before iSTFT reconstruction.

The paper evaluates three encoder backbones: a baseline Bi-LSTM, a Dual-column Bidirectional Mamba, and a Multi-Head Mamba (MH-Mamba) encoder (Hydra-style SSM) containing three parallel selective SSM heads with gated fusion across four stacked layers, modulated by phoneme embeddings P_t via sigmoid gating. The 16-bit speaker ID is expanded to a 36-bit sequence using Hamming(6,3) error correction and repeatedly embedded over 1-second non-overlapping chunks sampled at 16 kHz. A shared 8-layer CNN decoder extracts the watermark from log-magnitude spectrograms using adaptive pooling and majority voting across chunks, bounding the undetected forgery length (UFL) to at most 2 seconds.

Training proceeds in two stages: joint encoder-decoder training using AdamW (lr=10^-4, batch size 16, 200 epochs) with an objective combining perturbation norm, retrieval MSE, waveform consistency, and false-positive suppression; followed by an anti-purification adversarial training loop against PhonePuRe (RevDiffWave + Refiner applied with p_pur=0.3) using AdamW (lr=10^-5, batch size 12, 50 epochs) optimized with loss weights lambda_wm=1.0, lambda_delta=0.1, lambda_org=0.3, and lambda_pur=0.5.

## Experimental setup

Encoder training uses LibriSpeech train-clean-100 (253 speakers, ~100 hours, 16 kHz). Real-world threat simulations evaluate on 11 selected VCTK speakers downsampled to 16 kHz, with YourTTS and sv2TTS used to generate 165 cloned test utterances. Baselines include Bi-LSTM, BiMamba, and MH-Mamba encoders, evaluated both with and without phoneme guidance and adversarial training. Metrics include SNR (dB) and PESQ for speech imperceptibility, bit-level accuracy (%) for watermark retrieval, and True Positive Rate (TPR / Tracing Accuracy %) alongside Undetected Forgery Length (UFL in seconds) and Retention Rate (%) for defense robustness.

## Results

Under real-world VCTK threat simulations using YourTTS and sv2TTS, the MH-Mamba model achieves a headline True Positive Rate (TPR) of 99.9 +/- 0.1% with a UFL latency of 1.0 +/- 0.1 seconds (compared to 99.9% / 1.2s for LSTM and 100.0% / 1.1s for BiMamba). In ablation studies against PhonePuRe purification, adversarial training combined with phoneme guidance elevates the watermark retention rate of the MH-Mamba model from 89.43% (base) to 92.34% (adversarially fine-tuned), outperforming the adversarially-trained LSTM (81.42%) and BiMamba (89.48%). Removing phoneme guidance causes a drastic drop in retention rate across all architectures, proving its necessity.

For speech quality, all encoders maintain high imperceptibility: LSTM achieves 34.12 dB SNR and 3.53 PESQ; BiMamba achieves 35.13 dB SNR and 3.55 PESQ; and MH-Mamba achieves 35.67 dB SNR and 3.54 PESQ.

| Encoder | TPR (%) ↑ | UFL (s) ↑ | Retain. Rate (%) ↑ | SNR (dB) ↑ | PESQ ↑ |
|---|---|---|---|---|---|
| LSTM | 99.9 | 1.2 | 81.42 | 34.12 | 3.53 |
| BiMamba | 100.0 | 1.1 | 89.48 | 35.13 | 3.55 |
| MH-Mamba | 99.9 | 1.0 | 92.34 | 35.67 | 3.54 |

## Limitations

The evaluation is restricted to clean English datasets (LibriSpeech and VCTK) and specific zero-shot cloning architectures (YourTTS and sv2TTS), leaving multi-lingual robustness, noisy acoustic environments, and emerging generative speech models unverified. The reliance on Montreal Forced Aligner (MFA) introduces an external dependency for phoneme boundary extraction during inference preparation, which may introduce latency or alignment errors on spontaneous conversational speech.

## Why read this

Speech and security researchers looking to transition from reactive deepfake detectors to proactive, robust active watermarking should read this to see how combining State Space Models (Mamba) with phoneme-guided stability masks and adversarial purification training achieves near-perfect source tracing.

## Code

- https://github.com/Silence-ai423/phoneme-aware-mamba-watermark

## Applications

Proactive voice clone tracing, source attribution for audio forensics, and copy protection for biometric voice identities.

## Institutions / 機構

Beijing University of Posts and Telecommunications, Beijing Institute of Technology

## Related

- (link related pages by id as the wiki grows)
