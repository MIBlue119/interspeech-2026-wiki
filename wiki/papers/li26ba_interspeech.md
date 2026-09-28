---
id: li26ba_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1823
pdf: https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.pdf
---

# Resonate: Reinforcing Text-to-Audio Generation via Online Feedback from Large Audio Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ba_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1823)

**TL;DR** — Resonate is a 470M-parameter text-to-audio generation model that integrates online Group Relative Policy Optimization (GRPO) with Large Audio Language Model (LALM) rewards, achieving state-of-the-art performance on TTA-Bench.

## Problem

Existing text-to-audio reinforcement learning models predominantly rely on offline paradigms like Direct Preference Optimization (DPO), which suffer from distribution shift and limit policy exploration. Additionally, current methods depend on CLAP models as reward functions, which suffer from a "bag-of-words" effect, weak temporal and compositional reasoning, and poor alignment with human perception.

## Method

The model uses a Flux-style flow Transformer architecture comprising 16 multi-modal MMDiT blocks and 36 single-modal DiT blocks (470M parameters total), conditioned on FLAN-T5 text embeddings, and is pre-trained via Conditional Flow Matching (CFM) on an audio-text corpus of 3.7 million pairs (10,000 hours). For reinforcement learning, it adapts Group Relative Policy Optimization (GRPO) to flow-matching by reformulating the deterministic ODE into an equivalent SDE sampler to introduce necessary stochastic exploration. It leverages Qwen2.5-Omni as an AQA-based reward model (AQAScore) to output fine-grained feedback computed via softmax-normalized affirmative probabilities.

## Results

Evaluated on the Accuracy subset of TTA-Bench (1,500 prompts) using AudioBox-Aesthetics and Qwen3-Omni-Instruct for evaluation, Resonate-GRPO achieves an AQAScore of 0.737, a CLAP score of 0.476, Production Quality (PQ) of 6.064, and Content Usefulness (CU) of 5.328 while requiring only 25 NFEs. Subjective evaluations by 10 audio experts demonstrate top performance with an Overall Quality (OVL) score of 3.86 and Relevance (REL) score of 3.83. Ablations confirm that online GRPO substantially outperforms offline DPO (AQAScore 0.737 vs 0.676), LALM-based rewards outperform CLAP-based rewards, and optimal hyperparameters include a noise level of 0.7 and a group size of 24.

## Code

- https://github.com/xiquan-li/Resonate

## Applications

Automated content creation for filmmaking, gaming, and virtual reality requiring high-fidelity and semantically aligned text-to-audio generation.

## Related

- (link related pages by id as the wiki grows)
