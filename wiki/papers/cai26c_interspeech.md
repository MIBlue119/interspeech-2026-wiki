---
id: cai26c_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2297
---

# Beyond Mimicry: Constrained Exploration with GRPO for Joint Multi-Talker ASR and Diarization under Unknown Speaker Counts

**TL;DR** — Adding GRPO reinforcement learning with a custom multi-dimensional constraint reward on top of chain-of-thought supervised fine-tuning sharply improves joint multi-talker transcription and diarization when the number of speakers is unknown.

## Problem

Joint multi-talker ASR with speaker attribution and timestamps is especially hard when the speaker count is unknown, and supervised fine-tuning alone is brittle under dense speaker overlap, causing hallucinated bursts and malformed output tags.

## Method

The authors propose a two-stage generative framework: chain-of-thought-augmented supervised fine-tuning that first infers the global speaker count, followed by GRPO-based reinforcement learning guided by a Multi-dimensional Constraint-Aware Reward that jointly enforces counting, temporal, and structural correctness while optimizing permutation-invariant accuracy.

## Results

On Libri3Mix and a Dynamic-Mix (2+3 speaker) set with unknown speaker count, the model reaches 14.52%/9.24% cpWER and 1.95%/1.12% WDER, with GRPO giving a 35%/54% relative cpWER reduction over the SFT+CoT baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to meeting transcription and call-center analytics tools that must transcribe and attribute speech in conversations with a variable, unannounced number of participants.

## Related

- (link related pages by id as the wiki grows)
