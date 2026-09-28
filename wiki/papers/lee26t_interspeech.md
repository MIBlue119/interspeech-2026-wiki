---
id: lee26t_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2132
---

# Progressive Alignment Objectives for Aligner-Encoder based ASR

**TL;DR** — Adds intermediate alignment and CTC training objectives to Aligner-Encoder ASR models so token-to-frame alignment forms progressively across network depth, substantially cutting word error rate especially on long utterances.

## Problem

Aligner-Encoder ASR models predict tokens directly from encoder positions without cross-attention, but their internal alignment tends to form abruptly in the upper layers, making training brittle, especially for long utterances.

## Method

InterAligner adds an intermediate Aligner objective at a mid-network layer so alignment can build up gradually across depth, combined with an intermediate CTC loss (InterCTC) to further stabilize optimization.

## Results

On LibriSpeech with a 17-layer Conformer, a final-only Aligner reaches 5.0/7.8 WER (test-clean/other); adding InterCTC improves this to 3.4/6.0, and InterAligner further reduces it to 3.1/5.6, with the largest gains on long utterances.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More stable and accurate training for Aligner-Encoder-style streaming/non-autoregressive ASR systems, particularly for long-form audio.

## Related

- (link related pages by id as the wiki grows)
