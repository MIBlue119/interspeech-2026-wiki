---
id: han26b_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-865
---

# Branch-wise Complementary Attention for Acoustic Scene Classification

**TL;DR** — A branch-wise complementary attention module explicitly models how different receptive-field branches in a multi-branch CNN compensate for each other's limitations, consistently boosting lightweight acoustic scene classifiers on standard mobile benchmarks.

## Problem

Lightweight acoustic scene classification models for mobile devices use multi-branch convolutional architectures to capture diverse temporal/spectral cues, but typically aggregate branch outputs without modeling complementary relationships or compensating for each branch's limitations.

## Method

The authors propose a branch-wise complementary attention (BCA) module that allocates channel, time, frequency, and joint time-frequency attention maps across branches according to their receptive-field characteristics, integrated into the Rep-Mobile backbone.

## Results

BCA consistently outperforms existing attention mechanisms on the TAU Urban Acoustic Scenes 2020 and 2022 Mobile benchmarks.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improves on-device acoustic scene classification accuracy for mobile and embedded audio-sensing applications.

## Related

- (link related pages by id as the wiki grows)
