---
id: hasumi26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2293
pdf: https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.pdf
---

# Aligning MusicLLM with Emotion using Instruction Tuning and Feedback-Driven Alignment

*Takuya Hasumi, Welly Naptali*

[PDF](https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2293)

**TL;DR** — This paper investigates aligning Music Large Language Models (MusicLLMs) for continuous emotion regression (arousal and valence) using instruction tuning and feedback-driven alignment via group relative policy optimization (GRPO) with numerical rewards, outperforming zero-shot models and standard instruction tuning while preserving general MusicQA capabilities.

## Key contributions

- Demonstrates that task-aware instruction tuning equips MusicLLMs with basic emotion-regression capabilities, though with limited quantitative accuracy.
- Proposes feedback-driven alignment using verifiable numerical rewards derived from regression error to substantially boost arousal and valence prediction accuracy.
- Shows that combining instruction tuning and feedback-driven alignment retains general MusicQA capabilities, moving towards unified music information retrieval (MIR) systems.

## Problem

Although multimodal music LLMs excel at qualitative descriptions and general MIR tasks, prior benchmarks reveal their emotion regression performance is no better than predicting the dataset mean. Standard next-token prediction objectives fail to directly optimize for continuous scalar regression targets, and while instruction tuning establishes basic response formatting, it falls short of capturing fine-grained emotional perception (especially subjective valence). Consequently, aligning MusicLLMs for precise emotion regression without losing open-ended question-answering functionality remains an open challenge.

## Method

The proposed architecture builds on SLAM-LLM, consisting of a frozen music encoder (MusicFM pretrained on MSD), a temporal downsampling projector (two linear layers with ReLU, downsampling rate of 5), and a 7B-parameter Vicuna text decoder fine-tuned with LoRA (rank 8) on query and value projections. The pipeline starts with instruction tuning (50 epochs, batch size 8, AdamW) using GPT-4o-generated pseudo-QA pairs to teach the model to output continuous scores on a 1-9 scale. This is followed by feedback-driven alignment using Group Relative Policy Optimization (GRPO) with G=8 samples, KL penalty beta=0, and clipping epsilon=0.02 for 10 epochs. GRPO avoids training a separate critic/value network by computing scalar advantages directly from a user-defined reward function based on the negative squared error, applying a heavy penalty (-200) for score-parsing format failures.

## Experimental setup

Evaluated on DEAM (1261 train / 271 val / 270 test samples, ~45s clips) and MERGE (2490 train / 532 val / 532 test samples, ~30s clips) datasets, plus MusicQA for general QA. Baselines include MusicFM feature probing with an affine transform, conventional encoder-based models, and zero-shot open models (Qwen2-Audio-Instruct, Phi4-Multimodal). The evaluation metric is the coefficient of determination (R2) for arousal and valence, alongside BLEU@4, METEOR, and ROUGE-L for MusicQA.

## Results

Without MusicQA fine-tuning, MusicFM+Vicuna with instruction tuning and feedback-driven alignment achieves R2 scores of 0.56 (arousal) / 0.55 (valence) on DEAM, and 0.55 / 0.29 on MERGE, competitive with or exceeding encoder-based baselines (DEAM: 0.52/0.62; MERGE: 0.48/0.31). When mixed with MusicQA fine-tuning, instruction tuning alone yields negative or negligible valence regression (-0.35 on DEAM), whereas adding feedback-driven alignment recovers performance up to R2 of 0.48 (arousal) / 0.35 (valence) on DEAM and 0.50 / 0.24 on MERGE. Meanwhile, zero-shot open models like Qwen2-Audio and Phi4-Multimodal fail catastrophically on regression with heavily negative R2 scores (e.g., -3.47 arousal on DEAM).

| System / Condition | DEAM (Arousal R2) | DEAM (Valence R2) | MERGE (Arousal R2) | MERGE (Valence R2) |
|---|---|---|---|---|
| MusicFM Probing | 0.62 | 0.31 | 0.51 | 0.43 |
| Encoder-Based Models | 0.52 | 0.62 | 0.48 | 0.31 |
| Qwen2-Audio (Zero-shot) | -3.47 | -2.02 | -2.63 | -0.48 |
| Ours (IT + FDA, no MusicQA) | 0.56 | 0.55 | 0.55 | 0.29 |
| Ours (IT + FDA + MusicQA) | 0.48 | 0.35 | 0.50 | 0.24 |

## Limitations

The study is restricted to specific dataset configurations (DEAM and MERGE) and fixed-length 30-second audio segments. Valence prediction remains inherently more challenging and achieves lower gains than arousal due to higher subjective variance. The work is also bounded by single-GPU (A100) compute constraints and evaluates a single model size (7B Vicuna).

## Why read this

Speech and ML researchers working on multimodal audio LLMs will find this a valuable blueprint for adapting generative architectures to continuous regression tasks using GRPO without training value critics.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Mood-based music playlist generation, emotion-aware music retrieval systems, and conversational multimodal assistants capable of explaining music emotions.

## Related

- (link related pages by id as the wiki grows)
