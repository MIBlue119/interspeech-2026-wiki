---
id: arumugam26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://www.isca-archive.org/interspeech_2026/arumugam26_interspeech.html
---

# A Human-in-the-Loop Multi-Agent Companion for Real-Time Entity Extraction and SLU-Driven ASR Error Correction

**TL;DR** — MACE is a real-time multi-agent overlay for contact-center calls that surfaces extracted entities for one-click correction and feeds every fix back into the ASR system as a biasing or substitution rule, cutting entity errors substantially.

## Problem

Contact-center agents handle many entity-rich calls where a single misheard name or ID cascades into wrong CRM records, and existing ASR correction workflows don't close the loop between agent confirmations and the recognizer.

## Method

MACE runs a closed-loop architecture where a live companion presents extracted named entities for in-place confirmation, and every correction is routed back into the ASR stack as a contextual-biasing entry or, once recurrent, a post-ASR substitution rule, requiring no acoustic retraining or predefined entity list.

## Results

On the English ContextASR-Bench with Whisper-large-v3, the loop reduces named-entity WER by 17.1% and EditRate by 18.6% versus a no-biasing baseline, closing 23.6% of the gap to an oracle given the entity list in advance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Directly applicable to contact centers and other transcription-dependent workflows that need continuously improving entity accuracy without retraining acoustic models.

## Related

- (link related pages by id as the wiki grows)
