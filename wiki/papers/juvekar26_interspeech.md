---
id: juvekar26_interspeech
category: asr
labels: [multilingual, self-supervised, dataset-or-benchmark-release]
institutions: ["Adalat AI"]
code: https://huggingface.co/collections/adalat-ai/vividh-asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3408
pdf: https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.pdf
---

# Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition

*Kush Juvekar, Kavya Manohar, Aditya Srinivas Menon, Arghya Bhattacharya, Kumarmanas Nethil*

[PDF](https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/juvekar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3408)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — Vividh-ASR introduces a complexity-stratified benchmark for Indic speech recognition and demonstrates that combining an aggressive initial learning rate with a hard-to-easy curriculum (Reverse Multi-Stage Fine-Tuning) resolves studio-bias, allowing a 244M model to outperform 769M baselines.

## Key contributions

- Vividh-ASR benchmark: a diagnostic evaluation suite for Hindi and Malayalam organized into four tiers (studio, broadcast, spontaneous, synthetic noise) to isolate acoustic complexity failures.
- Reverse Multi-Stage Fine-Tuning (R-MFT): a training recipe pairing high initial learning rates (2e-4) with a spontaneous-first (hard-to-easy) curriculum.
- Mechanistic analysis via CKA and SVD demonstrating that effective schedules concentrate parameter adaptation in the decoder while completely preserving the pre-trained encoder's acoustic geometry.
- Parameter-efficient scaling: showing a 244M R-MFT Whisper model matches or exceeds conventionally fine-tuned 769M counterparts.

## Problem

Large weakly supervised ASR models like Whisper perform poorly on low-resource Indic languages, with zero-shot WER often exceeding 100%. While traditional fine-tuning reduces this gap, models are typically trained on studio-read speech, causing catastrophic degradation on real-world spontaneous conversational audio—a failure mode termed studio-bias. Current training conventions rely on conservative learning rates (1e-5) to prevent forgetting and easy-to-hard curricula, which implicitly assume pre-trained encoders possess necessary acoustic structures. In practice, these heuristics trap models in sub-optimal loss basins and fail to adapt to complex Dravidian and Indo-Aryan phonotactics.

## Method

The authors implement a 2 x 2 factorial ablation evaluating learning rate timing (decreasing 2e-4 to 1e-5 vs. increasing 1e-5 to 2e-4) and curriculum ordering (Tier C to A vs. A to C) while keeping model architecture, optimizer, and data fixed.

Based on these findings, they propose R-MFT with three stages: Stage 1 trains on Tier C (spontaneous data) at a high LR of 2e-4 to build early plasticity and disfluency robustness; Stage 2 trains on Tier B (broadcast data) at 1e-4; and Stage 3 uses a 1:1 mixture of Tier A and Tier C at 1e-5 to consolidate studio precision and recover spontaneous performance.

All models use AdamW optimizer with weight decay 0.1, 10% linear warmup followed by cosine annealing, gradient checkpointing, and a batch size of 128 on NVIDIA H100 GPUs using Whisper-small (244M) and Whisper-medium (769M) architectures.

## Experimental setup

Evaluated on Hindi and Malayalam datasets aggregating Kathbath, Shrutilipi, Indic Voices, FLEURS, and other open corpora, comprising roughly 894 training hours for Malayalam and 2,190 hours for Hindi. Compared against IndicWhisper (769M) and single-stage low/high LR baselines. Metrics reported are Word Error Rate (WER) across studio (Tier A), broadcast (Tier B), spontaneous (Tier C), and synthetic noise (Tier D) tiers.

## Results

R-MFT (Medium, 769M) achieves a global Malayalam WER of 39.36% and Hindi WER of 18.82%, outperforming IndicWhisper (48.64% Mal / 25.01% Hi) and standard MFT (42.25% Mal / 18.81% Hi). In the 2x2 factorial study, decreasing LR schedules (starting at 2e-4) universally outperform increasing schedules by roughly 12 to 13 absolute WER points, proving that early large parameter updates are mandatory to break out of the pre-trained basin.

For curriculum ordering, hard-to-easy (R-MFT) yields a modest ~3-point gain over easy-to-hard on Malayalam (39.35% vs 42.25% under decreasing LR), while Hindi converges similarly across orderings (~18.8%). Notably, the 244M R-MFT Small model achieves 44.41% (Mal) and 21.41% (Hi) global WER, beating the 769M low-LR baseline (77.79% Mal) despite having one-third the parameters.

| Model | Params | Tier A (Mal) | Tier A (Hi) | Tier C (Mal) | Tier C (Hi) | Global (Mal) | Global (Hi) |
|---|---|---|---|---|---|---|---|
| IndicWhisper | 769M | 33.01 | 16.20 | 66.09 | 39.87 | 48.64 | 25.01 |
| Single-stage, low LR | 769M | 55.68 | 24.01 | 82.37 | 30.62 | 77.79 | 25.25 |
| Standard MFT | 769M | 33.56 | 16.41 | 51.03 | 24.91 | 42.25 | 18.81 |
| R-MFT (Medium) | 769M | 31.66 | 16.09 | 46.18 | 24.91 | 39.36 | 18.82 |
| R-MFT (Small) | 244M | 36.49 | 19.16 | 53.74 | 27.34 | 44.41 | 21.41 |

## Limitations

Evaluated exclusively on two Indic languages (Hindi and Malayalam) using the Whisper architecture, leaving the generalization to other language families, non-transformer models, or fully self-supervised systems unverified. The compute and data scales are constrained to specific open-source aggregate corpora, and tier-based analysis is limited to text-transcript modalities without deep investigation into speaker or accent sub-variations.

## Why read this

Speech researchers and engineers working on low-resource fine-tuning will learn why conservative learning rates destroy spontaneous speech performance and how to engineer training schedules that leverage decoder plasticity while keeping encoders invariant.

## Code

- https://huggingface.co/collections/adalat-ai/vividh-asr

## Applications

Real-world spontaneous speech recognition, courtroom dictation systems, and robust multilingual transcription engines for low-resource languages.

## Institutions / 機構

Adalat AI

## Related

- (link related pages by id as the wiki grows)
