---
id: alyafeai26_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1049
---

# Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies

**TL;DR** — Hamsa is an 11-hour, manually transcribed corpus of conversational Emirati Arabic that cuts Whisper's word error rate on the dialect from over 40% to below 25% after fine-tuning.

## Problem

Emirati Arabic, a widely spoken Gulf dialect, has very little annotated speech data, which limits dialect-aware ASR and other language technologies for the region.

## Method

The authors collect and manually transcribe 11 hours of natural conversational Emirati Arabic recordings from multiple emirates, validated by native speakers to preserve authentic pronunciation and regional variation, then fine-tune multilingual ASR models (including Whisper) on the resulting corpus.

## Results

Fine-tuning on Hamsa reduces word error rate substantially, from over 40% down to below 25% for Whisper-v2, demonstrating the corpus's value for dialectal ASR adaptation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Dialect-aware ASR, machine translation, automatic subtitling, and commercial uses such as Emirati Arabic call-center automation.

## Related

- (link related pages by id as the wiki grows)
