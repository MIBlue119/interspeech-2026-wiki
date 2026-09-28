---
id: cui26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2881
---

# Dictionary-Free Discrete Key-Value Attention for Improving Speech Enhancement

**TL;DR** — A learned, dictionary-free discrete attention module fixes a weakness of prior harmonic-attention speech enhancement — poor handling of unvoiced sounds — by discretizing attention keys and values instead of relying on hand-built harmonic templates.

## Problem

Existing Harmonic Attention improves voiced speech reconstruction by building a harmonic dictionary, but its heavy reliance on this prior knowledge makes it underperform on unvoiced speech components.

## Method

The proposed Dictionary-Free Discrete Attention module borrows ideas from finite scalar quantization to discretize both keys and values in the attention mechanism in a data-driven way, learning latent dictionary-like representations without hand-crafted harmonic design; it is combined with the existing harmonic attention inside a TFGridNet-based enhancement model.

## Results

The combined model significantly improves speech quality and intelligibility, more effectively suppressing noise and recovering both voiced and unvoiced spectral structure than the harmonic-attention-only baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Front-end speech enhancement for calling, hearing aids, and ASR preprocessing where both voiced and unvoiced sounds need to be recovered accurately.

## Related

- (link related pages by id as the wiki grows)
