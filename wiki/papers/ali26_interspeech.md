---
id: ali26_interspeech
category: asr
labels: [multilingual, self-supervised]
institutions: ["Fondazione Bruno Kessler"]
code: https://github.com/mnabihali/Fed-SpeechLLM
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-689
pdf: https://www.isca-archive.org/interspeech_2026/ali26_interspeech.pdf
---

# Fed-SpeechLLM: Federated Learning Speech Language Models for Multilingual ASR

*Mohamed Nabih Ali, Daniele Falavigna, Alessio Brutti*

[PDF](https://www.isca-archive.org/interspeech_2026/ali26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ali26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-689)

**Category:** `asr` · **Labels:** `multilingual`, `self-supervised`

**TL;DR** — Fed-SpeechLLM is the first federated learning framework for multilingual SpeechLLM-based automatic speech recognition that freezes speech encoders and LLM backbones while selectively aggregating trainable projectors and LoRA adapters. Evaluated on English and Italian, the method achieves Word Error Rates closely matching centralized training under non-IID conditions.

## Key contributions

- Presents the first systematic study of federated learning applied to SpeechLLM architectures for multilingual ASR.
- Proposes a communication-efficient strategy that selectively aggregates only trainable parameters (projectors and LoRA adapters) on the server while freezing large backbones.
- Introduces and evaluates custom client selection and biasing strategies—including sample clustering and language-aware early biasing—to mitigate cross-lingual interference and data imbalance.
- Provides a thorough empirical comparison between WavLM-Large and Whisper encoders within the federated SpeechLLM paradigm.

## Problem

Centralized training of modern speech language models aggregates massive, multilingual corpora, which directly violates strict data privacy regulations, data sovereignty rules, and institutional silos. Prior federated ASR approaches are predominantly monolingual, architecturally simpler, and fail to handle the compounded non-IID challenges unique to multimodal SpeechLLMs. These challenges include acoustic variability, speaker distribution shifts, and a new axis of heterogeneity: linguistic imbalance across clients.

## Method

The architecture comprises three core components: a speech encoder, a linear projection adapter, and an LLM backbone. Raw 16 kHz audio is processed by a frozen speech encoder—either WavLM-Large (24 transformer layers, 317M parameters, 1024-dim output) or Whisper-Medium (769M parameters)—to produce acoustic embeddings. A lightweight linear projection layer maps these to the 2048-dimensional input space of the TinyLlama-1.1B-Chat-v1.0 language model backbone, combined with 1D average pooling using a temporal kernel and stride factor of $k = 2$ to reduce sequence length and computational overhead. The LLM is instruction-tuned using Low-Rank Adaptation (LoRA), where weight updates are approximated via low-rank matrices $W = AB$. Both the speech encoder and the LLM backbone are kept entirely frozen during federated training, and only the projector and LoRA parameters are updated and sent to the server for aggregation.

Federated optimization is implemented using Flower across a client pool where each speaker corresponds to a distinct client. In each round, 30% of clients are randomly or selectively sampled and trained locally for 10 epochs using the Adam optimizer. To overcome multilingual non-IID challenges, the paper evaluates sample-clustering (biasing selection toward smaller clients by 70% and scaling contributions via $\alpha_k = 1.5$ for small clients and $1.0$ otherwise) and language-aware biasing strategies (late biasing at round 30 vs. early biasing at round 5, shifting participation to 80% English and 20% Italian).

## Experimental setup

Evaluated on English using LibriSpeech-100 (LS; ~100 hours, 251 train speakers, evaluated on test-clean) and Italian using the Multilingual LibriSpeech Italian portion (MLS; ~247 hours, 65 train speakers, evaluated on 5.27-hour test set). Baseline models include centralized training (upper bound) and standard Flower-based FedAvg with random client selection, server-side fine-tuning, client-balanced sets, and sample-clustering. Evaluated primarily using Word Error Rate (WER %) over 100 communication rounds.

## Results

In the monolingual setting on LibriSpeech, federated training with WavLM drops WER from ~100% to 6-7% by round 100, closely approaching the centralized upper bound of 6%. On MLS Italian, Fed-SpeechLLM achieves ~22% WER versus ~20% centrally. In bilingual settings with random client selection, full-client training yields 16.8% WER on LS and 19.7% on MLS, while client-balanced selection results in severe degradation on LS (33.8% WER) due to insufficient training hours. Sample clustering improves bilingual results to 9.7% on LS and 19.6% on MLS. Early language-aware biasing (at round 5) significantly outperforms late biasing (round 30), driving LS WER down to 9.5% (reducing the centralized gap to ~5 percentage points). When substituting WavLM with Whisper-Medium in the sample-clustering setup, Whisper achieves superior convergence in only 40 rounds, matching centralized performance perfectly on MLS (16.4% WER) and reaching 7.7% on LS.

| System / Condition | LS (WER %) | MLS (WER %) |
|---|---|---|
| Centralized Training (WavLM) | 6.1 | 18.4 |
| Monolingual FL (WavLM) | 6.4 | 22.6 |
| Full-Clients FL Random (WavLM) | 16.8 | 19.7 |
| Sample-Clustering FL (WavLM) | 9.7 | 19.6 |
| Early Biasing FL (WavLM) | 9.5 | 21.4 |
| Sample-Clustering FL (Whisper, Round=40) | 7.7 | 16.4 |

## Limitations

The evaluation is restricted to a bilingual setup (English and Italian) and read speech corpora (LibriSpeech and MLS), leaving performance on noisy, conversational, or highly low-resource languages untested. The study assumes stable client connectivity and participation rates without addressing asynchronous updates, system dropouts, or extreme hardware heterogeneity across client devices. Furthermore, scaling to larger LLM backbones (>7B parameters) remains constrained by on-device memory and communication limits.

## Why read this

Speech and ML engineers building privacy-preserving, multilingual speech systems should read this paper to understand how to adapt large speech-language models via selective parameter aggregation under severe acoustic and linguistic non-IID conditions.

## Code

- https://github.com/mnabihali/Fed-SpeechLLM

## Applications

Privacy-preserving multilingual voice assistants, distributed clinical speech transcription, and on-device cross-lingual speech recognition for regulated enterprise environments.

## Institutions / 機構

Fondazione Bruno Kessler

**Funding / 經費:** Ministero delle Imprese e del Made in Italy, European Union

## Related

- (link related pages by id as the wiki grows)
