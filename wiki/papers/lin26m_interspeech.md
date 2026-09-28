---
id: lin26m_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2583
pdf: https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.pdf
---

# Assessing True Generalisability of Audio-Visual Speech Recognisers

[PDF](https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lin26m_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2583)

**TL;DR** — Evaluating five state-of-the-art audio-visual speech recognition models on a new distributionally matched test set derived from MultiVSR reveals a universal performance collapse, with error rates surging from under 1.5% to upwards of 14%.

## Problem

Current audio-visual speech recognition (AVSR) systems achieve near-perfect performance on the standard LRS3 benchmark, raising concerns of adaptive overfitting and artificial performance saturation. Because LRS3 is exceptionally small, it remains unclear whether state-of-the-art models genuinely understand audio-visual speech or are simply memorizing the specific characteristics of the dataset. This paper addresses the lack of a rigorously controlled evaluation set that isolates true generalisability while matching acoustic, visual, and demographic distributions.

## Method

The authors construct a new evaluation set named MultiVSR2LRS3 (MV2LRS3) by subsampling the MultiVSR corpus using an eight-dimensional k-nearest neighbour matching strategy across seven metadata factors: utterance duration, speaker age, gender, apparent skin tone (Monk skin tone scale), head yaw pose, signal-to-noise ratio, and speech rate. Empirically optimized feature weights are applied during matching to balance covariates against the LRS3 test reference distribution. Five prominent AVSR models are evaluated: AV-HuBERT, Auto-AVSR, USR, Whisper-Flamingo, and Llama-AVSR. The evaluation is additionally scaled up to a 10-hour test set to verify robustness.

## Results

On the standard LRS3 test set, all five evaluated models achieve under 1.5% word error rate, but when evaluated on the MV2LRS3 set, performance universally collapses with error rates ranging from 14.0% to 23.5%. The performance degradation follows a steep linear fit slope of 10.4, indicating that tiny errors on LRS3 translate to tenfold worse accuracy under matched real-world conditions. Auto-AVSR emerges as the top-performing model on MV2LRS3 at 14.0% WER, overtaking Llama-AVSR, likely benefiting from domain overlap with MultiVSR source videos. The study also uncovers a severe lexical bias, distinct error distribution patterns, and the surprising finding that audio-visual performance often lags behind audio-only settings.

## Code

- https://github.com/chaufanglin/mv2lrs3

## Applications

Speech and machine learning engineers developing robust audio-visual speech recognition systems can use these findings and the released MV2LRS3 benchmark to rigorously test true model generalisability.

## Limitations

The study is restricted to English-language evaluations subsetted from MultiVSR and LRS3-TED sources.

## Related

- (link related pages by id as the wiki grows)
