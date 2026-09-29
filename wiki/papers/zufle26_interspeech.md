---
id: zufle26_interspeech
category: resources-evaluation
labels: [multilingual, dataset-or-benchmark-release]
institutions: ["Karlsruhe Institute of Technology", "Fondazione Bruno Kessler", "ACC Cyfronet AGH", "AGH University of Krakow", "Carnegie Mellon University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-685
pdf: https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.pdf
---

# Do What I Say: A Spoken Prompt Dataset for Instruction-Following

*Maike Züfle, Sara Papi, Fabian Retkowski, Szymon Mazurek, Marek Kasztelnik, Alexander Waibel, Luisa Bentivogli, Jan Niehues*

[PDF](https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zufle26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-685)

**Category:** `resources-evaluation` · **Labels:** `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — DoWsetIsay (DOWIS) is a multilingual benchmark dataset of 3h17m of human-recorded spoken and parallel text prompts across 9 tasks and 11 languages, designed to pair with any existing downstream dataset. Evaluating state-of-the-art Speech Large Language Models (SLLMs) reveals that text prompts significantly overestimate performance compared to spoken prompts on text-output tasks.

## Key contributions

- Introduces DOWIS, a decoupled prompt evaluation dataset pairing parallel text and human-spoken prompts across 11 languages and 9 distinct tasks.
- Covers 5 distinct prompt styles (basic, formal, informal, detailed, short) to test robustness against prompt wording variations.
- Evaluates S-LLMs (Phi-4 Multimodal and Qwen2.5-Omni) to demonstrate that text prompt evaluation yields an overly optimistic view of spoken instruction-following capabilities.
- Provides empirical analysis showing that speech and text prompts perform comparably only on tasks requiring speech output (TTS, S2ST).

## Problem

Current Speech Large Language Models (SLLMs) are predominantly evaluated using text prompts derived from LLMs or human writing, which fails to reflect real-world human-computer interaction via speech. Existing spoken instruction benchmarks like SpeechInstructBench and Uro-Bench rely on text-to-speech (TTS) synthesis, are restricted to English and Chinese, are pre-concatenated to specific inputs, and lack support for cross-lingual tasks like speech translation or complex tasks like audio chaptering. This gap leaves researchers without a reusable, natural benchmark to measure how well SLLMs handle spoken instructions across diverse modalities, styles, and languages.

## Method

The DOWIS dataset contains 990 unique text prompts created by task experts in English and translated into 10 target languages (de, it, es, fr, pt, nl, ru, sv, cs, hu) by native speakers to ensure natural phrasing. These prompts are divided into 10 variants per task-language pair across 5 styles: basic, formal, informal, detailed, and short (2 variants per style). 19 native or highly proficient speakers (9 male, 10 female) recorded these prompts via phone or laptop in realistic acoustic conditions. Silence is trimmed using a loudness-based voice activity detection sliding window of 10 ms chunks with a loudness threshold of -40 dBFS, retaining 500 ms padding at both ends.

For evaluation, the prompts are decoupled from downstream dataset inputs (e.g., FLEURS, MCIF, YTSeg) so the instruction speaker and the audio content speaker are distinct. Experiments evaluate Phi-4 Multimodal Instruct (Phi) and Qwen2.5-Omni 7B (Qwen) with default parameters and batch size 1 on a single NVIDIA A100-SXM4-40GB GPU. Text output tasks utilize metrics such as WER, CometKiwi, and normalized BERTScore, while speech output tasks (TTS, S2ST) utilize Whisper Large V3 for transcription followed by WER/CometKiwi evaluation alongside UTMOS for speech quality.

## Experimental setup

Evaluations use FLEURS for ASR, MT, ST, S2ST, and TTS; MCIF for TSUM, SSUM, and SQA; and YTSeg for ACHAP. Baselines are compared across text vs. speech prompt modalities, male vs. female prompt audio, and 5 distinct prompt styles. Models are run using a batch size of 1 on a single NVIDIA A100-SXM4-40GB GPU, testing Qwen2.5-Omni 7B and Phi-4 Multimodal Instruct.

## Results

Across tasks with text outputs, text prompts consistently outperform spoken instructions; for instance, Phi's ASR WER jumps from 16.69 with text to 332.41 with speech prompts due to catastrophic failure to follow spoken formatting. For Qwen, ASR WER rises from 12.60 (text) to 17.08 (speech). In contrast, for speech-output tasks like TTS, speech prompts perform on par or slightly better than text prompts (UTMOS scores remain steady at ~4.35, and ASR-WER on generated audio improves from 30.14 with text to 28.53 with speech). Across prompt styles, informal and short prompts consistently underperform compared to formal and detailed structures (e.g., Qwen ACHAP Collar-F1 drops from 82.15 for basic and 80.19 for detailed down to 63.52 for informal and 53.36 for short).

| System / Condition | ASR (WER ↓) | MT (CometQE ↑) | ST (CometQE ↑) | TTS (UTMOS ↑) |
|---|---|---|---|---|
| Qwen (Text Prompt) | 12.60 | 81.41 | 80.21 | 4.33 |
| Qwen (Speech Prompt) | 17.08 | 70.97 | 68.57 | 4.34 |
| Phi (Text Prompt) | 16.69 | 77.23 | 75.82 | - |
| Phi (Speech Prompt) | 332.41 | 46.99 | 57.79 | - |

## Limitations

The dataset scope is bounded by 3h17m of total audio across 11 languages and 9 tasks, meaning individual task-language slices are small. Qwen's speech generation is strictly limited to English outputs, restricting full speech-to-speech evaluations. Furthermore, the evaluation depends on downstream automatic metrics (such as Whisper transcriptions for speech-output tasks) which can introduce evaluation noise.

## Why read this

Speech and ML researchers evaluating SLLMs must read this paper to understand that text-prompt benchmarks yield an overly optimistic evaluation of model capabilities. It provides a concrete resource (DOWIS) and empirical proof that SLLMs fail significantly when switching to natural spoken prompts on text-output tasks.

## Code

- https://github.com/MaikeZuefle/DOWIS

## Applications

Realistic evaluation, stress-testing, and benchmarking of Speech Large Language Models (SLLMs) for voice assistants, multilingual spoken translation pipelines, and interactive voice agents.

## Institutions / 機構

Karlsruhe Institute of Technology, Fondazione Bruno Kessler, ACC Cyfronet AGH, AGH University of Krakow, Carnegie Mellon University

**Funding / 經費:** European Union, Volkswagen Foundation

## Related

- (link related pages by id as the wiki grows)
