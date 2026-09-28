---
id: tang26_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-493
pdf: https://www.isca-archive.org/interspeech_2026/tang26_interspeech.pdf
---

# ADALA: A Wake-up Word Detection Framework Based on Adaptive Semi-supervised learning and Large Language Model

[PDF](https://www.isca-archive.org/interspeech_2026/tang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-493)

**TL;DR** — ADALA integrates reinforcement learning-optimized large language models with semi-supervised learning to generate dynamic hard negatives for wake-up word detection, achieving a 90.43% wake-up rate and a 3.19% false activation rate.

## Problem

Wake-up word detection suffers from an open-set generalization challenge against unseen negative samples, creating a difficult trade-off between high wake-up rates and low false activation rates. Traditional data strategies rely on fixed rules or focus solely on low-level signal features, failing to capture high-level semantic resemblance or generate sufficiently diverse hard negatives.

## Method

The framework uses Qwen2.5-14B as an actor policy network fine-tuned via PPO reinforcement learning to generate challenging text phrases, guided by expert linguistic prompts and a reward function combining a target WUW model and an external ASR verifier (FunASR-LargeV3-Turbo). Generated phrases are synthesized into audio using CosyVoice2-1.5B and combined with real-world labeled and unlabeled data in a semi-supervised training scheme. The training objective minimizes a composite loss featuring supervised loss, an unsupervised consistency regularization loss via a teacher-student EMA framework, and an adversarial domain adaptation loss with a gradient reversal layer.

## Results

Evaluated on an in-house 1430-hour Mandarin dataset and an English cross-lingual set of 2280 samples using strict commercial operating points (one false activation per 48 hours). Compared against supervised hard-negative mining and grapheme-editing augmentation (GraphemeAug). ADALA achieves an average wake-up rate of 90.43% and an acoustic-similar false activation rate of 3.19% on Mandarin, outperforming hard-negative mining (87.75% WR) and rule-based augmentation. Ablation tests demonstrate that semi-supervised learning boosts average wake-up rate from 86.36% to 90.44%, while RL-based LLM generation reduces false activation rate from 9.17% to 3.54%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building always-on voice assistants for smart devices, IoT systems, smartphones, wearables, and vehicles.

## Limitations

Relying on text-to-speech pipelines introduces synthetic artifacts, which the domain adaptation loss aims to mitigate.

## Related

- (link related pages by id as the wiki grows)
