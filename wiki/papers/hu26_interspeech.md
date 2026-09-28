---
id: hu26_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-304
---

# ArtNet: A JEPA-Like Articulatory Predictive Framework for Robust Zero-Shot Phoneme Recognition

**TL;DR** — ArtNet predicts articulatory features instead of mapping acoustics directly to phoneme symbols, making zero-shot cross-lingual phoneme recognition much more robust to language-specific acoustic variation.

## Problem

Zero-shot cross-lingual phoneme recognition typically maps acoustics directly to phoneme symbols, a fragile approach that is highly sensitive to language-specific acoustic variation.

## Method

Inspired by joint-embedding predictive architectures (JEPA), ArtNet adds an articulatory predictor that extracts universal articulatory representations from self-supervised speech features, combined with a variational information bottleneck to suppress language-specific variation, and pairs this with a vector-space inventory alignment (VSIA) strategy.

## Results

On seven unseen languages, ArtNet with VSIA significantly outperforms competitive baselines, giving a 20.56% relative reduction in phoneme error rate and a 7.01% relative reduction in phoneme feature error rate.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-lingual and low-resource phoneme recognition, including rapid deployment of speech technology for languages not seen during training.

## Related

- (link related pages by id as the wiki grows)
