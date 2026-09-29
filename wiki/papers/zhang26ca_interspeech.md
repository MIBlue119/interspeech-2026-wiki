---
id: zhang26ca_interspeech
category: paralinguistics-emotion
labels: [dataset-or-benchmark-release]
institutions: ["Beijing University of Posts and Telecommunications"]
code: https://github.com/zmkshakespar/ACR-Net
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2134
pdf: https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.pdf
---

# ACR-Net: Mitigating Semantic Dominance via Contrastive Acoustic-Semantic Decoupling

*Mengke Zhang, Yanda Shao, Tianhe Wu, Kai Feng*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26ca_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2134)

**Category:** `paralinguistics-emotion` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — The paper introduces ACR-Net, a dual-stream architecture with a contrastive decoupling loss that mitigates 'Semantic Dominance' in speech emotion recognition when vocal tones contradict textual semantics, achieving 76.5% acoustic accuracy on a new adversarial benchmark.

## Key contributions

- Introduces ASPIRE, an adversarial diagnostic benchmark containing 1,200 validated audio-text samples across 4 structural conflict types synthesized via EmotiVoice.
- Proposes two novel diagnostic metrics: Semantic Overconfidence Penalty (SOP) to quantify text bias, and Latent Decoupling Degree (LDD) to measure feature orthogonality.
- Develops ACR-Net, a structurally isolated dual-stream network using Whisper encoders, Cross-Modal Attention, and a Contrastive Decoupling Loss to separate conflicting representations.
- Demonstrates state-of-the-art performance in resolving acoustic-semantic conflicts, outperforming prior fusion and re-weighting mechanisms across adversarial and standard datasets.

## Problem

Multi-modal audio models and Audio LLMs assume acoustic-semantic congruence, suffering from 'Semantic Dominance' or modality collapse when faced with implicit discrepancies like sarcasm or conflicting vocal tones. Prior models and standard datasets (like IEMOCAP and RAVDESS) filter out incongruent samples and rely on text tokens as low-variance semantic shortcuts, causing models to completely disregard acoustic evidence. This structural vulnerability leads to extreme overconfidence in incorrect text-driven emotions and heavily entangled latent representations.

## Method

ACR-Net employs a structurally isolated dual-stream architecture based on Whisper-Medium. The audio stream freezes the original backbone weights and injects Low-Rank Adaptation (LoRA) layers into every self-attention block to learn fine-grained, varying acoustic cues independently from text. The text stream utilizes the frozen text encoder of Whisper to serve as a semantic anchor.

Cross-Modal Attention (CMA) treats acoustic embeddings as Queries and semantic embeddings as Keys and Values, enabling the audio modality to actively scan for inconsistencies in the text sequence. Mean pooling over time yields temporally aligned representations.

To overcome feature entanglement, ACR-Net introduces a hybrid loss function L_total = L_CE + lambda * L_Decouple. L_Decouple uses a cosine similarity contrastive margin loss operating on the pooled acoustic vector and semantic vector. By enforcing mathematical repulsion with an optimal margin m=0.5 and lambda=0.1, it forces contradictory representations into orthogonal sub-spaces (high LDD), driving SOP near zero and preventing textual semantics from overriding acoustic features.

## Experimental setup

Evaluated on the ASPIRE benchmark (1,200 samples with 5-fold cross-validation plus a 200-sample independent test set) and standard congruent speech corpora: EmoDB (German), CASIA (Chinese), SAVEE (British English), CREMA-D (English), and RAVDESS (North American English). Compared against audio-only SSL models (emotion2vec+, WavLM-Large), multi-modal task models (Whisper-large-v3, SeamlessM4T), audio LLMs (SALMONN, Qwen2-Audio), and recent modal interventions (MCR, FAS). Evaluated using Acoustic Accuracy (ACC), Semantic Overconfidence Penalty (SOP), and Latent Decoupling Degree (LDD).

## Results

On the ASPIRE benchmark under polarity opposite conflicts, ACR-Net achieves 68.4% ACC with an SOP of 0.185 and LDD of 0.812, vastly outperforming MCR (35.2% ACC, 0.612 SOP) and FAS (42.5% ACC, 0.548 SOP). Across all conflict types in ASPIRE, ACR-Net maintains an LDD consistently above 0.8, driving SOP down near zero and achieving top accuracies (e.g., 85.2% on Arousal Opposite and 78.5% on Emotion Masking). On standard congruent datasets, ACR-Net preserves robust baseline performance, scoring 88.5% on EmoDB and 88.6% on SAVEE, proving decoupling does not harm standard recognition.

| System / Condition | ACC (%) ↑ | SOP ↓ | LDD ↑ |
|---|---|---|---|
| MCR (Polarity Opposite) | 35.2 | 0.612 | 0.205 |
| FAS (Polarity Opposite) | 42.5 | 0.548 | 0.288 |
| **ACR-Net (Polarity Opposite)** | **68.4** | **0.185** | **0.812** |
| MCR (Emotion Masking) | 45.2 | 0.520 | 0.228 |
| FAS (Emotion Masking) | 52.8 | 0.465 | 0.295 |
| **ACR-Net (Emotion Masking)** | **78.5** | **0.118** | **0.865** |

## Limitations

The study relies on synthetic adversarial data generated via a TTS model (EmotiVoice) rather than naturalistic recordings of real-world sarcasm, which may limit coverage of complex paralinguistic nuances. The evaluation is constrained to four main emotion classes and restricted language configurations. Furthermore, reliance on a frozen Whisper backbone and LoRA tuning requires substantial pre-trained infrastructure compute.

## Why read this

Researchers and engineers building speech-language models or emotion recognition systems should read this to understand why multi-modal fusion fails under contradictory text-audio cues and how explicit latent space orthogonalization solves modality collapse.

## Code

- https://github.com/zmkshakespar/ACR-Net

## Applications

Improving conversational agents, customer service analytics, and voice assistants to accurately detect sarcasm, irony, and suppressed emotions when vocal tone contradicts textual content.

## Institutions / 機構

Beijing University of Posts and Telecommunications

## Related

- [Prosody-Aware Speech Representations for Emotion Recognition under Pragmatic Ambiguity](park26l_interspeech.md) — same problem · relatedness 2.8/3
- [Multi-Loss Learning for Speech Emotion Recognition with Energy-Adaptive Mixup and Frame-Level Attention](wang26u_interspeech.md) — same problem · relatedness 2.6/3
- [Segment-wise Embedding based Graph Attention Network for Effective Speech Emotion Recognition](song26c_interspeech.md) — same problem · relatedness 2.5/3
- [MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition](song26b_interspeech.md) — same problem · relatedness 2.5/3
- [SETEAB: Multiscale approach with Squeeze-and-Excitation Temporal Enhanced Aware Block for Speech Emotion Recognition](vo26_interspeech.md) — same problem · relatedness 2.3/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
