---
id: wang26ba_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1691
---

# Optimal Source Placement for TDoA-based Geometry Calibration of Distributed Microphone Arrays

**TL;DR** — Using a mobile robot as a movable calibration source and optimizing its positions to minimize the Cramér-Rao lower bound (rather than placing sources randomly) improves self-localization accuracy for TDoA-based geometry calibration of distributed microphone arrays.

## Problem

Distributed microphone arrays need geometric calibration as prior knowledge for many audio processing applications, but most existing methods use randomly placed calibration sources, leading to a relatively higher Cramér-Rao lower bound (CRLB) and worse calibration accuracy.

## Method

The authors use a mobile robot as multiple calibration sources and optimize its positions to improve self-localization accuracy, deriving the CRLB from time-difference-of-arrival measurements with time offsets and minimizing it under a restricted-room position constraint, with a multi-stage solution for limited-compute or demanding-runtime scenarios.

## Results

Numerical experiments validate the effectiveness of the optimized placement methods for improving calibration accuracy over random source placement.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to smart-room, conferencing, or acoustic-sensing deployments using distributed microphone arrays that need efficient, accurate self-calibration.

## Related

- (link related pages by id as the wiki grows)
