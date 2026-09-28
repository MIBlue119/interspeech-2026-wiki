---
id: dixit26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3185
---

# AURA Score: A Metric for Holistic Audio Question Answering Evaluation

**TL;DR** — A new metric, backed by a 10k-response human-annotated benchmark, correlates far better with human judgment than BLEU/METEOR/BERTScore for grading open-ended audio question answering.

## Problem

Text-similarity metrics like BLEU, METEOR, and BERTScore, adapted from NLP and captioning, rely on surface-level matching and fail to capture question context, reasoning, or partial correctness when scoring open-ended Audio Question Answering responses.

## Method

The authors introduce AQEval, a benchmark of 10k model responses annotated by multiple humans for correctness and relevance, analyze existing AQA metrics' weak correlation with human judgment on it, and then propose the AURA score, a new metric designed to better evaluate open-ended model responses.

## Results

AURA achieves state-of-the-art correlation with human ratings on AQEval, significantly outperforming existing baseline metrics, especially on longer answers.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Benchmarking and model selection for Audio-Language Models on open-ended audio question answering tasks.

## Related

- (link related pages by id as the wiki grows)
