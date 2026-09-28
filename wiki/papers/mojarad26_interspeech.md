---
id: mojarad26_interspeech
category: asr
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-808
pdf: https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.pdf
---

# Layer-wise Probing of wav2vec 2.0 and Whisper for Consonant Cluster Reduction in African American English

[PDF](https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/mojarad26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-808)

**TL;DR** — This paper investigates how self-supervised (wav2vec 2.0) and supervised (Whisper) speech models internally represent consonant cluster reduction in African American English, finding that reduced segments retain gradient acoustic cues to their underlying stops.

## Problem

Modern ASR systems display significant performance disparities and racial bias against speakers of African American English (AAE), with word error rates up to twice as high compared to non-AAE speakers. These errors stem in part from dialect-specific phonological processes like consonant cluster reduction (CCR), where word-final stops or internal consonants are omitted. Moving beyond error metrics, this work uses layer-wise probing to examine whether and how speech models internally encode CCR, shedding light on the mechanical roots of ASR bias.

## Method

The authors perform speaker-independent layer-wise probing of frozen wav2vec2-base and Whisper-small encoders using 6,760 tokens across 7 monomorphemic consonant cluster types extracted from 156 speakers in the Corpus of Regional African American Language (CORAAL). The probing pipeline evaluates two tasks: segmental reduction detection and segmental restoration of underlying cluster identity. Probes consist of multi-layer perceptrons with a single hidden layer of 200 ReLU neurons followed by a logistic output neuron, trained using 4-fold stratified cross-validation on 768-dimensional mean-pooled frame representations from all 12 transformer layers.

## Results

Both wav2vec2-base and Whisper-small successfully distinguish reduced versus canonical cluster forms with high accuracy across their layers. Furthermore, probing results show that reduced realizations retain latent cues to their underlying deleted stops rather than treating reduction as pure deletion. The internal representations thus encode AAE CCR patterns as structured gradient phonological variations.

## Code

- https://doi.org/10.17605/OSF.IO/FE2D7

## Applications

Speech and ML engineers analyzing model interpretability, bias mitigation, and dialect-robust automatic speech recognition can leverage these layer-wise probing insights to improve equity in speech processing pipelines.

## Limitations

The study is scoped to English AAE data, specifically examining 7 monomorphemic two-consonant cluster types using base-sized wav2vec 2.0 and small-sized Whisper encoders.

## Related

- (link related pages by id as the wiki grows)
