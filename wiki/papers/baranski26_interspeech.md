---
id: baranski26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-337
pdf: https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.pdf
---

# HALAS: A Human-Annotated Dataset of Hallucinations of Modern ASR Systems

[PDF](https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/baranski26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-337)

**TL;DR** — HALAS is the first human-annotated dataset of naturally occurring ASR hallucinations on real earnings call speech, establishing a rigorous benchmark where proxy metrics achieve up to 81% ROC-AUC while state-of-the-art detectors reach only 53.1% F1.

## Problem

Modern end-to-end ASR systems frequently hallucinate text that does not correspond to spoken audio, leading to misinformation and degraded user experiences, especially in high-stakes domains like healthcare. Existing mitigation and detection methods are almost exclusively evaluated on non-speech or artificially corrupted audio rather than real, unprocessed conversational speech. This gap makes it difficult to understand or prevent how state-of-the-art models fail in practical deployment environments.

## Method

The authors curate HALAS using 119 hours of audio from the Earnings 22 dataset, selecting segments with high inter-model disagreement across seven prominent ASR models (OpenAI Whisper large v2/v3/v3-Turbo, Crisper Whisper, Nvidia Canary-1B, Canary-1B-Flash, and Parakeet-TDT v2). Ten professional annotators independently labeled span-level hallucinations, loopings, and reference transcript errors using a multi-annotator pipeline with a third arbitrator (achieving Cohen's kappa of 0.87). GPT-4o mini was additionally employed to assess hallucination severity across minor, moderate, and severe impact categories. The benchmark evaluates multiple proxy text metrics (WER, CER, Perplexity, BERTScore, SeMaScore) and classifier architectures for hallucination detection.

## Results

Evaluated on Whisper large v3, character error rate (CER) and semantic score (SeMaScore) achieved the highest proxy detection performance at 81% and 80% ROC-AUC respectively, whereas perplexity and length yielded lower performance (60% and 62% ROC-AUC). Utterance-level hallucination rates ranged from 21.4% to 43.8% across the tested models, with prominent cross-model vocabulary overlap concentrated in short filler phrases like 'you' and 'thank you'. The dataset is partitioned into a training split with a 33.6% hallucination rate and a test split with a 22.6% hallucination rate.

## Code

- https://github.com/DSP-AGH/HALAS/tree/main

## Applications

Speech and machine learning engineers developing robust ASR systems, hallucination detectors, or safety filters for deployment in production environments.

## Limitations

The dataset is intentionally constructed by sampling high-inter-model-disagreement utterances to maximize hallucination prevalence, meaning it does not reflect natural real-world base rates.

## Related

- (link related pages by id as the wiki grows)
