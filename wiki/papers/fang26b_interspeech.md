---
id: fang26b_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1827
---

# WhispEar: A Bidirectional Framework for Scaling Whispered Speech Conversion via Pseudo-Parallel Whisper Generation

**TL;DR** — A bidirectional whisper-normal conversion framework generates its own synthetic training pairs from abundant normal speech, sidestepping the scarcity of real parallel whisper data, and ships the largest bilingual whisper-normal corpus to date.

## Problem

Whisper-to-normal (W2N) speech conversion is difficult because whispered speech lacks vocal-fold vibration and fundamental frequency, and progress is limited by scarce parallel whisper-normal training data.

## Method

WhispEar builds on unified, speaking-mode-invariant semantic representations shared by whispered and normal speech, training both a W2N and a normal-to-whisper (N2W) model; the N2W model generates zero-shot pseudo-parallel whisper data from abundant normal speech to scale up W2N training, and the authors release a new large bilingual (Chinese-English) whisper-normal parallel corpus.

## Results

Increasing the amount of generated pseudo-parallel data consistently improves W2N performance, and WhispEar outperforms strong baselines overall.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Assistive and accessibility technology converting whispered speech to normal speech, and scalable data augmentation for whisper-speech research.

## Related

- (link related pages by id as the wiki grows)
