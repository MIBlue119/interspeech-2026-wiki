---
id: buitrago26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2745
---

# Quantifying Cross-Lingual Transfer in Paralinguistic Speech Tasks

**TL;DR** — A new "Cross-Lingual Transfer Matrix" reveals that paralinguistic tasks like gender ID and speaker verification are more language-dependent than commonly assumed.

## Problem

Paralinguistic tasks are often treated as language-agnostic since they rely on acoustic rather than lexical cues, but prior studies hint at cross-lingual performance drops without offering a systematic, comparable way to measure this across languages and tasks.

## Method

The authors propose the Cross-Lingual Transfer Matrix (CLTM), a systematic method to quantify how fine-tuning on a "donor" language affects performance on a "target" language, and apply it to gender identification and speaker verification using a multilingual HuBERT-based encoder.

## Results

Finds distinct, systematic, language-dependent transfer patterns across the two tasks and multiple languages, showing paralinguistic performance is not as language-agnostic as often assumed.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs data-selection and fine-tuning strategies when building multilingual paralinguistic systems (speaker verification, gender/demographic ID) with uneven per-language labeled data.

## Related

- (link related pages by id as the wiki grows)
