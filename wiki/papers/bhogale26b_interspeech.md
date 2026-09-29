---
id: bhogale26b_interspeech
category: resources-evaluation
labels: [low-resource, multilingual, dataset-or-benchmark-release, robustness-noise]
institutions: ["Indian Institute of Technology Madras", "Sarvam AI"]
code: https://github.com/AI4Bharat/Vimarsha
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3348
pdf: https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.pdf
---

# Vimarsha: Faithful ASR Evaluation for Indian Languages with Demographic Diversity, In-the-Wild Audio and Spelling Variations

*Kaushal Bhogale, Srija Anand, Sadakopa Ramakrishnan Thothathiri, Tahir Javed, Sshubam Verma, Mitesh M Khapra*

[PDF](https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/bhogale26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3348)

**Category:** `resources-evaluation` · **Labels:** `low-resource`, `multilingual`, `dataset-or-benchmark-release`, `robustness-noise`

**TL;DR** — Vimarsha is a 100-hour benchmark spanning all 22 scheduled Indian languages that evaluates ASR robustness using demographically diverse field recordings, hard in-the-wild audio, and a lattice-of-variations framework to eliminate optimistic and pessimistic evaluation biases. It demonstrates that top-performing models like IndicConformer degrade from ~10-15% WER on clean data to 27-34% on realistic audio.

## Key contributions

- Constructed a 100-hour evaluation dataset across all 22 scheduled Indian languages, combining 43.3 hours of Controlled On-Field (COF) data and 56.1 hours of In-the-Wild (IW) hard acoustic chunks.
- Introduced a lattice of variations framework derived from multi-model hypotheses and human verification by 133 annotators to evaluate against functional orthographic correctness rather than rigid single references.
- Benchmarked 10 state-of-the-art ASR systems (India-centric and global commercial APIs), uncovering severe model rank shifts between clean and real-world conditions.
- Identified critical failure modes across demographic factors, speaking rates (U-shaped degradation outside 8-12 chars/s), and extreme acoustic environments.

## Problem

Current Indian language ASR benchmarks suffer from two orthogonal biases: an optimistic bias from clean, controlled recordings that fail to reflect real-world noise and channel distortions, and a pessimistic bias from rigid single-reference transcription standards that penalize valid spelling variations, loanwords, and code-mixing. Prior benchmarks either focus on read speech under pristine conditions or rely on simple noise augmentations rather than naturally occurring difficult speech. This mismatch misleads researchers on model deployment readiness and obscures true demographic and geographic performance disparities.

## Method

Vimarsha combines 43.3 hours of Controlled On-Field (COF) data collected from 5,100 speakers across 356 districts (spanning read, extempore, and conversational styles at 38.7 dB average SNR) with 56.1 hours of In-the-Wild (IW) audio (at 10.8 dB average SNR). Hard in-the-wild chunks are systematically selected by filtering for high inter-model Word Error Rate/Character Error Rate disagreement across three independently trained ASR models and running BEATs paralinguistic classification to detect adverse acoustic events across 86 tags.

To address transcription rigidity without resorting to hallucination-prone LLM generation, the benchmark introduces a lattice of variations framework. Given a reference utterance, hypotheses from $K$ distinct ASR models are aligned incrementally—starting with pairwise alignment and merging divergent spans into variant groups. A team of 133 human annotators (makers and supercheckers) then reviews, adds, or removes surface forms based on a taxonomy covering diacritics, matras, loanword spellings, compound boundaries, ligature variants, sandhi, and inverse text normalization.

Evaluation is performed using Orthographically-Informed Word Error Rate (OIWER), which computes the minimum edit distance against the best-matching path through the constructed sequence of variant lattices $L = \langle G_1, G_2, \dots, G_N \rangle$. This avoids both the under-permissiveness of strict single references and the over-permissiveness of exhaustive rule expansions.

## Experimental setup

Evaluates 10 ASR systems (India-centric models: IndicConformer, Saaras, Sarvam Audio; and global APIs: AWS Transcribe, Azure STT, AssemblyAI Universal-2, ElevenLabs Scribe v2, GPT-4o Transcribe, Deepgram Nova-3, Gemini 3 Pro) across 22 scheduled Indian languages. The evaluation dataset contains 99.4 total hours (43.3h COF, 56.1h IW) with vocabularies ranging from 3.1K to 19.1K unique word types per language and an average of 1.5 acceptable variants per word. The primary metric is Orthographically-Informed Word Error Rate (OIWER) using batch or streaming default API configurations with language and script prompts.

## Results

Top-performing models like IndicConformer and Saaras degrade sharply from ~10-15% WER on COF to 27-34% average WER on the IW split. Commercial models show massive divergence: AWS Transcribe jumps from 12.2 on COF to 36.8 on IW (a 202% relative increase), while GPT-4o Transcribe collapses to 89.0 average WER on IW, peaking at 167.2 for Assamese and 154.4 for Kannada. Speaking rate exhibits a symmetric U-shaped degradation with optimal performance at 8-12 chars/s, dropping steeply for very slow speech (0-2 chars/s yields 67.4% OIWER even for IndicConformer) and fast utterances.

| System | COF Split WER (%) | IW Split WER (%) |
|---|---|---|
| IndicConformer | ~10-15 | ~27-34 |
| Saaras | - | ~27-34 |
| AWS Transcribe | 12.2 | 36.8 |
| GPT-4o Transcribe | 35.8 | 89.0 |

## Limitations

The benchmark is restricted to the 22 scheduled Indian languages, leaving out hundreds of unlisted regional dialects and minority tongues. The In-the-Wild component relies on YouTube and web video sources, which may underrepresent purely offline or telephony-exclusive conversational environments. Human annotation of variant lattices, while rigorous, may still miss extremely rare idiomatic spellings or highly localized slang.

## Why read this

Speech and ML researchers building multilingual or low-resource ASR systems should read this to understand why clean benchmark scores fail to predict real-world performance and how to properly evaluate models against orthographic and acoustic diversity.

## Code

- https://github.com/AI4Bharat/Vimarsha

## Applications

Robust multilingual speech recognition development, acoustic robustness evaluation, and linguistic bias auditing for AI systems deployed in linguistically diverse regions.

## Institutions / 機構

Indian Institute of Technology Madras, Sarvam AI

**Funding / 經費:** Digital India Bhashini, MeitY, EkStep Foundation, Nilekani Philanthropies

## Related

- [Voice of India: A Large-Scale Benchmark for Real-World Speech Recognition in India](bhogale26_interspeech.md) — same problem · relatedness 2.9/3
- [Spashta Audio-Bench: Unified ASR and TTS Evaluation Framework across Indian Languages](dutta26_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [SCRIBE: Diagnostic Evaluation and Rich Transcription Models for Indic ASR](manohar26_interspeech.md) — same problem · relatedness 2.2/3
- [GLAD-CSpeech: A Dialectologically Comprehensive Benchmark for Genuine Chinese Dialect Speech](xu26j_interspeech.md) — shared data / evaluation · relatedness 2.2/3
- [Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition](juvekar26_interspeech.md) — same problem · relatedness 2.2/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
