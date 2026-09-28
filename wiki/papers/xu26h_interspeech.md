---
id: xu26h_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1010
pdf: https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.pdf
---

# Towards Data-free and Training-free Compression for Speech Foundation Models Using Parameter Clustering

[PDF](https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1010)

**TL;DR** — This paper introduces a data-free and training-free compression method for speech foundation models using parameter clustering and variance-based mixed sparsity, achieving substantial word error rate reductions over magnitude-based pruning.

## Problem

Standard importance-based pruning methods discard network parameters independently, which overlooks functional redundancies and destroys collective parameter representations. Furthermore, most compression pipelines heavily rely on original training data, calibration data, or expensive fine-tuning, making them difficult to apply in data-restricted or on-device scenarios. Additionally, fine-grained unstructured pruning yields irregular sparsity patterns that require specialized hardware acceleration libraries.

## Method

The proposed approach replaces conventional pruning with channel-wise k-means parameter clustering, fusing similar structured units into shared centroids within Transformer attention and feed-forward modules. To improve capacity allocation, the method introduces a variance-based mixed sparsity strategy that sorts modules by parameter variance and divides them into three sub-groups to assign adaptive target cluster counts. The framework operates in a completely data-free and training-free manner on standard hardware architectures without requiring specialized sparse operators. Experiments are performed on HuBERT-large and Whisper-large-v3 architectures using the LibriSpeech benchmark.

## Results

Evaluated on LibriSpeech dev and test subsets, the proposed data-free approach on HuBERT-large at 50% uniform sparsity achieves absolute WER reductions of 27.73% on test-clean and 18.61% on test-other compared to magnitude-based pruning before fine-tuning. Following a brief 3-epoch fine-tuning, it maintains consistent WER gains over magnitude-based pruning. On Whisper-large-v3 at 10% sparsity, the method delivers absolute WER reductions of 2.86% (test-clean) and 5.02% (test-other) over magnitude-based pruning while incurring no significant WER increase relative to the uncompressed baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and developers deploying large speech foundation models like Whisper and HuBERT onto resource-constrained or edge devices.

## Limitations

Performance degrades significantly under extreme sparsity levels (such as 60% for HuBERT or 30% for Whisper), where variance-based mixed sparsity is no longer sufficient to retain critical model parameters.

## Related

- (link related pages by id as the wiki grows)
