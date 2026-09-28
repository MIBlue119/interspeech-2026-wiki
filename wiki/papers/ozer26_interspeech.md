---
id: ozer26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1822
---

# A Training-Free Proactive Defense Against Partial Speech Manipulation via Self-Embedding Steganography

**TL;DR** — Repurposing audio steganography as a proactive defense — having clean speech embed a compressed copy of itself for post-hoc reference extraction — enables training-free detection and codec-based restoration of partial deepfakes, complementing existing passive detectors.

## Problem

Partial deepfake speech, where only limited segments of an utterance are synthesized or manipulated, is especially hard for passive detectors as the spoofed proportion shrinks, and accurate detection plus restoration remains difficult.

## Method

The authors revisit audio steganography as a proactive rather than passive defense: a self-embedding strategy has a clean speech signal embed a compressed representation of itself, enabling post-hoc extraction of reference content and codec-based restoration to detect partial manipulation, repurposing existing steganography methods without any training.

## Results

On a benchmark dataset, the proposed approach complements passive defenses and operates without any training, providing a robust and data-efficient alternative for partial deepfake detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Could be embedded at the point of speech origination (e.g. broadcast, official recordings) as a proactive, training-free integrity check against partial audio tampering.

## Related

- (link related pages by id as the wiki grows)
