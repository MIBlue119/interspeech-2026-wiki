---
id: kostenok26_interspeech
category: resources-evaluation
institutions: ["EPFL", "Logitech"]
code: https://github.com/KostenokLisa/calibration-reasoning-framework
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2362
pdf: https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.pdf
---

# Calibration-Reasoning Framework for Descriptive Speech Quality Assessment

*Elizaveta Kostenok, Mathieu Salzmann, Milos Cernak*

[PDF](https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kostenok26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2362)

**Category:** `resources-evaluation`

**TL;DR** — A two-stage post-training framework combining a calibration phase with dimension-specific reinforcement learning (GRPO) enables Audio Large Language Models to accurately assess, describe, and temporally localize speech quality issues, achieving a state-of-the-art mean PCC of 0.71 and a 13% improvement in MOS prediction.

## Key contributions

- A two-stage training curriculum (Calibration followed by Reasoning) that prevents the dimension-score degradation typically caused by standard long-form generation fine-tuning.
- Unfreezing and end-to-end training of the audio encoder during calibration, demonstrating a massive 0.12 average PCC boost compared to keeping encoders frozen.
- A dimension-wise reward mechanism for Group Relative Policy Optimization (GRPO) using either an LLM-judge or parsed accuracy plus semantic similarity.
- Superior temporal localization (Intersection over Union) and artifact classification for noise, distortion, and unnatural pauses compared to prior SFT and unified-reward RL methods.

## Problem

Traditional speech quality assessment models predict scalar Mean Opinion Scores (MOS) as black boxes without explainability, while prior explainable audio LLM systems prioritize conversational fluency over diagnostic precision. Because quality assessment is missing from base pre-training mixtures, these models produce hallucinated dimension predictions, ungrounded reasoning, and degraded MOS accuracy. Existing multi-stage pipelines (like QualiSpeech-FT) suffer from catastrophic forgetting of numerical dimension scores during the second text-generation stage due to insufficient reasoning capacity or poorly structured reward functions.

## Method

The framework builds on Audio Flamingo 3 (7-8B parameter range) and executes in two distinct stages. The first stage is Calibration via Supervised Fine-Tuning (SFT), where the audio encoder is unfrozen (trained end-to-end) and the model is optimized using Cross-Entropy loss to predict explicit perceptual scales [1, 5] across seven dimensions (naturalness, noise, distortion, listening effort, continuity, speed, and MOS).

The second stage is Reasoning via Group Relative Policy Optimization (GRPO). For a given audio input, the policy model samples a group of G=4 candidate responses. GRPO maximizes the probability of outputs yielding higher rewards while regularizing updates via Kullback-Leibler (KL) divergence against a frozen reference model to prevent reward hacking. Two alternative dimension-specific reward strategies are explored: an LLM-judge (using Qwen3) that evaluates dimension-wise generations, and an Accuracy + Semantic Similarity reward where numerical scores are evaluated exactly and text descriptions are scored using sentence transformer embeddings (all-MiniLM-L6-v2) mapped to [0,1].

Training uses LoRA with rank 64. Calibration uses a batch size of 8 for 10k iterations at a 1.5e-5 learning rate, SFT reasoning uses a batch size of 8 for 10k iterations at 1.5e-5, and GRPO uses a group size of 4, batch size of 4, for 200 iterations at a 5e-6 learning rate on two NVIDIA L40S GPUs.

## Experimental setup

Evaluated on the QualiSpeech corpus consisting of 12,450 speech recordings (85% train, 15% test split) featuring scores across seven perceptual dimensions and temporal intervals/descriptions for noise, distortion, and unnatural pauses. Baselines include QualiSpeech-FT-SALMONN, QualiSpeech-FT (using Audio Flamingo 3 backbone), and SQ-LLM. Metrics include Pearson Correlation Coefficient (PCC) for dimension scores and MOS, F1 and Intersection over Union (IoU) for artifact localization, and ROUGE-L with GPT-4o correlation for long-form text descriptions.

## Results

The proposed LLM-judge dimension-wise GRPO method achieves a new state-of-the-art mean PCC of 0.71 across dimensions and a MOS PCC of 0.76, outperforming the QualiSpeech-FT baseline (0.60 mean PCC, 0.64 MOS PCC) and SQ-LLM (0.63 mean PCC, 0.68 MOS PCC). The alternative Accuracy + Semantic Similarity reward achieves a 0.68 mean PCC and 0.72 MOS PCC.

Ablation studies reveal that unfreezing the audio encoder is vital, driving a 0.12 jump in average PCC compared to a frozen encoder. Single-stage reasoning-only models crash by up to 0.20 PCC in dimension prediction, while calibration-only models achieve high numerical scores (0.66 average PCC) but are structurally incapable of generating long-form natural language justifications and collapse on text metrics (ROUGE-L 0.12).

| Systems/Conditions | Mean PCC | MOS PCC | Noise F1 | Distortion IoU | Long-form Corr. |
|---|---|---|---|---|---|
| QualiSpeech-FT-SALMONN | 0.57 | 0.63 | 0.44 | 0.78 | 0.75 |
| QualiSpeech-FT (AF3) | 0.60 | 0.64 | 0.56 | 0.81 | 0.78 |
| SQ-LLM | 0.63 | 0.68 | 0.72 | 0.74 | 0.82 |
| Ours (Acc. + Sem. dim.-wise) | 0.68 | 0.72 | 0.77 | 0.80 | 0.80 |
| Ours (LLM-judge dim.-wise) | 0.71 | 0.76 | 0.77 | 0.84 | 0.83 |

## Limitations

Unfreezing the audio encoder during calibration introduces substantial computational overhead relative to frozen encoder baselines. The fine-grained reward design is strictly bound to the predefined artifact taxonomy of the QualiSpeech benchmark, meaning performance may degrade on out-of-distribution artifacts such as ultra-low bitrate codec degradation.

## Why read this

Speech and ML engineers building explainable audio evaluation models should read this to see how dimension-specific RL rewards solve the catastrophic forgetting of numerical scores during text-generation fine-tuning.

## Code

- https://github.com/KostenokLisa/calibration-reasoning-framework

## Applications

Automated diagnostic evaluation of speech generation systems, telephony quality monitoring, and fine-grained acoustic artifact detection for synthetic speech verification.

## Institutions / 機構

EPFL, Logitech

## Related

- [URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment](wang26aa_interspeech.md) — same problem · relatedness 2.6/3
- [CAL-MOS: Bridging Layers with Adapters for Robust MOS Prediction Across Speech Foundation Models](ferreira26_interspeech.md) — same problem · relatedness 2.5/3
- [A Fine-Grained Acoustically-Aware Pre-training Encoder for Speech Quality Assessment](sultana26_interspeech.md) — same problem · relatedness 2.5/3
- [DNSMOS-C: Improving End-to-end Speech Quality Models via Contrastive Learning](liang26_interspeech.md) — same problem · relatedness 2.4/3
- [PrefSQA: Pairwise Preference Prediction for Speech Quality Assessment and the Critical Role of High Quality Datasets](fan26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
