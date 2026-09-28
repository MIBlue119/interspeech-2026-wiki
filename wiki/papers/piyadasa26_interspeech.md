---
id: piyadasa26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1890
pdf: https://www.isca-archive.org/interspeech_2026/piyadasa26_interspeech.pdf
---

# Morphoacoustic Modeling of a Dynamic 3D Vocal Tract Using MRI-Constrained Deformations and FEM Acoustics

[PDF](https://www.isca-archive.org/interspeech_2026/piyadasa26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/piyadasa26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1890)

**TL;DR** — This paper constructs dynamic 3D vocal tract models for connected speech by combining static volumetric MRI with real-time midsagittal MRI via constrained Large Deformation Diffeomorphic Metric Mapping (LDDMM) and finite-element acoustic simulations.

## Problem

One-dimensional acoustic models of speech production fail to capture critical 3D geometry during complex articulations like rhotics, while full 3D numerical acoustic simulations lack validated frameworks to ensure intermediate shapes derived from dynamic imaging remain physically plausible. Connecting static volumetric MRI of sustained postures with real-time 2D midsagittal MRI of continuous speech is difficult due to anatomical complexity and boundary sensitivity. Solving this enables accurate acoustic modelling of natural, coarticulated speech transitions.

## Method

The authors model continuous VCV utterances ([5-ô-5] in Australian English) by chaining two deformation trajectories ([5] to [ô] and [ô] to [5]) using a constrained LDDMM framework that leverages varifold-based surface representation and real-time MRI midsagittal contours as sequential time-varying frame constraints (42 and 23 frames respectively). Intermediate 3D vocal tract meshes are sampled at five evaluation landmarks, embedded in a head-like enclosure, and placed inside a spherical exterior air domain with perfectly matched boundary conditions. Acoustic simulations are performed using COMSOL Multiphysics via frequency-domain pressure acoustics (solving the Helmholtz equation from 50 to 3000 Hz with 10 Hz resolution) assuming rigid, sound-hard walls and a uniform normal particle velocity glottal excitation.

## Results

Evaluated on an Australian English speaker producing a [5-ô-5] utterance, finite-element method (FEM) endpoint formants closely match upright sustained recordings for F2 and F3, with a systematic +110 Hz offset for F1. Across the five trajectory landmarks, absolute FEM resonances capture prominent spectral behaviors such as the characteristic F3 lowering during the intervocalic rhotic approximant. Offset-aligned comparisons confirm that simulated formant trajectories successfully track real-world acoustic variations across coarticulated speech transitions. Endpoint meshes show closer frequency alignment to sustained vowel productions than to instantaneous continuous speech targets, reflecting expected contextual undershoot and hyperarticulation differences.

## Code

- https://github.com/TharindaDilshan/vocal-tract-acoustics-comsol-fem

## Applications

Speech scientists and linguists studying human speech production, physiological articulatory modeling, and the biomechanics of complex coarticulated consonants like rhotics.

## Limitations

Simulations assume rigid, lossless vocal tract walls and linear wave propagation, and comparisons rely on a per-formant additive alignment adjustment to account for systematic frequency biases.

## Related

- (link related pages by id as the wiki grows)
