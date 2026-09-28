---
id: kolani26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-604
pdf: https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.pdf
---

# Phonikud: Overcoming Phonetic Underspecification for Hebrew Text-To-Speech

*Yakov Kolani, Maxim Melichov, Cobi Calev, Morris Alper*

[PDF](https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-604)

**TL;DR** — Phonikud introduces an open-source Hebrew grapheme-to-phoneme (G2P) pipeline and the ILSpeech corpus to resolve phonetic underspecification, enabling small, local TTS models (<100M parameters) to approach the quality of large proprietary systems.

## Key contributions

- Phonikud G2P system: An open-source Hebrew G2P pipeline that outputs fully-specified IPA by augmenting a frozen base diacritizer (DictaBERT) with lightweight, trainable MLPs predicting stress, shva quality, and prefix boundaries.
- ILSpeech corpus: A ~2-hour high-quality Hebrew speech dataset featuring paired audio, text, and expert-annotated International Phonetic Alphabet (IPA) transcriptions.
- Hebrew G2P benchmark & audio-to-IPA evaluation: Establishes a benchmark for Hebrew G2P and trains Hebrew audio-to-IPA ASR models to accurately capture phonetic details like vowel quality and stress for TTS evaluation.
- Efficient localized TTS: Demonstrates that training compact TTS architectures (Piper/VITS and StyleTTS2) on Phonikud's IPA representation significantly outperforms existing open-source Hebrew TTS systems.

## Problem

Modern Hebrew orthography suffers from severe phonetic underspecification: texts omit vowel marks (nikud), lexical stress is largely unpredictable from word shape, shva vowels are ambiguous (silent vs /e/), and loanwords introduce hidden phonemes like /w/ vs /v/. Standard TTS systems either ingest raw text directly or rely purely on standard vowel diacritization, leaving critical phonetic ambiguities unresolved and causing salient mispronunciations. Furthermore, standard automatic evaluation via ASR is ineffective because Hebrew ASR outputs unvocalized text, leaving it completely blind to vowel quality and stress errors.

## Method

Phonikud operates via a two-stage process: enhanced diacritization followed by rule-based IPA conversion. First, a frozen ~300M parameter DictaBERT encoder (`dicta-il/dictabertlarge-char-menaked`) processes character tokens through a trainable two-layer multilayer perceptron (MLP) head with a hidden dimension of 256 and ReLU activation. This MLP predicts three supplementary symbols: a superscript angle for non-final syllable stress, a subscript line for pronounced shva (/e/), and a vertical bar for cliticized prefix boundaries. Training these components relies on pseudo-ground truth annotations automatically derived from the 5M-line IsraParlTweet corpus using morphological rules, followed by manual correction of the top 1,000 most frequent word types (early stopping at ~6 epochs, batch size 256, learning rate 5e-3, 5% validation split on a single RTX 4090 GPU).

In the second stage, a deterministic rule-based algorithm powered by finite-state transducers and dictionaries translates the enhanced vocalized text into standard IPA. This handles complex many-to-one grapheme mappings, dual-function letters (e.g., vav), and irregular words. The resulting fully-specified IPA strings are then fed into lightweight downstream TTS models such as Piper (VITS High, 32M parameters) and StyleTTS2 (90M parameters), which are initialized from English checkpoints and trained for ~10 hours using default hyperparameters on 20 hours of synthetic Hebrew audio generated via Gemini 2.5 Pro.

## Experimental setup

Evaluations utilize the ILSpeech corpus (~2 hours of studio-recorded speech from 2 speakers at 44kHz, enhanced with Adobe Enhance and downsampled to 22.05kHz) and a 100-sample random subset for G2P testing. Downstream TTS is benchmarked on 100 samples from the SASPEECH corpus and a specialized 250-sentence stress ambiguity test set. Baselines include open-source diacritizers (DictaBERT, Nakdimon), multilingual G2P libraries (e.g., eSpeak NG, CharsiuG2P), LLMs (Claude Opus 4.6, Gemini 3.1 Pro), open-source TTS models (Robo-Shaul, SASPEECH, MMS, HebTTS), and proprietary APIs (Gemini 2.5 Flash, OpenAI GPT-4o mini). Metrics include Word Error Rate (WER), Character Error Rate (CER), Exact Match (EM), Word Error Rate ignoring stress (WER^σ), Real-Time Factor (RTF), and a 7-point CMOS user study.

## Results

On the G2P benchmark, Phonikud achieves a WER of 17.4%, WER^σ of 12.2%, CER of 3.8%, and Exact Match of 17.0%, significantly outperforming realtime baselines like DictaBERT (39.5% WER) and Nakdimon (40.5% WER, both p < 10^-10), while approaching proprietary LLMs like Gemini 3.1 Pro (13.9% WER). For downstream TTS evaluated on SASPEECH using audio-to-IPA ASR, StyleTTS2 with Phonikud achieves a WER of 35.2% and CER of 8.9%, beating open-source models like Robo-Shaul (50.4% WER) and MMS (63.6% WER) and approaching proprietary systems (Gemini at 29.4% WER). In human evaluations, users preferred Phonikud-backed StyleTTS2 over Robo-Shaul with a CMOS of +1.3 for naturalness (p < 10^-4) and +0.7 for content fidelity (p < 0.01). On the 250-sentence stress evaluation set, the full method achieved a stress WER of only 3.2% and 77.0% Exact Match, compared to 8.4% WER without stress modeling. Ablation tests show that removing enhanced diacritization increases TTS WER from 49.9% to 55.0%, and removing vowel diacritics entirely causes degradation up to 69.4% WER.

| Model | WER ↓ | CER ↓ | RTF ↓ | # Params |
|---|---|---|---|---|
| Phonikud-Based StyleTTS2 | 35.2 | 8.9 | 0.50 | 90M |
| Phonikud-Based Piper (High) | 44.3 | 10.5 | 0.13 | 32M |
| Robo-Shaul (Open) | 50.4 | 14.9 | 1.58 | 28M |
| MMS (Open) | 63.6 | 19.6 | 0.21 | 36M |
| Gemini (Proprietary) | 29.4 | 6.6 | 0.80 | — |
| OpenAI (Proprietary) | 35.0 | 8.7 | 1.60 | — |

## Limitations

The method inherits inherent limitations from the underlying Hebrew diacritization model, including occasional vowel inaccuracies and adherence to formal written Hebrew conventions that can diverge from colloquial spoken norms (e.g., formal /sigr'i/ vs. informal /sger'i/). The ILSpeech corpus is currently limited to two speakers and roughly two hours of data. Furthermore, complex text normalization challenges such as reading numbers, dates, and addresses remain unaddressed.

## Why read this

Researchers and engineers working on low-resource, orthographically ambiguous languages will learn how to design targeted linear adaptors for frozen large encoder models to resolve phonetic underspecification without full re-training. It offers a blueprint for building high-performing, lightweight local TTS systems that rival large cloud APIs.

## Code

- https://phonikud.github.io

## Applications

Screen readers, smart home voice assistants, local text-to-speech engines for Hebrew, and automated speech evaluation tools for low-resource languages.

## Related

- (link related pages by id as the wiki grows)
