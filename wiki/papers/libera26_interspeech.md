---
id: libera26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, streaming-real-time, generative-model]
institutions: ["Concordia University", "Mila-Quebec AI Institute", "Universite Laval"]
code: https://lucadellalib.github.io/wavslm-web/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2803
pdf: https://www.isca-archive.org/interspeech_2026/libera26_interspeech.pdf
---

# WavSLM: Single-Stream Speech Language Modeling via WavLM Distillation

*Luca Della Libera, Cem Subakan, Mirco Ravanelli*

[PDF](https://www.isca-archive.org/interspeech_2026/libera26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/libera26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2803)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `streaming-real-time`, `generative-model`

**TL;DR** — WavSLM is a single-stream speech language model that distills WavLM representations into a single discrete codebook via a streamable neural codec, achieving competitive acoustic-semantic modeling and generation without text supervision or text-pretrained foundations.

## Key contributions

- Introduces the first speech language model that jointly captures semantic and acoustic information using a single codebook without hierarchical, multi-stream tokenization or text supervision.
- Repurposes upper layers (7-24) of WavLM-large as an autoregressive language modeling backbone initialized purely from speech representations.
- Employs a next-chunk prediction objective (chunk size C = 4) and causal sliding-window attention to support real-time streaming inference at 58x RTF.
- Performs a comprehensive evaluation showing that a 305M-370M parameter model trained on 60k hours of speech matches or outperforms multi-billion-parameter text-pretrained baselines.

## Problem

Modern speech language models (SLMs) increasingly rely on text supervision, multi-stream hierarchies, or text-pretrained LLM backbones (e.g., LLaMA, Qwen) to handle the high-dimensional, entangled nature of speech. While these hybrid architectures achieve strong results, they depart from the simple, single-stream generative pretraining paradigm that has made text LLMs so scalable and efficient. Scaling these complex systems requires massive computational footprints and multi-million hour datasets. This work addresses whether expressive speech-only representations can enable high-performance single-stream language modeling without architectural bloat or text pretraining.

## Method

WavSLM builds on intermediate representations (6th transformer layer) of WavLM-large, which balance low-level acoustic cues and higher-level semantics. It interfaces with these features via FocalCodec-Stream, a causal, streamable neural codec consisting of a causal WavLM-6 encoder, a causal compressor based on focal modulation, and a single-codebook binary spherical quantizer producing a 50 Hz discrete token stream. A mirrored causal decompressor with a chunk-wise feed-forward refiner reconstructs continuous features compatible with the upper layers of WavLM, while a causal WaveNeXt decoder handles raw waveform resynthesis.

The remaining layers (7-24) of WavLM are made causal via an attention mask and fine-tuned as an SLM with a lightweight linear language modeling head. The system uses a next-chunk prediction objective where the model predicts chunks of C = 4 consecutive tokens at each step, implementing chunked causal attention (full attention within chunks, causal masking across chunks). This reduces autoregressive steps and aligns with the codec's temporal resolution. For continuous streaming inference, sliding-window attention restricts each step to a fixed history window (default 512 tokens), ensuring constant memory and latency.

## Experimental setup

Trained on Libri-Light (~60k hours of unlabeled speech) and validated on LibriSpeech dev-clean. Three variants are evaluated based on vocabulary sizes: WavSLM-2k (305M params, 2k codebook), WavSLM-4k (307M params, 4k codebook), and WavSLM-65k (370M params, 65k codebook). Compared against large-scale text-pretrained baselines (TWIST 1.3B/7B, SpiRit LM 7B, Moshi 7.7B, LLaMA-Mimi 1.3B/8B) and smaller data-matched Qwen-initialized baselines (~357M params). Evaluated via likelihood metrics (SALMon sentiment/speaker/gender consistency, ZeroSpeech sWUGGY/sBLiMP, Topic Story-Cloze) and generation metrics (UTMOS, speaker similarity, GPT-2 perplexity, Real-Time Factor). Trained with AdamW (lr 1e-4, weight decay 0.01, batch size 16) on a single NVIDIA H100 80GB GPU.

## Results

WavSLM-4k achieves an average likelihood benchmark score of 69.5, tying or outperforming multi-billion parameter text-pretrained models like LLaMA-Mimi 8B (69.5) and SpiRit LM Expressive (69.4), while using a fraction of the parameters and zero text data. Specifically, WavSLM-4k scores 88.5 on speaker consistency and 90.5 on gender consistency. In generation tasks, WavSLM-2k attains a top UTMOS score of 3.72 (surpassing LLaMA-Mimi 8B's 3.56) and a speaker similarity of 91.8, while operating at ~5.8 real-time factor (RTF), significantly faster than LLaMA-Mimi 8B (1.1 RTF). 

However, WavSLM does not win on linguistic perplexity (PPL), where text-pretrained models like LLaMA-Mimi 8B achieve lower PPL (122 vs 161-210), reflecting a gap in deep lexical/syntactic modeling due to the lack of text pretraining. Ablations show that increasing the attention window from 512 to 2048 tokens improves tSC and perplexity without hurting acoustic metrics, whereas increasing chunk size from 4 to 8 or 16 drastically degrades UTMOS (from 3.69 down to 1.97) and generation quality.

| System/Condition | Params | Text Pretrained | Codebooks | Avg (Likelihood) | UTMOS ↑ | Sim ↑ | RTF ↑ |
|---|---|---|---|---|---|---|---|
| LLaMA-Mimi 1.3B | 1.3B | Yes | 4 × 2048 | 69.0 | 3.57 | 91.3 | 2.0 |
| LLaMA-Mimi 8B | 8.0B | Yes | 4 × 2048 | 69.5 | 3.56 | 91.5 | 1.1 |
| WavSLM-2k | 305M | No | 1 × 2048 | 68.3 | 3.72 | 91.8 | 5.9 |
| WavSLM-4k | 307M | No | 1 × 4096 | 69.5 | 3.69 | 91.6 | 5.8 |
| WavSLM-65k | 370M | No | 1 × 65536 | 66.5 | 3.66 | 91.3 | 5.8 |

## Limitations

Evaluated exclusively on English speech data (Libri-Light/LibriSpeech), leaving multilingual generalization untested. The model struggles with extremely large codebooks (e.g., 65k vocabulary size performed worse, indicating data starvation for large discrete spaces without extensive scaling). Lacks deep text comprehension and reasoning capabilities compared to text-pretrained SLMs, showing higher perplexity on generated transcriptions.

## Why read this

Read this paper if you want to understand how to design efficient, single-stream speech language models without relying on heavy text-pretrained backbones or complex multi-codebook hierarchies.

## Code

- https://lucadellalib.github.io/wavslm-web/

## Applications

Real-time speech-to-speech translation, streaming conversational assistants, low-latency audio generation.

## Institutions / 機構

Concordia University, Mila-Quebec AI Institute, Universite Laval

**Funding / 經費:** Natural Sciences and Engineering Research Council of Canada, Digital Research Alliance of Canada, Translated, Apple

## Related

- (link related pages by id as the wiki grows)
