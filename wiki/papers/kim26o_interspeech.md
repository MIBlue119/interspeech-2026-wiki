---
id: kim26o_interspeech
category: source-separation
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1828
pdf: https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.pdf
---

# AdaTT: Text-Guided Instrument Timbre Transfer with Target-Adaptive Structural Control

[PDF](https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/kim26o_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1828)

**TL;DR** — AdaTT is a target-adaptive text-guided timbre transfer system that dynamically scales pitch and loudness controls within a diffusion transformer ControlNet to improve timbral fidelity and naturalness.

## Problem

Timbre transfer models often struggle with timbral ambiguity because they indiscriminately preserve source-specific expressive details—such as violin vibrato—that conflict with the target instrument's acoustic identity, like a flute. Existing ControlNet approaches rigidly enforce source structures while latent editing methods suffer from structural deviations.

## Method

The system uses Stable Audio Open (SAO) as its frozen latent diffusion backbone and a ControlNet injected with fundamental frequency (f0) and RMS loudness contours as structural conditions. AdaTT introduces Control Scale Predictors (CSPs) and Text-Guided CSPs (TG-CSPs) that use T5 text embeddings to dynamically scale pitch and loudness control features frame-wise. A semi-automatic data pipeline constructs 1,321 high-quality cross-instrument training pairs using pitch-range clustering and a two-stage inference grid search.

## Results

Evaluated on 2,400 text-audio pairs across 13 instrument types from URMP and Solos datasets, AdaTT achieves a top CLAP score of 0.490 and the lowest Kernel Audio Distance (KAD) of 0.495 among ControlNet baselines. Subjectively, it achieves the highest timbral fidelity (3.582), timbral naturalness (3.484), structural fidelity (4.148), and overall quality (3.307) scores. Ablations demonstrate that the TG-CSP module effectively balances heterogeneous pitch and loudness controls compared to vanilla ControlNet and SmartControl baselines.

## Code

- https://dabinkim0.github.io/adatt/

## Applications

Music producers, composers, and non-proficient musicians for arranging tracks and transforming instrumental identities while preserving core melodies.

## Limitations

The current scope is restricted to monophonic audio and fails to preserve original spatial cues such as reverberation.

## Related

- (link related pages by id as the wiki grows)
