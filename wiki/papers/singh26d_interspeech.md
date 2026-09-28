---
id: singh26d_interspeech
category: spoken-language-understanding
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3349
pdf: https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.pdf
---

# Selective Capability Unlearning in End-to-End Spoken Language Understanding

*Akanksha Singh, Vinod Kumar Kurmi*

[PDF](https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/singh26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3349)

**TL;DR** — The paper introduces Binding Subspace Unlearning (BSU), a representation-level machine unlearning framework for end-to-end spoken language understanding that eliminates intent-conditioned slot generation without retraining from scratch. BSU achieves an average reduction of ~60% in BRR@10 and ~56% in semantic similarity on forgotten intents while preserving performance on retained intents.

## Key contributions

- Identifies and formalizes capability persistence, showing that standard marginal intent suppression fails because autoregressive models retain conditional intent-slot mappings that allow slot reconstruction under forced intent prefixes.
- Proposes Binding Subspace Unlearning (BSU), a two-stage method that identifies intent-slot binding directions via covariance contrast and attenuates them using subspace-guided gradient regularization.
- Introduces a recoverability-based evaluation protocol employing Beam Retrieval Rate (BRR@10) and semantic similarity to measure residual conditional behavior beyond simple intent accuracy.
- Demonstrates robust unlearning performance across two different speech encoders (supervised ASR vs. self-supervised learning) and two benchmarks (SLURP and SpeechMassive) without inference-time overhead.

## Problem

Modern end-to-end spoken language understanding (SLU) systems map speech directly to structured semantic intent-slot tokens autoregressively. When specific functionalities must be removed due to compliance, privacy, or safety rules, retraining from scratch is prohibitively expensive. Prior unlearning methods borrow classification-based approaches that only suppress the marginal probability of a target intent, leaving the conditional mapping intact. Consequently, if an external user supplies the forbidden intent as a decoding prefix, the model easily reconstructs the original slot values. This structural flaw, termed capability persistence, necessitates a representation-level unlearning mechanism that severs the conditional dependency between acoustic/intent features and target slot values.

## Method

BSU operates in two distinct stages: Binding Subspace Identification and Subspace-Guided Capability Attenuation. In Stage I, the model extracts decoder hidden states at slot positions using teacher-forced decoding over forget and retain sets. It computes layer-wise empirical covariance matrices for both splits and obtains a contrast matrix by subtracting retain covariance from forget covariance ($M^{(\ell)} = \text{Cov}(D_F^{\ell}) - \text{Cov}(D_R^{\ell})$). The top positive eigenvectors of this contrast matrix define a low-dimensional binding subspace ($U^{(\ell)} \in \mathbb{R}^{d \times k}$) capturing representation directions enriched under the target intent $I_F$.

In Stage II, the model undergoes fine-tuning using a multi-term objective designed to suppress the target capability while maintaining overall competence. The objective function combines four terms: gradient ascent on the forget set negative log-likelihood ($L_F$), standard gradient descent on the retain set ($L_R$), a retain-set KL divergence regularizer ($L_{\text{kl}}$) to prevent drift from original parameters $\theta_0$, and a binding loss ($L_{\text{bind}}$). The binding loss computes the gradient of the teacher-forced conditional log-likelihood with respect to hidden states at slot positions, projects these gradients onto the binding subspace $U^{(\ell)}$, and penalizes their squared magnitude to minimize model sensitivity along those directions.

The training hyperparameter choices include retain weight $\lambda_{\text{ret}} = 1.0$, KL weight $\lambda_{\text{kl}} = 0.1$, and binding weight $\lambda_{\text{bind}} = 0.5$. Inference occurs via standard autoregressive decoding without modifications or added runtime overhead.

## Experimental setup

The paper evaluates BSU on the SLURP benchmark and the French subset of SpeechMassive. Two model variants are tested sharing a Conformer acoustic encoder and a Transformer semantic decoder, differing only in encoder initialization: supervised ASR (Conformer-Transformer-Large, NeMo ASR-Set 3.0) and self-supervised learning (SSL). Evaluation metrics include intent accuracy ($I_F$), slot macro-F1 ($F_1^F$), Beam Retrieval Rate at beam size 10 (BRR@10), and embedding-based semantic similarity. Baselines adapted for comparison include Gradient Ascent (GA), GA+GD, GA+KL, Negative Preference Optimization (NPO), NPO+KL, and Random Label (RL), alongside a random subspace ablation (RS) and a full retraining baseline.

## Results

On SLURP with the ASR-initialized NeMo Conformer-Transformer, BSU drops the forget-set BRR@10 from 92.64 (original model) down to 22.10, and semantic similarity from 90.14 down to 24.80, closely approaching the full retraining baseline (18.59 and 23.53 respectively). Simultaneously, BSU preserves performance on the retain set, maintaining an intent accuracy of 87.90% and slot F1 of 83.62% (compared to 89.75% and 80.11% in the original model). Under SSL initialization, BSU achieves comparable suppression, reducing BRR@10 on the forget set from 84.42 to 16.30 while keeping retain-set intent accuracy at 87.40%. Ablations confirm that random subspace perturbations (RS) fail to systematically disrupt capability, yielding a high forget BRR@10 of 87.01.

| System / Condition | Target Intent Acc ($I_F \downarrow$) | Forget Slot F1 ($F_1^F \downarrow$) | Forget BRR@10 ($\downarrow$) | Retain Intent Acc ($I_F \$) |
| :--- | :--- | :--- | :--- | :--- |
| Original Model | 95.27 | 91.08 | 92.64 | 89.75 |
| Retrain (Upper Bound) | 14.04 | 20.13 | 18.59 | 90.14 |
| GA (Gradient Ascent) | 21.36 | 31.78 | 91.14 | 54.15 |
| NPO | 54.85 | 52.73 | 87.62 | 84.05 |
| RS (Random Space Ablation) | 62.70 | 71.59 | 87.01 | 82.53 |
| BSU (Ours) | 28.40 | 16.22 | 22.10 | 87.90 |

## Limitations

The method is evaluated strictly on text-based semantic outputs derived from autoregressive sequence-to-sequence SLU architectures, leaving direct end-for-end speech-to-intent classification models without explicit decoders unexplored. The study focuses on removing single target intents rather than multiple interacting capabilities simultaneously. Furthermore, evaluation is restricted to English (SLURP) and French (SpeechMassive), leaving low-resource or highly tonal languages untested.

## Why read this

Speech and ML researchers working on model safety, regulatory compliance, and machine unlearning will find this paper essential for understanding why text/intent-level unlearning is insufficient for generative speech models. It provides a clean, representation-level intervention framework that successfully eliminates conditional generation persistence without costly retraining.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Post-deployment safety filtering, regulatory compliance for voice assistants (e.g., removing financial or health domain capabilities), and privacy-preserving spoken language understanding.

## Related

- (link related pages by id as the wiki grows)
