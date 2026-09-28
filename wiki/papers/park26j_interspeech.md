---
id: park26j_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3273
---

# From Masking to Merging: Rethinking SpecAugment for Efficient Audio Spectrogram Transformer

**TL;DR** — Merging masked spectrogram patches, rather than just discarding them, speeds up Audio Spectrogram Transformer training by nearly 14% with almost no accuracy loss.

## Problem

SpecAugment masks input spectrogram patches for regularization during Audio Spectrogram Transformer (AST) training, but the masked patches are simply discarded, wasting an opportunity to reduce the number of tokens the Transformer must process.

## Method

SpecAugment-Patch Merging applies SpecAugment at the patch level, and after positional embeddings are added, selects r pairs of masked patches and merges them, reducing token count processed by the Transformer.

## Results

Increasing merged pairs r from 0 to 100 keeps mAP on AudioSet nearly unchanged (34.07 to 34.08) while throughput rises from 43.3 to 49.3 samples/sec, a 13.9% relative improvement; similar throughput gains with minor accuracy changes appear on ESC-50 and Speech Commands V2.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speeding up training of Audio Spectrogram Transformer models for audio classification tasks without sacrificing accuracy.

## Related

- (link related pages by id as the wiki grows)
