---
id: xiang26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1357
---

# Quantifying the Uncertainty of Blindly Estimated Room Embeddings Using a Dispersion-Calibrated Score

**TL;DR** — A room-embedding framework anchored to a structured RIR latent space, paired with a lightweight uncertainty head calibrated on corruption-induced embedding dispersion, produces both content-robust room embeddings and a reliable single-utterance confidence score for selective prediction.

## Problem

Room embeddings derived from reverberant speech are often unreliable because speech content and recording degradation can alter the representation even when speaker, room, and source-receiver geometry are unchanged, degrading downstream task performance without any way to know when to distrust the estimate.

## Method

The authors learn room embeddings robust to speech-content variation by anchoring them to a structured room impulse response (RIR) latent space, training with a multi-view data structure using KL-based alignment and a multi-positive contrastive term, then calibrate a lightweight uncertainty head using the dispersion of corruption-induced embeddings, optimized with a rank-based objective, requiring no downstream-task supervision.

## Results

Across waveform- and spectrogram-level corruptions, the uncertainty score is consistent with representation dispersion and enables effective selective prediction while requiring only a single utterance at inference.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Useful for acoustic scene analysis and room-aware audio systems that need to know when a blindly estimated room embedding is unreliable, enabling selective downstream processing.

## Related

- (link related pages by id as the wiki grows)
