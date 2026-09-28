---
id: lay26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2582
pdf: https://www.isca-archive.org/interspeech_2026/lay26_interspeech.pdf
---

# A Fast Solver for Interpolating Stochastic Differential Equation Diffusion Models for Speech Restoration

[PDF](https://www.isca-archive.org/interspeech_2026/lay26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lay26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2582)

**TL;DR** — This paper unifies conditional diffusion models for speech restoration under a general interpolating SDE (iSDE) formalism and introduces a fast exponential Runge-Kutta solver that matches adaptive higher-order solver quality with only 10 neural network evaluations.

## Problem

Score-based speech restoration models like SGMSE+ interpolate between clean target distributions and noisy observations via continuous-time stochastic differential equations, but existing fast sampling solvers (such as DPM-Solver) were exclusively designed for unconditional diffusion models transforming standard Gaussians. Consequently, standard conditional models require solving the reverse process using dozens or hundreds of slow neural network evaluations. Unifying these interpolation formulations and accelerating their sampling is critical for practical, low-latency speech enhancement and restoration.

## Method

The authors first establish a mathematical framework for arbitrary interpolating SDEs (iSDEs), unifying existing conditional diffusion models through linear drift and diffusion coefficients characterized by an interpolation function and stiffness factor. To eliminate terminal numerical instabilities present when time horizons are finite, they propose a fixed Ornstein-Uhlenbeck Variance Exploding (fOUVE) SDE with bounded, intuitive minimum and maximum standard deviations. Building upon exponential Runge-Kutta (expRK) methodology from DPM-Solver, they adapt the solver to handle the conditional drift terms of iSDEs exactly rather than relying on generic numerical approximations. This enables efficient probability flow ODE integration across multiple restoration tasks using as few as 10 function evaluations (NFEs).

## Results

Experiments span speech restoration tasks including noise reduction, bandwidth extension, declipping, MP3 decoding, and dereverberation. The proposed solver achieves performance comparable to the higher-order adaptive RK45 baseline while reducing the number of neural network evaluations from over 40 down to just 10 NFEs. The study also introduces the fOUVE SDE parameterization to facilitate stable grid searches over boundary variance hyperparameters.

## Code

- https://github.com/sp-uhh/fast_

## Applications

Speech and ML engineers building real-time or low-latency speech enhancement, noise reduction, bandwidth extension, and general audio restoration systems will use this solver to drastically accelerate inference.

## Related

- (link related pages by id as the wiki grows)
