---
id: peng26d_interspeech
category: spoken-language-understanding
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1055
pdf: https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.pdf
---

# MAC-SLU: Multi-Intent Automotive Cabin Spoken Language Understanding Benchmark

[PDF](https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/peng26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1055)

**TL;DR** — This paper introduces MAC-SLU, a Chinese multi-intent spoken language understanding dataset for automotive cabins, and benchmarks state-of-the-art LLMs and LALMs, showing that end-to-end models match pipeline approaches by avoiding ASR error propagation.

## Problem

Existing spoken language understanding datasets are heavily limited in task diversity, semantic complexity, and scale, frequently containing only single-intent samples or simple domains where models easily exceed 95% accuracy. Furthermore, the community lacks a unified benchmarking framework to fairly compare open-source large language models and large audio-language models across direct inference, in-context learning, and fine-tuning paradigms. This lack of rigorous testbeds prevents proper evaluation of how modern conversational models handle multi-intent extraction and slot filling in realistic acoustic environments.

## Method

The authors construct MAC-SLU using over 20,000 de-identified real-world Chinese automotive cabin command texts paired with weakly labeled semantic parses, filtered down to 20,539 total samples across 8 domains, 81 intents, and 192 slots, featuring up to 5 intents per query and 28% rejection queries. Mandarin speech is synthesized using CosyVoice-2 with speaker embedding templates derived from AIShell-1 to protect privacy and maintain speaker isolation across splits. The test set comprises 1,152 human-curated clean samples. The study benchmarks multiple LLMs (Qwen3 series) and LALMs (Qwen2-Audio-Instruct, Qwen2.5-Omni, Phi-4-multimodal, MiniCPM-o2.6) using zero-shot inference, structured in-context learning prompts, and parameter-efficient supervised fine-tuning via LoRA (rank 16, alpha 32) implemented in Llama-Factory.

## Results

Evaluated on the MAC-SLU test set using Intent Classification accuracy (IC Acc), Slot Filling F1 score (SF F1), and Overall Accuracy (OA), models are compared against pipeline configurations utilizing ASR front-ends like Whisper-LargeV3-Turbo (CER 10.40%) and Paraformer (CER 3.64%). While zero-shot in-context learning enables models to capture basic intents, it yields low overall accuracy below 15% despite structured prompting. Supervised fine-tuning drastically improves performance; for instance, fine-tuning Qwen2.5-Omni-7B increases IC accuracy by 29%, SF F1 by 39%, and overall accuracy by 47% over in-context learning. End-to-end LALMs achieve performance comparable to pipeline approaches because they bypass ASR transcription error propagation, though pipeline text-only models still achieve the highest upper-bound scores when given perfect ground-truth transcriptions.

## Code

- https://github.com/Gatsby-web/MAC_SLU

## Applications

Speech and machine learning engineers developing voice assistants, in-car infotainment controls, and task-oriented dialogue systems can use this benchmark and dataset to evaluate multi-intent spoken language understanding models.

## Limitations

The dataset scope is restricted to the automotive cabin domain and Mandarin language, and relies on text-to-speech synthesis rather than natural acoustic recordings to preserve user privacy.

## Related

- (link related pages by id as the wiki grows)
