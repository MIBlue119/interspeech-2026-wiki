---
id: madha26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-788
pdf: https://www.isca-archive.org/interspeech_2026/madha26_interspeech.pdf
---

# DLLM-TTS: Block Discrete Diffusion Language Model for Text-to-Speech Synthesis

[PDF](https://www.isca-archive.org/interspeech_2026/madha26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/madha26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-788)

**TL;DR** — DLLM-TTS frames text-to-speech as a conditional block discrete diffusion process over neural codec tokens, achieving competitive zero-shot intelligibility and speaker similarity with an RTF of 0.15.

## Problem

Current text-to-speech architectures force a strict compromise: autoregressive codec language models deliver high intelligibility but demand massive training sets (60K to 250K hours) and sequential decoding latencies, whereas non-autoregressive models accelerate generation at the expense of linguistic accuracy and text-speech alignment. This work bridges that gap by introducing a data-efficient paradigm that handles both local acoustic coherence and global alignment without explicit duration models.

## Method

The framework partitions text-to-speech into conditional block discrete diffusion over X-Codec2 neural audio tokens, which utilize a unified semantic-acoustic architecture with a single FSQ codebook of size 6561 at 50 Hz. Sequences are chunked into contiguous blocks of 32 tokens (roughly 0.64 seconds), and a staircase attention mask is applied to enforce bidirectional attention within noised blocks, causal attention across blocks, and causal attention within clean historical blocks. The model architecture uses a 0.6B-parameter transformer initialized from Qwen2 with 28 layers, a hidden dimension of 896, and 14 attention heads. Training follows a two-stage curriculum: 16K hours on the Emilia dataset for 20 epochs, followed by fine-tuning on 4K hours of high-quality synthetic speech. Inference employs confidence-based parallel sampling with a threshold of 0.6 across 16 denoising steps per block.

## Results

Evaluated on the English Seed-TTS-eval benchmark, the 0.6B-parameter model obtains a Word Error Rate (WER) of 2.25, Character Error Rate (CER) of 1.05, Speaker Similarity (SIM) of 0.750, and a Mean Opinion Score (MOS) of 4.25. It achieves these competitive marks while utilizing only 20K hours of training data—representing a 3x to 12x reduction in data requirements compared to standard autoregressive systems—and operates at a real-time factor (RTF) of 0.15.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building zero-shot text-to-speech, voice cloning, and low-latency interactive conversational voice agents.

## Related

- (link related pages by id as the wiki grows)
