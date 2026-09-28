---
id: sedaghati26_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1771
pdf: https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.pdf
---

# VoxWatermark: A Large-Scale Benchmark for Audio Watermark Detection under Perturbations

[PDF](https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sedaghati26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1771)

**TL;DR** — VoxWatermark introduces a large-scale benchmark comprising 126k+ hours of audio across 25 languages to evaluate audio watermark detection under various distribution shifts and perturbations, accompanied by a robust baseline detector called AudioWMD.

## Problem

Current research on audio watermarking lacks a unified benchmark to systematically test detector-level performance under realistic distribution shifts and unknown embedding methods. Prior benchmarks mainly emphasize payload robustness and perceptual quality rather than open-world detection under diverse no-box, black-box, and white-box perturbations. Addressing this gap is critical for reliable source attribution, copyright accountability, and detecting malicious voice cloning or deepfakes.

## Method

The VoxWatermark dataset integrates 10 watermarking methods (4 neural: AudioSeal, WavMark, Timbre, Perth; and 6 traditional: LSB, QIM, Patchwork, Echo Hiding, Phase Coding, DSSS) applied to 25 languages and 126,513.89 hours of audio sourced from LibriSpeech, Common Voice, VCTK, and AISHELL-1. The benchmark incorporates a structured domain-mismatch perturbation protocol featuring 17 no-box signal processing distortions and codecs (e.g., EnCodec, Opus), black-box iterative estimation attacks (HopSkipJump, Square Attack), and gradient-based white-box removal and forgery attacks. To tackle these challenges, the authors propose AudioWMD, a two-stage baseline detector that feeds 16 kHz log-mel spectrograms into a ConvNeXtV2-style CNN base detector, extracts a 5-dimensional statistical vector from K=8 stochastic queries (comprising mean, standard deviation, range, positive occupancy ratio, and decision-flip ratio), and applies a logistic-regression meta-classifier.

## Results

Experiments demonstrate that injection-method diversity and distribution shifts severely impact detection stability, while validating the effectiveness of AudioWMD. The benchmark uses cross-lingual test sets (Common Voice excluding English and Chinese) and cross-accent test sets (VCTK) combined with unseen watermarking schemes like Patchwork, Echo, and WavMark. AudioWMD is evaluated against a reproduced single-query WMD baseline under fixed validation thresholds across all out-of-domain test sets to ensure strict generalization without test-time tuning.

## Code

- https://github.com/wailywang/VoxWatermark

## Applications

Speech engineers, platform moderators, and security developers building automated provenance verification systems to detect synthetic speech, prevent malicious voice impersonation, and enforce copyright accountability.

## Limitations

The benchmark scope is constrained by the specific set of 10 watermarking algorithms and three perturbation categories investigated, and performance relies on the fidelity of simulated transmission channels and adversarial attacks.

## Related

- (link related pages by id as the wiki grows)
