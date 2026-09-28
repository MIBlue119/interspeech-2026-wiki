---
id: ghosh26f_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1461
pdf: https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.pdf
---

# MagpieTTS-LF: Inference-Time Long-Form Speech Generation Without Training on Long-Form data

[PDF](https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ghosh26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1461)

**TL;DR** — MagpieTTS-LF is an inference-time long-form text-to-speech generation framework that uses soft attention priors and stateful chunk propagation to eliminate prosodic drift and boundary artifacts without retraining the underlying model.

## Problem

State-of-the-art neural TTS and speech language models produce high-quality speech on short utterances (2-20 seconds), but degrade significantly when scaling to paragraph or multi-minute lengths. Naive sentence-level chunking and concatenation cause energy discontinuities, speech rate warbles, and intonation shifts, while sequence compression approaches sacrifice temporal resolution and intelligibility.

## Method

The method introduces three core components operating entirely at inference time on top of the MagpieTTS architecture: soft attention priors, a stateful chunk generation algorithm, and history-aware text encoding. Soft attention priors maintain non-zero weights on past and future token positions using a fixed weight vector and temperature scaling, encouraging monotonic alignment while avoiding hard cutoffs. The stateful chunk generation algorithm preserves continuity by carrying over the final $K$ text tokens, their corresponding encoder hidden states, and the last attended attention prior states into the subsequent sentence chunk. Hyperparameters include $eps=0.1$, $w=(0.2, 0.8, 1.0, 0.8, 0.2)$, generation temperature of $0.7$, prior strength $\lambda=1.0$, and a classifier-free guidance (CFG) scale of $2.5$.

## Results

Evaluated on a curated 1-hour subset of the Long-Form HiFiTTS benchmark comprising 20 multi-minute passages, MagpieTTS-LF outperforms baselines including XTTS, Qwen3-TTS, and VibeVoice. It achieves superior intelligibility with a Word Error Rate (WER) of 0.025 and Character Error Rate (CER) of 0.012, compared to 0.051/0.035 for Qwen3-TTS and 0.115/0.105 for VibeVoice. For prosodic boundary consistency, MagpieTTS-LF achieves an energy discontinuity ($\Delta$ Energy) of 14.04 dB, which is roughly half that of competing models (28.90 to 30.62 dB). It also maintains stable speaker similarity (measured via TitaNet and WavLM embeddings) and consistent UTMOSv2 naturalness scores across extended multi-minute generations without performance drift.

## Code

- https://github.com/NVIDIA-NeMo/NeMo

## Applications

Speech engineers and developers building long-form audiobook generation, automated podcast narration, or text-to-speech pipelines that require consistent multi-minute speaker identity and prosody.

## Related

- (link related pages by id as the wiki grows)
