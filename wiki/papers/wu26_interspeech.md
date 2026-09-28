---
id: wu26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-537
---

# LISE: Listenable Interpretable Speaker Embeddings

**TL;DR** — A label-free method that decomposes speaker embeddings into a small set of components that listeners can actually distinguish by ear, giving speaker verification systems a human-verifiable form of interpretability with almost no accuracy cost.

## Problem

Deep speaker verification embeddings perform well but remain opaque, and prior interpretability attempts either need extra speaker-attribute annotation or produce alternative representations never validated by actual human listeners.

## Method

LISE decomposes pretrained speaker embeddings into a small set of components in a label-free way, producing a structured representation that can be analyzed and rendered listenable for human evaluation.

## Results

LISE preserves speaker verification performance with negligible EER degradation on x-vector and ECAPA-TDNN, and listening experiments show human participants can distinguish speakers from the LISE components with 83.9% accuracy, validating their interpretability.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Human-verifiable interpretability tooling for auditing and explaining what deep speaker verification systems have learned to encode.

## Related

- (link related pages by id as the wiki grows)
