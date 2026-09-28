---
id: liu26n_interspeech
category: phonetics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1747
---

# Learning Contextualized Tonal Contours from F0: A Core-Auxiliary Branched Transformer for Mandarin Tone Recognition

**TL;DR** — A core-auxiliary branched Transformer that trains with detachable auxiliary gradient pathways but can drop them at inference learns contextualized F0 tone contours for Mandarin at multiple granularities, beating a single-branch baseline while staying efficient at inference.

## Problem

Mandarin tone recognition based purely on suprasegmental F0 information needs to capture contextualized tonal representations efficiently, without the added inference cost of complex multi-branch architectures.

## Method

The framework encodes structured F0 embeddings across syllable, word, and chunk granularities with a core contour encoder (C-Net), adds detachable auxiliary branches that provide extra gradient pathways via cross-attention and layer-specific attention pooling during training, and models rhythmic variability with a rhythm encoder (R-Net).

## Results

The approach consistently outperforms a single-branch baseline even when the auxiliary branches are removed at inference, further improving computational efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to Mandarin ASR front-ends, language-learning pronunciation feedback tools, and any system needing efficient tone recognition from F0 contours.

## Related

- (link related pages by id as the wiki grows)
