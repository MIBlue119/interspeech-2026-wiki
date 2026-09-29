---
id: ren26g_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1915
pdf: https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.pdf
---

# Unified Gradient Projection: Language-Balanced Continual Learning for Multilingual Low-Resource ASR

*Ziang Ren, Guodong Lin, Yuchen Ai, Kaize Tan, Wei-Qiang Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ren26g_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1915)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — Unified Gradient Projection (UGP) is a continual learning framework for multilingual ASR that combines language-balanced gradient regulation with experience replay, achieving near-zero average forgetting (0.04% FWER) on Whisper-large-v3.

## Key contributions

- Language-balanced gradient regulation strategy that uses a holistic reference gradient to prevent dominant languages from biasing the optimization geometry.
- Unified Gradient Projection (UGP) framework integrating gradient-level interference projection with data-level experience replay for optimal stability-plasticity trade-off.
- Comprehensive cross-scale evaluation from Whisper-small (244M) up to Whisper-large-v3 (1550M) demonstrating near-zero forgetting on large-scale models.
- Rigorous data-scaling analysis demonstrating structural stability and robust performance even under extreme data scarcity down to 5 hours per language.

## Problem

Sequential multilingual fine-tuning of large ASR foundation models (such as Whisper) to support low-resource languages introduces the plasticity-stability dilemma, causing severe catastrophic forgetting where representations essential to prior languages are overwritten. Existing continual learning methods either fail to control cross-task interference or suffer from dominant-language bias in multilingual settings where training data and replay buffers are inherently imbalanced. This prevents scaling truly universal speech recognition systems that can adapt to new low-resource languages without degrading performance on previously acquired ones.

## Method

UGP operates via a foundational fine-tuning setup where the encoder is frozen for medium and large-scale models (Whisper-medium and large-v3) to preserve pretrained feature extraction, while full-parameter fine-tuning is used for Whisper-small. For gradient-level regulation, UGP constructs a language-balanced reference gradient by uniformly sampling $n=4$ utterances per language from historical language replay pools capped at 2,000 utterances each. At each training step, the inner product between the current gradient $g_{cur}$ and the balanced reference gradient $g_{ref}$ is computed; if an obtuse angle (conflict) is detected, $g_{cur}$ is projected onto the orthogonal complement of $g_{ref}$.

At the data level, UGP integrates experience replay by mixing current target data with uniformly sampled historical data from a replay buffer containing 2,000 total utterances, optimizing a combined loss objective with mixing weight $\lambda=1$. This two-level design shapes the optimization landscape through data rehearsal while governing the trajectory via gradient projection. Together, these mechanisms orthogonalize conflicting updates, mitigate inter-language interference, encourage positive cross-lingual transfer, and avoid diluting gradients or requiring additional memory overhead.

## Experimental setup

Evaluated primarily on the FLEURS dataset (core set: Malay 10.47h, Indonesian 10.24h, Filipino 9.68h, Javanese 11.33h, Maori 20.48h; previous languages: Thai 2h, Vietnamese 2h, English 2h, French 2h) and an extended CommonVoice/FLEURS dataset for data-scaling (50h, 30h, 10h, and 5h per language using Swahili, Persian, and Arabic as targets and English, French, Russian as past languages). Compared against Vanilla Whisper, Vanilla FT, Standard Experience Replay (ER), and Standard A-GEM across Whisper-small (244M), medium (769M), and large-v3 (1550M) models trained on NVIDIA A40 GPUs using the AdamW optimizer with early stopping.

## Results

On Whisper-large-v3, UGP achieves a target WER (TWER) of 12.91%, retention WER (RWER) of 6.68%, overall average WER (AWER) of 9.80%, and a near-zero forgetting WER (FWER) of 0.04%, drastically outperforming standard Full Fine-Tuning (FWER of 8.98% and RWER of 15.63%) and Standard A-GEM (TWER of 22.20%). On Whisper-small, UGP yields superior stability-plasticity balance, reducing FWER down to 11.94% compared to 57.14% for A-GEM and 54.42% for Full FT. In data-scaling evaluations down to 5 hours of target data, UGP consistently maintains robust AWER and the lowest forgetting rates compared to all baselines.

| System/Condition | TWER (%) | RWER (%) | AWER (%) | FWER (%) |
| --- | --- | --- | --- | --- |
| Vanilla Whisper (Large-v3) | 26.75 | 6.65 | 16.70 | – |
| Full FT (Large-v3) | 11.40 | 15.63 | 13.51 | 8.98 |
| Standard ER (Large-v3) | 12.86 | 10.75 | 11.81 | 4.11 |
| Standard A-GEM (Large-v3) | 22.20 | 16.43 | 19.32 | 9.78 |
| UGP (Ours, Large-v3) | 12.91 | 6.68 | 9.80 | 0.04 |

## Limitations

The evaluation is constrained to specific multilingual groupings (primarily Southeast Asian and selected language families in FLEURS and CommonVoice) and relies on fixed-capacity replay buffers (2,000 utterances). The data-scaling analysis under extreme scarcity (down to 5 hours) was restricted to Whisper-small due to computational resource limits. Furthermore, the frozen-encoder strategy used for medium and large models trades off absolute encoder adaptability for stability.

## Why read this

Speech and ML engineers scaling universal multilingual ASR models should read this to see how combining language-balanced gradient projection with experience replay solves catastrophic forgetting in large foundation models without sacrificing target-language plasticity.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Universal multilingual automatic speech recognition, on-device or server-side continual adaptation for low-resource languages, and incremental speech foundation model updates.

## Institutions / 機構

Tsinghua University

## Related

- [Retention-Preserving Gradient Projection with Entropy-Guided Token-Level Distillation for Rehearsal-Free Continual ASR](ma26d_interspeech.md) — same problem · relatedness 2.7/3
- [Continual Adaptation for Pacific Indigenous Speech Recognition](xiao26_interspeech.md) — same problem · relatedness 2.4/3
- [Confidence-Gated Mean-Teacher Consistency Regularization for Low-Resource Multilingual ASR with Shared–Private Fusion-LoRA](liu26h_interspeech.md) — same problem · relatedness 2.2/3
- [GigaAM Multilingual: Foundation Model for Underrepresented Languages](kuzmenko26_interspeech.md) — same problem · relatedness 2.1/3
- [Hybrid Continual Learning for Low-Resource Australian Aboriginal Language Identification](mylvaganam26_interspeech.md) — shared technique · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
