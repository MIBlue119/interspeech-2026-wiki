---
id: kim26g_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-817
pdf: https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.pdf
---

# Latency-Configurable Streaming Speech Enhancement via Asymmetric Temporal Padding

[PDF](https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-817)

**TL;DR** — LaCo-SENet introduces latency-configurable streaming speech enhancement via asymmetric temporal padding and selective state updates, achieving a PESQ of 3.35 at a fully causal 12.5 ms latency with 1.37M parameters.

## Problem

Streaming speech enhancement models are traditionally locked into a rigid binary choice between causal and non-causal operation, preventing systematic exploration of the latency-quality trade-off. While adding lookahead frames improves speech quality, naive chunk-based streaming with per-layer lookahead results in state corruption as future frames are replayed across chunk boundaries. This prevents practitioners from smoothly configuring a single model architecture across diverse real-time application constraints.

## Method

The method builds upon a 1.37M-parameter PrimeK-Net backbone modified with BatchNorm, causal channel attention, and asymmetric temporal padding across encoder and decoder convolutions. A training-time hyperparameter controls the padding ratio to redistribute past and future context without altering receptive field size or parameter count. A dual-buffer streaming framework supplies past context via state buffers and future context via input/feature lookahead buffers. Crucially, a selective state update operator restricts state recording strictly to current-chunk frames, preventing future-frame leakage into the streaming state.

## Results

Evaluated on the VoiceBank+DEMAND dataset at 16 kHz, a single fixed-budget 1.37M parameter model spans algorithmic latencies from 12.5 ms to 75.0 ms, yielding PESQ scores from 3.35 to 3.43. At a fully causal 12.5 ms latency, the model achieves a PESQ of 3.35, outperforming prior causal baselines such as aTENNuate (3.27 at 46.5 ms). Increasing lookahead to 75.0 ms raises PESQ to 3.43, preserving 93-95% of the quality of the non-causal upper bound (3.61 PESQ). Ablations confirm that disabling selective state updates causes catastrophic failure, degrading streaming PESQ by up to 2.09 points.

## Code

- https://github.com/yskim3271/LaCo-SENet

## Applications

Real-time speech communication systems such as telephony, video conferencing, hearing aids, and on-device voice interfaces requiring controllable tradeoffs between algorithmic latency and audio enhancement quality.

## Limitations

Real-time operation with an RTF below 1.0 requires chunk sizes of at least 7 to 12 frames, which introduces additional buffering latency.

## Related

- (link related pages by id as the wiki grows)
