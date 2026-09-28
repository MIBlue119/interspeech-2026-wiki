---
id: choi26f_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2221
---

# IPA-Guided Dual Transcription for Data-Centric Speech Corpus Refinement

**TL;DR** — A data-cleaning pipeline that uses phoneme (IPA) transcriptions alongside orthographic text to fix inconsistent spoken-written alignment in speech corpora, boosting downstream ASR.

## Problem

Speech corpora need consistent alignment between audio and written text, but the many-to-many mapping between spoken sounds and spelling introduces ambiguity and inconsistent transcriptions that degrade downstream models.

## Method

Combines a phoneme-intermediate speech-to-text model that outputs both IPA and orthographic text with a fine-tuned LLM that generates consistent spoken-written pairs, grounding normalization in phonetic realization rather than text alone.

## Results

Iterative corpus refinement using this IPA-guided dual transcription yields substantial improvements in text normalization and domain ASR performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Building cleaner training corpora for domain-specific or low-resource ASR systems.

## Related

- (link related pages by id as the wiki grows)
