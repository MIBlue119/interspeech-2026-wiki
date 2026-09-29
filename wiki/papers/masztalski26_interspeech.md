---
id: masztalski26_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, streaming-real-time]
institutions: ["Samsung", "AGH University of Krakow"]
code: https://github.com/SamsungLabs/samsone
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-763
pdf: https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.pdf
---

# Samsone: A Family of Open Small Audio Language Models for On-Device Inference

*Piotr Masztalski, Michał K. Grzeszczyk, Olaf Sikorski*

[PDF](https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-763)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `streaming-real-time`

**TL;DR** — Samsone is a family of small audio language models (SALMs) under 1B parameters designed for real-time on-device inference, with the core Samsone-134M establishing a new state-of-the-art among sub-billion models by outperforming prior architectures like Mellow by 15% on MMAU while reducing parameter count.

## Key contributions

- Introduces Samsone-134M, achieving SOTA audio question answering and understanding within the sub-150M parameter class.
- Proposes two architectural size variants: Samsone-99M (depth-pruned sub-100M model) and Samsone-356M (scaled up for complex reasoning).
- Applies vocabulary reduction and answer-permutation data balancing to eliminate multiple-choice spatial biases in audio reasoning datasets.
- Provides a complete open-source package including training pipelines, server/mobile-optimized weights, and a functional Android application demonstrating real-time edge inference.

## Problem

Large Audio Language Models (LALMs) typically span 3B to 9B parameters, rendering them impractical for low-latency, privacy-preserving, or offline edge applications. Prior small audio language models like Pengi and Mellow either struggle with complex multi-step reasoning due to text-domain limitations or lack deployment validations on commodity hardware. This creates a gap for compact, efficient multimodal architectures that can match multi-billion parameter reasoning performance on-device.

## Method

Samsone couples an open-source audio encoder, a nonlinear modality projector, and a decoder-only language model backbone. Specifically, the audio encoder utilizes the Whisper-Tiny transformer encoder, producing frame-level embeddings that are temporally average-pooled to 50 fixed audio tokens per sample. The modality projector maps these features into the text embedding space via two linear layers with a GeLU activation, a residual connection, and a final layer normalization step. A trainable separator token (SEP) is inserted before, after, and between audio inputs to handle multi-audio sequences and demarcate modalities cleanly. For the text backbone, the family adopts SmolLM2 variants (135M and 360M parameter versions).

Size optimization relies on two main pillars: vocabulary reduction (VR) and depth pruning (DP). To shrink the embedding matrix—which constitutes 21% of SmolLM2-135M's parameters—the training text is restricted to lowercase ASCII, filtering out tokens with excessive whitespace or special characters. This removes 15,042 tokens and strips 8.7M parameters from the embedding layer. For depth pruning, Samsone-99M truncates the SmolLM2-135M backbone from 30 down to 20 transformer layers by removing the final 10 blocks, cutting an additional 3.5M parameters per layer removed to reach a sub-100M total footprint.

Training is performed in a single stage using token-level cross-entropy loss over 100 epochs, utilizing the ReasonAQA (1M pairs) and AudioSkillsXL (8M pairs) datasets. To combat label imbalance where choice (b) dominated multiple-choice questions in ReasonAQA, answer choices are randomly permuted during training. Optimization uses AdamW with a cosine annealing schedule, 10 linear warmup epochs, a minimum learning rate of 1e-7, and peak learning rates of 3e-4 (for 99M/134M) or 1e-4 (for 356M). Checkpoints are exported via ExecuTorch with XNNPACK for smartphone deployment.

## Experimental setup

Trained on the ReasonAQA (1M pairs) and AudioSkillsXL (8M pairs) datasets on a single NVIDIA RTX PRO 6000 Blackwell 96GB GPU for 100 epochs (200k examples per epoch). Compared against baselines including LTU, GAMA, SALMONN, Qwen2-Audio-Instruct, GPT-4o Audio, Audio Flamingo (2 and 3), Pengi, and Mellow. Evaluated on MMAU, MMAU-Pro, AudioCaps, Clotho, ClothoAQA, and audio entailment datasets using greedy decoding. On-device metrics measured on a Samsung Galaxy S25 Ultra CPU.

## Results

Samsone-134M establishes a new SOTA for its size class, scoring 61.33 on the MMAU test split (outperforming Mellow's 53.34 by nearly 8 absolute points while using fewer parameters). Even the ultra-compact Samsone-99M achieves 58.13 on MMAU, beating Mellow despite having a sub-100M parameter footprint. On the challenging MMAU-Pro long-form and spatial reasoning benchmark, Samsone-99M scores 36.83, Samsone-134M scores 37.57, and Samsone-356M scores 40.67, significantly outperforming Mellow (27.50). On audio entailment tasks (Clotho LE and AudioCaps CE), Samsone-134M achieves 93.4% and 93.7% accuracy, closely matching or beating much larger models. In mobile benchmarks on a Samsung Galaxy S25 Ultra CPU, Samsone-99M generates at 125 tokens/sec, Samsone-134M at 87 tokens/sec, and Samsone-356M at 39 tokens/sec.

| System | Size | MMAU Test | MMAU-Pro | ClothoAQA Acc. |
|---|---|---|---|---|
| Mellow | 167M | 53.34 | 27.50 | 71.4 |
| Samsone-99M | 99M | 58.13 | 36.83 | 71.8 |
| Samsone-134M | 134M | 61.33 | 37.57 | 73.8 |
| Samsone-356M | 356M | 62.00 | 40.67 | 74.5 |
| Audio Flamingo 2 | 3B | 61.06 | 42.60 | - |

## Limitations

Extensive fine-tuning on audio question-answering tasks causes the language model backbone to degrade in general-purpose linguistic capabilities outside the audio domain. The work focuses purely on parameter-count pruning rather than precision-aware scaling laws or quantized memory-efficiency trade-offs. Furthermore, hardware execution was restricted to mobile CPU without specialized mobile GPU or NPU hardware-level optimizations.

## Why read this

Speech and ML engineers building on-device audio intelligence assistants will find this paper essential for its reproducible blueprints, effective vocabulary/depth pruning recipes, and ExecuTorch mobile deployment pipelines.

## Code

- https://github.com/SamsungLabs/samsone

## Applications

Real-time on-device audio question answering, offline environmental sound monitoring, and privacy-preserving smartphone speech assistants.

## Institutions / 機構

Samsung, AGH University of Krakow

## Related

- (link related pages by id as the wiki grows)
