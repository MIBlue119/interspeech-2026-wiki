---
id: kim26w_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3205
pdf: https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.pdf
---

# Scaling Self-Supervised Speech Models Uncovers Deep Linguistic Relationships: Evidence from the Pacific Cluster

[PDF](https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3205)

**TL;DR** — Scaling self-supervised speech models from 1K to 4K languages causes a qualitative shift in embedding geometry, successfully recovering deep genealogical lineages and ancient contact zones with an ARI of 0.74.

## Problem

Prior work on self-supervised speech model (S3M) language representations has generally been limited to models covering hundreds or roughly one thousand languages, which mostly capture superficial geographic proximity or recent typological traits rather than deep historical relationships. This limits the utility of speech representations for computational phylogenetics and historical linguistics. Massive scaling is investigated to determine if it unlocks deeper genealogical and contact signals.

## Method

Four multilingual MMS-based language identification models covering 126, 256, 1,024 (1K), and 4,017 (4K) languages are evaluated using centroid embeddings extracted from the final transformer layer across 49 diverse languages. Ward-linkage agglomerative hierarchical clustering and file-level bootstrap resampling (B = 1,000) are applied to analyze the embedding topologies. Additionally, independent t-tests, Benjamini-Hochberg FDR, and Bonferroni corrections are used to correlate cluster-discriminative latent dimensions with 30 language-level acoustic features.

## Results

Phylogenetic recovery plateaus up to 1K scale but jumps at the 4K scale, achieving a peak adjusted rand index of 0.74 and normalized mutual information of 0.95 at K = 18. The 4K model successfully recovers documented historical contact zones with high bootstrap confidence, including the Early Chinese sphere, Persian area, and Dravidian substrate, alongside a robust Papuan-Oceanic-Australian (POA) macro-cluster. Dimension-level analysis reveals that the 4K model utilizes a more concentrated set of latent dimensions heavily driven by global energy dynamics rather than local spectral fluctuations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computational historical linguists and speech researchers studying genealogical classification, language contact, and macro-area convergence.

## Related

- (link related pages by id as the wiki grows)
