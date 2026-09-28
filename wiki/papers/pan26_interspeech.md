---
id: pan26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-908
---

# Supervised Post-training of Speech Foundation Models for Robust Adaptation in Speech Deepfake Detection

**TL;DR** — A mix-frame post-training strategy adapts self-supervised speech foundation models to focus on frame-level spoof artifacts, achieving state-of-the-art deepfake detection with balanced robustness across attack types.

## Problem

Large speech foundation models show promise for deepfake detection, but directly fine-tuning them is limited by a mismatch between their self-supervised pretraining objectives and the localized artifacts specific to spoofed speech.

## Method

The authors propose mix-frame post-training, which creates localized spoof-oriented perturbations and uses frame-level supervision so the SSL model learns the local inconsistencies critical for robust spoof detection, rather than relying on global representations alone.

## Results

On ASVspoof5 the method reaches state-of-the-art 4.50% EER for a single model without data augmentation, and on ASVspoof2021 LA/DF it achieves only a 0.16-point absolute EER gap between LA and DF conditions, showing strong, balanced robustness.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Deploying more robust speech deepfake and spoofing detectors for voice authentication and media-integrity systems.

## Related

- (link related pages by id as the wiki grows)
