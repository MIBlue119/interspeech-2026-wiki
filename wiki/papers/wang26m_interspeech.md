---
id: wang26m_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-787
---

# Position-Aware Target Speaker Extraction for Long-Form Multi-Party Conversations: A Diarization-Free Framework for ASR

**TL;DR** — Uses each speaker's stable direction of arrival as a spatial prior to extract per-speaker speech streams directly, skipping explicit diarization entirely for long multi-party meeting ASR.

## Problem

Long-form multi-party conversations have imbalanced speaker activity and frequent overlap, making "who spoke when and what" hard to determine; sliding-window continuous speech separation helps but suffers cross-window speaker inconsistency and residual crosstalk, typically still requiring diarization.

## Method

PATSE is a multi-channel Position-Aware Target Speaker Extraction front-end that uses direction-of-arrival (DOA) as a spatial prior, combining a DOA-guided spatial encoder and conditioner to generate speaker-attributed streams from which activity can be inferred via simple post-processing like VAD, without explicit diarization.

## Results

On both replayed and real conversations, PATSE yields consistent ASR gains, outperforming continuous speech separation and diarization-based pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-microphone meeting transcription systems needing accurate, diarization-free speaker attribution in long conversations.

## Related

- (link related pages by id as the wiki grows)
