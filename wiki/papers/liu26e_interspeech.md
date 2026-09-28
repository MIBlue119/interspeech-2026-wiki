---
id: liu26e_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-653
pdf: https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.pdf
---

# CTC-TTS: LLM-Based Dual-Streaming Text-to-Speech with CTC Alignment

[PDF](https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/liu26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-653)

**TL;DR** — CTC-TTS replaces heavy GMM-HMM forced aligners with a lightweight CTC-based alignment module and bi-word interleaving to achieve low-latency dual-streaming text-to-speech.

## Problem

Large-language-model-based text-to-speech systems often struggle with low-latency dual-streaming synthesis because fixed-ratio interleaving fails to capture true text-speech alignment regularities. Meanwhile, existing alignment-aware methods heavily depend on pipeline-heavy GMM-HMM forced-alignment toolkits like MFA, which lack flexibility and complicate training pipelines.

## Method

The proposed CTC-TTS framework utilizes a monolingual Conformer-based ASR model with weak phonetic supervision to obtain frame-level CTC alignments, mapping phonemes to neural audio codec tokens via Viterbi decoding. It introduces a bi-word interleaving strategy that bundles the current word's phonemes, a word separator, the next word's phonemes, and the current word's speech tokens. Two variants are developed: CTC-TTS-L, which concatenates text and speech tokens along the sequence length dimension for higher generation quality, and CTC-TTS-F, which stacks phoneme and speech embeddings along the feature dimension to enable immediate streaming from the first phoneme. The core architecture relies on a decoder-only Transformer with 12 layers, 1024 embedding dimension, and 4096 feed-forward dimension, trained via cross-entropy loss over discrete audio codes.

## Results

Evaluated on the single-speaker VoiceAssistant400K dataset and multi-speaker LibriSpeech/Seed-TTS benchmarks, CTC-TTS outperforms LLMVox and ELLA-V baselines in streaming synthesis and zero-shot tasks. On single-speaker tests, CTC-TTS-F reduces WER to 1.80% and CER to 1.04% while achieving a lower first-packet latency (159 ms) compared to length concatenation (210 ms). Ablation studies demonstrate that combining CTC alignment with bi-word interleaving surpasses traditional MFA-based approaches and alternative interleaving designs in intelligibility and naturalness.

## Code

- https://github.com/thu-spmi/CTC-TTS

## Applications

Speech and ML engineers building real-time interactive voice assistants, conversational agents, and low-latency dual-streaming text-to-speech systems.

## Limitations

The current alignment and interleaving strategy relies on phonemes derived from G2P systems and is evaluated primarily on English corpora.

## Related

- (link related pages by id as the wiki grows)
