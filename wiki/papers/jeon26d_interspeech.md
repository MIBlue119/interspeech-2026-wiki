---
id: jeon26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2021
pdf: https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.pdf
---

# ParaPairAudioBench: Paralinguistic Pairwise Audio Benchmark for LALM-as-a-Judge

[PDF](https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/jeon26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2021)

**TL;DR** — ParaPairAudioBench is a diagnostic pairwise benchmark of 5,175 audio pairs across five paralinguistic dimensions, revealing that current Large Audio-Language Models lag behind human judgment by an average of 32 percentage points and suffer from severe calibration failures.

## Problem

While text-based LLM-as-a-Judge paradigms and prior speech evaluations focus heavily on holistic naturalness or transcript accuracy, they leave fine-grained paralinguistic aspects like speaking rate, emphasis, age, and gender underexplored. This gap matters because modern speech synthesis can produce fluent audio that still fails to match intended expressive or perceptual requirements. Furthermore, existing evaluation models lack rigorous diagnostic controls for whether they can abstain during ambiguous cases or whether they overly rely on textual cues instead of acoustic properties.

## Method

The benchmark comprises 5,175 pairwise evaluation instances sourced from validated public corpora (Expresso, Sonos Voice Control Bias Assessment, LibriTTS, and EARS) spanning five dimensions: Style, Rate, Emphasis, Age, and Gender. It controls for lexical content by including both same-transcript and cross-transcript conditions, and incorporates explicit Tie conditions alongside position-swapped input order tests to measure calibration and position bias. The evaluation framework tests five representative models across commercial, open-source, and fine-tuned speech judge categories, including Gemini 2.5 Flash, GPT-4o Audio, SpeechJudge-7B, Kimi-Audio-7B, and Qwen2.5-Omni-7B, using greedy decoding or designated multi-run majority voting protocols.

## Results

Across the benchmark, the strongest model (Gemini 2.5 Flash) trails human accuracy by 17.7%p, while models lag behind human judgments by 32%p on average overall. Models show moderate strength on globally distributed cues like speech rate and gender, but struggle heavily with localized prosodic features such as emphasis and fail catastrophically on calibration, with models like SpeechJudge-7B recording tie-selection accuracies as low as 1.6% to 1.7% due to a systemic urge to force a preference. Evaluations further expose position biases of up to 29.4%p and highlight that models frequently over-rely on textual transcripts for style while ignoring acoustic context for emphasis.

## Code

- https://github.com/jsujeon/ParaPairAudioBench

## Applications

Speech and ML engineers developing text-to-speech, voice conversion, or speech-to-speech conversational models can use this benchmark to audit and improve the reliability of automated LALM judge pipelines.

## Limitations

Rate-level tie construction is excluded from the current benchmark because naturally recorded speech exhibits rhythmic variation even under identical rate labels.

## Related

- (link related pages by id as the wiki grows)
