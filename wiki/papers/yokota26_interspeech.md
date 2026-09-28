---
id: yokota26_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2023
pdf: https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.pdf
---

# Physics-Informed Neural Operator for Speech Production Analysis

[PDF](https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2023)

**TL;DR** — This paper proposes the first physics-informed neural operator (PINO) framework for speech production analysis, enabling fast GPU-parallelized forward simulation across multiple vocal-tract shapes without supervised training data, achieving glottal flow errors under 1% and waveform errors around 3%.

## Problem

Conventional numerical solvers for coupled vocal-fold and vocal-tract models, such as finite element or finite difference methods, are computationally expensive and require specialized algorithms for inverse analysis. While physics-informed neural networks (PINNs) offer a mesh-free alternative that supports both forward and inverse problems, they demand time-consuming retraining whenever analysis conditions like vocal-tract geometry change. This work addresses the need for a surrogate model that can rapidly simulate speech production across varying vocal-tract shapes without retraining or pre-computed supervised data.

## Method

The proposed physics-informed DeepONet (PIDeepONet) combines a branch network taking normalized vocal-tract cross-sectional areas (16 sampled points interpolated via PCHIP) as input, and trunk networks taking collocation points (spatial x and temporal t) as input. The architecture incorporates Fourier feature mapping and the Snake activation function, with 3 fully connected blocks in the branch and vocal-fold trunk, and 5 in the vocal-tract trunk (200 nodes per layer). It integrates governing equations as hard or soft constraints: the Ishizaka-Flanagan two-mass model for vocal folds, a 1D wave equation model for the vocal tract, and lip radiation models, coupled via a hard constraint for glottal volume velocity. Training relies entirely on physics losses over 205,000 collocation points across five static vowels (/a/, /i/, /u/, /e/, /o/) without supervised ground-truth targets.

## Results

Evaluated on five static vowel area functions against a conventional fourth-order Runge-Kutta and finite-difference method (RK4-FDM) baseline. The PINO achieved exceptionally low range-normalized root mean squared errors for glottal volume velocity ug ranging from 0.36% to 1.01% across vowels, and for lip sound pressure pl ranging from 0.50% to 5.98% (with most vowels around 1-3%). Estimated fundamental frequency f0 matched the reference solver within 0.105% to 0.214% relative difference across the vowel set.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech scientists, biomedical engineers, and speech/audio researchers studying vocal-fold dynamics, voice disorders, surgical treatment outcomes, or acoustic simulation.

## Limitations

Evaluated only on static vowel configurations (steady-state analysis over a single period) rather than continuous dynamic speech.

## Related

- (link related pages by id as the wiki grows)
