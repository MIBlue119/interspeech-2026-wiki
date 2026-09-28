---
id: wan26_interspeech
category: paralinguistics
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-868
---

# Enhancing Visual Paralinguistics: Motion-Guided Spatial Denoising for Non-Verbal Interaction Analysis

**TL;DR** — Filtering pose heatmaps with temporal-difference-based motion cues, rather than relying only on heavy spatial encoders, sets a new state of the art for detecting subtle micro-gestures in cluttered scenes.

## Problem

Non-verbal cues like micro-gestures are essential to understanding human intent alongside speech, but extracting these subtle movements in unconstrained environments is hard due to visual clutter and spatial ambiguity.

## Method

The authors propose a Motion-Guided Spatial Refinement Module (MG-SRM) that uses multi-order temporal differences to explicitly filter static background artifacts out of pose heatmaps, plus a Class-Learnable Fusion (CLF) strategy that adapts modality weights based on action semantics to prioritize input streams for the target micro-gesture.

## Results

On the challenging MA-52 dataset, the approach achieves state-of-the-art performance by directly improving the signal-to-noise ratio of micro-movements, while being computationally efficient.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Visual frontend for multimodal conversational systems needing to detect subtle non-verbal cues (micro-gestures) in human-computer interaction.

## Related

- (link related pages by id as the wiki grows)
