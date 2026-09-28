---
id: hu26d_interspeech
category: source-separation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1307
---

# TF-MoE: Time-Frequency Mixture-of-Experts for Efficient Speech Separation

**TL;DR** — A sparse mixture-of-experts design, applied alternately across time and frequency, boosts speech separation quality for edge-friendly models without meaningfully raising inference cost.

## Problem

Recent compact speech separation front-ends have small parameter counts but their computational cost still blocks efficient deployment on edge devices.

## Method

TF-MoE adds sparse Mixture-of-Experts modules to a mel-band-splitting Conformer backbone, alternating time-wise and frequency-wise MoE modules that dynamically select experts per frame or per mel band, increasing model capacity with almost no added inference cost.

## Results

Outperforms BSRNN by +3.8 dB SDR on Libri2Mix at comparable inference cost (4.1 GMACs/s), consistently improving separation under fixed compute budgets.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech separation on edge/embedded devices where compute budget is tightly constrained but separation quality still matters (e.g., hearing devices, on-device meeting transcription).

## Related

- (link related pages by id as the wiki grows)
