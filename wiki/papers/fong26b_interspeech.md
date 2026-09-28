---
id: fong26b_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1229
---

# Towards Enabling Multilingual Multitask SpeechLLMs in Data-Scarce Settings

**TL;DR** — Bootstrapping a multilingual, multitask speech-LLM from an ASR-pretrained projector, then fine-tuning on just 3-5 hours per task and language, gets useful speech translation and topic classification performance in low-resource settings — but only for tasks the model has already seen.

## Problem

Prior work studies multilinguality and multitask learning for speech-LLMs separately, or leans on large training corpora, leaving open whether cross-lingual transfer from high-resource ASR pretraining also helps multitask SpeechLLMs under real data scarcity.

## Method

The authors bootstrap multilingual multitask SpeechLLMs from ASR-pretrained projectors and fine-tune with only 3-5 hours of labeled data per task and language, extending beyond ASR to speech translation and topic classification.

## Results

Cross-lingual performance depends heavily on language similarity, and while bootstrapped models generalize well to unseen languages within a trained task, zero-shot generalization does not extend to genuinely unseen tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building multilingual speech-LLM-based assistants for translation and topic classification in languages and tasks where labeled data is scarce.

## Related

- (link related pages by id as the wiki grows)
