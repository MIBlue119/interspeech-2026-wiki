---
id: kim26t_interspeech
category: self-supervised
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-3071
---

# Fast Speech Foundation Model Distillation Using Interleaved Stacking

**TL;DR** — Interleaved stacking speeds up distilling large speech foundation models into efficient students by growing model depth progressively while preserving each layer's position, avoiding the accuracy loss of prior stacking methods.

## Problem

Distilling large speech foundation models into efficient student models helps low-resource deployment, but training the student itself takes time, and the training efficiency of this distillation process has been largely underexplored.

## Method

The authors examine stacking — progressively increasing model depth during training until the target depth is reached — as a way to accelerate distillation, and address the performance degradation of existing stacking methods with "interleaved stacking," which consistently preserves each layer's relative position throughout the stacking process.

## Results

Interleaved stacking accelerates speech foundation model distillation training while avoiding the performance degradation seen with prior stacking approaches, validated on the SUPERB benchmark.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Faster, cheaper training pipelines for compressing large speech foundation models into deployable student models for low-resource or on-device use.

## Related

- (link related pages by id as the wiki grows)
