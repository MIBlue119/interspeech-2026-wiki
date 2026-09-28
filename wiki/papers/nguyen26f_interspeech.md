---
id: nguyen26f_interspeech
category: speech-translation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1963
---

# PiDA: Phonetically-Informed Data Augmentation for Robust Vietnamese Speech Translation

**TL;DR** — Training with ASR-like phonetic-confusion corruptions improves Vietnamese speech translation on genuinely erroneous ASR output by up to 2 BLEU points.

## Problem

Cascaded speech translation systems suffer from error propagation when ASR produces incorrect transcripts, and for Vietnamese it was unclear what causes these substitution errors and how much they hurt downstream translation.

## Method

The authors give the first systematic categorization of ASR substitution errors for Vietnamese by phonetic cause, quantify their impact on downstream NMT with Linear Mixed-Effects Modelling, and propose Phonetically-Informed Data Augmentation (PiDA), which generates ASR-like corruptions by substituting words with phonetically similar alternatives using phonetic word embeddings.

## Results

Confirms most Vietnamese ASR substitution errors stem from phonetic confusion rather than random noise, and that these significantly degrade translation quality; fine-tuning on PiDA-augmented FLEURS Vietnamese-English improves translation of erroneous ASR output by up to +2.04 BLEU over standard fine-tuning while also slightly improving clean-text performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Making cascaded Vietnamese (and potentially other phonetically confusable languages) speech translation systems more robust to realistic ASR errors.

## Related

- (link related pages by id as the wiki grows)
