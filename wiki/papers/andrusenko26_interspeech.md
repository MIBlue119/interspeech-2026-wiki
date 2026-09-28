---
id: andrusenko26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1195
pdf: https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.pdf
---

# Reducing the Offline-Streaming Gap for Unified ASR Transducer with Consistency Regularization

[PDF](https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/andrusenko26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1195)

**TL;DR** — This paper presents a unified automatic speech recognition Transducer framework using chunk-limited attention, dynamic chunked convolutions, and a novel mode-consistency regularization loss to bridge the offline-streaming performance gap, achieving a state-of-the-art 5.76% average WER on the Open ASR Leaderboard.

## Problem

Maintaining separate ASR models for offline transcription and low-latency streaming increases development, training, and deployment overhead. While unified ASR frameworks attempt to share parameters, they suffer from a severe train-inference mismatch in multi-head attention and convolution blocks, leading to sharp accuracy degradation in low-latency streaming regimes below 0.5 seconds.

## Method

The framework utilizes a FastConformer-based RNN Transducer encoder with chunk-limited attention (sampling left, current, and right contexts) and Dynamic Chunk Convolutions (DCConv) to prevent future-frame leakage across boundaries. To align offline and streaming behaviors, the authors introduce Mode-Consistency Regularization for RNNT (MCR-RNNT), computed efficiently via a fused Triton GPU kernel that calculates symmetric Kullback-Leibler divergence directly on full lattice log-logits with nearly zero memory overhead. The model is trained using a dual-mode strategy that combines offline and streaming RNNT losses alongside the MCR loss. Experiments evaluate 128M-parameter (L-size) models trained on 120k hours of English data and 600M-parameter (XL-size) models trained on 280k hours.

## Results

Evaluated across eight open test sets on the English Open ASR Leaderboard, the 128M unified model with MCR-RNNT achieves superior performance across offline and streaming modes down to 0.24s latency compared to single-mode and dual-mode baselines. The 600M XL-size model reaches a 5.76% average WER in offline mode, outperforming several dedicated offline and streaming models. Ablations indicate that symmetric KLD loss with a weight of lambda=0.3 and offline weight alpha=0.5 provides the optimal trade-off between offline and streaming performance.

## Code

- https://huggingface.co/nvidia/parakeet-unified-en-0.6b

## Applications

Speech and ML engineers building voice assistants, transcription services, and real-time speech recognition pipelines that require a single model to support both high-accuracy batch transcription and low-latency streaming.

## Limitations

The current streaming decoding setup recalculates the left context at each chunk step rather than utilizing a cache-passing mechanism, which reduces inference speed.

## Related

- (link related pages by id as the wiki grows)
