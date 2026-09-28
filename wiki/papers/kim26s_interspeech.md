---
id: kim26s_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2532
---

# Do Modern Video-LLMs Need to Listen? A Benchmark Audit and Scalable Remedy

**TL;DR** — An audit of 10 video benchmarks finds most items are solvable from a single visual frame alone, meaning audio's contribution to video-LLMs is undermeasured; attaching a speech/audio encoder to LLaVA-OneVision shows clear gains specifically on tasks requiring speech comprehension or cross-modal grounding.

## Problem

Speech and audio encoders are routinely excluded from video understanding pipelines not because they fail, but because current benchmarks rarely require actually listening to the audio.

## Method

The authors audit 10 video benchmarks by testing how many items a single-frame visual probe can answer without audio, then attach a speech/audio encoder to LLaVA-OneVision and compare five compressor architectures under 25-fold token reduction (25 Hz down to 1 Hz).

## Results

A single-frame probe answers about 76% of AVQA without audio, indicating poor measurement of audio-visual reasoning; across 10 benchmarks, audio yields clear gains on speech-comprehension and cross-modal-grounding tasks while leaving vision-centric benchmarks largely unaffected.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides video-LLM developers and benchmark designers toward audio-aware architectures and better tests of genuine audio-visual reasoning, with code to be open-sourced.

## Related

- (link related pages by id as the wiki grows)
