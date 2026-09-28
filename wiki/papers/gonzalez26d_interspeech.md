---
id: gonzalez26d_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-934
---

# Minimum Token Thresholds and Stabilisation for Reliable Automatic Vowel Alignment: Empirical Study on TIMIT Vowels and MFA

**TL;DR** — An empirical study of the Montreal Forced Aligner on TIMIT finds concrete minimum-token guidelines for reliable automatic vowel measurements, with duration stabilizing around 730 tokens and F2 needing roughly 2,335 tokens.

## Problem

Automatic forced alignment is standard in phonetic research, but the minimum amount of data needed for its acoustic measurements (duration, F1, F2) to be reliable relative to manual annotation remains unclear.

## Method

The authors incrementally sample token subsets from TIMIT vowels aligned by the Montreal Forced Aligner, using manual phoneme boundaries as gold standard, and fit mixed-effects models at each sampling step to compare automatic versus manual measurements.

## Results

85% of vowel-feature combinations improve significantly with more tokens, with F1 showing the most consistent gains; most vowels stabilize around 50% of available tokens, though duration stabilizes earliest (~730 tokens) while F2 needs the most data (~2,335 tokens).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Gives sociophonetic and low-resource-language researchers concrete data-collection guidelines for how many tokens are needed before trusting automatically aligned acoustic measurements.

## Related

- (link related pages by id as the wiki grows)
