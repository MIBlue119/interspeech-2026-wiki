---
id: srivastav26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1902
pdf: https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.pdf
---

# Open ASR Leaderboard: Towards Reproducible and Transparent Multilingual and Long-Form Speech Recognition Evaluation

[PDF](https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/srivastav26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1902)

**TL;DR** — The Open ASR Leaderboard provides a reproducible, community-driven benchmarking platform comparing 85+ open-source and proprietary ASR systems across 11 datasets, standardizing word error rate (WER) and inverse real-time factor (RTFx) evaluations.

## Problem

As the ecosystem of open-source and proprietary automatic speech recognition models, toolkits, and datasets expands, researchers and engineers lack a standardized, transparent way to compare accuracy and efficiency. Most existing benchmarks are narrowly focused on English short-form speech, ignoring critical challenges in multilingual and long-form audio. This fragmentation makes it difficult to select appropriate models or identify true baselines for comparison.

## Method

The platform standardizes evaluation pipelines across heterogeneous toolkits including ESPNet, NeMo, SpeechBrain, and Transformers, alongside commercial APIs and custom repositories. It evaluates three distinct tracks: short-form English (<30s), multilingual (German, French, Italian, Spanish, Portuguese), and long-form English (>30s). Text normalization pipelines remove punctuation, casing, filler words, and disfluencies to ensure fair comparisons across models with differing output formats. Performance is tracked using Word Error Rate (WER) for accuracy and inverse real-time factor (RTFx) on standardized NVIDIA A100 GPU hardware for inference speed.

## Results

Evaluating 86 systems from 26 organizations across 11 datasets revealed that Conformer-based encoders paired with large language model (LLM) decoders achieved the lowest average WER (e.g., Zoom Scribe v1 at 5.80% WER, Cohere Labs Transcribe at 5.84%), but lagged in speed. Conversely, connectionist temporal classification (CTC) and token-and-duration transducer (TDT) decoders delivered substantially higher throughput, with NVIDIA Parakeet TDT 0.6B v2 reaching an RTFx of 3386. Fine-tuned Whisper variants and models like Mistral Voxtral Small 24B outperformed vanilla OpenAI Whisper Large v3 on average WER.

## Code

- https://github.com/huggingface/open_asr_

## Applications

Speech and machine learning engineers looking to select, benchmark, or deploy open-source and proprietary ASR models for short-form, long-form, or multilingual production environments.

## Limitations

Absolute RTFx measurements depend on hardware configurations, and text normalization choices can influence absolute WER values while potentially masking differences in how models handle disfluencies.

## Related

- (link related pages by id as the wiki grows)
