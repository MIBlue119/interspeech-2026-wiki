---
id: mehendale26_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2484
pdf: https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.pdf
---

# Indic DiarBench: A Multilingual Joint Diarization and ASR Benchmark for Indian Languages

*Deovrat Mehendale, Aditya Mehndiratta, Dhruv Subhash Rathi, Kaushal Bhogale, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mehendale26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2484)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`

**TL;DR** — Indic DiarBench is a 108-hour multilingual benchmark spanning all 22 scheduled Indian languages to evaluate joint speaker diarization and ASR, revealing that current commercial and multimodal LLM systems struggle heavily with high speaker overlap and low-resource dialects.

## Key contributions

- A 108-hour conversational speech corpus covering all 22 scheduled Indian languages across near-field, far-field, and in-the-wild YouTube domains.
- Data collection capturing 485 unique speakers from 189 districts for meetings, plus ~750 speakers across the 10 most widely spoken languages for YouTube audio.
- Human-corrected, speaker-attributed, segment-level transcriptions paired with time-aligned RTTM annotations and dual-format text representations (native scripts and Roman-script code-mixed normalizations).
- Comprehensive baseline evaluation of 6 commercial speech APIs and 2 multimodal large language models using joint metrics like cpWER and WDER.

## Problem

Prior speech datasets and benchmarks for Indian languages—such as IndicVoices or single-speaker corpora—focus almost exclusively on monologues or isolated transcription tasks, ignoring multi-speaker conversational dynamics. Meanwhile, existing diarization benchmarks like AMI, VoxConverse, and AliMeeting are heavily concentrated in English and Mandarin, leaving a massive blind spot for India's 22 constitutionally recognized languages and four language families. Evaluating diarization and ASR independently hides critical failure modes because standard ASR systems degrade severely when fed the fragmented, short, and overlapping speech segments produced by diarization pipelines.

## Method

The corpus is structured into three primary acoustic domains: ~53 hours of near-field virtual meetings (covering all 22 languages via individual close-proximity mic streams, with top 8 languages contributing ~4 hours each and remaining 14 contributing ~1.5 hours each), ~27 hours of distant-microphone far-field meetings (featuring reverberation and background noise with sessions containing 2-8 speakers), and ~28 hours of in-the-wild YouTube audio (covering the top 10 languages with ~2 hours per language). Data curation actively avoided scripted speech by providing debate topics and questionnaires, discarding warm-up segments, and purposely grouping same-gender speakers to increase speaker confusability.

The annotation workflow uses a human-in-the-loop pipeline: bootstrap transcripts generated via multiple ASR models are edited by professional annotators, dual-format transcriptions are generated to handle English code-mixing (both native Indic script and normalized Roman script), followed by multi-stage quality control checks from 2-3 language checkers per language and final sign-offs from in-house supercheckers. Systems are evaluated jointly on a single-channel mixed audio stream using Diarization Error Rate (DER) without forgiveness collars, concatenated minimum-permutation Word Error Rate (cpWER) to measure transcription accuracy, and Word Diarization Error Rate (WDER) to penalize speaker attribution mistakes.

## Experimental setup

Evaluations span a duration-weighted aggregation of 108 hours of audio across near-field, far-field, and in-the-wild splits. Evaluated models include Indic-specialized pipelines (Sarvam AI), commercial APIs (AWS Transcribe, ElevenLabs Scribe, Azure STT, Deepgram Nova-3, AssemblyAI Universal-2), and multimodal LLMs (GPT-4o Transcribe and Gemini 3 Pro). Performance is quantified via DER, cpWER, and WDER, along with error decompositions tracking missed detections (Miss), false alarms (FA), and speaker confusion (Conf).

## Results

The Indic-specialized Sarvam pipeline achieves the strongest overall metrics, capturing the lowest duration-weighted DER at 16.0% and cpWER at 38.8%, with a well-balanced error profile (6.3% Miss, 3.9% FA, 5.9% Conf). Among commercial APIs, AWS Transcribe leads with 23.5% DER and 43.7% cpWER, while other APIs suffer higher error rates (e.g., Azure STT at 34.8% DER and AssemblyAI at 40.5% DER). Multimodal LLMs exhibit extreme trade-offs: Gemini 3 Pro scores a competitive 33.0% WDER due to strong transcription on detected segments, but collapses on acoustic diarization with a 74.0% DER driven heavily by 41.7% missed detections, whereas GPT-4o secures better diarization but poor cpWER on lower-resource languages.

Ablations and analysis show that speaker overlap strongly degrades performance across all models, with difficult near-field languages like Telugu (24.7% overlap, 27.7% DER), Maithili (24.7% overlap, 22.7% DER), and Dogri (24.2% overlap, 23.2% DER) posing the stiffest challenges. Conversely, cleaner in-the-wild YouTube clips with low overlap (~6.5%) yield the best performance, and Dravidian languages exhibit near-field cpWER roughly 5 percentage points higher than Indo-Aryan languages at comparable DER levels.

| System Category | Model | DER (%) | cpWER (%) | WDER (%) | Miss (%) | FA (%) | Conf (%) |
|---|---|---|---|---|---|---|---|
| Indic-Spec. | Sarvam | 16.0 | 38.8 | 33.1 | 6.3 | 3.9 | 5.9 |
| Comm. APIs | AWS Transcribe | 23.5 | 43.7 | 34.3 | 13.1 | 3.1 | 7.4 |
| Comm. APIs | Deepgram Nova-3 | 32.0 | 63.2 | 39.3 | 18.3 | 5.4 | 8.3 |
| Comm. APIs | ElevenLabs Scribe | 35.0 | 58.3 | 40.7 | 13.6 | 6.2 | 15.3 |
| Mltid. LLM | GPT-4o | 36.2 | 83.1 | 40.4 | 17.7 | 3.8 | 14.7 |
| Mltid. LLM | Gemini 3 Pro | 74.0 | 58.9 | 33.0 | 41.7 | 5.8 | 26.5 |

## Limitations

The benchmark is explicitly designed for evaluation rather than model training. The in-the-wild YouTube subset is restricted to 10 out of the 22 scheduled languages and lacks explicit speaker IDs. Furthermore, performance is heavily skewed by data availability constraints, as 12 lower-resource languages are solely represented via near-field meeting subsets.

## Why read this

Speech and ML engineers building conversational agents or transcription pipelines for multilingual or low-resource settings should read this paper to understand how state-of-the-art commercial APIs and multimodal LLMs fail under heavy speaker overlap and code-mixing in Indian languages.

## Code

- https://huggingface.co/datasets/sarvamai/indic-diarbench

## Applications

Multi-speaker meeting transcription assistants, courtroom and legislative proceedings documentation, and automated customer support call analytics for multilingual Indian markets.

## Institutions / 機構

Sarvam AI, IIT Madras

## Related

- (link related pages by id as the wiki grows)
