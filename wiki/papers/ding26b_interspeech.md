---
id: ding26b_interspeech
category: audio-watermarking
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-814
---

# Learning to Evade: Adaptive Attacks on Audio Watermarking

**TL;DR** — AWM is an adaptive two-stage attack that exploits the normal-distribution structure of watermark decoder outputs to bypass state-of-the-art audio watermark defenses, driving detection rates below 10% (and to 0% for removal).

## Problem

Audio watermarking is increasingly relied on to assert ownership over generated audio, but the authors show existing watermarking methods remain vulnerable to adversarial manipulation, undermining their usefulness as a copyright safeguard.

## Method

The authors observe that watermark decoder message probabilities follow a normal distribution, a property current defenses use to catch manipulated audio. Their Adaptive Watermark attack (AWM) uses a two-stage optimization — first ensuring the attack succeeds, then improving audio quality — and estimates the normal-distribution parameters from limited samples of the target audio to steer decoded probabilities back into the range defenses expect.

## Results

Evaluated on two watermarking methods across three voice datasets, AWM achieves high attack success while evading state-of-the-art detectors, with detection rates below 10% for watermark replacement and creation attacks, and 0% for watermark removal.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Red-teaming and stress-testing audio watermarking systems used for AI-generated content provenance and copyright protection, to motivate more robust watermark defenses.

## Related

- (link related pages by id as the wiki grows)
