---
id: andrusenko26_interspeech
category: asr
labels: [streaming-real-time]
institutions: ["NVIDIA"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1195
pdf: https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.pdf
---

# Reducing the Offline-Streaming Gap for Unified ASR Transducer with Consistency Regularization

*Andrei Andrusenko, Vladimir Bataev, Lilit Grigoryan, Nune Tadevosyan, Vitaly Lavrukhin, Boris Ginsburg*

[PDF](https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1195)

**Category:** `asr` · **Labels:** `streaming-real-time`

**TL;DR** — This paper presents a unified Automatic Speech Recognition (ASR) framework for Transducers (RNNT) that supports both offline and low-latency streaming inference using shared parameters. By introducing a Triton-accelerated mode-consistency regularization loss (MCR-RNNT) alongside chunk-limited attention and dynamic convolutions, the approach achieves a state-of-the-art 5.76% average WER on the Open ASR Leaderboard while maintaining robust streaming performance.

## Key contributions

- A unified RNNT ASR framework combining chunk-limited multi-head attention (MHA) and dynamic chunked convolutions (DCConv) to handle both offline and streaming modes with shared parameters.
- Mode-consistency regularization for RNNT (MCR-RNNT), an efficient Triton-based fused GPU kernel computing full-lattice KL divergence directly on raw joint logits with near-zero memory overhead.
- A dual-mode training strategy that couples offline and streaming passes to enforce representation agreement across contexts.
- Open-sourced English model checkpoints (0.6B parameters) achieving SOTA unified ASR performance with punctuation and capitalization support.

## Problem

Training a single ASR model for both high-accuracy offline transcription and low-latency streaming remains difficult due to a severe training-inference mismatch in Conformer MHA and convolution blocks. Prior chunked attention and causal convolution methods trade off substantial accuracy degradation when constrained to minimal look-ahead windows under 0.5 seconds. Standard unified training configurations often suffer from a sharp performance drop in either the offline or streaming regime because the same parameters struggle to bridge different context lengths.

## Method

The model uses a FastConformer encoder, a single-layer LSTM predictor (640 units), and a joint network forming an RNNT architecture. To enable streaming, multi-head attention (MHA) applies a chunked mask with left context (L), current chunk (C), and dynamic right context (R), sampling various C and R values during training to support multiple latency targets. Standard convolutions are replaced by Dynamic Chunk Convolution (DCConv), which reshapes hidden states into chunks based on current chunk size C and kernel-derived contexts, sharing identical parameters between offline and streaming modes.

In dual-mode (DM) training, each optimization step runs both offline and streaming passes on the same input batch and combines their RNNT losses weighted by alpha. To bridge the representation gap, the MCR-RNNT loss computes symmetric Kullback-Leibler Divergence (KLD) between teacher (offline) and student (streaming) full RNNT joint logits. Because materializing full [T, U+1, V] joint tensors is memory prohibitive, log-softmax and KLD are computed on-the-fly and recomputed during the backward pass using a custom, highly portable Triton fused kernel integrated with PyTorch autograd, keeping memory overhead negligible.

## Experimental setup

Experiments use the Granary dataset: 120,000 hours of normalized English speech for L-size models (123M encoder parameters, 128M total), and 280,000 hours with punctuation and capitalization for XL-size models (600M parameters). L-size models are trained for 100K steps with a 1e-3 max LR (15K warmup) using 32 NVIDIA A100 GPUs and dynamic bucketing. XL models train for 300K steps with a 5e-4 LR. Evaluation uses the Open ASR Leaderboard average WER across 8 open test sets (AMI, Earnings22, Gigaspeech, Librispeech, SPGI, TEDLIUM, VoxPopuli) with greedy decoding (batch size 128).

## Results

For L-size models, the proposed Unified DM + MCR-RNNT achieves an offline WER of 6.63% and robust streaming WERs across latencies (e.g., 6.86% at 2.08s, 7.47% at 0.56s, and 8.24% at 0.32s), outperforming single-mode and baseline streaming setups. At the XL scale (0.6B parameters), the unified model achieves a 5.76% offline AVG WER—approaching pure offline models like Canary-Qwen-2.5B (5.63%)—while outperforming strong open-source streaming models like Nemotron-Speech-Streaming-En-0.6b down to 0.32s latency.

Ablations demonstrate that symmetric KLD with a regularization weight of lambda = 0.3 and offline weight alpha = 0.5 delivers the optimal Pareto frontier between offline and streaming accuracy. The approach exhibits slight degradation relative to specialized causal streaming baselines only at extremely low, constrained latencies like 0.16s.

| System / Condition | Offline WER (%) | 1.12s WER (%) | 0.56s WER (%) | 0.32s WER (%) | 0.16s WER (%) |
|---|---|---|---|---|---|
| Offline RNNT (baseline) | 6.47 | 8.21 | 13.56 | 26.51 | 94.05 |
| Streaming RNNT (baseline) | 7.75 | 8.02 | 8.36 | 11.47 | 9.84 |
| Unified Single-Mode (SM) | 6.66 | 7.46 | 7.98 | 9.40 | 17.16 |
| Unified Dual-Mode (DM) | 6.69 | 7.48 | 8.12 | 9.86 | 22.45 |
| Unified DM + MCR-RNNT (Ours, L-size) | 6.63 | 7.09 | 7.47 | 7.83 | 10.51 |
| Unified DM + MCR-RNNT (Ours, 0.6B XL) | 5.76 | 6.14 | 6.44 | 6.96 | 12.73 |

## Limitations

The current inference implementation recalculates the left context at each chunk step rather than utilizing a persistent cache, which adds computational overhead and slows down streaming inference speed. Evaluation is restricted to English, leaving multilingual scaling unverified. Performance at an ultra-low latency of 0.16s still lags slightly behind dedicated causal streaming baselines. Compute requirements remain heavy, necessitating dual-mode passes or large-scale pretraining on 280k hours of data for peak performance.

## Why read this

Speech engineers and researchers struggling to deploy separate offline and streaming ASR systems will find this paper essential for its practical, GPU-efficient Triton implementation of consistency regularization. It provides clear architectural recipes and scaling evidence to eliminate the offline-streaming performance gap without sacrificing model footprint.

## Code

- https://huggingface.co/nvidia/parakeet-unified-en-0.6b

## Applications

Real-time speech transcription, interactive voice assistants, and dual-mode transcription services requiring both high-accuracy batch processing and low-latency live streaming.

## Institutions / 機構

NVIDIA

## Related

- (link related pages by id as the wiki grows)
