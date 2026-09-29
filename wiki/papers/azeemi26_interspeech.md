---
id: azeemi26_interspeech
category: asr
labels: [low-resource, multilingual, self-supervised]
institutions: ["Lahore University of Management Sciences"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1382
pdf: https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.pdf
---

# Dissecting ASR Failures in Low-Resource South Asian Languages

*Abdul Hameed Azeemi, Ihsan Ayyub Qazi, Maryam Mustafa, Agha Ali Raza*

[PDF](https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1382)

**Category:** `asr` · **Labels:** `low-resource`, `multilingual`, `self-supervised`

**TL;DR** — Evaluating five multilingual ASR models across four South Asian languages using a novel 11-category error taxonomy reveals that script confusion drives up to 100%+ WER in Whisper, while Unicode ambiguity and cross-language contamination severely distort standard evaluations.

## Key contributions

- Comprehensive benchmark of 5 models spanning 3 architectures (Whisper, MMS, SeamlessM4T) across 4 low-resource South Asian languages over 40 configurations.
- A fine-grained 11-category error taxonomy for dissecting multilingual, multi-script low-resource ASR failures.
- Quantification of Unicode normalization artifacts (e.g., Pashto Yeh variants inflating WER by up to 3.1 percentage points) and orthographic confounds.
- Demonstration that simple rule-based transliteration post-processing recovers up to 25 pp of WER for Whisper without any model retraining.

## Problem

Urdu, Punjabi, Pashto, and Sindhi are spoken by over 350 million people but suffer from severe resource disparities, unstandardized orthographies, overlapping Perso-Arabic scripts, and mixed-script named entities. Prior evaluations relied solely on aggregate Word Error Rate (WER), which collapses distinct failure modes like acoustic recognition, script-level decoding errors, and Unicode representation artifacts into a single uninformative number.

## Method

The study evaluates five representative models: Whisper-medium (769M) and Whisper-large-v3 (1.5B) as autoregressive encoder-decoder architectures; MMS-1b (1B) as a CTC-based encoder; and SeamlessM4T-Medium (1.2B) and SeamlessM4T-Large (2.3B) as encoder-decoders equipped with language adapters. These architectures are tested in zero-shot inference across Common Voice 22.0 and FLEURS datasets, assessing how autoregressive hallucination, CTC immobility, and adapter-based script guidance impact performance. An LLM-based pipeline using Claude Haiku 4.5 is employed to annotate named entities into four categories (PER, LOC, ORG, MISC), while word frequencies are computed from training-set transcripts to study vocabulary-dependent error gradients.

To decouple recognition failure from script and orthographic artifacts, the authors apply an 11-category error taxonomy covering script confusion, edit operations, repetition loops, numeral handling, orthographic variants, character-level confusions, named entities, Latin tokens, OOV/rare words, utterance length, and cross-language interference. Rule-based transliteration engines (aksharamukha and indoarabic-transliteration) and systematic Perso-Arabic Unicode normalization (unifying visually identical codepoints like Yeh, Kaf, Heh, Hamza, and Alef variants) are implemented to measure recoverable accuracy.

## Experimental setup

Evaluated on Common Voice 22.0 and FLEURS datasets across four languages (Urdu, Punjabi, Pashto, and Sindhi) with test splits ranging from 40 utterances (Sindhi CV) to 5,082 utterances (Urdu CV). Systems compared include MMS-1b, SeamlessM4T-Medium, SeamlessM4T-Large, Whisper-medium, and Whisper-large-v3. Metrics include Word Error Rate (WER) and Character Error Rate (CER) computed using jiwer, alongside LLM-annotated named entity accuracy and error type distributions.

## Results

SeamlessM4T-Large achieves the best WER on 6 of 8 language-dataset conditions, recording 16.3% on Urdu and 22.1% on Punjabi on FLEURS, whereas MMS-1b performs best on Sindhi (23.5% on FLEURS). Whisper models suffer catastrophic failures on lower-resource settings, registering WER >100% (e.g., 165.3% on Pashto CV) due to high rates of wrong-script outputs and autoregressive looping. Rule-based post-processing transliteration recovers up to 25.0 pp WER on Punjabi and 7.6 pp on Sindhi for Whisper-medium. Unicode normalization drops Pashto WER by an average of 3.1 percentage points. Rare words exhibit a severe 30-45 pp accuracy gap compared to common words, and short utterances demonstrate a reversed high-resource pattern where 1-5 word sentences reach ~76% mean WER.

| System / Condition | Urdu (FLEURS) | Punjabi (FLEURS) | Pashto (FLEURS) | Sindhi (FLEURS) |
|---|---|---|---|---|
| MMS-1b | 29.7% | 30.2% | 43.9% | 23.5% |
| SeamlessM4T-Medium | 18.6% | 29.1% | 57.6% | 60.2% |
| SeamlessM4T-Large | 16.3% | 22.1% | 43.8% | 55.5% |
| Whisper-medium | 28.3% | 101.2% | 103.5% | 109.9% |
| Whisper-large-v3 | 21.6% | 87.8% | 89.2% | 100.7% |

## Limitations

The evaluation is restricted to zero-shot inference, omitting fine-tuning or prompt-tuning experiments that could mitigate script confusion. Sindhi Common Voice relies on a severely limited test set of only 40 utterances, restricting statistical confidence. The study focuses exclusively on read-aloud speech datasets, leaving spontaneous and code-mixed conversational speech unaddressed.

## Why read this

Speech researchers and engineers building multilingual ASR for non-Latin, low-resource scripts should read this paper to understand why standard WER and zero-shot autoregressive models fail, and how language adapters and simple Unicode/transliteration fixes can drastically improve real-world robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Development of robust speech technology for underrepresented regional languages, deployment of accessible voice interfaces for low-literacy populations in government and healthcare services, and enhancement of multi-script evaluation pipelines.

## Institutions / 機構

Lahore University of Management Sciences

## Related

- [SCRIBE: Diagnostic Evaluation and Rich Transcription Models for Indic ASR](manohar26_interspeech.md) — same problem · relatedness 2.4/3
- [Overcoming Decoder Inconsistencies in Whisper for Dravidian and Low-Resource Languages](kumar26c_interspeech.md) — same problem · relatedness 2.2/3
- [Vimarsha: Faithful ASR Evaluation for Indian Languages with Demographic Diversity, In-the-Wild Audio and Spelling Variations](bhogale26b_interspeech.md) — same problem · relatedness 2.1/3
- [Preserving the Iranian Turkic Language: Community-Driven ASR Datasets and Benchmarking for South Azerbaijani](farsi26_interspeech.md) — same problem · relatedness 2.1/3
- [Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition](juvekar26_interspeech.md) — same problem · relatedness 2.1/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
