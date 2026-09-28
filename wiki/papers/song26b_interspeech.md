---
id: song26b_interspeech
category: emotion-recognition
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-951
---

# MSMC: Multi-Scale Masked Convolution network for Robust Speech Emotion Recognition

**TL;DR** — A compact masked-convolution architecture matches heavy SSL models like HuBERT/WavLM on speech emotion recognition accuracy while being lightweight enough for real-time edge deployment.

## Problem

Self-supervised learning models (HuBERT, WavLM) give strong speech emotion recognition (SER) accuracy but are too computationally heavy for real-time edge deployment, while lighter mel-spectrogram-based CNNs traditionally can't match SSL representation quality.

## Method

MSMC (Multi-Scale Masked Convolution) uses a masked convolution encoder to extract sparse spectral features without information leakage, combined with a mean teacher framework that enforces multi-scale consistency to distill global semantic context and micro-prosodic detail into a compact model.

## Results

On IEMOCAP, MSMC achieves state-of-the-art accuracy among lightweight models (76.0% WA), matching heavy SSL baselines while using significantly fewer parameters and less compute.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time, on-device speech emotion recognition for wearables and mobile applications where SSL-model compute cost is prohibitive.

## Related

- (link related pages by id as the wiki grows)
