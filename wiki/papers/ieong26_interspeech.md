---
id: ieong26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-554
pdf: https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.pdf
---

# Nudging Hidden States: Training-Free Model Steering for Chain-of-Thought Reasoning in Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ieong26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-554)

**TL;DR** — This paper introduces training-free inference-time hidden state steering strategies to enhance chain-of-thought reasoning in large audio-language models, yielding accuracy improvements of up to 4.4%.

## Problem

Large audio-language models struggle with multi-step reasoning tasks, and current methods to improve chain-of-thought reasoning depend on costly supervised training or reinforcement learning. These training paradigms demand substantial compute and supervision, making inference-time interventions an appealing alternative. However, representation-level model steering has been largely underexplored for audio-language model reasoning.

## Method

The authors propose three representation-level intervention strategies based on the Difference-in-Means paradigm, extracting steering vectors from the last few layers and injecting them with norm preservation during decoding. Vanilla Steering computes instance-specific directional shifts using paired chain-of-thought versus normal prompts. Speech-derived Generalized Steering (SGS) extracts a shared vector from an auxiliary synthesized speech math dataset, while Text-derived Generalized Steering (TGS) extracts vectors purely from text-only inputs to evaluate cross-modal transfer. The framework is evaluated across four models (Voxtral-3B, Phi-4-Multimodal, Qwen2.5-Omni-7B, and Audio Flamingo 3) using a grid search over scaling coefficients and layer ranges.

## Results

Evaluated on VoxEval math benchmarks (College, High School, Elementary) and ReveAL-CoT, steering consistently outperforms standard chain-of-thought prompting across 11 of 12 model-method configurations. Audio Flamingo 3 and Voxtral achieve the largest absolute average accuracy gains of +4.4% and +4.3%, respectively. Vanilla steering outperforms self-consistency under a matched compute budget while requiring fewer generation passes. Furthermore, text-derived generalized steering achieves the highest average improvement of +2.5%, proving that text-extracted directions can effectively transfer to spoken reasoning tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers working on audio-language applications can use these training-free intervention techniques to boost reasoning accuracy in conversational agents and voice assistants without retraining.

## Limitations

Vanilla steering shows high sensitivity to the choice of scaling factor and layer position, requiring careful hyperparameter tuning.

## Related

- (link related pages by id as the wiki grows)
