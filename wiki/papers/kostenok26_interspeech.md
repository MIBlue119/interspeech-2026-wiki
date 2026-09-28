---
id: kostenok26_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2362
pdf: https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.pdf
---

# Calibration-Reasoning Framework for Descriptive Speech Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2362)

**TL;DR** — A calibration-reasoning post-training framework for audio large language models improves multidimensional speech quality assessment and artifact localization, achieving a state-of-the-art 0.71 mean PCC on QualiSpeech.

## Problem

Traditional non-intrusive speech quality assessment models output black-box Mean Opinion Scores without providing interpretability or temporal localization of audio defects. While recent Audio Large Language Models aim to deliver explainable assessments, they often prioritize conversational fluency over diagnostic precision and suffer from hallucinations or ungrounded reasoning. Because pre-training mixtures lack descriptive speech quality tasks, these models require targeted alignment methods that strictly enforce dimensional and temporal accuracy.

## Method

The method builds upon the Audio Flamingo 3 model and features a two-stage post-training pipeline combining supervised calibration and reinforcement learning. The calibration stage unfreezes the audio encoder and fine-tunes the network using cross-entropy loss to predict multidimensional quality scores on a 1-to-5 scale. The reasoning stage employs Group Relative Policy Optimization (GRPO) with fine-grained, dimension-specific reward functions to optimize textual descriptions, scoring accuracy, and temporal localization. Rewards are computed either via structured extraction (comparing exact scores and semantic similarity using sentence transformers) or an external LLM-judge. Training utilizes LoRA (rank 64) across two NVIDIA L40S GPUs.

## Results

Evaluated on the 12,450-sample QualiSpeech dataset, the proposed framework reaches a mean Pearson Correlation Coefficient (PCC) of 0.71 across perceptual dimensions and a MOS PCC of 0.76 using the LLM-judge reward strategy. It outperforms baseline models such as QualiSpeech-FT and SQ-LLM, delivering a 13% improvement in MOS prediction. Ablation studies demonstrate that unfreezing the audio encoder provides a substantial 0.12 gain in average PCC, significantly outperforming mere language model scaling.

## Code

- https://github.com/KostenokLisa/calibration-reasoning-framework

## Applications

Speech and ML engineers building explainable, diagnostic speech quality assessment tools, automated telephony monitoring systems, or enhancement algorithm evaluators that require temporal localization of artifacts.

## Limitations

Predictions for speech speed are intentionally excluded from evaluation due to highly imbalanced data in the benchmark corpus.

## Related

- (link related pages by id as the wiki grows)
