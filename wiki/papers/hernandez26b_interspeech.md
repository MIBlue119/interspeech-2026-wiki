---
id: hernandez26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2735
---

# Multilingual Phonological Feature Recognition with Self-Supervised Speech Models

**TL;DR** — PhonoQ-2.0 predicts a structured 22-dimensional phonological feature vector per frame directly (instead of deriving features from phonemes), improving macro-F1 by nearly 9 points over a CTC phoneme baseline and generalizing better to unseen languages.

## Problem

Phonological features offer a language-general, linguistically grounded representation of speech, but existing systems usually derive them indirectly from phoneme outputs rather than predicting them directly.

## Method

PhonoQ-2.0 is a multilingual frame-level phonological feature recognizer built on self-supervised speech models that directly predicts a structured 22-dimensional feature vector per frame (manner, vowel quality, place, voicing), using a manner-conditioned gating mechanism to keep predictions phonologically coherent.

## Results

Across multiple languages and corpora, PhonoQ-2.0 reaches 91.3% in-domain and 88.9% out-of-domain macro-F1, gaining +8.8/+8.6 F1 over a CTC phoneme baseline, and improves unseen-language macro-F1 from 66.9% to 73.6% (up to +10.8 points).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful as a language-agnostic front-end for low-resource ASR, pronunciation assessment, or any downstream task needing fine-grained articulatory feature recognition without per-language phoneme inventories.

## Related

- (link related pages by id as the wiki grows)
