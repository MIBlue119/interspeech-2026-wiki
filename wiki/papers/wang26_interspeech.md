---
id: wang26_interspeech
category: asr
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-102
pdf: https://www.isca-archive.org/interspeech_2026/wang26_interspeech.pdf
---

# WildElder: A Chinese Elderly Speech Dataset from the Wild with Fine-Grained Manual Annotations

[PDF](https://www.isca-archive.org/interspeech_2026/wang26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-102)

**TL;DR** — The paper introduces WildElder, a real-world Mandarin elderly speech dataset collected from online videos with fine-grained manual annotations, establishing a challenging benchmark where fine-tuned Conformer-WenetSpeech achieves a 13.54% character error rate.

## Problem

Existing Chinese elderly speech datasets are predominantly gathered under controlled or laboratory conditions, resulting in limited topic diversity, unnatural speaking styles, and a lack of acoustic variability. This scarcity hinders the development of robust speech technologies capable of functioning reliably for seniors in real-world scenarios.

## Method

The authors construct WildElder by harvesting 619 online videos (over 71 hours) using keyword searches and targeted channel collection, followed by manual utterance-level segmentation, orthographic transcription, and multi-dimensional metadata labeling for age group, gender, and accent strength. The dataset is split into 26.7 hours for training, 3.5 hours for development, and 3.5 hours for testing at the speaker level. Evaluations benchmark various architectures trained from scratch (Transformer, Conformer, Branchformer, Paraformer) and pre-trained models (Conformer-WenetSpeech, Whisper variants) using cross-entropy, CTC, and attention rescoring loss configurations.

## Results

WildElder comprises 23,701 utterances (33.7 hours) spanning speakers aged 70 to over 90. Models trained from scratch struggle significantly, with Conformer achieving the best scratch CER of 31.74% using CTC and attention rescoring. Pre-trained models substantially outperform scratch models; Conformer-WenetSpeech achieves a zero-shot CER of 16.43% which improves to 13.54% upon fine-tuning. Whisper-Medium attains a fine-tuned CER of 16.14%. Demographic analysis reveals performance disparities, with female speech recognized more accurately (10.44% CER) than male speech (16.89% CER).

## Code

- https://github.com/NKU-HLT/WildElder

## Applications

Speech and machine learning engineers developing inclusive automatic speech recognition systems, voice assistants, and healthcare monitoring tools tailored for elderly populations.

## Limitations

The dataset exhibits demographic imbalances with fewer samples from individuals above age 90 and heavily accented speakers.

## Related

- (link related pages by id as the wiki grows)
