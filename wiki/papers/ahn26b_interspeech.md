---
id: ahn26b_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3058
---

# Whisper-CD: Accurate Long-Form Speech Recognition using Multi-Negative Contrastive Decoding

**TL;DR** — A training-free decoding trick for Whisper-style models that contrasts clean audio against corrupted versions of itself to cut hallucinations and repetition in long-form transcripts.

## Problem

Encoder-decoder ASR models like Whisper hallucinate, repeat, and drop content on long recordings, and these errors compound when earlier transcript text is fed back in as decoding context.

## Method

At each decoding step, the method builds negative signals by perturbing the audio (adding noise, replacing it with silence, and shifting it in time), combines these into a single contrastive objective via log-sum-exp, and steers generation away from tokens favored under the corrupted views.

## Results

On five English long-form benchmarks the approach cuts word error rate by as much as 24.3 percentage points on CORAAL and decodes about 48% faster than beam search, with no retraining required.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Drop-in inference-time upgrade for already-deployed Whisper-based transcription services handling long meetings, podcasts, or lecture recordings.

## Related

- (link related pages by id as the wiki grows)
