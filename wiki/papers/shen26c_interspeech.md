---
id: shen26c_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1972
---

# Parallel Time-Band Mixing with Learned Observation-Adding for Robust ASR Front-Ends

**TL;DR** — Replacing recurrent temporal/cross-band modules in a speech-enhancement ASR front-end with a fully parallel time-band mixer, plus a learned observation-adding trick, cuts WER at under 1M parameters and sub-1 GMAC/s.

## Problem

Speech enhancement is often used as an ASR front-end, but the recurrent temporal and cross-band modules typical of such front-ends introduce sequential dependencies that hurt parallel/inference efficiency.

## Method

The authors build a sequence-parallel band-split enhancement front-end around a Parallel Time-Band Mixer (PTBM) block that eliminates within-block recurrent unrolling, integrating intra-band temporal mixing and per-frame cross-band attention in a unified parallel architecture, while retaining a mask-plus-residual reconstruction interface and adding learned Observation-Adding (LOA) to suppress ASR-sensitive artifacts without development-set tuning.

## Results

On DNS Challenge and CHiME-4 with frozen Whisper back-ends, the front-end consistently reduces WER relative to recurrent band-split baselines, using only 0.96M parameters and 0.58 GMAC/s.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Lightweight, parallelizable speech-enhancement front-ends for robust ASR in low-latency or resource-constrained deployment settings.

## Related

- (link related pages by id as the wiki grows)
