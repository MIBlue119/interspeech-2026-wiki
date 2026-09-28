---
id: chen26y_interspeech
category: tts
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2412
---

# Improving Flow Matching based Text-to-Speech with Dual-Model Preference Optimization and Classifier-Free Guidance

**TL;DR** — Modeling preferred and dispreferred TTS outputs with two separate models, plus an improved classifier-free guidance scheme, better aligns zero-shot flow-matching TTS with human preference feedback.

## Problem

Zero-shot flow-matching TTS training and inference paradigms typically can't effectively incorporate human feedback, leaving a mismatch between training objectives and evaluation metrics.

## Method

The authors propose a preference optimization method that separately models preferred and dispreferred speech with two distinct models to better exploit both types of feedback data, combined with an improved classifier-free guidance technique for stronger text and reference-audio adherence.

## Results

Experiments show the optimizations significantly enhance intelligibility, speaker similarity, and naturalness relative to the baseline model.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to zero-shot voice cloning and TTS products that want to incorporate human preference feedback to improve perceived speech quality.

## Related

- (link related pages by id as the wiki grows)
