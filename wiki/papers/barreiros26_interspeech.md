---
id: barreiros26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1444
pdf: https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.pdf
---

# Massive Open-Vocabulary Keyword Spotting

[PDF](https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/barreiros26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1444)

**TL;DR** — This paper proposes a compressed open-vocabulary keyword spotting (OV-KWS) and contextual biasing system for ASR that achieves a 128x memory reduction and 6x speedup without sacrificing entity recall.

## Problem

Standard speech foundation models struggle to accurately transcribe rare domain-specific words and specialized terminology, which critically hinders downstream analysis in production environments like healthcare. While open-vocabulary keyword spotting combined with contextual biasing can mitigate this issue, existing systems scale linearly with glossary size and quickly become infeasible bottlenecks when handling thousands of terms due to excessive memory and latency footprints.

## Method

The architecture utilizes Whisper-large-v2 as the acoustic backbone and a ResNet-50 binary classifier to evaluate cosine similarity matrices between keyword and utterance embeddings. To compress representations, the authors introduce a three-part strategy: (1) an automated sparsemax-based layer selection mechanism to sparsely extract only the most predictive transformer layers (specifically layers 14, 16, and 32 out of 32), (2) a lightweight feed-forward network to reduce the hidden dimension down to 64, and (3) a 1D convolutional network with a max-pooling operation that halves the frame rate (compression factor alpha of 2). The detected keywords are then injected into the Whisper decoder prompt to bias generation toward specialized terms without fine-tuning the ASR model itself.

## Results

Evaluated on the Aishell (Chinese), ACL6060 (English), and an internal Portuguese medical consultation dataset (featuring 16,062 clinical terms), the proposed LHF-comp system preserves entity recall compared to uncompressed baselines while enabling massive databases. Specifically, the system shrinks the memory footprint by 128 times and processes databases 6 times faster, allowing 894,784 terms to fit within a 48GB GPU (NVIDIA L40) compared to a strict limit of 11,650 terms for uncompressed models on an 80GB GPU. Performance is validated using F1-scores and F1@5 metrics across multiple languages, including unseen ones.

## Code

- https://github.com/Priberam/Enhance-CB-Whisper

## Applications

Speech engineers and developers building production ASR systems for specialized domains like healthcare or air traffic control where handling massive custom glossaries of rare terminology is mandatory.

## Related

- (link related pages by id as the wiki grows)
