---
id: li26u_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1210
pdf: https://www.isca-archive.org/interspeech_2026/li26u_interspeech.pdf
---

# Geometric Second-Order Feature Correlation Learning for Self-Supervised Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/li26u_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26u_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1210)

**TL;DR** — The paper introduces a Second-Order Correlation (SOC) layer to aggregate self-supervised speech representations by modeling feature covariances on the Riemannian manifold, achieving a peak weighted accuracy of 73.50% on the ESD dataset.

## Problem

Standard speech emotion recognition models rely on first-order pooling methods like average pooling or attention mechanisms, which discard feature correlations and joint distributions that are critical for capturing emotional prosody. Direct higher-order modeling is computationally intractable due to the quadratic parameter growth of high-dimensional self-supervised backbones, while naive bilinear pooling in Euclidean space introduces geometric distortion known as the swelling effect. Consequently, downstream classifiers suffer from blurred decision boundaries between acoustically similar emotions.

## Method

The framework consists of a frozen upstream self-supervised backbone (Wav2Vec 2.0, HuBERT, or WavLM), a novel Second-Order Correlation (SOC) layer, and a standard downstream MLP classifier. The SOC layer projects high-dimensional frame-level embeddings into a compact subspace via a learnable linear layer, computes a trace-normalized sample covariance matrix to capture channel interactions, and applies Log-Euclidean Mapping (LEM) via eigen-decomposition to map the Symmetric Positive Definite manifold descriptor onto a tangent space. Finally, half-vectorization extracts unique elements from the tangent matrix for classification.

## Results

Evaluated on ESD (5-fold) and RAVDESS (6-fold) datasets under standard speaker-independent protocols using Wav2Vec 2.0, HuBERT, and WavLM base models. SOC consistently outperforms baseline aggregation methods (GAP, ASP, FA), improving weighted accuracy on Wav2Vec 2.0 by 4.68% on ESD and 4.42% on RAVDESS. Ablation experiments demonstrate that removing Log-Euclidean Mapping consistently degrades performance (e.g., dropping 1.45% on ESD with HuBERT) due to geometric incompatibility.

## Code

- https://github.com/secret-code-source/SOC

## Applications

Speech engineers and researchers building speech emotion recognition systems for call centers, affective computing, or human-computer interaction.

## Limitations

Performance is sensitive to the choice of the subspace dimension parameter, where excessively low dimensions cause correlation starvation and excessively high dimensions trigger spectral noise and eigenvalue instability.

## Related

- (link related pages by id as the wiki grows)
