---
id: sedaghati26_interspeech
category: evaluation
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1771
---

# VoxWatermark: A Large-Scale Benchmark for Audio Watermark Detection under Perturbations

**TL;DR** — VoxWatermark unifies 10 watermarking methods (4 neural, 6 traditional) across multilingual, multi-source corpora under no-box/black-box/white-box perturbations, and the accompanying AudioWMD detector serves as a robust baseline for this newly systematized cross-method, cross-distribution watermark-detection setting.

## Problem

As speech generation systems proliferate, verifiable source attribution and copyright accountability for audio content is critical, but no unified benchmark systematically compares watermark injection methods under realistic distribution shifts.

## Method

The authors build VoxWatermark by applying 10 watermarking methods (4 neural, 6 traditional) with unified injection and annotation on multilingual, multi-source corpora, introducing no-box, black-box, and white-box perturbations to simulate real recording and transmission conditions, and propose AudioWMD as a robust baseline detector.

## Results

Injection-method diversity and distribution shifts affect detection stability, while results validate the effectiveness and scalability of AudioWMD; dataset and code are publicly available.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Supports development and evaluation of robust audio watermarking systems needed for content provenance, copyright protection, and AI-generated-audio labeling.

## Related

- (link related pages by id as the wiki grows)
