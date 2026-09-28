---
id: zhang26d_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-463
pdf: https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.pdf
---

# Dual-Encoder Fusion with Explicit and Implicit Injection for the Interspeech 2026 Audio Encoder Capability Challenge

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-463)

**TL;DR** — This paper evaluates dual-encoder fusion combining Whisper and Dasheng for the Interspeech 2026 Audio Encoder Capability Challenge, demonstrating that explicit residual injection yields the highest task-specific gains and best Track-B overall score of 0.446.

## Problem

Large Audio Language Models rely entirely on pre-trained audio encoders as front-ends to transform raw waveforms into representations consumed by LLMs. Single encoders like Whisper excel at speech semantics while models like Dasheng focus on general acoustic characteristics, creating complementary strengths that a single encoder cannot uniformly capture. Effectively combining these encoders requires addressing how complementary information is injected, controlled, and preserved without introducing destructive redundancy.

## Method

The authors study dual-encoder fusion using Whisper-Base and Dasheng-Base mapped to a 512-dimensional fusion space. They establish a stable backbone using token-wise softmax-gated residual fusion augmented with a lightweight STFT residual branch. Two injection mechanisms are explored: implicit injection via parameter-efficient LoRA adaptation (r=16, alpha=32) of Dasheng prior to fusion, and explicit injection via linear residual decomposition of Dasheng from Whisper with auxiliary reconstruction and cross-covariance decorrelation regularizations.

## Results

Evaluated across multiple classification and audio-language understanding tasks using the official AECC 'all' training recipe and XARES-LLM framework. The softmax-gated fusion with STFT residual achieves a Track A overall score of 0.701 and Track B of 0.442. Implicit injection achieves Track A overall of 0.706, while explicit injection achieves a Track B overall of 0.446 with stronger per-subtask peak performance on classification and understanding benchmarks like Clotho and MECAT.

## Code

- https://huggingface.co/yucongzh/implicit_

## Applications

Engineers building Large Audio Language Models or multi-modal speech systems seeking to combine diverse pre-trained audio encoder capabilities for joint speech and audio understanding tasks.

## Limitations

The study was constrained by time and compute to use the official AECC training data sampling ratio without exploring customized dataset mixes.

## Related

- (link related pages by id as the wiki grows)
