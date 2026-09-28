---
id: visser26_interspeech
category: self-supervised
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-315
pdf: https://www.isca-archive.org/interspeech_2026/visser26_interspeech.pdf
---

# ZeroSyl: Simple Zero-Resource Syllable Tokenization for Spoken Language Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/visser26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/visser26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-315)

**TL;DR** — ZeroSyl is a simple, training-free method that extracts syllable boundaries and semantic features from a frozen WavLM model to build pure speech language models, outperforming prior multi-stage syllabic tokenizers on syntactic and narrative benchmarks.

## Problem

Pure speech language models must compress raw audio into discrete tokens, but standard frame-level self-supervised tokens create excessively long sequences that degrade long-range syntactic modeling. Existing syllable-level tokenizers solve this by utilizing intricate, multi-stage training pipelines that fine-tune SSL models with specialized supervision objectives. This complexity hinders reproducibility and scaling, creating a need for a straightforward, unsupervised approach to syllable tokenization.

## Method

ZeroSyl extracts frame-wise embeddings from layer 13 of a frozen WavLM Large model, computes their L2 norms, smooths them with a 3-point moving average, and applies prominence-based peak detection with a threshold of 0.45 sigma to find syllable boundaries. Within these discovered segments, semantic features are mean-pooled from WavLM's layer 22 to capture rich semantic information. The pooled vectors are discretized into a vocabulary of 10,000 items using spherical K-means trained on 100 hours of LibriSpeech. Unsupervised hierarchical agglomerative clustering is then used to identify and collapse multiple silence centroids into a single vocabulary item, reducing the vocabulary size to 9,116 and yielding a bitrate of 52 bps. Finally, a causal language model based on the 125-million parameter OPT architecture is trained on the resulting discrete sequences.

## Results

Evaluated on LibriSpeech and Libri-Light, ZeroSyl achieves an R-value of 75% and token F1 of 54% for boundary detection, outperforming Sylber's 71% R-value and 51% F1. On syllable discovery, ZeroSyl reaches an optimal Syllable-Normalized Mutual Information (SNMI) of 88.9%, surpassing Sylber (83.5%) and SyllableLM (82.6%). When evaluated on downstream tasks, ZeroSyl outperforms prior syllabic tokenizers across lexical (sWUGGY), syntactic (sBLIMP), and narrative (Topic StoryCloze) benchmarks. Ablations show that collapsing redundant silence centroids via hierarchical clustering substantially improves inverse purity from 20.0% to 32.0%.

## Code

- https://github.com/nicolvisser/ZeroSyl

## Applications

Speech and machine learning engineers building pure text-free spoken language models and low-resource speech understanding systems can use this method for efficient, unsupervised audio tokenization.

## Limitations

In scaling experiments, ZeroSyl's coarse syllabic units do not surpass the scaling performance of fine-grained frame-level units on lexical tasks.

## Related

- (link related pages by id as the wiki grows)
