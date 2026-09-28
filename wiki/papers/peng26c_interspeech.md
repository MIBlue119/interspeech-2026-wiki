---
id: peng26c_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-975
pdf: https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.pdf
---

# Probing the Layer-wise Geometry of Chinese Dialect Representations in Wav2Vec 2.0

*Zhen Peng, Jiahong Yuan*

[PDF](https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-975)

**TL;DR** — A geometric probing analysis of Wav2Vec 2.0 (XLSR-53) across five Chinese dialects reveals a three-stage evolutionary trajectory where intermediate layers best preserve fine-grained phonetic details while deep layers undergo manifold collapse to highlight macroscopic linguistic taxonomies.

## Key contributions

- Quantified the layer-wise evolutionary trajectory of Chinese dialect representations in Wav2Vec 2.0 across distance, topology, and hierarchical structure dimensions.
- Uncovered the functional role of deep-layer spatial contraction (manifold collapse) as an implicit feature filter that suppresses local phonetic variations to expose broad taxonomic structures.
- Provided empirical guidance for downstream tasks, demonstrating that intermediate layers are optimal for accent recognition while deep layers excel at broad dialect classification.
- Constructed an analytical evaluation pipeline leveraging Microsoft Azure TTS Standard Mandarin reference anchors paired with VAD preprocessing for precise acoustic manifold distance calculation.

## Problem

While self-supervised learning backbones like Wav2Vec 2.0 dominate speech processing, prior interpretability research ('BERTology' and speech layer-wise probing) has predominantly focused on standard languages like English rather than dialectal variants. Engineers typically treat pre-trained models as black-box feature extractors, defaulting to top-layer outputs or simple aggregations without understanding how complex phonological phenomena (such as tone sandhi or retroflex initials) are processed. This lack of insight risks discarding valuable discriminative information embedded in intermediate layers and ignoring the consequences of deep-layer semantic/spatial collapse.

## Method

The study utilizes the 24-layer Wav2Vec 2.0 XLSR-53 model with its parameters completely frozen, serving purely as a feature extractor. The input dataset undergoes strict Voice Activity Detection using librosa with a 25 dB threshold to remove silence, and audio is resampled to 16 kHz. A synthetic Standard Mandarin reference anchor is generated via Microsoft Azure TTS (zhCN-XiaoxiaoNeural) to isolate acoustic and phonetic deviations from textual content differences.

The probing framework operates across three dimensions: (1) A Distance Probe using Dynamic Time Warping (DTW) normalized by sequence length to quantify temporal acoustic differences against the reference anchor. (2) A Topological Probe using Multidimensional Scaling (MDS) on utterance-level global centroids (obtained via temporal mean pooling followed by dialect-level averaging) to project high-dimensional representations onto a 2D plane by minimizing Kruskal stress. (3) A Structure Probe using Agglomerative Hierarchical Clustering based on centroid Euclidean distances to evaluate the model's alignment with traditional linguistic taxonomies.

These probes reveal a three-stage trajectory: Layers 1-8 act as an acoustic geometric stage dominated by raw physical discrepancies; Layers 9-19 form a metric stabilization phase retaining fine-grained phonetic variation; and Layers 20-24 execute a metric collapse stage where anisotropy forces the representation manifold into a narrow cone, filtering local variations to surface macroscopic linguistic groupings.

## Experimental setup

The study evaluates five Chinese dialects from the MagicHub open-source corpus: Southwestern Mandarin (Sichuan, Wuhan), Central Plains Mandarin (Zhengzhou), Wu Chinese (Shanghai), and Cantonese (Guangzhou). The analysis uses Wav2Vec 2.0 XLSR-53 (24 Transformer layers, completely frozen during extraction). Evaluation metrics include normalized DTW distance, Kruskal stress via MDS spatial projection, sum of pairwise Euclidean distances among dialect centroids, and agglomerative hierarchical clustering tree structures.

## Results

Normalized DTW distance metrics remain high in early layers (approx. 25-33), with non-Mandarin dialects exhibiting significantly higher acoustic deviation from the Mandarin reference anchor than Mandarin dialects. In the intermediate stage (Layers 9-19), relative spatial distances stabilize, and Layer 12 MDS plots demonstrate a clear 'non-Mandarin convergence, Mandarin separation' pattern where Shanghai and Cantonese group adjacently while isolating the unique phonetic traits of the Zhengzhou dialect. In deep layers (Layers 20-24), a precipitous drop in inter-dialect distance and spatial convergence occurs; Layer 24 manifold collapse spontaneously reorganizes the embedding space into a phylogenetic tree mirroring classical linguistic taxonomy, separating non-Mandarin and Mandarin branches at the root node without requiring any supervised signals.

## Limitations

The investigation is scoped to five specific Chinese dialects from a single open-source corpus (MagicHub) and relies entirely on a frozen Wav2Vec 2.0 XLSR-53 architecture without fine-tuning verification on end-to-end downstream tasks. The generalizability of these geometric stages to other non-Transformer self-supervised architectures (such as HuBERT, WavLM, or data2vec) or a broader cross-lingual dialect spectrum remains to be empirically confirmed.

## Why read this

Speech researchers and ML engineers designing dialect identification, accent recognition, or typological classification systems should read this to understand why defaulting to top-layer embeddings can destroy fine-grained phonetic cues, and when to leverage intermediate layers instead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fine-grained accent recognition, dialect classification, and cross-dialectal speech representation learning.

## Related

- (link related pages by id as the wiki grows)
