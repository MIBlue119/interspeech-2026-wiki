---
id: martinez26_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-820
pdf: https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.pdf
---

# findsylls: A Language‑Agnostic Toolkit for Syllable‑Level Speech Tokenization and Embedding

[PDF](https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/martinez26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-820)

**TL;DR** — The findsylls toolkit unifies classical and self-supervised syllable-level speech tokenization methods under a common interface, achieving up to 93.3% nucleus F1 and 69.9% boundary F1 across diverse corpora.

## Problem

Research on syllable segmentation is highly fragmented across disparate implementations, datasets, and evaluation protocols, making it difficult to reproduce prior work or conduct controlled comparisons. Furthermore, mismatches between pretraining languages and target domains can severely degrade tokenization quality, and under-resourced languages lack unified infrastructure.

## Method

findsylls organizes processing into three interoperable modules: envelope computation (classical RMS, energy, Hilbert, spectral band subtraction, and theta oscillators), frame-level feature extraction (MFCCs, log-mel spectrograms, HuBERT, VG-HuBERT, Sylber), and segmentation algorithms (peakdetect, greedy cosine merging, optimized MinCut, and CLS thresholding). It exposes neural cues as pseudo-envelopes so that peak-picking logic can be applied uniformly across both classical and neural representations. The toolkit also provides a syllable-level embedding aggregation pipeline and a batch evaluation module supporting nucleus, boundary, and span F1 against time-aligned TextGrids.

## Results

Evaluated across seven corpora (LibriSpeech, WikiSpanish, TIMIT, PHC, Brent, Ornat-Swingley, and newly annotated Kono fieldwork data spanning over 130 hours and 1.9 million syllables), the framework benchmarks various pipeline combinations. Sylber with cosine-similarity features and a cosine threshold achieves the highest nucleus F1 of 93.3% and 45.7% span F1, while VG-HuBERT with feature self-similarity matrices (featSSM) and MinCut attains 65.0% boundary F1. Swapping components within findsylls reveals performance gains, such as pairing Sylber's cosine-similarity envelope with peakdetect to reach a top boundary F1 of 69.9%.

## Code

- https://github.com/hjvm/findsylls

## Applications

Speech and ML engineers and linguistic researchers building spoken language models, unsupervised word discovery systems, or analyzing under-documented and low-resource languages.

## Limitations

Syllable boundaries for English and Spanish are derived algorithmically via pronunciation dictionaries and forced alignments rather than authoritative ground truth.

## Related

- (link related pages by id as the wiki grows)
