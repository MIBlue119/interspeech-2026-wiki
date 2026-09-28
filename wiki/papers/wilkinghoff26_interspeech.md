---
id: wilkinghoff26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-177
---

# Mind the Gap: Detecting Cluster Exits for Robust Local Density-Based Score Normalization in Anomalous Sound Detection

**TL;DR** — Detecting when a growing neighborhood in local density-based anomaly scoring has crossed a cluster boundary — rather than fixing neighborhood size in advance — makes anomalous sound detection more robust to that hyperparameter choice.

## Problem

Local density-based score normalization is an effective part of distance-based anomalous sound detection, especially when data density varies across conditions, but performance depends strongly on neighborhood size, and expanding it too far can cross cluster boundaries and violate the locality assumption.

## Method

The authors propose cluster exit detection, a lightweight mechanism that identifies distance discontinuities in the neighborhood and adapts the neighborhood size based on locality preservation rather than a fixed choice.

## Results

Experiments across multiple embedding models and datasets show improved robustness to the neighborhood-size hyperparameter and consistent performance gains from cluster exit detection.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

More robust anomalous sound detection systems for industrial machine condition monitoring and other applications sensitive to local density normalization choices.

## Related

- (link related pages by id as the wiki grows)
