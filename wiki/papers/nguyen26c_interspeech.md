---
id: nguyen26c_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1031
pdf: https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.pdf
---

# MamTra: A Hybrid Mamba-Transformer Backbone for Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/nguyen26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1031)

**TL;DR** — MamTra is an interleaved Mamba-Transformer speech synthesis backbone that initializes Mamba blocks via direct attention-to-SSM weight transfer and multi-level distillation, reducing inference VRAM usage by up to 34% with minimal impact on speech fidelity.

## Problem

Autoregressive Transformer-based text-to-speech systems suffer from quadratic computational and memory complexity regarding sequence length, causing high latency and massive KV cache footprints that hinder deployment on edge devices. Pure SSM alternatives offer linear-time inference but underperform Transformers in global context modeling and long-context reasoning. Hybridizing these architectures typically requires expensive pretraining from scratch, which is computationally prohibitive.

## Method

The framework, built on a 0.5B CosyVoice 2 (Qwen2.5) backbone, replaces a subset of Transformer layers with Mamba-2 blocks using structured parameter mapping where key, value, and query weights initialize the SSM input and output projections. To bridge the performance gap caused by removing the softmax nonlinearity, a multi-level distillation strategy combines cross-entropy ground-truth supervision, skew KL divergence logit matching, and token-embedding mean-squared error. The study systematically evaluates placement strategies (interleaved, contiguous, and data-driven importance) across Transformer-to-Mamba ratios from 1:1 to 1:11, training models on 0.5k hours of LibriTTS using just 2% of the teacher's original data volume.

## Results

Evaluated on Seed-TTS-eval test-en and LibriTTS test-clean, a 1:1 Transformer-to-Mamba ratio configuration reduces GPU inference memory usage by 34% compared to CosyVoice 2 while incurring only a 0.25% absolute increase in Word Error Rate (WER) and maintaining comparable naturalness (NMOS of 3.66 vs 3.68 baseline). Across different aggressive ratios (up to 1:11), the model achieves sub-quadratic compute and sub-linear KV cache growth, saving up to 1.4e11 FLOPs per token at a context length of 2,048. Ablation studies confirm that removing any component of the multi-level distillation loss (LCE, Llogits, Lemb) significantly degrades intelligibility, raising WER from 3.48 up to 6.70.

## Code

- https://mm.kaist.ac.kr/projects/mamtra/

## Applications

Speech engineers and developers deploying expressive multi-speaker text-to-speech systems, long-form audiobooks, podcasts, or streaming dialogue agents on resource-constrained or edge hardware.

## Limitations

The approach relies on an existing pretrained Transformer teacher model and requires a fine-tuning/distillation phase to recover speech fidelity after architectural substitution.

## Related

- (link related pages by id as the wiki grows)
