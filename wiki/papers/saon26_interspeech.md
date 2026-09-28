---
id: saon26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2680
---

# Self-Speculative Decoding for LLM-based ASR with CTC Encoder Drafts

**TL;DR** — Using a CTC encoder as a self-speculative draft model accelerates LLM-based ASR decoding by 4.4x while actually improving accuracy, reaching a new state-of-the-art 5.58% WER on the HuggingFace Open ASR benchmark.

## Problem

Autoregressive decoding in speech-aware LLMs is accurate but slow, and existing speculative decoding approaches for accelerating it typically need a separate draft model with its own training cost.

## Method

The authors use the LLM-ASR system's own CTC encoder as the draft model: if per-frame CTC output entropy is below a threshold, its greedy hypothesis is accepted directly; otherwise it's verified in a single LLM forward pass under a relaxed token-likelihood acceptance criterion; if verification fails, autoregressive decoding resumes from the accepted CTC prefix.

## Results

Across nine corpora and five languages the method simultaneously accelerates decoding and reduces WER; with a 1B-parameter LLM and 440M-parameter CTC encoder it reaches a record 5.58% WER on the HuggingFace Open ASR benchmark and improves inverse real-time factor by 4.4x with only a 12% relative WER increase versus full autoregressive search; code and weights are released under a permissive license.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Faster, more accurate LLM-based ASR serving for production transcription and voice-assistant systems.

## Related

- (link related pages by id as the wiki grows)
