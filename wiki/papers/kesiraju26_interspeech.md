---
id: kesiraju26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3315
pdf: https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.pdf
---

# FLiP: Towards understanding and interpreting multimodal multilingual sentence embeddings

[PDF](https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kesiraju26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3315)

**TL;DR** — The paper introduces factorized linear projection (FLiP) models to interpret pretrained multilingual and multimodal sentence embeddings, successfully recovering over 75% of lexical content.

## Problem

Pretrained sentence embeddings act as black boxes, making it difficult to understand what semantic, linguistic, or modal properties are actually preserved within a single vector. While massive downstream benchmarks rank models, they fail to provide intrinsic diagnostic insights into representation geometry. This lack of interpretability hinders engineers and researchers from systematically identifying language and modality biases in sentence encoders.

## Method

The paper proposes factorized linear projection (FLiP), a log-linear model that maps sentence embeddings to a vocabulary space via the factorization $W = AB$, where $A$ is a sparse word embedding matrix and $B$ is a modality-to-latent projection. Training uses cross-modal and cross-lingual objectives optimized via AdamW, combining speech and text pairs from Mozilla Common Voice and parallel texts from Europarl and Samanantar. The models use a fixed 100K unigram vocabulary and explore factorization ranks $r$ from 128 to 1024 alongside L1 regularization on $A$ for sparsity.

## Results

Evaluated on English, German, French, Bengali, Hindi, Tamil, and Telugu datasets using SONAR, LaBSE, and Gemini embeddings, FLiP recovers 75-80% of lexical content, significantly outperforming non-factorized full-rank linear probing baselines. Specifically, a 512-dimensional FLiP model achieves 76.77% text accuracy and 73.62% speech accuracy on English Common Voice SONAR embeddings, matching full-rank performance while reducing parameters. Cross-modal analysis reveals high Jaccard index consistency (over 78-89%) between speech and text embedding projections, while cross-lingual tests show English acts as a dominant anchor space.

## Code

- https://github.com/BUTSpeechFIT/FLiP

## Applications

Speech and machine learning engineers can use FLiP as an intrinsic diagnostic tool to audit modality alignment, language biases, and semantic preservation in pretrained sentence encoders without relying on massive downstream task benchmarks.

## Limitations

The evaluation is constrained to unigram-based keyword extraction and relies on lowercased text with punctuation removed, limiting analysis to lexical retrieval rather than complex compositional syntax.

## Related

- (link related pages by id as the wiki grows)
