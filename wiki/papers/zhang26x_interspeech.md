---
id: zhang26x_interspeech
category: dataset
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1621
---

# VoxEffects: A Speech-Oriented Audio Effects Dataset and Benchmark

**TL;DR** — VoxEffects pairs produced speech with exact effect-chain supervision at multiple granularities, providing an extensible rendering pipeline and a benchmark (presence detection, preset classification, intensity prediction, robustness) with an AudioMAE-based multi-task baseline for speech audio-effect identification.

## Problem

Speech audio in the wild is often processed with post-production effects, but existing speech datasets rarely provide precise annotations of which effects and parameters were applied, limiting systematic study of speech-oriented audio effect identification.

## Method

VoxEffects is built from minimally edited clean speech with an extensible rendering pipeline for both offline synthesis and on-the-fly rendering, pairing produced speech with exact effect-chain supervision, and supports a benchmark covering effect presence detection, preset classification, number-of-active-effects prediction, and intensity prediction, with a robustness protocol for capture- and platform-side degradations.

## Results

The authors provide an AudioMAE-based multi-task baseline and analyses of domain shift, robustness, input duration, and gender fairness on the new benchmark.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

A resource for building tools that detect or reverse-engineer audio post-production effects applied to speech, relevant to forensic audio analysis and production-quality assessment.

## Related

- (link related pages by id as the wiki grows)
