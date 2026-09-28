---
id: alizadeh26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2454
pdf: https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.pdf
---

# The Impact of Informal Persian Speech on Low-Resource ASR and Speech Translation

[PDF](https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/alizadeh26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2454)

**TL;DR** — This paper introduces the Toorintan-Persian Informal Dataset (T-PID) for low-resource Persian ASR and speech translation, demonstrating substantial WER and BLEU improvements via domain adaptation.

## Problem

Most existing Persian speech corpora rely on formal, scripted, or read text such as broadcast news or read audiobooks. This formal-informal register mismatch introduces acoustic-text alignment noise, causing high word error rates and severe model hallucinations on conversational speech.

## Method

The authors curated T-PID, containing 36.77 hours of isolated informal Persian speech extracted from films and TV shows, transcribed by native annotators, and translated into English using GPT-4o mini with targeted manual corrections. They fine-tuned Whisper-small, Whisper-medium, and Wav2Vec2-BERT models for ASR, and NLLB-200 for machine translation within a cascaded speech-to-text translation pipeline. They also developed and released a general Persian text normalizer.

## Results

Evaluated on Common Voice 9, FLEURS, and the T-PID test set using WER and BLEU metrics, fine-tuning on T-PID drastically reduced baseline Whisper hallucinations and errors. On the T-PID test set, Wav2Vec2-BERT achieved the lowest WER of 29.09% (compared to 200.83% and 361.25% for unadapted small/medium Whispers) and the highest cascade BLEU score of 25.30 when paired with fine-tuned NLLB-200.

## Code

- https://huggingface.co/datasets/Toorintan

## Applications

Speech and ML engineers building ASR, machine translation, or speech translation systems for low-resource or colloquial languages.

## Limitations

The dataset is limited to approximately 37 hours of audio after filtering, and contains audio sources that may include background noise or reverberation.

## Related

- (link related pages by id as the wiki grows)
