---
id: xinyuan26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-198
---

# Universal Speech Content Factorization

**TL;DR** — A simple, invertible linear method extracts a low-rank speech representation that strips out speaker timbre while keeping phonetic content, matching heavier zero-shot voice conversion systems with far less target-speaker data.

## Problem

Existing content-preserving, timbre-suppressing speech factorization methods (like Speech Content Factorization) work only in closed-set voice conversion settings, limiting their use for open-set/zero-shot scenarios.

## Method

Universal Speech Content Factorization (USCF) extends Speech Content Factorization to an open-set setting by learning a universal speech-to-content mapping via least-squares optimization, deriving speaker-specific transformations from just a few seconds of target speech.

## Results

Embedding analysis confirms USCF effectively removes speaker-dependent variation; as a zero-shot voice conversion system it achieves competitive intelligibility, naturalness, and speaker similarity versus methods needing far more target-speaker data or additional neural training, and its features also work well as a timbre-disentangled acoustic representation for training timbre-prompted TTS models.

## Code

Code and speech samples released by the authors (publicly available per the paper).

## Applications

Zero-shot voice conversion and training-efficient timbre-disentangled features for building timbre-prompted TTS systems.

## Related

- (link related pages by id as the wiki grows)
