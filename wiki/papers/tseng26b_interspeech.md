---
id: tseng26b_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1686
pdf: https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.pdf
---

# TASTE-Streaming: Towards Streamable Text-Aligned Speech Tokenization and Embedding for Spoken Language Modeling

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1686)

**TL;DR** — TASTE-S extends the text-aligned speech tokenization and embedding framework with a built-in CTC ASR and causal decoder, achieving real-time streaming speech reconstruction with competitive WER and substantially lower latency.

## Problem

Joint text-speech spoken language modeling suffers from a severe length mismatch between fine-grained speech units and coarse text tokens. Although prior text-aligned tokenizers like TASTE successfully bridge this gap, they rely on external offline ASR systems and non-causal decoders, rendering them unsuitable for low-latency, real-time conversational streaming applications.

## Method

TASTE-S integrates a lightweight CTC-based ASR module into a Whisper-initialized encoder to generate immediate text tokens via an aggregator and FSQ quantization (using embedding dimensions of 32 to 128). The unit decoder (derived from CosyVoice 2) and vocoder are redesigned to be fully causal, processing speech chunk-by-chunk using an interleaved N:M ratio of text-aligned tokens to target units. It employs a two-stage training strategy: Stage I trains the CTC decoder independently and optimizes the aggregator/decoder with oracle transcripts and bypassed VQ, while Stage II jointly optimizes the full tokenizer using CTC predictions.

## Results

Evaluated on LibriSpeech test-clean (trained on ~400 hours of Emilia and ~600 hours of LibriTTS), TASTE-S achieves a 4.1% WER, 4.13 UTMOS, 0.86 speaker similarity, and 0.857 duration consistency at ~150 bps. It matches or outperforms the non-streamable TASTE baseline while drastically reducing encoding and decoding RTF. Ablations show that TASTE-S remains robust to transcript imperfections and successfully scales up to long-form streaming encoding and decoding with strong temporal consistency.

## Code

- https://andybi7676.github.io/taste_s_demo

## Applications

Speech and ML engineers building real-time, responsive spoken language models, conversational AI agents, and streaming speech-to-speech translation systems.

## Limitations

WER is slightly higher on long-form audio compared to the non-streamable TASTE baseline when relying on built-in CTC predictions.

## Related

- (link related pages by id as the wiki grows)
