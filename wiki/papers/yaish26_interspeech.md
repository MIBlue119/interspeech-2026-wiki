---
id: yaish26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-222
---

# Active Constructive Interference for Speech

**TL;DR** — Instead of just suppressing noise, a new "Active Speech Enhancement" paradigm actively reshapes the speech signal — attenuating distortions and amplifying speech-relevant frequencies — using a Transformer-Mamba architecture that beats standard baselines on denoising, dereverberation, and declipping.

## Problem

Active Noise Cancellation suppresses external interference and traditional speech enhancement passively reconstructs degraded signals, but neither actively reshapes the speech signal itself to further improve intelligibility and perceptual quality.

## Method

The authors introduce Active Speech Enhancement (ASE), a paradigm that actively attenuates distortions and amplifies speech-relevant frequencies, implemented with a novel Transformer-Mamba-based architecture and a task-specific loss that jointly optimizes interference suppression and signal enrichment.

## Results

The method outperforms existing baselines across multiple speech processing tasks, including denoising, dereverberation, and declipping, demonstrating the value of active, targeted modulation in challenging acoustic environments.

## Code

Demo and code reported as publicly available at github.com/ofiryaish/ASE-TM — unverified by this wiki as of the `updated` date; please confirm and update this entry if you can.

## Applications

Active speech enhancement for communication devices, hearing aids, or conferencing systems needing more than passive noise suppression.

## Related

- (link related pages by id as the wiki grows)
