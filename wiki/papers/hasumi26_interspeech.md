---
id: hasumi26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2293
pdf: https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.pdf
---

# Aligning MusicLLM with Emotion using Instruction Tuning and Feedback-Driven Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hasumi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2293)

**TL;DR** — This paper aligns MusicLLMs for music emotion regression using instruction tuning followed by Group Relative Policy Optimization (GRPO), improving valence $R^2$ on MERGE from negative baseline levels to 0.62 while preserving general MusicQA capabilities.

## Problem

State-of-the-art MusicLLMs perform poorly at continuous emotion regression (arousal and valence) because next-token prediction objectives and standard benchmarks largely overlook explicit regression training. This is problematic because existing models fail to output reliable numerical emotion scores while simultaneously providing natural language explanations.

## Method

The architecture combines a frozen MusicFM encoder (pretrained on the Million Song Dataset), a two-layer ReLU projector, and a 7-parameter Vicuna text decoder adapted with LoRA (rank 8). Training uses a two-stage strategy: first, task-aware instruction tuning on GPT-4o-generated pseudo-QA data maps audio to continuous 1-9 scale scores; second, feedback-driven alignment via Group Relative Policy Optimization (GRPO) optimizes responses against a verifiable numerical reward function (negative squared error). GRPO generates $G=8$ samples per input without requiring a separate critic network, using a KL penalty coefficient of $\beta=0$ and clipping epsilon of 0.02.

## Results

Evaluated on DEAM (1261/271/270 split) and MERGE (2490/532/532 split) datasets using the coefficient of determination ($R^2$), zero-shot open models (Qwen2-Audio and Phi-4-Multimodal) achieve negative $R^2$ scores. Instruction tuning alone yields limited regression performance (e.g., DEAM $R^2$ of 0.38/0.26 for arousal/valence), whereas adding feedback-driven alignment substantially boosts performance to 0.55/0.29 on DEAM and 0.52/0.62 on MERGE. Jointly training on MusicQA alongside emotion regression demonstrates that QA capability (measured via BLEU@4, METEOR, and ROUGE-L) is fully preserved.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers building unified music information retrieval (MIR) systems that require both natural language interaction/explanation and precise continuous emotion prediction for tasks like mood-based playlist generation.

## Limitations

The study's scope is restricted to specific architectural configurations (MusicFM and Vicuna 7B) and evaluated on two specific emotion regression datasets (DEAM and MERGE).

## Related

- (link related pages by id as the wiki grows)
