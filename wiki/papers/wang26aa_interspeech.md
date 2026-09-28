---
id: wang26aa_interspeech
category: evaluation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1671
pdf: https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.pdf
---

# URGENT-MOS: Unified Multi-Metric and Preference Learning for Robust Speech Quality Assessment

[PDF](https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wang26aa_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1671)

**TL;DR** — URGENT-MOS is a unified speech quality assessment framework that jointly models multi-metric absolute quality prediction and pairwise preference learning across heterogeneous datasets, achieving robust cross-domain performance.

## Problem

Existing automatic speech quality assessment (SQA) methods typically focus exclusively on either absolute quality prediction or pairwise preference prediction, missing opportunities for complementary supervision. Furthermore, annotations across public SQA datasets are inconsistent and heterogeneous, leading to poor cross-domain robustness under modern evaluation protocols like the URGENT Challenge. This lack of a unified formulation makes it difficult to scale reliable perceptual evaluation for modern speech generation systems.

## Method

URGENT-MOS combines an Absolute Metric Prediction Module (AMPM) and a Naturalness-Conditioned Preference Module (NCPM) within a shared parallel feature extractor architecture. The feature extractor fuses representations from multiple pretrained encoders (WavLM, Kimi-Audio, Qwen3OmniCaptioner, Audio Flamingo) interpolated to a common temporal length. AMPM predicts 15 categorized metrics simultaneously using range-constraining activations (rcAct) for bounded and unbounded metrics, while handling missing labels via a validity-masked loss. NCPM performs cross-attention over naturalness-category representations of paired audio inputs to predict pairwise preferences. The model is trained on a large multi-domain corpus incorporating ACR-derived preference pairs generated via arbitrary, corpus-level, and reference-scope matching strategies.

## Results

Evaluated across datasets including SOMOS, TMHINT-QI, UR25-SQA, CHiME-7, LIVETALK, SpeechEval, and SpeechJudge, URGENT-MOS demonstrates superior cross-domain robustness compared to domain-specific baselines. On preference accuracy metrics (acc0 and acc0.5 ), variants combining multi-metric supervision and reference-scope matching consistently outperform single-task models like UTMOS, SCOREQ, and Distill-MOS. Ablations show that integrating multiple feature extractors and category-level absolute metrics alongside preference learning improves generalization across text-to-speech, speech enhancement, and mixed domains.

## Code

- https://github.com/vvwangvv/URGENT-MOS

## Applications

Speech and machine learning engineers developing text-to-speech, voice conversion, or speech enhancement systems can use this framework for robust, automated perceptual quality evaluation and system ranking.

## Related

- (link related pages by id as the wiki grows)
