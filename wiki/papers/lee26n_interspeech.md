---
id: lee26n_interspeech
category: enhancement-separation
labels: [efficient-on-device, streaming-real-time, robustness-noise]
institutions: ["Sungkyunkwan University", "University of Illinois Urbana-Champaign"]
code: https://ml-sp.github.io/DroFiT/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1620
pdf: https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.pdf
---

# DroFiT: A Lightweight Band-Fused Frequency Attention Toward Real-Time UAV Speech Enhancement

*Jeongmin Lee, Chanhong Jeon, Hyungjoo Seo, Kyuhong Shim, Taewook Kang*

[PDF](https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lee26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1620)

**Category:** `enhancement-separation` · **Labels:** `efficient-on-device`, `streaming-real-time`, `robustness-noise`

**TL;DR** — DroFiT is a lightweight, incremental single-microphone speech enhancement network designed to suppress severe UAV ego-noise while consuming minimal memory and compute. It achieves state-of-the-art perceived speech quality (DNSMOS OVL 1.64) with only 168k parameters and 2.14 GigaMACs, outperforming heavier models like DCU-net and SMoLNet-T under extreme low-SNR drone noise.

## Key contributions

- Proposes a parallel Full/Sub-band encoder-decoder architecture with non-uniform Mel-like frequency grouping to balance global spectral context and low-frequency speech detail.
- Introduces a Pre-TCN module that models the slowly drifting, quasi-stationary harmonic structure of drone propeller noise prior to frequency-wise Transformer attention.
- Replaces conventional FFNs with memory-efficient Conv-FFNs (pointwise and depthwise convolutions) and incorporates optional Linear Attention (DroFiT-Lite) and INT8 quantization (DroFiT-Quant).
- Employs a post-TCN temporal refinement stage and a mask generation block to estimate complex-valued masks for magnitude and phase reconstruction.

## Problem

Unmanned aerial vehicles (UAVs) generate severe wideband, periodic propeller and motor ego-noise that drastically degrades speech communication and audio perception. While deep learning models such as DCU-net, DCCRN, and SMoLNet-T achieve strong noise reduction, they either demand excessive computation (millions of parameters and MACs) or require chunk-based processing that overflows limited on-chip SRAM, triggering expensive external DRAM access. Because off-chip memory movement consumes up to 200x more energy than a MAC operation, edge deployment on resource-constrained UAVs requires architectures that simultaneously minimize parameter footprints, peak activations, and latency.

## Method

DroFiT operates on 16 kHz audio processed via a 1024-point FFT and 512-sample hop, taking complex STFT inputs to jointly estimate magnitude and phase. The architecture consists of a parallel Full-band path and a Sub-band path. The full-band encoder uses Conv1D-based C(T)NA blocks and a global convolution layer (GConv) to compress 513 frequency bins down to 64 channels, while the sub-band path partitions the spectrum into 5 non-uniform groups (32, 32, 64, 128, and 257 bins) processed via groupwise 1D convolutions. A Pre-TCN precedes the attention layer, utilizing a temporal convolutional network in the full-band path to stabilize quasi-stationary drone harmonics and a channel-wise projection (C-Linear) in the sub-band path.

Next, an N-layer frequency-wise Transformer applies Multi-Head Self-Attention exclusively along the concatenated frequency tokens, using learnable frequency positional encodings to capture both intra-branch and cross-branch dependencies. Conventional feed-forward networks are swapped for Conv-FFNs containing pointwise and depthwise convolutions independently per path. Decoded features pass through a Post-TCN that utilizes frequency average pooling to refine temporal scale dynamics without redundant frequency modeling. Finally, a Mask Generation Block concatenates the full- and sub-band outputs, passes them through a 2D convolution and Tanh activation, and applies complex multiplication with the input STFT to reconstruct the waveform.

The training loss combines time-domain negative SI-SDR (weighted alpha=0.2) and frequency-domain log-magnitude L1 loss plus complex MSE (weighted beta=0.8). Double-precision (float64) training is used for stability across all models, while evaluation uses float32. DroFiT-Lite substitutes standard attention with Linear Attention, and DroFiT-Quant applies weight-only INT8 quantization.

## Experimental setup

Evaluated on simulated mixtures generated via pyroomacoustics by combining clean utterances from the VoiceBank-DEMAND dataset (7200 training, 800 validation, 810 test samples) with recorded DJI Flip UAV hovering noise at SNRs ranging from -5 to -30 dB. Also tested on 1300 real-world recorded test samples (650 seconds per speaker from an external loudspeaker). Compared against baseline systems DTLN, DCCRN-E, DCU-net, and SMoLNet-T. Metrics include SI-SDR, ESTOI, NB/WB-PESQ, DNSMOS P.835 (SIG, BAK, OVL), parameter count, peak memory, and MACs.

## Results

DroFiT-base achieves an SI-SDR of 5.75 dB at -30 dB input SNR (outperforming SMoLNet-T's 5.53 dB and DCU-net's 4.72 dB) and maintains competitive performance across higher SNRs up to -5 dB (16.04 dB SI-SDR). On real-world DNSMOS P.835 evaluations, DroFiT-base obtains a SIG score of 2.00 and OVL of 1.64, surpassing DCU-net (1.84 SIG, 1.60 OVL) and SMoLNet-T (1.78 SIG, 1.50 OVL), though DCU-net scores slightly higher in background suppression BAK (3.35 vs 2.96) due to heavier compute.

Ablation studies confirm that removing the sub-band path causes the most severe performance degradation, followed by removing the Pre-TCN. DroFiT-Lite reduces MACs from 2.14G to 1.21G with negligible metric drop, and DroFiT-Quant further shrinks peak memory from 0.688 MB to 0.259 MB via INT8 weight quantization while preserving quality.

| System | Params (M) | Mem peak (MB) | MACs (G) | DNSMOS SIG | DNSMOS BAK | DNSMOS OVL |
|---|---|---|---|---|---|---|
| Noisy (Input) | - | - | - | 1.17 | 1.13 | 1.07 |
| DTLN | 1.416 | 5.535 | 0.223 | 1.73 | 2.97 | 1.48 |
| DCCRN-E | 6.032 | 23.625 | 27.626 | 1.67 | 1.98 | 1.39 |
| DCU-net | 2.808 | 14.272 | 32.234 | 1.84 | 3.35 | 1.60 |
| SMolNet-T | 0.187 | 1.245 | 18.643 | 1.78 | 3.05 | 1.50 |
| DroFiT (base) | 0.168 | 0.688 | 2.140 | 2.00 | 2.96 | 1.64 |

## Limitations

Evaluated exclusively on ego-noise recorded from a single drone model (DJI Flip) mixed with a standard speech corpus, which may limit generalization to diverse multi-rotor acoustic signatures or varying aerodynamic payloads. The evaluation scope is restricted to single-microphone processing and simulated spatial setups, omitting multi-microphone array setups or moving sound sources with extreme Doppler shifts.

## Why read this

Speech and ML engineers building on-device audio systems for micro-UAVs or resource-constrained edge hardware should read this paper to learn how to design memory-efficient dual-path architectures that combine temporal TCNs with frequency-wise Transformers without triggering external DRAM bottlenecks.

## Code

- https://ml-sp.github.io/DroFiT/

## Applications

On-device speech enhancement, UAV voice command interfaces, search-and-rescue acoustic monitoring, and real-time noise suppression for edge hardware.

## Institutions / 機構

Sungkyunkwan University, University of Illinois Urbana-Champaign

**Funding / 經費:** National Research Foundation, IITP, AI Semiconductor Innovation Research Center, Sungkyunkwan University, KIAT

## Related

- [Ego-Noise-Aware Spatial Filtering for Reliable UAV Audition in Extreme Low-SNR Conditions](jeon26b_interspeech.md) — same problem · relatedness 2.5/3
- [WaveNorm: Real-Time Neural AGC for Noise-Robust Speech Enhancement on Resource-Constrained Edge Devices](ijjada26b_interspeech.md) — same problem · relatedness 2.3/3
- [HALO: Half-Frame-Rate Adaptive Learnable Operator for Lightweight STFT-Based Speech Enhancement](zhao26c_interspeech.md) — same problem · relatedness 2.3/3
- [RT-SEMamba: Real-Time Speech Enhancement Mamba via Progressive Knowledge Distillation](chao26_interspeech.md) — same problem · relatedness 2.3/3
- [Schrödinger Bridge Mamba for One-Step Speech Enhancement](yang26e_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
