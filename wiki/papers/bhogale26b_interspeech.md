---
id: bhogale26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3348
---

# Vimarsha: Faithful ASR Evaluation for Indian Languages with Demographic Diversity, In-the-Wild Audio and Spelling Variations

**TL;DR** — A 100-hour, 22-language benchmark that mixes realistic field recordings with a "lattice of variations" for valid spellings, revealing that ASR model rankings shift drastically under honest evaluation.

## Problem

Indian-language ASR benchmarks suffer from two opposing biases: optimistic scores from clean, controlled audio, and pessimistic scores from rigid transcription standards that penalize legitimate spelling and linguistic variation.

## Method

The authors build Vimarsha, a 100-hour benchmark spanning all 22 scheduled Indian languages, combining demographically diverse on-field recordings with acoustically difficult in-the-wild audio, plus a lattice-of-variations framework that encodes multiple valid transcriptions per utterance.

## Results

Evaluating 10 state-of-the-art ASR models on Vimarsha reveals substantial shifts in model rankings under realistic conditions, along with geographic and demographic performance disparities and systematic failures tied to speaking rate and acoustic environment.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and auditing Indian-language ASR systems before real-world, equity-sensitive deployment.

## Related

- (link related pages by id as the wiki grows)
