---
id: fong26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1229
pdf: https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.pdf
---

# Towards Enabling Multilingual Multitask SpeechLLMs in Data-Scarce Settings

[PDF](https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/fong26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1229)

**TL;DR** — Bootstrapping linear projectors with high-resource ASR pretraining enables multilingual and multitask SpeechLLMs to perform effectively with under 5 hours of labeled data per task and language.

## Problem

Speech-based Large Language Models (SpeechLLMs) typically require massive datasets exceeding 100 million hours of audio or are heavily skewed toward high-resource languages, while prior work studies multilinguality and multitask learning in isolation. Adapting these models jointly to multiple tasks and languages under strict low-resource constraints—where only a few hours of data are available—remains unproven and poorly understood.

## Method

The architecture uses a frozen Whisper-large-v3-turbo speech encoder and a frozen EuroLLM-1.7B-Instruct LLM, connected by a trainable linear projection layer with 17.31M parameters downsampling speech representations by a factor of 5. The projection layer is first pretrained on high-resource CommonVoice ASR data (either a 200-hour monolingual Italian set or a 500-hour multilingual set across 5 languages) and subsequently finetuned using the SLAM-LLM multitask recipe. Finetuning uses task-specific text prompts across ASR, speech translation (ST), and topic identification (TID) on the SIB-Fleurs dataset, utilizing cross-entropy loss, dynamic frame batching, and a learning rate scheduler with a maximum of 10 epochs on an NVIDIA L40S GPU.

## Results

Evaluated on Italian, Spanish, Galician, Czech, and Finnish subsets of SIB-Fleurs with 3-5 hours of training data per task/language, comparing against a from-scratch baseline and Qwen2-Audio-7B-Instruct. Training from scratch fails catastrophically (WER of 129-162%, near-zero BLEU). In contrast, ASR-pretrained bootstrapping drastically improves performance (e.g., Italian WER drops from 129% to 5.4%, ST BLEU rises from 0.8% to 48.2%, and TID accuracy increases from 71.8% to 81.5%). Zero-shot cross-lingual transfer degrades as linguistic distance from the source language increases, and zero-shot cross-task generalization completely fails without explicit supervision (e.g., 0% accuracy on unseen topic identification).

## Code

- https://github.com/X-LANCE/SLAM-LLM

## Applications

Speech and ML engineers building low-resource, multilingual conversational systems or speech-to-text translation and classification applications can use this approach to adapt large models using minimal supervised target data.

## Limitations

The study evaluates only three tasks (ASR, speech translation, topic identification) and is restricted to five European language families.

## Related

- (link related pages by id as the wiki grows)
