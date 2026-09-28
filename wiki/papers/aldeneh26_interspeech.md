---
id: aldeneh26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3073
pdf: https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.pdf
---

# Which Data Matter? Embedding-Based Data Selection for Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aldeneh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3073)

**TL;DR** — Using a multi-embedding Maximal Marginal Relevance (MMR) framework to select 5% of a 100k-hour in-the-wild training corpus yields up to a 36.8% relative WER reduction over training on the full dataset for specialist ASR models.

## Problem

Modern ASR systems are often trained on massive, heterogeneous, in-the-wild pseudo-labeled corpora containing over 100k hours of audio. While generalist models can leverage this scale, production-size specialist models (10-100M parameters) lack the capacity to learn from all available data effectively, leading to domain mismatch issues. Naively utilizing all available data degrades performance compared to targeted data subsets tailored to specific evaluation conditions.

## Method

The framework utilizes an utterance-level multi-embedding extraction strategy combining speaker embeddings, phonetic representations (WavLM), and semantic text-derived representations (SBERT). It employs Maximal Marginal Relevance (MMR) with late fusion via a score-level weighted sum to balance domain relevance against internal subset diversity. For multi-domain target scenarios, it evaluates both maximum aggregation and mean aggregation strategies over target corpora subsets like LibriSpeech, CommonVoice, and TED-LIUM. Experiments are conducted using CTC-based specialist architectures.

## Results

Experiments evaluate performance on target speech corpora including LibriSpeech, CommonVoice English, and TED-LIUM, sourced from the 102k-hour Granary training dataset. Training on a strategically curated 5% data subset exceeds models trained on the full dataset by up to 36.8% relative word error rate (WER) reduction. The multi-embedding selection approach successfully balances acoustic, speaker, phonetic, and semantic axes of speech variability to outperform single-embedding baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners training production-size, domain-specific ASR models on large-scale heterogeneous or pseudo-labeled audio archives.

## Related

- (link related pages by id as the wiki grows)
