---
id: choi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-698
pdf: https://www.isca-archive.org/interspeech_2026/choi26_interspeech.pdf
---

# Systematic PTQ Study of Integer and Floating-Point Formats for On-Device Whisper ASR

[PDF](https://www.isca-archive.org/interspeech_2026/choi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/choi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-698)

**TL;DR** — This paper presents the first systematic post-training quantization (PTQ) study of Whisper ASR across 80+ configurations, demonstrating that NVFP4 W4A16 achieves near-lossless accuracy at 6.4x compression.

## Problem

While post-training quantization is standard for compressing transformer models, existing studies focus exclusively on decoder-only LLMs. Whisper's encoder-decoder architecture, mel-spectrogram inputs, and prominent activation outliers make it unclear whether these quantization recipes transfer successfully. Furthermore, the choice between integer and floating-point formats for on-device automatic speech recognition remains underexplored.

## Method

The authors perform an extensive sweep across 80+ PTQ configurations using Whisper tiny.en (39M) and base.en (74M) on LibriSpeech, evaluating integer formats (INT8, INT4, INT3) and floating-point formats (FP8, FP4, NVFP4, MXFP4). They apply SmoothQuant as a format-agnostic preprocessing method to mitigate activation outliers across linear layers in both encoders and decoders. Model performance is measured using FakeQuant to simulate hardware behavior across varying bit-widths, group sizes, and activation precisions.

## Results

Activation bit-width is found to be the dominant accuracy factor, where dropping activations from 16-bit to 8-bit costs 1-3% absolute WER, whereas INT16 and FP16 activations perform identically. For 4-bit weights, NVFP4 W4A16 achieves near-lossless accuracy (within 0.07% WER of full-precision FP32) at 6.4x compression on base.en. Conversely, MXFP4 degrades severely under standard PTQ due to the coarseness of its E8M0 power-of-two block scales relative to Whisper's weight distribution gaps.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers deploying speech recognition models on resource-constrained mobile, edge, or hearing-aid devices seeking optimal memory-accuracy tradeoffs.

## Limitations

Evaluations rely on FakeQuant simulation rather than native low-precision hardware execution, and weight-only methods like AWQ or GPTQ were left for future work.

## Related

- (link related pages by id as the wiki grows)
