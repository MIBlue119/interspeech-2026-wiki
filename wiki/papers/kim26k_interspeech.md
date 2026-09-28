---
id: kim26k_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1213
---

# Quality Adaptive Angular Margin Learning for Respiratory Sound Classification

**TL;DR** — QLung scales the angular margin in a speaker-verification-style classifier based on an estimate of recording quality, improving both in-distribution and out-of-distribution respiratory sound classification.

## Problem

Respiratory sound classification needs features that are compact within a class and well separated between classes, but recording quality varies a lot across clinical devices and settings, and severe class imbalance further complicates training.

## Method

QLung introduces a no-reference audio quality margin, derived from spectral entropy and RMS energy, that adaptively scales angular margins by recording quality, plus a log-scaled angular margin for stability under class imbalance and a normalized angular classifier for consistent margin penalties.

## Results

QLung improves in-distribution performance on ICBHI by 2.46% over a cross-entropy baseline and achieves the strongest out-of-distribution performance on SPRSound among compared prior state-of-the-art methods; code is released.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated respiratory disease screening tools (e.g. from digital stethoscope recordings) that must work reliably across devices and recording conditions of varying quality.

## Related

- (link related pages by id as the wiki grows)
