---
id: thebaud26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2670
pdf: https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.pdf
---

# Speaker Verification with Speech-Aware LLMs: Evaluation and Augmentation

[PDF](https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2670)

**TL;DR** — The paper investigates speaker verification in speech-aware LLMs, showing that off-the-shelf models perform poorly (EERs > 20%), whereas injecting frozen ECAPA-TDNN embeddings with LoRA adapters reduces the Equal Error Rate to 1.03% on VoxCeleb1-E.

## Problem

Modern speech-aware large language models primarily focus on linguistic content, speech recognition, and coarse paralinguistic classification like emotion or gender, leaving it unclear if they encode fine-grained speaker identity. Evaluating this is difficult because closed-weight models only provide text outputs, and open-weight models lack native speaker discrimination capabilities. Addressing this gap enables unified architectures capable of high-level reasoning and low-level acoustic biometric tasks without separate speaker verification pipelines.

## Method

The authors propose a model-agnostic evaluation protocol using confidence scores (0-100) for API models and log-likelihood ratios (LLR) over Yes/No tokens for open-weight models. To augment LLMs with automatic speaker verification (ASV), they inject frozen ECAPA-TDNN speaker embeddings (trained on VoxCeleb2-dev) into the model via a learned linear projection connector. They apply parameter-efficient fine-tuning using LoRA adapters on two backbone architectures, TinyLLaMA-1.1B and Ministral3-3.3B, trained for 50 epochs via next-token prediction on target and non-target pairs from VoxCeleb2-dev.

## Results

Evaluated on VoxCeleb1 (Original, Extended, and Hard splits) against an ECAPA-TDNN cosine baseline (0.89%/0.45%/0.96% EER), off-the-shelf speech-aware LLMs like GPT-4o-audio and Gemini yield poor EERs ranging from 22.62% to over 45%. In contrast, the proposed SA-TinyLLaMA achieves 1.87% EER on Vox1-O, 1.03% on Vox1-E, and 2.20% on Vox1-H. Ablations demonstrate that freezing the LLM backbone entirely and only training the connector degrades performance to 5.48% EER on Vox1-O, confirming the necessity of LoRA adaptation. Training on a smaller 10% subset of VoxCeleb2-dev (VoxCeleb2-dev-XS) yields 3.57% EER on Vox1-O.

## Code

- https://github.com/thomasthebaud/ASV-with-SpeechLLMs

## Applications

Speech engineers and developers building conversational AI assistants, biometric authentication systems, and multimodal dialogue agents that require joint linguistic reasoning and speaker identity verification.

## Limitations

Confidence-based scoring for closed APIs suffers from parsing failures and coarse granularity, and the computing cost for training and inference remains orders of magnitude higher than traditional dedicated ASV systems.

## Related

- (link related pages by id as the wiki grows)
