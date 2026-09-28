---
id: metzger26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3271
---

# Scaling Human and G2P Supervision for Robust Phonetic Transcription

**TL;DR** — Finds that auto-generated G2P phonetic labels only help up to about 20-30 hours of human annotation, after which ASR pretraining is what actually drives further gains in robust phonetic transcription.

## Problem

Expert phonetic annotation is costly, especially for non-standard dialects and atypical speech, and it's unclear how much automatic Grapheme-to-Phoneme (G2P) supervision can substitute for scarce human annotation.

## Method

Studies how automatic phonetic transcription scales with human versus G2P supervision in English, using a curated 80-hour benchmark spanning native, non-native, and post-stroke speech, and separately evaluates ASR pretraining as an alternative lever.

## Results

Identifies a supervision-quality threshold: G2P supervision helps only below roughly 20-30 hours of human annotation and can even reduce cross-dialect robustness beyond it; ASR pretraining instead achieves a 2.3x reduction in weighted phone feature error rate over prior systems, with strong gains on non-native and aphasic speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides data and annotation budgeting for building robust phonetic transcription systems for atypical or non-native speech, including clinical (aphasia) applications.

## Related

- (link related pages by id as the wiki grows)
