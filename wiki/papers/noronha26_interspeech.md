---
id: noronha26_interspeech
category: speech-llm-dialogue
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2880
pdf: https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.pdf
---

# Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026

*Sujit Noronha, Steven Au, Kaushlendra Tripathi*

[PDF](https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/noronha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2880)

**Category:** `speech-llm-dialogue`

**TL;DR** — This paper evaluates structured prompt engineering, automated prompt optimization, and reinforced self-training for audio reasoning on the MMAR benchmark using Qwen3-Omni 30B. It demonstrates that a structured HEARD-ANALYSIS-ANSWER prompting strategy achieves a peak accuracy of 72.6% (+5.5% over baseline) at zero training cost, outperforming compute-intensive self-training and automated optimization methods.

## Key contributions

- A structured chain-of-thought (CoT) system prompt enforcing a HEARD -> ANALYSIS -> ANSWER sequence that reaches 72.6% accuracy, improving 5.5% over the 30B baseline.
- An empirical comparison showing that structured prompt design outperforms both automated prompt search (DSPy MIPROv2) and reinforced self-training (ReST) under limited data and compute constraints.
- A granular subcategory-level breakdown across 16 MMAR subcategories, revealing that structured prompting improves 13 of 16 subcategories while self-training causes widespread regressions.
- Analysis of ReST failure modes on a 30B-parameter multimodal model, attributing underperformance to sparse learning-zone coverage (only 21.4% of problems) and distributional mismatch from auxiliary datasets.

## Problem

Large audio-language models struggle with complex audio reasoning tasks that require bridging low-level acoustic properties with high-level semantics. While chain-of-thought prompting improves reasoning, extending it to the audio domain is bottlenecked by the scarcity of high-quality audio reasoning traces. When data and compute are limited, researchers face a difficult trade-off between zero-cost prompt engineering and compute-heavy weight updates, with little guidance on which strategy is most effective.

## Method

The study investigates three distinct optimization strategies built on top of Qwen3-Omni 30B. The first approach, Reinforced Self-Training (ReST), generates 16 synthetic rationale candidates per question at temperature 0.6 using auxiliary datasets like MusicBench and CountingQA alongside MMAR training data. Candidates are filtered using a discrete correctness filter and restricted to a 'learning zone' of 26-75% success rate (yielding 4,361 training samples from 66,448 candidates). This filtered data is used to fine-tune attention and MoE expert modules for one epoch via qLoRA (NF4 4-bit quantization, LoRA rank 64, alpha 128, learning rates decaying from 2e-5 to 5e-6 across 3 iterations).

The second approach employs automated prompt optimization via DSPy MIPROv2 over a stratified train/dev split to search for optimal prompt candidates. The third and most successful approach is Structured Prompt Engineering, which uses iterative error analysis to uncover dominant failure modes like counting overlaps and positivity biases. This culminates in a structured system prompt mandating a three-stage workflow: HEARD (perceptual description), ANALYSIS (evidence synthesis and elimination), and ANSWER (one-sentence commitment). It explicitly forbids self-correction loops ('Wait', 'Actually') to maintain fidelity to initial audio perceptions.

Inference across all prompt evaluations is executed via vLLM in bfloat16 precision with tensor parallelism of 4, using a temperature of 0.1, top-p of 0.9, top-k of 40, repetition penalty of 1.2, and a 6,000 token maximum length.

## Experimental setup

Evaluated on the Multi-Modal Audio Reasoning (MMAR) benchmark consisting of 1,000 multiple-choice questions spanning 4 reasoning layers and 16 subcategories. Compares a bfloat16 baseline (67.1% accuracy), a 4-bit quantized baseline (65.7%), automated MIPROv2 optimization, and ReST fine-tuning against four iterative versions of structured prompts (Expert Analyst, Category-Aware, Targeted Hints, and Structured Reasoning). Metrics are reported as overall accuracy percentage and per-subcategory accuracy.

## Results

Structured Reasoning achieved the highest accuracy of 72.6%, representing a +5.5% absolute improvement over the baseline and dominating across 9 of 16 subcategories with major gains in Correlation Analysis (+12.0%) and Counting & Statistics (+13.1%). In contrast, Reinforced Self-Training dropped to 64.7% (-2.4% vs baseline, -1.0% vs 4-bit baseline), yielding narrow gains in Aesthetic Evaluation and Speaker Analysis but severe drops in Music Theory (-15.4%) and Emotion & Intention (-8.4%). DSPy MIPROv2 performed the worst at 63.3% (-3.8% vs baseline), displaying high inconsistency with extreme regressions in Culture of Speaker (-11.6%) and Correlation Analysis (-12.0%).

| Systems/Conditions | Accuracy (%) | Delta vs Baseline |
|---|---|---|
| Baseline (bfloat16) | 67.1 | — |
| Baseline 4-bit | 65.7 | -1.4 |
| Expert Analyst Prompt | 68.3 | +1.2 |
| Category-Aware Prompt | 68.1 | +1.0 |
| Structured Reasoning Prompt | 72.6 | +5.5 |
| ReST (qLoRA 4-bit) | 64.7 | -2.4 |
| MIPROv2 Optimized | 63.3 | -3.8 |

## Limitations

The study is constrained by testing a single base model (Qwen3-Omni 30B) on a single benchmark (MMAR) with a limited sample size of 1,000 questions, introducing statistical noise in small subcategories like Aesthetic Evaluation (n=8). The experiments involve a precision mismatch where prompt evaluations use bfloat16 while ReST uses 4-bit quantization, and fine-tuning was artificially restricted to a single training epoch due to compute constraints.

## Why read this

Speech and ML engineers working with large audio-language models under limited supervision should read this to understand why structured prompt scaffolding vastly outperforms compute-heavy self-training for eliciting latent reasoning capabilities.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving automated audio question answering, multimedia content analysis, and complex acoustic reasoning systems for resource-constrained environments.

## Related

- [EChO-Agent: Evidence Chain Orchestration Agent for Audio Reasoning](zhang26t_interspeech.md) — shared data / evaluation · relatedness 3.0/3
- [Multi-Source Evidence Fusion for Audio Question Answering](olev26_interspeech.md) — shared data / evaluation · relatedness 3.0/3
- [Audio-Cogito: Towards Deep Audio Reasoning in Large Audio Language Models](li26o_interspeech.md) — shared data / evaluation · relatedness 3.0/3
- [MATA: A Training-Free Approach to Mitigate Cross-Modal Attention Imbalance in Large Audio Language Models](wang26t_interspeech.md) — shared data / evaluation · relatedness 2.9/3
- [VISA: A Visual Information Strengthened Audio-Reasoning System for the Interspeech 2026 ARC Agent Track](tu26b_interspeech.md) — shared data / evaluation · relatedness 2.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
