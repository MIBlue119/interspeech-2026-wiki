---
id: manohar26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-3436
pdf: https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.pdf
---

# SCRIBE: Diagnostic Evaluation and Rich Transcription Models for Indic ASR

[PDF](https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3436)

**TL;DR** — SCRIBE introduces a diagnostic evaluation framework and rich transcription models for Indic languages that decompose errors into lexical, punctuation, numeral, and domain-entity rates using sandhi-tolerant alignment.

## Problem

Standard word error rate (WER) collapses distinct error types into a single scalar and structurally penalizes agglutinative Indic languages by up to 30% due to valid word-boundary merges (sandhi). This limitation prevents developers from obtaining actionable signals for tasks requiring rich transcription, such as medical dictation or legal transcription where formatting and entity accuracy are critical.

## Method

The SCRIBE framework operates in three phases: tokenization with domain shielding to treat punctuation and entities as atomic units, an extended dynamic programming alignment engine that handles sandhi-motivated 1:2 splits and 2:1 merges with phonetic plausibility checks, and categorical error aggregation into a diagnostic vector. The authors curate rich transcription training data using Gemini 2.5 Pro across Hindi, Kannada, and Malayalam (totaling ~2650 hours after quality filtering) and fine-tune Whisper-small and Whisper-medium models in three stages. They also introduce two evaluation benchmarks: FLEURS-RO for general rich transcription and IN22-Legal for domain-specific evaluation.

## Results

Evaluated on FLEURS-RO and IN22-Legal benchmarks, the fine-tuned SCRIBE-ASR models outperform baselines like IndicWhisper and IndicConformer across rich transcription metrics. Human evaluation by expert linguists across 240 samples demonstrates that SCRIBE's categorical error rates correlate strongly with human judgment (Spearman rho absolute values ranging from 0.36 to 0.92, with numeral accuracy reaching 0.92 in Malayalam), whereas monolithic WER fails to achieve statistical significance in several dimensions (p > 0.05).

## Code

- https://github.com/adalat-ai-tech/scribe-eval

## Applications

Speech engineers and developers building automated transcription systems for professional dictation, legal proceedings, and medical notes in morphologically complex or Indic languages.

## Related

- (link related pages by id as the wiki grows)
