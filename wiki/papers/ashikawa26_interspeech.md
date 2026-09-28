---
id: ashikawa26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-363
---

# Audio-KWS-Gated Error Memory Retrieval for Incremental ASR Post-Correction

**TL;DR** — An LLM-based ASR post-correction system that uses audio keyword spotting to pull only the relevant past-error fixes into the prompt, cutting prompt size roughly 70% while improving accuracy.

## Problem

LLM post-correction can reuse a growing log of past ASR corrections, but the context window can't hold the full history, and text-based retrieval of relevant fixes breaks when the trigger words are themselves misrecognized.

## Method

A three-step pipeline: LLM-based error analysis builds a keyword-indexed correction inventory, audio keyword spotting (using phonetic readings for Japanese) retrieves the top relevant records directly from the audio, then the LLM applies record-guided edits.

## Results

On Earnings-21 and CSJ, the method achieves about 70% prompt reduction while improving WER/CER and Bias-F1 relative to full-history prompting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Long-running dictation or call-transcription systems that need to keep learning from corrections without runaway prompt costs.

## Related

- (link related pages by id as the wiki grows)
