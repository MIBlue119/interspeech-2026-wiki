---
id: wang26k_interspeech
category: deepfake-security
labels: [self-supervised, robustness-noise]
institutions: ["National Institute of Informatics"]
code: https://github.com/nii-yamagishilab/AntiDeepfake
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-589
pdf: https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.pdf
---

# Does Fine-tuning by Reinforcement Learning Improve Generalization in Binary Speech Deepfake Detection?

*Xin Wang, Wanying Ge, Junichi Yamagishi*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26k_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-589)

**Category:** `deepfake-security` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper investigates applying Group Relative Policy Optimization (GRPO) instead of Supervised Fine-Tuning (SFT) to post-trained speech foundation models for binary deepfake detection, achieving better out-of-domain generalization while preserving in-domain performance.

## Key contributions

- Demonstrated that pure GRPO fine-tuning on SSL-based post-trained speech deepfake detectors improves or maintains out-of-domain generalization without hurting target-domain accuracy.
- Showed that SFT followed by GRPO (hybrid training) underperforms compared to pure GRPO-only fine-tuning.
- Identified via ablation studies that the negative reward component within GRPO's group-normalized advantage calculation is crucial for generalization improvements.
- Provided Wasserstein-distance data drift analyses showing that GRPO prevents test distribution drift on out-of-domain evaluation sets compared to SFT.

## Problem

Speech deepfake detectors built via supervised fine-tuning (SFT) on foundation models suffer from catastrophic forgetting, severely degrading on out-of-domain (OOD) test sets despite performing well in-domain. While large language models successfully leverage reinforcement learning (like GRPO) to align models and preserve pre-trained knowledge, speech detection has remained locked into SFT-only paradigms. This limits real-world deployability where acoustic conditions and deepfake generation algorithms are constantly evolving and unseen during training.

## Method

The detection architecture combines a multi-lingual self-supervised learning (SSL) front-end (XLS-R-2B, MMS-1B, or MMS-300M) whose final-layer features are pooled via global average pooling, followed by a linear binary classifier outputting FAKE/REAL probabilities. The paper investigates fine-tuning this post-trained parameter set Θ using reinforcement learning via Group Relative Policy Optimization (GRPO). Unlike sequence-level LLM outputs, the detector outputs a single binary label, and the reward function is defined as a simple indicator function r(y_tilde, y) = delta(y_tilde == y). GRPO samples a group of G=64 outputs for each input, computes group-normalized advantages utilizing both positive and negative rewards, and avoids full RLHF overhead by utilizing simplified GRPO (GRPOs) where clipping and separate old-policy snapshots can be bypassed.

The training recipe uses a maximum of 10 epochs with validation early-stopping every 20k steps on the Deepfake-Eval-2024 (DFE24) training partition (~50 hours). For regularization, a Kullback-Leibler divergence penalty term with weight beta = 0.04 measures the distance against a frozen reference model (the post-trained checkpoint). Variants are tested by altering beta (beta=0 for no regularization, beta=1 for heavy regularization) and removing negative rewards to isolate the source of performance gains.

## Experimental setup

Experiments use the DFE24 training set (~50 hours) for fine-tuning, and evaluate on DFE24 validation partitions (segmented into lengths of 4s, 10s, 13s, 30s, and 50s) as in-domain sets, plus ADD23, FoR, DV, and ItW datasets as out-of-domain test sets using Equal Error Rate (EER) as the primary metric. The base models evaluated include XLS-R-2B, MMS-1B, and MMS-300M pre- and post-trained via the AntiDeepfake project. Training is executed on an H100 GPU (and TSUBAME4.0 supercomputer), running each experiment across three random rounds and averaging the resulting EERs.

## Results

Pure GRPO on the post-trained XLS-R-2B model achieves a 9.93% average in-domain EER (comparable to SFT's 10.26%), but drastically outperforms SFT on out-of-domain test sets, dropping EER on the In-the-Wild (ItW) set from 6.35% (SFT) down to 2.19% (GRPO). SFT-then-GRPO hybrid fine-tuning fails to beat pure GRPO, yielding higher OOD EERs such as 5.89% on ItW and 7.04% on DV. Ablations indicate that removing negative rewards degrades performance across all datasets, while setting the KL-penalty weight too high (beta=1.0) causes severe underfitting, raising in-domain EER to 15.83%. GRPO fails to yield these generalization benefits if applied directly to raw pre-trained models without intermediate post-training.

| System / Condition | DFE24 (4s) | DFE24 (ave.) | ADD23 | FoR | DV | ItW (ave.) |
|---|---|---|---|---|---|---|
| Post-trained only (XLS-R-2B) | 27.73 | 22.64 | 4.67 | 2.61 | 2.23 | 2.69 |
| SFT-only (XLS-R-2B) | 12.17 | 10.26 | 6.09 | 3.92 | 8.75 | 6.35 |
| GRPO-only (XLS-R-2B, beta=0.04) | 11.06 | 9.93 | 5.34 | 0.47 | 2.76 | 2.69 |
| SFT -> GRPO (XLS-R-2B) | 11.53 | 9.81 | 5.78 | 2.75 | 7.04 | 5.37 |
| GRPO w/o negative reward | 13.30 | 11.41 | 6.69 | 0.83 | 3.09 | 3.44 |
| GRPO (beta = 1.0) | 19.37 | 15.83 | 4.02 | 1.34 | 1.66 | 2.04 |

## Limitations

The study is restricted to binary classification architectures using fixed-dimensional global average pooling over SSL front-ends, omitting sequence-to-sequence frame-level localization tasks. The fine-tuning target domain is limited to DFE24 (~50 hours), and broader languages or specialized vocoding spoofing types beyond the tested datasets remain unverified. Additionally, computing multiple rollouts per sample (G=64) increases training time relative to standard supervised cross-entropy optimization.

## Why read this

Speech and ML engineers building robust speech deepfake detectors should read this to learn how to transition from standard supervised fine-tuning to reinforcement learning (GRPO) to mitigate catastrophic forgetting and dramatically improve out-of-domain generalization.

## Code

- https://github.com/nii-yamagishilab/AntiDeepfake

## Applications

Robust speech anti-spoofing systems, telephony fraud detection pipelines, and automated media verification tools operating across diverse, unseen acoustic environments.

## Institutions / 機構

National Institute of Informatics

**Funding / 經費:** Japan Science and Technology Agency, New Energy and Industrial Technology Development Organization

## Related

- [Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection](pan26_interspeech.md) — same problem · relatedness 2.8/3
- [Towards Robust Speech Deepfake Detection via Human-Inspired Reasoning](dvirniak26_interspeech.md) — same problem · relatedness 2.7/3
- [Domain-Adaptive Dual-Gating Mixture of Experts for Generalizable Speech Deepfake Detection](qin26b_interspeech.md) — same problem · relatedness 2.6/3
- [ADD-DINO: A Two-Stage Self-Distillation Framework for Audio Deepfake Detection](sun26g_interspeech.md) — same problem · relatedness 2.5/3
- [Mixture of Spectral Experts for Audio Deepfake Detection](qiu26_interspeech.md) — same problem · relatedness 2.4/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
