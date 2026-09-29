---
id: jia26b_interspeech
category: resources-evaluation
labels: [self-supervised]
institutions: ["Nankai University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3176
pdf: https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.pdf
---

# Interpretable Audio Editing Evaluation via Chain-of-Thought Difference-Commonality Reasoning with Multimodal LLMs

*Yuhang Jia, Xu Zhang, Yang Chen, Hui Wang, Enzhi Wang, Yong Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jia26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3176)

**Category:** `resources-evaluation` · **Labels:** `self-supervised`

**TL;DR** — This paper introduces a natural language-based automated evaluation framework for audio editing built on Qwen2-Audio, using difference-commonality reasoning and a 7-step Chain-of-Thought prompting strategy to align with human judgments.

## Key contributions

- Proposed two dedicated caption-based fine-tuning tasks (Audio Difference Captioning and Audio Commonality Captioning) to boost multi-audio joint reasoning in Qwen2-Audio.
- Formulated two composite metrics, Edit_score and Faith_score, derived from captioning correlations that match or exceed traditional MOS predictors in evaluating editing effectiveness.
- Designed a 7-step Chain-of-Thought prompting strategy paired with instruction-tuning mechanisms (attention-leakage minimization via batch shuffling and reference repetition) for stable, interpretable audio editing evaluation.
- Curated a high-quality dataset of 30,000 pseudo-paired audio editing samples and a 40-sample instruction tuning set.

## Problem

Evaluating automated audio editing (such as addition, deletion, replacement, inpainting, or super-resolution based on instructions) is exceptionally difficult because standard text-to-audio metrics require ground-truth references that are unavailable in editing scenarios. Existing systems struggle because they lack joint perception of paired audio samples alongside user text instructions. Furthermore, prior automatic MOS prediction models fail to provide interpretable, fine-grained textual critiques that diagnose both the precision of targeted modifications and the faithful preservation of unedited background regions.

## Method

The framework utilizes Qwen2-Audio-7B-Instruct as the backbone multimodal large language model (MLLM). To bridge its limitation in multi-audio reasoning, the model is fine-tuned on 30,000 paired edited audio samples using two specialized tasks: Audio Difference Captioning (predicting modifications) and Audio Commonality Captioning (predicting preserved regions based on addition, deletion, or replacement rules).

For inference and evaluation, a 7-step Chain-of-Thought (CoT) prompting strategy is enforced. The steps direct the model to: (1) analyze actual difference, (2) analyze actual commonality, (3) restate expected difference, (4) restate expected commonality, (5) compare actual vs expected difference for editing effectiveness, (6) compare actual vs expected commonality for preservation, and (7) synthesize an overall quality assessment. Two composite metrics, Edit_score and Faith_score, are constructed by weighting captioning metrics (e.g., FENSE, CIDEr-d, SPICE) proportional to their linear correlation coefficients with human ratings.

To prevent catastrophic forgetting and trivial copying during training, an attention-leakage mitigation strategy is applied by randomly shuffling ground-truth captions within each batch. Additionally, explicit reference repetition steps are integrated into the prompt to prevent the model from overriding expected targets after generating its own observations.

## Experimental setup

Experiments use the AuditScore dataset comprising 318 test samples evaluated across 23 audio editing systems, alongside a 30,000-sample pseudo-paired fine-tuning set (~80 hours) split 8:1:1. Baselines include AuditEval-ssl (a specialized 1-5 scale MOS predictor), raw Qwen2-Audio, and Qwen2.5-Omni used as an A/B test judge. Training employs four NVIDIA RTX 4090 GPUs, LoRA (rank=8, alpha=32, dropout=0.05), effective batch size of 16, maximum sequence length of 2048, and a learning rate of 1e-4.

## Results

The fine-tuned model achieved significant captioning improvements, raising the Difference FENSE score from 0.2633 to 0.8370 and Commonality FENSE from 0.2664 to 0.6929 compared to the base Qwen2-Audio model. In correlation tests, the proposed Edit_score achieved a higher Linear Correlation Coefficient (LCC) of 0.7652 for editing effectiveness compared to AuditEval-ssl's 0.6196, closely tracking expert human ratings. However, Faith_score achieved an LCC of 0.3799 for preservation, underperforming relative to AuditEval-ssl (0.8460) because capturing subtle acoustic constraints like prosody and volume remains challenging for MLLMs.

| System / Condition | LCC (Edit.) | SRCC (Edit.) | LCC (Presv.) | SRCC (Presv.) |
|---|---|---|---|---|
| AuditEval-ssl | 0.6196 | 0.6472 | 0.8460 | 0.8809 |
| Edit_score (Ours) | 0.7652 | 0.7312 | 0.3799 | 0.3501 |
| Faith_score (Ours) | 0.4260 | 0.1532 | 0.5908 | 0.4605 |

## Limitations

The framework relies heavily on semantic text generation metrics and exhibits weaker performance in capturing low-level acoustic consistency (such as micro-prosody, phase artifacts, and fine-grained volume blending) required for the Faith_score. The evaluation scope is bounded by the scale and diversity of the 30k training samples, and the model's heavy reliance on instruction-following means it can struggle if prompt compliance or reference repetition steps are omitted.

## Why read this

Speech and ML researchers focusing on generative evaluation and MLLM-as-a-judge paradigms should read this paper to learn how to structure multi-audio joint reasoning via difference-commonality captioning and chain-of-thought prompting.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated evaluation, model selection, and reinforcement learning reward modeling for generative audio editing systems.

## Institutions / 機構

Nankai University

**Funding / 經費:** National Key R&D Program of China, NSF China

## Related

- [Calibration-Reasoning Framework for Descriptive Speech Quality Assessment](kostenok26_interspeech.md) — same problem · relatedness 2.2/3
- [UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models](zhou26c_interspeech.md) — shared data / evaluation · relatedness 2.1/3
- [The Interspeech 2026 Audio Reasoning Challenge: Evaluating Reasoning Process Quality for Audio Reasoning Models and Agents](ma26_interspeech.md) — shared technique · relatedness 2.1/3
- [Improving Text-to-Audio Instruction Following via Fine-Grained Feedback from Audio-Aware Large Language Models](kuan26_interspeech.md) — shared technique · relatedness 2.0/3
- [ELSA: Acoustic Event-Level Semantic Alignment for Fine-Grained Reference-Free Text-to-Audio Evaluation](suzuki26_interspeech.md) — shared data / evaluation · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
