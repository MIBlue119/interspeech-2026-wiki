---
id: azeemi26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1382
---

# Dissecting ASR Failures in Low-Resource South Asian Languages

**TL;DR** — A detailed error analysis of five multilingual ASR systems on Urdu, Punjabi, Pashto, and Sindhi finds that script confusion, not just data scarcity, is a leading cause of failure, and shows a cheap post-processing fix that recovers much of the lost accuracy.

## Problem

Urdu, Punjabi, Pashto, and Sindhi share closely related Perso-Arabic scripts, unstandardized spelling, and mixed-script named entities, all of which make them unusually hard for ASR even though they are spoken by over 350 million people.

## Method

The authors evaluate five multilingual ASR models against an 11-category error taxonomy across two benchmarks, then test a transliteration post-processing step to correct systematic script-level errors.

## Results

Script confusion drives most of one popular model's errors on three of the four languages; the best model (SeamlessM4T) still only reaches 16.3% WER on Urdu and 22.1% on Punjabi; cross-language contamination hits up to 35% of characters in lower-resource languages; and transliteration post-processing recovers up to 25 WER points without retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides ASR vendors and researchers building speech systems for South Asian and other Perso-Arabic-script languages toward script-aware evaluation and cheap accuracy fixes.

## Related

- (link related pages by id as the wiki grows)
