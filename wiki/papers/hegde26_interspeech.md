---
id: hegde26_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2052
pdf: https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.pdf
---

# Aligning Audio Captions with Human Preferences

[PDF](https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hegde26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2052)

**TL;DR** — This paper proposes a Reinforcement Learning from Human Feedback (RLHF) framework for audio captioning using a custom CLAP-based reward model, achieving a 59.14% win rate over baseline models on challenging audio clips.

## Problem

Current audio captioning systems rely heavily on supervised learning and static evaluation metrics like BLEU or CIDEr, which correlate poorly with human judgments of semantic correctness and naturalness. Collecting ground-truth caption pairs is expensive and resource-intensive, whereas human preferences are easier to gather but underexplored for optimization. This leaves audio captioning models prone to generating inaccurate or unnatural descriptions, particularly for ambiguous acoustic scenes.

## Method

The authors introduce a reward model using LAION CLAP audio and text encoders to map 512-dimensional representations into a Siamese neural network architecture with hidden sizes of 512 and 128, trained via the Bradley-Terry loss on human-labeled pairwise preference data. This reward model is integrated into a reinforcement learning framework using Self-Critical Sequence Training (SCST) with REINFORCE, removing the need for ground-truth text during fine-tuning. To combat reward hacking, a reward shaping length penalty is incorporated to penalize excessively long generated captions. The baseline captioning architecture consists of a CNN10 PANN encoder and a Transformer decoder with ~15M parameters.

## Results

Evaluated on AudioCapsEval, ClothoEval, and a proprietary dataset of 4,424 preference samples, the RLHF framework is compared against a supervised baseline using human assessments and automated metrics. On challenging AudioCaps test splits where the baseline frequently fails, the proposed RLHF method achieves a human preference win rate of 59.14% compared to the baseline's 40.86%. Furthermore, the custom reward model achieves the lowest weighted deviation from human preferences (4.19) compared to S-BERT (4.35), FENSE (11.78), and CLAPAT (5.55). Scaling up the preference training data from 1,178 to 2,422 samples increases the RLHF human win rate from 43.55% to 47.97%.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and machine learning engineers developing resource-constrained, automated audio captioning systems for smart devices, surveillance, or content indexing.

## Limitations

The framework's performance is bottlenecked by the domain coverage and volume of available human preference training data.

## Related

- (link related pages by id as the wiki grows)
