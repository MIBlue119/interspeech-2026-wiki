---
id: madha26_interspeech
category: tts
labels: [generative-model]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-788
pdf: https://www.isca-archive.org/interspeech_2026/madha26_interspeech.pdf
---

# DLLM-TTS: Block Discrete Diffusion Language Model for Text-to-Speech Synthesis

*Wasim Madha, Nityanand Mathur, Hamees Sayed, Apoorv Singh, Sameer Khurana, Akshat Mandloi, Sudarshan Kamath*

[PDF](https://www.isca-archive.org/interspeech_2026/madha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/madha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-788)

**Category:** `tts` · **Labels:** `generative-model`

**TL;DR** — DLLM-TTS frames text-to-speech synthesis as conditional block discrete diffusion over X-Codec2 neural audio codec tokens, combining parallel intra-block generation with sequential inter-block dependencies. A 0.6B-parameter model trained on 20K hours achieves competitive performance on the Seed-TTS benchmark with a real-time factor of 0.15.

## Key contributions

- First application of block discrete diffusion to conditional speech generation, modeling TTS as masked token reconstruction over discrete codec tokens with block decomposition.
- Employs staircase attention to jointly capture local acoustic coherence within blocks and global text-speech alignment across blocks without explicit duration modeling.
- Achieves competitive intelligibility on the Seed-TTS benchmark using only 20K hours of data, providing a 3–12x reduction in training data compared to standard autoregressive systems.
- A 0.6B-parameter model achieves a real-time factor (RTF) of 0.15 with strong zero-shot speaker similarity.

## Problem

Current text-to-speech models force a difficult choice between autoregressive codec language models and non-autoregressive approaches. Autoregressive models like VALL-E or LLASA deliver high intelligibility and zero-shot voice cloning but demand 60K–250K hours of training data and suffer from high decoding latency due to sequential token generation. Conversely, non-autoregressive methods like flow matching or standard diffusion enable fast parallel generation but typically require complex explicit duration modeling or frame-aligned annotations, making them prone to word skipping and repetition errors. This paper addresses the gap by adapting discrete diffusion to handle the dual requirements of local acoustic coherence and global text-speech alignment over discrete neural codec tokens.

## Method

The architecture is built on a 0.6B-parameter transformer initialized from Qwen2 with 28 layers, a hidden dimension of 896, 14 attention heads, and a maximum sequence length of 2048 tokens. Text tokens from the Qwen tokenizer (vocab size 151,936) and X-Codec2 tokens (Finite Scalar Quantization, vocabulary size |V| = 6,561, frame rate 50 Hz) are mapped to a shared dimension via separate embedding layers. X-Codec2 compresses audio into a single semantic-acoustic token stream at 50 Hz, eliminating multi-codebook streams.

The framework divides codec token sequences into contiguous blocks of size B = 32 tokens (approximately 0.64 seconds). The forward diffusion process corrupts tokens independently within each target block using a linear schedule alpha_t = 1 - t by replacing tokens with a [MASK] token. The reverse process is trained via cross-entropy loss over masked positions using a specialized staircase attention mask. This mask enforces three conditions: bidirectional attention within noised blocks for local acoustic coherence, causal attention from noised blocks to previous clean blocks for sequential context, and causal attention within clean blocks. An explicit EOS token handles variable-length outputs without duration predictors.

During inference, the model generates speech through sequential block-by-block diffusion decoding using confidence-based sampling. At each of the T denoising steps per block (default T = 16 or 32), token distributions are predicted, and positions exceeding a confidence threshold of tau = 0.6 are unmasked and fixed. Early stopping triggers if all positions in a block are unmasked early. The system utilizes KV caching across blocks and a reference-and-generation prompt paradigm (3-5 seconds of reference codec tokens and transcript) for zero-shot speaker adaptation, achieving an RTF of 0.15.

## Experimental setup

The model is trained on a two-stage curriculum: Stage 1 uses 16K hours sampled from the Emilia dataset for 20 epochs, and Stage 2 fine-tunes on 4K hours of high-quality synthetic speech (totaling 20K hours). Training uses the AdamW optimizer with a learning rate of 1e-4, a cosine schedule with 1% warmup, and an effective batch size of 128 across 8 H100 GPUs. Evaluation is performed on the zero-shot Seed-TTS-eval benchmark (English subset) using Word Error Rate (WER) and Character Error Rate (CER) via Whisper-large-v3, Speaker Similarity (SIM) via WavLM-TDNN cosine similarity, and Mean Opinion Score (MOS) collected from 25 listeners under the CodecMOS-Accent protocol.

## Results

DLLM-TTS achieves a WER of 2.25%, a CER of 1.05%, a speaker similarity (SIM) of 0.750, and a MOS of 4.25 on the Seed-TTS-eval benchmark using its 0.6B-parameter layout. This positions it competitively against much larger autoregressive baselines like LLASA-3B (WER 3.14, SIM 0.579, MOS 4.28) and Qwen2.5-Omni 7B (WER 2.72, SIM 0.632, MOS 3.85), while matching or exceeding non-autoregressive alternatives like F5-TTS (WER 2.00, SIM 0.670, MOS 4.05) and MaskGCT (WER 2.62, SIM 0.717, MOS 3.76).

Ablations on denoising steps T (at block size B = 32) show that T = 32 yields the best intelligibility (WER 2.25%, CER 1.05%), whereas T = 16 offers an optimal speed-quality balance with an RTF of 0.15. Too few steps (T = 8) or excessive steps (T = 64) degrade performance severely (WER 14.58% and 8.83% respectively). Ablations on block size B (at T = B) demonstrate that B = 32 achieves superior results (WER 2.25%, CER 1.05%, SIM 0.750) compared to smaller blocks like B = 8 (WER 4.19%) or B = 16 (WER 3.04%), as smaller blocks restrict parallel context and excessively large blocks weaken cross-block conditioning.

| System | Params | WER ↓ | CER ↓ | SIM ↑ | MOS ↑ |
|---|---|---|---|---|---|
| LLASA-3B | 3B | 3.14 | 1.59 | 0.579 | 4.28 |
| Qwen2.5-Omni | 7B | 2.72 | 1.70 | 0.632 | 3.85 |
| F5-TTS | 0.3B | 2.00 | 1.53 | 0.670 | 4.05 |
| DiTAR | 0.6B | 1.69 | 1.02 | 0.735 | 4.20 |
| OpenAudio-s1-mini | 0.5B | 1.94 | 1.18 | 0.550 | 4.29 |
| DLLM-TTS (Ours) | 0.6B | 2.25 | 1.05 | 0.750 | 4.25 |

## Limitations

The evaluation is restricted to the English subset of the Seed-TTS-eval benchmark, leaving multilingual capabilities and cross-lingual transfer unverified in this text. The approach relies heavily on the quality and single-stage tokenization properties of X-Codec2, meaning any acoustic artifacts or bottlenecks present in the underlying neural audio codec directly upper-bound the synthetic speech quality. Furthermore, while data efficiency is improved relative to massive autoregressive models, the model still requires 20K hours of curated audio training data.

## Why read this

Speech and ML researchers working on generative audio models should read this paper to understand how block discrete diffusion can replace autoregressive token decoding for high-throughput, data-efficient TTS without explicit duration modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time conversational agents, streaming text-to-speech services, and zero-shot voice cloning applications requiring low latency and high intelligibility.

## Institutions / 機構

Smallest.ai

## Related

- (link related pages by id as the wiki grows)
