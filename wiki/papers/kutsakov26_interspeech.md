---
id: kutsakov26_interspeech
category: speech-llm-dialogue
institutions: ["SaluteDevices"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2343
pdf: https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.pdf
---

# GigaChat Audio: Time-aware Large Audio Language Model

*Aleksandr Kutsakov, Mariia Sadovina, Georgii Gospodinov, Alexandr Maximenko, Oleg Kutuzov, Pavel Bogomolov, Fyodor Minkin*

[PDF](https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kutsakov26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2343)

**Category:** `speech-llm-dialogue`

**TL;DR** — GigaChat Audio is a 10B-parameter time-aware audio LLM that processes up to 120-minute recordings by interleaving periodic timestamp markers with continuous audio tokens, achieving 53.8 mIoU on 20-40 minute temporal grounding tasks.

## Key contributions

- Released an open-weight time-aware audio LLM supporting up to 120-minute inputs with explicit timestamped outputs and summaries.
- Introduced a 10k+ hours temporal dataset spanning seconds-to-hours recordings with annotations for temporal QA and time-anchored summarization.
- Proposed a cascaded synthetic data pipeline using transcript slicing, verification, and multi-sampling aggregation to eliminate front-loading bias in long-form generation.
- Demonstrated through extensive ablations that temporal models require duration-mixture training for length generalization and periodic temporal anchors to prevent performance collapse on long inputs.

## Problem

Long-form audio recordings like meetings and lectures require precise temporal grounding so users can jump directly to supporting evidence, but existing open and proprietary audio LLMs fail to emit reliable timestamps or maintain accuracy beyond a few minutes. Prior models produce non-parseable timestamps or coarse references because time is not naturally represented in standard audio token streams, and models trained exclusively on short audio cannot extrapolate to long contexts. This gap prevents robust, verifiable, interactive audio navigation and long-form information retrieval.

## Method

GigaChat Audio couples an encoder-subsampler-projector audio front-end with a 10B-parameter MoE text checkpoint (256k context) featuring FlashAttention. The audio encoder processes chunks of 8 seconds with a 40 ms stride, yielding continuous embeddings aligned to the text space at a 160 ms frame rate. Audio encoder pretraining uses a HuBERT-like distillation setup over 2M hours of unlabeled multilingual audio with KMeans targets, while base post-training covers captioning, dialogue, emotion recognition, and multilingual ASR.

To establish temporal awareness, periodic inter-timing markers (plain-text hh:mm:ss timestamps) are inserted into the input token stream every 60 seconds (and appended at the end). During supervised fine-tuning, learning rates are fixed at lr_dec = 5e-6 and lr_enc = 1e-4. Synthetic supervision is generated from 16k hours of English YODAS2 data (filtered via SpeechBrain VoxLingua107 and silence thresholds) using a text-only GPT-OSS-120B model on ~10-minute transcript slices. A global verifier checks consistency against full transcripts, and evaluation sets use 5-way answer aggregation with median overlap filtering to isolate challenging cases.

## Experimental setup

Evaluated on AudioGrounding (7-10s clips), AMI Meeting Corpus (15-50 min), DCASE Audio QA (time-aware subset, 6-10s), and custom benchmarks spanning durations up to 120 minutes. Baselines include Qwen3-Omni-30B-A3B, TimeAudio, and Gemini 3 Flash. Metrics include mean Intersection over Union (mIoU), median absolute error (MAE) in seconds, and LLM-as-a-judge scores for fragment descriptions and timed summaries.

## Results

On 20-40 minute temporal grounding, the proposed model achieves 53.8 mIoU (outperforming Qwen3-Omni's 3.6 mIoU and Gemini 3 Flash's 56.1 mIoU), and improves to 65.2 mIoU when using a dense 7-second anchor frequency. Removing inter-timing markers entirely causes long-form mIoU to collapse from 53.8 down to 14.2 and spikes segment timing error (Rd) from 16.9% to 48.4%. TimeAudio fails on recordings longer than two minutes, demonstrating the necessity of duration-mixture training.

| System | TGr (20-40m mIoU ↑) | AMI MAE (↓) | DAQA MAE (↓) | Timed Summ AES (↑) |
|---|---|---|---|---|
| Qwen3-Omni-30B | 3.6 | 290.5s | 1.00s | 74.3 |
| Gemini 3 Flash | 56.1 | 1.00s | 0.90s | 91.3 |
| Ours (inter=60s) | 53.8 | 3.50s | 1.70s | 88.1 |
| Ours (inter=7s) | 65.2 | 1.50s | 1.70s | 89.2 |
| Ours (w/o inter-timings) | 14.2 | 66.0s | 3.20s | 87.5 |

## Limitations

The synthetic data pipeline relies heavily on English YODAS2 shards, bounding language coverage primarily to English. Evaluation of long-form summaries and fragment descriptions relies on LLM-as-a-judge protocols, which may inherit model biases. The approach requires careful tuning of the anchor token frequency to balance token overhead against temporal precision.

## Why read this

Researchers and engineers building long-form audio assistants will learn how to effectively inject explicit temporal anchors into LLM token streams and construct scalable synthetic grounding data without front-loading bias.

## Code

- https://huggingface.co/aisage/GigaChat3.1-Audio-10B-A1.8B

## Applications

Long-form meeting navigation, lecture timestamping, call center log analysis, and interactive audio question-answering interfaces.

## Institutions / 機構

SaluteDevices

## Related

- (link related pages by id as the wiki grows)
