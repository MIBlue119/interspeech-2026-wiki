---
id: aldeneh26_interspeech
category: asr
labels: [self-supervised]
institutions: ["Apple", "Carnegie Mellon University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3073
pdf: https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.pdf
---

# Which Data Matter? Embedding-Based Data Selection for Speech Recognition

*Zakaria Aldeneh, Skyler Seto, Maureen de Seyssel, Jie Chi, Zijin Gu, Takuya Higuchi, Jee-weon Jung, Shinji Watanabe, David Grangier, Barry-John Theobald, Tatiana Likhomanenko*

[PDF](https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3073)

**Category:** `asr` · **Labels:** `self-supervised`

**TL;DR** — This paper investigates embedding-based data selection to curate small, highly relevant training subsets from 100k+ hours of in-the-wild audio, enabling specialist ASR models to outperform models trained on the full dataset by up to 36.8% relative Word Error Rate (WER) reduction.

## Key contributions

- Formulates a multi-embedding Maximal Marginal Relevance (MMR) framework to select data based on speaker, phonetic, and semantic relevance and diversity.
- Demonstrates that training production-sized ASR models (Conformer-Small/Large) on a strategically selected 5% subset of 100k hours of Granary data beats full-dataset training.
- Proves through probing that speaker, phonetic (WavLM), and semantic (SBERT) embeddings capture largely orthogonal information, making late-fusion multi-embedding selection synergistic.
- Analyzes multi-target selection strategies, showing that dataset-specific target distributions outperform joint multi-dataset aggregation.

## Problem

Large-scale pseudo-labeled speech corpora (such as the 100k-hour Granary dataset) expose speech models to immense acoustic and domain diversity, but specialist ASR models with 10–100M parameters lack the capacity to absorb this full heterogeneity. Prior domain adaptation approaches often rely on naive random down-sampling, simple utterance duration matching, or confidence scores, all of which fail to capture multi-faceted train-test distribution mismatches. This work tackles the challenge of identifying which precise subsets of large-scale in-the-wild data actually matter for target specialist domains.

## Method

The framework utilizes an embedding extractor $\phi(u_i)$ to map variable-length speech utterances into fixed-size representations. Three complementary embeddings are evaluated: MFA-Conformer speaker embeddings (3072-dim, projected to 256-dim via Gaussian random projection), WavLM Base+ frame-level phonetic embeddings (mean-pooled, 768-dim projected to 256-dim), and SBERT all-MiniLM-L12-v2 semantic sentence embeddings (384-dim text-based). To select subsets, the authors employ Maximal Marginal Relevance (MMR), which iteratively balances target relevance against diversity relative to already-selected samples using a trade-off parameter $\lambda \in [0, 1]$.

For multi-embedding selection, a late-fusion strategy is adopted where similarity scores across modalities are combined via weighted sums for both relevance and diversity. To scale MMR to 100k+ hours, the pipeline incorporates a batched greedy selection algorithm, candidate pre-filtering (selecting the top $\rho N$ candidates by relevance first), and $k$-means clustering ($k=200$) over target embeddings to reduce computational overhead. All ASR models are Conformer architectures (Conformer-Small at 9M parameters, Conformer-Large at 107M parameters) trained with CTC loss and AdamW optimizer using 8 $\times$ A100 (80GB) GPUs for 500k steps with learning rate warmup and cosine decay.

## Experimental setup

Evaluated using the English Granary dataset (102,458 hours of in-the-wild pseudo-labeled audio) as the source pool, and three target evaluation domains: LibriSpeech (961 training hours; clean/other test sets), CommonVoice English (1,594 training hours), and TED-LIUM (452 training hours). Metrics reported are Word Error Rate (WER %). Notable implementation details include 80-dimensional log-mel filterbanks, SpecAugment, Whisper text normalization, and an 8k-token word-piece tokenizer.

## Results

Training Conformer-Small on a 5% MMR-selected subset using multi-embedding fusion achieved a WER of 7.9% on LibriSpeech-clean (vs 12.5% on full Granary and 12.5% on random 5%) and 17.2% on LibriSpeech-other (vs 23.2% full, 23.5% random 5%), representing a relative WER reduction of up to 36.8%. On CommonVoice, the multi-embedding fusion achieved 34.0% WER (vs 36.6% full, 37.1% random 5%), and on TED-LIUM achieved 9.4% (vs 11.0% full, 10.7% random 5%). For Conformer-Large, multi-embedding selection on 5% of the data yielded 4.4% on LS-clean (vs 6.7% full), 10.7% on LS-other (vs 14.3% full), 23.6% on CV (vs 25.4% full), and 5.9% on TED-LIUM (vs 6.5% full).

Ablations on the MMR trade-off parameter $\lambda$ show that $\lambda = 0.7$ or $\lambda = 1.0$ (maximizing relevance) yields the strongest results, and cross-embedding logistic regression probing confirms low cross-predictability (e.g., WavLM predicts speaker with only 21.3% accuracy), validating that the embeddings capture orthogonal data attributes. The strategy does not win universally: SBERT-based selection improves LibriSpeech but degrades CommonVoice performance, and multi-dataset aggregation strategies (mean/max pooling across multiple target domains) consistently underperformed target-specific single-domain subset selection.

| System | Training Data | LS-clean | LS-other | CV | TED-LIUM |
|---|---|---|---|---|---|
| Conformer-Small | Granary (Full) | 12.5 | 23.2 | 36.6 | 11.0 |
| Conformer-Small | Granary (Random 5%) | 12.5 | 23.5 | 37.1 | 10.7 |
| Conformer-Small | MMR (Speaker 5%) | 10.8 | 20.9 | 34.4 | 9.6 |
| Conformer-Small | MMR (WavLM 5%) | 10.3 | 20.6 | 33.6 | 9.2 |
| Conformer-Small | MMR (SBERT 5%) | 8.9 | 18.4 | 35.7 | 9.9 |
| Conformer-Small | MMR (Fusion 5%) | 7.9 | 17.2 | 34.0 | 9.4 |

## Limitations

The greedy MMR selection procedure is computationally expensive despite batched pre-filtering optimizations. The reliance on pseudo-labeled Granary data introduces inherent label noise that may cap performance limits. Furthermore, experiments are restricted to English speech and CTC-based Conformer architectures, leaving open whether findings transfer directly to sequence-to-sequence/transducer models or multilingual setups.

## Why read this

Read this paper if you train speech recognition models on massive, noisy, in-the-wild corpora and need an effective recipe to build high-performance specialist models without paying the compute cost of full-scale training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Training efficient, domain-adapted ASR models for edge deployment, specialized medical/legal transcription services, or low-resource accent adaptation.

## Institutions / 機構

Apple, Carnegie Mellon University

## Related

- [Data Filtering Trade-offs in Self-Supervised Speech Representation Learning: A Study on Unconstrained Broadcast Audio](getman26_interspeech.md) — same problem · relatedness 2.2/3
- [Leveraging Discriminative Capabilities of Self-Supervised Neural Audio Fingerprinting for Efficient Speech Data Annotation](altwlkany26_interspeech.md) — shared technique · relatedness 2.1/3
- [Genealogical Priors in Self-Supervised Learning: Improving Speech Technology for Low-Resource Languages](granda26_interspeech.md) — shared technique · relatedness 2.0/3
- [Leveraging Audio-LLMs to Filter Speech-to-Speech Training Data](chen26l_interspeech.md) — shared technique · relatedness 2.0/3
- [Which Languages Transfer Best to Warlpiri? A Similarity-Based Study for Low-Resource ASR](mylvaganam26b_interspeech.md) — shared technique · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
