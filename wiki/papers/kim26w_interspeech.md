---
id: kim26w_interspeech
category: speaker
labels: [low-resource, multilingual, self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3205
pdf: https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.pdf
---

# Scaling Self-Supervised Speech Models Uncovers Deep Linguistic Relationships: Evidence from the Pacific Cluster

*Minu Kim, Hoirin Kim, David R. Mortensen*

[PDF](https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3205)

**Category:** `speaker` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — Scaling self-supervised speech models for language identification from 1,024 to 4,017 languages triggers a qualitative shift in embedding geometry, enabling the recovery of deep historical language relationships and a robust Pacific macro-cluster (adjusted rand index 0.47 to 0.74).

## Key contributions

- Demonstrates that scaling language identification training from 126 to 4,017 languages overcomes representational plateaus and resolves deep phylogenetic lineages and multi-millennial contact areas.
- Uncovers a robust Papuan-Oceanic-Australian (POA) macro-cluster in the 4K model's embedding space, matching known historical convergence in Island Melanesia and deep pre-historic connections.
- Performs dimension-level analysis showing that the 4K scale concentrates POA-discriminative signals into fewer dimensions focused on global energy dynamics rather than local spectral fluctuations.
- Validates embedding space topology against raw acoustic features, proving that the emergence of the Pacific cluster tracks real phonetic differences such as energy dynamic range.

## Problem

Prior work analyzing self-supervised speech models (S3Ms) for historical linguistics and language identification has been limited to models covering hundreds or roughly one thousand languages. Consequently, these models capture only superficial surface typologies and recent contact while failing to recover deep genealogical history or ancient Sprachbunds. Addressing this gap requires testing whether massive scaling of linguistic diversity in S3M training alters representational spaces to reflect deep multi-millennial language history.

## Method

The study evaluates four language identification models sharing the same Massively Multilingual Speech (MMS) backbone, covering 126, 256, 1,024 (1K), and 4,017 (4K) languages. Audio is drawn from 49 diverse languages across DoReCo and FLEURS corpora. For each language, a 1280-dimensional centroid embedding is computed by double-averaging hidden states from the final transformer layer across all constituent audio clips, followed by standardization to zero mean and unit variance.

Ward-linkage agglomerative clustering using Euclidean distance is applied to the standardized centroids to produce dendrograms across cluster counts K from 2 to 20. Cluster quality is evaluated via Adjusted Rand Index (ARI) and Normalized Mutual Information (NMI), alongside a file-level bootstrap procedure with B = 1,000 replicates to measure branch stability. To identify drivers of the Pacific cluster, independent t-tests with Benjamini-Hochberg FDR and Bonferroni corrections are conducted across all 1,280 dimensions comparing POA versus non-POA language centroids, and significant dimensions are correlated with 30 language-level acoustic features.

## Experimental setup

Evaluated on 49 languages sourced from the DoReCo (14 low-resource languages) and FLEURS (35 diverse languages) corpora, where 45 out of 49 evaluation languages maintain consistent seen/unseen exposure between the 1K and 4K models. Compared models include MMS-LID-126, 256, 1024, and 4017. Metrics include Adjusted Rand Index (ARI), Normalized Mutual Information (NMI), Precision, F1-score, and bootstrap confidence over K in [2, 20].

## Results

Phylogenetic recovery remains flat across 126, 256, and 1K models, but scaling to 4K causes a sharp performance leap, peaking at K = 18 with an ARI of 0.74 (up from 0.47) and an NMI of 0.95 (up from 0.87). The 4K model correctly recovers major language contact areas with high bootstrap confidence (e.g., East Asian sphere at 100%, Iranian-Turkic at 95%, and Dravidian-Indo-Aryan at 96%), and 36 of 37 branches above 50% confidence match established groupings. For the Papuan-Oceanic-Australian macro-cluster, the 4K model achieves perfect precision (1.00) and a stable F1 score of 0.96 across cluster counts. Dimension-level analysis reveals that the 4K model utilizes a more concentrated set of latent dimensions (169 FDR-significant vs 257 in 1K), shifting focus from local spectral variance to global amplitude dynamics such as energy dynamic range (correlating in 28.0% of Bonferroni-significant dimensions).

| System | Max ARI (K=18) | Max NMI (K=18) | POA Precision | POA F1 |
|---|---|---|---|---|
| MMS-LID-126 | ~0.47 | ~0.87 | 0.92 | ~0.85 |
| MMS-LID-256 | ~0.48 | ~0.87 | 0.92 | ~0.85 |
| MMS-LID-1K | ~0.47 | ~0.87 | 0.92 | ~0.92 |
| MMS-LID-4017 | 0.74 | 0.95 | 1.00 | 0.96 |

## Limitations

The evaluation relies on a carefully selected subset of 49 languages out of thousands, leaving the global topology across all 4,017 languages unmapped. The study focuses entirely on the MMS architecture and LID objective, meaning findings might not transfer identically to other S3M families (e.g., wav2vec 2.0 or Hubert) or self-supervised objectives. Furthermore, acoustic feature correlations are evaluated at the language level, which could potentially obscure dialectal variance or recording quality artifacts.

## Why read this

Speech researchers and historical linguists should read this paper to understand how massive linguistic scaling transforms S3M representations from surface-level models into tools capable of recovering deep phylogenetic history and prehistoric language contact.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Computational historical linguistics, automated language relationship mapping, and genealogical clustering of low-resource languages.

## Institutions / 機構

KAIST, University of Southern California, Carnegie Mellon University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation

## Related

- (link related pages by id as the wiki grows)
