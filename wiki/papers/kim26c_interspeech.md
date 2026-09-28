---
id: kim26c_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-364
---

# Mixture Consistency Learning for Robust Speaker Verification in Noisy Environments

**TL;DR** — A speaker-verification pipeline that trains its speech-enhancement front end to make separated speaker and noise components sum back to the noisy input, instead of chasing an imperfect clean reference, improving robustness in noisy conditions.

## Problem

Speech-enhancement front ends bolted onto speaker verification are usually trained to reconstruct a predefined 'clean' reference that itself still contains noise or channel effects, which can cause the enhancement module to restore non-discriminative artifacts and hurt verification accuracy.

## Method

MCL-SV enforces mixture consistency: the sum of separated speaker and background representations must reconstruct the original noisy input mixture, giving a self-supervised training signal that does not depend on an imperfect clean reference.

## Results

Across multiple datasets, MCL-SV consistently outperforms strong baselines and achieves state-of-the-art results among recent noise-robust speaker verification systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Robust speaker verification and voice biometrics for noisy real-world deployment environments such as call centers or mobile devices.

## Related

- (link related pages by id as the wiki grows)
