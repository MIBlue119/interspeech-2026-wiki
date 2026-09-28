---
id: alyafeai26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1049
pdf: https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.pdf
---

# Hamsa: A Manually Annotated Emirati Arabic Corpus for Speech and Language Technologies

[PDF](https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alyafeai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1049)

**TL;DR** — The paper introduces Hamsa, an 11-hour manually annotated Emirati Arabic speech-to-text corpus that reduces Word Error Rates for Whisper-v2 from over 40% to below 25% through dialect-matched fine-tuning.

## Problem

Emirati Arabic is a prominent Gulf dialect that lacks dedicated annotated speech resources, as existing Arabic datasets focus heavily on Modern Standard Arabic, Egyptian, or Levantine varieties. Consequently, state-of-the-art multilingual automatic speech recognition models frequently fail on Emirati conversational speech due to phonological shifts, distinct negation particles, and dialect-specific morphological rules.

## Method

The authors collected 11 hours of conversational Emirati Arabic audio across 4,174 samples (averaging 63 seconds each) via web scraping, filtering out overlapping speech. Five native speakers manually transcribed the data, followed by a secondary review pass by a single annotator covering 45% of the corpus using strict dialectal guidelines via a custom Streamlit interface. State-of-the-art multilingual ASR models—specifically Whisper-v2, Whisper-v3, Seamless-M4T, and MMS-1B—were fine-tuned using the Hugging Face Trainer library with a batch size of 32, a learning rate of 1e-5, and FP16 mixed precision.

## Results

Evaluated on the Hamsa test split (51 minutes, 861 samples) and the independent Mixat benchmark, fine-tuning on Hamsa yielded substantial error reductions. For instance, Whisper-v2 Word Error Rate (WER) dropped from 42.25% to 24.46%, and Whisper-v3 improved from 29.69% to 23.04%. Zero-shot baseline models exhibited severe character error rates (e.g., Whisper-v2 at 71% CER) driven by four primary error classes: phonological substitution, dialect-specific negation, feminine morphology, and orthographic normalization.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers building dialect-aware ASR, machine translation, automatic subtitling, call center automation, and LLM applications for the Gulf region.

## Limitations

The corpus is currently limited to 11 hours, lacks formal inter-annotator agreement metrics due to non-overlapping tasks, features non-speaker-independent splits, and will initially distribute metadata and collection scripts rather than raw audio files pending licensing agreements.

## Related

- (link related pages by id as the wiki grows)
