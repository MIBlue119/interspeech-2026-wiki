---
id: firc26_interspeech
category: audio-deepfake
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-120
pdf: https://www.isca-archive.org/interspeech_2026/firc26_interspeech.pdf
---

# The Hidden Cost of Pairwise Verification in Synthetic Speech Source Tracing

[PDF](https://www.isca-archive.org/interspeech_2026/firc26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/firc26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-120)

**TL;DR** — Global anchoring outperforms pairwise verification in open-set synthetic speech source tracing, achieving lower in-domain error (8.61% EER) on MLAAD.

## Problem

Open-set synthetic speech source tracing is frequently framed as a pairwise verification problem borrowed from biometrics, but it remains unclear whether local similarity metrics generalize effectively to subtle generator-specific artifacts. Because forensic attribution relies on fine-grained distinctions between closely related models, choosing the wrong training paradigm can significantly degrade performance at strict low false-positive operating points.

## Method

The study compares global anchoring via cross-entropy classification against Siamese-style pairwise verification with binary cross-entropy under a matched 300M parameter Wav2Vec 2.0 XLS-R backbone and Multi-Head Factorized Attention (MHFA) pooling. Pairwise variants test various trial-selection regimes including intermediate random sampling, latent hard-negative mining, directional coverage-driven clustering, and metadata-guided rival mining. Ablation controls include XLS-R fine-tuning and explicit low-dimensional embedding bottlenecks (10 to 13 dimensions) applied to the globally supervised baseline.

## Results

Evaluated in-domain on MLAAD and out-of-domain on STOPA using equal error rate (EER) and fixed-FPR true positive rates. Global anchoring achieves an in-domain EER of 8.61%, outperforming pairwise variants which range from 12.39% to 15.12% EER. An embedding space analysis using variance-based principal component count (k99) shows that pairwise objectives induce a steep embedding decay (k99 ≈ 13) compared to global anchoring (k99 ≈ 121). However, forcing a 10-to-13 dimensional bottleneck on the global baseline preserves strong performance (7.05% to 8.84% EER), demonstrating that the performance gap stems from objective-induced shaping of retained directions rather than dimensionality alone.

## Code

- https://github.com/Security-FIT/hidden-cost-pairwise-verification

## Applications

Audio forensic engineers and security practitioners building systems to trace audio deepfakes back to their specific synthesizer architectures.

## Limitations

Performance degrades severely under out-of-domain evaluation on STOPA across all tested paradigms, keeping low-FPR true positive rates under roughly 1%.

## Related

- (link related pages by id as the wiki grows)
