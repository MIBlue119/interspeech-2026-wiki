---
id: libera26_interspeech
category: speech-llm
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2803
pdf: https://www.isca-archive.org/interspeech_2026/libera26_interspeech.pdf
---

# WavSLM: Single-Stream Speech Language Modeling via WavLM Distillation

[PDF](https://www.isca-archive.org/interspeech_2026/libera26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/libera26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2803)

**TL;DR** — WavSLM is a single-stream speech language model trained by quantizing and distilling WavLM representations without text supervision, achieving competitive consistency and generation performance with only 305M-370M parameters.

## Problem

Most existing speech language models rely on text supervision, multi-stream tokenization, or complex hybrid architectures that deviate from the single-stream generative pretraining paradigm proven in text. Extending text-style language modeling to speech is difficult due to the entanglement of semantic, prosodic, and acoustic information, and current systems typically require massive scaling and computational complexity to compensate. WavSLM addresses this gap by isolating the role of the representation itself within a streamlined, single-decoder architecture.

## Method

WavSLM leverages mid-level (layer 6) representations from WavLM-large, tokenized via FocalCodec-Stream into a single codebook of discrete tokens at 50 Hz using a causal binary spherical quantizer and focal modulation compressor. The remaining layers (7-24) of WavLM are repurposed as an autoregressive speech language model backbone by applying causal attention and a lightweight language modeling head. The model is trained purely on speech using a next-chunk prediction objective with a chunk size of C = 4 tokens (80 ms streaming latency), predicting a chunk of consecutive tokens at each step. Variants are trained with vocabulary sizes of 2k, 4k, and 65k on the Libri-Light dataset (around 60k hours) using an AdamW optimizer on a single NVIDIA H100 GPU.

## Results

Evaluated on LibriSpeech dev-clean and benchmarks including SALMon and ZeroSpeech, WavSLM variants (WavSLM-2k, WavSLM-4k, WavSLM-65k) with 305M to 370M parameters match or outperform much larger baseline models like LLaMA-Mimi (1.3B-8B) and SpiRit LM (7B). On generation metrics, WavSLM-2k achieves an average UTMOS score of 3.72 and speaker similarity (Sim) of 91.8%, compared to LLaMA-Mimi 1.3B's UTMOS of 3.57 and Sim of 91.3%. On likelihood-based semantic tasks like sWUGGY and sBLiMP, WavSLM attains strong consistency scores (e.g., sWUGGY accuracy up to 88.5%) while operating with a real-time factor (RTF) around 5.8.

## Code

- https://lucadellalib.github.io/wavslm-web/

## Applications

Engineers building real-time, streaming speech-to-speech dialogue systems, voice assistants, or continuous audio generation pipelines without text pretraining or multi-stream supervision dependencies.

## Limitations

The paper does not explicitly state major limitations or out-of-scope boundaries beyond evaluating primarily on English benchmark sets like LibriSpeech and Libri-Light.

## Related

- (link related pages by id as the wiki grows)
