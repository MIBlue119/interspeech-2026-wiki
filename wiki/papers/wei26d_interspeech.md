---
id: wei26d_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1492
---

# USV-DETR: High-Resolution and Densely Supervised Detection of Ultrasonic Vocalizations

**TL;DR** — An end-to-end detection transformer tuned for narrowband, sparse signals consistently beats prior rule-based and CNN methods at automatically detecting rodent ultrasonic vocalizations.

## Problem

Ultrasonic vocalizations (USVs) are important behavioral indicators in rodent neuroscience, but automated detection is hard due to their small scale, narrow bandwidth, and sparse distribution in spectrograms; existing rule-based tools and standard CNNs struggle to preserve fine acoustic detail and model such sparse patterns.

## Method

USV-DETR builds on RT-DETR, adding a high-resolution P2 feature layer to better represent narrowband, short-duration signals, and adopts the DEIM training framework to provide dense, stable supervision for sparse small targets.

## Results

Across different datasets, USV-DETR consistently achieves the best detection performance, enabling more precise time-frequency localization of ultrasonic vocalizations.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Automated behavioral analysis tool for rodent neuroscience research relying on ultrasonic vocalization detection.

## Related

- (link related pages by id as the wiki grows)
