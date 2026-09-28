---
id: visser26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-315
---

# ZeroSyl: Simple Zero-Resource Syllable Tokenization for Spoken Language Modeling

**TL;DR** — A training-free method that extracts syllable boundaries directly from a frozen WavLM model's feature norms, producing better spoken-language-model tokens than prior multi-stage syllabic tokenizers.

## Problem

Pure speech language models learn directly from raw audio, but discrete tokens from self-supervised speech encoders produce excessively long sequences; syllable-like units help, but existing methods like Sylber and SyllableLM require intricate multi-stage training pipelines.

## Method

ZeroSyl extracts syllable boundaries and embeddings training-free, directly from a frozen WavLM model, using L2 norms of features in WavLM's intermediate layers; the resulting segments are mean-pooled, discretized via K-means, and used to train a spoken language model.

## Results

ZeroSyl outperforms prior syllabic tokenizers across lexical, syntactic, and narrative benchmarks, and scaling experiments show its discovered syllabic units scale better for syntactic modeling even though finer-grained units help lexical tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient, training-free tokenization for building textless spoken language models directly from raw audio.

## Related

- (link related pages by id as the wiki grows)
