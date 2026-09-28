---
id: wang26g_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-416
---

# MS-GNN: Multi-Scale Graph Neural Network for Detecting Local Audio-Visual Forgery Traces

**TL;DR** — A multi-scale graph neural network that reasons over local time windows, instead of globally pooled features, better detects deepfakes with only localized forgery traces like brief lip-sync glitches.

## Problem

Audio-visual deepfake detectors that rely on globally pooled multimodal features can dilute transient, localized forgery traces such as brief lip-sync misalignments.

## Method

MS-GNN partitions the audio-visual stream into windows to capture local traces, using a multi-scale graph with a bottom-up pathway that aggregates window features into segment-level semantics and a top-down pathway that propagates global context back to refine local evidence, trained with both window-level auxiliary and video-level main supervision.

## Results

On LAV-DF and FakeAVCeleb, MS-GNN improves deepfake detection, particularly for videos containing localized forgery traces.

## Code

The authors state source code will be released; not yet available as of this page's `updated` date. If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio-visual deepfake detection for content moderation and media forensics, especially against subtle, localized manipulations.

## Related

- (link related pages by id as the wiki grows)
