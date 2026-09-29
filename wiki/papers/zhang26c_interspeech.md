---
id: zhang26c_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["University of Tokyo"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-288
pdf: https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.pdf
---

# AQA-TTRL: Self-Adaptation in Audio Question Answering with Test-Time Reinforcement Learning

*Haoyu Zhang, Jiaxian Guo, Dong Yang, Yusuke Iwasawa, Yutaka Matsuo*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-288)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — AQA-TTRL is a test-time reinforcement learning framework that enables Large Audio Language Models to autonomously self-adapt on unlabeled test data, yielding average accuracy gains of 4.42% for 7B models and 11.04% for 3B models.

## Key contributions

- Proposes AQA-TTRL, a label-free test-time adaptation framework for audio question answering using Group Relative Policy Optimization (GRPO) driven by self-generated pseudo-labels.
- Introduces a confidence-weighted advantage scheme that re-scales training gradients based on majority-vote consistency, prioritizing high-reliability pseudo-labels.
- Develops a multiple-attempt sampling strategy to combat rollout collapse and vanishing policy advantages without requiring memory-prohibitive group sizes.
- Provides empirical validation across MMAU, MMAR, and MMSU benchmarks, showing that an adapted 3B model can outperform a static 7B model.

## Problem

Large Audio Language Models (LALMs) suffer from acoustic mismatch and domain shifts caused by background noise, recording variations, and speaker diversity in real-world deployments. While collecting human-annotated data for supervised fine-tuning resolves this, it is prohibitively expensive and time-consuming. Prior approaches cannot adapt on-the-fly without gold labels, making label-free test-time adaptation essential. However, applying Test-Time Reinforcement Learning (TTRL) to audio processing is challenging due to inherent noise in self-generated pseudo-labels and the "advantage collapse" phenomenon where high-confidence responses yield zero advantage.

## Method

AQA-TTRL operates in two stages: pseudo-label generation via majority voting and pseudo-label guided policy updates. For each audio-question pair $(a, q)$, the model generates $M$ stochastic predictions ($T=1$), and majority voting yields a consensus pseudo-label $\hat{y}$. The pseudo-label confidence is quantified as the fraction of votes matching $\hat{y}$.

For policy optimization, the framework utilizes Group Relative Policy Optimization (GRPO) with a group size $G=4$, using binary exact-match rewards combining format and accuracy ($r_i = r_{acc}(o_i, \hat{y}) + r_{format}(o_i)$). To address noisy pseudo-labels and rollout collapse, two mechanisms are introduced. First, a confidence-weighted advantage scales normalized advantages using an exponential function $f(Conf) = \exp(Conf)$ to prioritize reliable signals while bounding amplification. Second, a multiple-attempt sampling strategy sequentially draws groups of responses ($G_1, G_2, G_3$) and selects the first group containing non-identical outputs to bypass reward stagnation.

Training uses AdamW with a learning rate of $1e-6$, weight decay of $0.01$, global batch size of 8 across 4 GPUs, gradient clipping of 1.0, and bf16 precision. Hyperparameters $\epsilon=0.2$ and $\beta=0$, with updates running for 100 steps on smaller datasets and 500 steps on larger datasets.

## Experimental setup

Evaluated on MMAU (test-mini and test), MMAR, and MMSU benchmarks using Qwen2.5-Omni 7B and 3B as base models. Compared against Direct Inference (DI), Direct Inference with Majority Voting (DIMV), and Supervised Fine-Tuning (SFT) on identical pseudo-labels for 3 epochs. Metrics include accuracy percentages across sound, music, and speech subsets.

## Results

On Qwen2.5-Omni 7B, AQA-TTRL improves average accuracy from 64.39% (DI) and 65.59% (DIMV) to 68.81%, with notable gains on MMAU test-mini (76.80%) and MMAR (63.20%). On Qwen2.5-Omni 3B, average accuracy jumps from 53.82% (DI) to 64.86%, allowing the adapted 3B model to outperform the unadapted 7B model (64.39%). Ablation studies confirm that combining confidence weighting and multiple-attempt sampling yields the highest synergy, consistently outperforming standalone G-MV (67.50% average).

| System | MMAU test-mini | MMAU test | MMAR | MMSU | Average |
|---|---|---|---|---|---|
| Qwen2.5-Omni 7B (DI) | 72.40 | 70.60 | 57.70 | 56.84 | 64.39 |
| Qwen2.5-Omni 7B (DIMV) | 73.30 | 72.01 | 58.90 | 58.16 | 65.59 |
| Qwen2.5-Omni 7B (SFT) | 73.90 | 71.74 | 58.60 | 58.02 | 65.57 |
| Qwen2.5-Omni 7B (Ours) | 76.80 | 73.74 | 63.20 | 61.48 | 68.81 |
| Qwen2.5-Omni 3B (DI) | 61.50 | 61.55 | 46.90 | 45.34 | 53.82 |
| Qwen2.5-Omni 3B (Ours) | 72.30 | 71.05 | 57.90 | 58.18 | 64.86 |

## Limitations

The framework assumes tasks can be framed as closed-form or easily verified answer choices using exact-match rewards, limiting direct application to open-ended speech generation or conversational synthesis. The approach relies on multi-sample rollout generation during test time, which introduces computational overhead compared to single-pass inference. Evaluation is restricted to English-centric or standard public audio question-answering benchmarks, leaving multilingual or streaming long-form audio scenarios untested.

## Why read this

Researchers and engineers working on test-time adaptation, reinforcement learning without ground truth labels, or deploying resource-efficient audio language models will find this a blueprint for bypassing costly supervised fine-tuning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

On-the-fly acoustic adaptation for smart speakers, edge voice assistants, and audio surveillance systems operating in changing acoustic environments without manual data relabeling.

## Institutions / 機構

University of Tokyo

## Related

- [CoRE: Contrastive Evidence-Aware Rescoring for Multiple-Choice Audio Question Answering](zhang26f_interspeech.md) — same problem · relatedness 2.6/3
- [Structured Prompting vs. Self-Training for Audio Reasoning Under Limited Data and Compute: Lessons from Interspeech Audio Reasoning Challenge 2026](noronha26_interspeech.md) — same problem · relatedness 2.5/3
- [Multi-Source Evidence Fusion for Audio Question Answering](olev26_interspeech.md) — same problem · relatedness 2.5/3
- [Enhancing Audio Reasoning via Semantic Summary Prediction](bonzi26_interspeech.md) — same problem · relatedness 2.4/3
- [EChO-Agent: Evidence Chain Orchestration Agent for Audio Reasoning](zhang26t_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
