---
id: grinberg26_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-759
pdf: https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.pdf
---

# ALARM: Audio–Language Alignment for Reasoning Models

*Petr Grinberg, Hassan Shahmohammadi*

[PDF](https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/grinberg26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-759)

**TL;DR** — ALARM is a 4B-parameter audio-language model (ALM) that adapts reasoning LLMs for multimodal audio understanding using a two-stage self-rephrasing target generation pipeline and a multi-encoder fusion strategy. It ranks third on MMSU and achieves top open-source performance on MMAU-speech while keeping the LLM backbone frozen to prevent catastrophic forgetting.

## Key contributions

- Constructed a 6M-instance multitask corpus (2.5M unique prompts, 19K hours spanning speech, music, and general sound) using Qwen3-30B for rigorous prompt filtering and alignment.
- Proposed a two-stage self-rephrasing mechanism for reasoning LLMs (RLMs) that converts metadata into natural audio-understanding variants, avoiding textual-input leakage and output distribution shift.
- Eliminated reliance on explicit ASR modules by fusing four domain-specific audio encoders (Whisper, W2V-BERT-2.0, MuQ, SSLAM) via cross-attention (ALARM-CA), Perceiver compression (ALARM-P), or inference-time ensembling (ALARM-E).
- Achieved top-tier open-source results on MMAU-speech and MMSU benchmarks with a 4B parameter model, outperforming much larger models while preserving text MMLU performance.

## Problem

Integrating audio into state-of-the-art reasoning LLMs (RLMs) fails with standard self-generation techniques because the model's built-in chain-of-thought traces expose the underlying text format, producing unnatural responses during inference. Furthermore, relying on a single ASR encoder like Whisper introduces noise from irrelevant speech or VAD errors in non-speech audio, while fine-tuning the LLM backbone causes catastrophic forgetting of textual capabilities.

## Method

The ALARM framework builds upon a frozen 4B-parameter reasoning LLM backbone (Qwen3-4B-Thinking-2507) and pairs it with four frozen audio encoders: Whisper (speech), W2V-BERT-2.0 (rich auditory cues), MuQ (music), and SSLAM (general environmental sound). Multi-layer hidden states from each encoder are aggregated via learnable scalar parameters and compressed/adapted to lower token rates (25 Hz or 50 Hz). To handle multi-encoder fusion, the authors introduce three designs: ALARM-CA (sequential 2-layer cross-attention blocks across Whisper -> W2V-BERT-2.0 -> MuQ -> SSLAM), ALARM-P (Perceiver modules with 20 latent queries compressing auxiliary encoders into a short prefix appended to Whisper), and ALARM-E (an inference-time ensemble concatenating ALARM-CA outputs at 25 Hz with raw Whisper adapted features at 25 Hz into a 50 Hz stream under guided instructional prompts).

The dataset construction pipeline utilizes Qwen3-30B-A3B-Instruct-2507-FP8 to generate prompts from dataset metadata, filters out prompts requiring absent information or exposing text cues, and generates initial responses R0. A two-stage self-rephrasing method then prompts the frozen Qwen3-4B backbone to rewrite R0 into an audio-grounded style using a thinking budget of B = 1536 tokens. The models are trained using cross-entropy loss with continuous separation vectors around the audio embeddings, keeping the RLM backbone entirely frozen.

## Experimental setup

Evaluated on the MMSU benchmark (5000 samples across 47 tasks), MMAU v05.15.25 (27 expert-level tasks), MMAR (1000 graduate-level samples), and AIR-Bench (19 tasks). Training data consists of a 6M-instance corpus (17.03K training hours after splits) covering speech, music, and sound datasets (e.g., LibriSpeech, AudioSet, Clotho, GTZAN). Models are trained for 2 epochs on 4 NVIDIA H200 GPUs using the AdamW optimizer, a maximum learning rate of 1e-4 with cosine annealing, 1500 warmup steps, and an effective batch size of 64.

## Results

The 4B ALARM-E model achieves an overall MMSU score of 61.3% (45.4% perception, 78.3% reasoning), outperforming Gemini-1.5-Pro and ranking third overall behind MiMo-Audio. On the MMAU benchmark, ALARM-E achieves top open-source performance on MMAU-speech with 77.2% (test-mini) and 73.7% (test), surpassing DeSTA-2.5-Audio by 5.7% on test-mini. Textual capabilities are completely preserved, maintaining a 74.0 MMLU-Pro score compared to 74.0 for the base text-only Qwen3-4B-Thinking model, whereas full fine-tuning baselines typically degrade on text tasks.

| System | MMSU Perception | MMSU Reasoning | MMSU Overall | MMAU-Speech (Test-mini) |
|---|---|---|---|---|
| GPT-4o Audio | 39.7 | 71.2 | 56.4 | 66.7 |
| Qwen2.5-Omni (7B) | 42.5 | 79.8 | 60.6 | 70.6 |
| Phi-4-Multimodal (4B) | 33.4 | 57.6 | 45.0 | 67.2 |
| ALARM-CA (4B) | 39.6 | 68.3 | 53.5 | 60.1 |
| ALARM-P (4B) | 38.4 | 74.2 | 55.8 | 68.8 |
| ALARM-E (4B) | 45.4 | 78.3 | 61.3 | 77.2 |

## Limitations

Although ALARM avoids full LLM fine-tuning, it requires managing four separate large audio encoders simultaneously during feature extraction, increasing memory overhead during inference preprocessing. The self-rephrasing pipeline relies heavily on the quality and reasoning capacity of the auxiliary prompt generator (Qwen3-30B), which may propagate subtle stylistic hallucinations if metadata descriptions are impoverished. Language coverage and task complexity remain bounded by the underlying metadata available in public speech and audio corpora.

## Why read this

Researchers building audio-language models with reasoning or chain-of-thought capabilities should read this to learn how to adapt frozen LLMs via multi-encoder fusion and self-rephrasing without incurring catastrophic forgetting on text tasks.

## Code

- https://github.com/Blinorot/ALARM

## Applications

Multimodal voice assistants, automated medical diagnostic transcription analysis, complex environmental acoustic scene monitoring, and general multimedia content captioning.

## Related

- (link related pages by id as the wiki grows)
