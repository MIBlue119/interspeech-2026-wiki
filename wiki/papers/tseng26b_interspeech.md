---
id: tseng26b_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1686
pdf: https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.pdf
---

# TASTE-Streaming: Towards Streamable Text-Aligned Speech Tokenization and Embedding for Spoken Language Modeling

*Liang-Hsuan Tseng, Hung-yi Lee*

[PDF](https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tseng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1686)

**TL;DR** — TASTE-S is a streamable text-aligned speech tokenization and embedding framework designed for low-latency spoken language modeling, achieving performance parity with non-streamable baselines while cutting encoder real-time factor (RTF) down to 0.002.

## Key contributions

- Integrates a lightweight Connectionist Temporal Classification (CTC) ASR module directly into the speech encoder to facilitate real-time text token extraction without external offline ASR dependencies.
- Redesigns the unit decoder to be fully causal using a chunk-by-chunk interleaving pattern (N:M ratio of 2:5) with CosyVoice 2-derived flow-matching vocoders for streamable reconstruction.
- Implements a two-stage training strategy (Stage I for isolated CTC and supervised upper-bound reconstruction, Stage II for full joint optimization with VQ and CTC predictions) to stabilize performance against ASR errors.
- Adopts Finite Scalar Quantization (FSQ) to achieve high codebook utilization without explicit codebook maintenance, keeping latent embedding dimensions compact (32 to 128) while matching or exceeding reconstruction metrics.

## Problem

Spoken language modeling (SLM) suffers from a modality mismatch where traditional self-supervised or audio codec tokens are far longer and finer-grained than text tokens. While prior text-aligned tokenization approaches like TASTE successfully bridge this length gap to enable seamless joint text-speech modeling with text LLMs, they depend on external non-causal ASR systems and non-causal decoders. This makes them fundamentally unsuited for always-on, instant-response real-time conversational AI applications.

## Method

The TASTE-S Encoder extracts hidden representations from an L-layer ASR encoder initialized from Whisper, passing the final hidden state into a CTC decoder to output predicted text tokens. Simultaneously, shallow and final hidden states, alongside the text tokens, are fed into an Aggregator and a Finite Scalar Quantization (FSQ) module to produce text-aligned speech latent embeddings with reduced embedding dimensions (32, 64, or 128). The TASTE-S Decoder processes these quantized text-aligned embeddings and text tokens using an auto-regressive Unit Decoder and a causal flow-matching Vocoder adapted from CosyVoice 2.

The training pipeline is split into two stages. Stage I trains the CTC decoder independently on oracle transcripts while training the Aggregator and Unit Decoder with oracle text, bypassing the VQ bottleneck to establish an error-free supervision baseline. Stage II enables the full tokenizer pipeline, optimizing a joint cross-entropy reconstruction loss over auto-regressive target units conditioned on CTC-predicted text tokens and quantized text-aligned speech embeddings. During streaming inference, the unit decoder interleaves text-aligned tokens and target units at a 2:5 ratio to enable low-latency chunk-by-chunk speech generation.

The model is trained using the AdamW optimizer with a cosine-decay learning rate scheduler, 2,000 warmup steps, a learning rate of 1e-3 for the CTC decoder and 2e-4 for other submodules, a batch size of 128, and runs for 5 epochs per stage on 2 NVIDIA H100 GPUs.

## Experimental setup

The training set consists of an English subset of Emilia (approx. 400 hours) and the full training set of LibriTTS (approx. 600 hours), with evaluation performed on the LibriSpeech test-clean split. Baselines include conventional codecs (e.g., HiFi-Codec, BigCodec, WavTokenizer, Mimi) and text-aligned/aware systems like TaDiCodec and the original TASTE. Evaluation metrics encompass reconstruction fidelity via Word Error Rate (WER) using a HuBERT-based ASR, UTMOS, Speaker Similarity via TDNN embeddings, Duration Consistency via Montreal Forced Aligner, and streaming efficiency via Real-Time Factor (RTF) and First Chunk Latency (FCL) on a single NVIDIA A100 GPU.

## Results

TASTE-S achieves a Word Error Rate (WER) of 4.1% and UTMOS of 4.11, closely matching or outperforming the original non-streamable TASTE (4.5% WER, 4.24 UTMOS) while dramatically lowering the encoder RTF from 0.117 to 0.002. In bitrate ablation comparisons, setting the bitrate to ~600 bps with an embedding dimension of 128 yields a 3.9% WER, 0.88 Speaker Similarity, and 0.900 Duration Consistency, outperforming TASTE's ~150 bps configuration (4.5% WER, 0.80 Speaker Sim.). Longform evaluations on 87 concatenated audio samples (average duration 223.6 seconds) demonstrate stable performance with a 4.5% WER and an absolute length difference of 0.7% when using a 30-second window size. Where it does not win: conventional high-bitrate codecs like BigCodec achieve higher UTMOS (4.11 vs 4.12) and speaker similarity (0.91 vs 0.88), but do so at vastly higher token frequencies and lack semantic text-alignment.

| System | Bitrate (bps) | ASR | WER (%) | UTMOS | Spkr. Sim. | Enc. RTF |
|---|---|---|---|---|---|---|
| Original Waveform | 256k | N/A | 2.1 | 4.09 | - | - |
| TASTE | ~150 | EXT | 4.5 | 4.24 | 0.80 | 0.117 |
| TASTE-S (no bi-stage) | ~600 | EXT | 10.8 | 4.01 | 0.72 | 0.117 |
| TASTE-S (it) | ~600 | EXT | 4.1 | 4.11 | 0.88 | 0.117 |
| TASTE-S (CTC, joint) | ~600 | CTC | 4.1 | 4.11 | 0.88 | 0.002 |

## Limitations

Evaluations are restricted to English datasets (Emilia subset and LibriTTS/LibriSpeech), leaving multilingual and low-resource robustness unverified. Longform evaluations are limited to concatenated conversational segments rather than natural continuous monologue streams. The model relies on Whisper-initialized encoder components, binding its initial transcription capability and compute footprint to Whisper's architecture.

## Why read this

Speech and ML engineers building real-time, text-aligned spoken language models will find this essential reading for its practical blueprint on eliminating external ASR dependencies and non-causal latency bottlenecks.

## Code

- https://andybi7676.github.io/taste_s_demo

## Applications

Real-time conversational AI agents, low-latency speech-to-speech translation systems, and semantically grounded spoken language assistants.

## Related

- (link related pages by id as the wiki grows)
