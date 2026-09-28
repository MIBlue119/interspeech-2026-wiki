---
id: xu26f_interspeech
category: speaker-verification
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-858
pdf: https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.pdf
---

# Human-like cross-language generalisation in deep neural speaker embeddings and its acoustic foundations

[PDF](https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26f_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-858)

**TL;DR** — This study evaluates cross-language generalization in 18 state-of-the-art deep neural speaker embedding models, revealing that machine similarity structures align with human perceptual behavior and acoustic cue weighting.

## Problem

Deep neural networks are widely deployed for speaker modeling, but it remains unclear whether and how speaker embeddings generalize across languages with distinct phonetic structures. Understanding this cross-language generalizability is crucial for downstream applications like cross-lingual text-to-speech and speaker verification. Furthermore, establishing whether machine speaker representations align with human perceptual voice similarity and acoustic cue integration provides a vital testbed for human-machine cognitive alignment.

## Method

The authors analyzed 18 pretrained speaker embedding models using the Wespeaker toolkit, spanning ResNet, SimAM-ResNet, ECAPA-TDNN, and CAM++ architectures, across various parameter scales and pretraining corpora (VoxCeleb, CN-Celeb, and VoxBlink2). To test language-specific adaptation, models were also fine-tuned on Cantonese speech corpora (CantDuSC and CantCabSC). Representational similarity analysis (RSA) and linear mixed models (LMMs) were employed to compare cosine similarity matrices of machine embeddings against human perceptual ratings from 40 bilingual and monolingual listeners and 29 psychoacoustic variables extracted via VoiceSauce.

## Results

Machine similarity scores averaged 0.63, with same-speaker pairs yielding significantly higher similarity (M = 0.78) than different-speaker pairs (M = 0.60). Mixed-language utterance pairs exhibited an attenuated same-different speaker contrast compared to single-language pairs. RSA demonstrated moderately strong correlations between machine and perceptual representational dissimilarity matrices, with average Spearman correlations around .44. Acoustic correlates driving machine similarity included speech rate, formant frequencies (F1-F4), fundamental frequency (f0), and subharmonics-to-harmonics ratio, showing strong parallels to human perceptual cue weightings.

## Code

- https://github.com/xiyangg12/wespeaker

## Applications

Speech and ML engineers working on cross-lingual speaker verification, diarization, and speech synthesis systems who need to understand model robustness and human-like generalization across languages.

## Limitations

The evaluation relies on a specific bilingual dataset of 10 speakers and 40 listeners, which may limit generalizability to a broader range of dialectal variations and language pairs.

## Related

- (link related pages by id as the wiki grows)
