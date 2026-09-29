---
id: dey26_interspeech
category: speaker
labels: [multilingual, robustness-noise]
institutions: ["Samsung"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3091
pdf: https://www.isca-archive.org/interspeech_2026/dey26_interspeech.pdf
---

# Improving Adversarial Robustness in Spoken Language Identification through Self-Defensive Distillation

*Spandan Dey*

[PDF](https://www.isca-archive.org/interspeech_2026/dey26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dey26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3091)

**Category:** `speaker` · **Labels:** `multilingual`, `robustness-noise`

**TL;DR** — This paper investigates adversarial vulnerability in spoken language identification (LID) and introduces Self-Defensive Adversarial Re-Training (SDART), a novel proactive defense combining adversarial sample mining, entropy-regularized online label smoothing, and language-specific consistency regularization. SDART consistently outperforms standard adversarial training and classical baselines across architectures and datasets on both clean and attacked speech.

## Key contributions

- Evaluates state-of-the-art standalone LID architectures (ECAPA-TDNN and Conformer) against white-box gradient-based adversarial attacks (FGSM and PGD) across varying perturbation steps and sizes.
- Proposes SDART, an adversarial robustness framework integrating progressive adversarial sample mining, teacher-free defensive distillation, and linguistic consistency regularization.
- Introduces epoch-wise, language-specific soft labels derived via dynamic online label smoothing (OLS) weighted by inverse prediction score entropy.
- Demonstrates superior performance across multiple databases (VoxLingua107 and Common Voice) under both white-box and transferable black-box attack scenarios.

## Problem

While adversarial attacks have been extensively explored for security-critical speech applications like automatic speaker verification (ASV) and automatic speech recognition (ASR), spoken language identification (LID) has remained largely unstudied despite serving as a crucial multilingual front-end. Adversaries can exploit this gap by introducing imperceptible perturbations to alter language predictions, causing catastrophic failures in downstream multilingual speech backends. Standard classifiers fail because borderline samples near decision boundaries are easily pushed across via minimal gradient perturbations, producing low-confidence, high-entropy outputs.

## Method

The paper builds upon adversarial re-training (ART) using a min-max objective, progressively expanding perturbations via Projected Gradient Descent (PGD) with a uniformly distributed random perturbation size sampled from [0.010, 0.035]. The framework incorporates adversarial sample mining (ASM), where the fraction of adversarial samples injected into training batches scales dynamically per epoch t as γ^t = max(1, 0.1 + 0.05 * t).

To replace traditional rigid logit-pairing, the method introduces dynamic online label smoothing (OLS) utilizing a teacher-free knowledge distillation approach. A logit matrix S^t in R^{L	imes L} (for L languages) is populated per epoch using only correctly predicted genuine samples, weighted by the inverse of their prediction score entropy to discount borderline high-entropy samples. The supervised loss combines hard labels (weighted by α^t) and soft epoch-level labels, where α^t dynamically increases from an initial value of 0.01 (α^{≤2}) by a step factor β = 0.05 up to a baseline of 0.7. This setup stabilizes training convergence while enforcing linguistic consistency that captures inter-language dynamics.

## Experimental setup

Experiments use the VoxLingua-10 dataset (top 10 most spoken languages from VoxLingua107) and the Common Voice corpus, split 80:10:10 for session-disjoint train, validation, and evaluation. Audio is processed into 3-second segments of 80-dimensional log Mel-spectrograms with channel mean normalization after VAD filtering. Models (ECAPA-TDNN and Conformer) are trained for 50 epochs using the Adam optimizer with a batch size of 64 and a learning rate of 0.0001. Baselines include standard training, basic ART, TRADES, defensive distillation (DD), and MART. Evaluation metrics are Equal Error Rate (EER in %) and C_avg (*100).

## Results

On the VoxLingua-10 ECAPA-TDNN baseline under PGD attack (step size 0.03), the clean EER of 3.79% degrades to 10.09% (C_avg 11.15%). Implementing the full SDART framework achieves a genuine EER of 2.80% and reduces PGD-attacked EER to 3.54% (C_avg 4.07%), outperforming TRADES (5.63% EER), defensive distillation (9.85% EER), and MART (12.66% EER). On the Common Voice corpus using ECAPA-TDNN, SDART achieves a PGD-attacked EER of 7.57% compared to the baseline's 20.70%. In black-box transferability tests where attacks are transferred from a Conformer model to ECAPA-TDNN, SDART substantially suppresses degradation compared to the vulnerable baseline.

| System | Genuine EER (%) | FGSM EER (%) | PGD EER (%) |
|---|---|---|---|
| Baseline | 4.10 | 15.11 | 9.35 |
| Basic ART | 3.92 | 9.95 | 9.05 |
| TRADES [27] | 3.54 | 3.91 | 5.63 |
| Defensive-Distillation [23] | 3.80 | 11.69 | 9.85 |
| SDART (Proposed) | 2.80 | 3.67 | 3.54 |

## Limitations

The evaluation is restricted to the top 10 most widely spoken languages, leaving low-resource dialects and highly overlapping language pairs unexplored. The study focuses primarily on white-box and transfer-based black-box PGD and FGSM attacks, omitting broader evaluations against audio-specific physical over-the-air or psychoacoustically masked perturbations. Additionally, compute overhead is increased due to iterative online adversarial sample mining and multi-step distillation matrix updates.

## Why read this

Researchers building secure multilingual speech systems or robust front-end classifiers will find a principled, teacher-free distillation recipe that avoids the computational burden of auxiliary teacher models. It provides concrete empirical evidence on how entropy-weighted soft-label smoothing stabilizes adversarial training for sequence and classification tasks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust multilingual speech processing pipelines, secure voice-activated assistants, and multi-tenant audio moderation platforms vulnerable to malicious spoofing or adversarial evasion.

## Institutions / 機構

Samsung

## Related

- [Robust Language Identification Using Semi-positive Contrastive Learning](sharma26_interspeech.md) — same problem · relatedness 2.2/3
- [Unsupervised Speech in the Wild Challenge: Learning Robust Multilingual Representations](gomez26_interspeech.md) — same problem · relatedness 1.9/3
- [A Two-Stage Defence for Robust Federated Speech Emotion Recognition](chang26b_interspeech.md) — shared technique · relatedness 1.9/3
- [ML-KD-DRI-GAN: Teacher-Guided Denoising and Triplet-Adversarial Training for Robust Spoken Language Understanding](kumar26b_interspeech.md) — shared technique · relatedness 1.9/3
- [DASH: Dual-View Self-Distillation with Multi-Layer Hidden Representations for Robust Speech Recognition](baik26_interspeech.md) — shared technique · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
