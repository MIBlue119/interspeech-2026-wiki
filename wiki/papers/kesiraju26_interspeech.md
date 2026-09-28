---
id: kesiraju26_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3315
---

# FLiP: Towards understanding and interpreting multimodal multilingual sentence embeddings

**TL;DR** — Factorized Linear Projection (FLiP) models recover over 75% of the lexical content hidden inside multilingual/multimodal sentence embeddings, giving a diagnostic tool that exposes modality and language biases in encoders like LaBSE, SONAR, and Gemini.

## Problem

Sentence embedding spaces from multilingual, multimodal, and API-based encoders are hard to interpret, and conventional downstream evaluation tasks give only indirect insight into what these embeddings actually encode.

## Method

The authors train Factorized Linear Projection (FLiP) models to recover lexical content from multilingual (LaBSE), multimodal (SONAR), and API-based (Gemini) sentence embedding spaces across several high- and mid-resource languages, using this recovery as a diagnostic probe.

## Results

FLiP recalls more than 75% of lexical content from the embeddings, substantially outperforming existing non-factorized baselines, and reveals modality and language biases across the tested encoders.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Gives practitioners a lightweight diagnostic method to audit sentence encoders for language and modality bias without running full downstream evaluations.

## Related

- (link related pages by id as the wiki grows)
