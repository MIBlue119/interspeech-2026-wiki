---
id: le26b_interspeech
category: asr
labels: [low-resource, self-supervised]
institutions: ["VinUniversity", "UNEY"]
code: https://github.com/khanld/chunkformer
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1077
pdf: https://www.isca-archive.org/interspeech_2026/le26b_interspeech.pdf
---

# ViP-VL: Vietnamese Self-supervised Speech Pretraining Model with Vector-Quantization Learning

*Khanh Le, Kiet Anh Hoang, Bao Nguyen, Duy Vo, Dung Vo, Thai Tran, Linh Pham, Khoa D Doan*

[PDF](https://www.isca-archive.org/interspeech_2026/le26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/le26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1077)

**Category:** `asr` · **Labels:** `low-resource`, `self-supervised`

**TL;DR** — ViP-VL is a 78M-parameter Vietnamese speech SSL model that integrates an 8x subsampled ChunkFormer encoder with the BEST-RQ vector-quantization framework, establishing new state-of-the-art results across ASR, emotion recognition, dialect classification, and speaker verification.

## Key contributions

- Acoustic Stacking and Receptive Field Alignment configuration that successfully matches a synchronization manifold with an 8x temporal subsampling rate in a ChunkFormer architecture.
- A specialized Mask Selection Strategy (80% threshold across 15 stacked pre-subsampled frames) that avoids acoustic leakage and enforces an effective 45% time-masking ratio.
- Public release of a compute-efficient, 78M-parameter Vietnamese speech SSL model pretrained on 17,000 hours of unlabeled audio.
- Comprehensive empirical validation showing superior performance over larger models (e.g., Wav2vec2-Large-Vi, PhoWhisper-Large) across four diverse downstream tasks.

## Problem

Modern speech SSL models rely heavily on high-latency architectures with 20ms to 40ms frame shifts or demand massive proprietary supervised data, making them computationally burdensome for real-time and edge deployment. While faster frameworks like Nest utilize 8x subsampling (80ms frames) for high throughput, they bypass methodological verification and suffer from temporal sparsity and loss of fine-grained phonetic cues. Furthermore, the Vietnamese speech ecosystem lacks a publicly accessible, computationally optimized SSL model, as prior high-capacity models either withhold their weights or inherit high-latency bottlenecks.

## Method

ViP-VL uses a 78M-parameter ChunkFormer encoder comprising 12 blocks, 512-dimension output size, 8 attention heads, and 2048 linear units in the FFN layers. ChunkFormer uses relative right-context attention and chunk-wise processing to replace full-sequence attention, lowering compute requirements while convolutional modules adopt kernel sizes of 15 and increased channel capacity to preserve the receptive field.

Pretraining relies on the BEST-RQ framework, mapping stacked acoustic log-Mel filterbanks through a frozen random projection matrix (Xavier-initialized, 16-dimensional projection space, codebook size of 1,024 sampled from a standard normal distribution). Input frames are concatenated (rather than averaged to prevent low-pass smoothing) using a stacking window of 15 frames with a stride of 8, mirroring the receptive field of the encoder's input stage (3-stacked convolutions, kernel size 3, stride 2).

The model is trained via masked language modeling using a negative log-likelihood loss over masked tokens. A probabilistic masking threshold marks a subsampled frame as masked only if at least 80% (12 out of 15) of its constituent 10ms frames are masked, yielding a 45% time masking ratio. Pretraining uses 8x NVIDIA H200 GPUs for 320,000 steps, averaging the last 50 epochs.

## Experimental setup

Pretrained on 17,000 hours of unlabeled Vietnamese speech (GigaSpeech 2, MSR-86K, public domains) and evaluated on downstream datasets: VLSP 2020 (250h ASR), ViSEC (3h SER), ViMD (102h SDC), and VoxVietnam (261h VoxVietnam-T / VoxVietnam-O SV). Compared against baselines including Wav2vec2-Base/Large-Vi (13k hours), PhoWhisper-Base/Large (680k hours), VietASR (70k hours), ECAPA-TDNN, and ResNet34.

## Results

ViP-VL achieves an average ASR Word Error Rate (WER) of 13.76% across benchmarks, outperforming Wav2vec2-Large-Vi (17.89%) and PhoWhisper-Large (14.09%). On Speech Emotion Recognition, it reaches 74.45% Unweighted Accuracy, besting Wav2vec2-Large-Vi (73.00%). For Speech Dialect Classification, it achieves 93.24% regional F1 and 57.17% provincial F1, leading all baselines. On Speaker Verification (VoxVietnam-O), it attains a 3.639% EER, beating ECAPA-TDNN (3.925%) and Wav2vec2-Large-Vi (4.334%), though Wav2vec2-Large-Vi holds a minor edge in minDCF (0.504 vs 0.518).

| Model | ASR Avg WER (%) ↓ | SER UA (%) ↑ | Dialect Province F1 ↑ | VoxVietnam EER (%) ↓ |
|---|---|---|---|---|
| Wav2vec2-Base-Vi | 20.80 | 71.79 | 41.12 | 3.679 |
| Wav2vec2-Large-Vi | 17.89 | 73.00 | 54.91 | 4.334 |
| PhoWhisper-Large | 14.09 | 72.68 | 49.67 | - |
| VietASR | 14.81 | - | - | - |
| **ViP-VL (ours)** | **13.76** | **74.45** | **57.17** | **3.639** |

## Limitations

The pretraining dataset is currently constrained to 17,000 hours of Vietnamese speech, and evaluation is limited to four specific speech tasks within a single low-resource language. The architecture's aggressive 8x subsampling, while compute-efficient, may still risk information loss on ultra-fine-grained phonetic or tonal distinctions compared to uncompressed full-resolution models. Furthermore, downstream fine-tuning relies on existing supervised datasets which may contain domain biases.

## Why read this

Researchers and engineers working on low-resource speech SSL should read this paper to learn how to properly synchronize temporal subsampling manifolds with mask selection strategies in encoder architectures like ChunkFormer, avoiding the performance penalties typical of high compression.

## Code

- https://github.com/khanld/chunkformer

## Applications

Multilingual and low-resource speech recognition systems, voice-activated smart devices, speech emotion monitoring, and speaker verification pipelines.

## Institutions / 機構

VinUniversity, UNEY

## Related

- (link related pages by id as the wiki grows)
