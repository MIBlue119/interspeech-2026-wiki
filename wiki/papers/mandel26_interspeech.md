---
id: mandel26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1663
---

# From A to B to A: Palindromic Zero-Shot Voice Conversion with Non-Parallel Data

**TL;DR** — Builds synthetic training pairs for voice conversion by KNN-retrieving WavLM segments that resemble a target speaker, then converting back, letting the model train on non-parallel, multilingual data despite being trained only on English.

## Problem

Voice conversion typically needs parallel or carefully aligned training data, which is hard to obtain across languages and speakers without explicit alignment.

## Method

The authors retrieve target-like source segments via K-Nearest Neighbors search over WavLM representations to build synthetic input/output training pairs (synthetic input, real target output) without requiring parallel corpora, and add a speaker loss from a pretrained speaker verification model to keep target-speaker identity consistent.

## Results

Trained exclusively on English data, the approach achieves high naturalness and strong speaker similarity across multiple languages, outperforming competitive voice-conversion baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multilingual zero-shot voice conversion without needing parallel or language-matched training corpora, useful for dubbing and cross-lingual voice cloning.

## Related

- (link related pages by id as the wiki grows)
