---
id: sun26d_interspeech
category: speech-translation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1292
pdf: https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.pdf
---

# Automated Gradient-Driven Parameter Sharing for Low-Resource Multilingual Speech-to-Text Translation

[PDF](https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sun26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1292)

**TL;DR** — The paper introduces an automated gradient-driven parameter sharing framework for low-resource multilingual speech translation, achieving relative BLEU gains of up to 14.4% and COMET gains up to 3.26% over unified fine-tuning.

## Problem

Massively multilingual speech translation models typically employ uniform parameter sharing, which causes negative transfer and destructive gradient conflicts among tasks in low-resource regimes. Manually designing optimal shared-private configurations or language groupings is infeasible at scale due to prohibitive search costs and reliance on human intuition. This inefficiency degrades model convergence and translation performance when working with scarce training data.

## Method

The proposed Gradient-Driven Parameter Sharing (GDPS) framework automates architectural design through a three-step pipeline: gradient-driven decision-making, dynamic parameter configuration, and grouped fine-tuning. It isolates the high-density second feed-forward network (FFN2) in Conformer encoder layer 11, which exhibits a severe task interference bottleneck known as the purity paradox. Using k-means and hierarchical clustering alongside self/cross-gradient similarity scores, the framework dynamically groups languages and sets shared-private ratios. It then applies joint SVD and regularized canonical correlation analysis to calibrate subspaces and initialize group-specific modules using gradient energy proportions. Experiments are conducted using the SeamlessM4T-Medium 1.2B parameter model as the backbone.

## Results

Evaluated on four low-resource language pairs translating to English from the IWSLT 2025 track (Tunisian Arabic, Bemba, Estonian, and Irish with roughly 7k to 20k lines of training data), GDPS consistently outperforms standard unified fine-tuning across BLEU, TER, BERTScore, and COMET metrics. For instance, Tunisian-to-English BLEU improves from 7.64 to 8.74, and Bemba-to-English BLEU rises from 18.45 to 19.69. Ablation studies confirm that combining clustering, similarity metrics, and joint SVD yields superior performance compared to utilizing any single component in isolation.

## Code

- https://github.com/pineapplery/Gradient-Driven-Parameter-Sharing-for-Multilingual-Training

## Applications

Speech-to-text engineers and researchers developing multilingual speech translation systems for low-resource languages where uniform sharing causes negative interference.

## Related

- (link related pages by id as the wiki grows)
