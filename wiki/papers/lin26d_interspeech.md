---
id: lin26d_interspeech
category: speech-coding
labels: [generative-model]
institutions: ["Tsinghua University", "Huawei"]
code: https://thuhcsi.github.io/interspeech2026-BridgeCodec/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1338
pdf: https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.pdf
---

# BridgeCodec: Mamba Enhanced Neural Audio Codec with Schrödinger Bridge at Low Bitrate

*Zijian Lin, Jing Yang, Jinghao Luo, Zhuo Wang, Fan Fan, Zhiyong Wu*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1338)

**Category:** `speech-coding` · **Labels:** `generative-model`

**TL;DR** — BridgeCodec decouples mismatched neural audio codec encoder-decoder pairs by formulating latent translation as a Schrödinger Bridge optimal transport problem, enabling high-fidelity 48 kHz reconstruction from an 8 kHz 1 kbps source at a 4.12 MOS.

## Key contributions

- Proposes BridgeCodec, a Schrödinger Bridge-based framework to decouple heterogeneous neural audio codec encoders and decoders for direct cross-codec communication.
- Integrates Mamba selective State Space Models into a U-Net backbone to capture long-range speech temporal dependencies within compressed latent spaces with linear complexity.
- Introduces a two-stage training strategy (latent-space structural alignment followed by audio-domain waveform/mel-spectrogram refinement) to balance semantic accuracy and perceptual quality.
- Demonstrates robust extreme bandwidth extension and cross-codec mapping from a lightweight 8 kHz encoder to a 48 kHz decoder at an ultra-low 1 kbps bitrate.

## Problem

State-of-the-art neural audio codecs (NACs) operate as closed ecosystems reliant on rigidly co-trained encoder-decoder pairs. This creates a severe interoperability gap preventing direct communication between devices using independently deployed codecs with asymmetric hardware or bitrates. Standard diffusion models fail here because their Gaussian noise priors destructively overwrite structural speech priors preserved in compressed latents, while traditional cross-codec updating is practically infeasible and risks systemic failures.

## Method

BridgeCodec connects a source encoder $En^s(\cdot)$ and a target decoder $De^t(\cdot)$ via a latent-space translator. The source codec compresses $X$ into latent representation $H^s$, quantized into $H_q^s$. The intermediate translator maps $H_q^s$ directly to $H_q^t$ using a Schrödinger Bridge (SB) optimal transport formulation, bypassing standard Gaussian noise priors by adaptively learning transitions between empirical distributions.

The translator uses a Mamba-enhanced U-Net architecture across $K=4$ resolution levels. Each encoder/decoder stage passes local features extracted by $N$ residual blocks through $M=5$ Mamba layers with a hidden size of 128 (flattened spatial dimensions $D_m = C \times D_r$), allowing global temporal modeling with linear complexity.

Training uses a two-stage recipe: first, the SB model is trained purely in the latent space using the bridge matching loss for 100k steps (batch size 32, lr 5e-5); second, the pretrained translator is cascaded with the frozen target decoder and fine-tuned for 10k steps (batch size 8, lr 5e-6) using a joint objective combining time-domain L1 loss ($L_{\text{time}}$) and frequency-domain mel-spectrogram L1 loss ($L_{\text{mel}}$). Inference uses an SDE sampler operating efficiently down to 1 NFE.

## Experimental setup

Evaluated on the ICASSP 2022 DNS Challenge clean speech dataset (48 kHz fullband, ~2,425 hours across 6 languages, with 10k validation and 10k test clips). The source codec runs at 8 kHz, 1 kbps (ratios [2,4,5,8], 128-dim latents at 25 Hz, 4-layer RVQ, 1024 codebooks, 2.8 MB parameters); the target codec runs at 48 kHz, 6 kbps (ratios [2,4,5,6,8], 128-dim latents at 25 Hz, 24-layer RVQ, 134 MB parameters). Metrics include STOI, STFT, MEL, DNSMOS, Word Error Rate (WER via Whisper-large-v3 on 16 kHz resampled audio), WavLM speaker similarity (SIM), and subjective Mean Opinion Score (MOS) by 30 listeners.

## Results

BridgeCodec successfully bridges the 8 kHz 1 kbps source to the 48 kHz target decoder, boosting STOI from 0.23 (source) to 0.88 (vs 0.96 target upper bound) and dropping MEL from 10.01 down to 1.65. Speaker similarity (SIM) leaps from 0.81 to 0.96 (close to the 0.99 target bound), while achieving a subjective MOS of 4.12 (outperforming the 3.80 source baseline). Ablations show the Mamba backbone consistently outperforms a standard U-Net baseline (BridgeCodecUNet), and second-stage training improves DNSMOS and SIM. Remarkably, reducing NFE to 1 achieves the best objective scores (STOI 0.89, MEL 1.58, DNSMOS 3.18), demonstrating an exceptionally straight SB transport path.

| Model | STOI ↑ | STFT ↓ | MEL ↓ | DNSMOS ↑ | WER ↓ | SIM ↑ | MOS ↑ |
|---|---|---|---|---|---|---|---|
| Target codec | 0.96 | 1.63 | 1.05 | 3.26 | 1.70 | 0.99 | 4.24 ± 0.10 |
| Source codec | 0.23 | 12.24 | 10.01 | 3.11 | 1.92 | 0.81 | 3.80 ± 0.11 |
| BridgeCodecUNet | 0.86 | 2.27 | 1.74 | 3.09 | 2.16 | 0.93 | - |
| BridgeCodec | 0.88 | 2.22 | 1.65 | 3.17 | 2.11 | 0.96 | 4.12 ± 0.11 |
| w/o Two stage training | 0.87 | 2.19 | 1.68 | 3.15 | 2.04 | 0.95 | - |

## Limitations

Evaluated exclusively on clean speech datasets, leaving performance on noisy, reverberant, or multi-speaker overlapping audio unproven. The reliance on generative hallucination for extreme bandwidth extension (8 kHz to 48 kHz) induces a slight penalty on Word Error Rate compared to the target codec. Cross-codec compatibility is currently demonstrated primarily on specific AudioCraft-based RVQ models rather than arbitrary industrial codecs.

## Why read this

Speech and ML engineers working on neural audio compression, low-bitrate transmission, or cross-codec interoperability should read this to see how Schrödinger Bridges and Mamba blocks can directly map disparate latent spaces in linear time with single-step inference capability.

## Code

- https://thuhcsi.github.io/interspeech2026-BridgeCodec/

## Applications

Universal audio codec translation gateways, low-bitrate IoT speech transmission, asymmetric real-time communication systems, and bandwidth extension for legacy narrowband telephony.

## Institutions / 機構

Tsinghua University, Huawei

**Funding / 經費:** National Natural Science Foundation of China

## Related

- [A Dual-Stream Discrete Neural Codec with Fixed-Length Global Speaker Tokens and Dynamic Frame Rates for Low-Bitrate Speech Tokenization](zhang26ga_interspeech.md) — same problem · relatedness 2.8/3
- [MSR-Codec: A Low-Bitrate Multi-Stream Residual Codec for High-Fidelity Speech Generation with Information Disentanglement](li26c_interspeech.md) — same problem · relatedness 2.7/3
- [ContextCodec: Content-Focused Context Guidance for Ultra-Low Bitrate Speech Coding](liang26d_interspeech.md) — same problem · relatedness 2.6/3
- [An Ultra-Low-Bitrate Neural Speech Codec with Plain-to-Pseudo Synergistic Vector Quantization](jiang26h_interspeech.md) — same problem · relatedness 2.6/3
- [VoCodec: A Low-bitrate Streamable Neural Speech Codec with Voicing-driven Quantization](jiang26b_interspeech.md) — same problem · relatedness 2.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
