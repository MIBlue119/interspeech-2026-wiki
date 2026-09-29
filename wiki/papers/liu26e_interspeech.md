---
id: liu26e_interspeech
category: tts
labels: [streaming-real-time, generative-model]
institutions: ["Xinjiang University", "Tsinghua University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-653
pdf: https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.pdf
---

# CTC-TTS: LLM-Based Dual-Streaming Text-to-Speech with CTC Alignment

*Hanwen Liu, Saierdaer Yusuyin, Hao Huang, Zhijian Ou*

[PDF](https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-653)

**Category:** `tts` · **Labels:** `streaming-real-time`, `generative-model`

**TL;DR** — CTC-TTS is a dual-streaming text-to-speech model that replaces heavy GMM-HMM forced-alignment pipelines with a lightweight CTC-based aligner and introduces a bi-word interleaving strategy. It achieves lower error rates and competitive naturalness compared to fixed-ratio and MFA-based baselines across streaming and zero-shot tasks.

## Key contributions

- A lightweight CTC-based phoneme-speech alignment procedure that eliminates the pipeline-heavy GMM-HMM forced alignment (e.g., Montreal Forced Aligner).
- A bi-word interleaving strategy with compact look-ahead that groups current-word phonemes, separators, next-word phonemes, and current-word speech tokens.
- CTC-TTS-L variant which concatenates tokens along the sequence length dimension for higher synthesis quality.
- CTC-TTS-F variant which stacks text and speech embeddings along the feature dimension to reduce first-packet latency.

## Problem

Large language model-based TTS systems usually require accurate text-speech alignment and proper training sequences for low-latency dual-streaming synthesis. Prior methods rely heavily on GMM-HMM forced-alignment pipelines like MFA, which are complex and inflexible, or use fixed-ratio token interleaving that fails to capture natural text-speech alignment regularities. Advanced alignment-aware interleaving strategies like ELLA-V rely on MFA and suboptimal sequence organizations, leading to high error rates and limited generalization out-of-domain.

## Method

The system first converts text into IPA phonemes using Phonetisaurus and obtains frame-level posterior distributions using a pre-trained monolingual Whistle ASR model (115M parameters). The Viterbi algorithm determines the maximum-probability CTC alignment path, where blank labels are merged into their first subsequent phoneme. Since the ASR model operates at 25 fps and the WavTokenizer neural audio codec produces 75 tokens per second (a 1:3 ratio), each phoneme is mapped to three corresponding discrete speech tokens.

For sequence organization, the method constructs bi-word blocks consisting of current-word phonemes, word separators/punctuation, next-word phonemes, and current-word speech tokens, terminated by an <eob> token. CTC-TTS-L concatenates these tokens along the sequence length dimension. CTC-TTS-F pads the phoneme sequence to match the speech token length and stacks text and speech embeddings along the feature dimension using an all-zero tensor for initialization, allowing generation to begin immediately from the first phoneme.

The core model is a decoder-only Transformer trained by minimizing standard cross-entropy loss over speech tokens and the block-terminator symbol. Single-speaker models use 4 decoder layers, 12 attention heads, 768 embedding dimension, and 3072 feed-forward dimension, while multi-speaker configurations scale to 12 decoder layers, 16 attention heads, 1024 embedding dimension, and 4096 feed-forward dimension. Inference uses KV-Caching and chunked speech generation.

## Experimental setup

Experiments use the VoiceAssistant400K single-speaker dataset (1750 hours training) and the 960-hour LibriSpeech dataset for multi-speaker zero-shot tasks. Baselines include LLMVox, ELLA-V, and various ablation combinations of MFA versus CTC alignment and bi-word versus ELLA-V interleaving. Evaluation metrics include Word Error Rate (WER), Character Error Rate (CER), First-Packet Latency (FPL-A), UTMOS, speaker similarity (SPK), and subjective Mean Opinion Score (MOS/SMOS). Models are trained on 4 RTX 3090 GPUs using the AdamW optimizer and a cosine learning rate scheduler with warm-up to 3e-4 over up to 1M steps.

## Results

In single-speaker streaming tests, CTC-TTS-F achieves a WER of 1.80% and an FPL-A of 159 ms, outperforming LLMVox (2.40% WER, 167 ms FPL-A), while CTC-TTS-L achieves the lowest WER of 1.50% and CER of 0.79% with a higher latency of 210 ms. In multi-speaker zero-shot continuation tasks, CTC-TTS-L obtains a 4.82% WER and 4.33 MOS, outperforming MFA+bi-word (5.14% WER, 4.25 MOS) and CTC+ELLA-V (12.01% WER). In cross-speaker evaluations, CTC-TTS-L maintains superior intelligibility with a 6.33% WER compared to 34.89% for MFA+ELLA-V, demonstrating that CTC alignment generalizes better to out-of-domain evaluation.

| System | WER% ↓ | CER% ↓ | FPL-A ↓ | UTMOS ↑ |
|---|---|---|---|---|
| LLMVox | 2.40 | 1.36 | 167 | 4.15 |
| CTC-TTS-F | 1.80 | 1.04 | 159 | 4.15 |
| CTC-TTS-L | 1.50 | 0.79 | 210 | 4.15 |

## Limitations

The evaluation is restricted to English datasets and monolingual settings (LibriSpeech and VoiceAssistant400K). The framework relies on external G2P tools and a pre-trained ASR-based CTC model rather than an end-to-end neural aligner. Multi-speaker performance degrades slightly in out-of-domain cross-speaker conditions compared to in-domain continuation.

## Why read this

Speech researchers and engineers building real-time, low-latency streaming TTS systems should read this paper to learn how to replace fragile, pipeline-heavy GMM-HMM forced aligners with simple CTC-based alignment and bi-word sequence designs.

## Code

- https://github.com/thu-spmi/CTC-TTS

## Applications

Real-time conversational voice assistants, streaming text-to-speech services, and zero-shot voice cloning applications.

## Institutions / 機構

Xinjiang University, Tsinghua University

**Funding / 經費:** National Natural Science Foundation of China

## Related

- (link related pages by id as the wiki grows)
