---
id: guo26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1097
pdf: https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.pdf
---

# COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation

[PDF](https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1097)

**TL;DR** — COALA introduces a robust contextualized speech-augmented language model framework for ASR that resolves multi-target training collapse using novel discriminative losses, achieving 99.09% Recall#20 on LibriSpeech test-clean.

## Problem

Speech-augmented language models (SLMs) struggle to recognize uncommon domain-specific entities from large biasing lists due to context-window limitations and distractor interference. Furthermore, existing discriminative biasing loss functions suffer from training collapse and gradient conflicts when handling multi-target utterances where multiple rare words co-occur.

## Method

The COALA framework integrates a pre-trained Whisper-large-v2 encoder (640M parameters) and SmolLM2-135M-Instruct as the backbone LM, totaling 777M parameters, coupled with an intermediate CTC module for acoustic-semantic alignment. It maps SLM latent representations via a multi-layer perceptron discriminative projector to compute sequence-level matching scores for candidate entities. To eliminate mutual exclusivity and gradient conflicts among positive entities during training, the authors propose two objective functions: Multi-Positive Discriminative Loss (MPD-Loss) and Decoupled Point-wise Discriminative Loss (DPD-Loss). The model is trained in two stages: joint ASR training with LoRA and audio adapter tuning, followed by freezing backbone weights to train the discriminative projector and an additional LoRA module.

## Results

Evaluated on the LibriSpeech benchmark with biasing list scales up to N = 5000, COALA is compared against baselines including CTC-Filter and K-Prompt. On the scoring task, DPD-Loss achieves a Recall#20 of 99.09% on test-clean and 96.59% on test-other, outperforming prior biasing loss approaches. Unlike baseline methods that require an auxiliary log loss for numerical stability, the proposed MPD-Loss and DPD-Loss function effectively as standalone objectives.

## Code

- https://github.com/Guo0911/COALA

## Applications

Speech engineers and developers building voice assistants, meeting transcription systems, or custom domain-specific speech recognition applications that require accurate integration of large, dynamic entity lists.

## Related

- (link related pages by id as the wiki grows)
