---
id: huang26l_interspeech
category: speech-coding
institutions: ["Nanjing University", "Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1641
pdf: https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.pdf
---

# Unified Neural Speech Coding for Multiple Sampling Rates

*Jiankai Huang, Junteng Zhang, Lizhong Wang, Liang Wen, Ming Lu, Zhan Ma*

[PDF](https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26l_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1641)

**Category:** `speech-coding`

**TL;DR** — This paper proposes a unified neural speech codec that processes 16, 24, and 48 kHz audio within a single model and weight set, matching the performance of rate-specific specialists at 1.5 kbps. It eliminates external resampling and separate model maintenance by combining a shared backbone with lightweight temporal alignment, feature modulation, and a three-stage progressive training strategy.

## Key contributions

- Proposes a single-model neural speech codec supporting 16, 24, and 48 kHz sampling rates using fully shared backbone parameters and a universal Residual Vector Quantization (RVQ) module.
- Introduces the Sampling-Rate Adapter (SRAT) for learnable waveform-level temporal alignment to a unified internal grid without requiring external pre-processing resampling pipelines.
- Introduces the Sampling-Rate Modulator (SRMT) using conditional affine transformations (FiLM-inspired) inside network blocks to calibrate intermediate feature statistics and reduce cross-sampling-rate distribution shifts.
- Deploys a three-stage progressive training strategy (48 kHz pre-training, multi-rate joint training, and perceptual adversarial fine-tuning) to stabilize multi-rate optimization.

## Problem

Modern neural speech codecs are bound to fixed sampling rates, leading to performance degradation when confronted with mixed 16, 24, and 48 kHz deployment environments. Prior approaches either require computationally expensive external resampling pipelines, maintain multiple sampling-rate-specific models, or rely on architectural configurations like varying strides and separate branches (e.g., Gull, Soft Disentanglement, SPCODEC) that prevent full backbone and quantization sharing. This matters because it dramatically increases deployment complexity, memory overhead, and maintenance costs in real-world communication systems.

## Method

The architecture features a fully causal, time-domain encoder-decoder backbone with a single shared RVQ module and a fixed parameter size of 19.65M. It processes audio on a consistent internal temporal grid (16 kHz). At the input and output interfaces, the Sampling-Rate Adapter (SRAT) uses learnable 1D convolutional layers for integer ratios (e.g., upsampling by 2 and downsampling by 3 for 24-to-16 kHz) or cascaded stages for rational factors, mapping raw waveforms to and from the internal grid without fractional strides. 

Inside the encoder and decoder blocks (which use SEANet-style modules followed by an LSTM), the Sampling-Rate Modulator (SRMT) applies a channel-wise affine transformation using learned scale vectors gamma and bias vectors beta conditioned on the input sampling rate s. This FiLM-inspired conditioning aligns intermediate feature statistics across disparate bandwidths and frequency distributions. 

Optimization relies on a three-stage progressive training strategy: Stage 1 pre-trains the model on 48 kHz data using reconstruction loss Lrec and commitment loss Lcm; Stage 2 performs multi-rate joint training across 16, 24, and 48 kHz with SRAT and SRMT enabled; and Stage 3 enables adversarial loss Ladv and feature-matching loss Lfeat using a shared multi-scale STFT discriminator across all rates.

## Experimental setup

Experiments use LibriTTS (train-clean-100 and train-clean-360 for 16 and 24 kHz training, test-clean for evaluation) and VCTK (1000 utterances for testing, remainder for 48 kHz training). Baselines include EnCodec, DAC, SpeechTokenizer, FunCodec, StreamCodec, FlowDec, Mimi, and BSCodec. Evaluation metrics are ViSQOL, STOI, PESQ, MACs (G), and parameter count (M). Models are implemented in PyTorch, optimized with AdamW for 2M steps with a batch size of 8 on an Intel Xeon Platinum 8470Q CPU and NVIDIA RTX 3090 GPU, with learning rate decaying linearly from 1e-4 to 1e-5.

## Results

At 1.5 kbps, the unified model achieves competitive quality against rate-specific baselines while maintaining a fixed parameter count of 19.65M and extremely low computational overhead (2.14 G MACs at 16 kHz, 2.58 G MACs at 24 kHz, and 2.34 G MACs at 48 kHz). Specifically, at 24 kHz, it reaches a ViSQOL of 4.22, STOI of 0.919, and PESQ of 2.353, closely tracking or outperforming rate-specific models like BSCodec (ViSQOL 4.18 at 2.6 kbps). At 48 kHz, it scores 4.140 in ViSQOL, 0.889 in STOI, and 2.750 in PESQ.

Ablation studies validate the design choices: removing SRAT drops 48 kHz ViSQOL to 4.083; omitting SRMT causes a sharp PESQ drop at 24 kHz from 2.353 down to 1.979; and dropping progressive training universally degrades performance across all metrics (e.g., 48 kHz PESQ falls to 2.563). Latent consistency analysis via Maximum Mean Discrepancy (MMD) confirms that the full model achieves the lowest distribution distance across all sampling-rate pairs compared to ablated variants.

| System | Rate (kbps) | ViSQOL ↑ | STOI ↑ | PESQ ↑ | MACs (G) ↓ |
|---|---|---|---|---|---|
| DAC (16 kHz) [19] | 1.5 | 3.45 | 0.788 | 1.312 | 55.50 |
| FunCodec (16 kHz) [12] | 1.5 | 4.20 | 0.875 | 2.554 | 2.18 |
| **Ours (16 kHz)** | **1.5** | **4.21** | **0.920** | **2.369** | **2.14** |
| BSCodec (24 kHz) [24] | 2.6 | 4.18 | 0.915 | 2.479 | 45.29 |
| **Ours (24 kHz)** | **1.5** | **4.22** | **0.919** | **2.353** | **2.58** |
| FlowDec (48 kHz) [22] | 3.0 | 3.48 | 0.875 | 2.551 | 4572.60 |
| **Ours (48 kHz)** | **1.5** | **4.14** | **0.889** | **2.750** | **2.34** |

## Limitations

The evaluation is restricted to three fixed sampling rates (16, 24, and 48 kHz) and a single fixed bitrate (1.5 kbps), leaving variable-bitrate operation and arbitrary continuous sampling rates untested. The experiments are conducted primarily on clean speech corpora (LibriTTS and VCTK), so robustness under heavy acoustic noise, reverberation, or non-speech audio remains unverified.

## Why read this

Speech and ML engineers deploying neural codecs across heterogeneous client devices (telephony, streaming, high-fidelity audio) should read this to learn how to unify multiple sampling rates into a single lightweight model without sacrificing reconstruction quality or maintaining separate model weights.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time multi-platform VoIP communication, cloud audio streaming services, and bandwidth-constrained speech transmission systems supporting heterogeneous client sampling rates.

## Institutions / 機構

Nanjing University, Samsung

**Funding / 經費:** National Natural Science Foundation of China, Fundamental Research Funds for the Central Universities, Interdisciplinary Research Center for Future Intelligent Chips, Yachen Foundation

## Related

- (link related pages by id as the wiki grows)
