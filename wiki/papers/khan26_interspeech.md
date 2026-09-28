---
id: khan26_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3008
---

# Dual-Branch Gated Fusion for Open-Set Audio Deepfake Source Tracing

**TL;DR** — A gated fusion of an SSL model and a broad hand-crafted feature set that traces deepfake audio back to its source synthesizer while gracefully rejecting synthesizers it has never seen.

## Problem

Closed-set models attributing a synthetic utterance to its source system fail to reject unseen synthesizers and produce overconfident predictions.

## Method

Pairs XLSR-53 with CORES, a 66-dimensional descriptor spanning cepstral, oscillatory, rhythmic, energy, and spectral dimensions, fused through an input-conditioned gate trained jointly with cross-entropy, an energy margin loss for in-/out-of-domain separation, and a gate diversity term, since naive concatenation fails due to representational imbalance between the branches.

## Results

On the MLAAD benchmark, the system reaches 97.6% in-domain accuracy, 4.9% EERc, and an 83.5% relative reduction in FPR95 over the 2025 baseline.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Forensic attribution of synthetic speech to its generating model, useful for platform moderation and legal investigation of deepfake audio.

## Related

- (link related pages by id as the wiki grows)
