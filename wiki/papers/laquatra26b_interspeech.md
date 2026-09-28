---
id: laquatra26b_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2369
pdf: https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.pdf
---

# SSL-based Sequence Matching for Unsupervised Audio Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2369)

**TL;DR** — This paper evaluates unsupervised audio-to-audio retrieval using self-supervised learning (SSL) embeddings combined with continuous alignment (DTW) or discrete text-based matching (TF-IDF, BM25), achieving up to 0.801 MRR on music query-by-humming and 0.723 MRR on speech query-by-example.

## Problem

Audio-to-audio retrieval typically requires expensive labeled data or task-specific training architectures to handle variations in pitch, tempo, and speaker characteristics. Furthermore, existing benchmarks evaluate only a single matching strategy on a single domain, leaving how different matching paradigms interact with frozen SSL representations across diverse audio domains underexplored.

## Method

The framework extracts frame-level embeddings from frozen transformer-based SSL models (such as HuBERT, WavLM, Wav2Vec2, MERT, and voc2vec) without fine-tuning or labeled data. For continuous sequence matching, it applies Dynamic Time Warping (DTW) and Soft-DTW directly on raw or K-Means cluster embeddings. For discrete text-based matching, continuous vectors are quantized into discrete token IDs using K-Means (tested up to K=10,000 clusters) and indexed using TF-IDF, BM25, and a novel Temporal TF-IDF (T-TF-IDF) with a positional penalty parameter. Base-sized SSL models are utilized across all experiments.

## Results

Evaluated on MIR-QBSH (query-by-humming) and a custom QbE-LibriSpeech dataset (query-by-example containing 27 unique queries and 107 positive examples). HuBERT-LS consistently achieves top performance: on MIR-QBSH, DTW on raw embeddings achieves 0.765 Accuracy and 0.801 MRR; on QbE-LibriSpeech, TF-IDF on cluster IDs (K=10,000) achieves 0.633 Accuracy and 0.723 MRR. Ablations reveal that music retrieval requires strict temporal ordering via continuous DTW, whereas speech retrieval benefits from discrete bag-of-phonemes matching where temporal position is largely invariant (confirmed via Soft-DTW and T-TF-IDF sweeps). Additionally, speech-pretrained models outperform domain-specific music models even on hummed queries.

## Code

- https://github.com/MorenoLaQuatra/SSL-AIR

## Applications

Engineers and researchers building unsupervised audio search systems, query-by-humming music retrieval applications, or spoken term detection engines without access to annotated supervision.

## Limitations

Evaluated on only two datasets (MIR-QBSH and QbE-LibriSpeech) using base-sized models, with strategy selection remaining manual rather than adaptive at deployment time.

## Related

- (link related pages by id as the wiki grows)
