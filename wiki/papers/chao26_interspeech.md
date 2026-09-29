---
id: chao26_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3197
pdf: https://www.isca-archive.org/interspeech_2026/chao26_interspeech.pdf
---

# RT-SEMamba: Real-Time Speech Enhancement Mamba via Progressive Knowledge Distillation

*Rong Chao, Sung-Feng Huang, Moreno La Quatra, Sabato Marco Siniscalchi, Wen-Huang Cheng, Szu-Wei Fu, Yu Tsao*

[PDF](https://www.isca-archive.org/interspeech_2026/chao26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chao26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3197)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — RT-SEMamba is a fully causal, real-time speech enhancement model using time-frequency Mamba blocks and progressive knowledge distillation to achieve memory-efficient streaming. The 8-layer teacher achieves 3.32 PESQ, while an 8-to-1 layer distilled student reaches 3.18 PESQ at 0.11 RTF with a strict 25 ms algorithmic latency.

## Key contributions

- Revises offline SEMamba into a fully causal, online streaming architecture using unidirectional time-Mamba blocks and bidirectional frequency-Mamba blocks with zero lookahead.
- Implements a depth-compression scheme via progressive knowledge distillation, compressing an 8-layer teacher into 1-layer and 2-layer students.
- Combines output-level distillation (magnitude, phase, complex spectrum) and intermediate feature-level distillation with sample-wise normalization.
- Establishes strong real-time performance on VCTK-DEMAND, maintaining a fixed 25 ms algorithmic latency and a 2.75x speedup over the 8-layer teacher.

## Problem

Transformer- and diffusion-based speech enhancement models often rely on non-causal future context or growing key-value caches, making low-latency streaming deployment onto memory-constrained edge hardware difficult. While prior Mamba-based speech enhancement models offer linear complexity, they are typically evaluated in offline, non-causal settings without enforcing streaming constraints. This work bridges that gap by providing a fully causal SSM-based architecture capable of running online with constant memory and bandwidth.

## Method

RT-SEMamba operates in the complex STFT domain, taking noisy magnitude and phase features to predict enhanced complex spectra via causal STFT/iSTFT at 16 kHz (window size 400, hop 100, yielding a 25 ms algorithmic latency). All temporal convolutions use asymmetric causal padding with zero-filling for missing past context, and InstanceNorm2d is replaced by channel-wise LayerNorm with causal padding along the time axis. An additional MLP is added after each cTF-Mamba block, and time-Mamba is restricted to be unidirectional over frames t = 1, ..., T without lookahead, while frequency modeling remains bidirectional.

For inference, the model runs in a 1-frame-in/1-frame-out online mode by propagating three states: a temporal frame buffer for past encoder/decoder convolutions, a conv state buffer for depthwise 1D convolutions, and an ssm state holding the recurrent hidden state. This keeps per-frame compute and memory independent of sequence length T. To compress the model, an 8-layer cTF-Mamba teacher is distilled into a 1- or 2-layer student. The training objective combines task losses (magnitude, phase, complex, time-domain, consistency) with output-level distillation ($w_{mag}=1.0$, $w_{pha}=0.3$, $w_{com}=0.5$) and intermediate feature distillation using sample-wise normalized representations, scaled via a linear ramp-up over 10% of total training steps.

## Experimental setup

Evaluated on the VCTK-DEMAND dataset containing 11,572 noisy-clean training pairs (28 speakers, 10 noise types, 0-15 dB SNR) and 824 test utterances (2 unseen speakers, 5 unseen noise types, 2.75-17.5 dB SNR) resampled to 16 kHz. Compared against baselines including PercepNet, DCCRN+, FullSubNet+, DEMUCS, LiSenNet, DeepFilterNet2/3, FRCRN, and aTENNuate. Metrics include PESQ, CSIG, CBAK, COVL, STOI, parameters, MACs, and steady-state RTF measured on a single NVIDIA RTX 5090 GPU.

## Results

The 8-layer RT-SEMamba teacher achieves 3.32 PESQ, 4.64 CSIG, 3.72 CBAK, 4.08 COVL, and 0.05 STOI with 2.74M parameters and an RTF of 0.29. The naive 1-layer baseline achieves 3.06 PESQ, while the 8-to-1 layer distilled student reaches 3.18 PESQ, 4.43 CSIG, 3.68 CBAK, and 3.89 COVL, preserving the 1-layer RTF of 0.11 and delivering a 2.75x speedup over the teacher. The 8-to-2 layer distilled student further improves to 3.22 PESQ and 3.97 COVL at an RTF of approximately 0.13. Ablations on hybrid Mamba-Transformer teachers show that swapping one Mamba block for a Transformer in a 5-layer model matches the 8-layer all-Mamba PESQ of 3.32, but introduces KV-cache overhead.

| Model | PESQ | CSIG | CBAK | COVL | STOI | RTF | |---|---|---|---|---|---|---| | Noisy | 1.97 | 3.34 | 2.44 | 2.63 | 0.92 | – | | 1-layer (naive) | 3.06 | 4.38 | 3.61 | 3.79 | 0.94 | 0.11 | | RT-SEMamba (8->1) | 3.18 | 4.43 | 3.68 | 3.89 | 0.95 | 0.11 | | RT-SEMamba (8->2) | 3.22 | 4.55 | 3.69 | 3.97 | 0.95 | 0.13 | | RT-SEMamba (8-layer) | 3.32 | 4.64 | 3.72 | 4.08 | 0.95 | 0.29 |

## Limitations

Evaluated exclusively on the VCTK-DEMAND dataset at a 16 kHz sampling rate, leaving out multi-channel configurations, extreme reverberation scenarios, and wider band or 48 kHz telephony evaluation. The student model still suffers a performance drop compared to the full 8-layer teacher (e.g., 3.18 vs 3.32 PESQ), indicating that depth compression cannot fully recover the capacity of deeper state-space stacks.

## Why read this

Speech and machine learning engineers building real-time audio front-ends for edge devices should read this paper to see how to adapt Mamba state-space models for zero-lookahead streaming and compress them via progressive knowledge distillation.

## Code

- https://github.com/RoyChao19477/RT-SEMamba

## Applications

Real-time speech enhancement for hearing aids, cochlear implants, AR/VR communication devices, and live teleconferencing systems.

## Institutions / 機構

Academia Sinica, National Taiwan University, Kore University of Enna, University of Palermo, NVIDIA

## Related

- (link related pages by id as the wiki grows)
