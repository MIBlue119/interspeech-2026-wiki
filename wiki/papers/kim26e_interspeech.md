---
id: kim26e_interspeech
category: speaker-verification
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-474
---

# Temporal Transition-Aware Multi-Head Modeling for Partially Spoofed Audio Detection and Localization

**TL;DR** — Classifying real-to-fake and fake-to-real transitions between neighboring frames, rather than just frame-level authenticity, gives state-of-the-art localization of short manipulated spans within partially spoofed audio at 20ms resolution.

## Problem

Partially spoofed audio localization aims to detect short manipulated spans within an utterance, but prior work frames it as binary frame authenticity or boundary detection, ignoring how neighboring frames evolve across manipulation boundaries.

## Method

The authors propose a transition-aware framework combining a multi-scale GRU backbone for local continuity and long-range flow with a multi-head objective: a frame head for authenticity, a transition head for adjacent-frame Real-to-Fake/Fake-to-Real transitions, and a refinement head fusing both signals.

## Results

Experiments on PartialSpoof and PartialEdit-E1/E2 datasets show state-of-the-art performance, demonstrating the effectiveness of directional inter-frame transition modeling at a challenging 20ms resolution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Applicable to audio forensics and deepfake-detection pipelines that need to pinpoint exactly which short segments of an utterance were manipulated, not just flag the whole clip.

## Related

- (link related pages by id as the wiki grows)
