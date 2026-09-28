---
id: tran26c_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3458
pdf: https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.pdf
---

# From Single to Multi-Label SER: Dataset and Mamba-Based Fusion Model

[PDF](https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tran26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3458)

**TL;DR** — This paper introduces a reproducible multi-label speech emotion recognition benchmark derived from MSP-Podcast along with an efficient dual-branch Mamba fusion model, achieving a micro-F1 around 0.50.

## Problem

Most existing speech emotion recognition datasets and models assume a single dominant emotion per utterance, which discards natural perceptual ambiguity and subjective annotator disagreement. While recent multi-label annotations exist, public benchmarks lack standardized construction protocols, and modern Transformer- or SSL-based models are computationally heavy for long audio sequences.

## Method

The authors construct multi-hot emotion labels from MSP-Podcast V2.0 using quality gates, deterministic vote-to-label rules, and train-only long-tail pruning that yields an 18-combination space. The proposed model uses parallel Mamba state-space encoders for 100-dim LogMel spectrograms and 40-dim MFCC features to achieve linear-time sequence modeling. Utterance-level embeddings are obtained via masked mean pooling, integrated through a gated fusion module or late logit fusion, and trained with binary focal loss and an inverse-frequency weighted sampler.

## Results

Evaluated on two MSP-Podcast test partitions (Test1 and Test2) using a fixed decision threshold of 0.45, the proposed Fusion-Gate model achieves a micro-F1 of 0.510 on Test1 and 0.510 on Test2, with macro-F1 scores of 0.305 and 0.283 respectively. Compared against reimplemented baselines such as VQF-DNN, MFCC-LSTM, ViT-LogMel, and multimodal transformers like MulT and WavLM, the Mamba-based models deliver competitive accuracy while remaining lightweight.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers building resource-efficient, naturalistic speech emotion recognition systems that capture concurrent emotional states.

## Related

- (link related pages by id as the wiki grows)
