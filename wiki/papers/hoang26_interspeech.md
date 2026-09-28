---
id: hoang26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1060
---

# Towards Efficient Simultaneous Inverse Text Normalization with Pretrained Text-to-Text Language Model and Read-Tag-Write Policy

**TL;DR** — An end-to-end streaming inverse-text-normalization system built on a pretrained text-to-text model matches non-streaming accuracy on Vietnamese while meeting real-time latency requirements, beating hybrid rule-based systems.

## Problem

Streaming inverse text normalization, which converts spoken-form ASR output into formatted written text, has relied on hybrid systems mixing neural tagging with hand-crafted finite-state transducer rules, limiting scalability across domains and languages; pure encoder-decoder models generalize better but are inherently non-streaming due to global attention.

## Method

The authors adapt a pretrained text-to-text model with architectural changes for streaming, a specialized training strategy, a Read-Tag-Write decoding policy, and inference optimizations to enable low-latency streaming ITN.

## Results

On Vietnamese datasets, the streaming system reaches accuracy comparable to non-streaming baselines and outperforms hybrid rule-based methods while meeting real-time latency requirements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time transcription pipelines that need spoken-to-written text formatting (dates, numbers, punctuation) without sacrificing streaming latency, especially for languages with limited ITN tooling.

## Related

- (link related pages by id as the wiki grows)
