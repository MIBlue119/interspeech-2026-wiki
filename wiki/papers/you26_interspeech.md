---
id: you26_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-887
---

# Uncovering the Impact of G2P Precision on Korean TTS: A Large-Scale Statistical Validation via a Novel Morphological Engine

**TL;DR** — A new rule-based Korean grapheme-to-phoneme engine is nearly 5x faster and over 3x more accurate than the widely used g2pk library, and training 96 VITS models proves this G2P precision actually improves TTS intelligibility.

## Problem

Grapheme-to-Phoneme (G2P) conversion is vital for TTS, but the widely used Korean g2pk library has high latency and inaccurate phonological modeling at word boundaries, acting as "label noise" that degrades TTS performance and training efficiency.

## Method

The authors build a novel rule-based G2P engine with an object-oriented data structure featuring syllable-morpheme connectivity and a recursive re-evaluation mechanism for sequential phonological rules, then validate its downstream impact by training 96 VITS models (32 per condition) for large-scale statistical comparison.

## Results

The engine significantly outperforms g2pk in both speed (3.14ms vs. 14.98ms, p < 0.001) and accuracy (85.7% vs. 27.2%), and the large-scale VITS comparison shows statistically significant intelligibility improvements from the more accurate G2P, alongside better training efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving Korean TTS pipelines by upgrading their G2P front-end, and more broadly demonstrating why G2P quality matters for TTS training efficiency and output quality.

## Related

- (link related pages by id as the wiki grows)
