---
id: luo26_interspeech
category: tts
labels: [efficient-on-device]
institutions: ["Fish Audio", "University of Science and Technology of China"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-500
pdf: https://www.isca-archive.org/interspeech_2026/luo26_interspeech.pdf
---

# FCPE: A Fast Context-based Pitch Estimation Model

*Yuxin Luo, Ruoyi Zhang, Lu-Chuan Liu, Tianyu Li, Hangyu Liu*

[PDF](https://www.isca-archive.org/interspeech_2026/luo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/luo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-500)

**Category:** `tts` · **Labels:** `efficient-on-device`

**TL;DR** — FCPE is a lightweight, context-based monophonic pitch estimation model that leverages depthwise separable convolutions to achieve state-of-the-art accuracy while running up to 77x faster than CREPE and 5.3x faster than RMVPE.

## Key contributions

- Proposed a modified convolutional backbone using depthwise separable convolutions (inspired by Conformer) and residual connections to efficiently model temporal context for pitch estimation.
- Formulated a robust training strategy incorporating noise augmentation, spectrogram masking (blank/Gaussian), and random key-shifting to improve noise tolerance and expand vocal range.
- Overcame speech/singing data scarcity by successfully training entirely on cleanly re-synthesized datasets using Differentiable Digital Signal Processing (DDSP).
- Released a highly efficient architecture (10.64M parameters, 1.06 GFLOPS) achieving an RTF of 0.0062 on an RTX 4090 GPU, which has been widely adopted in open-source voice conversion tools like RVC and So-vits-svc.

## Problem

Traditional pitch estimation relies on time-domain (ACF) or frequency-domain (cepstrum) signal processing techniques like YIN and YAAPT, which struggle in noisy environments and polyphonic conditions. Modern deep learning models such as CREPE, DeepF0, and RMVPE have elevated accuracy and noise robustness, but their heavy, unoptimized architectures introduce massive computational overhead and latency, rendering them impractical for real-time speech and singing voice conversion (SVC) applications. This paper addresses the critical need for a pitch tracker that matches the noise robustness and accuracy of heavy models while offering ultra-low latency and minimal compute footprints for real-time deployment.

## Method

The model takes a log-mel spectrogram ($XT \times F$) extracted from a 16 kHz audio waveform as input. The frontend consists of shallow 1D convolutional layers mapping features into a high-dimensional vector sequence, optionally concatenated with a learnable harmonic embedding. The core backbone is a stack of lightweight CNN blocks inspired by the Conformer convolution module, utilizing depthwise 1D convolutions for local pattern extraction, pointwise convolutions for channel management, and GLU activations with residual connections.

The output stage projects features via a linear layer into a 360-bin pitch probability matrix covering six octaves (C1 to B7, 32.70 Hz to 1975.5 Hz) at 20-cent intervals. Training uses Binary Cross-Entropy (BCE) loss against target labels formatted identically to CREPE. At inference, a local weighted average (local argmax) decoder calculates a precise continuous fundamental frequency ($f_0$) around the peak probability bin.

The training recipe circumvents manual labeling errors by utilizing DDSP-resynthesized versions of the M4Singer and VCTK datasets as ground-truth audio. To promote generalization and noise robustness, the pipeline applies random waveform key-shifting, superimposition of diverse noise profiles (white, colored, and CHiME real-world noise), and random time-frequency spectrogram masking (blank or Gaussian). Spectrogram masking forces the network to rely on temporal context from adjacent frames rather than isolated frame features.

## Experimental setup

Evaluated on MIR-1K, Vocadito, TONAS, and a DDSP-resynthesized test split of THCHS30 (THCHS30-Synth). Metrics include Raw Pitch Accuracy (RPA) under clean conditions and varying Signal-to-Noise Ratios (20 dB, 0 dB, -20 dB) with white, pink, and real-world CHiME noise, alongside Real-Time Factor (RTF) and GFLOPS. Implemented on a single RTX 4090 GPU, comparing against RMVPE (90.42M params), CREPE (22.24M params), PESTO (0.13M params), PM, and Harvest.

## Results

FCPE (10.64M parameters) achieves a 96.79% clean RPA on the MIR-1K dataset, matching heavyweight competitors like RMVPE (97.77%) and CREPE (79.90%). In terms of throughput, FCPE reaches an RTF of 0.0062 with 1.06 GFLOPS per second of audio, running 5.3x faster than RMVPE (0.0329 RTF, 4.91 GFLOPS), 2.6x faster than PESTO (0.0164 RTF), and 77x faster than CREPE (0.4775 RTF, 141 GFLOPS). Ablations confirm that noise augmentation is vital for high-noise survival (e.g., dropping to 6.19% RPA at -20 dB white noise when removed), while spectrogram masking is crucial for handling structured noise (dropping to 4.81% RPA on pink noise when omitted).

| System | Params | RTF | FLOPS | MIR-1K Clean | MIR-1K (-20dB White) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| FCPE (Ours) | 10.64M | 0.0062 | 1.06 G | 96.79% | 29.75% |
| RMVPE | 90.42M | 0.0329 | 4.91 G | 97.77% | 43.63% |
| CREPE | 22.24M | 0.4775 | 141 G | 97.90% | 1.09% |
| PESTO | 0.13M | 0.0164 | 2.82 G | 98.47% | 17.78% |

## Limitations

While FCPE is highly optimized for monophonic pitch estimation in speech and singing, its evaluation is constrained to single-speaker vocal datasets and does not address polyphonic music source separation or simultaneous multi-speaker transcription. The model exhibits performance drops at extreme negative signal-to-noise ratios (-20 dB), lagging behind RMVPE under severely degraded acoustic conditions. Furthermore, the reliance on DDSP-resynthesized training data means its capability is bound by the fidelity and domain coverage of the vocoder synthesis pipeline.

## Why read this

Speech and ML engineers building real-time voice conversion pipelines or on-device audio systems should read this paper to see how lightweight depthwise separable convolutions and context-masking strategies can match heavy pitch trackers while dropping inference compute by orders of magnitude.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time singing voice conversion (SVC), retrieval-based voice conversion (RVC), MIDI transcription, and automated music information retrieval.

## Institutions / 機構

Fish Audio, University of Science and Technology of China

## Related

- [Instantaneous Pitch Estimation via Wave-U-Net-Based Fundamental Waveform Enhancement](koguchi26_interspeech.md) — same problem · relatedness 2.4/3
- [Amadea: An AI Companion for Pitch-Aware Spoken Language Practice](agrawal26_interspeech.md) — complementary · relatedness 1.8/3
- [Automatic identification of the onset of creaky voice according to F0 instability](puggaardrode26_interspeech.md) — complementary · relatedness 1.8/3
- [Differentiable Pitch Matching with Auditory Models](marttila26_interspeech.md) — same problem · relatedness 1.8/3
- [Pitch-Injected Residual Adapter for Tonal Language in Neural Audio Codec](yang26g_interspeech.md) — complementary · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
