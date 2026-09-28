---
id: polok26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-443
---

# Mind the Gap: Impact of Synthetic Conversational Data on Multi-Talker ASR and Speaker Diarization

**TL;DR** — A systematic study of synthetic conversational data recipes for multi-talker ASR and diarization, showing the optimal simulation choices are task-dependent and that mixing synthetic with real data beats either alone.

## Problem

Multi-talker ASR and speaker diarization rely on synthetic data to address scarce large-scale conversational recordings, but the impact of specific simulation choices on downstream performance is poorly understood.

## Method

Introduces FastMSS, an efficient open-source conversational-mixture simulator, and studies turn-taking dynamics, source domain, acoustic augmentation, and data mixing strategies for leading multi-talker ASR (DiCoW) and diarization (Sortformer) systems.

## Results

Optimal simulation recipes are highly task-dependent, more overlap helps ASR but hurts diarization, broad source diversity beats exact domain matching, synthetic-only training approaches real-data baselines, and combining simulated with real recordings yields substantial gains over real-only training on both tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides synthetic-data generation strategy for teams building multi-talker ASR and diarization systems with limited real conversational data.

## Related

- (link related pages by id as the wiki grows)
