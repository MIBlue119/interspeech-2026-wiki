---
id: sannigrahi26_interspeech
category: speech-llm-dialogue
labels: [efficient-on-device]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2753
pdf: https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.pdf
---

# AdaTS: Adaptive Token Sampling for Efficient Speech Language Models

*Sonal Sannigrahi, Giuseppe Attanasio, André F. T. Martins*

[PDF](https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/sannigrahi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2753)

**Category:** `speech-llm-dialogue` · **Labels:** `efficient-on-device`

**TL;DR** — AdaTS is an adaptive, parameter-free token sampling method for speech language models that merges temporally redundant speech tokens using pairwise cosine similarity. It achieves an average 2x token compression rate and reduces inference compute by roughly 34-40% while outperforming uniform downsampling across ASR, SQA, and speech translation tasks.

## Key contributions

- Proposes a score-and-merge dynamic sampling mechanism operating on pretrained speech encoder outputs based on pairwise token cosine similarity.
- Formulates a weighted average merging strategy that outperforms uniform averaging and top-1 pruning by weighting tokens inversely to their similarity.
- Demonstrates that applying the sampling module strictly during the instruction-tuning (IT) stage—while keeping modality alignment (MA) uncompressed—is vital for downstream performance.
- Achieves competitive or superior performance compared to much larger baseline models (e.g., FLS-7B) using a modest 1.5B parameter decoder (Qwen2.5 1.5B).

## Problem

Modern speech language models (SLMs) process thousands of audio tokens per minute due to high-frequency frame encoders (50 Hz or finer), hitting the effective context length limits of LLMs quickly due to the quadratic complexity of self-attention. Furthermore, speech sequences are highly redundant, with less than 50% of tokens actually attended to by the models. Prior approaches rely either on static, indiscriminate subsampling (like convolutional pooling) or window-level Q-formers (WLQF) and CTC-based iterative fusion (like FastLongSpeech/FLS), which either squeeze content-critical and redundant regions uniformly or require massive 7B+ decoder backbones to maintain performance.

## Method

AdaTS is built on a two-stage training pipeline comprising a modality alignment (MA) stage and an instruction-tuning (IT) stage. The speech encoder (Wav2Vec2Bert) takes 80-dimensional Mel-filterbank frames and generates high-dimensional feature vectors A = [a_1, a_2, ..., a_n]. In the sampling module, pairwise cosine similarities are computed between consecutive tokens. Subgroups of tokens where sim(a_i, a_j) > t (with threshold t set between 0.7 and 0.9, optimally 0.85) are merged into a single representative token a_merged.

a_merged is computed as the normalized, weighted sum of each element in the subgroup, where weights are the inverse of the pairwise similarities, giving higher weights to more dissimilar units. During the first training stage (MA), the linear multi-layer perceptron (MLP) projector aligns the frozen speech encoder and frozen text decoder using full uncompressed sequences with ASR data. In the second stage (IT), the sampling module is activated, the LLM decoder (e.g., Qwen2.5 1.5B) is fully fine-tuned on a mix of ASR, SQA, and speech translation tasks, and sequence lengths are dynamically compressed.

Inference uses zero-shot prompting with beam search (beam size 3, repetition penalty 1.6, up to 1024 tokens) conditioned on task-specific tags (<|transcribe|>, <|translate|>, <|reply|>), cutting inference computation down to 2.14 TFLOPS for a 10-second audio clip compared to 3.23 TFLOPS for standard convolutional downsampling.

## Experimental setup

The model uses Wav2Vec2Bert as the fixed speech encoder and Qwen2.5 1.5B (alongside Llama 3.2 1B and EuroLLM 1.7B for architecture comparisons) as the text decoder. Training utilizes ~80K hours of CC-BY licensed data spanning LibriSpeech, VoxPopuli, CommonVoice 16.1, People's Speech, GigaSpeech, MLS, CoVoST-2, Spite, SpokenSQuAD, SLUE SQA-5, and LibriSQA. Training runs on 4 H100 GPUs using AdamW optimizer (learning rates: 6e-6 for encoder, 2e-5 for decoder, 2e-4 for adapter; beta1=0.9, beta2=0.95), bfloat16 mixed precision, 20 warmup steps, 128 gradient accumulation steps, and a cosine scheduler for 4 days. Evaluation metrics include Word Error Rate (WER) for ASR (LibriSpeech, VoxPopuli, FLEURS), COMET-22 for speech translation (FLEURS en->xx), F1 accuracy for SpokenSQuAD, frame-F1 for SLUE SQA-5, and LLM-as-a-judge scoring on LongSpeechEval.

## Results

AdaTS with Qwen2.5 1.5B achieves superior or highly competitive accuracy while reducing token footprint by an average of 2x (reaching up to 4x compression depending on the dataset). On LibriSpeech Clean ASR, the weighted-average AdaTS model achieves a WER of 2.9, tying or beating baselines like Pooling (5.3) and WLQF (3.6). For SQA, AdaTS achieves an F1 of 37.5 on SLUE SQA, outperforming Pooling (27.3) and WLQF (30.4). In terms of FLOPs, AdaTS requires 2.14 TFLOPS for a 10s audio clip—a 34% reduction over convolutional downsampling (3.23 TFLOPS) and a 75% reduction over FLS-7B (8.54 TFLOPS). Threshold sensitivity ablations show that ASR and ST are sensitive to threshold tuning (optimal around t = 0.85), whereas SQA is robust to larger downsampling ranges.

| Systems / Conditions | ASR (LS Clean WER $\downarrow$) | SQA (SLUE F1 $\uparrow$) | ST (FLEURS COMET $\uparrow$) |
| --- | --- | --- | --- |
| Pooling (Baseline) | 5.3 | 27.3 | 80.1 |
| WLQF (Baseline) | 3.6 | 30.4 | 81.3 |
| FLS-1.5B | 5.2 | 32.3 | 80.2 |
| FLS-7B | 4.1 | - | 3.6 (Avg) |
| Qwen 2.5 1.5B + AdaTS | 2.9 | 37.5 | 82.0 |

## Limitations

The evaluation is primarily restricted to English speech inputs and 10 target translation languages, leaving ultra-low-resource or highly tonal languages underexplored. The foundational training data utilizes sentences and audio clips averaging under 30 seconds, which may limit long-form continuity despite competitive LongSpeechEval performance. Additionally, optimal threshold settings (t = 0.85) require careful tuning per modality task to avoid degrading fine-grained phonetic transcription accuracy.

## Why read this

Speech and ML researchers working on multimodal LLMs and efficient long-context processing should read this to see how dynamic, similarity-based token merging can outperform static downsampling without requiring massive 7B+ decoder scales.

## Code

- https://github.com/sonalsannigrahi/AdaTS

## Applications

Efficient on-device speech assistants, real-time multilingual speech translation, and long-form conversational speech question-answering systems.

## Institutions / 機構

Universidade de Lisboa, Instituto de Telecomunicacoes, TransPerfect

**Funding / 經費:** Portuguese Recovery and Resilience Plan, Center for ResponsibleAI, DECOLLAGE, ERC, FCT, MECI, EU funds, Instituto de Telecomunicacoes

## Related

- (link related pages by id as the wiki grows)
