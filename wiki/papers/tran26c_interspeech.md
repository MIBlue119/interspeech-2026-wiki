---
id: tran26c_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3458
---

# From Single to Multi-Label SER: Dataset and Mamba-Based Fusion Model

**TL;DR** — Builds a reproducible multi-label speech-emotion-recognition benchmark from MSP-Podcast crowdsourced votes and pairs it with a lightweight Mamba-based fusion model that gets competitive accuracy while staying far smaller than heavier baselines.

## Problem

Speech emotion recognition is usually framed as single-label classification, but real emotional expression is often multi-label, and there was no reproducible multi-label SER benchmark with controlled ambiguity and sparsity.

## Method

The authors convert MSP-Podcast V2.0 crowdsourced emotion votes into multi-hot labels via reliability filtering, deterministic vote-to-label construction, and lightweight time-shift augmentation, then build a compact Mamba-based fusion baseline over MFCC and log-mel features using linear-time state-space modeling for efficient long-audio processing.

## Results

Using validation-only threshold selection and fixed test-time thresholds, the fusion model attains roughly 0.50 micro-F1 on two MSP-Podcast test partitions while being substantially lighter than heavier baselines and recent methods; dataset splits, code, and training recipes are released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Scalable multi-label speech emotion recognition research, with the released benchmark and lightweight baseline usable for affective computing applications needing efficient long-audio modeling.

## Related

- (link related pages by id as the wiki grows)
