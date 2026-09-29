---
id: wang26w_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device, streaming-real-time, generative-model]
institutions: ["Carnegie Mellon University", "Shanghai Jiao Tong University"]
code: https://github.com/whr-a/vLLM
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1244
pdf: https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.pdf
---

# An Efficient vLLM-Based Inference Pipeline for Unified Audio Understanding and Generation

*Haoran Wang, Jinchuan Tian, Siddhant Arora, Shinji Watanabe*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1244)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`, `streaming-real-time`, `generative-model`

**TL;DR** — This paper presents a vLLM-based inference pipeline for unified speech language models that natively handles multi-stream delay-pattern codebooks, on-GPU acoustic decoding, and efficient Classifier-Free Guidance (CFG). By co-scheduling conditional and unconditional requests, it achieves up to a 108x speedup over sequential PyTorch baselines while retaining 80% of non-CFG throughput.

## Key contributions

- A primary-auxiliary decomposition within continuous batching engines that enables synchronous multi-stream sampling and delay-pattern de-interleaving without modifying PagedAttention infrastructure.
- An end-to-end fused acoustic pipeline integrating a lightweight audio decoder directly into the serving path to perform single-process on-GPU waveform synthesis.
- A Paired Request Co-Scheduling strategy for Classifier-Free Guidance (CFG) that pairs conditional and unconditional requests in the same batch to share the transformer forward pass.
- A dynamic phase state machine using vocabulary masking and argmax inference to seamlessly manage mixed-modality transitions between text generation and multi-codebook speech generation.

## Problem

State-of-the-art LLM serving frameworks (like vLLM) use continuous batching and PagedAttention, but they are architecturally optimized for unimodal, text-only single-token generation. Speech Language Models (SpeechLMs) diverge from this by using Residual Vector Quantization (RVQ) with multi-layered acoustic tokens, requiring synchronous Multi-Token Prediction (MTP) and delay-pattern interleaving that demands multi-stream sampling and auxiliary vocoder decoding. Furthermore, Classifier-Free Guidance (CFG) requires two parallel forward passes per step, which naive implementations treat as disjoint requests that duplicate KV caches, break continuous batching, and halve throughput due to scheduling fragmentation.

## Method

The framework targets SpeechLMs utilizing delay-pattern architectures (Bagpiper, OpusLM, OpusLM-dialogue), which feature an LLM backbone emitting text and $S$ parallel audio sub-vocabulary streams. The model produces a hidden state $h_t$, and $S$ parallel codebook heads project this state by adding learnable stream embeddings $e_i$ before applying a shared language modeling head $W_H$ to yield logits $\ell^{(i)} = W_H(h_t + e_i)$. To fit this into text-centric engines, the system uses a primary-auxiliary decomposition where one stream is managed by the engine, and $S-1$ auxiliary streams are sampled internally and buffered per request. A per-request phase state machine uses dynamic vocabulary masking to handle text, transition, audio, and drain phases, determining modality dynamically from unmasked output distributions.

To eliminate the CFG bottleneck, the server uses Paired Request Co-Scheduling. When a request specifies a CFG scale $w > 1$, the server transparently creates a Companion request with a null prompt alongside the Main conditional request. Treated as an atomic scheduling unit, the pair shares a single forward pass through the transformer backbone by splitting the per-step token budget. After the forward pass, raw conditional and unconditional logits are merged for audio streams, a single Main Token is sampled from the merged distribution, and that exact token is synchronously appended to the Companion request to keep autoregressive histories identical.

## Experimental setup

The framework is evaluated on three open-source SpeechLMs: Bagpiper (Qwen3-8B backbone, 8 parallel codebook streams via X-Codec), OpusLM (OLMo-2-7B backbone, 9-stream setup with 1 SSL and 8 DAC), and OpusLM-Dialogue (SmolLM2-1.7B backbone, 9-stream setup). The baseline is the original sequential PyTorch inference pipeline without continuous batching. Experiments use a single NVIDIA H100 80GB GPU with FlashAttention-3 enabled, a maximum sequence length of 16,384 tokens, and concurrencies of 512 for standard evaluations or 256 for CFG settings to maintain an equivalent active workload. Metrics include decode token rates (tok/s), Model FLOPs Utilization (MFU), MMAU-mini accuracy, LibriSpeech test-clean word error rate (WER), and Eval2000 UTMOS.

## Results

The vLLM pipeline accelerates decoding throughput drastically over sequential PyTorch baselines, elevating Bagpiper from 52.7 to 5694.5 tok/s (MFU from 0.096% to 9.95%), OpusLM from 36.5 to 4582.9 tok/s (MFU from 0.311% to 9.89%), and OpusLM-Dialogue from 53.9 to 5870.5 tok/s (MFU from 0.290% to 3.28%). Numerical correctness checks under FP32 yield identical token sequences and a mean logit RMSE of 0.008 compared to PyTorch, while BF16 with FlashAttention-3 introduces minor precision-based mismatches starting at step 34 (mean RMSE 0.163) that do not degrade model fidelity. On task quality, Bagpiper vLLM scores 75.4% on MMAU-mini (vs 74.5% PyTorch) and 2.6% ASR WER (vs 2.5%), while OpusLM achieves 1.9% ASR WER (vs 2.3%). For CFG overhead analysis on Bagpiper, the co-scheduling strategy maintains 4952.0 tok/s decode throughput without CFG and 3960.7 tok/s with CFG (sustaining 80% of non-CFG throughput while increasing MFU from 8.0% to 12.8%).

| System | Decode (tok/s) | MFU (%) |
|---|---|---|
| Bagpiper (PyTorch) | 52.7 | 0.096 |
| Bagpiper (vLLM) | 5694.5 | 9.95 |
| OpusLM (PyTorch) | 36.5 | 0.311 |
| OpusLM (vLLM) | 4582.9 | 9.89 |
| OpusLM-Dial. (PyTorch) | 53.9 | 0.290 |
| OpusLM-Dial. (vLLM) | 5870.5 | 3.28 |

## Limitations

The current framework is explicitly engineered for delay-pattern SpeechLM architectures and relies on unified vocabularies where multi-codebook streams are predictable via auxiliary heads. Scope is bounded by the tested model sizes (up to 8B parameters) and hardware constraints (single H100 80GB GPU). Evaluation focuses on specific architectures (Bagpiper, OpusLM) and standard corpora (LibriSpeech, MMAU-mini), leaving multi-node distributed serving and ultra-long multi-turn dialogue context lengths unaddressed.

## Why read this

Speech and ML engineers building real-time voice assistants or speech-to-speech dialogue systems will learn how to adapt continuous batching engines for multi-codebook token generation and how to execute Classifier-Free Guidance without paying a 50% throughput penalty.

## Code

- https://github.com/whr-a/vllm/tree/opuslm

## Applications

Real-time speech-to-speech dialogue agents, unified audio-text language models, and high-throughput streaming text-to-speech or audio generation servers.

## Institutions / 機構

Carnegie Mellon University, Shanghai Jiao Tong University

**Funding / 經費:** ACCESS program, National Science Foundation

## Related

- [Audio-NSP: Data-Centric Semi-Autoregressive Generation for Large Audio-Language Models](cao26b_interspeech.md) — same problem · relatedness 2.3/3
- [UniVoice: Unifying Autoregressive ASR and Flow-Matching based TTS with Large Language Models](guan26b_interspeech.md) — same problem · relatedness 2.1/3
- [FlashTTS: Fast Streaming TTS with MTP Acceleration and X-pred Mean Flow Distillation](xie26b_interspeech.md) — same problem · relatedness 2.0/3
- [WavSLM: Single-Stream Speech Language Modeling via WavLM Distillation](libera26_interspeech.md) — same problem · relatedness 1.9/3
- [Samsone: A Family of Open Small Audio Language Models for On-Device Inference](masztalski26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
