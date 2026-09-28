---
id: zhou26c_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1517
pdf: https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.pdf
---

# UG-Bench: A Comprehensive Benchmark for Evaluating Large Audio-Language Models

[PDF](https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhou26c_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1517)

**TL;DR** — UG-Bench is a comprehensive evaluation framework for large audio-language models (LALMs) that simultaneously assesses understanding and generation capabilities across 19 tasks and 36 datasets, revealing prominent gaps in model instruction following and synthesis quality.

## Problem

Evaluating large audio-language models is difficult because existing benchmarks are predominantly static, task-specific, and disproportionately biased toward speech perception while ignoring speech generation. This fragmentation makes it hard to systematically measure cross-modal generalization, instruction-following fidelity, and holistic spoken dialogue competence. UG-Bench resolves this by providing a unified, decoupled evaluation pipeline spanning both input comprehension and output generation.

## Method

UG-Bench features a four-module architecture comprising an input standardization module with unified prompts, a model interface module supporting diverse LALMs, an output unification module for formatting, and a task evaluation module. It evaluates models across four competencies—speech perception, audio perception, speech generation, and spoken language understanding—using a weighted ranking aggregation strategy based on relative task performance and dataset scales. The study evaluates 11 open-source LALMs and 5 specialized speech generation models (such as Qwen2-Audio, Salmonn, MaskGCT, and F5-TTS) out-of-the-box on a single NVIDIA H100 GPU.

## Results

Evaluated on 36 datasets encompassing 153,485 test samples across 19 tasks, Qwen2-Audio achieved the highest overall score of 78.18, followed by Salmonn (62.73) and WavLLM (57.27). In speech perception ASR tasks, Qwen2-Audio attained an English Word Error Rate (WER) of 8.10, whereas baseline models like Speech-GPT reached 64.02. The evaluation uncovered pervasive limitations in open-source LALMs, including poor instruction-following adherence leading to format violations, severe autoregressive hallucination such as trailing repetitive characters, and strong domain overfitting demonstrated by performance drops on out-of-domain ASR data.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing or deploying multimodal conversational systems, speech assistants, and large audio-language models can use UG-Bench to benchmark architectural improvements and multi-task capabilities.

## Limitations

Current open-source LALMs predominantly support English speech input, restricting Chinese dataset evaluations from contributing to final model rankings.

## Related

- (link related pages by id as the wiki grows)
