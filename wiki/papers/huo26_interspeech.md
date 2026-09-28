---
id: huo26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2676
pdf: https://www.isca-archive.org/interspeech_2026/huo26_interspeech.pdf
---

# Do speech foundation models really learn words?

[PDF](https://www.isca-archive.org/interspeech_2026/huo26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huo26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2676)

**TL;DR** — By using residualization to remove phonemic information from speech foundation models, the authors demonstrate that HuBERT and wav2vec 2.0 independently encode word identities in their middle-to-late transformer layers, which enhances unsupervised word discovery performance.

## Problem

Self-supervised speech models successfully pass word-level probing tasks, but it remains unclear whether they truly represent abstract word identity or simply encode fine-grained phonemic form (diphones and triphones) from which words can be trivially recognized. Because standard cosine similarity and probing methods conflate phonological form with lexical meaning, existing evaluations fail to determine if these representations possess independent word-level properties. Resolving this ambiguity is critical for understanding what linguistic structures speech foundation models actually capture.

## Method

The study applies a linear residualization technique using ridge regression to subtract phoneme, diphone, and triphone variations from the standardized hidden representations of base-size HuBERT and wav2vec 2.0 models trained on the LibriSpeech dev-clean dataset. The regularization weight alpha is log-searched between 1 and 0.0001 to estimate factor-level means without full-word contamination, and standardized frame embeddings are evaluated using five-fold cross-validation with softmax linear probes. Additionally, the authors test the residualized representations on an unsupervised word discovery pipeline consisting of boundary detection and k-means clustering (fixing k=13,967 on Layer 9 of HuBERT).

## Results

Across models, residualizing out phonemes drops phoneme classification accuracy significantly while preserving robust word-identity classification in middle-to-late transformer layers (peaking at over 90% accuracy in layers 9-10 for HuBERT and layers 7-8 for wav2vec 2.0). Even after removing triphone information, word classification performance remains well above baseline length and triphone expectations, particularly for words of lengths 3 to 6. For unsupervised word discovery using HuBERT layer 9, removing phoneme targets consistently improves normalized edit distance (NED), token F1-score, and R-values across multiple boundary detection hyperparameter settings.

## Code

- https://github.com/facebookresearch/fairseq

## Applications

Speech researchers and machine learning engineers analyzing or interpreting self-supervised speech representations, as well as developers working on low-resource unsupervised speech segmentation and lexicon discovery.

## Limitations

The linear residualization approach falls slightly short of reducing phoneme probe classification accuracy to true chance level, and the technique only verifies word-identity encoding rather than full semantic or syntactic understanding.

## Related

- (link related pages by id as the wiki grows)
