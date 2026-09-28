---
id: wang26k_interspeech
category: audio-deepfake
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-589
pdf: https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.pdf
---

# Does Fine-tuning by Reinforcement Learning Improve Generalization in Binary Speech Deepfake Detection?

[PDF](https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-589)

**TL;DR** — This paper investigates applying Group Relative Policy Optimization (GRPO) reinforcement learning to fine-tune speech foundation models for binary deepfake detection, successfully improving out-of-domain generalization while maintaining target-domain accuracy.

## Problem

Supervised fine-tuning (SFT) of speech foundation models for binary deepfake detection often suffers from catastrophic forgetting, causing models to degrade heavily on out-of-domain and unseen deepfake test data. While large language models successfully mitigate this via reinforcement learning, speech anti-spoofing research has relied almost exclusively on SFT. This lack of robust cross-domain adaptation poses a major vulnerability for real-world speech deepfake countermeasures.

## Method

The study applies Group Relative Policy Optimization (GRPO) and its simplified variant (GRPOs) to fine-tune post-trained self-supervised learning (SSL) speech models (such as XLS-R-2B, MMS-1B, and MMS-300M). The model architecture utilizes an SSL front-end, global average pooling over the final layer features, and a linear classification head mapped via softmax. For GRPO, the reward is framed as an indicator function comparing sampled binary outputs to the ground truth, sampling $G=64$ rollouts per input with a KL penalty weight $\beta=0.04$. Ablation configurations explore setting $\beta=0$ (no regularization), $\beta=1$ (strong regularization), removing negative rewards, and a sequential SFT-then-GRPO pipeline.

## Results

Experiments using the Deepfake-Eval-2024 (DFE24) training set for fine-tuning evaluate models across in-domain (DFE24 evaluation partitions) and out-of-domain test sets including ADD23, For, DV, and In-the-Wild (ItW), measuring performance via Equal Error Rate (EER). Pure GRPO-based fine-tuning drops out-of-domain EER on ItW from 6.35% (SFT baseline) to 2.19% while preserving in-domain EER around 9.45% to 11.20%. Sequential SFT-then-GRPO setups underperform pure GRPO, and applying GRPO directly to raw pre-trained models without intermediate post-training fails to yield generalization gains. Ablations reveal that omitting negative rewards degrades performance across all sets, and heavy regularization ($\beta=1$) causes target-domain under-fitting.

## Code

- https://github.com/nii-yamagishilab/AntiDeepfake

## Applications

Engineers and security practitioners deploying speech deepfake detection systems in production environments where test data exhibits unseen acoustic conditions, diverse background noise, and novel spoofing attacks.

## Limitations

The approach requires a pre-existing post-trained foundation model to be effective, and the underlying mechanisms driving GRPO's improvements over SFT require further theoretical exploration.

## Related

- (link related pages by id as the wiki grows)
