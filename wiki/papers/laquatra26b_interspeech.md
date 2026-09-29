---
id: laquatra26b_interspeech
category: audio-understanding
labels: [self-supervised]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2369
pdf: https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.pdf
---

# SSL-based Sequence Matching for Unsupervised Audio Retrieval

*Moreno La Quatra, Alkis Koudounas, Sabato Marco Siniscalchi*

[PDF](https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/laquatra26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2369)

**Category:** `audio-understanding` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates fully unsupervised audio-to-audio retrieval by pairing frozen self-supervised learning (SSL) representations with domain-dependent sequence matching methods. It demonstrates that dynamic time warping (DTW) excels for music query-by-humming (reaching 76.5% accuracy), while discrete token clustering combined with TF-IDF excels for spoken query-by-example (reaching 63.3% accuracy).

## Key contributions

- Systematic comparison of continuous alignment (DTW) vs. discrete token matching (TF-IDF, BM25) applied to frozen SSL embeddings without task-specific training.
- Cross-domain evaluation on query-by-humming (MIR-QBSH) and query-by-example (QbE-LibriSpeech) showing domain-dependent optimal matching strategies.
- Temporal sensitivity analysis using Soft-DTW and a novel Temporal TF-IDF (T-TF-IDF) measure, proving music retrieval requires strict temporal ordering while speech retrieval functions best as bag-of-phonemes.
- Discovery that speech-pretrained SSL models (HuBERT-LS) outperform domain-specific music (MERT) and non-verbal vocalization models (voc2vec) on hummed music retrieval.

## Problem

Audio-to-audio retrieval requires identifying matching audio clips across databases without metadata or text transcriptions. Supervised methods are impractical due to scarce annotations, while prior unsupervised systems either rely on expensive dedicated joint-training phases with data augmentation (such as Wav2Tok), evaluate only a single matching strategy on a single domain (like SUPERB), or lack rigorous analysis of why specific matching paradigms succeed per domain. Understanding how to match arbitrary untranscribed queries across speech and music domains using off-the-shelf SSL representations remains an open challenge.

## Method

The framework extracts frame-level embeddings X = [x1, x2, ..., xT] from base-size transformer SSL models (typically operating at 20 ms frames, where xt in R^d). For discrete matching, K-Means clustering with K = 10,000 is applied to map frames to cluster centroids (C-Emb) or discrete indices (C-IDs). For continuous sequence matching, Dynamic Time Warping (DTW) computes optimal alignment paths by minimizing cumulative L2-normalized frame distances, accommodating temporal stretching and compression. For discrete representations, text-based ranking techniques—Term Frequency-Inverse Document Frequency (TF-IDF) and BM25—treat cluster ID sequences as documents to score query-database similarity based on token frequency and rarity.

To understand temporal dependencies, the authors introduce Soft-DTW (sweeping parameter gamma from 0 to 100) to adjust temporal alignment flexibility, and Temporal TF-IDF (T-TF-IDF, sweeping Gaussian penalty lambda from 0 to 100) to enforce positional matching constraints. For training and recipe, the entire pipeline is completely unsupervised and zero-shot with respect to retrieval tasks; zero task-specific model fine-tuning is performed. The SSL models are frozen, and K-Means codebooks are unsupervisedly fit on frame features. Inference relies on computing either alignment path distances (DTW) or sparse inner-product vector rankings (TF-IDF/BM25) against pre-indexed database items.

## Experimental setup

Evaluated on two datasets: MIR-QBSH for query-by-humming (4,206 queries covering 48 unique songs and 225 search database items) and a custom QbE-LibriSpeech dataset extracted from LibriSpeech (27 unique bigram queries, 107 positive examples, averaging 3.70 positive matches per query, with word timestamps from WhisperX). Baselines include spectral features (Spec, Mel-Spec), SSL models with mean pooling and cosine similarity, and alternate SSL pre-trainings (w2v2, WavLM, HuBERT, MERT-95M, voc2vec). Metrics used are Accuracy (Recall@1), Mean Reciprocal Rank (MRR), Recall@3, and Recall@5.

## Results

On MIR-QBSH (QbH), HuBERT-LS using DTW on raw embeddings achieved the headline Accuracy of 0.765 and MRR of 0.801, outperforming MERT-95M (Accuracy 0.618, MRR 0.691) and voc2vec-H (Accuracy 0.665). MelSpec achieved an Accuracy of 0.338 and mean-pooling cosine similarity achieved 0.407, confirming the necessity of sequence-level alignment. Text-based methods like TF-IDF performed poorly on music (Accuracy 0.451).

On QbE-LibriSpeech (QbE), TF-IDF on C-IDs with HuBERT-LS achieved an Accuracy of 0.633 and MRR of 0.723, substantially outperforming DTW on raw embeddings (Accuracy 0.300, MRR 0.396). MelSpec achieved an Accuracy of 0.433. Ablations using T-TF-IDF showed that speech retrieval accuracy drops monotonically from 0.633 (lambda=0) to 0.233 (lambda=100), proving that speech retrieval relies on bag-of-phonemes matching rather than strict temporal order, whereas music retrieval benefits from temporal constraints.

| System & Model | Representation | Matching Strategy | Accuracy (R@1) | MRR | R@3 |
|---|---|---|---|---|---|
| HuBERT-LS (QbH) | Raw Embeddings | DTW | 0.765 | 0.801 | 0.813 |
| MERT-95M (QbH) | Raw Embeddings | DTW | 0.618 | 0.691 | 0.728 |
| MelSpec (QbH) | Raw Embeddings | DTW | 0.338 | 0.426 | 0.452 |
| HuBERT-LS (QbE) | Cluster IDs (K=10k) | TF-IDF | 0.633 | 0.723 | 0.733 |
| WavLM-LS (QbE) | Cluster IDs (K=10k) | TF-IDF | 0.567 | 0.676 | 0.767 |
| MelSpec (QbE) | Cluster IDs (K=10k) | TF-IDF | 0.433 | 0.518 | 0.600 |

## Limitations

Evaluation is restricted to two specific datasets (MIR-QBSH and a custom small-scale LibriSpeech QbE split with only 27 queries). The study is limited to base-size SSL models and does not evaluate larger model variants or multi-lingual scale. Furthermore, the framework does not provide an automated mechanism to dynamically select between continuous DTW and discrete TF-IDF matching based on input audio properties at deployment time.

## Why read this

Speech and audio researchers should read this paper to understand the fundamental mechanics of matching sequence-level SSL representations without supervision. It provides clear empirical evidence and theoretical intuition (via Soft-DTW and T-TF-IDF analyses) on when to use continuous dynamic time warping versus discrete token TF-IDF matching.

## Code

- https://github.com/MorenoLaQuatra/SSL-AIR

## Applications

Unsupervised query-by-humming music search engines, spoken term detection, query-by-example spoken document retrieval, and audio indexing in low-resource environments.

## Institutions / 機構

Kore University of Enna, Politecnico di Torino, Università degli Studi di Palermo

## Related

- (link related pages by id as the wiki grows)
