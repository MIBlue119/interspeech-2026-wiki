---
id: ta26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1587
---

# Progressive Weak Supervision for Speech Emotion Recognition

**TL;DR** — Relaxing hard one-hot label supervision to top-k soft targets early in training, then tightening it back to k=1, improves speech emotion recognition on both English and Vietnamese datasets.

## Problem

Speech emotion recognition suffers from label ambiguity and high model uncertainty early in training, but standard hard one-hot-label training ignores this and forces early commitment to a single class before the model has learned meaningful representations.

## Method

Progressive Weak Supervision (PWS) relaxes supervision in early training epochs, treating a prediction as correct if the true label is among the top-k predictions with a soft probability distribution across them, then linearly decaying k to 1 as training progresses, recovering standard supervision.

## Results

Using a WavLM-Base encoder with k=3, PWS achieves 78.08% unweighted accuracy on IEMOCAP (English) and 85.70% on ViSEC (Vietnamese), surpassing several strong baselines.

## Code

Code released by the authors: https://github.com/skyemo47/PWS

## Applications

Improving speech emotion recognition training, especially for languages/datasets with ambiguous or noisy emotion labels.

## Related

- (link related pages by id as the wiki grows)
