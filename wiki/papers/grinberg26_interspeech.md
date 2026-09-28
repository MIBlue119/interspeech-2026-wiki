---
id: grinberg26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-759
pdf: https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.pdf
---

# ALARM: Audio–Language Alignment for Reasoning Models

[PDF](https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-759)

**TL;DR** — The paper introduces ALARM, a multi-encoder audio-language model with a self-rephrasing training strategy that adapts reasoning LLMs for audio tasks, achieving top-tier open-source performance on speech and audio reasoning benchmarks.

## Problem

Standard audio-language model self-generation techniques fail for reasoning LLMs (RLMs) because their built-in chain-of-thought traces expose textual input surrogates, leading to unnatural responses. Additionally, relying on automatic speech recognition (ASR) modules introduces errors from background noise and voice activity detection failures, while naive feature concatenation across multiple encoders incurs high computational overhead.

## Method

The authors propose a two-stage self-rephrasing method using a frozen reasoning LLM (Qwen3-4B-Thinking-2507) to rewrite text-conditioned responses into audio-grounded variants without distribution mismatch. To eliminate ASR dependency, they fuse four domain-specific audio encoders (Whisper, W2V-BERT-2.0, MuQ, and SSLAM) using three token-compression and fusion variants based on cross-attention and Perceiver modules (ALARM-CA, ALARM-P, and ALARM-E). They train a 4B-parameter model on a newly curated 6M-instance multi-task corpus spanning 19K hours of speech, music, and general audio.

## Results

Evaluated on audio reasoning benchmarks, the 4B-parameter ALARM-E model achieves the best open-source result on the MMAU-speech and MMSU benchmarks, ranking third overall among all evaluated models including closed-source systems. The approach matches or exceeds larger models while preserving the backbone LLM's text capabilities at a lower training cost.

## Code

- https://github.com/Blinorot/ALARM

## Applications

Engineers and researchers building multimodal conversational agents, audio-reasoning assistants, and general audio-understanding systems that require robust processing of speech, music, and environmental sounds.

## Limitations

Long reasoning chains increase computational cost during response generation, requiring a thinking budget token limit as a speed-quality trade-off.

## Related

- (link related pages by id as the wiki grows)
