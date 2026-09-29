---
id: guo26b_interspeech
category: asr
institutions: ["National Taiwan Normal University"]
code: https://github.com/Guo0911/COALA
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1097
pdf: https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.pdf
---

# COALA: Robust Contextualized Speech-augmented Language Modeling for ASR via Contrastive Regularizer and Biasing Score Estimation

*Jhih-Rong Guo, Bi-Cheng Yan, Tien-Hong Lo, Berlin Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1097)

**Category:** `asr`

**TL;DR** — COALA introduces a contextual biasing framework for speech-augmented language models using a discriminative scoring projector and two novel loss functions (MPD-Loss and DPD-Loss) that prevent gradient collapse in multi-entity scenarios, achieving a 99.09% Recall#20 on LibriSpeech test-clean.

## Key contributions

- Maps SLM latent representations into a specialized discriminative space via an MLP projector to score matching intensity between audio and candidate entities independently of the LLM vocabulary.
- Proposes Multi-Positive Discriminative Loss (MPD-Loss) to eliminate inter-positive entity competition during softmax normalization in multi-target utterances.
- Proposes Decoupled Point-wise Discriminative Loss (DPD-Loss) using a sigmoid formulation to treat entity scoring as an absolute binary classification task, avoiding relative ranking limitations.
- Implements a Biasing Target Identification (BTI) mechanism using a top-K strategy and an <unbiased> token threshold to feed compact entity prompts into the SLM, preventing context-window OOM failures.

## Problem

Integrating external knowledge via contextual biasing into Speech-augmented Language Models (SLMs) is hindered by the models' strict context-window limitations and performance degradation when processing large-scale biasing lists with multi-target utterances (where multiple rare words co-occur). Existing inference-time FST methods and training-time attention adapters suffer from error propagation or severe training collapse because standard discriminative losses induce gradient conflicts and mutual exclusivity among multiple positive entities.

## Method

COALA couples a pre-trained Whisper-large-v2 audio encoder (640M parameters) with a SmolLM2-135M-Instruct backbone language model (totaling 777M parameters), incorporating a dedicated CTC module after the audio adapter to generate frame-level alignments as audio prefix tokens. For contextual biasing scoring, the last hidden states of candidate entities from the backbone LM are fed into a discriminative projector—a 2-layer multi-layer perceptron (MLP) with a ReLU activation—to compute a sequence-level, length-normalized score si for each entity ei.

To overcome the training collapse of standard discriminative loss on multi-target data (which requires auxiliary log loss), COALA trains a discriminative projector and a LoRA module using either MPD-Loss or DPD-Loss. MPD-Loss localizes the softmax normalization to a single positive entity against the entire negative set E^-, removing mutual exclusivity among co-occurring positive targets. DPD-Loss goes further by leveraging the sigmoid function sigma(·) to treat each entity independently as a point-wise binary classification task, optimizing absolute matching intensities and establishing a stable decision boundary centered around zero.

During inference, a Biasing Target Identification (BTI) stage ranks candidate entities and selects a top-K (K=10) subset using the score of a special <unbiased> token as a dynamic threshold to filter low-scoring entities, ensuring the SLM prompt stays within length limits while feeding precisely targeted rare words.

## Experimental setup

Evaluated on the LibriSpeech corpus (960-hour full training set, dev-clean validation, and test-clean/test-other test sets) with biasing list sizes N = 500, 1000, 5000 containing common words (5K high frequency) and rare words (209.2K low frequency). Compared against baseline systems including CTC-Filter, K-Prompt, and standard Bias-Loss (discriminative loss + log loss), measured using Word Error Rate (WER, decomposed into U-WER and B-WER) and Recall metrics (Recall@X, Recall#X). Implemented using a 24GB RTX 3090 GPU in a two-stage recipe: Stage 1 trains the audio adapter and CTC module while tuning backbone LoRA for 10 epochs (batch size 4); Stage 2 freezes previous layers and trains the discriminative projector and a new LoRA for 7 epochs (batch size 1, M=120 candidates).

## Results

On the biasing scoring task with N = 5000, DPD-Loss achieves a Recall#20 of 99.09% on test-clean and 96.59% on test-other, outperforming the baseline Bias-Loss (98.72% and 95.10%) and prompt-based methods like CTC-Filter (93.26% and 83.83%). For downstream contextual ASR, integrating DPD-Loss with the BTI mechanism drops B-WER on test-clean down to 3.25% (N=500) and 3.86% (N=1000), compared to 23.39% without biasing. Unfiltered large biasing lists (N=5000) fail due to out-of-memory (OOM) errors on the 24GB VRAM hardware, highlighting the necessity of the proposed BTI module.

| Methods | Recall#20 clean (%) | Recall#20 other (%) | Recall#50 clean (%) | Recall#50 other (%) |
|---|---|---|---|---|
| CTC-Filter | 93.26 | 83.83 | 94.45 | 85.49 |
| K-Prompt | 86.30 | 73.88 | 88.92 | 79.05 |
| Bias-Loss [13] | 98.72 | 95.10 | 99.29 | 97.27 |
| MPD-Loss (Our) | 87.86 | 95.65 | 99.43 | 97.55 |
| DPD-Loss (Our) | 99.09 | 96.59 | 99.60 | 98.17 |

## Limitations

The framework relies on a top-K strategy (K=10) that structurally caps retrieval performance on utterances containing more than 11 target entities. Unfiltered large-scale biasing lists (N=5000) cause OOM errors on standard 24GB GPUs without the BTI pruning mechanism. Evaluation is restricted to the English LibriSpeech corpus, leaving multilingual and domain-transfer scalability unverified.

## Why read this

Speech and ML researchers working on E2E contextual biasing should read this paper to understand how formulating entity scoring as a point-wise binary classification task (DPD-Loss) eliminates gradient conflicts in multi-target speech language models.

## Code

- https://github.com/Guo0911/COALA

## Applications

Voice assistants, command-and-control systems, and domain-specific speech recognition (e.g., medical, legal, or contact-list dialing) requiring robust recognition of rare or proprietary entity names.

## Institutions / 機構

National Taiwan Normal University

**Funding / 經費:** Realtek Semiconductor Corporation

## Related

- [AFG-Bias: Acoustic-Fusion-Gated Biasing for Plug-and-Play Hotword Customization in LLM-Based ASR](wu26i_interspeech.md) — same problem · relatedness 2.7/3
- [UGPCB: Uncertainty-Gated Phonetic Contextual Biasing for Improving Hotword Recognition in Large Speech Models](hou26_interspeech.md) — same problem · relatedness 2.5/3
- [Context Projector: Complementary Keyword and Dialogue Context Embeddings for LLM-based ASR](villatorotello26_interspeech.md) — same problem · relatedness 2.3/3
- [Contextual Earnings-22: A Speech Recognition Benchmark with Custom Vocabulary in the Wild](munyampirwa26_interspeech.md) — complementary · relatedness 2.3/3
- [LLM-HB: Language-Aware LLM-Guided Hotword Biasing for Code-Switching ASR](he26c_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
