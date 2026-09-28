---
id: poli26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2791
pdf: https://www.isca-archive.org/interspeech_2026/poli26_interspeech.pdf
---

# DiscoPhon: Benchmarking the Unsupervised Discovery of Phoneme Inventories With Discrete Speech Units

[PDF](https://www.isca-archive.org/interspeech_2026/poli26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/poli26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2791)

**TL;DR** — DiscoPhon is a multilingual benchmark suite for evaluating unsupervised phoneme inventory discovery from discrete speech units across 12 typologically diverse languages.

## Problem

Establishing phonetic inventories is critical for documenting endangered languages, but traditional manual field linguistics does not scale to thousands of unwritten idioms. While self-supervised learning (SSL) models encode phonetic details, converting their continuous embeddings into discrete units without supervision or target-language annotations remains a major challenge. Existing evaluation sets lack standardized setups across diverse phonemic contrasts, hindering progress in unsupervised speech tokenization.

## Method

DiscoPhon structures evaluation into two tracks: a many-to-one track with a fixed vocabulary of 256 units evaluating phonetic purity, and a one-to-one track matching the exact phoneme count plus silence evaluating direct categorization. The benchmark provides 10 hours of training data per language alongside 2-hour dev and test splits with forced-aligned phonetic transcripts. It evaluates models using Unit Quality via Pairwise Normalized Mutual Information (PNMI), Phone Error Rate (PER), and R-value/F1 segmentation metrics. Baseline evaluations are conducted using pretrained multilingual HuBERT and SpidR models.

## Results

Evaluated across 6 development languages (German, Swahili, Tamil, Thai, Turkish, Ukrainian) and 6 test languages (Basque, English, French, Japanese, Mandarin Chinese, Wolof). In the many-to-one track (256 units), zero-shot SpidR models outperform HuBERT baselines, achieving test PNMI scores up to 9.39 and PER values down to 64.48. Finetuning models on the 10-hour training split further improves test PNMI up to 9.39 for HuBERT and 6.40 for SpidR. One-to-one track results indicate that strict bijection mapping yields negative R-values for zero-shot HuBERT models on dev and test sets, reflecting the extreme difficulty of unconstrained phonetic discretization.

## Code

- https://benchmarks.cognitive-ml.fr/discophon

## Applications

Speech and ML engineers developing unsupervised speech tokenizers, zero-resource speech models, and automated linguistic documentation tools for under-resourced languages.

## Limitations

Audio data for Common Voice languages must be downloaded separately by users due to licensing restrictions, and the benchmark currently relies on read speech datasets rather than spontaneous conversational audio.

## Related

- (link related pages by id as the wiki grows)
