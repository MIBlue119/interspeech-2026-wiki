---
id: kumar26e_interspeech
category: tts
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2050
pdf: https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.pdf
---

# Lightweight Cross-Lingual Speaker Adaptation for Indic TTS

[PDF](https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kumar26e_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2050)

**TL;DR** — A lightweight speaker adaptation pipeline adapts an Indic FastSpeech2 model using a single 10-second reference audio sample, achieving 53x faster inference than flow-matching baselines while improving intelligibility and naturalness.

## Problem

Voice-cloning models tailored for Indian languages frequently exhibit word-dropping errors, high word error rates, and severe computational latency stemming from autoregressive or iterative decoding. These flaws prevent efficient, low-resource deployment across major regional languages like Hindi, Marathi, Tamil, and Telugu. Developing high-quality voices typically demands extensive target-speaker data, rendering rapid adaptation from minimal samples impractical.

## Method

The approach utilizes a three-stage pipeline: pretraining a multispeaker base FastSpeech2 model, filtering synthetic adaptation data, and fine-tuning on the target voice. The 71.4M-parameter FastSpeech2 backbone features a 4-layer Conformer encoder/decoder and HiFi-GAN V1 vocoder, pretrained on 119 hours of data across four Indian languages using a Common Label Set (CLS) for cross-lingual phoneme unification. It incorporates dual-site ECAPA-TDNN speaker conditioning—modulating both prosodic features prior to the variance adapter and acoustic features before the decoder—alongside an auxiliary cosine consistency loss. Stage 2 generates 2 hours of synthetic speech via IN-F5 using a 10-second reference sample, cleaned via a four-stage automated filter: phoneme-level CER filtering via a data2vec ASR model (discarding CER > 10%), pitch and duration checks, and log-likelihood pruning. Stage 3 fine-tunes the base model on the filtered corpus for 50 epochs.

## Results

Evaluated on 50 Hindi sentences and 30 sentences each in Marathi, Tamil, and Telugu, comparing against zero-shot IN-F5 and unadapted Base FS2. Intelligibility improves with an 18.6% relative WER reduction on Hindi and 21.8% on cross-lingual tasks over IN-F5, with fine-tuning contributing an additional 14–16% error reduction over Base FS2. Speaker similarity (SECS) reaches 0.87–0.88 for the adapted model, closing the gap with IN-F5 (0.89–0.91). Subjective evaluations across 15 native listeners per language demonstrate consistent gains in MOS and SMOS over baselines. The model delivers fully deterministic outputs (zero variance across repetitions in F0 and syllable rate) and operates at 0.25 seconds per utterance, achieving a 53x speedup over the 13.3-second latency of IN-F5.

## Code

- https://indiclone.github.io

## Applications

Engineers and developers building real-time, personalized, and multilingual voice-cloning applications for low-resource Indian languages.

## Limitations

The current evaluation is scoped to a single demonstrated target speaker, and upper-bound speaker similarity remains bounded by the similarity of the initial synthetic data generation step.

## Related

- (link related pages by id as the wiki grows)
