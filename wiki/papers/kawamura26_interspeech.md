---
id: kawamura26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1662
---

# PASQA: Pitch-Accent-Focused Speech Quality Assessment Model Trained on Synthetic Speech with Accent Errors

**TL;DR** — A speech-quality model trained on synthetic Japanese speech with controlled pitch-accent errors learns to detect localized accent mistakes that standard MOS predictors miss.

## Problem

Existing mean opinion score (MOS) prediction models typically judge only utterance-level naturalness and are insensitive to localized pitch-accent errors, which matter greatly for languages like Japanese.

## Method

PASQA is trained on a controlled Japanese accent-error dataset created by altering accent patterns with an accent-controllable TTS system and deriving a pseudo accent-quality score from the accent-error rate; it builds on self-supervised representations with mora-conditioned fusion, a ranking loss, an auxiliary accent-error localization task, and speaker-invariant training.

## Results

Conventional MOS models fail to preserve ordering by accent-error severity, while PASQA achieves high ordering accuracy on both seen and unseen speakers and shows stronger agreement with human accent-correctness judgments.

## Code

Code released by the authors: https://github.com/lycorp-jp/PASQA

## Applications

Automatic quality control for Japanese (and potentially other pitch-accent language) TTS systems, catching accent errors that generic naturalness MOS predictors overlook.

## Related

- (link related pages by id as the wiki grows)
