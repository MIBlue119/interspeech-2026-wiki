---
id: saon26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2680
pdf: https://www.isca-archive.org/interspeech_2026/saon26_interspeech.pdf
---

# Self-Speculative Decoding for LLM-based ASR with CTC Encoder Drafts

[PDF](https://www.isca-archive.org/interspeech_2026/saon26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/saon26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2680)

**TL;DR** — Self-speculative decoding accelerates speech-aware large language model inference and improves accuracy by reusing the conformer CTC encoder as a draft model, achieving a 4.4x speedup with a 5.58% word error rate on the Open ASR benchmark.

## Problem

Speech-aware language models (SLMs) deliver top-tier recognition accuracy but suffer from slow inference speeds due to autoregressive token-by-token generation. Traditional non-autoregressive alternatives like CTC decoding are fast but less accurate, whereas autoregressive decoding is bottlenecked by sequential forward passes and prone to language-model hallucinations. This paper addresses how to simultaneously accelerate inference and correct recognition errors without requiring a separate, dedicated draft model.

## Method

The paper introduces a three-step self-speculative decoding method using the existing CTC encoder of the SLM. First, frame-level entropies of the CTC output distribution are evaluated against a threshold to directly accept confident greedy CTC hypotheses. Second, unconfident CTC hypotheses are verified in a single parallel forward pass through the LLM using token-likelihood thresholds (relaxed acceptance). Third, if verification fails, autoregressive generation resumes from the longest accepted CTC prefix rather than falling back to the start of the utterance. Experiments utilize a 440M parameter 16-layer conformer CTC encoder, a 37M parameter two-layer query transformer projector downsampling by 5x, and a 1B parameter text LLM with rank-64 LoRA adapters.

## Results

Evaluated across nine corpora and five languages (including LibriSpeech, CommonVoice, and Earnings-22) using bfloat16 precision on single H100 GPUs. On the English Open ASR benchmark, the high-accuracy regime achieves a 5.58% word error rate (outperforming full autoregressive search) while the high-throughput regime improves the inverse real-time factor by 4.4x with only a 12% relative word error rate increase. Ablations show that combining both CTC confidence gating and LLM verification yields the optimal Pareto frontier, overcoming individual limitations of pure CTC or pure LLM configurations.

## Code

- https://ibm.biz/˜5pwn29DW4

## Applications

Engineers building high-throughput, low-latency automatic speech recognition systems using speech-aware large language models.

## Limitations

The approach requires an SLM with a CTC-trained encoder frozen during projector and LoRA training, is restricted to ASR rather than translation or spoken QA, and requires autoregressive fallback from the failed prefix point when utterance-based verification fails.

## Related

- (link related pages by id as the wiki grows)
