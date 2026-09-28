---
id: lopez26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2529
pdf: https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.pdf
---

# S-DiverSe: Spanish Diverse Speech

[PDF](https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lopez26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2529)

**TL;DR** — We introduce S-DiverSe, a 3.2-hour in-the-wild Spanish speech corpus of 22 speakers with neurological conditions, and demonstrate that heuristic text post-processing outperforms acoustic model fine-tuning for out-of-domain pathological speech recognition.

## Problem

Automatic speech recognition struggles significantly with real-world pathological speech caused by neuromotor disorders like ALS, Parkinson's disease, and stroke. While English has resources such as UA-Speech, TORGO, and the Speech Accessibility Project, Spanish lacks diverse in-the-wild corpora covering multiple neurological conditions. This absence hinders robust ASR evaluation and the development of clinical and assistive communication tools for Spanish speakers.

## Method

The S-DiverSe dataset comprises 444 human-transcribed audio segments sourced from spontaneous YouTube interviews and documentaries, annotated for speaker sex, condition, and intelligibility on a 1-5 scale. The paper evaluates four major ASR systems: Whisper-large-v3 (1.6B parameters), Voxtral-Mini (4.7B parameters), omniASR CTC 1B v2 (1B parameters), and ElevenLabs Scribe v2. Adaptation experiments test full fine-tuning (FFT), encoder-only fine-tuning (EFT), and LoRA variants (F-LoRA, E-LoRA) using auxiliary training data from TORGO, NeuroVoz, and Common Voice. Additionally, a rule-based text post-processing pipeline is applied to correct long character repetitions and deduplicate words and phrases.

## Results

On the S-DiverSe corpus, baseline Word Error Rates (WER) are 25.15% for Voxtral-Mini, 37.95% for Whisper-large-v3, 20.86% for omniASR CTC 1B v2, and 20.69% for Scribe v2. Rule-based post-processing consistently reduces WER across models (e.g., Whisper-large-v3 drops from 37.95% to 23.73% on S-DiverSe). Conversely, full fine-tuning and LoRA adaptations on out-of-domain data frequently degrade generalization, with Whisper-large-v3 collapsing to extreme WERs exceeding 100% due to hallucination-driven insertions and substitutions.

## Code

- https://github.com/ferugit/s-diverse

## Applications

Speech engineers and researchers developing robust automatic speech recognition systems, assistive communication technologies, and clinical assessment tools for speakers with dysarthria and neurological disorders.

## Limitations

The corpus is modest in size (3.2 hours) and exhibits male and ALS dominant imbalances reflecting findable in-the-wild data availability, precluding reliable train/test data partitioning for target-domain training.

## Related

- (link related pages by id as the wiki grows)
