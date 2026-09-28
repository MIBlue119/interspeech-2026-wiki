---
id: ai26b_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2875
---

# Beyond Two-stage Diffusion TTS: Joint Structure and Content Refinement via Jump Diffusion

**TL;DR** — A jump-diffusion TTS model folds discrete duration modeling and continuous spectral refinement into a single diffusion process, cutting WER while enabling more natural adaptive pacing.

## Problem

Diffusion and flow-matching TTS models face a tradeoff: two-stage designs diffuse over fixed alignments and tend to flatten prosody, while single-stage designs skip explicit durations but suffer alignment instability.

## Method

The authors propose a jump-diffusion framework where discrete jumps model temporal/duration structure and a continuous diffusion process refines spectral content within the same generative process, unifying both stages.

## Results

Even a simplified one-shot variant reaches 3.37% WER versus 4.38% for Grad-TTS with better UTMOSv2 on LJSpeech, and the full iterative variant inserts natural pauses for out-of-distribution slow speech rather than uniformly stretching audio.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for TTS systems that need both accurate word-level timing and expressive, non-uniform prosody, such as audiobook narration or dubbing where pacing must adapt to content.

## Related

- (link related pages by id as the wiki grows)
