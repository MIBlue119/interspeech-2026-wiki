---
id: wen26b_interspeech
category: dataset
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-289
pdf: https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.pdf
---

# YUE-PUB-Speech: A Speech-based Pragmatic Understanding Benchmark for Cantonese

[PDF](https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wen26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-289)

**TL;DR** — The authors introduce YUE-PUB-Speech, the first multimodal pragmatic understanding benchmark for low-resource Cantonese, containing 1,680 dialogue instances (10.87 hours of speech) paired with standardized multiple-choice questions.

## Problem

Most existing pragmatic benchmarks are text-only, causing models to rely purely on transcribed semantics while ignoring crucial acoustic and paralinguistic cues. This limitation is magnified in low-resource languages like Cantonese, where lack of paired text-speech data makes it unclear whether speech-language models can successfully perform pragmatic inference.

## Method

The corpus is constructed by sampling pragmatically rich texts from English benchmarks (PUB), translating them into Cantonese via Gemini with dual-stage human verification for fluency and idioms, and recording them in a sound-absorbing booth using four native speakers across single- and multi-speaker setups. Baseline models evaluate single-modality text/audio inputs, feature concatenation of acoustic embeddings (such as openSMILE eGeMAPS) with text, and audio-language models (ALMs) like Qwen2.5-Omni, SALMONN, WavLLM, and Gemini-2.5-Pro.

## Results

Experiments on 14 tasks grouped under implicature, presupposition, and reference demonstrate that incorporating speech signals consistently improves pragmatic understanding compared to text-only models. Audio-only models lag significantly behind text models, proving the task requires both linguistic content and speech cues. Furthermore, simple feature concatenation using openSMILE acoustic representations proves particularly effective for handling conversational implicature.

## Code

- https://huggingface.co/datasets/Multilingual-NLP/YUE-PUB-Speech

## Applications

Speech and ML engineers evaluating the pragmatic competence, contextual reasoning, and voice-reasoning gaps of multimodal spoken language models in low-resource languages.

## Limitations

The dataset scope is bounded to 1,680 dialogues across three core pragmatic phenomena (implicature, presupposition, reference) in Cantonese.

## Related

- (link related pages by id as the wiki grows)
