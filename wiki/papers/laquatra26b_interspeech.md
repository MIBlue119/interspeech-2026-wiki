---
id: laquatra26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2369
---

# SSL-based Sequence Matching for Unsupervised Audio Retrieval

**TL;DR** — Combining self-supervised audio embeddings with sequence-matching techniques shows DTW excels for music retrieval while clustering-based discretization (K-Means + TF-IDF/BM25) excels for speech retrieval, without needing any labeled data.

## Problem

Audio-to-audio retrieval needs effective representations and matching strategies, and it's unclear which self-supervised embedding and sequence-matching combination works best across different audio domains without labeled data.

## Method

The authors combine SSL embeddings with Dynamic Time Warping (DTW) and with clustering methods (K-Means combined with TF-IDF and BM25), evaluating on two tasks: music retrieval via query-by-humming and spoken content retrieval via query-by-example.

## Results

Clustering-based methods that reduce SSL embeddings to discrete hidden units are particularly effective for speech retrieval, while DTW applied directly on full SSL embeddings excels at music retrieval, with combining SSL representations and appropriate sequence matching improving accuracy across domains.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Informs system design for music query-by-humming apps and spoken-content search engines that need label-free retrieval pipelines.

## Related

- (link related pages by id as the wiki grows)
