---
id: sunder26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2441
pdf: https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.pdf
---

# Parameter-Efficient Adaptation of Speech-Aware LLMs for Timestamp Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sunder26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2441)

**TL;DR** — A parameter-efficient two-step speech LLM framework for word-level timestamp prediction achieves a 27ms alignment error in English (a 35% relative improvement over the best baseline) while maintaining transcription word error rates identical to the base model.

## Problem

Existing methods for speech recognition with timestamps (SRWT) either suffer from degraded transcription quality when interleaving timestamps in a single pass, or rely on separate alignment models that fail to integrate cleanly into speech LLMs. Furthermore, full fine-tuning of multi-task speech LLMs for timestamps risks degrading performance on core tasks and requires costly joint retraining. These limitations hinder efficient, modular deployment as speech LLMs scale to encompass broader functional capabilities.

## Method

The framework uses a two-step generation strategy within a single speech-aware LLM: the first step generates the transcription, and the second step regenerates it with interleaved word-level timestamps using a silence token to infer start times from preceding end times. The base speech-LLM comprises a 16-layer Conformer encoder, a 2-layer Q-Former projector, and a 1-billion parameter LLM with 40 transformer layers. The authors introduce three parameter-efficient adaptation variants using Low-Rank Adaptation (LoRA, rank r=64): (1) Non-Mod (continually fine-tuning projector and base LoRA), (2) Mod-LoRA (modular two-pass approach with separate frozen and trainable adapters), and (3) Mod-aLoRA (activated LoRA that keeps timestamp adapters dormant until an invocation token is encountered, enabling KV-cache reuse from the base model in a one-pass, two-step pipeline). Training data comprises multiple public corpora (e.g., LibriSpeech, MLS, CommonVoice, VoxPopuli, AMI, Switchboard, TIMIT, Buckeye, YODAS) filtered via MFA and CTC-based alignment error checks.

## Results

Evaluated on English and multilingual test sets using Accumulated Average Shift (AAS in ms) for timestamp accuracy and Word Error Rate (WER) for transcription quality. On English data, the Non-Mod model achieves an AAS of 27.1ms (a 35% relative improvement over Qwen3-FA at 41.8ms and 49% over CrisperWhisper at 53.1ms) with a 7.3% WER, matching the base speech-LLM. On multilingual data, Mod-aLoRA achieves an average AAS of 21.2ms and a 5.2% WER. In zero-shot cross-lingual evaluations where models are trained exclusively on English SRWT data, Mod-aLoRA achieves an average AAS of 37.3ms, drastically outperforming the Non-Mod baseline which yields 339.5ms AAS.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing speech-aware LLMs for closed captioning, keyword-based audio retrieval, and transcript synchronization applications.

## Related

- (link related pages by id as the wiki grows)
