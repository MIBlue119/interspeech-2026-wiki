---
id: kwon26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-898
---

# Delayed-Commitment Online Speaker Tracking for Robust Many-Speaker Diarization

**TL;DR** — DC-OST delays new-speaker registration until enough evidence accumulates, letting online diarization scale to dozens of speakers without a preset speaker-count cap while beating DIART and Sortformer.

## Problem

Online speaker diarization must determine "who spoke when" in real time, but scaling accurately to many speakers remains hard, and clustering-based online systems typically need a cap on the number of speakers.

## Method

Delayed-Commitment Online Speaker Tracking (DC-OST) labels each speaker embedding immediately but defers registering a genuinely new speaker until sufficient evidence has accumulated, and adds an adaptive distance threshold to suppress spurious new-speaker registrations, all within a clustering-based online system with no explicit speaker-count cap.

## Results

Under system voice activity detection, the proposed system achieves 9.53% and 9.12% diarization error rate at 0.5-second latency on VoxConverse and VoxSRC-23 (spanning up to 21 and 28 speakers respectively), outperforming both DIART and Sortformer, and maintains consistent accuracy as speaker count grows while baselines degrade.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Low-latency online diarization for large meetings, conferences, or broadcast settings with many participants and no fixed speaker count.

## Related

- (link related pages by id as the wiki grows)
