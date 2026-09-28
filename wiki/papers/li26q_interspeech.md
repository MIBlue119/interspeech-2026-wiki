---
id: li26q_interspeech
category: audio-captioning
updated: 2026-09-28
confidence: abstract-only
source: https://doi.org/10.21437/Interspeech.2026-1024
---

# Few-shot Class-variable Incremental Audio Classification via Prototype Adaptation and Pseudo Class-variable Training

**TL;DR** — A prototype-based framework handles audio classification tasks where the number of classes can both grow and shrink over time, not just grow as prior incremental-learning work assumes.

## Problem

Prior work on few-shot class-incremental audio classification assumes the number of classes only ever increases, but in practice the number of classes can also decrease, a scenario existing methods don't handle.

## Method

The authors define Few-shot Class-variable Incremental Audio Classification (FCIAC) and propose a method combining an encoder with a classifier initialized by a class-variable prototype adaptation network whose structure dynamically changes as classes change, plus a pseudo class-variable training strategy to improve adaptability to changing class sets.

## Results

On three public datasets, the method exceeds previous class-incremental methods in average accuracy.

## Code

Code released by the authors: https://github.com/cgq2971-afk/FCIAC

## Applications

Audio classification systems (e.g., sound event or acoustic scene tagging) that must adapt over time as the set of relevant categories both expands and contracts.

## Related

- (link related pages by id as the wiki grows)
