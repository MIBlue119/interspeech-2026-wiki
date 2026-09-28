---
id: thebaud26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2670
---

# Speaker Verification with Speech-Aware LLMs: Evaluation and Augmentation

**TL;DR** — Speech-aware LLMs turn out to encode speaker identity weakly (EER above 20% on VoxCeleb1), but injecting frozen ECAPA-TDNN speaker embeddings through a learned projection with LoRA fine-tuning lets a 1.1B-parameter LLM reach 1.03% EER, approaching dedicated speaker verification systems while keeping a natural-language interface.

## Problem

Speech-aware LLMs accept speech input but are trained mostly for linguistic content or specific attributes (emotion, gender), leaving it unclear whether they encode speaker identity well enough for verification.

## Method

The authors propose a model-agnostic scoring protocol producing continuous verification scores from Yes/No token confidence or log-likelihood ratios for both API-only and open-weight models, benchmark recent speech-aware LLMs with it, then introduce a lightweight augmentation that injects frozen ECAPA-TDNN speaker embeddings through a learned projection into the LLM while training only LoRA adapters.

## Results

Recent speech-aware LLMs show weak speaker discrimination (EER above 20% on VoxCeleb1), but the augmented ECAPA-LLM built on TinyLLaMA-1.1B achieves 1.03% EER on VoxCeleb1-E, approaching a dedicated speaker verification system while preserving a natural-language interface.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for adding accurate speaker verification capability to conversational speech-LLM assistants without abandoning their natural-language interaction interface.

## Related

- (link related pages by id as the wiki grows)
