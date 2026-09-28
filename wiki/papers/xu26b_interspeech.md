---
id: xu26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-650
pdf: https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.pdf
---

# Enhancing BEST-RQ Pseudo-Label Quality Through Online Refinement for Automatic Speech Recognition

[PDF](https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-650)

**TL;DR** — This paper enhances BEST-RQ self-supervised speech representation learning by introducing online pseudo-label refinement methods—PCA projection, iterative codebook refinement, and codebook distillation—yielding a 12% relative WER reduction on Librispeech test-other.

## Problem

Standard BEST-RQ uses a static, randomly initialized quantizer to generate pseudo-labels from low-level log-Mel features, providing weak and sensitive training supervision compared to iterative methods like HuBERT. While prior multi-codebook approaches improve stability, they introduce high computational overhead and increased model complexity. Addressing this vulnerability while preserving the core simplicity of online pseudo-label generation is crucial for efficient and robust ASR pre-training.

## Method

The authors propose three modifications to the BEST-RQ online quantization pipeline: replacing the random linear down-projection with an online incremental Principal Component Analysis (PCA) computed via singular value decomposition over training batches; updating codebook entries iteratively using centroids computed from feature assignments; and introducing an auxiliary codebook updated via codebook distillation that minimizes element-wise absolute differences between the temporal self-similarity matrices of reconstructed frames and intermediate layer representations. Pre-training uses the 960-hour Librispeech dataset with a VGG front-end and 12 Conformer blocks (hidden dimension 512, 8 attention heads, 2048 feed-forward dimension), masking ~60% of frames. The main codebook size is set to 8,192 and the distillation codebook size to 256, with distillation activated after 30% of training using a loss scale of 0.5. Fine-tuning uses CTC loss over 79 end-of-word augmented phonemes with a 4-gram language model.

## Results

Evaluated on Librispeech (100h, 10h, and 1h fine-tuning splits) and Libri-light benchmarks using Word Error Rate (WER). On the Librispeech test-other set with 100 hours of labeled data, the baseline BEST-RQ achieves 10.1% WER; adding PCA projection reduces WER to 9.5%, iterative codebook refinement further lowers it to 9.2%, and adding codebook distillation yields a final WER of 8.8% (a ~12% relative reduction). Combined PCA and iterative refinement on a single codebook matches the performance of using six random codebooks while cutting training time by 45%.

## Code

- https://github.com/rwth-i6/returnn-experiments/tree/master/2026enhance-bestrq

## Applications

Speech recognition engineers and researchers building robust acoustic models or speech foundation models with limited supervised data.

## Limitations

Codebook distillation requires an intermediate layer representation to track temporal self-similarity and is applied only after 30% of the pre-training process to ensure model stability.

## Related

- (link related pages by id as the wiki grows)
