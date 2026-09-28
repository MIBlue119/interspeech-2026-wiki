---
id: gaughan26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2418
---

# Do speech representational spaces encode language family structures?

**TL;DR** — Comparing six tree-comparison methods across six speech encoders and LID models shows that tree-based analysis captures more language-family structure than probing classifiers, with notable gaps on languages unseen during training.

## Problem

Speech representations are known to carry information about the language being spoken, but it's unclear whether they also encode meaningful language family structure, which matters for building models that generalize to related low-resource and non-standard language varieties.

## Method

The authors compare six existing phylogenetic tree-comparison methods for measuring language family structure in representational spaces, applying them to the representation spaces of six common speech encoders and language-identification models, benchmarked against a linguistic lexicostatistical reference.

## Results

The six tree-comparison methods are shown to be complementary, and tree-based methods overall capture more language family structure than probing classifiers do; the analysis reveals notable differences between encoders, particularly for languages not seen during training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Diagnosing and selecting pretrained speech/LID models for cross-lingual transfer, and informing future model designs that better incorporate known language relationships for low-resource languages.

## Related

- (link related pages by id as the wiki grows)
