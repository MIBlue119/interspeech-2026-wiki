---
id: tang26_interspeech
category: keyword-spotting
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-493
pdf: https://www.isca-archive.org/interspeech_2026/tang26_interspeech.pdf
---

# ADALA: A Wake-up Word Detection Framework Based on Adaptive Semi-supervised learning and Large Language Model

*Nianhang Tang, Chaoyi Sun, Chao Cai*

[PDF](https://www.isca-archive.org/interspeech_2026/tang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-493)

**TL;DR** — ADALA is a wake-up word detection framework that combines an RL-optimized large language model for dynamic hard-negative generation with semi-supervised consistency training, achieving a 90.43% wake-up rate and a 3.19% false activation rate.

## Key contributions

- LLM-based semantic and phonetic boundary sample generation using Qwen2.5-14B primed with linguistic priors.
- A closed-loop Actor-Critic reinforcement learning setup that co-evolves the LLM generator using granular WUW and ASR verification rewards via PPO.
- An adaptive semi-supervised fusion framework that integrates synthetic boundary samples with real-world labeled and unlabeled data using consistency regularization and domain adversarial training.

## Problem

Wake-up word (WUW) detection suffers from an inherent open-set trade-off: a finite-parameter model must reliably accept target keywords while rejecting an infinite set of unseen negative phrases. Prior data strategies like static hard-negative mining, consistency-based semi-supervised learning, and rule-based data synthesis (e.g., GraphemeAug) rely on fixed rules that fail to cover diverse semantic and phonetic variations. Meanwhile, conventional adversarial training focuses solely on low-level signal feature similarity rather than high-level semantic resemblance, leaving models vulnerable to unexpected false activations.

## Method

The ADALA framework consists of two main parts: an Actor-Critic reinforcement learning generator and a semi-supervised WUW training module. In the generation module, the Actor policy network (Qwen2.5-14B) takes structured prompts containing linguistic priors and real false-wake phrases to generate hard-negative text tokens. These are synthesized into waveforms via CosyVoice2-1.5B (1.5B) and evaluated by a target WUW model and an external ASR verifier (FunASR-LargeV3-Turbo). Rewards range from +1 to +5 for false triggers, -5 for correct wake-up words, and -1 for trivial non-triggers. The Critic network estimates state-values using a mean-squared TD error loss (L_critic), while the Actor is optimized via PPO actor loss (L_actor) regularized by entropy (L_entropy) and KL divergence (L_KL) losses.

The WUW model training module minimizes a composite loss combining supervised loss (L_sup) using max-pooling over frame and word levels, unsupervised consistency loss (L_unsup) via a teacher-student EMA framework (decay 0.999, confidence threshold 0.8) on distorted vs. clean unlabeled audio, and an adaptation loss (L_adapt) using a Gradient Reversal Layer and domain classifier to suppress TTS artifacts. The model is trained in parallel on mini-batches combining labeled, unlabeled, and synthetic data rather than sequentially.

## Experimental setup

Evaluated on a large-scale in-house Mandarin dataset totaling 1430 hours (balanced across gender, age, and speech rate) targeting 'xiao fei xiao fei', plus a cross-lingual English evaluation set of 2,280 utterances targeting 'Hello Wikka'. Baselines include standard Hard-Negative Mining and rule-based GraphemeAug. Metrics include Average Wake-up Rate (WR) across quiet, fast, slow, dual-speaker, and accented test sets, and Average Similar-Word False Activation Rate (ASW-FAR) on controlled (SW-Rec) and log-derived (SW-Log) confusable words. LLM fine-tuning runs for 50,000 steps with AdamW (batch size 64, lr 3e-5) using eight Tesla A800-80GB GPUs for 40 hours; WUW model training runs for 100,000 iterations (batch size 16).

## Results

ADALA achieves an average wake-up rate of 90.43% and an ASW-FAR of 3.19%, outperforming the standard Hard-Negative Mining baseline (87.75% WR, 5.87% ASW-FAR) and the rule-based GraphemeAug baseline (86.36% WR, 2.94% ASW-FAR). ADALA particularly excels under challenging conditions, yielding up to 4% higher WR on fast speech and nearly 10% higher WR on accented speech. In ablation studies, adding the RL-based LLM generation drastically reduces ASW-FAR from 9.17% to 3.54%, while adding semi-supervised learning lifts the average wake-up rate from 86.36% to 90.44%. On the English cross-lingual test ('Hello Wikka'), ADALA reaches 90.42% WR and 1.67% ASW-FAR, beating Hard-Negative Mining (86.70%) and GraphemeAug (87.71%).

| System | Avg. Wake-up (Mandarin) | ASW-FAR (Mandarin) |
|---|---|---|
| Hard-Negative Mining | 87.75% | 5.87% |
| GraphemeAug | 86.36% | 2.94% |
| Ours (Full ADALA) | 90.43% | 3.19% |

## Limitations

The framework relies heavily on intermediate Text-to-Speech (TTS) synthesis pipelines, which may introduce acoustic domain gaps and artifacts that require adversarial domain adaptation layers to mitigate. Evaluation is currently constrained to Mandarin and single-phrase English test sets, leaving broader multilingual scalability unverified. Furthermore, fine-tuning the 14B LLM requires substantial computational resources (8x A800 GPUs for 40 hours).

## Why read this

Read this paper if you build keyword spotting or wake-up word systems and want to see how to formulate LLM text generation as a reinforcement learning problem driven by ASR and WUW decision-boundary rewards. It provides a blueprint for replacing static data augmentation rules with co-evolving adversarial semantic generators.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Voice assistants, smart speakers, wearable devices, automotive infotainment systems, and always-on IoT speech interfaces.

## Related

- (link related pages by id as the wiki grows)
