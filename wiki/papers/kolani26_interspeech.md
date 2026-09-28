---
id: kolani26_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-604
pdf: https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.pdf
---

# Phonikud: Overcoming Phonetic Underspecification for Hebrew Text-To-Speech

[PDF](https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kolani26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-604)

**TL;DR** — Phonikud introduces an open-source grapheme-to-phoneme pipeline and expert-annotated corpus for Modern Hebrew, resolving phonetic underspecification to enable small local TTS models to rival large proprietary systems.

## Problem

Modern Hebrew orthography omits crucial phonetic details such as vowel diacritics, shva pronunciation, and lexical stress placement, causing standard text-to-speech systems and automatic evaluation methods to suffer from severe phonetic inaccuracies. Existing ASR-based evaluation models fail to detect these errors because they output unvocalized text, leaving vowel quality and stress blind spots. This paper addresses both the speech production and automatic evaluation gaps by building a unified phonemically-specified framework.

## Method

The framework consists of Phonikud, a G2P pipeline built by freezing a 300M-parameter DictaBERT diacritizer and attaching a trainable two-layer MLP adaptor to predict three enhanced diacritics (stress marks, pronounced shva, and clitic boundaries). A deterministic finite-state transducer and dictionary-matching module then translates these enhanced forms into fully-specified International Phonetic Alphabet (IPA) transcriptions. The authors also collect ILSpeech, a two-hour studio-recorded corpus with expert IPA annotations, and fine-tune a Whisper-small model on audio-to-IPA pairs to serve as an automatic evaluator. Downstream text-to-speech is evaluated by training lightweight Piper (32M parameters, VITS) and StyleTTS2 (90M parameters) models on IPA inputs derived from a 20-hour synthetic dataset.

## Results

On a 100-sample ILSpeech benchmark subset, Phonikud achieves a word error rate (WER) of 17.4% and a character error rate (CER) of 3.8%, substantially outperforming baseline diacritizers like DictaBERT and Nakdimon (which score over 39% WER) and approaching costly LLM baselines. When integrated into lightweight TTS engines like StyleTTS2, Phonikud achieves a WER of 35.2%, nearing the performance of large proprietary systems like OpenAI and Google. In manual stress evaluations across 250 challenging sentences, the full method achieves an exact match stress accuracy of 77.0%, compared to 46.4% without explicit stress modeling.

## Code

- https://phonikud.github.io

## Applications

Engineers and developers building localized, low-latency Hebrew text-to-speech applications, screen readers, smart home technologies, and speech evaluation suites.

## Limitations

The system inherits underlying limitations from its base diacritization model, including occasional vowel errors and strict adherence to formal written Hebrew conventions that can diverge from informal spoken norms.

## Related

- (link related pages by id as the wiki grows)
