---
id: gopal26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2446
pdf: https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.pdf
---

# Language-Aware Distillation for Multilingual Instruction-Following Speech LLMs with ASR-Only Supervision

[PDF](https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gopal26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2446)

**TL;DR** — The paper introduces language-aware distillation with a query bank and gating network to train multilingual Speech LLMs using only ASR data, achieving a 14% improvement in instruction-following over matched baselines.

## Problem

Scaling alignment-based Speech LLMs to multilingual settings causes language interference and performance drops because a single static Q-Former query sequence cannot capture diverse phonetic and semantic nuances. Without this, training multilingual models typically demands massive, costly supervised fine-tuning or task-specific synthetic corpora that suffer from uneven resource distribution and catastrophic forgetting.

## Method

The architecture keeps the Whisper-large-v3 speech encoder and the Llama-SEA-LION-v3-8B-IT text LLM completely frozen, while training a lightweight Q-Former projector conditioned by a query bank and a gating network. The gating network—implemented as either a convolutional LID-style network or an attention-pooling MLP—dynamically selects or softly mixes language-specific query tokens from a learnable bank. Training is guided by a combination of language identification (LID) loss, input distillation loss matching transcript-derived LLM input embeddings, and output distillation loss matching final LLM hidden states under speech versus transcript conditioning. A scheduled teacher-forcing strategy anneals language label supervision from 1 to 0 over the first 50% of training steps using a cosine schedule.

## Results

Trained exclusively on 5,870 hours of annotated ASR data spanning 6 languages (English, Vietnamese, Indonesian, Mandarin Chinese, Spanish, and German) across corpora such as Common Voice, ViVoice, YODAS2, and MagicData. Evaluated on open-ended instruction-following (AlpacaEval-zh, AudioBench subsets, and translated Indonesian prompts) and a newly introduced close-ended spoken QA benchmark, Audio-MLQA, built from MLQA text contexts using high-quality TTS. The proposed approach demonstrates a 14% gain over matched multilingual distillation baselines on instruction following and a 32% improvement over existing Speech LLM baselines on Audio-MLQA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building multilingual voice assistants, spoken conversational agents, and cross-lingual spoken question-answering systems for low-resource and high-resource languages alike.

## Related

- (link related pages by id as the wiki grows)
