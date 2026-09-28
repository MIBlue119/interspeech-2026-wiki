---
id: le26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1077
pdf: https://www.isca-archive.org/interspeech_2026/le26b_interspeech.pdf
---

# ViP-VL: Vietnamese Self-supervised Speech Pretraining Model with Vector-Quantization Learning

[PDF](https://www.isca-archive.org/interspeech_2026/le26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/le26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1077)

**TL;DR** — ViP-VL is an efficient 78M-parameter Vietnamese self-supervised speech pretraining model leveraging vector-quantization learning that establishes new state-of-the-art results across ASR, emotion recognition, dialect classification, and speaker verification.

## Problem

Existing speech self-supervised learning models either suffer from heavy computational burdens due to high-resolution frames or lose fine-grained acoustic resolution when employing aggressive temporal subsampling without proper synchronization. Furthermore, the Vietnamese speech ecosystem lacks a publicly accessible, computationally optimized SSL model designed for deployment and efficient downstream transfer.

## Method

The architecture integrates a ChunkFormer encoder with a synchronized 8x temporal subsampling rate, utilizing relative right-context attention and acoustic stacking with a window of 15 frames and a stride of 8 to mirror the receptive field of the input stage. It adapts the BEST-RQ framework, using a frozen random projection matrix and a codebook size of 1,024 with a 16-dimensional projection space to produce discrete targets without learned clustering. A specialized mask selection strategy is applied prior to subsampling, designating a frame as masked only if at least 80% of constituent pre-subsampled frames are masked. The model is pretrained on 17,000 hours of unlabeled Vietnamese speech using masked language modeling optimized with CTC or specific task heads.

## Results

Pretrained on 17,000 hours of unlabeled audio and fine-tuned on benchmark sets including VLSP 2020 (ASR), ViSEC (SER), ViMD (dialect), and VoxVietnam (SV). ViP-VL achieves a state-of-the-art average WER of 13.76% on ASR benchmarks, outperforming Wav2vec2-Large-Vi and PhoWhisper-Large. It reaches an unweighted accuracy of 74.45% on speech emotion recognition, F1-scores of 93.24% (regional) and 57.17% (provincial) on dialect classification, and an equal error rate of 3.639% on speaker verification.

## Code

- https://github.com/khanld/chunkformer

## Applications

Speech and ML engineers building downstream Vietnamese speech technologies such as automatic speech recognition, emotion recognition, dialect classification, and speaker verification systems.

## Related

- (link related pages by id as the wiki grows)
