---
id: wang26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-102
pdf: https://www.isca-archive.org/interspeech_2026/wang26_interspeech.pdf
---

# WildElder: A Chinese Elderly Speech Dataset from the Wild with Fine-Grained Manual Annotations

*Hui Wang, Jiaming Zhou, Jiabei He, Haoqin Sun, Yong Qin*

[PDF](https://www.isca-archive.org/interspeech_2026/wang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-102)

**TL;DR** — WildElder is a real-world Mandarin Chinese elderly speech dataset containing 33.7 hours across 23,701 manually segmented and annotated utterances from online videos, serving as a challenging benchmark where fine-tuned Conformer-WenetSpeech achieves a 13.54% character error rate.

## Key contributions

- Constructed WildElder, an in-the-wild Mandarin elderly speech corpus comprising 33.7 hours of audio extracted from 619 online videos.
- Provided fine-grained manual annotations including orthographic transcripts, speaker age groups, gender, and a standardized 3-tier accent intensity rubric.
- Established comprehensive baseline evaluations covering scratch-trained architectures (Transformer, Conformer, Branchformer, Paraformer) and pre-trained models (Whisper, Conformer-WenetSpeech).
- Analyzed ASR performance variations across demographic axes, revealing significant error rate disparities tied to advanced age brackets and gender.

## Problem

Speech recognition technologies struggle with elderly voices due to age-related vocal traits such as reduced volume, slower articulation, and tremors. Existing Mandarin resources like AISHELL-ASR0060, MECSD, and SeniorTalk rely heavily on controlled laboratory or scripted environments, lacking natural spontaneity, topical variety, and acoustic diversity. Consequently, models trained on these datasets often fail in real-world scenarios, highlighting the critical need for a diverse in-the-wild elderly speech benchmark.

## Method

The WildElder dataset was assembled via broad keyword searches (e.g., 'nursing home') and targeted channel collection of elderly content creators on online platforms, yielding 71+ raw hours before manual filtering. Human annotators segmented utterances at sentence boundaries, discarding segments with heavy background noise, music, overlap, or non-elderly speakers. Transcripts preserve natural disfluencies while standardizing numbers to uppercase Chinese numerals and alphabetic characters to uppercase ASCII. Annotators also labelled speaker age groups, gender, and accent levels using a qualitative rubric (Light, Moderate, Heavy).

Baselines trained from scratch include Transformer, Conformer (~31.9M params), Branchformer (~29M params), and Paraformer (~31M params), all configured with 32 or 16 batch sizes, 1e-3 learning rates, and trained for 100 epochs using CTC+Attention losses. Pre-trained models evaluated include Conformer-WenetSpeech and Whisper variants (Tiny, Base, Small, Medium), fine-tuned for 20 epochs with learning rates of 4e-5 (CW) and 1e-5 (Whisper) at batch size 16. Decoding experiments contrast CTC greedy, CTC beam search, pure attention, and attention rescoring to balance monotonic alignment stability with contextual linguistic refinement.

## Experimental setup

The dataset is partitioned into a 26.7-hour training set (18,835 utterances), a 3.5-hour development set (2,465 utterances), and a 3.5-hour test set (2,400 utterances), all split at the speaker level. Models are evaluated using Character Error Rate (CER, %). Baseline experiments encompass both scratch-trained sequence-to-sequence networks and pre-trained acoustic models.

## Results

Models trained from scratch yield high error rates: Conformer achieves the best scratch performance with a 31.74% CER using CTC-Attention with attention rescoring, whereas pure attention decoding struggles severely (e.g., Transformer hits 47.54% CER). Pre-trained models dramatically lower error rates; Conformer-WenetSpeech improves from a 16.43% zero-shot CER to 13.54% after fine-tuning. Whisper models show clear scaling improvements upon fine-tuning, with Whisper-Medium reaching 16.14% CER down from 23.41% zero-shot.

Demographic breakdowns using fine-tuned Conformer-WenetSpeech reveal that female speakers achieve a lower CER of 10.44% compared to 16.89% for male speakers. Furthermore, error rates remain stable between ages 70–85 (~12.8% to 16.2% CER) but sharply degrade beyond age 85, culminating in a 24.41% CER for the 90–95 age bracket.

| System / Condition | Zero-Shot CER (%) | Fine-Tuned CER (%) |
|---|---|---|
| Conformer-WenetSpeech | 16.43 | 13.54 |
| Whisper-Medium | 23.41 | 16.14 |
| Whisper-Small | 29.00 | 20.25 |
| Whisper-Base | 41.67 | 26.61 |
| Whisper-Tiny | 53.50 | 32.20 |

## Limitations

The dataset scope is restricted to Mandarin Chinese, omitting dialectal and cross-lingual variations outside this language. The total duration of 33.7 hours is relatively small compared to web-scale corpora, limiting deep-learning data hunger for multi-billion parameter models. Additionally, representation becomes sparse in extreme age groups above 85 years (e.g., only 30 sentences for ages 90–95), potentially skewing ultra-elderly generalization benchmarks.

## Why read this

Researchers building inclusive speech recognition systems and speech-to-text models for elderly populations should read this paper to understand the acoustic hurdles of in-the-wild senior voices. It provides a foundational benchmark dataset and reveals critical performance gaps across demographic age and gender lines.

## Code

- https://github.com/NKU-HLT/WildElder

## Applications

Voice-controlled assistive interfaces, automated healthcare monitoring systems, and inclusive human-computer interaction tools designed for senior citizens.

## Related

- (link related pages by id as the wiki grows)
