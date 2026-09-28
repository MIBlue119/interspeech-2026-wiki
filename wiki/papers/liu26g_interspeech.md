---
id: liu26g_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-836
---

# Dual-Granularity Orthogonal Disentanglement for Generalizable Audio Deepfake Detection

**TL;DR** — Enforcing feature independence at both the sample level and the batch level, with no extra networks, stops deepfake detectors from secretly latching onto speaker identity instead of synthesis artifacts.

## Problem

Audio deepfake detectors often fail to generalize across speakers because they learn speaker-identity features rather than synthesis artifacts — "implicit identity leakage" — and existing fixes add architectural complexity or training instability.

## Method

The authors propose a dual-granularity orthogonal disentanglement framework: sample-level cosine orthogonality enforces directional decorrelation, batch-level cross-covariance regularization removes linear correlations across embedding dimensions, and a curriculum schedule progressively strengthens the orthogonality constraint without auxiliary networks or adversarial training.

## Results

On ASVspoof 2019 LA, ASVspoof 2021 DF, and In-the-Wild, the method reaches 1.35%, 7.88%, and 21.58% EER respectively, beating gradient-reversal disentanglement by 2.60% absolute on cross-dataset transfer.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-speaker generalizable audio deepfake detection for voice-authentication and content-provenance systems.

## Related

- (link related pages by id as the wiki grows)
