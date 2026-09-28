---
id: koluguri26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-728
---

# Preference-ASR: A Preference-Aware Test Set for Benchmarking ASR in the Era of Speech LLMs

**TL;DR** — A new benchmark checks whether ASR/speech-LLM systems actually follow user instructions about output formatting (numbers, casing, disfluencies, entities), and shows model rankings shift a lot depending on which preference is asked for.

## Problem

Popular ASR test sets use inconsistent conventions for numbers, disfluencies, entities, and casing, and standard text normalizers erase exactly the formatting distinctions users care about, so current benchmarks can't measure whether a model actually follows user preferences for output style.

## Method

The authors introduce Preference-ASR, a test set built from seven open-source corpora via a two-stage LLM-assisted pipeline with human verification, that evaluates ASR systems on following natural-language preference instructions across four categories (normalization, entities, disfluencies, case), scored with a preference-aware normalizer that selectively skips steps matching the active instruction.

## Results

Benchmarking four models shows rankings shift across preference types, exposing quality differences that traditional evaluation protocols obscure.

## Code

Dataset reported as publicly released by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Evaluating and selecting speech-LLM-based ASR systems for products that need to respect user formatting preferences (e.g. transcription apps, dictation tools).

## Related

- (link related pages by id as the wiki grows)
