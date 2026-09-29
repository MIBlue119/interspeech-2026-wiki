---
id: thai26_interspeech
category: asr
labels: [self-supervised, robustness-noise]
institutions: ["Nanyang Technological University", "VinUniversity"]
code: https://github.com/thaivanphat95/robust-atc-asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-949
pdf: https://www.isca-archive.org/interspeech_2026/thai26_interspeech.pdf
---

# Contrastive Regularization for Accent-Robust ASR

*Van-Phat Thai, Aradhya Dhruv, Duc-Thinh Pham, Sameer Alam*

[PDF](https://www.isca-archive.org/interspeech_2026/thai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-949)

**Category:** `asr` · **Labels:** `self-supervised`, `robustness-noise`

**TL;DR** — The paper introduces supervised contrastive learning (SupCon) as an auxiliary, model-agnostic regularizer for self-supervised acoustic encoders during CTC fine-tuning, yielding up to a 25.8% relative WER reduction on unseen accents.

## Key contributions

- Applies utterance-level supervised contrastive learning (SupCon) as an auxiliary regularizer for CTC-based ASR fine-tuning without changing network architecture or requiring explicit accent labels.
- Achieves state-of-the-art performance on the L2-ARCTIC benchmark across both unseen-transcript and unseen-accent evaluation scenarios.
- Provides a geometric representation analysis using within-transcript cosine dispersion, demonstrating that SupCon creates tighter, more invariant clustering under diverse accent variability.

## Problem

Modern self-supervised ASR systems excel on native speech but degrade severely on non-native or multi-accent speech due to pronunciation drift. Prior methods rely either on explicit accent classifiers or embeddings that require meta-data supervision, or complex task-specific sequence alignment schemes like SCaLa. The field lacks a lightweight, model-agnostic objective that regularizes the latent geometry of the acoustic encoder itself to naturally achieve accent invariance without needing metadata.

## Method

The architecture builds on a pretrained self-supervised acoustic encoder (e.g., wav2vec 2.0 or WavLM) that outputs frame-level representations. The model is jointly optimized with a primary CTC objective and an auxiliary supervised contrastive loss. Valid frames are mean-pooled to generate a fixed-dimensional utterance representation, which is mapped via a two-layer MLP projection head with ReLU and L2-normalization to a 256-dimensional space.

Positive pairs are defined using identical transcripts spoken by different speakers (leveraging the repeated read-sentences in L2-ARCTIC), bypassing the need for explicit accent labels. The supervised contrastive loss uses a temperature parameter tau = 0.1. To stabilize early training, the contrastive weight is scheduled with a linear ramp ratio of 0.1 up to a maximum weight lambda = 0.1, following a 1-epoch CTC-only warm-up.

During inference, the entire auxiliary projection head and contrastive branch are discarded, and decoding relies purely on the CTC classification head coupled with a 4-gram LibriSpeech clean-360 language model via beam search.

## Experimental setup

Evaluated on the L2-ARCTIC dataset containing 24 speakers across 6 accent backgrounds (Arabic, Mandarin, Hindi, Korean, Spanish, Vietnamese) with ~1 hour per speaker. Experiments use an NVIDIA RTX 5090 GPU (32GB) with batch sizes of 32 (base) and 16 (large) using AdamW at a learning rate of 1e-5. Evaluated under unseen-transcript (UT) and unseen-accent (UA) settings, comparing CTC-only baselines against SupCon across wav2vec 2.0 and WavLM (base and large models) using Word Error Rate (WER).

## Results

On the W2V2-Large encoder, SupCon reduces WER from 10.47% to 9.14% (12.7% relative improvement) under the unseen-transcript (UT) setting, and drops WER from 9.98% to 7.41% (25.8% relative improvement) under the unseen-accent (UA) setting compared to the CTC-only baseline. Across all tested architectures (wav2vec 2.0 and WavLM, base and large), SupCon consistently outperforms CTC-only models under both greedy and LM-augmented decoding. Geometric analysis shows that SupCon reduces mean within-transcript cosine dispersion by 17% (from 0.0518 to 0.0430), proving that it forms denser, speaker-agnostic linguistic clusters.

| System | UT WER (%) | UA WER (%) |
|---|---|---|
| Whisper FT [7] | 12.21 | 17.12 |
| MAS-LoRA-QKVO [7] | 11.77 | 12.55 |
| W2V2-Large (CTC) | 10.47 | 9.98 |
| W2V2-Large + SupCon (Ours) | 9.14 | 7.41 |

## Limitations

The approach relies on the availability of utterances sharing identical text transcripts spoken by different speakers to construct positive pairs, which limits direct application to diverse open-domain corpora without pseudo-labeling or transcript-similarity grouping. Evaluation is restricted to read speech in English across six specific non-native accents from a single benchmark (L2-ARCTIC), leaving conversational or noisy multi-accent real-world domains unverified.

## Why read this

Speech researchers and engineers working on robust ASR or domain adaptation should read this paper to learn how to inject a lightweight, modification-free contrastive regularization objective that dramatically improves out-of-domain accent generalization.

## Code

- https://github.com/thaivanphat95/robust-atc-asr

## Applications

Multi-accent speech recognition systems, global voice assistants, and international air traffic communication tools requiring robust transcription across diverse non-native accents.

## Institutions / 機構

Nanyang Technological University, VinUniversity

**Funding / 經費:** National Research Foundation, Singapore, Civil Aviation Authority of Singapore, Aviation Transformation Programme

## Related

- (link related pages by id as the wiki grows)
