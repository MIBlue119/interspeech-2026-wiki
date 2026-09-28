---
id: horiguchi26_interspeech
category: speaker-diarization
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-45
---

# Tight Boundary Prediction in Speaker Diarization Using Causal-Anticausal Consistency

**TL;DR** — A co-training scheme that uses causal and anticausal models to sharpen loose speech-segment boundaries in diarization training data, recovering most of the benefit of training on genuinely tight labels.

## Problem

Diarization models trained on conversational ASR data inherit loosely annotated segment boundaries (with padded pauses), since that data favors semantic continuity, even though many downstream applications need tight speech intervals.

## Method

The authors generate tighter pseudo-labels using causal and anticausal models, which structurally cannot reproduce the loosening bias of the original labels, and iteratively refine both models and labels through a co-training scheme.

## Results

The proposed method recovers about 70% of the boundary-tightening benefit that would come from training directly on ideal tight labels, and improves downstream task performance.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speaker diarization pipelines feeding downstream systems (meeting transcription, voice activity-sensitive applications) that need precise speech segment boundaries rather than loosely padded ones.

## Related

- (link related pages by id as the wiki grows)
