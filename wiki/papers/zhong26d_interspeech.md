---
id: zhong26d_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1559
pdf: https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.pdf
---

# Towards Personalized Federated Learning for Dysarthric Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhong26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1559)

**TL;DR** — This paper proposes two similarity-aware model aggregation strategies for personalized federated learning in dysarthric speech recognition, achieving absolute word error rate reductions of up to 0.99% on UASpeech and 0.56% on TORGO.

## Problem

Federated learning (FL) protects user privacy by training models across decentralized speech data, but standard aggregation strategies like FedAvg struggle with severe speaker heterogeneity and data scarcity inherent in dysarthric speech. Forcing all dysarthric speakers to share a single global model component is suboptimal because unique speech impairments vary drastically across individuals. Developing personalization techniques tailored to clinical speech patterns remains largely unexplored in decentralized setups.

## Method

The authors partition trainable model components—built on top of a frozen 24-layer HuBERT backbone fine-tuned on LibriSpeech—into a speaker-independent (SI) component updated via standard quantity-based FedAvg and a speaker-dependent (SD) component updated via similarity-weighted averaging. Two distinct similarity metrics are introduced: a parameter-based strategy computing cosine similarity between initial and updated local parameter vectors, and an embedding-based strategy calculating cosine similarity between sequence-averaged representations derived from a random 20% subsample of private client data. A trade-off weight balances standard quantity-based averaging with inter-speaker similarity weighting during SD parameter aggregation across 100 communication rounds.

## Results

Evaluated on the UASpeech dataset (16 dysarthric speakers, 17.8 training hours) and the TORGO dataset (8 dysarthric speakers, 15 training hours) using CTC loss and MAPSSWE statistical significance tests. Compared against a regularized FedAvg baseline, the proposed personalization methods yield statistically significant word error rate reductions of up to 0.99% absolute (3.15% relative) on UASpeech and 0.56% absolute (4.73% relative) on TORGO. The approach effectively pulls local updates toward clinically relevant speaker neighbors to suppress negative interference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building privacy-preserving, on-device automatic speech recognition systems for healthcare applications and users with speech impairments or motor disabilities.

## Related

- (link related pages by id as the wiki grows)
