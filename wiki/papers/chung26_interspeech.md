---
id: chung26_interspeech
category: speech-llm-dialogue
labels: [self-supervised, dataset-or-benchmark-release]
institutions: ["University of Melbourne", "University of Auckland", "Wuhan University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2066
pdf: https://www.isca-archive.org/interspeech_2026/chung26_interspeech.pdf
---

# Localizing and Editing Knowledge in Large Audio-Language Models

*Sung Kyun Chung, Jiaheng Dong, Qiuchi Hu, Jinuo Sun, Gongping Huang, Hong Jia, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/chung26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chung26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2066)

**Category:** `speech-llm-dialogue` · **Labels:** `self-supervised`, `dataset-or-benchmark-release`

**TL;DR** — This paper presents the first audio benchmark and locate-then-edit framework for Large Audio-Language Models (LALMs), demonstrating that factual knowledge is jointly encoded across audio encoders and text backbones and can be precisely updated via speech-aware causal tracing.

## Key contributions

- Constructed the first audio benchmark for knowledge localization and editing in LALMs using Gemini 2.5 Flash TTS realizations of CounterFact and Known-1000 datasets.
- Proposed a speech-aware causal tracing method using WhisperX forced alignment and Gaussian noise corruption on continuous acoustic frames to map factual storage sites.
- Showed that factual knowledge is jointly stored across both audio encoder layers (middle-to-late layers around 25-31 initiating retrieval) and LLM backbone FFN modules.
- Designed single-layer and multi-layer cross-modal editing strategies that coordinate audio and text modifications, achieving superior specificity and efficacy over standard fine-tuning.

## Problem

Large Audio-Language Models process speech input through dedicated audio encoders coupled with text LLM backbones, yet they frequently encode outdated or incorrect facts due to static training corpora. Standard model editing techniques like ROME, MEMIT, and AlphaEdit are designed exclusively for discrete text tokens and fail to account for temporally distributed, continuous speech representations or cross-modal interactions. Consequently, it remains unclear where factual knowledge resides in LALMs and how to update it without destroying audio-text alignment or requiring expensive full fine-tuning.

## Method

The framework operates in two stages: localization via causal tracing and targeted parameter editing. In the localization stage, the model undergoes a clean run, a corrupted run where Gaussian noise is injected into the subject-span frames determined via WhisperX forced alignment, and a corrupted-with-restoration run using a +/- 4 layer window. The resulting Average Indirect Effect (AIE) scores identify primary factual storage sites across hidden states, MLPs, and attention modules.

In the editing stage, the framework formulates updates using linear transformations to map subject keys to target object representations. It evaluates single-layer rank-one updates, sequential cross-modal editing (where an audio layer update feeds into LLM backbone layers), and multi-layer editing incorporating null-space projection matrices derived from 5,000 LibriSpeech samples to protect unrelated facts ($K_0$). Single-layer edits use 10 gradient steps at learning rate 0.01 with weight decay 0.5 for audio layers, while multi-layer edits use learning rate 0.5.

## Experimental setup

Evaluated on CounterFact (100 localization, 500 editing instances) and Known-1000 (250 instances) datasets, synthesized into audio prompts using Gemini 2.5 Flash TTS. Compared against unedited baselines and layer-wise lightweight fine-tuning (FT) using Adam (lr=5e-4). Measured using Efficacy Score (ES), Paraphrase Score (PS), Neighbor Score (NS), and overall Score (S). All experiments executed on a single NVIDIA A100 GPU using Qwen2-Audio-7B-Instruct as the backbone.

## Results

Multimodal single-layer editing achieved the highest overall score of 77.60 (ES 95.20, PS 78.70, NS 64.72), outperforming text-only editing (64.10) and audio-only editing (71.36). While fine-tuning yielded high raw efficacy (ES up to 98.40), it suffered from poor specificity with low Neighbor Scores (~49.60–59.86), whereas targeted editing preserved unrelated knowledge much better (NS up to 70.34). Single-layer edits consistently outperformed multi-layer updates when weights were reset between examples.

| System / Condition | Score (S) | ES | PS | NS |
|---|---|---|---|---|
| Baseline | 29.09 | 20.40 | 24.40 | 76.18 |
| Audio FT | 68.21 | 97.60 | 70.00 | 51.42 |
| Audio Single-layer | 71.36 | 78.20 | 66.50 | 70.34 |
| Text Single-layer | 64.10 | 79.70 | 56.30 | 60.64 |
| Multimodal Single-layer | 77.60 | 95.20 | 78.70 | 64.72 |

## Limitations

The study is currently bounded by synthetic TTS audio generation rather than diverse natural human speech variations, accents, and acoustic noise. The evaluation is restricted to the 7B scale Qwen2-Audio architecture and a limited subset of factual triples from text benchmarks. Furthermore, multi-layer editing accumulates distribution shifts unless parameters are explicitly reset between individual edits.

## Why read this

Researchers building trustworthy, controllable, or updatable speech-based AI systems should read this to understand how multimodal causal pathways distribute factual knowledge between acoustic encoders and language backbones.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fine-grained factual correction and knowledge updating in voice assistants, spoken dialogue systems, and multimodal audio-language interfaces without costly retraining.

## Institutions / 機構

University of Melbourne, University of Auckland, Wuhan University

## Related

- (link related pages by id as the wiki grows)
