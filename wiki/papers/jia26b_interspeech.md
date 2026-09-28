---
id: jia26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3176
---

# Interpretable Audio Editing Evaluation via Chain-of-Thought Difference-Commonality Reasoning with Multimodal LLMs

**TL;DR** — A multimodal-LLM-based evaluator that judges audio-editing quality in natural language, using chain-of-thought reasoning to explain its scores instead of just outputting a number.

## Problem

Automatic MOS prediction for audio editing lacks an interpretable, natural-language alternative to subjective listening tests and opaque objective metrics.

## Method

Builds the first natural-language automated evaluation framework for audio editing on top of Qwen2-Audio, adding two caption-based fine-tuning tasks for multi-audio understanding and a Chain-of-Thought prompting strategy for structured, step-by-step difference-commonality reasoning.

## Results

The framework produces interpretable, logically consistent text-based evaluations that align closely with human judgments and outperform existing baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated, explainable quality control for audio editing tools and generative audio pipelines.

## Related

- (link related pages by id as the wiki grows)
