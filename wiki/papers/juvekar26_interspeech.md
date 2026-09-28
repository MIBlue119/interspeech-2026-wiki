---
id: juvekar26_interspeech
category: asr
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3408
---

# Vividh-ASR: A Complexity-Tiered Benchmark and Optimization Dynamics for Robust Indic Speech Recognition

**TL;DR** — A new tiered Hindi/Malayalam benchmark exposes how fine-tuning Whisper for low-resource languages trades away spontaneous-speech accuracy, and a reverse-order fine-tuning recipe fixes it well enough for a small model to beat a much larger one.

## Problem

Fine-tuning multilingual ASR models like Whisper for low-resource languages often improves read-speech performance but degrades performance on spontaneous audio, and the cause of this mismatch was not well diagnosed.

## Method

The authors introduce Vividh-ASR, a complexity-stratified benchmark for Hindi and Malayalam spanning studio, broadcast, spontaneous, and synthetic-noise tiers, then run a controlled study of learning-rate timing and curriculum ordering, using CKA/SVD representational analysis to see where adaptation concentrates; this motivates reverse multi-stage fine-tuning (R-MFT).

## Results

Early large parameter updates improve global WER by about 12 absolute points, a hard-to-easy curriculum adds further gains for spontaneous speech, and R-MFT lets a parameter-efficient 244M Whisper model match or exceed conventionally fine-tuned 769M models, with effective schedules concentrating adaptation in the decoder while preserving the pretrained encoder's acoustic geometry.

## Code

Benchmark and models reported as released by the authors — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

More efficient, robust fine-tuning recipes for deploying compact multilingual ASR models on Indic and other low-resource languages.

## Related

- (link related pages by id as the wiki grows)
