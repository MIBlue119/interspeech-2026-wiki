---
id: krysinska26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1040
pdf: https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.pdf
---

# Transitional Objective Learning with Connectionist Temporal Classification in Phoneme Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/krysinska26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1040)

**TL;DR** — Transitional Objective Learning (TOL) dynamically shifts training objectives from coarse-grained phonetic categories to fine-grained phonemes, reducing phoneme error rate by 9.5% to 14.3% across three languages.

## Problem

Connectionist Temporal Classification (CTC) models suffer from an early suppression phase dominated by blank tokens, leading to weak initial training signals, flat loss landscapes, and delayed alignment learning. This phenomenon makes early optimization slow and unstable, requiring curriculum strategies that can guide models toward meaningful phonemic distinctions without altering underlying network architectures.

## Method

The paper introduces Transitional Objective Learning (TOL), a curriculum-learning framework that uses a weighted combination of multiple loss functions with varying levels of granularity. Training starts with a coarse-grained auxiliary objective classifying three broad phonetic groups (vowels, voiced consonants, and voiceless consonants) alongside the fine-grained phoneme CTC loss. A sigmoid schedule gradually increases the weight of the fine-grained phoneme loss while decreasing the auxiliary loss weight over epochs. Experiments leverage pretrained wav2vec 2.0, wav2vec2-XLSR, and wav2vec2-voxpopuli-fr models using learning rates from 1e-5 to 1e-4 and batch sizes of 16 to 32 across English, French, and Polish corpora.

## Results

Evaluated on TIMIT, LnNor, and Vibravox datasets, TOL achieves relative Phoneme Error Rate (PER) reductions of 10.2% on TIMIT (0.044 vs 0.049), 9.5% on LnNor (0.076 vs 0.084), and 14.3% on Vibravox (0.054 vs 0.063), with statistical significance confirmed via t-tests. TOL also accelerates convergence, enabling models to reach target performance much earlier (e.g., epoch 15 vs 30 on TIMIT) and with improved optimization stability compared to standard CTC fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and practitioners training acoustic models or phoneme recognition systems with CTC can use TOL to accelerate convergence and improve accuracy.

## Related

- (link related pages by id as the wiki grows)
