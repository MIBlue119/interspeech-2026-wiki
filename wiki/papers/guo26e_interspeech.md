---
id: guo26e_interspeech
category: resources-evaluation
labels: [dataset-or-benchmark-release]
institutions: ["Hunan University", "Malanshan Audio & Video Laboratory", "Yuelushan Center for Industrial Innovation"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3146
pdf: https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.pdf
---

# DEBATE: A Dataset for Disentangling Textual Ambiguity in Mandarin Through Speech

*Haotian Guo, Jing Han, Yongfeng Tu, Shihao Gao, Weihao Gan, Zixing Zhang*

[PDF](https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guo26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3146)

**Category:** `resources-evaluation` · **Labels:** `dataset-or-benchmark-release`

**TL;DR** — DEBATE is a public Mandarin speech-text dataset of 9.66 hours across 10,010 utterances designed to evaluate disambiguation through speech (DTS), revealing that current large speech-language models achieve only 51-68% accuracy compared to near-perfect human performance.

## Key contributions

- Introduces DEBATE, a Mandarin speech-text corpus consisting of 1,001 ambiguous text entries paired with 10,010 audio recordings (9.66 hours) produced by 10 native speakers.
- Establishes a rigorous data collection framework categorizing speech-based disambiguation into polyphonic character ambiguity, structural ambiguity (pauses), and focus ambiguity (stress).
- Benchmarks three representative large speech-language models (Qwen2-Audio, Qwen2.5-Omni, and Gemini 2.0 Flash) under a zero-shot multi-choice intent understanding setup.
- Demonstrates a profound gap between machine understanding and human performance, particularly exposing model failures in handling fine-grained prosodic stress and pitch variations.

## Problem

While text-based ambiguity resolution is heavily studied, disambiguation through speech (DTS) remains underexplored due to a complete lack of paired datasets. Mandarin Chinese is especially susceptible to syntactic and semantic ambiguities in written form because it lacks morphological inflections, conjugation, and explicit word boundary spacing. Although humans effortlessly resolve these ambiguities using pronunciation, prosodic pauses, and stress, existing text corpora ignore speech modalities while prior audio datasets focus on general tasks rather than precise intent disambiguation.

## Method

The DEBATE dataset construction pipeline involves raw text gathering from open-source ambiguity corpora, social media keywords, and civil service exam logical reasoning tasks, which were then expanded and verified using LLMs and human review. The texts were categorized into three benchmark tasks: TPronu (2,000 samples for polyphones with pronunciation annotations), TPause (4,010 samples for structural ambiguity marked with '/' word boundaries), and TStres (4,000 samples for focus ambiguity marking stressed words with '< >'). Semantic explanations were generated via LLMs and filtered through manual review for logical consistency.

For audio data collection, 10 demographic- and gender-balanced volunteers (8 young adults, 2 elderly) recorded the corpus using everyday devices (smartphones and laptop microphones) to preserve ecological validity. A two-person collaborative mechanism involving real-time monitoring and immediate re-recording of errors ensured high consistency. The resulting audio was validated using SenseVoice-small ASR transcriptions, achieving low character error rates (CER) of 4.75% for TPronu, 2.82% for TPause, and 1.94% for TStres.

Inference benchmarking evaluated zero-shot Large Speech Language Models (LSLMs)—Qwen2-Audio, Qwen2.5-Omni, and Gemini 2.0 Flash—by inputting the audio clip alongside a text prompt containing a multiple-choice question with two plausible semantic interpretations of the source sentence. Models had to select the single correct interpretation matching the audio's acoustic disambiguation cues.

## Experimental setup

Evaluations utilized the DEBATE dataset containing 10,010 audio samples totaling 9.66 hours across 10 speakers. Models benchmarked include Qwen2-Audio, Qwen2.5-Omni, and Gemini 2.0 Flash in a zero-shot multiple-choice setting. A small-scale human evaluation subset of 50 samples per subtask (5 samples per speaker) was assessed by three independent volunteers for human-to-machine comparisons. Metrics reported are classification accuracy (%) and macro-F1 score (%).

## Results

On the TPronu task, Qwen2.5-Omni achieved the best model accuracy of 65.65% (F1: 65.20%), outperforming Gemini 2.0 Flash (61.15%) and Qwen2-Audio (58.60%). On the TPause task, Qwen2.5-Omni and Gemini 2.0 Flash tied for top accuracy at 68.08% and 68.00% respectively, while Qwen2-Audio lagged at 55.64%. On the TStres task representing stress and intonation variations, Gemini 2.0 Flash achieved the highest accuracy of 58.83% (F1: 58.00%), followed by Qwen2.5-Omni at 55.02%, with Qwen2-Audio performing near-random at 51.57%. Across all tasks, models scored significantly lower and with higher variance than human listeners, who demonstrated near-ceiling accuracy.

| Systems / Conditions | TPronu Acc (%) | TPronu F1 (%) | TPause Acc (%) | TPause F1 (%) | TStres Acc (%) | TStres F1 (%) |
|---|---|---|---|---|---|---|
| Qwen2-Audio | 58.60 | 55.40 | 55.64 | 51.10 | 51.57 | 47.60 |
| Qwen2.5-Omni | 65.65 | 65.20 | 68.08 | 67.90 | 55.02 | 55.20 |
| Gemini 2.0 Flash | 61.15 | 60.80 | 68.00 | 67.90 | 58.83 | 58.00 |

## Limitations

The DEBATE dataset is currently limited to Mandarin Chinese, spanning a modest scale of 9.66 hours and 10 speakers, which limits acoustic diversity and speaker adaptation breadth. The evaluation is restricted to a zero-shot closed-choice question format rather than open-ended interactive dialogue. Furthermore, existing LSLMs lack explicit pre-training on prosodically annotated datasets, hindering their ability to capture complex acoustic cues like fine-grained stress patterns.

## Why read this

Speech and ML researchers building multimodal audio LLMs should read this paper to understand the limitations of current models in processing fine-grained acoustic cues like stress and prosody. It provides a foundational benchmark dataset for evaluating spoken intent comprehension beyond simple literal transcription.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving large speech-language models for smart assistants, voice-controlled interfaces, and dialogue systems to accurately capture speaker intent, prosodic stress, and homograph pronunciation.

## Institutions / 機構

Hunan University, Malanshan Audio & Video Laboratory, Yuelushan Center for Industrial Innovation

**Funding / 經費:** Malanshan Audio & Video Laboratory, National Natural Science Foundation of China, National Science and Technology Major Project of China, Science and Technology Innovation Program of Hunan Province, Guangdong Basic and Applied Basic Research Foundation, Shenzhen Natural Science Foundation

## Related

- (link related pages by id as the wiki grows)
