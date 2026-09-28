---
id: dutta26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1777
pdf: https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.pdf
---

# Spashta Audio-Bench: Unified ASR and TTS Evaluation Framework across Indian Languages

[PDF](https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/dutta26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1777)

**TL;DR** — Spashta Audio-Bench is a modular evaluation framework for ASR and TTS across 23 Indian languages that uncovers significant gaps in parameter scaling, domain robustness, and the trade-off between speech naturalness and intelligibility.

## Problem

Evaluating Indian language speech technology is currently fragmented across isolated datasets, inconsistent preprocessing pipelines, and single-metric scoring. This lack of standardization obscures critical failure modes such as extreme performance drops under domain shift, poor generalization in low-resource and agglutinative languages, and the divergence between perceptual naturalness and actual linguistic intelligibility.

## Method

The framework uses a four-stage pipeline comprising a data ingestion layer, a preprocessing layer (16 kHz mono resampling, UTF-8 normalization, lowercasing, punctuation removal), a plug-and-play model layer, and a centralized scoring engine. It evaluates 10 open-source ASR and TTS models (ranging from 82M to ~2B parameters, including IndicConformer, AudioX, MMS-TTS, and Parler) across 7 major corpora containing 275+ hours of speech. For TTS evaluation, it introduces TTS-ASR degradation (using IndicConformer as an ASR oracle) alongside Frechet Audio Distance (FAD) and neural-predicted MOS (DNSMOS and P.808).

## Results

Evaluated across 7 corpora (IndicTTS, IndicVoices, Nirantar, RASA, OpenSLR, etc.) and 23 languages. IndicConformer (600M) frequently outperforms larger 2B-parameter models like AudioX on read speech, while Wav2Vec2 models degrade sharply on spontaneous corpora (WER >63%). For TTS, high predicted MOS models like Parler (pMOS 4.13–4.15) do not yield the best intelligibility, whereas MMS-TTS achieves lower TTS-ASR WER (36.14%). Language-wise, low-resource Indo-Aryan languages like Maithili and Dogri exhibit WERs >56%, whereas Urdu achieves 9.38% WER due to high lexical overlap with Hindi and normalization of Perso-Arabic scripts.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech and ML engineers working on multilingual or low-resource speech technologies can use this framework to benchmark, compare, and debug ASR and TTS checkpoints against standardized Indian language corpora.

## Limitations

Neural estimators like DNSMOS and P.808 have limited calibration for Indian language phonology, meaning predicted MOS scores do not always align with human judgments of intelligibility.

## Related

- (link related pages by id as the wiki grows)
