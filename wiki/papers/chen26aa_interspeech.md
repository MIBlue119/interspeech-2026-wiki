---
id: chen26aa_interspeech
category: speech-llm
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2466
pdf: https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.pdf
---

# PolyBench: A Benchmark for Compositional Reasoning in Polyphonic Audio

*Yuanjian Chen, Yang Xiao, Han Yin, Xubo Liu, Jinjie Huang, Ting Dang*

[PDF](https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/chen26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2466)

**TL;DR** — PolyBench is a new multi-task evaluation benchmark for Large Audio Language Models (LALMs) focusing on compositional reasoning in polyphonic (overlapping) audio, revealing severe performance degradation in state-of-the-art models on counting and detection tasks.

## Key contributions

- Introduces PolyBench, the first benchmark dedicated to evaluating compositional reasoning in polyphonic audio scenes.
- Curates a dataset combining real-world audio from DataSED, DESED, and MAESTRO-Real, balanced with monophonic clips from AudioTime to prevent dataset biases.
- Defines five structured multiple-choice question answering (MCQA) subsets: Counting, Duration, Concurrency, Classification, and Detection.
- Evaluates multiple state-of-the-art open-source LALMs and cascaded systems, exposing a widespread vulnerability to acoustic masking and shortcut learning.

## Problem

Large Audio Language Models (LALMs) have advanced rapidly in monophonic or sequential audio understanding, but real-world acoustic environments frequently feature overlapping, concurrent sound events. Existing benchmarks like AIRBench, MMAU-Pro, and TREA primarily evaluate isolated events or chronological ordering, ignoring polyphonic structures and compositional relationships. Consequently, models struggle with masking and cross-event dependencies, creating a critical bottleneck for deploying audio reasoning agents in open acoustic environments.

## Method

PolyBench is constructed via a three-stage pipeline: problem observation, data curation/question generation, and quantitative evaluation. Raw polyphonic clips are harvested from DataSED (4,292 samples reduced to 169 clips, 3-89 seconds long), DESED (259 evaluation samples), and MAESTRO-Real (300 clips standardized to 25 seconds). For the Concurrency task, monophonic samples from AudioTime are mixed in to ensure an even distribution of positive and negative pairs, mitigating the 'Yes' response bias. Question prompts for five distinct reasoning tasks are expanded using Qwen3-Max into 20 semantically equivalent variants per sample and subjected to strict manual quality control.

During evaluation, models receive the audio and text prompt, and reasoning-based models generate Chain-of-Thought (CoT) tokens before yielding a multiple-choice selection. Evaluation relies on exact string match accuracy (ACC) and F1 score, alongside NV-Embed-v2 semantic similarity matching to verify responses. Baseline architectures span end-to-end LALMs (Audio Flamingo 3, R1-AQA, Qwen3-Omni-30B-A3B), a specialized reasoning model (AUDSEMTHINKER-QA GRPO), and a cascaded pipeline (TimeAudio for temporal localization paired with Qwen3-8B for text reasoning).

## Experimental setup

The evaluation utilizes a combined dataset drawn from DataSED, DESED, MAESTRO-Real, and AudioTime, encompassing various indoor and outdoor sound event classes. Baselines include Audio Flamingo 3, R1-AQA, Qwen3-Omni-30B-A3B, TimeAudio+Qwen3-8B, and AUDSEMTHINKER-QA GRPO. Metrics comprise exact match ACC, F1 score, and TP/FP/TN/FN distribution analysis for concurrency. Evaluations use NV-Embed-v2 to evaluate semantic similarity where appropriate.

## Results

On the PolyBench benchmark, tasks show a clear difficulty stratification. While models achieve higher performance on Concurrency and Classification (e.g., Qwen3-Omni-30B-A3B reaches 83.1% ACC on Concurrency and 77.9% ACC on Classification), they suffer severe degradation on Counting and Detection. Specifically, Qwen3-Omni-30B-A3B achieves only 57.5% ACC on Counting and 63.4% ACC on Detection, while other models drop as low as 30.1% ACC (R1-AQA on Counting) and 37.2% ACC (Audio Flamingo 3 and AUDSEMTHINKER-QA GRPO on Detection). 

Detailed analysis of the Concurrency task uncovers widespread shortcut learning: models like R1AQA achieve a deceptive 90.4% ACC on pure-polyphonic data due to a heavy 'Yes' prior (54.7% false positives), but performance drops dramatically when evaluated on a balanced mix of monophonic and polyphonic clips.

| Models | Counting (ACC) | Duration (ACC) | Concurrency (ACC) | Classification (ACC) | Detection (ACC) |
|---|---|---|---|---|---|
| Qwen3-Omni-30B-A3B | 57.5% | 68.5% | 76.0% | 77.9% | 63.4% |
| R1AQA | 30.1% | 43.2% | 90.4% | 33.1% | 26.2% |
| Audio Flamingo 3 | 53.4% | 65.8% | 37.7% | 50.3% | 37.2% |
| TimeAudio + Qwen3-8B | 43.8% | 63.7% | 78.1% | 50.3% | 51.7% |
| AUDSEMTHINKER-QA GRPO | 51.4% | 64.4% | 43.2% | 70.3% | 37.2% |

## Limitations

The benchmark relies on synthetic or curated mixtures from existing Sound Event Detection (SED) datasets, which may not fully capture the acoustic complexity and reverberation of arbitrary wild audio environments. The evaluation format is strictly multiple-choice question answering (MCQA), which may constrain free-form reasoning capabilities or introduce option-selection bias. Furthermore, language coverage is limited to English-centric prompts and datasets.

## Why read this

Speech and ML researchers building audio language models or embodied conversational agents should read this paper to understand the severe failure modes of current LALMs in multi-source, polyphonic scenes. It provides a standardized diagnostic benchmark and highlights the gap between superficial keyword-matching and genuine compositional reasoning.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of robust audio question-answering systems, smart home monitoring devices, and multimodal embodied agents capable of parsing complex, overlapping soundscapes.

## Related

- (link related pages by id as the wiki grows)
