---
id: bhagtani26_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3083
pdf: https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.pdf
---

# Speak or Stay Silent: Context-Aware Turn-Taking in Multi-Party Dialogue

*Kratika Bhagtani, Mrinal Anand, Yu Chen Xu, Amit Kumar Singh Yadav*

[PDF](https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhagtani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3083)

**TL;DR** — The paper formulates context-aware turn-taking for multi-party conversational AI assistants, showing that off-the-shelf large language models fail at zero-shot prompting while supervised fine-tuning with reasoning traces improves balanced accuracy by up to 23 percentage points.

## Key contributions

- Introduces a benchmark of over 120K labeled conversation decision points spanning workplace meetings (AMI), social dialogue (Friends), and financial calls (SPGISpeech 2.0), categorized into four distinct turn-taking contexts.
- Demonstrates through zero-shot evaluations across eight prominent closed-source and open-source LLMs that context-aware turn-taking is not an emergent property and suffers from a severe pro-speaking bias.
- Proposes a supervised fine-tuning framework leveraging distilled reasoning traces from a teacher model (Gemini 2.5 Flash) and four-way balanced batch sampling to overcome class and category imbalance.
- Shows that joint training across combined multi-party corpora generalizes robustly across distinct dialogue settings without requiring per-domain adaptation.

## Problem

Current voice AI assistants operate on simplistic, dyadic assumptions where every detected pause is treated as a trigger to speak. In multi-party environments like meetings or group discussions, pauses are abundant and ambiguous, causing naive voice agents to become disruptive by interrupting unnecessarily or failing to respond when explicitly addressed. Prior work has largely focused on two-party signal-level turn-taking or isolated sub-tasks like addressee recognition, leaving an open gap in predicting an integrated, context-aware participation decision (SPEAK vs. SILENT) at every conversational pause.

## Method

The task is formulated as a binary prediction problem where, given a sequence of multi-party utterances up to time t and a detected pause, a target participant decides whether to output SPEAK or SILENT. The benchmark divides decision points into four categories: Explicit Address (I1), Contextual Intervention (I2), No Reference (S1), and Referenced but not Addressed (S2). Transcripts shorter than 3 characters and filler-only utterances are filtered out, and exact deduplication is applied.

Open-source models are fine-tuned using Low-Rank Adaptation (LoRA) with rank r=32, alpha=64, and 0.05 dropout applied to attention and MLP projection layers. The training recipe utilizes the AdamW optimizer with a learning rate of 1e-4, cosine learning rate schedule, a batch size of 32 via 16 gradient accumulation steps, 16-bit floating point precision, 3 epochs, and 10 warmup steps. Inputs are capped at 2,048 tokens (1,536 tokens for gpt-oss-20b). To mitigate data distribution skews, a four-way balanced batch sampler draws an equal 25% quota from each of the four categories.

Training is evaluated under two modes: Decision-only and Reasoning with Decision. In the latter, label-conditioned distillation prompts Gemini 2.5 Flash to generate a one-sentence justification prior to the binary label, helping the model resolve complex pragmatic cues especially needed for silent categories (S1 and S2).

## Experimental setup

The benchmark covers three datasets totaling 120,160 decision points: AMI (11,900 points), Friends (8,970 points), and SPGISpeech 2.0 (subsampled to roughly 11K training samples from 99,290 total points). Each dataset is split 80/10/10 into train, validation, and test sets per category. Evaluated models include closed-source (gpt-5.2, gemini-3.1-pro) and open-source models (gpt-oss-20b, LLaMA-3.1-8B-Instruct, Mistral-7B-Instruct, Qwen2.5-7B, Qwen3-4B-Instruct, and Qwen3-8B). Performance is measured using Accuracy, Class-averaged F1, and Balanced Accuracy, alongside category-wise breakdowns.

## Results

Zero-shot evaluation revealed that models struggle profoundly, yielding near-random performance for open-source architectures and peaking at a modest 64.45% balanced accuracy for gemini-3.1-pro on SPGI, heavily skewed by a false-positive SPEAK bias. Supervised fine-tuning with Decision-only mode elevated performance significantly, with Mistral-7B-Instruct achieving a balanced accuracy of 72.28% on AMI (an increase of over 23 percentage points). 

Ablation studies demonstrated that augmenting SFT with reasoning traces (Reasoning with Decision mode) on Qwen2.5-7B further boosted balanced accuracy on the Friends dataset from 66.60% to 68.46% (and accuracy from 63.64% to 70.84%). Varying LoRA ranks confirmed that rank 32 strikes the optimal trade-off, while ranks 16 and 64 underperform or saturate. Human evaluation on the Friends dataset yielded an average balanced accuracy of 63.75% with a moderate inter-annotator Cohen's kappa of 0.492, showing that the proposed fine-tuned models match or exceed human-level performance on this highly subjective task.

| System / Condition | Accuracy (%) | F1avg (%) | Bal Acc (%) |
|---|---|---|---|
| gemini-3.1-pro (Zero-Shot, SPGI) | 64.57 | 63.93 | 64.45 |
| LLaMA-3.1-8b-instruct (Zero-Shot, AMI) | 50.72 | 47.09 | 50.35 |
| Mistral-7b-instruct (SFT, AMI) | 72.17 | 72.05 | 72.28 |
| Qwen2.5-7b (SFT, Friends) | 63.64 | 63.63 | 66.60 |
| Qwen2.5-7b + Reasoning (SFT, Friends) | 70.84 | 68.80 | 68.46 |
| Human Evaluation Average (Friends) | 65.65 | 63.51 | 63.75 |

## Limitations

The work currently relies strictly on text transcripts derived from offline conversational data, omitting multimodal cues such as prosody, gaze, and head gestures that heavily influence human turn-taking. The evaluation is scoped to text-based LLMs and requires fine-tuning infrastructure, meaning deployment in real-time full-duplex conversational streaming applications necessitates future integration with speech front-ends.

## Why read this

Researchers and engineers building multi-party conversational voice agents will learn why standard instruction-tuned LLMs fail at turn-taking and how reasoning-distilled supervised fine-tuning can resolve ambiguity in group dialogues.

## Code

- https://github.com/ishikilabsinc/context_aware_modeling/tree/main

## Applications

Real-time multi-party voice assistants, automated meeting summarization and facilitation agents, and group video conferencing moderation systems.

## Related

- (link related pages by id as the wiki grows)
