---
id: dey26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3115
---

# Rethinking Organization Entity Modeling in End-to-End Acoustic Named Entity Recognition

**TL;DR** — A Whisper-based acoustic NER framework tackles the specific weak point of organization-name detection through targeted data augmentation and a span-consistency training objective.

## Problem

End-to-end acoustic named entity recognition avoids cascaded ASR-NER error propagation, but organization entities are especially hard to detect due to multi-word spans, acronyms, and lexical variability, and standard cross-entropy training doesn't adequately capture these span dependencies.

## Method

The authors combine an organization-aware Whisper-based acoustic NER framework with LLM-generated targeted semantic data augmentation, category-specific boundary supervision, and a structure-constrained entity learning (SCEL) objective that enforces entity span consistency during decoding.

## Results

Yields substantial improvements in organization-entity recognition while keeping ASR accuracy strong, outperforming several existing approaches on entity recognition specifically.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants and transcription/analytics pipelines (meeting transcripts, customer calls) that need reliable extraction of organization names from speech.

## Related

- (link related pages by id as the wiki grows)
