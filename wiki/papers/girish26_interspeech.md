---
id: girish26_interspeech
category: health
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-2116
---

# Towards Detecting Neural Audio Codec Synthesized Heart Sounds

**TL;DR** — Introduces the task and first benchmark for detecting AI-codec-synthesized heart sounds, plus a fusion model (GROOT) combining spectral and self-supervised features to catch them.

## Problem

Neural audio codecs can now synthesize convincing fake phonocardiograms (heart sounds), but no benchmark or detector existed for this specific threat to medical audio integrity.

## Method

Releases CARDIOFAKE, a benchmark of real and codec-synthesized heart sounds, benchmarks spectral (MFCC, LFCC) and self-supervised (e.g., WavLM) features, and proposes GROOT, a fusion framework combining spectral and SSL features.

## Results

GROOT, combining MFCC and WavLM, achieves state-of-the-art detection performance, outperforming individual representations and competitive baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Safeguarding digital stethoscope and telemedicine pipelines against synthetic or tampered physiological audio.

## Related

- (link related pages by id as the wiki grows)
