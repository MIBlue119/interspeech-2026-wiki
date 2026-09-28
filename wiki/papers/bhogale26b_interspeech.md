---
id: bhogale26b_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3348
pdf: https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.pdf
---

# Vimarsha: Faithful ASR Evaluation for Indian Languages with Demographic Diversity, In-the-Wild Audio and Spelling Variations

[PDF](https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3348)

**TL;DR** — Vimarsha is a 100-hour benchmark spanning all 22 scheduled Indian languages that evaluates ASR robustness against acoustic diversity and spelling variations, revealing substantial model re-rankings under realistic conditions.

## Problem

Current Indian language ASR benchmarks suffer from optimistic biases due to clean, controlled audio settings and pessimistic biases from rigid transcription standards that penalize valid spelling variants and loanwords. This misalignment masks true model performance in real-world deployments involving background noise, diverse accents, and spontaneous speech. Vimarsha addresses both issues by combining acoustically difficult in-the-wild audio with a flexible lattice of variations framework.

## Method

The benchmark comprises 43.3 hours of Controlled On-Field (COF) data from 5,100 speakers across 356 districts and 56.1 hours of In-the-Wild (IW) data mined from internet videos and filtered for high acoustic difficulty using multi-model ASR disagreement and BEATs paralinguistic classification. To tackle orthographic rigidity, the authors construct a lattice of variations where multi-model hypotheses are aligned and subsequently verified and augmented by 133 human annotators. Evaluation uses Orthographically-Informed Word Error Rate (OIWER) against the best-matching path through this variation lattice. The paper evaluates 10 state-of-the-art ASR systems, including India-centric models (IndicConformer, Saaras, Sarvam Audio) and global commercial APIs (AWS Transcribe, Azure STT, GPT-4o Transcribe, Gemini 3 Pro).

## Results

Evaluated across 22 languages, all models degrade significantly on the IW split compared to COF, with top systems like IndicConformer and Saaras dropping from 10-15% average WER to 27-34% average WER. Certain commercial models experience severe degradation on noisy audio, such as GPT-4o Transcribe jumping from 35.8% on COF to 89.0% on IW, and individual language errors reaching up to 167.2% in Assamese. Bodo and Kashmiri emerge as universally challenging across all models, while speaking rate analysis reveals a U-shaped degradation curve with peak performance at 8-12 characters per second.

## Code

- https://github.com/AI4Bharat/Vimarsha

## Applications

Speech engineers and researchers evaluating multilingual ASR systems for real-world deployment in low-resource and linguistically diverse environments like India.

## Limitations

The benchmark scope is constrained to 100 hours across 22 languages, which may not capture every dialectal subtlety within heavily populated language regions.

## Related

- (link related pages by id as the wiki grows)
