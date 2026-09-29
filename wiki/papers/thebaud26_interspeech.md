---
id: thebaud26_interspeech
category: speaker
institutions: ["Johns Hopkins University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2670
pdf: https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.pdf
---

# Speaker Verification with Speech-Aware LLMs: Evaluation and Augmentation

*Thomas Thebaud, Yuzhe Wang, Laureano Moro-Velázquez, Jesús Villalba-Lopez, Najim Dehak*

[PDF](https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/thebaud26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2670)

**Category:** `speaker`

**TL;DR** — Off-the-shelf speech-aware LLMs show poor speaker verification capability (EERs >20%), but injecting frozen ECAPA-TDNN speaker embeddings via a linear projection and LoRA adapters enables TinyLLaMA-1.1B to achieve 1.03% EER on VoxCeleb1-Extended.

## Key contributions

- Proposed a model-agnostic scoring protocol for speech-aware LLMs to compute continuous verification scores via prompt-based confidence or token log-likelihood ratios.
- Benchmarked major open-weight and proprietary speech LLMs, revealing that off-the-shelf models rely on coarse traits (gender, accent) and fail at fine-grained identity discrimination.
- Introduced a lightweight speaker-augmentation recipe injecting frozen ECAPA-TDNN embeddings through a linear projection layer and LoRA tuning.
- Demonstrated near-dedicated-ASV performance (1.03% EER on VoxCeleb1-E) while preserving the natural language interface.

## Problem

While modern speech-aware LLMs process audio directly via acoustic front-ends or neural codecs, their training objectives focus heavily on linguistic understanding, semantic QA, or coarse paralinguistics (gender, emotion), leaving their internal speaker-discriminative representations largely unexplored. Traditional automatic speaker verification (ASV) systems like ECAPA-TDNN perform exceptionally well on biometric tasks but lack natural language reasoning and general dialogue capabilities. Bridging this gap is critical for unified systems that can handle both high-level semantic reasoning and low-level biometric authentication, yet prior art lacked systematic evaluation protocols and adaptation strategies for biometrics within LLMs.

## Method

The proposed architecture consists of a frozen pretrained ASV frontend, a learnable linear connector, and a language model adapted with Low-Rank Adaptation (LoRA). The speaker embedding is extracted using a pretrained ECAPA-TDNN model trained on VoxCeleb2-dev (achieving 0.89% EER on Vox1-O), which produces a fixed-dimensional x-vector that is frozen during subsequent training. A linear connector projects this vector into the text embedding dimension of the target LLM. The core LLM backbone is either TinyLLaMA-1.1B or Ministral3-3.3B, equipped with LoRA adapters.

Models are trained for next-token prediction to output a binary 'Yes' or 'No' answer indicating whether two audio segments belong to the same speaker, using balanced batches of 50% target and 50% non-target pairs. Training runs for 50 epochs with a batch size of 64 and a learning rate of 1e-4 on a single Nvidia A100 80GB GPU. For inference, a model-agnostic scoring protocol leverages the log-likelihood ratio (LLR) between the 'Yes' and 'No' tokens: Score = log P('Yes'|x) - log P('No'|x). This yields continuous verification scores required to compute Equal Error Rates across standard benchmark trials.

## Experimental setup

Evaluated primarily on the VoxCeleb1 test splits (Original [Vox1-O], Extended [Vox1-E], and Hard [Vox1-H]). Training uses the VoxCeleb2-dev set (and a 10% subset named VoxCeleb2-dev-XS containing 600 speakers, 6k utterances, and 12.4 hours for ablations), validated on VoxCeleb2-test. Baselines include a standalone ECAPA-TDNN system with cosine scoring, along with off-the-shelf speech-aware LLMs: Qwen-2.5-7B, Kimi-audio-7B, Gemini-3-flash, Gemini-2.5-flash-lite, GPT-4.0-audio, and AudioFlamingo3. Metrics reported are Equal Error Rate (EER %), failure rates, gender accuracy/prediction rates, and accent accuracy/prediction rates.

## Results

Off-the-shelf speech LLMs perform poorly on speaker verification, with EERs ranging from 22.62% (GPT-4.0-audio on Vox1-O) to over 45% (Gemini models), despite achieving high gender classification accuracy (92-98%). In contrast, the proposed SA-TinyLLaMA achieves 1.87% EER on Vox1-O, 1.03% on Vox1-E, and 2.20% on Vox1-H, closely approaching the standalone ECAPA-TDNN baseline (0.89%, 0.45%, 0.96%).

Ablation studies show that freezing the LLM backbone entirely and training only the connector (SA-TinyLLaMA-F) degrades performance significantly to 5.48% EER on Vox1-O, proving that LoRA adaptation is necessary for the LLM to interpret speaker representations effectively. Training on the reduced VoxCeleb2-dev-XS subset yields a competitive 3.57% EER on Vox1-O, though a fully frozen model on the same subset collapses to 27.01% EER. Interestingly, the smaller TinyLLaMA-1.1B backbone outperforms larger models like Ministral3-3.3B (which logs 14.76% EER on Vox1-O).

| System | Vox1-O (EER%) | Vox1-E (EER%) | Vox1-H (EER%) |
|---|---|---|---|
| ECAPA-TDNN (Baseline) | 0.89 | 0.45 | 0.96 |
| GPT-4.0-audio (Off-the-shelf) | 22.62 | 21.88 | 38.91 |
| SA-Ministral3 | 14.76 | 15.88 | 21.04 |
| SA-TinyLLaMA (FROZEN LLM) | 5.48 | 4.21 | 6.60 |
| SA-TinyLLaMA (XS Data) | 3.57 | 2.21 | 3.44 |
| SA-TinyLLaMA (Full Proposed) | 1.87 | 1.03 | 2.20 |

## Limitations

The evaluation relies heavily on VoxCeleb datasets, which primarily consist of clean YouTube interview audio, limiting insights into noisy, reverberant, or conversational real-world domains. The prompt-based log-likelihood scoring approach incurs massive computational overhead during training and inference compared to traditional vector-cosine scoring pipelines. Furthermore, closed-weight API models forced reliance on coarse integer confidence scoring with high parsing failure rates for certain architectures.

## Why read this

Researchers and engineers building multimodal speech LLMs or looking to integrate biometric verification into conversational agents should read this paper to learn how parameter-efficient LoRA tuning can bridge external acoustic embeddings with language model decoders.

## Code

- https://github.com/thomasthebaud/ASV-with-SpeechLLMs

## Applications

Biometric authentication, personalized voice-interactive conversational agents, speaker-aware dialogue analysis, and healthcare diagnostics.

## Institutions / 機構

Johns Hopkins University

## Related

- (link related pages by id as the wiki grows)
