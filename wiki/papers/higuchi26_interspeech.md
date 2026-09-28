---
id: higuchi26_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-592
---

# Incremental End-to-End Spoken Dialogue State Tracking with a Multimodal LLM and Reinforcement Learning

**TL;DR** — A multimodal LLM (Qwen2.5-Omni-7B) predicts only incremental edits to dialogue state from raw audio, and GRPO reinforcement learning on top of this achieves the best reported results on SpokenWOZ.

## Problem

End-to-end spoken dialogue state tracking (DST) infers belief states directly from speech to avoid cascading ASR errors, but conventional approaches regenerate the full state each turn, which is wasteful and risks corrupting slots that didn't change.

## Method

The proposed method uses a multimodal LLM to jointly generate transcripts and symbolic state-edit operations relative to the previous turn's state, then applies a two-stage recipe of supervised fine-tuning followed by Group Relative Policy Optimization (GRPO) that directly optimizes rewards for transcript accuracy, DST correctness, and output format validity.

## Results

On SpokenWOZ, incremental state updates substantially outperform full-state prediction, and adding GRPO further improves accuracy, achieving the best reported results on this benchmark.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Task-oriented spoken dialogue systems (e.g., voice booking assistants) that need efficient, low-latency, ASR-error-resilient dialogue state tracking directly from audio.

## Related

- (link related pages by id as the wiki grows)
