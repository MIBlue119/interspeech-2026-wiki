---
id: makishima26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1582
---

# Multi-Talker ASR Unaffected by Speaker Change Count

**TL;DR** — Masking speaker-change tokens in self-attention stops a multi-talker ASR model from inferring how many speaker changes to expect, fixing its degradation when a conversation has more speaker turns than seen during training.

## Problem

Recursive multi-talker ASR models that concatenate transcripts with speaker-change tokens rely heavily on context including those tokens, so inference performance degrades when the number of speaker changes in a conversation exceeds what was seen during training.

## Method

The authors estimate the token sequence, including speaker-change tokens, without letting the model infer how many changes have occurred, via a novel speaker-change token mask in self-attention that zeroes out speaker-change tokens and randomly selected referenced tokens for other queries.

## Results

Experiments demonstrate the method's efficacy, with the autoregressive model showing robustness to the number of speaker changes rather than the accuracy degradation seen in prior approaches.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Multi-talker transcription for meetings, conversations, and other multi-speaker settings with unpredictable numbers of speaker turns.

## Related

- (link related pages by id as the wiki grows)
