---
id: noronha26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2880
---

# Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026

**TL;DR** — In a challenge comparing strategies for audio reasoning under tight data/compute budgets, structured prompt engineering beat the baseline by 5.5%, while self-training with reinforcement fine-tuning actually hurt performance.

## Problem

Practitioners tackling audio reasoning with limited data and compute must choose among strategies ranging from free prompt engineering to compute-heavy self-training, without clear guidance on which pays off.

## Method

The authors compare three strategies on the state-of-the-art Qwen3-Omni 30B model across 1,000 audio questions spanning four reasoning categories and 16 subcategories from the MMAR benchmark: structured prompt engineering via iterative error analysis, automated prompt optimization with DSPy MIPROv2, and Reinforced Self Training (ReST) with qLoRA fine-tuning.

## Results

Structured prompting achieves a 5.5% accuracy increase over baseline, while ReST-based self-training leads to a performance decrease compared to baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Guides practitioners on resource allocation for audio reasoning systems built on large audio-language models under limited data/compute budgets.

## Related

- (link related pages by id as the wiki grows)
