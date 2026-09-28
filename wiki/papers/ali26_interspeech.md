---
id: ali26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-689
pdf: https://www.isca-archive.org/interspeech_2026/ali26_interspeech.pdf
---

# Fed-SpeechLLM: Federated Learning Speech Language Models for Multilingual ASR

[PDF](https://www.isca-archive.org/interspeech_2026/ali26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-689)

**TL;DR** — Fed-SpeechLLM introduces a federated learning framework for multilingual speech language models that matches centralized performance while preserving data privacy.

## Problem

Centralized training of speech language models (SpeechLLMs) requires aggregating massive, linguistically diverse speech corpora, which violates data privacy regulations and data sovereignty. In a federated setting, these models face compounded non-IID challenges driven by acoustic variations and cross-lingual linguistic heterogeneity across distributed clients. Existing federated methods are typically monolingual and architecturally simpler, leaving federated optimization for multimodal SpeechLLMs entirely unexplored.

## Method

The framework utilizes a modular SpeechLLM architecture comprising a frozen speech encoder (WavLM-Large or Whisper-Medium), a frozen TinyLlama-1.1B-Chat-v1.0 LLM adapted via LoRA, and a trainable linear adapter with 1D average pooling for dimension matching. Federated training is implemented using the Flower framework with client updates aggregated via FedAvg, updating only the trainable projector parameters to ensure communication efficiency. To counteract multilingual imbalance, the authors propose size-aware sample clustering (biasing selection toward smaller clients and weighting contributions) and language-clustering strategies with early or late task-biasing.

## Results

Evaluated on LibriSpeech-100 (English, ~100 hours) and Multilingual LibriSpeech (Italian, ~247 hours) with 316 speaker-based clients trained over 100 rounds. Monolingual federated training closely matches centralized performance, achieving ~6-7% WER on English LibriSpeech and ~22% on Italian MLS. In bilingual settings, random client selection yields 16.8% (LS) and 19.7% (MLS) WER, whereas a sample-clustering approach improves this to 9.7% (LS) and 19.6% (MLS). Early language-aware biasing (at round 5) significantly outperforms late biasing (at round 30), reducing the centralized-federated WER gap on English down to ~5 percentage points.

## Code

- https://github.com/mnabihali/Fed-SpeechLLM

## Applications

Engineers developing privacy-preserving, multilingual speech recognition systems for decentralized or cross-device deployments where raw audio cannot be centrally collected.

## Limitations

Performance remains sensitive to federated hyperparameters, and aggressive target-language biasing can cause modest metric degradation on non-target languages.

## Related

- (link related pages by id as the wiki grows)
