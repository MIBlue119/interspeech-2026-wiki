---
id: song26c_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-969
pdf: https://www.isca-archive.org/interspeech_2026/song26c_interspeech.pdf
---

# Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/song26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/song26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-969)

**TL;DR** — This paper proposes a segment-wise embedding-domain graph attention network with a self-supervised Swin-Transformer adaptor for speech emotion recognition, achieving 76.22% WA and 76.84% UA on IEMOCAP.

## Problem

Traditional speech emotion recognition systems rely on utterance-level supervision that struggles with data scarcity and rigid one-hot labels, ignoring that real utterances contain ambiguous, mixed, or brief emotional expressions. Standard aggregation methods like average-pooling or max-pooling also tend to obscure fine-grained or transient emotional segments within variable-length utterances. This causes suboptimal mapping and lack of robustness against distribution shifts across speakers and acoustic environments.

## Method

The framework utilizes a frozen HuBERT-large model as a frame-level feature extractor coupled with a 1D Swin-Transformer as a segment-wise adaptor. During pre-training, a siamese student-teacher architecture employs block mask prediction, utterance-level self-distillation (KL loss), and KoLeo feature uniformity regularization to counter distribution shifts. In the fine-tuning stage, fully-connected graphs are constructed using multi-crop segment-wise speech embeddings (SSEs) as nodes, which are then processed by a 2-layer Graph Attention Network (GAT) with residual connections. The model is optimized using a combination of cross-entropy and supervised contrastive loss (SCL) to handle label ambiguity.

## Results

Evaluated on IEMOCAP (5-fold cross-validation, 4 classes) and MER2023 benchmarks, the proposed method achieves 76.22% weighted accuracy (WA) and 76.84% unweighted accuracy (UA) on IEMOCAP. On MER2023, it achieves 71.53% F1-score and 0.9844 valence mean-square error (MSE), outperforming baseline pooling strategies and prior state-of-the-art approaches like emotion2vec and Co-att.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and affective computing engineers building human-computer interaction systems, mental health monitoring tools, or automated affective analysis applications.

## Related

- (link related pages by id as the wiki grows)
