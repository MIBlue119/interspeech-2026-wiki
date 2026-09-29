---
id: banerjee26_interspeech
category: asr
institutions: ["Indian Institute of Technology Kanpur", "KU Leuven"]
code: https://github.com/adhiraj69/wav2tok2
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-141
pdf: https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.pdf
---

# wav2tok 2.0: Scalable Audio Tokenization Maintaining Explicit Pairwise Token Alignment for Efficient Audio Retrieval

*Adhiraj Banerjee, Vipul Arora*

[PDF](https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/banerjee26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-141)

**Category:** `asr`

**TL;DR** — wav2tok 2.0 is a scalable audio tokenizer designed for query-by-example spoken term detection that combines a BEST-STD backbone with explicit CTC and DTW-aligned framewise token prediction objectives, outperforming general-purpose tokenizers and achieving state-of-the-art retrieval accuracy.

## Key contributions

- Replaces tightly coupled clustering and alignment training in original wav2tok with a scalable two-stage training recipe adapted from the BEST-STD backbone.
- Introduces a novel DTW-aligned framewise token prediction loss that enforces fine-grained cross-utterance agreement under monotonic alignment paths.
- Applies a modified CTC alignment loss with blank transitions explicitly disallowed (log-probability set to negative infinity) to handle deduplicated non-repeating token sequences.
- Implements an adaptive weighting strategy for the CTC loss that scales its magnitude relative to the contrastive loss to ensure stable convergence and numerical stability.

## Problem

Query-by-example spoken term detection (QbE-STD) requires retrieving audio utterances containing a spoken query without relying on text. Prior ASR-based approaches fail on short or out-of-vocabulary words, while traditional DTW-based template matching does not scale to large archives. General-purpose speech tokenizers like HuBERT, WavLM, and EnCodec lack retrieval-oriented alignment objectives, and existing specialized tokenizers like the original wav2tok suffer from tightly coupled training recipes that prevent scaling to larger datasets.

## Method

wav2tok 2.0 uses a 4.7M-parameter encoder consisting of a 96-dimensional log-Mel spectrogram frontend followed by four bidirectional Mamba state-space layers that project frames into a 512-dimensional L2-normalized embedding space. Discretization is performed via vector quantization using an exponential moving average updated codebook (testing sizes K from 128 to 1024).

Training proceeds in two stages. In Stage I (Discriminative Pretraining), the model learns speaker-invariant representations for 783 epochs using a SimCLR-style contrastive loss and a commitment loss over DTW-aligned positive utterance pairs, using the Adam optimizer with a learning rate of 5e-4 and temperature tau = 0.2. In Stage II (Pairwise Token Consistency Learning), training runs for an additional 40 epochs and combines two pairwise objectives: a CTC-based sequence alignment loss (with blank transitions disallowed and adaptive weighting controlled by parameter gamma = 0.5 to maintain scale relative to contrastive losses) and a novel DTW-aligned framewise token prediction negative log-likelihood loss.

At inference time, audio tracks are segmented into 1-second fixed windows with hop sizes, tokenized into discrete sequences, converted into bigrams to build an inverted index, and matched using a two-stage coarse filtering and fine Jaccard similarity scoring pipeline.

## Experimental setup

Evaluated on LibriSpeech train-clean-360 for training (test-clean for model selection) with retrieval over the 100-hour train-clean-100 subset, plus cross-dataset evaluation on the unseen TIMIT corpus (2,680 audio files). Compared against conventional features (MFCC, phone posteriors, bottleneck features), general-purpose tokenizers (HuBERT-Base, WavLM-Base, EnCodec, SpeechTokenizer), and specialized retrieval tokenizers (BEST-STD, original wav2tok). Evaluated using Mean Average Precision (MAP), Mean Reciprocal Rank (MRR), and Maximum Term Weighted Value (MTWV) for both in-vocabulary and out-of-vocabulary query sets.

## Results

wav2tok 2.0 consistently outperforms all baselines across datasets and query types. On LibriSpeech train-clean-100 in-vocabulary queries with a 512 codebook size, wav2tok 2.0 achieves a MAP of 0.86, MRR of 0.90, and MTWV of 0.66, substantially beating BEST-STD (MAP 0.73, MRR 0.78, MTWV 0.56) and wav2tok (MAP 0.80, MRR 0.86, MTWV 0.61). For out-of-vocabulary queries, wav2tok 2.0 reaches a MAP of 0.82 and MRR of 0.84. On the unseen TIMIT corpus, wav2tok 2.0 maintains superior robustness, scoring an in-vocabulary MAP of 0.72 and out-of-vocabulary MAP of 0.69.

| System | Tokens | LibriSpeech IV (MAP) | LibriSpeech IV (MRR) | LibriSpeech OOV (MAP) | LibriSpeech OOV (MRR) |
|---|---|---|---|---|---|
| HuBERT-Base | 512 | 0.22 | 0.25 | 0.22 | 0.23 |
| WavLM-Base | 512 | 0.35 | 0.39 | 0.35 | 0.36 |
| Speech Tokenizer | 1024 | 0.47 | 0.51 | 0.43 | 0.43 |
| BEST-STD | 512 | 0.73 | 0.78 | 0.70 | 0.71 |
| wav2tok | 512 | 0.80 | 0.86 | 0.77 | 0.78 |
| wav2tok 2.0 (Ours) | 512 | 0.86 | 0.90 | 0.82 | 0.84 |

## Limitations

Evaluated primarily on English corpora (LibriSpeech and TIMIT) without testing multilingual or highly code-switched scaling limits. The model processes audio in fixed 1-second segments, potentially constraining long-form contextual dependencies. While optimal transport regularization and noise-robust variants are noted as compatible, they were omitted from the core experiments.

## Why read this

Speech researchers and engineers working on spoken term detection, audio retrieval, or speech LLM tokenization will find a blueprint for scaling explicit alignment-aware discrete speech representations without sacrificing training stability.

## Code

- https://github.com/adhiraj69/wav2tok2

## Applications

Query-by-example spoken term detection, voice search, audio indexing, podcast retrieval, and discrete token generation for speech large language models.

## Institutions / 機構

Indian Institute of Technology Kanpur, KU Leuven

## Related

- [SSL-based Sequence Matching for Unsupervised Audio Retrieval](laquatra26b_interspeech.md) — same problem · relatedness 2.6/3
- [Streaming Open-Vocabulary Keyword Spotting via Role Swapping in Cross-Attention](chen26q_interspeech.md) — same problem · relatedness 2.0/3
- [INSPIRE: A Benchmark for Instruction-Aware Speech Retrieval](li26r_interspeech.md) — same problem · relatedness 2.0/3
- [Massive Open-Vocabulary Keyword Spotting](barreiros26_interspeech.md) — same problem · relatedness 2.0/3
- [KFC-KWS: Keyframe Fusion with CTC for User-Defined Keyword Spotting](li26y_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
