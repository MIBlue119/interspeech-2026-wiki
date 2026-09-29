---
id: baik26_interspeech
category: asr
labels: [self-supervised, robustness-noise]
institutions: ["Sogang University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3232
pdf: https://www.isca-archive.org/interspeech_2026/baik26_interspeech.pdf
---

# DASH: Dual-View Self-Distillation with Multi-Layer Hidden Representations for Robust Speech Recognition

*Jaeeun Baik, Ui-Hyeop Shin, Jiwon Lee, Woocheol Jeong, Hyung-Min Park*

[PDF](https://www.isca-archive.org/interspeech_2026/baik26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baik26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3232)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — DASH is a dual-view self-distillation framework that learns noise-invariant speech representations across multiple intermediate layers using an EMA teacher and prototype KL divergence, eliminating the robustness-clean tradeoff in ASR.

## Key contributions

- A decoupled two-stage training paradigm combining label-free self-distillation pre-training with standard supervised ASR fine-tuning.
- A multi-layer hidden representation distillation strategy that captures both low-level acoustics and high-level semantics.
- A prototype-based KL divergence objective that prevents representational collapse and shortcut learning in continuous feature spaces.
- A step-wise Exponential Moving Average (EMA) teacher update mechanism that provides stable target representations without gradient backpropagation.

## Problem

Supervised noise-augmented fine-tuning commonly suffers from a robustness-clean tradeoff, where improving performance in corrupted environments damages recognition accuracy under clean conditions by overfitting to specific noise patterns. Standard continuous feature distillation methods frequently lead to representational collapse or trivial shortcut learning. DASH addresses this by enforcing clean-noise consistency across paired views without sacrificing clean domain performance.

## Method

DASH utilizes a dual-branch encoder architecture containing a clean teacher network and a noisy student network. The teacher network processes clean unperturbed speech and updates its weights via a step-wise Exponential Moving Average (EMA) with a decay rate of alpha = 0.999, omitting standard backpropagation. The student network processes augmented speech (SpecAugment and additive noise).

To prevent shortcut learning, continuous encoder outputs are projected and quantized into discrete units using k-means clustering with K=512 prototypes over a memory buffer. Frame-prototype similarity scores are converted to probability distributions using a softmax with temperature tau_temp = 3.5. The pre-training objective minimizes the Kullback-Leibler (KL) divergence from the clean prototype distribution to the noisy student distribution.

This distillation is performed simultaneously across multiple intermediate encoder layers (specifically layers 6, 11, and 17 of a 17-layer FastConformer) to jointly capture low-level acoustic properties and high-level semantic structures. Pre-training runs for 5,000 steps (~3,230 hours of LibriLight Medium), followed by 100,000 steps of supervised ASR fine-tuning on LibriSpeech train-960 using a hybrid TDT-CTC loss.

## Experimental setup

Experiments use LibriSpeech train-960 for supervised ASR training and LibriLight Medium (~3,230 hours) for unlabeled encoder pre-training. Evaluations are conducted on LibriSpeech test-clean and test-other sets, alongside NOISEX-92 mixed conditions (white, pink, and babble noise at 0, 5, and 10 dB SNRs). The baseline model is the 110M-parameter Parakeet TDT-CTC architecture featuring a 17-layer FastConformer encoder (512-dimensional hidden size). Implementation uses two NVIDIA GeForce RTX 3090 GPUs, the AdamW optimizer, and Lhotse dynamic bucketing.

## Results

DASH successfully mitigates the robustness-clean tradeoff, achieving 1.96% WER on test-clean and 10.27% on test-other under 0-15 dB noise training conditions, outperforming the baseline fine-tuning model (which scores 2.07% and 10.89% under identical noise settings). When trained with noisy pre-training and fine-tuned on clean data, DASH retains strong noise robustness (11.89% WER at 0 dB white noise), demonstrating that pre-training independently builds robust noise-invariant features. Ablation studies confirm that step-wise EMA updates outperform 1000-step intervals or frozen teachers, and multi-layer distillation (layers 6, 11, and 17) is strictly superior to final-layer-only distillation.

| System | test-clean | test-other | white (0 dB) | pink (0 dB) | babble (0 dB) |
|---|---|---|---|---|---|
| Baseline | 2.58 | 5.41 | 19.04 | 19.79 | 19.80 |
| Fine-tuning only (Noisy 0-15dB) | 2.07 | 4.35 | 10.89 | 11.82 | 13.78 |
| DASH (Noisy pre-train -> Clean fine-tune) | 1.99 | 4.10 | 11.89 | 12.78 | 16.48 |
| DASH (Noisy pre-train -> Noisy fine-tune) | 1.96 | 4.15 | 10.27 | 11.16 | 13.11 |

## Limitations

The framework is evaluated exclusively on English corpora (LibriSpeech and LibriLight), leaving multilingual generalization untested. The pre-training stage relies heavily on the quality and diversity of the chosen data augmentations (SpecAugment and additive noise), and overly aggressive corruptions can degrade performance by obscuring phonetic information.

## Why read this

Speech researchers and engineers looking to deploy ASR models in noisy environments without suffering clean-domain regressions will find DASH's decoupled two-stage distillation blueprint highly actionable and computationally lightweight.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust automated speech recognition for in-vehicle voice assistants, smart home devices, and open-world acoustic environments.

## Institutions / 機構

Sogang University

**Funding / 經費:** Institute of Information & Communications Technology Planning & Evaluation, National Research Foundation of Korea

## Related

- [VIB-AVSR: Variational Information Bottleneck for Noise-Robust LLM-Based Audio-Visual Speech Recognition](arora26b_interspeech.md) — same problem · relatedness 2.3/3
- [Training-Free Intelligibility-Guided Observation Addition for Noisy ASR](li26s_interspeech.md) — same problem · relatedness 2.2/3
- [Weakly Masked Residual Reliability Learning for Unsupervised Domain Adaptation in Speech Models](li26aa_interspeech.md) — same problem · relatedness 2.0/3
- [Adaptive AVSR: Integrating Speaker and Environmental Embeddings for Robust Audio-Visual Speech Recognition](simic26_interspeech.md) — same problem · relatedness 2.0/3
- [Robust LLM-based Audio-Visual Speech Recognition with Sparse Modality Alignment and Visual Unit-Guided Refinement](su26_interspeech.md) — same problem · relatedness 2.0/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
