---
id: joshi26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3272
pdf: https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.pdf
---

# IndicContextEval: A Benchmark for Evaluating Context Utilisation in Audio Large Language Models Across 8 Indic Languages

*Sakshi Joshi, Dhruv Subhash Rathi, Sanskar Singh, Eldho Ittan George, R J Hari, Kaushal Bhogale, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/joshi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3272)

**TL;DR** — IndicContextEval is a 56-hour multilingual benchmark with a 7-level prompting framework (L0-L6) for evaluating contextual grounding in AudioLLMs across 8 Indian languages and 23 professional domains. Evaluating five models reveals that native-script entity prompts yield the strongest gains (Gemini 3 Flash achieving 17.39% NEER), while models diverge significantly in adversarial robustness and context utilization.

## Key contributions

- Introduced IndicContextEval, a 55.93-hour benchmark comprising natural read and extempore speech from 555 speakers across 8 Indian languages and 23 technical domains.
- Designed a controlled 7-level prompting taxonomy (L0 to L6) that progressively introduces metadata, natural-language audio descriptions, English entities, native-script entities, and adversarial prompts.
- Identified a substantial script-mismatch cost by proving that native-script entity prompts (L5) outperform English-script entity prompts (L4) by up to 11 WER points.
- Exposed divergent context-utilization behaviors across models, categorizing them into balanced (GPT-4o), sensitive (Gemini 3), unstable (Gemma-3N), and context-blind (Sarvam Audio).

## Problem

Modern AudioLLMs accept text prompts alongside audio to aid speech recognition of rare or domain-specific terms, but it remains unclear whether models genuinely utilize this context or merely rely on parametric memorization from pretraining. Existing evaluation corpora evaluate transcription under fixed prompting conditions, focus heavily on English and synthetic speech, and rarely test multiple context modalities. Without systematic variation of contextual inputs, researchers cannot determine if performance improvements stem from true contextual grounding or spurious pattern matching. This ambiguity prevents principled improvements to contextual ASR in multilingual settings.

## Method

The benchmark uses 55.93 hours of natural speech split across Hindi, Bengali, Telugu, Marathi, Gujarati, Malayalam, Odia, and Urdu. Recordings encompass 23 professional and technical domains (e.g., core engineering, medical sciences, data science) collected in read and extempore styles from 555 native speakers. Reference transcripts were manually created in native scripts by professional annotators and verified through multi-stage quality control.

The evaluation protocol subjects models to seven prompt levels (L0-L6) keeping the audio and transcription instruction constant. L0 tests bare transcription without language hints; L1 specifies target language only; L2 adds structured metadata (domain, speech style, region); L3 uses a natural-language summary description generated from metadata via Gemini 3 Flash; L4 provides 20-30 domain entities in English; L5 provides the same entities in native script; and L6 provides adversarial (wrong-domain) entities in native script as a negative control.

Evaluation relies on Word Error Rate (WER) using the Indic NLP Library for text normalization and Named Entity Error Rate (NEER) to measure entity biasing. The design strictly isolates variables to measure how format (structured vs. natural language), script alignment (English vs. native), and adversarial interference impact decoding behavior across both proprietary and open-weight AudioLLMs.

## Experimental setup

Evaluated on the 56-hour IndicContextEval dataset spanning 8 Indian languages and 23 domains. Compares one standalone ASR baseline (IndicConformer, 600M parameters) evaluated at L1 against four AudioLLMs (GPT-4o Transcribe, Gemini 3 Flash, Sarvam Audio, and Gemma-3N 8BE4B) evaluated across levels L0-L6. Metrics include Word Error Rate (WER) and Named Entity Error Rate (NEER).

## Results

At L1 language prompt, Sarvam Audio achieves the lowest AudioLLM WER of 16.86%, followed by Gemini 3 Flash (18.90%), GPT-4o Transcribe (28.61%), and Gemma-3N (38.73%), with the standalone IndicConformer scoring 18.81%. Natural-language audio descriptions (L3) consistently outperform structured metadata (L2); for example, GPT-4o Transcribe improves by 2.53 WER points at L3 compared to a negligible 0.24-point change at L2.

Supplying native-script entities (L5) delivers the best entity accuracy across all systems, lowering NEER by 11.7% for GPT-4o, 8.5% for Gemini 3 Flash, 8.6% for Gemma-3N, and 4.2% for Sarvam Audio. In adversarial tests (L6), GPT-4o Transcribe and Sarvam Audio remain robust (L6 roughly equals L1), Gemini 3 Flash exhibits minor sensitivity (+0.77 WER), while Gemma-3N suffers severe degradation (+9.22 WER) alongside hallucinations in 13.2% of samples.

| System / Condition | L1 WER (%) | L5 WER (%) | L5 NEER (%) | L6 WER (%) |
|---|---|---|---|---|
| IndicConformer (ASR) | 18.81 | - | 29.58 | - |
| Sarvam Audio | 16.86 | 15.70 | - | 16.69 |
| Gemini 3 Flash | 18.90 | 17.46 | 17.39 | 19.67 |
| GPT-4o Transcribe | 28.61 | 26.04 | - | 28.47 |
| Gemma-3N (8BE4B) | 38.73 | 43.11 | - | 47.95 |

## Limitations

The benchmark is currently limited to 8 Indian languages and 56 hours of audio, which leaves broader language family coverage and massive-scale multi-accent settings unaddressed. The study evaluates a fixed snapshot of closed and open-weights AudioLLMs without retraining or fine-tuning them on the benchmark data. Additionally, prompt sensitivity analyses were restricted to predefined template structures, leaving potential interactions with complex multi-turn conversational prompts unexplored.

## Why read this

Speech and ML researchers building context-aware AudioLLMs should read this paper to understand how current models fail at contextual grounding and why native-script entity prompting and natural-language descriptions heavily outperform traditional metadata. It provides an essential evaluation paradigm to expose whether a model genuinely exploits context or merely memorizes parameters.

## Code

- https://github.com/AI4Bharat/IndicContextEval

## Applications

Multi-domain automated meeting transcription, medical dictation systems, and voice assistants requiring contextual domain biasing for low-resource Indic languages.

## Related

- (link related pages by id as the wiki grows)
