---
id: wang26w_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1244
pdf: https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.pdf
---

# An Efficient vLLM-Based Inference Pipeline for Unified Audio Understanding and Generation

[PDF](https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26w_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1244)

**TL;DR** — A vLLM-based inference pipeline for Speech Language Models natively supports multi-token prediction with delay-pattern interleaving, fused on-GPU waveform decoding, and efficient Classifier-Free Guidance (CFG) co-scheduling, achieving up to a 108× throughput boost over sequential PyTorch baselines.

## Problem

State-of-the-art serving engines are engineered for unimodal text LLMs and lack native mechanisms to handle the distinct architectural requirements of Speech Language Models, such as multi-layered residual vector quantization tokens and multi-stream sampling. Furthermore, Classifier-Free Guidance requires dual parallel forward passes per step, which conventionally doubles computational overhead and fragments request scheduling when implemented naively.

## Method

The framework extends vLLM with a primary-auxiliary decomposition that treats multi-codebook audio tokens as a single primary stream managed by the engine while buffering auxiliary streams internally. It fuses a lightweight on-GPU acoustic decoder directly into the generation pipeline to perform single-process waveform synthesis without external vocoder services. To overcome the CFG bottleneck, a Paired Request Co-Scheduling mechanism bundles conditional (Main) and unconditional (Companion) requests into the same continuous batch to share transformer forward passes and merge logits prior to sampling. The implementation was validated on three architectures: Bagpiper (Qwen3-8B backbone, 8 codebook streams), OpusLM (OLMo-2-7B backbone, 9 streams), and OpusLM-Dialogue (SmolLM2-1.7B backbone).

## Results

Evaluated on a single NVIDIA H100 80GB GPU with FlashAttention-3 and a maximum sequence length of 16,384 tokens, the pipeline accelerates decode token rates by roughly two orders of magnitude compared to sequential PyTorch baselines (e.g., Bagpiper decode speed increases from 52.7 to 5694.5 tok/s, raising MFU from 0.096% to 9.95%). The CFG co-scheduling strategy sustains up to 80% of non-CFG throughput (3960.7 tok/s versus 4952.0 tok/s decode). Quality metrics on MMAU-mini accuracy, LibriSpeech ASR/TTS word error rates, and UTMOS show that output performance remains stable compared to reference PyTorch execution.

## Code

- https://github.com/whr-a/vLLM

## Applications

Engineers and developers deploying real-time speech-to-speech dialogue systems, speech language models, and text-to-speech services in high-concurrency production environments.

## Limitations

Smaller models (such as the 1.7B OpusLM-Dialogue) exhibit lower MFU hardware utilization due to hitting the memory bandwidth wall rather than fully saturating compute units.

## Related

- (link related pages by id as the wiki grows)
