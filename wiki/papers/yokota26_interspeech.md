---
id: yokota26_interspeech
category: phonetics-linguistics
institutions: ["Nagaoka University of Technology", "McGill University", "University of British Columbia"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2023
pdf: https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.pdf
---

# Physics-Informed Neural Operator for Speech Production Analysis

*Kazuya Yokota, Xinmeng Luan, Debasish Ray Mohapatra, Gary Scavone, Sidney Fels*

[PDF](https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/yokota26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2023)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper introduces the first physics-informed neural operator (PINO) for speech production analysis, enabling self-supervised simulation of vocal-fold dynamics and acoustic wave propagation across multiple vowel geometries with an average error of 0.8% for glottal volume flow and 3.2% for speech waveforms.

## Key contributions

- Proposed a novel self-supervised, physics-informed deep learning framework (PIDeepONet) for coupled vocal-fold and vocal-tract simulation across multiple vocal-tract shapes without requiring supervised training data.
- Designed a branch-trunk network architecture taking discrete vocal-tract area functions as input to predict steady-state fundamental frequency (f0) and time-varying acoustic fields conditioned on vocal-tract geometry.
- Integrated a hard constraint for vocal-fold-vocal-tract coupling that guarantees matching volume velocities at the glottis directly within the network architecture.
- Demonstrated high-speed GPU-parallelized inference of speech waveforms and glottal flow, reducing per-vowel computation time to 0.0389 seconds.

## Problem

Traditional speech production simulators rely on numerical solvers like the finite element method or finite difference methods, which are computationally expensive and require specialized iterative algorithms for inverse analysis. Classical physics-informed neural networks (PINNs) eliminate supervised data needs and support inverse tasks, but they require time-consuming retraining whenever physical conditions or vocal-tract shapes change. Developing neural operators that generalize across varying boundary and geometric conditions is therefore critical for fast, real-time speech production analysis and voice disorder diagnosis.

## Method

The proposed architecture is based on the Physics-Informed Deep Operator Network (PI-DeepONet), consisting of a branch network and a trunk network constructed from fully connected layers using ResoNet-style serial blocks and Snake activation functions. The branch network takes 16 normalized cross-sectional area samples of the vocal tract (interpolated via PCHIP) and predicts branch features alongside the steady-state fundamental frequency (f0). The trunk networks take spatial collocation points (x) and normalized temporal inputs (t*) mapped through Fourier features to enforce periodicity. The inner product of branch and trunk features outputs vocal-fold displacements (x1, x2), vocal-tract acoustic pressure (p), and intermediate volume velocity (u~). A hard constraint converts u~ to actual volume velocity (u) to satisfy coupling at the glottis (x=0) without a soft loss penalty. 

The training objective minimizes a physics-informed total loss function (Lall) combining partial differential equation (PDE) residuals for the Ishizaka-Flanagan two-mass vocal-fold model (mass-spring-damper dynamics and Bernoulli glottal flow), 1D vocal-tract acoustic wave propagation equations (incorporating air density, bulk modulus, and energy loss parameters), and acoustic lip radiation boundary equations. Time derivatives are scaled dynamically using the predicted f0 factor (2*f0) relative to normalized time t* in [-1, 1]. Training runs for 100,000 epochs using the Adam optimizer on an NVIDIA RTX PRO 6000 Blackwell Workstation GPU.

## Experimental setup

Evaluated on five static vowel area functions (/a/, /i/, /u/, /e/, /o/) reported by Arai, sampled at 1 cm intervals (16 cross-sectional area inputs). Compared against a conventional numerical solver baseline combining a fourth-order Runge-Kutta (RK4) method for vocal folds and a finite-difference method (FDM) for the vocal tract (step sizes delta_x = 1.0e-4 m, delta_t = 5.88e-8 s). Metrics include range-normalized root-mean-square error (RMSE) and estimated fundamental frequency (f0) difference percentage. Training utilized 41,000 collocation points per vowel (205,000 total) across 100,000 epochs.

## Results

The estimated fundamental frequency (f0) values closely track the conventional RK4-FDM solver reference across all vowels, achieving difference percentages between 0.105% (/a/) and 0.214% (/o/). For glottal volume velocity (ug), range-normalized RMSE ranges from 0.36% (/a/) to 1.23% (/o/), averaging approximately 0.8%. Lip sound pressure (pl) exhibits slightly higher errors, ranging from 1.01% (/a/) to 5.98% (/i/), which the authors attribute to spectral bias in approximating higher formant frequencies.

While training took roughly 80 hours for the five static vowels, the average inference time per vowel reached 0.0389 seconds, bypassing the heavy iterative calculations required by traditional time-stepping solvers.

| Vowel | f0 Error (%) | ug RMSE (%) | pl RMSE (%) |
|---|---|---|---|
| /a/ | 0.105 | 0.36 | 1.01 |
| /i/ | 0.196 | 1.00 | 5.98 |
| /u/ | 0.194 | 0.50 | 2.66 |
| /e/ | 0.185 | 0.91 | 3.97 |
| /o/ | 0.214 | 1.23 | 2.47 |

## Limitations

The current framework is strictly limited to steady-state periodic analysis of static vowel shapes and does not handle dynamic, time-varying vocal-tract geometries or consonant transitions. The evaluation is restricted to five trained vowel shapes without demonstrated zero-shot generalization to completely unseen vocal-tract configurations. Furthermore, training requires substantial computational resources (80 hours for five vowels), and lip pressure modeling suffers from higher errors due to spectral bias in higher formants.

## Why read this

Speech and ML researchers focused on physics-informed machine learning, neural operators, or differentiable speech production will find this paper a clear blueprint for replacing numerical simulators with fast surrogate models. It demonstrates how to integrate multi-mass biomechanical ODEs and 1D wave PDEs into DeepONet architectures using hard coupling constraints.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fast speech production simulation, biomechanical voice disorder diagnosis, computer-aided surgical treatment planning, and articulatory-to-acoustic forward/inverse modeling.

## Institutions / 機構

Nagaoka University of Technology, McGill University, University of British Columbia

**Funding / 經費:** JSPS KAKENHI, JSPS Program for Forming Japan's Peak Research Universities, Ono Charitable Trust for Acoustics

## Related

- [Noise Scaling Factor for the One-Dimensional Voice Production Model](yoshinaga26_interspeech.md) — same problem · relatedness 2.0/3
- [Morphoacoustic Modeling of a Dynamic 3D Vocal Tract Using MRI-Constrained Deformations and FEM Acoustics](piyadasa26_interspeech.md) — same problem · relatedness 2.0/3
- [Phy-VC: Physics-Informed Voice Conversion for Privacy-Preserving Pathological Speech](ghosh26_interspeech.md) — shared technique · relatedness 1.9/3
- [Improved modeling of vocal fold contacting and de-contacting in a geometric vocal fold model](zhang26j_interspeech.md) — same problem · relatedness 1.9/3
- [Articulatory Dynamics using Physical Vocal-tract Models](arai26_interspeech.md) — same problem · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
