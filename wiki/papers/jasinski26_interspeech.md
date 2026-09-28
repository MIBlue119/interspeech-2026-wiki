---
id: jasinski26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-338
---

# From Text Metrics to Model Internals: A Study of Whisper ASR Hallucination Detection

**TL;DR** — Probing Whisper's own decoder states, without needing a reference transcript, detects hallucinated transcriptions better than text-based or LLM-based methods, and combining internal and text signals works best of all.

## Problem

ASR hallucinations — fluent transcriptions with no basis in the audio — degrade system performance and pose risks downstream, and robustly detecting them remains difficult.

## Method

The authors study Whisper large-v3 hallucination detection on real-speech, human-annotated data across three paradigms: text-based classifiers, LLM-based detection, and internal decoder-state probing, then combine text and internal-state signals in a late-fusion meta-classifier.

## Results

Text classifiers get high recall but degrade without reference transcripts; LLM-based detection improves precision with domain-specific prompting but trails lightweight text methods; decoder-state probing (no reference needed) gives the strongest single-method performance, showing hallucination traits live across intermediate decoding layers, and the late-fusion meta-classifier performs best overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Reference-free hallucination monitoring for production Whisper-based transcription systems.

## Related

- (link related pages by id as the wiki grows)
