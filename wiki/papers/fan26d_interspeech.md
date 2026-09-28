---
id: fan26d_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2774
---

# Cloud-Boosted Low-Compute Multi-Channel Speech Enhancement

**TL;DR** — A wearable-friendly speech enhancement pipeline that lets a lightweight edge model borrow help from a more capable server model through delayed output sharing, feature boosting, and collaborative beamforming.

## Problem

Wearable devices need low-latency, low-compute real-time speech enhancement, but strict on-device compute constraints significantly limit achievable quality.

## Method

The authors propose a collaborative edge-cloud framework with three techniques: delayed server output used as additional edge input, layerwise feature boosting that transfers intermediate server representations to guide edge inference, and collaborative multichannel Wiener filtering that fuses covariance matrices estimated from both server and edge models for beamforming.

## Results

The collaborative framework significantly outperforms an edge-only baseline with minimal added computational overhead.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Real-time speech enhancement for wearables and hearables that can offload part of their processing to a paired server or cloud model.

## Related

- (link related pages by id as the wiki grows)
