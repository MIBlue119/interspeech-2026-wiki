---
id: yerpude26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2355
---

# Attention-Based Multiple Instance Learning with Tabular Stacking for Ambulatory Detection of PVH and NPVH

**TL;DR** — Stacking a subject-level CatBoost tabular model with a gated-attention multiple-instance-learning model over ambulatory accelerometer data placed this system 1st and 3rd on the NeckVibe Challenge 2026's two vocal-hyperfunction detection tracks.

## Problem

Phonotraumatic (PVH) and non-phonotraumatic (NPVH) vocal hyperfunction result from excessive laryngeal muscle activity, and ambulatory accelerometer-based ecological assessment of daily voice behavior is noisy and variable, making reliable automatic detection difficult.

## Method

The method combines a subject-level CatBoost tabular model using day-level features to capture long-term voice behavior with a deep multiple instance learning (MIL) model using fixed-length windows of frame-level features via a 1D residual network with gated attention pooling, then fuses the two predictions with a stacking ensemble.

## Results

The proposed method achieves an official test AUC of 0.891 for PVH (rank 3) and 0.861 for NPVH (rank 1) on the NeckVibe Challenge 2026.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to wearable, ambulatory monitoring systems for early detection of voice disorders caused by vocal overuse, relevant to voice clinics and occupational voice-health monitoring.

## Related

- (link related pages by id as the wiki grows)
