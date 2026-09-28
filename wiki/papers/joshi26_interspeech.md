---
id: joshi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3272
pdf: https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.pdf
---

# IndicContextEval: A Benchmark for Evaluating Context Utilisation in Audio Large Language Models Across 8 Indic Languages

[PDF](https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3272)

**TL;DR** — IndicContextEval is a 56-hour multilingual benchmark spanning 8 Indian languages and 23 professional domains to assess whether AudioLLMs genuinely exploit contextual text prompts or merely rely on memorized pretraining priors.

## Problem

Modern AudioLLMs allow flexible textual prompting for speech transcription, but existing benchmarks fail to test whether models actually use this context or simply fall back on parametric memory. Prior datasets are heavily English-centric, rely on synthetic audio, or test only fixed single-prompt conditions, making it impossible to disentangle true contextual grounding from memorization.

## Method

The benchmark comprises 55.93 hours of natural read and extempore speech from 555 speakers across Hindi, Bengali, Telugu, Marathi, Gujarati, Malayalam, Odia, and Urdu, categorized into 23 technical and professional domains. The authors construct a seven-level evaluation taxonomy (L0 to L6) that incrementally introduces prompts: no context, language specification, metadata, audio descriptions, English entity lists, native script entity lists, and adversarial wrong-entity lists. Five models are evaluated: commercial systems (GPT-4o Transcribe, Gemini 3 Flash, Sarvam Audio), an open-weight model (Gemma-3N), and a standalone ASR baseline (IndicConformer).

## Results

Evaluated on word error rate (WER) and named entity error rate (NEER), Sarvam Audio achieves the lowest L1 WER at 16.86%, followed by IndicConformer (18.81%) and Gemini 3 Flash (18.90%), while GPT-4o Transcribe and Gemma-3N trail with higher error rates. Providing native-script entity lists (L5) yields significant improvements in entity accuracy for GPT-4o Transcribe, Gemini 3 Flash, and Gemma-3N, with Gemini 3 Flash achieving a best NEER of 17.39%. Adversarial testing (L6 with incorrect domain entities) shows that models generally revert to baseline performance levels rather than breaking down catastrophically.

## Code

- https://github.com/AI4Bharat/IndicContextEval

## Applications

Speech engineers and researchers designing context-aware transcription systems, voice assistants, and medical or legal dictation tools for low-resource and multilingual environments.

## Limitations

The evaluation is currently constrained to eight Indic languages and a selected group of proprietary and open-weight AudioLLMs that claim multilingual support.

## Related

- (link related pages by id as the wiki grows)
