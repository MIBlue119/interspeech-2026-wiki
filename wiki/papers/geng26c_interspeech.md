---
id: geng26c_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1719
pdf: https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.pdf
---

# Beyond Uncertainty and Diversity: Temporal-Spectral Guided Active Learning for Audio

[PDF](https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/geng26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1719)

**TL;DR** — The paper introduces Temporal-Spectral Active Learning (TSAL), a plug-and-play active learning framework for audio that models soft-loss distributions and feature-gradient similarity to improve labeling efficiency under limited budgets.

## Problem

Existing active learning methods for data selection typically rely on generic uncertainty or diversity metrics, treating audio instances as static vectors while overlooking crucial temporal-spectral structures like transient events and harmonic continuity. This misalignment causes suboptimal sample selection, leading to inefficient model training and higher annotation costs when dealing with complex audio signals.

## Method

TSAL builds informative patterns implicitly by modeling the soft-loss distribution of labeled samples to identify high-loss anchors that contain hard-to-learn temporal-spectral structures. It then leverages a feature-gradient similarity mechanism combining cosine similarities of feature embeddings and estimated loss gradients to select unlabeled candidates matching these patterns. The core architecture instantiates the model with a Self-Supervised Audio Spectrogram Transformer (SSAST). In each cycle, 5% of the unlabeled pool is queried until a 40% annotation budget is exhausted.

## Results

Evaluated on ESC-50, AudioSet-20k, DCASE2016, and UrbanSound8K benchmarks against baselines like RANDOM, CONF, MARGIN, ENTROPY, CORESET, BALD, and CLS-AL. TSAL achieves 82.65% accuracy on ESC-50 (surpassing RANDOM by 2.75%), 22.08% mAP on AudioSet-20k, 79.23% on DCASE2016, and 82.54% on UrbanSound8K using a 40% labeling budget. Ablation studies confirm that removing either the soft selection policy, feature similarity, or gradient similarity degrades performance across all tested datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and researchers working on audio classification and acoustic scene analysis who need to reduce manual annotation costs and build high-performing models with limited labeled data.

## Related

- (link related pages by id as the wiki grows)
