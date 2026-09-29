---
id: wang26fa_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Johns Hopkins University", "Amazon"]
code: https://github.com/YuzheWangjhu/StanceBench
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2938
pdf: https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.pdf
---

# StanceBench: A Benchmark for Audio LLM-Based Interpersonal Stance Evaluation from Speech

*Yuzhe Wang, Thomas Thebaud, Jennifer Hu, Jesús Villalba-Lopez, Venkatesh Ravichandran, Georgi Tinchev, Najim Dehak, Laureano Moro-Velázquez*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26fa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2938)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — StanceBench is a standardized benchmark for evaluating audio LLMs as automated judges of interpersonal stance in conversational speech across 9 fine-grained dimensions, revealing that commercial audio-native models like GPT-Audio achieve strong separability (AUROC up to 0.96 for empathy) while open end-to-end models suffer from higher failure rates and modality vulnerabilities.

## Key contributions

- Introduces a unified evaluation framework for interpersonal stance in conversational speech using 9 distinct dimensions derived from role-prompt pole pairs (spanning single-speaker and interaction-based contexts).
- Establishes a standardized data pipeline utilizing Inter-Pausal Units (IPUs) with strict active-speech duration trimming, dual-variant pole-order checking, and structured JSON output contracts.
- Benchmarks five diverse judge models (Qwen2.5-Omni-7B, Kimi-Audio-7B-Instruct, Granite-Speech-3.3-8B, GPT-Audio, and Gemini-2.5-Flash), quantifying trade-offs in structural failure rates, pole-order sensitivity, and stance separability.
- Performs audio vs. transcript-only ablations showing that raw acoustic/paralinguistic cues are critical for accurately judging stance dimensions like sincerity, warmth, and engagement.

## Problem

Current speech-to-speech dialogue models increasingly rely on prosody and social intent, yet automatic evaluations remain anchored to legacy ASR/TTS transcription metrics or content correctness. Traditional text-based NLP dialogue metrics completely miss paralinguistic interaction cues like empathy, engagement, dominance, and politeness. Furthermore, prior work lacks a standardized framework to stress-test audio-capable LLMs as automated judges for stance under controlled perturbations like position bias and missing context.

## Method

StanceBench extracts conversational segments using an energy-based hysteresis voice activity detection (25 ms window, 10 ms hop, 0.3s silence gap) on the Improvised subset of the Meta Seamless Interaction corpus. It defines 9 stance dimensions separated into Category 1 (Single-speaker: Warmth, Compassion/Empathy, Politeness/Respect, Assertiveness, Sincerity/Honesty, Cognitive Attentiveness; target segments restricted to 2-15s active speech) and Category 2 (Interaction-based: Social Engagement, Power Orientation, Conflict Regulation; utilizing paired interlocutor context windows of 1-10s active speech separated by turn switches). All judge models are prompted under a strict JSON output contract requiring a binary choice (P/N), a verbal probability confidence score in [0, 1], and 2-4 textual evidence strings.

To control for positional bias and LLM evaluation instability, every evaluation instance is run twice using a balanced-position design: Variant 0 presents the positive pole definition first, while Variant 1 presents the negative pole first. Model outputs are converted to signed probabilities in [-1, 1], averaged across both orderings, and evaluated against weak labels derived from professional actor role prompts. An ablation study compares multimodal Qwen against a text-only variant using gpt-4o-transcribe ASR transcripts to isolate the precise contribution of raw acoustic and prosodic features.

## Experimental setup

The evaluation uses a randomly sampled 25% subset of the Improvised subset of the Meta Seamless Interaction corpus, yielding 2,431 conversations across 484 unique speakers (shared subset where all models returned valid outputs). It compares five judge models: Qwen2.5-Omni-7B, Kimi-Audio-7B-Instruct, ibm-granite/granite-speech-3.3-8b, gpt-audio (2025-08-28), and Gemini-2.5-Flash (June 2025). Metrics include structural failure rate, mean segment disagreement rate (pole-order sensitivity), categorical pole-consistency, oracle upper-bound F1, Equal Error Rate (EER), Area Under the ROC Curve (AUROC), and Spearman's correlation against human consensus scores collected from a subset of 122 instances.

## Results

GPT-Audio achieves the lowest structural failure rates (0.00 to 0.005) and dominates AUROC on 5 of 9 dimensions (e.g., S0 Warmth AUROC 0.81, S2 Politeness 0.94), though Gemini-2.5-Flash performs best on compassion/empathy (AUROC 0.96, EER 0.06) and power orientation (AUROC 0.86). Open-weight end-to-end models exhibit substantial structural failures, with Qwen failing 3% to 30% of the time and Kimi failing up to 44% (peaking on S3 Assertiveness). Across dimensions, Compassion/Empathy and Politeness/Respect are the easiest to judge (AUROC > 0.85), whereas Honesty/Sincerity is the hardest single-speaker dimension (AUROC 0.50-0.72) due to its dependence on cross-turn discourse consistency rather than local prosody. Interaction-based conflict regulation shows high positional sensitivity (Qwen disagreement rate 0.22) and near-neutral overlap.

| System / Model | S1 Empathy AUROC | S2 Politeness AUROC | S4 Honesty AUROC | S8 Conflict AUROC | Mean Failure Rate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Qwen2.5-Omni-7B | 0.92 | 0.87 | 0.64 | 0.62 | 0.15 |
| Kimi-Audio-7B-Instruct | 0.93 | 0.87 | 0.67 | 0.75 | 0.31 |
| Granite-Speech-3.3-8B | 0.87 | 0.85 | 0.50 | 0.78 | 0.02 |
| GPT-Audio | 0.94 | 0.94 | 0.72 | 0.76 | 0.00 |
| Gemini-2.5-Flash | 0.96 | 0.91 | 0.66 | 0.84 | 0.01 |

## Limitations

The benchmark relies on weak supervision from role prompts rather than verified human perceptual ground truth, and evaluates constrained short segments that may underspecify long-range conversational phenomena. Human evaluation coverage is limited to a small sampled subset (122 instances), and open-weight models display high failure rates requiring strict output formatting constraints. Furthermore, deploying such systems risks misuse for unconsented psychological profiling or trait inference.

## Why read this

Researchers and engineers building speech-to-speech dialogue models or automated evaluation pipelines should read this paper to understand the limitations of current LLM-as-a-judge frameworks when evaluating paralinguistic and social intent. It provides actionable insights into model robustness, position bias, and the exact dimensional limits of audio vs. text-only judges.

## Code

- https://github.com/YuzheWangjhu/StanceBench

## Applications

Evaluating speech-to-speech dialogue models, automated conversational coaching systems, and interactive voice agents for social intelligence, empathy, and conflict resolution.

## Institutions / 機構

Johns Hopkins University, Amazon

**Funding / 經費:** Amazon

## Related

- (link related pages by id as the wiki grows)
