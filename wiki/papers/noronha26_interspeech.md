---
id: noronha26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2880
pdf: https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.pdf
---

# Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026

[PDF](https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2880)

**TL;DR** — Structured chain-of-thought prompt engineering outperforms both automated prompt optimization and reinforced self-training for audio reasoning under limited data, boosting Qwen3-Omni 30B accuracy by 5.5% on the MMAR benchmark.

## Problem

While chain-of-thought reasoning improves text models, extending it to audio reasoning is bottlenecked by a scarcity of high-quality, domain-specific reasoning traces. Engineers and researchers face a dilemma on whether to invest in zero-cost prompt design or compute-heavy fine-tuning methods when labeled supervision and compute are constrained.

## Method

The study evaluates three resource-cost strategies using Qwen3-Omni 30B: (i) Structured Prompt Engineering via iterative error analysis establishing a HEARD->ANALYSIS->ANSWER cognitive workflow with anti-looping rules; (ii) Automated Prompt Optimization using DSPy MIPROv2; and (iii) Reinforced Self-Training (ReST) using qLoRA (NF4 4-bit, rank 64, alpha 128, attention and MoE expert modules) with difficulty-based learning-zone filtering (26-75% success rate over 16 sampled rationales per question). Inference uses vLLM in bfloat16 precision with a top-p of 0.9 and repetition penalty of 1.2.

## Results

Evaluated on the 1,000-sample MMAR test set comprising 16 subcategories across 4 reasoning layers. The baseline achieves 67.1% accuracy. Structured Reasoning achieves the top accuracy of 72.6% (+5.5%), improving across 13 of 16 subcategories (notably +13.1% in Counting & Statistics and +12.0% in Correlation Analysis). In contrast, automated optimization with MIPROv2 scores 63.3% (-3.8%), and ReST training scores 64.7% (-2.4% vs baseline, or 65.7% for its 4-bit counterpart) due to sparse learning-zone coverage (only 21.4% of problems) and distributional mismatch from auxiliary datasets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers and practitioners developing spoken language understanding and audio reasoning agents who need to maximize multimodal model performance under strict compute budgets.

## Limitations

The study's scope is restricted to the MMAR benchmark and a single base model, Qwen3-Omni 30B.

## Related

- (link related pages by id as the wiki grows)
