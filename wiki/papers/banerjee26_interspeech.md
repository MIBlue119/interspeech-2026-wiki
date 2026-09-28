---
id: banerjee26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-141
pdf: https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.pdf
---

# wav2tok 2.0: Scalable Audio Tokenization Maintaining Explicit Pairwise Token Alignment for Efficient Audio Retrieval

[PDF](https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-141)

**TL;DR** — Wav2tok 2.0 is a scalable speech tokenizer for query-by-example spoken term detection that combines self-supervised contrastive learning with explicit CTC and DTW-aligned framewise prediction losses, achieving superior retrieval accuracy and token consistency over existing baselines.

## Problem

General-purpose speech tokenizers like HuBERT or WavLM are optimized for reconstruction or self-supervised prediction rather than retrieval-oriented sequence alignment. While prior retrieval-focused methods like BEST-STD rely on implicit alignment or suffer from tightly-coupled, non-scalable training loops (as in the original wav2tok), a scalable and explicitly alignment-aware tokenization framework is missing. This gap matters because maintaining explicit pairwise token consistency across variable-length utterances without sacrificing scalability is critical for robust acoustic indexing, podcast retrieval, and voice search.

## Method

The architecture utilizes a spectrogram frontend followed by a 4-layer bidirectional Mamba state-space model that maps utterances to 512-dimensional ℓ2-normalized frame embeddings, quantized via a codebook with sizes K ranging from 128 to 1024 using exponential moving average updates. Training occurs in two stages: Stage I applies self-supervised SimCLR-style contrastive learning and commitment loss on DTW-aligned variable-length utterances to learn speaker-invariant representations. Stage II enforces pairwise token consistency using a modified CTC-based sequence alignment loss (disallowing blank transitions to handle deduplicated token sequences) and a novel DTW-aligned framewise token prediction loss. An adaptive weighting scheme dynamically scales the CTC loss relative to the contrastive loss based on an iterative ratio to ensure stable optimization.

## Results

Evaluated on the LibriSpeech train-clean-100 dataset and cross-dataset retrieval on the unseen TIMIT corpus, wav2tok 2.0 is compared against HuBERT-Base, WavLM-Base, EnCodec, SpeechTokenizer, conventional DTW/MFCC pipelines, BEST-STD, and wav2tok. Using metrics including Mean Average Precision (MAP), Mean Reciprocal Rank (MRR), and Maximum Term Weighted Value (MTWV) for both in-vocabulary (IV) and out-of-vocabulary (OOV) queries, wav2tok 2.0 consistently outperforms all baselines. For instance, with a codebook size of 256/512 on LibriSpeech, it achieves peak in-vocabulary MAP/MRR values up to 0.89/0.90, significantly surpassing BEST-STD and general-purpose tokenizers. Ablations confirm that combining both the CTC pairwise alignment and the proposed DTW-aligned framewise prediction loss yields higher unigram and bigram Jaccard similarities (up to 0.83 unigram / 0.75 bigram on LibriSpeech train-clean-100) compared to using either objective in isolation.

## Code

- https://github.com/adhiraj69/wav2tok2

## Applications

Engineers and researchers building voice search systems, audio indexing tools, podcast retrieval engines, or speech-based large language models will use this tokenizer for efficient query-by-example spoken term detection.

## Related

- (link related pages by id as the wiki grows)
