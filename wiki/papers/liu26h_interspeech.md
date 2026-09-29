---
id: liu26h_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["Xinjiang University", "Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1183
pdf: https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.pdf
---

# Confidence-Gated Mean-Teacher Consistency Regularization for Low-Resource Multilingual ASR with Shared–Private Fusion-LoRA

*Jie Liu, Liang He, Longwei Li, Qingyuan Ma, Xuejian Zhao*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1183)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — A parameter-efficient Whisper framework combining shared-private LoRA decoupling with confidence-gated mean-teacher consistency regularization reduces macro WER by 35.4% over standard LoRA on Kathbath. Notably, the small-scale model outperforms a Whisper-medium+LoRA baseline.

## Key contributions

- Proposed SPF-LoRA, which explicitly splits adaptation into a cross-lingually shared branch and language-private branches managed by a learnable gating coefficient.
- Integrated a Mean-Teacher consistency regularization (MT-CR) strategy into PEFT using an adapter-only EMA teacher to supply smoother target distributions.
- Introduced a token-level confidence gating mask (with dynamic scheduling) to suppress confirmation bias and prevent noisy consistency signals from degrading low-resource convergence.
- Achieved state-of-the-art low-resource multilingual ASR performance across five diverse Indian languages, outperforming larger model baselines.

## Problem

End-to-end ASR models require extensive transcription data, and low-resource multilingual joint training suffers from negative transfer where high-resource languages dominate shared adaptation capacity and cause gradient conflicts. While auxiliary consistency learning and self-training can leverage scarce annotations, they are highly fragile in low-resource settings because output distributions are unstable and augmentations amplify confirmation bias and error reinforcement. Overcoming this requires architectures that isolate language interference alongside robust, trustworthy teacher supervision signals.

## Method

The framework freezes the Whisper backbone while adapting linear modules via Shared-Private Fusion-LoRA (SPF-LoRA) and training with Mean-Teacher Consistency Regularization (MT-CR).

Architecturally, standard LoRA updates are decoupled into a cross-lingually shared branch (capturing universal representations) and language-specific private branches (capturing language traits). These are combined via an effective weight defined as: W_eff = W_0 + ΔW_shared + β_ℓ ΔW_ℓ, where the fusion weight β_ℓ is parameterized by a language-specific scalar mapped via a sigmoid to (0, 1) to dynamically balance sharing and specialization without manual hyperparameter tuning. SPF-LoRA is injected into q, k, v, o projections and FFN layers (qkvofc) across the last 6 encoder and decoder blocks.

During training, the student model processes an augmented view x^(1) under cross-entropy loss against ground-truth transcripts, while an EMA teacher processes a second augmented view x^(2). The EMA teacher updates exclusively on trainable LoRA parameters and fusion weights with a momentum of m = 0.9995, keeping the frozen backbone intact. To prevent confirmation bias, a token-level confidence gate computes c_t = max_v p_t(v) and masks out consistency updates where c_t is below a threshold τ. A two-stage training protocol is used: Stage A optimizes purely supervised cross-entropy loss for SPF-LoRA, while Stage B enables the EMA teacher, applies a ramp-up schedule to consistency weight λ (reaching 0.5), and schedules threshold τ from 0.6 to 0.8 over 5,000 steps to filter early noise.

## Experimental setup

Evaluated on the Kathbath dataset (subset of IndicSUPERB) covering five Indo-Aryan languages: Gujarati (gu), Hindi (hi), Marathi (mr), Punjabi (pa), and Urdu (ur). Compared against zero-shot Whisper-small, Whisper-small+LoRA, Whisper-medium, Whisper-medium+LoRA, and MAS-LoRA baselines. Evaluated using word error rate (WER) and character error rate (CER). Implemented on a single NVIDIA RTX 4090 GPU using Whisper-small as the base architecture, trained for 5 epochs with an effective batch size of 16 (batch size 8, 2 gradient accumulation steps), learning rate 5×10^-4 with 2,000 warm-up steps, LoRA rank r = 16, α = 32, and dropout 0.05.

## Results

Whisper-small+SPF-LoRA+MT-CR achieves a macro-average WER of 19.85%, outperforming the Whisper-small+LoRA baseline (30.73%) by 10.88 absolute percentage points and even surpassing the larger Whisper-medium+LoRA baseline (22.46%). On Gujarati, the most challenging low-resource language, WER drops dramatically from 38.86% (SPF-LoRA without MT-CR) down to 25.04%. Structural ablations confirm that SPF-LoRA outperforms shared-only (23.72% macro avg, but 43.34% worst-lang) and private-only (41.90% macro avg) configurations. MT-CR ablations demonstrate that token-level confidence gating is essential, dropping macro WER from 22.14% (un-gated MT-CR) to 19.85%.

| Method | Gujarati | Hindi | Marathi | Punjabi | Urdu | Macro Avg |
|---|---|---|---|---|---|---|
| Whisper-small | 113.01 | 53.08 | 105.93 | 115.43 | 36.03 | 84.70 |
| Whisper-small+LoRA | 46.28 | 22.88 | 28.06 | 32.29 | 24.14 | 30.73 |
| Whisper-medium+LoRA | 34.95 | 13.35 | 21.71 | 19.52 | 22.81 | 22.46 |
| MAS-LoRA | 40.22 | 28.14 | 26.18 | 32.15 | 20.66 | 29.47 |
| Whisper-small+SPF-LoRA (No MT-CR) | 38.86 | 17.33 | 25.78 | 23.35 | 14.32 | 23.93 |
| Whisper-small+SPF-LoRA+MT-CR (ours) | 25.04 | 15.13 | 24.09 | 20.84 | 14.19 | 19.85 |

## Limitations

The evaluation is restricted to five Indo-Aryan languages from a single benchmark dataset (Kathbath), leaving the cross-lingual scaling behavior across diverse language families (e.g., tonal or non-alphabetic scripts) untested. The parameter-efficient framework relies heavily on the quality of the pretrained Whisper acoustic representations, and compute constraints restricted evaluations to small-scale backbones on a single consumer-grade GPU.

## Why read this

Speech and ML researchers focusing on parameter-efficient transfer learning or low-resource speech recognition should read this paper to see how architectural decoupling (SPF-LoRA) can be effectively paired with confidence-gated consistency regularization (MT-CR) to surpass larger baseline models.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-resource multilingual automatic speech recognition systems, voice-activated applications for regional dialects, and on-device speech transcription infrastructure.

## Institutions / 機構

Xinjiang University, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
