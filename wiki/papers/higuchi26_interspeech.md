---
id: higuchi26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-592
pdf: https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.pdf
---

# Incremental End-to-End Spoken Dialogue State Tracking with a Multimodal LLM and Reinforcement Learning

*Tomoya Higuchi, Michimasa Inaba*

[PDF](https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/higuchi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-592)

**TL;DR** — This paper proposes an incremental end-to-end spoken dialogue state tracking (DST) method using Qwen2.5-Omni-7B that predicts symbolic slot-level edit operations instead of full belief states, achieving a state-of-the-art JGA of 49.20% on SpokenWOZ when trained with SFT followed by GRPO.

## Key contributions

- First application of incremental belief state updates to end-to-end spoken DST, predicting compact symbolic edit operations (set, update, delete) relative to the previous state.
- A two-stage training recipe combining supervised fine-tuning (SFT) and Group Relative Policy Optimization (GRPO) to jointly optimize transcription quality, edit accuracy, and format validity.
- Empirical demonstration on SpokenWOZ that incremental updates outperform full-state prediction by 3.16 JGA points, with GRPO providing additional gains in JGA and a reduction in Word Error Rate (WER).

## Problem

Traditional spoken dialogue systems rely on cascaded ASR-to-DST pipelines, which suffer from severe error propagation where early ASR mistakes corrupt downstream state updates. While recent end-to-end multimodal LLMs bypass ASR, existing implementations still regenerate the full belief state at every turn, leading to long outputs, high computational inefficiency, and a tendency to hallucinate values for unchanged slots as dialogues grow longer.

## Method

The framework utilizes Qwen2.5-Omni-7B as a unified multimodal LLM, avoiding external ASR or separate audio encoders. It processes dialogue history, the previous belief state (Bt-1), and current raw audio (at) in a single decoder context to output a transcript and symbolic edit operations (Delta_t) confined to set, update, and delete actions. To keep compute tractable, the model is adapted using QLoRA with rank 64, alpha 128, and 4-bit NF4 quantization while keeping the audio encoder and aligner frozen.

The training pipeline consists of two stages. Stage 1 is Supervised Fine-Tuning (SFT) with AdamW using a cosine learning rate scheduler, a warmup ratio of 0.05, a learning rate of 1e-4, an effective batch size of 32 for 3 epochs, and cross-entropy loss applied to target tokens. Stage 2 applies Group Relative Policy Optimization (GRPO) starting from the SFT checkpoint with an effective batch size of 128, a learning rate of 1e-6 for 1 epoch, a group size of 16 generations per prompt, and a KL penalty coefficient beta_kl = 0.02.

The GRPO reward function is a normalized weighted sum balancing transcript word error rate (alpha = 0.3), edit-operation F1 score (beta = 0.5), exact match binary bonus (gamma = 0.1), and format validity (delta = 0.1). Inference is performed using vLLM with greedy decoding (temperature 0.0) and a maximum length of 1024 tokens.

## Experimental setup

Evaluated on the SpokenWOZ dataset (5,700 dialogues, 8 domains, >203k turns; 4,600 training, 100 validation, 1,000 test dialogues). Compared against SPACE+WavLMalign (cascade baseline), Gemma-2-9B-Instruct (full-state end-to-end with and without fuzzy matching), and Qwen2.5-Omni-7B (Full-State). Metrics include Joint Goal Accuracy (JGA), Slot Error Rate (SER), and Word Error Rate (WER). Implemented using ms-swift, PyTorch, and DeepSpeed across 8 NVIDIA A6000 (48 GB) GPUs.

## Results

In predicted mode, the proposed Incremental Qwen2.5-Omni-7B model achieves 48.52% JGA and 18.48% SER, outperforming the full-state Qwen2.5-Omni-7B baseline (45.36% JGA, 19.92% SER) and Gemma-2-9B + FUZZY (42.17% JGA). Adding GRPO further boosts performance to 49.20% JGA, 18.03% SER, and drops WER from 22.39% to 21.61%. In oracle mode with ground-truth previous states, incremental models reach up to 89.72% JGA, highlighting that state error propagation during predicted-mode inference remains the primary system bottleneck. Ablation studies confirm that removing the WER reward component drops JGA to 48.34% and increases WER to 23.37%.

| System | JGA (%) ↑ | SER (%) ↓ | WER (%) ↓ |
|---|---|---|---|
| SPACE+WavLMalign [1] | 25.65 | – | – |
| Gemma-2-9B + FUZZY [17] | 42.17 | 20.41 | – |
| Qwen2.5-Omni-7B (Full-State) | 45.36 | 19.92 | 23.01 |
| Qwen2.5-Omni-7B (Incremental) | 48.52 | 18.48 | 22.39 |
| **Qwen2.5-Omni-7B + GRPO (Ours)** | **49.20** | **18.03** | **21.61** |

## Limitations

A substantial performance gap of ~40 JGA points between oracle and predicted modes indicates that error propagation across turns remains a key vulnerability, as training uses clean ground-truth previous states rather than noisy predicted ones. The approach is computationally heavy, requiring extensive reinforcement learning via GRPO sample generation (taking ~40 hours on 8 A6000 GPUs). Evaluation is currently restricted to a single model architecture (Qwen2.5-Omni-7B) and a single benchmark (SpokenWOZ).

## Why read this

Speech and dialogue researchers will find a clear blueprint for integrating reinforcement learning with multimodal LLMs to stabilize incremental dialogue state tracking. It offers concrete evidence that policy optimization over generation-level metrics successfully mitigates cascading errors in direct speech-to-belief architectures.

## Code

- https://github.com/UEC-InabaLab/IncrementalR

## Applications

Real-time task-oriented spoken dialogue systems, voice assistants, and in-car conversational agents.

## Related

- (link related pages by id as the wiki grows)
