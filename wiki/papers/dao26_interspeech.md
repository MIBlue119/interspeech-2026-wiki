---
id: dao26_interspeech
category: anti-spoofing
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-676
---

# Linguistic Bias Mitigation for Spoofing Detection via Gradient Reversal and A Variational Information Bottleneck

**TL;DR** — A teacher-student adversarial framework strips linguistic-content bias out of spoofing detectors, cutting equal error rate by up to 36.2% relative on out-of-domain benchmarks.

## Problem

Voice spoofing detectors that work well in-domain often generalize poorly out-of-domain, and the authors trace part of this failure to linguistic bias: detectors latch onto linguistic content patterns seen in training rather than truly spoofing-relevant cues.

## Method

A linguistic-aware teacher model, pretrained on the linguistic content of an external dataset, guides a student spoofing detector via gradient reversal to strip out linguistic information; a Variational Information Bottleneck is added to keep the student from also discarding useful non-linguistic cues in the process.

## Results

Across nine DF Arena datasets, the proposed linguistic-invariant framework achieves up to a 36.2% relative reduction in equal error rate compared to the baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More robust voice spoofing and deepfake speech detectors for voice biometrics systems that must generalize across languages, speakers, and content unseen during training.

## Related

- (link related pages by id as the wiki grows)
