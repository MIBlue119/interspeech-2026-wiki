---
id: agarwal26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1314
---

# Grounding Whisper: An Audio Anchor-Based Approach for Hallucination Mitigation and Throughput-Efficient ASR

**TL;DR** — Prepending a short, near-silent "anchor" clip to Whisper's input lets it detect its own hallucinations on silence and non-speech audio without any fine-tuning, cutting WER by more than half.

## Problem

Whisper is a strong ASR model but hallucinates on silence and non-speech audio, generating fluent transcriptions that have no basis in the input and hurt production reliability.

## Method

The authors prepend a short "anchor audio" phrase with near-zero domain occurrence to the input, which lets hallucination be detected without modifying or fine-tuning the model. They test five inference strategies built around this idea, from single-call augmentation up to batch concatenation with automatic fallback, trading off accuracy, latency, and throughput.

## Results

The best batch strategy drops overall WER from 32.18% to 13.23% and reaches a 0.14% Hallucination Error Rate on non-speech audio, while keeping latency comparable to baseline VAD pipelines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Production transcription pipelines (call centers, voice assistants, meeting notes) that need Whisper-level accuracy without spurious hallucinated text on silence or noise.

## Related

- (link related pages by id as the wiki grows)
