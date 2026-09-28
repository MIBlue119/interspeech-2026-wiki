---
id: azeemi26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1382
pdf: https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.pdf
---

# Dissecting ASR Failures in Low-Resource South Asian Languages

[PDF](https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/azeemi26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1382)

**TL;DR** — Evaluating five multilingual ASR models on four low-resource South Asian languages reveals that aggregate WER is heavily skewed by script confusion, Unicode artifacts, and orthographic variation, though rule-based post-processing can recover up to 25 points of WER.

## Problem

Urdu, Punjabi, Pashto, and Sindhi are spoken by over 350 million people but suffer from extreme resource disparities, closely related PersoArabic scripts, unstandardized orthography, and mixed-script named entities. Standard Word Error Rate (WER) evaluations collapse these diverse challenges into a single aggregate number, obscuring whether poor performance stems from acoustic difficulty, decoding failure, or evaluation artifacts. This lack of granular diagnostic understanding hinders the deployment of trustworthy speech interfaces for critical applications like healthcare and government services.

## Method

The study evaluates five models spanning three architecture families—Whisper-medium (769M) and large-v3 (1.5B), MMS-1b (1B CTC), and SeamlessM4T-Medium (1.2B) and Large (2.3B)—across 40 configurations using the Common Voice 22.0 and FLEURS datasets. Zero-shot evaluations are analyzed using a custom 11-category error taxonomy that decomposes aggregate errors into script confusion, orthographic variants, character-level confusions, named entities, OOV/rare word effects, utterance length degradation, cross-language interference, numerals, transliteration patterns, edit operations, and repetition loops. The authors also implement Perso-Arabic Unicode normalization to unify visually identical codepoints and apply rule-based post-processing transliteration via aksharamukha and indoarabic-transliteration.

## Results

SeamlessM4T-Large achieves the best WER on 6 of 8 language-dataset pairs, including 16.3% on Urdu CV and 22.1% on Punjabi CV, while MMS-1b wins both Sindhi pairs. Whisper exhibits catastrophic script confusion, producing wrong-script or garbage outputs on 80% to 100% of utterances in three languages, which artificially inflates its Pashto WER to 165.3%. Simple transliteration post-processing recovers up to 25 percentage points of WER for Whisper without retraining, and Unicode normalization reduces Pashto WER by up to 3.1 points. Named entities are consistently 5 to 20 percentage points harder than non-entities, and short utterances show higher error rates than long ones, reversing standard high-resource patterns.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers developing, benchmarking, or deploying multilingual ASR systems for South Asian or other low-resource, multi-script language families.

## Limitations

The Sindhi Common Voice dataset contains only 40 test utterances, which limits statistical reliability, and the evaluation is strictly restricted to zero-shot inference without domain-specific fine-tuning.

## Related

- (link related pages by id as the wiki grows)
