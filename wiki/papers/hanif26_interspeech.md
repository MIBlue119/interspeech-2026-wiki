---
id: hanif26_interspeech
category: speech-llm-dialogue
labels: [self-supervised]
institutions: ["Mohamed bin Zayed University of Artificial Intelligence"]
code: https://github.com/asif-hanif/zebra
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-261
pdf: https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.pdf
---

# ZEBRA: Zero-Shot Entropy-Regularized Prompt Learning for Base-to-Novel Generalization in Audio-Language Models

*Asif Hanif, Mohammad Yaqub*

[PDF](https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/hanif26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-261)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`

**TL;DR** — ZEBRA is a plug-and-play framework for audio-language models that mitigates the base-to-novel generalization gap in prompt learning by combining zero-shot logit fusion and self-entropy regularization, boosting novel-class accuracy by over 4% on average without adding learnable parameters.

## Key contributions

- Identifies and analyzes the base-to-novel generalization gap in audio-language model prompt learning, where base-class adaptation harms unseen novel-class performance.
- Proposes ZEBRA, a lightweight plug-and-play framework requiring zero additional learnable parameters and negligible computational overhead.
- Integrates zero-shot logit fusion to anchor few-shot adaptation directly to the original pre-trained decision space.
- Employs a self-entropy regularization term during training to penalize base-class overconfidence and prevent overfitting to seen categories.

## Problem

While prompt learning successfully adapts audio-language models (ALMs) to downstream tasks using few-shot base samples, it causes severe overfitting to seen categories. This results in degraded performance on novel, unseen classes—frequently dropping below the performance of zero-shot inference. Prior prompt-learning methods like CoOp and CoCoOp, adapted from vision-language models, fail to preserve the broad semantic alignment learned during large-scale pre-training. Addressing this base-to-novel gap is vital for deploying versatile ALMs that can handle both few-shot domain adaptation and robust zero-shot transfer.

## Method

ZEBRA builds upon existing CLIP-style audio-language architectures, specifically utilizing the frozen audio and text encoders of a decoder-discarded Pengi backbone. It operates via two complementary mechanisms during few-shot optimization on base classes. First, zero-shot logit fusion combines the original zero-shot logits with prompt-learning logits via weighted coefficients (fixed at lambda_zs = 0.5 and lambda_pr = 0.5) during both training and inference. This anchors the adaptation process to the pre-trained space without requiring extra text encoder forward passes.

Second, self-entropy regularization is introduced into the training objective. The model minimizes cross-entropy loss while maximizing the self-entropy of the combined prediction distribution. This discourages overconfident predictions on seen classes, promoting smoother decision boundaries and maintaining transferability to unseen classes. The entropy loss term is scaled by a factor of 0.05. During inference, predictions are derived exclusively from the fused logits without applying entropy regularization.

## Experimental setup

Evaluated across 11 diverse audio/speech datasets covering instrument classification (Beijing-Opera, NS-Instruments), sound event classification (ESC-50, ESC50-Actions, UrbanSound8K), emotion recognition (CREMA-D, RAVDESS), vocal sound classification (VocalSound), surveillance events (SESA), acoustic scene classification (TUT2017), and music analysis (GT-Music-Genre). Compared against ZERO-SHOT, COOP, and COCOOP baselines using 16 randomly sampled training examples per base class across 50 epochs with SGD (learning rate 0.05) on an NVIDIA RTX A6000 GPU.

## Results

On average across all datasets, vanilla COOp and CoCoOp drop below zero-shot novel accuracy (55.18%), achieving 48.04% and 50.44% novel accuracy respectively, despite high base accuracy (79.82% and 82.05%). Incorporating ZEBRA raises the novel accuracy of CoOp and CoCoOp to 59.37% and 59.50% respectively, while maintaining strong base accuracy (80.17% and 81.75%). Ablations indicate that the primary boost stems from zero-shot logit fusion, while self-entropy provides additional incremental gains. Furthermore, ZEBRA lowers the Expected Calibration Error (ECE) on novel classes (e.g., reducing CoCoOp's novel ECE from 0.2738 to 0.2253).

| METHODS | ZERO-SHOT | COOP | COOP + ZEBRA | COCOOP | COCOOP + ZEBRA |
|---|---|---|---|---|---|
| BASE (Average) | 53.53 | 79.82 | 80.17 | 82.05 | 81.75 |
| NOVEL (Average) | 55.18 | 48.04 | 59.37 | 50.44 | 59.50 |

## Limitations

The evaluation is restricted to classification tasks under a standard 16-shot setup using a specific backbone (Pengi). The gains, while consistent on average, remain modest or negative on a few individual datasets (e.g., ESC-50 novel accuracy slightly decreases when ZEBRA is applied). Additional language and dataset scale evaluations are necessary to verify broader generalizability.

## Why read this

Speech and ML researchers working on parameter-efficient adaptation and prompt learning for audio-language models will find ZEBRA an essential, parameter-free strategy to fix catastrophic forgetting of zero-shot generalization.

## Code

- https://github.com/asif-hanif/zebra

## Applications

Robust audio classification, acoustic scene analysis, and few-shot acoustic monitoring where models must adapt to specific domains without losing zero-shot generalization to unseen categories.

## Institutions / 機構

Mohamed bin Zayed University of Artificial Intelligence

## Related

- (link related pages by id as the wiki grows)
