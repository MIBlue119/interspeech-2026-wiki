---
id: lee26q_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1787
---

# PhonePrune: One-shot Phoneme-Aware Pruning for Large-scale ASR Models via Phoneme Set Generation and Calibration

**TL;DR** — Preserving weights tied to fine phonetic distinctions during one-shot pruning cuts word error rate by over 13% versus Distil-Whisper on Korean and Japanese at 50% sparsity.

## Problem

One-shot pruning compresses large ASR models but conventional methods indiscriminately discard low-magnitude weights, which can include parameters critical for fine-grained phonetic distinctions, degrading accuracy.

## Method

The authors frame the delicate weight sub-networks as a "Phoneme Ticket Hypothesis" that must be preserved, and propose PhonePrune, which preserves these weights through phoneme set generation and phoneme-aware calibration during pruning.

## Results

At 50% sparsity on LibriSpeech and Common Voice (English, Korean, Japanese), PhonePrune yields 13.41% and 13.83% relative word error rate reductions over Distil-Whisper on Korean and Japanese respectively, by preserving fragile parameters tied to language-specific acoustic cues.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Compressing large multilingual ASR models for deployment while preserving accuracy on languages with fine phonetic distinctions, such as Korean and Japanese.

## Related

- (link related pages by id as the wiki grows)
