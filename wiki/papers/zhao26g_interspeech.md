---
id: zhao26g_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2159
pdf: https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.pdf
---

# MSpoofTTS: Multi-Resolution Spoof-Guided Inference for Discrete Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhao26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2159)

**TL;DR** — MSpoofTTS is a training-free inference framework for neural codec language models that uses multi-resolution spoof guidance to prune low-quality token candidates during decoding, improving perceptual quality without modifying model parameters.

## Problem

Neural codec language models generate speech autoregressively as discrete tokens, making them vulnerable to token-level accumulation errors and distributional drift that lead to audible artifacts and unnatural speech. While mitigation strategies typically rely on retraining with extra supervision or heuristic decoding-time adjustments, they either introduce high computational overhead or fail to globally assess token sequence naturalness.

## Method

The framework utilizes a pretrained NeuTTS model as a fixed base generator and introduces a multi-resolution token-level spoof detection module trained on LibriTTS data using binary cross-entropy objectives. It trains five Conformer-based discriminators (d_model=256, 4 layers, 8 attention heads) operating on contiguous segments of length 10, 25, and 50, alongside skip-sampled variants (r=2, 5) derived from 50-token segments. During generation, it integrates these detectors into a hierarchical decoding strategy combined with Entropy-Aware Sampling (EAS) to progressively prune low-quality beam candidates and re-rank hypotheses across coarse-to-fine temporal scales.

## Results

Evaluated on LibriSpeech, LibriTTS, and the phonetic stress-test dataset TwistList using Whisper-large-v3 WER, WavLM speaker similarity, NISQA, MOSNet, and human listening tests (MOS-N, MOS-Q, SMOS). On LibriTTS, the proposed MSpoofTTS (HierEAS) improves NISQA to 4.562 and MOSNet to 4.3409 compared to baseline Original sampling (NISQA 4.397, MOSNet 4.1879) while maintaining competitive word error rates and speaker similarity. On the TwistList benchmark, HierEAS achieves top perceptual quality scores (NISQA 4.513, MOSNet 3.9802) despite dense phonetic alliteration.

## Code

- https://github.com/neuphonic/neutts

## Applications

Speech/ML engineers and developers deploying neural codec language models for zero-shot text-to-speech synthesis who need to improve perceptual naturalness and audio quality at inference time without retraining.

## Limitations

The method introduces additional decoding-time computational overhead from running multiple Conformer-based discriminators across hierarchical beams during generation.

## Related

- (link related pages by id as the wiki grows)
