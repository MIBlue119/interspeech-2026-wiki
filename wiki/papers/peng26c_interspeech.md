---
id: peng26c_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-975
pdf: https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.pdf
---

# Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0

[PDF](https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-975)

**TL;DR** — A geometric probing analysis of Wav2Vec 2.0 across five Chinese dialects reveals a three-stage layer-wise evolutionary trajectory spanning acoustic dominance, phonetic differentiation, and deep-layer spatial contraction.

## Problem

While self-supervised speech models like Wav2Vec 2.0 dominate downstream tasks, their internal geometric mechanisms for encoding complex dialectal variations remain a black box. Existing probing research focuses primarily on standard languages like English, leaving the layer-wise dynamics of language variants such as Chinese dialects underexplored. This opacity risks suboptimal feature selection, as practitioners often default to top-layer outputs without knowing if deep-layer manifold collapse discards crucial intermediate phonetic information.

## Method

The study applies a parameter-free geometric probing framework across all 24 layers of the frozen Wav2Vec 2.0 XLSR-53 model using five representative Chinese dialects (Shanghai Wu, Guangzhou Cantonese, Sichuan and Wuhan Southwestern Mandarin, and Zhengzhou Central Plains Mandarin). Acoustic and topological properties are evaluated using Dynamic Time Warping (DTW) against a synthetic Standard Mandarin Microsoft Azure TTS anchor, Multidimensional Scaling (MDS) for 2D spatial projections of dialect centroids, and Agglomerative Hierarchical Clustering to construct phylogenetic trees. The analysis specifically tracks how inter-dialect distances and topological structures evolve from raw acoustic manifolds in early layers to compressed, taxonomy-aligned spaces in deep layers.

## Results

Geometric metrics and topological probes demonstrate a distinct three-stage trajectory: Layers 1-8 act as an acoustic geometric stage with high DTW and Euclidean distances (25-33) dominated by raw pronunciation differences; Layers 9-19 form a stabilization phase retaining high spatial dispersion and fine-grained phonetic details; and Layers 20-24 undergo a severe metric collapse where spatial distances drop precipitously due to manifold compression. Hierarchical clustering shows that intermediate Layer 12 preserves fine-grained local variations (successfully isolating the unique Zhengzhou dialect variant), while deep Layer 24 spontaneously reorganizes into a macro-taxonomic tree separating non-Mandarin (Shanghai, Guangzhou) from Mandarin branches in alignment with traditional linguistics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers working on dialect identification, accent recognition, or macroscopic sociolinguistic and phylogenetic analysis of speech representations.

## Limitations

Evaluated exclusively on five representative Chinese dialects using a single frozen Wav2Vec 2.0 XLSR-53 model architecture.

## Related

- (link related pages by id as the wiki grows)
