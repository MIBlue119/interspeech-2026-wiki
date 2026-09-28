---
id: gao26d_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-535
---

# Uncovering Latent Depression Severity for Binary Depression Detection via Advantage-weighting Ranking

**TL;DR** — A multimodal depression-detection model that adds a novel ranking loss to mine hard training pairs and tighten class clusters, improving binary depression classification from audio-visual data.

## Problem

Audio-visual depression detection struggles because feature distributions for depressed and non-depressed individuals overlap, making it hard to learn a robust decision boundary.

## Method

The framework fuses modalities through a temporal encoder and mutual transformer, then applies a Binary Advantage-weighting Ranking Loss combining Advantage-weighted Separation (which mines and dynamically weights hard training pairs via a pairwise prediction-difference matrix) with Advantage-weighted Compactness (which pulls features toward their class centers).

## Results

On the D-vlog and LMVD datasets, the model reconstructs a latent ordinal severity structure by prioritizing hard pairs and achieves state-of-the-art binary depression detection performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated mental-health screening tools that flag depression risk from audio-visual recordings, e.g. for telehealth triage.

## Related

- (link related pages by id as the wiki grows)
