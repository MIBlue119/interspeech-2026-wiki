---
id: masztalski26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-763
pdf: https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.pdf
---

# Samsone: A Family of Open Small Audio Language Models for On-Device Inference

[PDF](https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/masztalski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-763)

**TL;DR** — Samsone is a family of small audio language models (99M to 356M parameters) designed for edge devices, establishing a new state-of-the-art among sub-billion audio language models with 66.47% on the MMAU benchmark while running at up to 125 tokens per second on mobile hardware.

## Problem

While massive multi-billion parameter audio-language models deliver strong performance across general audio tasks, strict privacy constraints in domains like healthcare, lack of offline processing, and agentic workflows demand highly efficient small models. Existing small audio language models (SALMs) under 1 billion parameters either struggle with complex reasoning due to limited text diversity or lack actual on-device deployment validation. Bridging this gap requires carefully optimized architectures that balance compact parameter footprints with expert-level audio understanding and reasoning capabilities.

## Method

Samsone adopts a standard multimodal architecture comprising a Whisper-Tiny audio encoder, a non-linear modality projector with a GeLU activation and residual connection, and a SmolLM2 text decoder backbone (135M or 360M variants). To handle multiple variable-length audio inputs, a trainable separator token (SEP) is inserted between audio and text segments. The authors introduce two primary size optimizations: vocabulary reduction (filtering out rare, multi-whitespace, and special tokens from the SmolLM2 tokenizer to shrink the embedding matrix) and transformer layer depth pruning (truncating layers to build a sub-100M variant). All models are trained in a single stage for 100 epochs using AdamW on a blend of the ReasonAQA and AudioSkillsXL datasets, utilizing random answer permutation to counteract class imbalance.

## Results

Evaluated on the Massive Multitask Audio Understanding (MMAU) benchmark, Samsone-134M achieves 66.47% and the ultra-compact Samsone-99M reaches 60.78%, both outperforming the previous SALM SOTA model Mellow (56.89%) despite having fewer parameters. On the more challenging MMAU-Pro benchmark, Samsone variants score between 34% and 36%, comfortably beating smaller and older baselines. On simple audio question answering (ClothoAQA), Samsone-356M achieves 93.7% accuracy. On-device execution on a Samsung Galaxy S25 Ultra demonstrates generation speeds ranging from 39 tokens/sec (for 356M) to 125 tokens/sec (for 99M).

## Code

- https://github.com/SamsungLabs/samsone

## Applications

Speech and ML engineers can deploy Samsone for offline, privacy-preserving, real-time audio question answering, sound classification, and audio captioning directly on mobile devices and edge hardware.

## Limitations

Extensive fine-tuning on audio-question-answering tasks causes the underlying language model to degrade in general-purpose linguistic capabilities, efficiency was measured purely by parameter count rather than quantized memory trade-offs, and hardware-specific mobile GPU/NPU optimizations remain unimplemented.

## Related

- (link related pages by id as the wiki grows)
