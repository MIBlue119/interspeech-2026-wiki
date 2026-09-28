---
id: ieong26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-554
---

# Nudging Hidden States: Training-Free Model Steering for Chain-of-Thought Reasoning in Large Audio-Language Models

**TL;DR** — Steering the hidden states of large audio-language models at inference time — without any additional training — measurably improves chain-of-thought reasoning, and steering vectors built from just a few text examples transfer surprisingly well to speech-based reasoning.

## Problem

Chain-of-thought prompting improves reasoning in large audio-language models, but making CoT more effective without additional training remains an open problem.

## Method

The authors study inference-time model steering as a training-free alternative, introducing three steering strategies that draw on different information sources and evaluating them across four LALMs and four benchmarks.

## Results

Steering gives general accuracy gains up to 4.4% over plain CoT prompting, and steering vectors derived from only a few text samples effectively guide speech-based reasoning, showing high cross-modal data efficiency; the paper also studies hyperparameter sensitivity for robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A lightweight, training-free way to improve reasoning quality in deployed audio-language assistants without retraining or fine-tuning the underlying model.

## Related

- (link related pages by id as the wiki grows)
