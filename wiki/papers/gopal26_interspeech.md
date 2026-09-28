---
id: gopal26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2446
---

# Language-Aware Distillation for Multilingual Instruction-Following Speech LLMs with ASR-Only Supervision

**TL;DR** — A distillation technique that trains multilingual instruction-following speech LLMs using only ASR data, fixing the language interference that hurts prior single-projector approaches.

## Problem

Distilling instruction-following speech LLMs from ASR data alone works well in English, but degrades in multilingual settings because a single shared projector suffers language interference.

## Method

Introduces language-aware distillation with a query bank and gating network that lets a Q-Former projector select or mix query tokens per language, and builds Audio-MLQA, a multilingual spoken-QA benchmark built on MLQA with TTS-generated questions.

## Results

Gains 14% over matched multilingual distillation baselines on instruction following, and the best model beats existing speech LLM baselines by 32% on Audio-MLQA.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building multilingual voice assistants and spoken-QA systems without needing large task-specific multilingual speech corpora.

## Related

- (link related pages by id as the wiki grows)
