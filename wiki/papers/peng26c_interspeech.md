---
id: peng26c_interspeech
category: multilingual
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-975
---

# Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0

**TL;DR** — Geometric probing of Wav2Vec 2.0's layers reveals a three-stage trajectory for how Chinese dialect information is encoded, suggesting different layers suit different dialect-related tasks.

## Problem

Wav2Vec 2.0 succeeds broadly at speech representation, but how it encodes dialectal features across its layers was underexplored, particularly for Chinese dialects.

## Method

The authors apply geometric probing methods to analyze how representations of five Chinese dialects change across Wav2Vec 2.0's layers.

## Results

Finds a three-stage trajectory: lower layers are dominated by basic acoustic differences, middle layers show high spatial dispersion preserving fine-grained phonetic detail, and deep layers show spatial contraction while clustering remains consistent with traditional linguistic taxonomies; intermediate-layer features are recommended for fine-grained tasks like accent identification, deep-layer features for broad dialectal classification.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides layer selection when building Chinese dialect/accent identification or dialectal classification systems on top of Wav2Vec 2.0.

## Related

- (link related pages by id as the wiki grows)
