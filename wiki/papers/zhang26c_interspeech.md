---
id: zhang26c_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-288
pdf: https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.pdf
---

# AQA-TTRL: Self-Adaptation in Audio Question Answering with Test-Time Reinforcement Learning

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-288)

**TL;DR** — AQA-TTRL is a label-free test-time reinforcement learning framework for large audio language models that improves audio question-answering accuracy by 4.42% on Qwen2.5-Omni 7B and 11.04% on 3B across standard benchmarks.

## Problem

Large audio language models suffer from acoustic mismatch during real-world deployment due to environmental noise, recording variability, and domain shifts, which degrades audio question-answering performance. Collecting and annotating human-supervised update data is prohibitively costly and time-consuming, necessitating label-free adaptation methods that operate on unlabeled test data. However, applying test-time reinforcement learning to audio is challenging because self-generated pseudo-labels are inherently noisy and high-confidence predictions often cause advantage collapse during policy optimization.

## Method

The framework operates in a label-free test-time loop consisting of pseudo-label generation and model updates. First, it constructs consensus pseudo-labels by performing majority voting over multiple stochastic outputs using the base model. Next, it optimizes the policy using Group Relative Policy Optimization (GRPO) driven by format and exact-match accuracy rewards. To stabilize training against label noise, a confidence-weighted advantage mechanism scales training gradients using an exponential mapping of majority-vote consistency. Additionally, a multiple-attempt sampling strategy sequentially evaluates multiple candidate rollout groups to bypass advantage collapse caused by identical high-confidence outputs. Experiments use Qwen2.5-Omni 7B and 3B models, trained via AdamW with a learning rate of 1e-6 and batch size of 8.

## Results

Evaluated on MMAU (test-mini and test), MMAR, and MMSU benchmarks, AQA-TTRL achieves average accuracy improvements of 4.42% for Qwen2.5-Omni 7B and 11.04% for the 3B model over direct inference baselines. Notably, the adapted 3B model outperforms the unadapted 7B model under direct inference (64.86% vs. 64.39% average). The method consistently outperforms both majority-vote direct inference (DIMV) and supervised fine-tuning (SFT) on the same pseudo-labels. Ablation studies confirm that combining confidence-weighted advantage and multiple-attempt sampling yields the most robust performance gains (adding an average of 1.31%).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers deploying large audio language models in streaming or edge environments who need on-the-fly adaptation to unseen acoustic conditions without manual annotation.

## Related

- (link related pages by id as the wiki grows)
