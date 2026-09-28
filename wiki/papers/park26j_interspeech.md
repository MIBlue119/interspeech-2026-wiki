---
id: park26j_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3273
pdf: https://www.isca-archive.org/interspeech_2026/park26j_interspeech.pdf
---

# From Masking to Merging: Rethinking SpecAugment for Efficient Audio Spectrogram Transformer

[PDF](https://www.isca-archive.org/interspeech_2026/park26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3273)

**TL;DR** — SpecAugment-Patch Merging accelerates Audio Spectrogram Transformer training by converting data-augmentation masks into token-merging cues, improving throughput by up to 13.9% with negligible impact on accuracy.

## Problem

Standard Audio Spectrogram Transformers suffer from quadratic self-attention complexity over input tokens, creating computational bottlenecks during training. While SpecAugment effectively regularizes models by masking spectrogram regions, these masked regions still generate embedding tokens that waste compute without adding semantic value. Existing token-reduction strategies either require separate architectural complexity, rely on random dropping without considering structural cues, or demand complex similarity computations.

## Method

The paper introduces SpecAugment-Patch Merging, which aligns SpecAugment masks directly to a 16x16 patch grid prior to patch embedding, ensuring each patch is entirely masked or retained. After positional embeddings are added right before the transformer encoder, the model identifies fully zeroed patches from the binary mask matrix as valid merge candidates. It randomly selects and pairs r candidate patches, applying a dimension-wise max operation to merge each pair and compact the token sequence. Experiments use an ImageNet-pretrained DeiT-Base distilled backbone with 87M parameters implemented on a single NVIDIA RTX 4090 GPU.

## Results

Evaluated on Balanced AudioSet, increasing merged pairs r from 0 to 100 changes mAP marginally from 34.07 to 34.08 while boosting throughput from 43.3 to 49.3 samples/sec and reducing peak GPU memory by 3.14 GB. On ESC-50, throughput scales from 127.3 to 142.9 samples/sec as r increases from 0 to 50 with minor accuracy variations (89.20% to 88.67%). On Speech Commands V2, testing up to r = 15 maintains high keyword spotting accuracy around 98% while improving efficiency. Ablations comparing dimension-wise max, mean, sum, and random drop demonstrate that max merging provides strong empirical performance and stability.

## Code

- https://github.com/slp-lab-research/specaug-patch-merge

## Applications

Speech and machine learning engineers training audio transformer models for tasks such as environmental sound classification, multi-label audio event detection, and keyword spotting.

## Related

- (link related pages by id as the wiki grows)
