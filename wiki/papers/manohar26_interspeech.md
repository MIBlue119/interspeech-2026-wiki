---
id: manohar26_interspeech
category: resources-evaluation
labels: [multilingual]
institutions: ["Adalat AI"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3436
pdf: https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.pdf
---

# SCRIBE: Diagnostic Evaluation and Rich Transcription Models for Indic ASR

*Kavya Manohar, Arghya Bhattacharya, Kush Juvekar, Kumarmanas Nethil*

[PDF](https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/manohar26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3436)

**Category:** `resources-evaluation` · **Labels:** `multilingual`

**TL;DR** — SCRIBE is a diagnostic evaluation framework and open-weight rich transcription model suite for Indic languages that decomposes errors into lexical, punctuation, numeral, and domain-entity rates using sandhi-tolerant alignment. It reveals that standard Word Error Rate (WER) inflates error counts by up to 30% relative due to morphological word-boundary merges in agglutinative Dravidian languages.

## Key contributions

- Released the SCRIBE evaluation library featuring sandhi-tolerant dynamic programming alignment supporting 1:2 (split) and 2:1 (merge) transitions.
- Proposed a diagnostic error vector E = [ERlex, ERpunc, ERnum, ERent] and aggregated WERS, proving higher correlation with expert human judgment than monolithic WER.
- Provided a reproducible Indic rich transcription pipeline leveraging Gemini 2.5 Pro for data curation and releasing open-weight models for Hindi, Kannada, and Malayalam.
- Introduced two evaluation benchmarks: FLEURS-RO (general rich orthography) and IN22-Legal (domain-specific out-of-distribution legal dictation).

## Problem

Automatic speech recognition (ASR) utility depends on rich transcription (punctuation, standardized numerals, domain formatting) and whether editing takes less time than manual typing. Standard Word Error Rate fails because it collapses all failure modes into a single non-actionable scalar. Furthermore, WER is structurally broken for morphologically complex Dravidian languages like Malayalam and Kannada, where valid phonotactic word-boundary merges (sandhi) trigger cascading 1:1 alignment mismatches that artificially inflate error rates by up to 30%.

## Method

The SCRIBE framework operates in three sequential phases: tokenization and domain shielding, a sandhi-aware alignment engine, and categorical error aggregation.

In Phase 1, the system transforms reference and hypothesis text into typed tokens (lexeme, numeral, punctuation, domain-entity), ensuring standard marks (e.g., Hindi danda) and compound-word/numeral punctuation are preserved rather than blindly stripped, while user-defined domain entities are shielded via regex to act as atomic units.

Phase 2 employs an extended dynamic programming alignment engine scoring exact matches (alpha = +4.0), a category-clash penalty (beta = -3.0) for mismatched token types, and a Levenshtein-buffered penalty for same-category substitutions (delta = -1.5 - 0.2*d, where character distance d <= 2). Sandhi scores (Sigma) evaluate phonetic plausibility for 1:2 and 2:1 mappings by checking whether a fused form matches the prefix/suffix of adjacent words within a boundary distance threshold (d <= 2), applying a sandhi penalty (sigma = -0.5).

Phase 3 aggregates errors into a diagnostic error vector E = [ERlex, ERpunc, ERnum, ERent] using a shared combined denominator N_comb, summing to the global WERS. Models (SCRIBE-ASR based on Whisper-small and Whisper-medium) are trained using a three-stage recipe: acoustic diversity adaptation, pace/style robustness, and precision tuning on ~1000h Hindi, ~850h Kannada, and ~800h Malayalam curated via Gemini 2.5 Pro.

## Experimental setup

Datasets comprise ~1000h Hindi, ~850h Kannada, and ~800h Malayalam curated from public Indic speech corpora using Gemini 2.5 Pro with a ~10% quality-control filter discard rate. Evaluated on FLEURS-RO (general) and IN22-Legal (~30 minutes per language across 2-4 speakers). Compared against IndicWhisper (Vistaar) and IndicConformer baselines. Human evaluation utilized 8 expert linguists rating 240 total samples (80 per language) on a continuous 1.0-5.0 scale across three dimensions, measuring Spearman rho against SCRIBE error rates and monolithic WER.

## Results

SCRIBE-ASR achieves the lowest WER across all conditions, recording 17.57% on FLEURS-RO Hindi and 19.29% on IN22-Legal Hindi (compared to 35.20% and 66.37% for IndicWhisper). In the Malayalam Legal set, monolithic WER reports a high 44.52%, but SCRIBE decomposition reveals that true lexical error (ERlex) is only 15.96%, proving that morphological sandhi inflation accounts for roughly 30% relative of the error score. Numeral formatting near-saturates with ERnum < 1% (a 75-96% relative reduction over baselines), and domain entity error remains below 2% on OOD legal data. Punctuation error (ERpunc) remains the primary bottleneck, with Malayalam Legal reaching 12.12% ERpunc.

| System | Dataset | ERlex (%) | ERnum (%) | ERpunc (%) | WERS (%) | WER (%) |
|---|---|---|---|---|---|---|
| IndicWhisper | FLEURS-RO Hindi | 23.80 | 1.06 | 6.87 | 31.73 | 35.20 |
| IndicConformer | FLEURS-RO Hindi | 10.16 | 1.35 | 6.99 | 18.50 | 21.70 |
| SCRIBE-ASR | FLEURS-RO Hindi | 11.68 | 0.31 | 3.30 | 15.29 | 17.57 |
| IndicWhisper | IN22-Legal Hindi | 45.42 | 2.23 | 8.70 | 60.18 | 66.37 |
| IndicConformer | IN22-Legal Hindi | 10.59 | 2.56 | 8.70 | 22.52 | 26.32 |
| SCRIBE-ASR | IN22-Legal Hindi | 8.58 | 0.59 | 6.73 | 16.49 | 19.29 |

## Limitations

The current evaluation scope is limited to three Indic languages (Hindi, Kannada, Malayalam) and relies on LLM-based curation (Gemini 2.5 Pro) which introduces potential automated pipeline biases, despite human linguistic validation. Punctuation segmentation in highly agglutinative Dravidian contexts remains challenging due to long compound wordforms. The regex-based domain shielding layer requires manual or domain-specific customization for effective entity-rate extraction.

## Why read this

Researchers and engineers building speech recognition systems for morphologically complex or agglutinative languages should read this to understand why standard WER is structurally misleading and how categorical diagnostic decomposition enables targeted model remediation.

## Code

- https://github.com/adalat-ai-tech/scribe-eval

## Applications

Development and evaluation of professional dictation tools, legal transcription systems, and medical note-taking platforms for low-resource and agglutinative languages.

## Institutions / 機構

Adalat AI

## Related

- (link related pages by id as the wiki grows)
