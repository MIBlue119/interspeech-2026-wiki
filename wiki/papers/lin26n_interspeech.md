---
id: lin26n_interspeech
category: speech-llm-dialogue
labels: [multilingual, self-supervised]
institutions: ["Wuhan University", "Tencent", "Northwestern Polytechnical University", "Université du Québec"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3228
pdf: https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.pdf
---

# WQ-Fusion: Dynamic Gated Attention for Cross-Domain Audio Representation

*Mingda Lin, Lei Ding, Xinyue Zhou, Tiantian Xiong, Hanchen Pei, Gongping Huang, Hao Zhang, Jingdong Chen, Jacob Benesty*

[PDF](https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26n_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3228)

**Category:** `speech-llm-dialogue` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — WQ-Fusion is a dual-encoder framework that integrates Whisper-large and Qwen2-Audio-7B via adaptive feature modulation and element-wise gated attention, achieving an overall score of 0.836 across 15 diverse audio datasets.

## Key contributions

- Proposes a dual-encoder architecture combining phonetic-centric Whisper and semantic-centric Qwen2-Audio to bridge the gap between universal audio representations.
- Introduces an Adaptive Feature Modulation (AFM) module inspired by FiLM to dynamically predict scale and shift parameters for heterogeneous feature harmonization.
- Implements an element-wise gated attention mechanism within a Gated Transformer to enable context-aware dynamic feature selection and routing.
- Applies a hybrid positional encoding scheme utilizing Rotary Position Embedding (RoPE) and learnable source module embeddings to preserve temporal and architectural order.

## Problem

Pre-trained audio encoders suffer from an intrinsic tension between task specificity and representational universality due to heterogeneous spectral and temporal characteristics. Speech-centric models like WavLM or HuBERT capture phonetic structures but miss non-speech nuances, whereas generative models like AudioMAE capture low-level textures but lack high-level semantic reasoning. Although naive static concatenation of different backbones helps, it remains rigid and fails to adaptively prioritize relevant features across diverse acoustic environments.

## Method

The framework utilizes frozen Whisper-large and Qwen2-Audio-7B backbones to extract complementary representations, which are then harmonized using the Adaptive Feature Modulation (AFM) module. AFM applies normalization followed by a linear projection network to compute dynamic scale and shift parameters (gamma and beta) via element-wise multiplication. A hybrid positional encoding scheme combines Rotary Position Embedding (RoPE) in 2D subspaces for temporal order and learnable module embeddings to differentiate architectural sources.

The combined sequences are fed into a single-layer Gated Transformer block with 8 attention heads and a hidden dimension of 1280. The attention layer uses an augmented query projection matrix to simultaneously generate queries, keys, values, and gating signals, where the gating token passes through an activation function to create an element-wise Hadamard mask. During training, the core backbones remain frozen while training proceeds for 100,000 steps with a batch size of 4, optimizing MLP projections, LoRA adapters inside the LLM, self-adaptation modules, learnable module embeddings, and the Gated Transformer fusion architecture.

## Experimental setup

Evaluated on a comprehensive benchmark of 15 datasets across speech, sound, and music domains (including Speech Commands, LibriCount, VoxLingua107, VoxCeleb1, ASVspoof, FSC, VocalSound, CREMA-D, ESC-50, FSD50k, UrbanSound8k, FSD18-Kaggle, GTZAN, NSynth-Instruments, and FMA). Compared against single-encoder baselines (Dasheng-Base, AudioMAE, Whisper-Large, Qwen2-Audio-7B) and fusion strategies (Concatenation, Adaptation + Transformer, Gated Transformer). Metrics rely on mainstream acoustic classification performance scores defined by the Interspeech 2026 Audio Encoder Capability Challenge.

## Results

WQ-Fusion achieves an overall challenge score of 0.836, outperforming the strongest single-encoder baseline (Qwen2-Audio-7B at 0.796) and simple static concatenation (0.820). In ablation studies, using the Gated Transformer alone yields 0.832, while adding the Adaptive Feature Modulation module pushes the overall score to the optimal 0.836. WQ-Fusion does not always win every individual task; for instance, Qwen2-Audio-7B achieves 0.991 on ASVspoof compared to WQ-Fusion's 0.979, and simple concatenation scores slightly higher on CREMA-D (0.849 vs 0.820) and NSynth-I (0.768 vs 0.748).

| System | Speech (Avg) | Sound (Avg) | Music (Avg) | Overall Score |
|---|---|---|---|---|
| Dasheng-Base | - | - | - | 0.614 |
| AudioMAE | - | - | - | 0.628 |
| Whisper-Large | - | - | - | 0.754 |
| Qwen2-Audio-7B | - | - | - | 0.796 |
| Concat. | - | - | - | 0.820 |
| WQ-Fusion | - | - | - | **0.836** |

## Limitations

The framework relies entirely on frozen large-scale pre-trained backbones (Whisper and Qwen), meaning its performance is bounded by the capabilities and language coverage of these underlying models. Training is restricted to a specific multi-domain benchmark mixture, and compute costs still require fine-tuning adapter and fusion parameters atop massive base models. Evaluation is limited to classification tasks rather than full generative speech generation or streaming real-time latency setups.

## Why read this

Researchers building universal audio representation systems or tackling multimodal audio-language challenges should read this paper to learn how to dynamically fuse heterogeneous backbone representations via element-wise gated attention without expensive full-model fine-tuning.

## Code

- https://dataoceanai.github.io/Interspeech2026-Audio-Encoder-Challenge/

## Applications

Universal acoustic scene classification, multi-domain speech and music processing pipelines, and robust human-computer interaction systems.

## Institutions / 機構

Wuhan University, Tencent, Northwestern Polytechnical University, Université du Québec

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
