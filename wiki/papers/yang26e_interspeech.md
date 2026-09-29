---
id: yang26e_interspeech
category: enhancement-separation
labels: [efficient-on-device, generative-model, robustness-noise]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-682
pdf: https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.pdf
---

# Schrödinger Bridge Mamba for One-Step Speech Enhancement

*Jing Yang, Sirui Wang, Chao Wu, Lei Guo, Fan Fan*

[PDF](https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yang26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-682)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `generative-model`, `robustness-noise`

**TL;DR** — Schrödinger Bridge Mamba (SBM) integrates Schrödinger Bridge (SB) trajectory training with a selective state-space Mamba backbone to achieve one-step speech enhancement and dereverberation, outperforming multi-step generative and discriminative baselines while maintaining a tiny real-time factor.

## Key contributions

- First framework to synergize the Schrödinger Bridge (SB) optimal transport training paradigm with the Mamba state-space architecture for speech enhancement.
- Achieves high-fidelity one-step inference (under 40 ms algorithmic latency with a 2-4 frame lookahead) bypassing iterative reverse SDE solves.
- Proposes a modified oSpatialNet-Mamba architecture incorporating a Gaussian Fourier timestep embedding and a global fullband Mamba layer.
- Comprehensive empirical validation across DNS Challenge (Real, Reverb, No Reverb) and VoiceBank-Demand test sets showing state-of-the-art performance against 50-step diffusion, flow matching, and discriminative baselines.

## Problem

Traditional score-based generative speech enhancement models suffer from the mean prior mismatch issue and require expensive iterative reverse SDE solving (often > 10 steps), precluding real-time edge streaming. Meanwhile, prior state-space (Mamba) models rely on naive deterministic regression mapping or masking which fails to capture fine structural distributions and leads to over-smoothing. SBM bridges this gap by aligning continuous-time generative optimal transport trajectories with Mamba's native state-evolution inductive bias.

## Method

SBM formulates joint denoising and dereverberation as an optimal transport process between degraded speech distribution pT and clean distribution p0 using Schrödinger Bridge SDEs. Intermediate states xt are explicitly constructed via VE noise schedule interpolations and a Wiener process term during training, acting as anchor supervision. The backbone is built on oSpatialNet-Mamba, modified with a Gaussian Fourier module mapping timesteps into embeddings that condition the Mamba layers (termed oSpatialNet-Mamba-Cond), alongside a fullband Mamba layer for cross-band spectral dynamics with a 2-4 frame lookahead.

The training objective combines four mean squared error components with weighting lambdas: standard MSE on complex STFT spectra, magnitude MSE, multi-resolution complex MSE, and multi-resolution magnitude MSE (with lambda weights set to 1000, 1000, 500, and 500 respectively). During inference, the reverse process timestep is fixed at t=1 (the degraded prior), allowing the model to reconstruct clean target STFT spectra in a single forward pass without iterative sampling loops.

## Experimental setup

Evaluated on ~800 hours of training data combining clean speech (DNS Challenge, AIShell-3, LibriSpeech), noise (FSD50K, DNS), and RIRs (SLR26/28, pyroomacoustics) simulated with SNR between -10 dB and 20 dB at 16 kHz. Benchmarked against SB-NCSN++ (1, 10, 50 steps), SBCTM, SB-UFOGen, ZipEnhancer, Mamba-base (mapping trained), and FM-Mamba (flow matching variant) across DNS Real Recordings, DNS With/No Reverb, and VoiceBank-Demand test sets using DNSMOS (SIG, BAK, OVRL, P808MOS), NISQA, SpeechBERTScore, Speaker Similarity, PESQ, and ESTOI metrics. Implemented in PyTorch with AdamW optimizer and cosine learning rate schedule starting at lr=1e-3, using NFFT=512, Hann window length=480, and hop length=160.

## Results

SBM achieves a top-tier real-time factor (RTF) of 0.0048 with a lightweight model size of 3.93M parameters. On DNS Real Recordings, SBM secures leading perceptual scores across the board: SIG 3.459, BAK 4.106, OVRL 3.198, P808MOS 3.742, and NISQA 3.937, outperforming 50-step SB-NCSN++ (OVRL 3.052) and ZipEnhancer (OVRL 3.002). On DNS With Reverb, SBM achieves a PESQ of 1.971 and ESTOI of 0.71, beating FM-Mamba (PESQ 1.643) and SB-NCSN++(1) (PESQ 1.586). Ablation studies confirm the SB training paradigm consistently elevates performance over point-to-point mapping across MHSA, LSTM, and Mamba architectures, with Mamba(SB) outperforming LSTM(SB) and MHSA(SB) on DNS Real OVRL (3.198 vs 3.00 and 2.927).

| System | Parameters [M] | RTF | SIG | BAK | OVRL | P808MOS | NISQA |
|---|---|---|---|---|---|---|---|
| SB-NCSN++ (50) | 25.16 | 0.767 | 3.369 | 3.939 | 3.052 | 3.685 | 3.604 |
| SB-UFOGen | 25.16 | 0.0152 | 3.255 | 3.838 | 2.911 | 3.485 | 3.196 |
| ZipEnhancer | 2.04 | 0.105 | 3.323 | 3.918 | 3.002 | 3.639 | 3.264 |
| Mamba-base (Mapping) | 3.61 | 0.0048 | 3.284 | 3.974 | 2.993 | 3.683 | 3.644 |
| FM-Mamba | 3.93 | 0.0048 | 3.320 | 4.031 | 3.052 | 3.562 | 3.797 |
| SBM (Ours) | 3.93 | 0.0048 | 3.459 | 4.106 | 3.198 | 3.742 | 3.937 |

## Limitations

Evaluated exclusively on 16 kHz audio data, restricting direct assessment on wideband or high-fidelity studio rates (e.g., 44.1/48 kHz). Training mixes 25% double-talk scenarios to preserve secondary speakers, which causes alignment-sensitive metrics like SpeechBERTScore to penalize the model in single-speaker isolated test conditions. Scope is bounded to synthetic and recorded noise/reverberation domains without explicit exploration of extreme acoustic degradation or multi-channel microphone arrays.

## Why read this

Researchers and audio engineers working on real-time edge streaming will find this paper essential reading for learning how to combine continuous-time generative trajectory modeling (Schrödinger Bridge) with linear-complexity state-space models (Mamba) to bypass multi-step sampling bottlenecks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time edge speech enhancement, teleconferencing hardware, hearing aids, and streaming communication pipelines operating under strict latency constraints.

## Institutions / 機構

Huawei

## Related

- (link related pages by id as the wiki grows)
