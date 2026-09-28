---
id: yue26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1733
---

# G2C-NET: A Grid-to-Continuous Neural Network for Sound Source Localization in Distributed Microphone Arrays

**TL;DR** — Splitting sound source localization into a coarse grid-based likelihood estimate followed by a continuous refinement step breaks the usual grid-resolution vs. compute trade-off, improving accuracy at the same grid resolution.

## Problem

Grid-based sound source localization (SSL) reformulates the inherently nonconvex regression problem as a tractable classification task, but the trade-off between grid resolution and computational complexity remains a fundamental challenge.

## Method

The authors propose G2C-NET, with a Global Likelihood Estimation (GLE) module that uses an adaptive pairwise feature aggregator to fuse acoustic features from microphone pairs and produce a global likelihood distribution over grids, followed by a Continuous Position Estimation (CPE) module that derives a continuous source position via a weighted sum of high-confidence grids.

## Results

Compared with existing grid-based SSL methods, G2C-NET achieves better localization performance at equivalent grid resolution, validated experimentally.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sound source localization for distributed microphone array systems, e.g. smart rooms, security/surveillance audio, or meeting-room speaker tracking.

## Related

- (link related pages by id as the wiki grows)
