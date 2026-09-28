---
id: huang26i_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1471
pdf: https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.pdf
---

# Align-Consistency: Improving Non-autoregressive and Semi-supervised ASR with Consistency Regularization

[PDF](https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/huang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1471)

**TL;DR** — Align-Consistency extends consistency regularization to non-autoregressive iterative refinement for ASR, achieving test WER reductions down to 3.8/9.1 on LS-100 with unlabeled data.

## Problem

End-to-end ASR performance degrades significantly in low-resource settings, and while consistency regularization (CR) improves Connectionist Temporal Classification (CTC) robustness, its application to advanced non-autoregressive iterative refinement models remains largely unexplored. Furthermore, traditional pseudo-labeling pipelines often suffer from noisy supervisions that degrade downstream accuracy.

## Method

The method builds on Align-Refine, consisting of a base CTC module and a transformer decoder that performs S=2 refinement steps over frame-level hypotheses using shared Conformer encoder features (12 layers, 512 attention dimension, 2048 feed-forward dimension, ~110M-116M parameters). It introduces a symmetric Kullback-Leibler divergence consistency regularization (CR) loss applied across both the base CTC output and all refinement steps using differently augmented input pairs from SpecAugment. For semi-supervised learning, the model iteratively generates online pseudo-labels using its final refinement step on clean inputs, then optimizes a combined supervised and unsupervised objective weighted by factor gamma.

## Results

Evaluated on LibriSpeech (LS-100, LS-960) and Libri-Light (LL-6000), models use 300 (LS-100) or 5000 (LS-960) BPE vocabularies. On supervised LS-100, Align-Consistency improves test WERs from 12.2/26.7 (CR-CTC) to 10.0/22.9, and on LS-960 from 4.3/9.9 to 3.3/7.4. In semi-supervised self-training leveraging 960h or 6000h of unlabeled data, test WER drops from 10.0/22.9 to 3.8/9.1 on LS-100 with 6000h, and from 3.3/7.4 to 2.5/5.7 on LS-960. Ablations demonstrate that applying CR to both CTC and refinement steps, as well as maintaining CR on unsupervised data during self-training, are crucial for optimal performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building robust, high-throughput, low-resource, or semi-supervised automatic speech recognition systems.

## Related

- (link related pages by id as the wiki grows)
