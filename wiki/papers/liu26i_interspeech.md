---
id: liu26i_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1192
pdf: https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.pdf
---

# Prosodic Boundary-Aware Streaming Generation for LLM-Based TTS with Streaming Text Input

[PDF](https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1192)

**TL;DR** — The paper introduces a prosodic-boundary-aware post-training strategy with sliding-window prompts for streaming LLM-based TTS, achieving a 66.2% absolute reduction in long-form word error rate.

## Problem

Streaming text-to-speech with incremental text input suffers from unnatural prosody because models lack future context lookahead, and experiences long-form performance collapse due to unbounded generation history and KV-cache growth. While prior methods use causal modifications or precise alignment annotations, this paper targets robust streaming using only weakly time-aligned data without changing the underlying architecture.

## Method

The approach adapts an existing LLM-based TTS model (CosyVoice2) using a dynamic boundary insertion strategy during post-training, where a special markerboundary token is inserted into text sequences based on word-level timestamps from WhisperX. During inference, text is ingested in chunks of k words with a lookahead of f future words, and a sliding-window prompt concatenates previous text and synthesized speech chunks to keep the KV cache bounded. Training utilizes the English subset of CommonVoice 13.0 (930k utterances), freezing the flow-matching module and HiFi-GAN vocoder while fine-tuning only the Qwen-based LLM.

## Results

Evaluated on Seed-TTS-Eval and an LLM-expanded long-form benchmark (280-320 words per paragraph), the method achieves a Time-to-First-Audio of 1296 ms and a Real-Time Factor of 0.782 using streaming vocoding. In long-text synthesis, it drastically reduces the word error rate from 71.0% (interleaved baseline) down to 4.8%, while improving speaker similarity (SPK-SIM) to 0.65 and emotion similarity (EMO-SIM) to 0.912. Ablation studies show that chunk sizes of k >= 3 maintain a standard-tier WER below 5%, though excessive lookahead relative to chunk size can degrade long-form performance.

## Code

- https://charlieliu331.github.io/Prosodic-Boundary-Aware-Streaming-Text-TTS/

## Applications

Interactive conversational dialogue systems and real-time speech-to-speech translation applications.

## Limitations

Performance is sensitive to the balance between chunk size and lookahead context, with excessively large lookahead relative to small chunks causing increased error rates.

## Related

- (link related pages by id as the wiki grows)
