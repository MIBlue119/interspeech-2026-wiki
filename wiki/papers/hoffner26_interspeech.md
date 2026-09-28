---
id: hoffner26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1891
---

# Deep learning-based predictions of perceived listening effort and intelligibility across enhanced, synthetic, natural, and binaural speech

**TL;DR** — Two deep-learning perceptual models both correlate above 0.88 with over 10,500 human ratings of listening effort and intelligibility, spanning hearing-aid, binaural, and synthetic speech conditions they weren't all explicitly designed for.

## Problem

Hearing research needs models of auditory perception that accurately predict subjective listening effort (LE) and speech intelligibility (SI), but it is unclear how well existing deep-learning models generalize across the very diverse conditions such tools need to cover.

## Method

The authors analyze the predictive power of two deep-learning models — PHOBI (a phone-posterior-based binaural intelligibility model) and HASANet+ (a teacher-student model trained to mimic intrusive SI measures) — against over 10,500 LE and SI ratings from 39 listeners across hearing-aid speech enhancement, binaural-scene perception, and synthetic speech.

## Results

Both models produce high correlations with human ratings (above 0.88), including for LE metrics they were not explicitly designed to predict, with PHOBI slightly ahead on average; both generalize reasonably to conditions not covered in training.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Objective, listener-free evaluation tools for hearing-aid algorithms, TTS systems, and other audio-processing pipelines.

## Related

- (link related pages by id as the wiki grows)
