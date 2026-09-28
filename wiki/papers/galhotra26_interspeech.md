---
id: galhotra26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3234
---

# Advancing Infant Distress Detection: Two- and Three-Way Classification in Real-World Audio Environments

**TL;DR** — A new dataset and classifiers distinguishing infant cry, fuss, and non-distress vocalizations in real-world, daylong child-worn recordings beat prior binary, lab-trained approaches and generalize better to messy everyday audio.

## Problem

Infant distress classifiers trained on controlled lab data don't generalize to noisy everyday recordings, and no prior public dataset or model distinguishes graded fuss from cry vocalizations in real-world audio, even though collapsing them loses information caregivers need.

## Method

The authors relabel an existing real-world corpus of continuous daylong child-worn audio into cry, fuss, and non-distress categories, releasing the first such dataset and training both binary and three-way classifiers.

## Results

The best binary classifier reaches macro F1 of 0.803 and the ternary classifier 0.624; cross-dataset tests confirm lab-trained models fail in real-world conditions while the authors' models generalize more robustly.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Wearable and home monitoring systems that help caregivers interpret infant distress signals, and research into how caregivers respond to graded distress levels.

## Related

- (link related pages by id as the wiki grows)
