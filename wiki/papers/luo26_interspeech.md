---
id: luo26_interspeech
category: singing-voice
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-500
---

# FCPE: A Fast Context-based Pitch Estimation Model

**TL;DR** — FCPE is a lightweight pitch estimator using depth-wise separable convolutions that matches state-of-the-art accuracy while running dramatically faster than existing methods.

## Problem

Pitch estimation for monophonic audio is essential for MIDI transcription and singing voice conversion, but deep learning methods often struggle to balance robust noise tolerance with the computational efficiency needed for practical use.

## Method

FCPE employs a modified convolutional architecture built from depth-wise separable convolutions to capture mel-spectrogram features efficiently while keeping noise tolerance robust.

## Results

FCPE reaches 96.79% Raw Pitch Accuracy on MIR-1K, on par with state-of-the-art methods, with a Real-Time Factor of just 0.0062 on a single RTX 4090 GPU, significantly outperforming existing algorithms in efficiency.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time pitch tracking for singing voice conversion, MIDI transcription, and other music/singing applications where fast, robust pitch estimation is needed.

## Related

- (link related pages by id as the wiki grows)
