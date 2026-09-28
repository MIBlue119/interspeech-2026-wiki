---
id: banerjee26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-141
---

# wav2tok 2.0: Scalable Audio Tokenization Maintaining Explicit Pairwise Token Alignment for Efficient Audio Retrieval

**TL;DR** — A more scalable speech tokenizer that keeps discrete tokens aligned across different recordings of the same term, improving query-by-example spoken term detection.

## Problem

Query-by-example spoken term detection needs discrete speech tokens that stay consistent across variable-length utterances of the same query, but the original wav2tok's tightly coupled clustering-and-alignment training doesn't scale well.

## Method

Builds on the BEST-STD backbone with staged training: first speaker-invariant contrastive and vector-quantized representation learning, then a CTC alignment loss plus a new DTW-aligned framewise objective with adaptive weighting to enforce pairwise token consistency.

## Results

wav2tok 2.0 consistently outperforms BEST-STD and general-purpose tokenizers on query-by-example spoken term detection while remaining efficient and scalable.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Spoken-term and keyword search over large audio archives, voice search, and audio retrieval systems.

## Related

- (link related pages by id as the wiki grows)
