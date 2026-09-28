---
id: yu26f_interspeech
category: emotion-recognition
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2031
pdf: https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.pdf
---

# Disentangling Reasoning in Large Audio-Language Models for Ambiguous Emotion Prediction

[PDF](https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2031)

**TL;DR** — This paper reformulates speech emotion recognition as a distributional reasoning problem using large audio-language models, improving emotional ambiguity handling and achieving consistent gains across SFT, DPO, and GRPO training strategies.

## Problem

Most existing speech emotion recognition systems predict a single discrete emotion class, which oversimplifies the inherently mixed and ambiguous nature of human emotional expression. While large audio-language models offer expressive potential, they typically struggle with probabilistic judgment and tend to experience premature collapse to deterministic interpretations under emotional uncertainty. This discrepancy prevents models from accurately mirroring human perceptual distributions and transparently reasoning over subtle acoustic and linguistic cues.

## Method

The authors introduce a framework consisting of an ambiguity-aware objective and structured chain-of-thought supervision. The model is built on Qwen2-Audio-7B-Instruct using LoRA (r=8, alpha=16) and optimized across three post-training paradigms: Supervised Fine-Tuning (SFT), Direct Preference Optimization (DPO), and Group Relative Policy Optimization (GRPO). Specifically, the distribution-level objective minimizes KL divergence between softmax token-level emotion logits and human perceptual soft labels derived from multi-annotator votes. Furthermore, structured reasoning trajectories are curated using GPT-4o to analyze text semantics, acoustic prosody, and resolve ambiguity, with GRPO enhanced by ground-truth reference trajectories (GRPOz) to stabilize reinforcement learning.

## Results

Evaluated on IEMOCAP (4 emotion classes, 5-fold cross-validation) and CREMA-D (6 emotion classes, voice-only set), the proposed framework consistently outperforms the base Qwen2-Audio-7B-Instruct and Audio-Reasoner baselines. Across Jensen-Shannon divergence (JS), Bhattacharyya coefficient (BC), R2, and Brier score metrics, GRPOz and DPO deliver superior distributional alignment compared to standard SFT. For instance, on IEMOCAP, GRPOz achieves a JS divergence drop down to 0.07 (compared to 0.25 for the base model) and a BC increase up to 0.82. Ablations confirm that leveraging multiple rollout trajectories combined with expert references outperforms isolated single-path supervision.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building conversational agents, mental health monitoring tools, and human-computer interaction systems that require uncertainty-aware, interpretable affective computing.

## Related

- (link related pages by id as the wiki grows)
