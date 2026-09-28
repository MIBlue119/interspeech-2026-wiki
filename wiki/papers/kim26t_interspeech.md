---
id: kim26t_interspeech
category: self-supervised
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3071
pdf: https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.pdf
---

# Fast Speech Foundation Model Distillation Using Interleaved Stacking

[PDF](https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26t_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3071)

**TL;DR** — Interleaved stacking accelerates speech foundation model knowledge distillation by progressively increasing model depth while preserving layer position consistency, achieving competitive performance with reduced training costs.

## Problem

Knowledge distillation reduces inference latency for large speech foundation models, but training efficient student models remains computationally expensive and under-explored. While stagewise training via stacking reduces training costs by starting with shallow models, existing stacking strategies relocate layer positions inconsistently across training stages, which harms downstream task performance because speech foundation models encode strict layer-specific knowledge.

## Method

The paper introduces interleaved stacking for B-stage training, where every b-th layer is copied and inserted directly after its original layer, ensuring that relative layer positions remain constant as depth increases. The student model architecture uses a 12-layer Transformer with 26.87M parameters (distilled from a 94.68M parameter HuBERT base teacher), featuring an output-layer MSE loss combined with fixed intermediate-layer KD losses across all stages. Training is conducted on the 960-hour LibriSpeech corpus using AdamW for 75 epochs under both equal and proportional scheduling strategies.

## Results

Evaluated on the SUPERB benchmark across phoneme recognition (PR), automatic speech recognition (ASR), slot filling (SF), and speaker identification (SID). Interleaved stacking outperforms existing stacking baselines like gradual stacking and MIDAS by large margins on all tasks under both equal and proportional schedules (e.g., achieving 9.08 PER on PR compared to 11.50 for gradual stacking). Furthermore, interleaved stacking with proportional scheduling achieves wall-clock speedups of approximately 1.16× to 1.24× while matching or exceeding the downstream performance of fully trained student baselines that lack stacking acceleration.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers deploying lightweight speech foundation models for on-device or resource-constrained speech processing applications such as ASR, spoken language understanding, and speaker identification.

## Related

- (link related pages by id as the wiki grows)
