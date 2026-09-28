---
id: kang26b_interspeech
category: source-separation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3246
pdf: https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.pdf
---

# What Do Neural Networks Learn for TDOA Estimation? A Cross-Architecture Probing Study

[PDF](https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kang26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3246)

**TL;DR** — A probing study across MLP, CNN, and Transformer architectures reveals that neural networks for TDOA estimation learn cross-power computation and magnitude-aware frequency weighting while consistently bypassing PHAT whitening.

## Problem

Generalized cross-correlation with phase transform (GCC-PHAT) is widely used for sound source localization, but its mandatory PHAT whitening step normalizes frequency magnitudes and can discard valuable reliability information under noisy and reverberant conditions. While neural networks outperform classical GCC-PHAT, their internal computational strategies have remained a black box. Understanding these internal representations is critical for designing principled hybrid and end-to-end speech localization pipelines without information bottlenecks.

## Method

The authors analyze three architectures: an MLP-per-bin (8.8k and 133k parameters) for per-frequency isolation, a 1D-CNN (129k parameters) for local cross-frequency mixing, and a Transformer (209k parameters) utilizing global self-attention. Networks process 4-dimensional narrowband STFT observation vectors per frequency bin and output a scalar delay estimate. Using linear representation probing (Ridge regression) with exact algorithmic targets derived from GCC-PHAT steps (cross-power, PHAT phase, and magnitude), gradient-based attribution, and single-bin causal frequency masking, the authors evaluate how intermediate variables emerge across layers.

## Results

Evaluated on synthetic dual-channel signals with white/colored noise, LibriSpeech simulated channel data, and the LOCATA Challenge Task 1 real multi-channel recordings. Cross-power computation and a magnitude-aware frequency weighting consistently emerge across architectures, while PHAT phase decodability remains near zero (R2 <= 0.21). Removing PHAT whitening entirely—for both classical pipelines and neural GCC architectures—improves performance under additive noise, yielding up to a 52% MAE reduction in neural networks. On real-world LOCATA recordings, end-to-end Transformers achieve 2.4x lower MAE (5.75) compared to classical methods by learning data-adaptive weights.

## Code

- https://github.com/york1to/cross-power-is-all-you-need

## Applications

Speech and machine learning engineers designing microphone array processing systems, sound source localization, mobile robotics, hearing aids, and meeting transcription tools.

## Limitations

The evaluation targets assume a single sound source, and the probing framework's performance degrades as reverberation time (T60) increases.

## Related

- (link related pages by id as the wiki grows)
