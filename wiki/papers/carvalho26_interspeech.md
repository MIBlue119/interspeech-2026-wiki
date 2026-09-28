---
id: carvalho26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1969
pdf: https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.pdf
---

# Exploring the potential and limitations of Model Merging for Multi-Domain Adaptation in ASR

[PDF](https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/carvalho26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1969)

**TL;DR** — This paper evaluates 11 model merging algorithms for multi-domain ASR adaptation using Whisper Large-v3 and proposes BoostedTSV-M, achieving competitive in-domain accuracy while outperforming joint fine-tuning on out-of-distribution generalisation.

## Problem

Adaptation of large speech foundation models typically requires either maintaining separate checkpoints for every target domain or performing costly joint fine-tuning that demands historical data and extensive compute. While model merging avoids these pitfalls by combining independently fine-tuned models without retraining, existing parameter-combining methods have rarely been applied to speech foundation models or evaluated across diverse domain shifts and language varieties.

## Method

The authors introduce MergeWhisper, an extension of mergekit adding native Whisper support, and evaluate 11 algorithms spanning parameter-space, task-space, and subspace-based approaches across 10 European Portuguese domains (~350 hours of speech). They propose BoostedTSV-M, which prevents rank collapse by clamping and boosting small singular values based on cumulative energy thresholds. Additionally, they replace the numerically unstable orthogonal Procrustes step in subspace methods with Newton-Schulz orthogonalization (5 iterations with a quintic schedule), enabling high rank-percentage retention.

## Results

Evaluated on 46.2 hours of European Portuguese test data (comprising 10 in-domain and 5 out-of-distribution sets), plus African Portuguese, Brazilian Portuguese, OpenASR-HF English, and FLEURS benchmarks. BoostedTSV-M achieves an in-domain word error rate (WER) of 9.27% and an out-of-distribution WER of 16.11%, outperforming standard full fine-tuning (which scores 15.62% ID and 25.21% OOD). Furthermore, the merged models successfully preserve zero-shot multilingual and cross-lingual capabilities on English (OpenASR-HF WER around 7.1-7.6%) and FLEURS.

## Code

- https://github.com/Miamoto/mergewhisper

## Applications

Speech engineers and system deployers looking to combine multiple domain-specific ASR models into a single unified checkpoint without storing adaptation data or running expensive joint training.

## Limitations

The study focuses primarily on Whisper Large-v3 and European Portuguese, and performance can still degrade on extreme out-of-distribution shifts if singular value thresholds are not tuned properly.

## Related

- (link related pages by id as the wiki grows)
