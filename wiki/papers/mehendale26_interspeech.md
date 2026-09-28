---
id: mehendale26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2484
pdf: https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.pdf
---

# Indic DiarBench: A Multilingual Joint Diarization and ASR Benchmark for Indian Languages

[PDF](https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2484)

**TL;DR** — Indic DiarBench introduces a 108-hour multilingual benchmark covering all 22 scheduled Indian languages to evaluate joint speaker diarization and ASR, revealing high error rates across current commercial APIs and multimodal LLMs.

## Problem

Prior benchmarks for multi-speaker conversational speech processing are overwhelmingly concentrated in English and a few high-resource languages, leaving a complete lack of standardized evaluation for Indian languages. Because real-world deployments require simultaneous diarization and ASR, evaluating them independently hides major failure modes like severe ASR degradation on short or overlapping segments. This gap is especially problematic given India's linguistic diversity spanning 22 scheduled languages, frequent code-mixing with English, dialectal variation, and conversational overlap.

## Method

The corpus comprises ~108 hours of natural multi-speaker audio divided into near-field virtual meetings (~53 hrs, covering all 22 languages), far-field distant microphone recordings (~27 hrs), and in-the-wild YouTube conversations (~28 hrs, covering the 10 most widely spoken languages). All audio undergoes a rigorous human-in-the-loop annotation pipeline utilizing bootstrap transcripts from multiple ASR models, professional human correction for time-aligned RTTM speaker labels, and dual-format transcriptions to handle English code-mixing. Baseline evaluations are conducted on prominent commercial speech APIs and multimodal LLMs using Concatenated minimum-permutation Word Error Rate (cpWER), Word Diarization Error Rate (WDER), and Diarization Error Rate (DER).

## Results

Evaluations across the benchmark highlight substantial room for improvement, with the specialized Sarvam model achieving a duration-weighted aggregate DER of 16.0%, cpWER of 38.8%, and WDER of 33.1%. Commercial APIs such as AWS Transcribe, Azure STT, and Deepgram Nova-3 record higher aggregate DER values ranging from 23.5% to 34.8% and cpWER figures between 43.7% and 60.8%. Multimodal LLMs like Gemini 3 Pro and GPT-4o Transcribe struggle heavily on joint speaker-attributed ASR under these conversational conditions, reporting DERs of 58.9% and 83.1% respectively. Individual language breakdowns further demonstrate performance bottlenecks in low-resource and high-overlap settings.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and researchers developing conversational AI, meeting transcription systems, and multilingual voice agents for Indian languages use this benchmark to evaluate joint speaker diarization and ASR robustness.

## Limitations

The in-the-wild subset currently covers only 10 of the 22 scheduled languages without providing individual speaker IDs, and the dataset is strictly designed for evaluation rather than training.

## Related

- (link related pages by id as the wiki grows)
