---
id: so26_interspeech
category: speaker
institutions: ["Seoul National University"]
code: https://github.com/jaejunL/vove
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3203
pdf: https://www.isca-archive.org/interspeech_2026/so26_interspeech.pdf
---

# Toward Open-Set Speaker Attribute Prediction with Keyword-Appended LLM Embeddings

*Byoungjun So, Jaejun Lee, Kyogu Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/so26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/so26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3203)

**Category:** `speaker`

**TL;DR** — This paper proposes an open-set speaker attribute prediction framework that maps voice features into a continuous semantic space using LLM embeddings, outperforming closed-set benchmarks on LibriTTS-P with an F1 score of 0.7625.

## Key contributions

- Formulates speaker attribute prediction as an open-set task using continuous LLM embeddings rather than fixed categorical labels.
- Introduces a keyword-appending strategy (e.g., appending 'speech' or 'voice') to bridge the cross-modal gap and regularize the LLM embedding manifold.
- Employs a top-k negative loss with a dynamic margin anchor to prevent subspace crowding and enforce discriminative decision boundaries.
- Demonstrates zero-shot generalization to unseen synonyms generated via Gemini 3.1 Pro.

## Problem

Conventional speaker attribute prediction models rely on closed-set multi-label classification with predefined categorical indices, which fail to capture subtle gradations, semantic relationships, and cannot generalize to unseen attributes outside the training palette. Prior approaches also suffer from black-box embedding limitations or lack interpretability regarding explainable voice traits like brightness or sharpness. This rigidity hinders flexible conditioning in applications like multi-speaker TTS and voice conversion.

## Method

The framework utilizes an ECAPA-TDNN backbone to predict acoustic representations aligned with target Large Language Model attribute embeddings. The output dimension of the prediction layer is set to 2,880 to match the embedding size of the GPT-OSS-20B model. Instead of standard binary cross-entropy, the model is trained using a weighted cosine similarity loss (L_wcos), where weights correspond to annotated attribute intensity levels (1.5 for 'very', 1.0 for 'normal', 0.5 for 'slightly').

To address semantic ambiguity of raw attributes (such as 'cute' or 'sweet' spanning outside the speech domain), a keyword-appending strategy attaches domain terms like 'speech' or 'voice' to each attribute, which geometrically contracts and regularizes the embedding manifold. Because this contraction causes semantic crowding, a top-k negative loss (L_negk) penalizes margin violations against the most confusing negative attributes based on a dynamic margin anchor (weighted average cosine similarity over positive attributes) and a softplus function. The final objective combines L_wcos and L_negk scaled by a hyperparameter lambda_negk = 0.5, with margin m = 0.2 and k = 1.

## Experimental setup

Evaluated on the LibriTTS-P dataset, which contains 2,443 speakers and 44 voice attribute categories annotated with three intensity levels. Compared against the closed-set multi-label classification benchmark (vove) using micro-averaged F1 scores across decision thresholds (0.2, 0.4, 0.6, 0.8). Implementation uses the ECAPA-TDNN architecture as the backbone, margin m = 0.2, lambda_negk = 0.5, and k = 1.

## Results

The proposed model achieves a micro-averaged F1 score of 0.7625 (at thresholds 0.2-0.6), outperforming the closed-set benchmark (0.7286 at threshold 0.8). In zero-shot synonym prediction using Gemini-generated synonyms, the keyword-appended model maintains high F1 scores (~0.76), whereas omitting keywords causes performance to collapse to 0.0018 at a threshold of 0.8. Geometric analyses confirm that keyword appending reduces total variance and PCA log-determinant, while top-k negative loss provides essential performance gains (+0.0530 F1) primarily in tightly crowded manifolds.

| System / Condition | Threshold 0.2 | Threshold 0.4 | Threshold 0.6 | Threshold 0.8 |
|---|---|---|---|---|
| Benchmark [4] (Closed-Set) | 0.6645 | 0.6908 | 0.6415 | 0.7286 |
| Proposed Model (Speech Keyword) | 0.7625 | 0.7625 | 0.7625 | 0.7380 |
| Proposed Model (No Keyword) | 0.7628 | 0.7628 | 0.7628 | 0.0018 |

## Limitations

The framework's evaluation is restricted to a single dataset (LibriTTS-P) due to the scarcity of corpora with absolute attribute labels. The study explores only one LLM architecture (GPT-OSS-20B) for target embeddings, leaving the impact of alternative embedding spaces and broader multilingual or stylistic validation as future work.

## Why read this

Speech researchers and ML engineers working on interpretable speaker representations, attribute conditioning, or open-world speech synthesis will learn how to regularize continuous semantic spaces using keyword appending and margin losses.

## Code

- https://github.com/jaejunL/vove

## Applications

Multi-speaker text-to-speech (TTS), voice conversion (VC), interpretable speaker recognition, and voice design interfaces.

## Institutions / 機構

Seoul National University

**Funding / 經費:** National Research Foundation of Korea, Institute of Information & Communications Technology Planning & Evaluation, Advanced GPU Utilization Support Program

## Related

- [MSU-Bench: Towards Understanding the Conversational Multi-Speaker Scenarios](sun26j_interspeech.md) — same problem · relatedness 1.9/3
- [Learning Multiple Utterance-Level Attribute Representations with a Unified Speech Encoder](bouziane26_interspeech.md) — same problem · relatedness 1.9/3
- [Voice Privacy from an Attribute-based Perspective](rahman26b_interspeech.md) — same problem · relatedness 1.8/3
- [ParaSpeechCLAP: A Dual-Encoder Speech-Text Model for Rich Stylistic Language-Audio Pretraining](diwan26_interspeech.md) — shared technique · relatedness 1.8/3
- [Audio-Language Prompt Learning for Few-Shot Audio Classification](xu26l_interspeech.md) — shared technique · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
