---
id: aparin26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1989
pdf: https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.pdf
---

# Whisper Hallucination Detection and Mitigation via Hidden Representation Steering and Sparse AutoEncoders

*Georgii Aparin, Vadim Popov, Tasnima Sadekova, Assel Yermekova*

[PDF](https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/aparin26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1989)

**TL;DR** — This paper investigates Whisper's internal representations to detect and mitigate non-speech hallucinations using activation steering and Sparse AutoEncoders (SAEs), dropping the hallucination rate from 86.88% to 27.33% on large-v3 without fine-tuning.

## Key contributions

- Demonstrates that hallucination-prone inputs are linearly separable from normal inputs in both raw Whisper encoder activations and SAE latent spaces, with discriminative signals strengthening in deeper layers.
- Proposes two fine-tuning-free steering frameworks: raw activation-space steering and SAE latent-space steering (using additive and multiplicative formulations).
- Establishes that as few as 10 to 50 SAE latent dimensions capture nearly all hallucination-related information, providing a sparse target for intervention.
- Achieves hallucination reductions competitive with parameter-updating baseline methods (like Calm-Whisper) while preserving English speech transcription quality.

## Problem

Whisper is prone to generating fluent, confident, but entirely fabricated text transcripts when fed non-speech audio such as silence, background noise, or music. Standard heuristic filters (relying on no_speech_prob and avg_logprob thresholds) frequently fail because hallucinations are often emitted with high confidence scores, bypassing detection. Addressing this usually requires costly model fine-tuning or heavyweight post-processing pipelines, necessitating lightweight, parameter-free internal interventions.

## Method

The authors extract audio encoder activations from the residual stream across layers and pool them temporally. For SAE representations, they train a Batch-Top-k Sparse Autoencoder (expansion coefficient 8, sparsity parameter k=50 active latents per token) across encoder layers, using non-zero average pooling. Logistic regression classifiers are trained on these spaces to evaluate linear separability (measured via AUC) and to identify the top-k feature importance weights (beta). Two steering approaches are developed: activation steering (adding a contrastive mean activation difference vector scaled by alpha to the residual stream) and SAE-based steering (modifying the sparse latent vector and decoding it back into the residual stream). 

In SAE-based steering, two strategies are compared: additive shifting (scaling the shift by the typical activation magnitude of each latent dimension) and multiplicative scaling (scaling active features by alpha or alpha^-1). Additive SAE steering is selected because it can modify dimensions inactive for a specific input. The intervention targets the final encoder layer using hyperparameters tuned exclusively on non-speech training splits to minimize Hallucination Rate (HR) while monitoring English Word Error Rate (WER) and Chinese Character Error Rate (CER).

## Experimental setup

Evaluated on Whisper small and Whisper large-v3 using greedy decoding. Non-speech training data (61,896 samples) comprises MUSAN noise, WHAM! train, and FSD50k dev; non-speech test data (26,963 samples) comprises UrbanSound8K, WHAM! cv/tt, and FSD50k eval. Speech evaluation uses LibriSpeech (test-clean, test-other), FLEURS (en, zh), and AISHELL-1. Metrics include Hallucination Rate (HR), Word Error Rate (WER), Character Error Rate (CER), and AUC score for classifier linear separability.

## Results

On Whisper large-v3, SAE-based additive steering on the final layer (alpha=5, top-k=10) reduces the test Hallucination Rate on the FULL non-speech set from 86.88% to 55.46% (and down to 27.33% when combining layers 26 and 32 with alpha=3.5), approaching the fine-tuned Calm-Whisper baseline (15.51% on UrbanSound8K). For Whisper small, SAE steering (alpha=3, top-k=25, layer 12) cuts FULL test HR from 72.63% to 14.11%. Activation steering achieves more modest HR reductions (e.g., 82.37% on FULL for large-v3 at alpha=2). 

While English WER remains largely stable or slightly improves for the small model, Chinese CER degrades significantly under both steering methods and plain SAE inference, largely because the SAE was not trained on Mandarin speech data, placing it out-of-domain.

| System / Condition | UrbanSound8K HR (%) | WHAM! HR (%) | FSD50k HR (%) | FULL HR (%) | Clean WER (%) |
|---|---|---|---|---|---|
| Whisper large-v3 (Baseline) | 95.98 | 92.04 | 75.08 | 86.88 | 2.11 |
| Calm-Whisper (Fine-tuned) | 15.51 | — | — | — | 2.19 |
| Activation steering (layer 32) | 90.21 | 89.46 | 70.12 | 82.37 | 4.11 |
| SAE steering (layer 32) | 30.68 | 25.13 | 30.68 | 29.03 | 2.38 |
| SAE steering (layers 26+32) | 19.88 | 27.05 | 33.92 | 27.33 | 3.70 |

## Limitations

The method relies heavily on pre-trained SAE checkpoints which are currently English-centric, leading to severe out-of-domain degradation (high CER) when processing Chinese speech. Hyperparameters like steering coefficient alpha and top-k features require careful manual tuning on validation sets to avoid destroying speech transcription performance. The intervention currently requires executing the SAE encoder-decoder roundtrip during inference, adding computational overhead.

## Why read this

Researchers studying mechanistic interpretability, activation steering, and ASR robustness will find a clean blueprint for inspecting and repairing neural model failure modes without costly fine-tuning.

## Code

- https://github.com/audiosae/audio-sae

## Applications

Robust streaming ASR, long-form speech transcription transcription pipelines, and filtering noisy audio inputs for downstream speech LLMs.

## Related

- (link related pages by id as the wiki grows)
