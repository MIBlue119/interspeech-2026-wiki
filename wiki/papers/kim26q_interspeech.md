---
id: kim26q_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2154
---

# A Reranker for Orchestrating Heterogeneous Speech and Text Retrievers

**TL;DR** — STEREO is a reranker that combines evidence retrieved separately from speech and text databases for retrieval-augmented generation, improving downstream QA when the knowledge base spans multiple modalities.

## Problem

RAG systems increasingly need to draw on multi-modal knowledge bases spanning speech and text, but there is little research on how to rank and combine evidence retrieved from such heterogeneous sources.

## Method

The authors curate a new dataset of queries, mixed-modality evidence, and relevance rankings, then train STEREO, a reranker built on top of separate speech and text retrievers, and evaluate it in both single-modality and mixed-modality retrieval scenarios.

## Results

STEREO is effective at surfacing the most relevant evidence across modalities, which significantly improves downstream question-answering performance compared to not reranking across modalities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Retrieval-augmented generation systems whose knowledge bases mix spoken and written content, e.g. voice assistants querying both call recordings and documents.

## Related

- (link related pages by id as the wiki grows)
