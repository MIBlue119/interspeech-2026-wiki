---
id: park26j_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3273
pdf: https://www.isca-archive.org/interspeech_2026/park26j_interspeech.pdf
---

# From Masking to Merging: Rethinking SpecAugment for Efficient Audio Spectrogram Transformer

*Minhee Park, Hyowon Ahn, Chanwoo Kim*

[PDF](https://www.isca-archive.org/interspeech_2026/park26j_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/park26j_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3273)

**TL;DR** — SpecAugment-Patch Merging reformulates SpecAugment mask regions into token-reduction candidates for Audio Spectrogram Transformers, increasing training throughput by up to 13.9% with negligible accuracy change. It provides a simple token-dropping and merging strategy that bypasses the need for auxiliary similarity modules.

## Key contributions

- Reinterprets SpecAugment masked patches as natural structural units for token merging rather than treating them as mere information loss or computational dead-weight.
- Proposes a patch-grid aligned SpecAugment-Patch mechanism paired with a dimension-wise max token-merging strategy.
- Demonstrates higher training throughput and competitive performance compared to PaSST-U under a unified training setup across multiple audio classification benchmarks.

## Problem

Audio Spectrogram Transformers (AST) require aggressive data regularization like SpecAugment, but the resulting masked regions still generate embedding tokens that impose quadratic self-attention computational overhead. Prior token-reduction methods like PaSST use random dropping without leveraging mask cues, while others like FastAST require complex attention-based similarity computations to select merge candidates. This creates an unaddressed trade-off where augmentation-induced redundancy is processed wastefully, motivating a structural bridge between data masking and token efficiency.

## Method

The method builds upon an Audio Spectrogram Transformer (AST) backbone initialized from an ImageNet-pretrained DeiT-Base distilled model (87M parameters). Input audio is converted to a 2D spectrogram of dimensions T x F (e.g., T=1024, F=128 for AudioSet) and processed via SpecAugment-Patch, which aligns time and frequency mask limits to a 16x16 patch grid with stride 10. Scanning the masked spectrogram yields a binary mask matrix M in {0,1}^{Nt x Nf}, indicating fully zeroed patches.

After patch and positional embeddings are added—just before the Transformer encoder blocks—the binary mask is flattened into a candidate vector excluding special tokens ([CLS], [Dist]). The algorithm samples 2r candidate patches uniformly at random, forms r disjoint pairs, and applies a dimension-wise max operation to merge each pair. The first token position of the pair stores the merged representation, while the second position is dropped, compacting the sequence length from N to N - r while retaining positional context.

Training recipes vary by dataset: Balanced AudioSet uses Mixup (ratio 0.5) for 25 epochs with a learning rate of 5e-5 (decaying 0.5 every 5 epochs starting at epoch 10); ESC-50 uses 25 epochs at 1e-4 without Mixup; and Speech Commands V2 uses Mixup (ratio 0.6) for 30 epochs at 2.5e-4. Weight averaging is applied from epochs 6 to 25 on AudioSet.

## Experimental setup

Evaluated on Balanced AudioSet (22k training clips, 527 classes, 1212 patches), ESC-50 (2,000 clips, 50 classes, ~600 patches), and Speech Commands V2 (105,829 recordings, 35 classes, ~144 patches). Compared against standard SpecAugment and PaSST-U under identical batch sizes, hardware (single NVIDIA GeForce RTX 4090 GPU), and training schedules. Metrics include mean Average Precision (mAP) for AudioSet, classification accuracy for ESC-50 and Speech Commands V2, training throughput in samples per second (S/s), and peak GPU memory in GB.

## Results

On Balanced AudioSet, increasing the merged pairs r from 0 to 100 keeps mAP virtually stable at 34.07 ± 0.18 to 34.08 ± 0.24, while boosting training throughput from 43.3 to 49.3 S/s and reducing peak GPU memory from 24.64 GB to 21.50 GB. On ESC-50, accuracy shows a minor trade-off dropping slightly from 89.20% to 88.67% while throughput rises from 127.3 to 142.9 S/s; Speech Commands V2 accuracy remains flat from 98.13% to 98.06% with throughput improving from 411.1 to 429.4 S/s. Ablations across merging strategies (dimension-wise max, mean, sum, and random drop) establish dimension-wise max as the most stable, yielding 34.10 mAP at r=90 compared to 34.03 for random drop. Compared against PaSST-U at a 16.5% merge rate, AST achieves 49.3 S/s versus 46.7 S/s.

| System / Condition | mAP / Accuracy | Throughput (S/s) | Peak Memory (GB) |
|---|---|---|---|
| AST (r = 0, Baseline) | 34.07 mAP | 43.3 | 24.64 |
| AST (r = 30, 5% merge) | 34.12 mAP | 45.3 | 22.33 |
| AST (r = 60, 10% merge) | 34.04 mAP | 46.2 | 22.79 |
| AST (r = 90, 15% merge) | 34.10 mAP | 48.6 | 21.85 |
| AST (r = 100, 16.5% merge) | 34.08 mAP | 49.3 | 21.50 |
| PaSST-U (98 pairs, 16.5% merge) | 29.58 mAP | 46.7 | 21.00 |

## Limitations

The maximum token reduction ratio is strictly bounded by the volume of augmentation-induced masked regions, preventing higher arbitrary compression rates without altering the data augmentation policy. Experiments are restricted to patch-based audio classification tasks using DeiT-based AST backbones, leaving streaming, auto-regressive speech generation, and larger-scale foundation audio models untested.

## Why read this

Researchers and efficient-ML engineers working on audio transformers should read this to learn how to turn data augmentation overhead directly into computational speedups without complex similarity-based token-merging modules.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Efficient on-device or cloud-scale acoustic event classification, environmental sound recognition, and keyword spotting.

## Related

- (link related pages by id as the wiki grows)
