---
id: park26i_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3079
pdf: https://www.isca-archive.org/interspeech_2026/park26i_interspeech.pdf
---

# Word-level Emotional Intensity Control in TTS via Emotion Residual Vectors

[PDF](https://www.isca-archive.org/interspeech_2026/park26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3079)

**TL;DR** — This paper introduces emotion residual vectors (ERVs) derived from self-supervised speech representations to enable continuous, word-level emotional intensity control in text-to-speech synthesis while preserving perceptual naturalness.

## Problem

Traditional emotional text-to-speech models typically rely on utterance-level conditioning, which can misallocate word-level prosodic prominence and cause unnatural emphasis. Although existing fine-grained word-level control methods allow per-word adjustments, they often induce local prosodic distortions like abrupt pitch shifts or duration anomalies, degrading perceptual naturalness.

## Method

The framework utilizes a three-stage pipeline: pretraining a FastSpeech2 backbone with utterance-level emotion conditioning, freezing the backbone to train a Residual Injection Module (RIM) that maps bottlenecked ERVs into additive hidden-state offsets, and fine-tuning a RoBERTa-based predictor to infer projected ERVs from text and target emotions. ERVs are computed as word-aligned residual vectors between parallel neutral and emotional speech instances using WavLM-Base features (layers 7–12, 768-dimensional). The residual space is compressed via a learned linear bottleneck projection (default dimension $a=32$) and modulated by a LayerNorm layer and word-level control weights during synthesis.

## Results

Evaluated on the English subset of the Emotional Speech Database (ESD, 10 speakers, 5 emotions), the proposed method achieved an NMOS of 3.83 and EMOS of 3.56, outperforming baselines like EME-TTS (EMOS 2.97) and HED-TTS (EMOS 2.90) while nearly matching the unconditional FastSpeech2 baseline (3.78 NMOS). Objective evaluation showed a top emotion classification accuracy (Emo.Acc.) of 0.71 with an UTMOS of 3.75, matching or exceeding prior controllable models. In A/B preference tests for naturalness on highlighted-word emphasis, the proposed method was preferred over EME-TTS (55.3% vs 28.0%) and HED-TTS (87.1% vs 5.4%).

## Code

- https://jjhh0210.github.io/EmoRes-tts-demo/

## Applications

Speech engineers and developers building expressive conversational agents, virtual assistants, or audiobook narration tools requiring fine-grained, word-specific emotional intensity control.

## Limitations

The approach relies on parallel, word-aligned neutral-emotional utterance pairs for extracting emotion residual vectors.

## Related

- (link related pages by id as the wiki grows)
