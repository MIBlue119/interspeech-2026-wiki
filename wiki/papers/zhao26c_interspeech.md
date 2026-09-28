---
id: zhao26c_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-601
pdf: https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.pdf
---

# HALO: Half-Frame-Rate Adaptive Learnable Operator for Lightweight STFT-Based Speech Enhancement

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-601)

**TL;DR** — The paper introduces HALO, a causal plug-in module that halves the internal frame rate of STFT-based speech enhancement models to eliminate temporal redundancy, improving PESQ by 0.1 and SI-SNR by 0.5 dB on the DNS3 dataset under matched compute.

## Problem

Traditional STFT-based speech enhancement relies on overlapping analysis frames to ensure stable signal reconstruction, but high overlap rates cause strong temporal correlation and redundant computations between adjacent frames. While lightweight neural architectures have reduced per-frame computation, they remain bottlenecked by this overlap-induced redundancy. Standard approaches like discarding alternate frames or naive decimation degrade speech quality because they fail to preserve crucial temporal dynamics and rapidly varying speech components.

## Method

HALO acts as a causal plug-in module consisting of a rate reduction operator before the backbone and a restoration operator afterward, running the backbone at half the frame rate while preserving the original full-rate STFT grid resolution. The reduction module groups adjacent frames and fuses them using a lightweight dynamic convolution conditioned on local time-frequency features via an attention-like gating branch (K=5 kernels, 8 hidden channels). The restoration module symmetrically reconstructs the two adjacent output frames from each half-rate frame without accessing future inputs, thereby preserving the original algorithmic latency. The computational budget saved by halving the internal sequence length is reallocated toward widening backbone channels for a cost-matched comparison.

## Results

Evaluated on the 3rd Deep Noise Suppression (DNS3) test set using 16 kHz audio, with models trained on 72,000 noisy-clean pairs. When applied to the GTCRN baseline under matched complexity (~32-33M MAC/s), HALO improves PESQ from 2.101 to 2.198, ESTOI from 0.754 to 0.769, and SI-SNR from 11.390 dB to 11.900 dB. Ablation studies demonstrate that replacing learnable adaptive operators with fixed-kernel convolutions or simple frame decimation leads to inferior PESQ (2.086 and 2.104 versus 2.198). HALO also yields consistent performance gains when integrated into various lightweight backbones including DPCRN variants, LiSenNet, and UL-UNAS.

## Code

- https://github.com/dddaniel-z/HALO

## Applications

Real-time, resource-constrained speech enhancement on edge devices and mobile hardware where computational complexity is bottlenecked by STFT frame processing.

## Limitations

HALO reduces the average computational cost but does not lower the peak per-step computation because the frame-rate restoration operator must generate two adjacent frames within a single inference step.

## Related

- (link related pages by id as the wiki grows)
