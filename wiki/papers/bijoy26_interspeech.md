---
id: bijoy26_interspeech
category: asr
labels: [self-supervised, robustness-noise]
institutions: ["Aalto University", "South East Technological University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1373
pdf: https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.pdf
---

# Mixture-of-Accent-Adapters for Robust ASR: Injecting Accent Cues into Pretrained Whisper

*Mehedi Hasan Bijoy, Yaroslav Getman, Tamás Grósz, Mikko Kurimo*

[PDF](https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bijoy26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1373)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces Mixture-of-Accent-Adapters (MoAA), an adaptation framework for Whisper that injects soft accent cues and routes lightweight bottleneck adapters via a pooled-state control bottleneck. Combined with a deterministic hallucination filter (DHF), MoAA achieves a headline 7.49% WER on the AESRC benchmark while training only ~2.51M parameters.

## Key contributions

- A router-controlled bank of bottleneck adapters and a learnable soft accent codebook with posterior-weighted retrieval, eliminating the need for ground-truth accent labels at inference time.
- A pooled-state control bottleneck integrating multi-task supervision and adversarial GRL-based gender leakage mitigation to stabilize conditional routing.
- An accentedness-gated interpolation mechanism that allows on-demand specialization while defaulting to the frozen Whisper backbone when unnecessary.
- Deterministic Hallucination Filtering (DHF), a lightweight reference-free post-decoding module that targets insertion bursts and repetition artifacts.

## Problem

Accented speech significantly degrades modern end-to-end ASR accuracy, but adapting large pretrained models via full fine-tuning is computationally costly. Prior approaches treat accent awareness as either always-on conditioning or fully invariant representations, while routing and multi-task auxiliary heads are often studied in isolation and suffer from negative transfer or gating instability. Furthermore, Whisper-style encoder-decoder architectures are prone to rare decoding insertion bursts and repetition artifacts in accented settings, which severely inflate error rates if unaddressed.

## Method

The framework builds on a frozen Whisper-small backbone (241.7M parameters). Input logmel features are fed to the encoder, and a global utterance summary is computed via mean pooling, then projected through a learnable linear layer to form a control bottleneck representing latent accentedness and accent distribution. This control representation drives auxiliary classification heads (accentedness, accent, and adversarial gender via Gradient Reversal Layer with lambda = 1.0) and guides soft accent codebook retrieval. A learnable soft accent codebook (10 codewords plus an unaccented codeword) provides posterior-weighted continuous accent cues, which are projected and added to encoder states. An accentedness gate p = P(accented|x) computes mixture coefficients via a router over N = 10 lightweight bottleneck adapters (bottleneck size r = 192, ReLU activation). The router outputs a weighted combination of adapter states that is dynamically blended with the original encoder states using the same gate p, routing computation selectively when accent variation is detected.

Training optimizes a weighted loss combining token-level autoregressive cross-entropy for ASR (w_asr = 1), accentedness classification (w_ad = 1), accent classification (w_ac = 2), and adversarial gender classification (w_ge = 1). The model is trained for 10 epochs using batch size 16, an initial learning rate of 5e-4 with a 0.05 warmup ratio, 0.01 weight decay, and FP16 precision. At inference, predictions are self-contained without ground-truth accent labels. Post-decoding, DHF tokenizes hypotheses, checks for repetition and numeric spam using a reference-free quality score, and cleans suspicious outputs.

## Experimental setup

Training uses a mixture of the AESRC dataset (~200 hours across 10 accents) and LibriSpeech train-clean-100 (~100 hours of unaccented speech). Evaluation is performed on the AESRC test set (~20 hours). Baselines include Zero-Shot Whisper-small, Full Fine-Tuning (~241.7M parameters), LoRA (~1.77M parameters), and a Single Adapter non-routed variant (~1.19M parameters). Metrics evaluated are Word Error Rate (WER) and Character Error Rate (CER). Notable implementation details include a Whisper-small backbone, 10 adapter modules with rank 192, and a total trainable parameter count of ~2.51M.

## Results

On the AESRC test set, the Zero-Shot Whisper-small baseline achieves 35.17% WER and 13.26% CER. Full Fine-Tuning yields 15.50% WER (15.44% with DHF) and 4.10% CER (3.89% with DHF), while LoRA achieves 15.83% WER and 4.15% CER. The single-adapter baseline scores 14.49% WER and 8.27% CER (improving to 10.25% WER and 6.14% CER with DHF). In comparison, the proposed MoAA achieves 13.50% WER and 8.02% CER before post-processing, and with DHF enabled, it achieves a headline 7.49% WER and 3.81% CER, representing a 26.9% relative WER improvement and 38.0% CER improvement over its pre-DHF state.

Ablations demonstrate the necessity of key architectural choices: removing the pooled-state linear projection degrades WER to 18.01% and CER to 5.82%, while partially unfreezing the last N encoder/decoder layers performs worst at 21.38% WER and 7.84% CER. Furthermore, adversarial training via GRL successfully collapses gender classification accuracy in the bottleneck to 29.8% (compared to 98.63% without projection), confirming reduced gender leakage.

| System | WER (%) ↓ | CER (%) ↓ | Trainable Params |
|---|---|---|---|
| Zero-Shot Whisper-small | 35.17 | 13.26 | — |
| Full Fine-Tuning + DHF | 15.44 | 3.89 | ~241.7M |
| LoRA | 15.83 | 4.15 | ~1.77M |
| Single Adapter + DHF | 10.25 | 6.14 | ~1.19M |
| MoAA (Ours) | 13.50 | 8.02 | ~2.51M |
| MoAA + DHF (Ours) | 7.49 | 3.81 | ~2.51M |

## Limitations

The evaluation is restricted to the 10 English accents present in the AESRC benchmark, leaving open performance on out-of-domain or completely unseen regional dialects. The auxiliary tasks rely on clean categorical metadata (accent and gender labels during training) which may be noisy in real-world web data. Additionally, the approach inherits Whisper's known weaknesses with long digit sequences and exact numeric string preservation.

## Why read this

Speech and ML researchers focusing on parameter-efficient adaptation and robust ASR will learn how to design router-controlled, soft-codebook conditioned adapter banks that avoid full model fine-tuning. It provides a blueprint for combining auxiliary multi-task supervision with conditional compute routing inside a frozen encoder-decoder backbone.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust automated transcription for international call centers, multi-accent voice assistants, and inclusive speech-to-text systems.

## Institutions / 機構

Aalto University, South East Technological University

**Funding / 經費:** Business Finland, Finnish Cultural Foundation

## Related

- (link related pages by id as the wiki grows)
