---
id: saif26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2771
---

# BELLA: Efficient Bilevel Learning with LoRA for Multilingual ASR

**TL;DR** — BELLA couples a pretrained ASR encoder to an LLM decoder via a trainable bridge and mixture-of-experts LoRA modules for language specialization, formulating training as an efficient bilevel program that consistently beats strong multilingual ASR baselines while staying parameter-efficient.

## Problem

Multilingual ASR faces challenges from diverse linguistic structures and resource disparities across languages, and adapting large decoders efficiently per language without excessive parameters or cross-language interference is difficult.

## Method

BELLA couples a pretrained ASR encoder with an LLM decoder via a trainable bridge, using mixture-of-experts LoRA (MoE-LoRA) modules for language specialization guided by a router; training is formulated as a bilevel program where the upper level optimizes router and expert LoRA modules for task performance while the lower level updates the bridge and shared adapter for alignment, solved with an efficient single-loop, value-function-free penalty solver.

## Results

On five CoVoST 2 languages, BELLA shows consistent gains over strong multilingual ASR baselines while remaining parameter-efficient, scalable, and reducing cross-language interference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to production multilingual ASR systems that need to add language specialization efficiently without full model retraining per language.

## Related

- (link related pages by id as the wiki grows)
