---
id: jing26_interspeech
category: resources-evaluation
institutions: ["Technical University of Munich", "Munich Center for Machine Learning", "Huawei", "Imperial College London"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1046
pdf: https://www.isca-archive.org/interspeech_2026/jing26_interspeech.pdf
---

# EmoSURA: Towards Accurate Evaluation of Detailed and Long-Context Emotional Speech Captions

*Xin Jing, Andreas Triantafyllopoulos, Jiadong Wang, Shahin Amiriparian, Jun Luo, Bjoern Schuller*

[PDF](https://www.isca-archive.org/interspeech_2026/jing26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jing26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1046)

**Category:** `resources-evaluation`

**TL;DR** — EmoSURA is a fine-grained evaluation framework for emotional speech captioning that decomposes long descriptions into Atomic Perceptual Units (APUs) and validates them against raw audio via an audio-grounded binary judge, achieving superior correlation with human judgments compared to traditional metrics.

## Key contributions

- Proposes EmoSURA, a modular evaluation framework that shifts from holistic text scoring to atomic perceptual unit (APU) verification and audio-grounded entailment.
- Constructs SURABench, a balanced and stratified evaluation benchmark derived from MSP-Podcast v1.11 comprising 1,018 utterances with uniform valence-arousal coverage.
- Demonstrates that traditional n-gram and length-sensitive metrics exhibit negative correlation with human judgments for long-form speech captions due to verbosity penalties, whereas EmoSURA achieves positive rank and Pearson correlation.

## Problem

Evaluating recent large audio-language models for emotional speech captioning is bottlenecked because traditional n-gram metrics (BLEU, CIDEr) fail to capture semantic nuances and penalize model verbosity, while LLM-as-a-judge approaches suffer from context-collapse and reasoning inconsistency on long-form descriptions. Existing text-only semantic similarity metrics cannot ground affective descriptions in the actual acoustic signals, leaving a critical gap for reliable, interpretable automated evaluation. This matters because the lack of an appropriate evaluation metric hinders systematic model development and optimization in affective computing.

## Method

EmoSURA operates in three modular stages: Atomic Decomposition, Audio-Grounded Verification, and Semantic Matching. First, Qwen2.5-7B-Instruct parses generated and reference captions into sets of minimal, standalone declarative Atomic Perceptual Units (APUs) representing single attribute-level facts. Second, Qwen2-Audio-7B-Instruct jointly processes the raw speech signal and each generated APU to perform a binary Yes/No entailment judgment, establishing a precision-oriented factual correctness score that filters out audio hallucinations. Third, Qwen2.5-7B-Instruct evaluates semantic recall by aligning reference APUs with generated APUs while accounting for verified, non-reference descriptive details.

To compute the final score, EmoSURA combines precision-oriented and recall-oriented scores into an F1 formulation, alongside a specialized descriptive F1 score restricted to paralinguistic attributes. The design choices prioritize binary Yes/No decisions to prevent model generation collapse and error accumulation. SURABench was curated from MSP-Podcast v1.11 by filtering clips between 3 to 8 seconds, enforcing standard deviation thresholds (<= 1.5) on valence and arousal ratings, and applying 10x10 stratified grid sampling across the Valence-Arousal space (up to 15 samples per bin) to eliminate class imbalances. High-fidelity reference captions were generated using paralinguistic feature extraction (pitch, loudness, jitter, shimmer, tempo) combined with human expert templates and GPT-4.1 few-shot prompting.

## Experimental setup

Evaluations used SURABench containing 1,018 utterances and a subjective Mean Opinion Score (MOS) test with 14 participants (6 males, 8 females, including 6 audio experts) rating 320 audio-caption pairs across four categories (Ground Truth, Sabotaged, Unconstrained Qwen-Omni, Refined Qwen-Omni). Baselines included rule-based metrics (BLEU-4, ROUGE-L, METEOR, CIDEr, SPIDER), model-based metrics (SPICE, MACE), and human ratings evaluated via Pearson correlation coefficient (PCC), Kendall's rank correlation (Kd tau), and sample-wise tau (Sp tau).

## Results

Traditional rule-based metrics showed severe negative correlations with human judgments (e.g., BLEU-4 PCC at -0.6419, ROUGE-L at -0.7017, CIDEr at -0.6640), driven by length discrepancies where models generated verbosier outputs (mean 684 chars) than human references (mean 459 chars). In contrast, EmoSURA achieved a positive Pearson correlation coefficient of 0.4391, outperforming MACE (0.4283) and demonstrating superior rank correlation (Kd tau 0.3277, Sp tau 0.4480). Perturbation tests revealed high detection sensitivity for low-level acoustic features (93.33% detection rate, with gender at 97.50%) and emotions (82.50%), but a performance drop for complex vocal events like fabricated singing or sobbing (60.00%).

| Metric | PCC (rho) up | Kd tau up | Sp tau up |
| --- | --- | --- | --- |
| BLEU-4 | -0.6419 | -0.4494 | -0.6916 |
| ROUGE-L | -0.7017 | -0.4606 | -0.6916 |
| CIDEr | -0.6640 | -0.3732 | -0.6175 |
| SPICE | -0.5728 | -0.3874 | -0.6240 |
| MACE | 0.4283 | 0.2619 | 0.3709 |
| EmoSURA (Ours) | 0.4391 | 0.3277 | 0.4480 |

## Limitations

The moderate PCC (~0.44) indicates that a substantial portion of human judgment variance remains unexplained by the framework. Additionally, EmoSURA struggles with detecting complex temporal vocal events (such as distinguishing subtle simulated or fabricated vocalizations), pointing to limitations in long-term temporal modeling and higher-level semantic abstraction.

## Why read this

Speech and ML researchers working on audio-language models and affective computing should read this paper to understand why traditional n-gram metrics fail for long-form speech captions and how atomic, audio-grounded verification provides a reliable, interpretable alternative.

## Code

- https://github.com/KeiKinn/EmoSURA

## Applications

Automated evaluation and reinforcement learning optimization for emotional speech captioning and audio-language models.

## Institutions / 機構

Technical University of Munich, Munich Center for Machine Learning, Huawei, Imperial College London

## Related

- (link related pages by id as the wiki grows)
