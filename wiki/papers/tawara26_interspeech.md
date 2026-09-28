---
id: tawara26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2912
---

# Who Spoke What When? Evaluating Spoken Language Models for Conversational ASR with Semantic and Overlap-Aware Metrics

**TL;DR** — A systematic comparison shows LLM-based conversational ASR is competitive with two speakers but degrades faster than modular pipelines as speaker count and overlap increase, revealed by new semantic- and overlap-aware metrics.

## Problem

Conversational ASR remains hard due to overlapping speech, far-field noise, and varying speaker counts, and while recent LLM-based systems do well on single-speaker benchmarks, their robustness in multi-speaker settings and their true error impact (beyond raw WER) is unclear.

## Method

The authors systematically compare LLM-based and modular pipeline conversational ASR approaches along four axes (overlap robustness, semantic fidelity, speaker count, single- vs. multi-channel input), introducing tcpSemER, which extends tcpWER by replacing Levenshtein distance with embedding-based semantic similarity to capture meaning-altering errors, and decompose tcpWER into overlapping and non-overlapping components.

## Results

Across three datasets, LLM-based systems are competitive in two-speaker settings but degrade as speaker count and overlap increase, while modular pipeline approaches remain more robust in those harder conditions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Choosing between LLM-based and modular ASR architectures for multi-speaker conversational transcription systems (meetings, call centers), and more informative evaluation of such systems.

## Related

- (link related pages by id as the wiki grows)
