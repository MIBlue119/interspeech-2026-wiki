---
id: hasumi26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2293
---

# Aligning MusicLLM with Emotion using Instruction Tuning and Feedback-Driven Alignment

**TL;DR** — Shows that music LLMs can be taught to predict arousal/valence emotion scores, and that reward-based feedback alignment beats plain instruction tuning while preserving general music-QA ability.

## Problem

Music large language models perform well on music information retrieval tasks but were never explicitly trained for emotion regression (predicting arousal and valence), leaving their emotional prediction ability limited.

## Method

The authors train MusicLLMs for emotion regression using two strategies — instruction tuning and feedback-driven alignment with a verifiable numerical reward — and compare their effect on arousal/valence prediction accuracy and general MusicQA capability.

## Results

Instruction tuning alone gives limited but non-trivial emotion prediction accuracy, while feedback-driven alignment substantially improves both arousal and valence prediction over instruction tuning while preserving MusicQA performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Emotion-aware music recommendation, playlist generation, and music analysis tools built on music-understanding LLMs.

## Related

- (link related pages by id as the wiki grows)
