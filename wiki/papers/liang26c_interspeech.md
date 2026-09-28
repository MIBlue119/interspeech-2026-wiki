---
id: liang26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1135
pdf: https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.pdf
---

# Text-Independent Speaker Verification Using Discrete Audio Tokens

[PDF](https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1135)

**TL;DR** — This paper proposes a cross-feature knowledge distillation framework that guides token-based automatic speaker verification models using a spectral teacher, reducing equal error rate significantly on benchmark datasets.

## Problem

Neural audio codecs compress audio into discrete tokens efficiently, but systems trained directly on these tokens experience severe performance drops in automatic speaker verification compared to standard spectral features like filterbanks. This drop occurs because conventional training paradigms struggle to exploit the heavily compressed and discrete latent representations, even though speaker identity cues are preserved.

## Method

The authors introduce a Cross-Feature Knowledge Distillation framework where a continuous filterbank-based teacher model provides embedding-level dense supervision to a discrete token-based student model sharing the same backbone architecture. The student receives input by summing codebook embeddings across all 32 hierarchical residual vector quantization layers of the EnCodec tokenizer, which is then linearly projected to an 80-dimensional space. The training objective combines a standard classification loss with a cosine similarity loss that aligns the student's hyperspherical embedding space with the teacher's geometric orientation. Experiments evaluate ECAPA-TDNN (1024 channels, 14.65M parameters) and ResNet34 (32 channels, 6.63M parameters) backbones trained with the Adam optimizer and AAM-Softmax loss.

## Results

Evaluated on VoxCeleb benchmarks using Equal Error Rate and minimum Detection Cost Function, the proposed distillation framework drastically improves token-based speaker verification performance. On VoxCeleb1-O with an ECAPA-TDNN backbone, the student model's EER drops from the native token baseline of 3.38% down to 2.25% (with a distillation weight of lambda = 40), approaching the original filterbank teacher's EER of 2.21%. With a ResNet34 backbone on the same test set, the EER decreases from 7.55% to 4.03%. Larger-scale training on VoxCeleb2 across various bitrates demonstrates robust performance scaling down to lower bitrates.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers building downstream speaker verification or multi-task speech models operating directly on neural audio codec representations without converting back to continuous waveforms.

## Related

- (link related pages by id as the wiki grows)
