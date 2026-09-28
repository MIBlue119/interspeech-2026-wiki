---
id: lin26k_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2019
---

# BG-CRNN: Boundary-Guided Dynamic Attention for Sound Event Detection in Complex Scenarios

**TL;DR** — Restricting self-attention to within predicted event boundaries makes sound event detection dramatically more noise-robust, holding up even at -5 dB SNR.

## Problem

Sound event detection (SED) systems typically degrade severely in complex, noisy environments.

## Method

BG-CRNN adds a dynamic boundary attention module that predicts event boundaries and constructs masks restricting self-attention strictly within individual event segments, preventing contamination from adjacent background noise, plus a Boundary-Guided Attention module that uses these boundary features to generate gating weights that adaptively enhance active event regions.

## Results

On the WildDESED dataset, BG-CRNN consistently outperforms baselines across SNRs from 10 dB to -5 dB, reaching a PSDS1 of 0.191 even at the extreme -5 dB condition.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sound event detection in real-world noisy environments (e.g., surveillance, environmental monitoring, smart home audio) where robustness to low SNR is critical.

## Related

- (link related pages by id as the wiki grows)
