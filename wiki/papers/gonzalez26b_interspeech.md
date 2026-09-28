---
id: gonzalez26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-905
---

# Probing Linguistic Information in Speech Embeddings: A Diagnostic Analysis across Acoustic and Structural Domains

**TL;DR** — A diagnostic probing study finds that pretrained speech embeddings strongly encode acoustic/phonetic properties like temporal dynamics and voice quality but only weakly and unevenly encode higher-level linguistic structure.

## Problem

Speech embeddings underpin modern ASR and speech-language models, but how much genuine linguistic structure (versus just acoustic detail) they encode is still not well understood.

## Method

The authors measure linear associations between pretrained acoustic embeddings and a battery of acoustic, phonetic, and linguistic-structure features, spanning temporal, spectral, voice-quality, lexical, morphological, and syntactic properties.

## Results

Embeddings show strong linear accessibility for acoustic and phonetic features (especially temporal dynamics, spectral structure, voice quality) and measurable but weaker association with lexical complexity, while morphological and syntactic complexity are only weakly linearly accessible.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides interpretability research and model selection for downstream tasks that need speech representations sensitive to higher-level linguistic structure rather than only acoustic detail.

## Related

- (link related pages by id as the wiki grows)
