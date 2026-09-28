---
id: lin26n_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3228
pdf: https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.pdf
---

# WQ-Fusion: Dynamic Gated Attention for Cross-Domain Audio Representation

[PDF](https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3228)

**TL;DR** — WQ-Fusion dynamically routes features from Whisper and Qwen-Audio backbones via gated attention, achieving an overall cross-domain score of 0.836 on 15 benchmark datasets.

## Problem

Single-encoder audio representations struggle to reconcile fine-grained acoustic perception with high-level semantic reasoning due to conflicting inductive biases. While static concatenation can combine different encoders, it applies uniform processing across heterogeneous inputs and tasks, ignoring context-dependent information routing.

## Method

WQ-Fusion is a dual-encoder framework integrating Whisper-large and Qwen2-Audio-7B backbones while keeping them frozen. It combines features using an Adaptive Feature Modulation (AFM) module that predicts dynamic scale and shift parameters via normalization and linear projections. A hybrid positional encoding scheme applies Rotary Position Embedding (RoPE) temporally alongside learnable module embeddings to separate encoder origins. Finally, a single-layer Gated Transformer block with 8 attention heads and a 1280 hidden dimension applies an element-wise gating mechanism to perform dynamic feature selection.

## Results

Evaluated across 15 datasets spanning speech, sound, and music domains (including Speech Commands, VoxCeleb1, ESC-50, FSD50k, and GTZAN) on the Interspeech 2026 Audio Encoder Capability Challenge Track A benchmark. WQ-Fusion achieves an overall score of 0.836, outperforming single-encoder baselines like AudioMAE (0.614), Whisper-large (0.782), and Qwen2-Audio-7B (0.796), as well as static concatenation (0.802). The training runs for 100,000 steps with a batch size of 4, updating only lightweight projection layers, LoRA adapters within the LLM, self-adaptation modules, and the gated transformer fusion architecture.

## Code

- https://dataoceanai.github.io/Interspeech2026-Audio-Encoder-Challenge/

## Applications

Speech and machine learning engineers building general-purpose audio understanding systems, multi-modal dialogue agents, or universal audio encoders spanning speech, environmental sound, and music tasks.

## Related

- (link related pages by id as the wiki grows)
