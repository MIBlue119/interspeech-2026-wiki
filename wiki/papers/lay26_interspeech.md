---
id: lay26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2582
pdf: https://www.isca-archive.org/interspeech_2026/lay26_interspeech.pdf
---

# A Fast Solver for Interpolating Stochastic Differential Equation Diffusion Models for Speech Restoration

*Bunlong Lay, Timo Gerkmann*

[PDF](https://www.isca-archive.org/interspeech_2026/lay26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/lay26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2582)

**TL;DR** — This paper introduces a general mathematical formalism for interpolating Stochastic Differential Equations (iSDEs) and proposes a fast exponential Runge-Kutta solver that achieves competitive speech restoration quality with only 10 neural network evaluations (NFEs).

## Key contributions

- Develops a unified mathematical formalism and drift coefficient derivation for arbitrary interpolating SDEs (iSDEs), encompassing conditional speech restoration tasks like SGMSE+.
- Proposes a novel fast solver (iSDE-pS-κ) adapted from DPM-Solver that combines exact integration of linear terms with Taylor-approximated nonlinear terms for conditional diffusion.
- Introduces the fixed Ornstein-Uhlenbeck Variance Exploding (fOUVE) SDE to fix intuitive parameter bounds and resolve numerical instabilities near terminal diffusion times.
- Demonstrates robust performance across five speech restoration tasks (declipping, dereverberation, noise reduction, MP3 decoding, and bandwidth extension) using just 10 NFEs.

## Problem

While score-based generative models and conditional diffusion processes like SGMSE+ have advanced speech restoration, solving their reverse-time SDEs requires numerous evaluations of a large neural network. Existing fast samplers (such as DPM-Solver) are strictly derived for unconditional diffusion processes where the target distribution is a standard Gaussian, making them inapplicable to iSDEs that interpolate between noisy observations and clean speech. Consequently, researchers must rely on slow iterative solvers like Euler-Maruyama, Predictor-Corrector schemes, or high-order adaptive RK45 methods that require 40 to over 90 function evaluations per sample.

## Method

The authors formulate linear forward iSDEs driven by a stiffness function $\gamma(t)$ and an interpolation function $k(t)$ satisfying $k(0)=0$ and $k(T_{max})=1$. To eliminate numerical instabilities at the boundary $T_{max}$, they propose fOUVE, where the variance boundaries strictly correspond to $\sigma_{min}$ and $\sigma_{max}$. For the reverse trajectory, they configure the general reverse SDE parameterized by $\kappa \in [0, 1]$, where $\kappa=0$ yields the probability flow ODE (PF-ODE) and $\kappa>0$ injects backward stochastic noise.

Building on exponential Runge-Kutta (expRK) methods, the solver analytically integrates the linear drift component while approximating the nonlinear score network component using a truncated Taylor power series ($p=2$). For fOUVE and OUVE, the resulting integral weights $w_n$ and exact Itô-integral noise injection terms are derived in closed form. The final algorithm (iSDE-2S-$\kappa$) executes two score evaluations per time-step (NFE = $2M$), requiring only 10 total NFEs when $M=5$, compared to traditional adaptive solvers exceeding 40-90 steps.

## Experimental setup

Evaluated across five speech restoration tasks using the EARS-WHAM-v2 and EARS-Reverb-v2 datasets (16 kHz sampling rate, comprising 54 hours of training data, 1.1 hours of validation, and 3.5 hours of test data). Tasks include noise reduction, bandwidth extension (cutoff at 4 kHz and 2 kHz), dereverberation, MP3 decoding (variable bitrates 16-64 kbps), and declipping (thresholds 0.05-0.3g). The score backbone is a 2D-UNet NCSN++ trained via denoising score matching ($L_{DSM}$) with Adam optimization (batch size 16). Baselines include Euler-Maruyama (EuM), Predictor-Corrector (PC) sampler, RK2 (midpoint), and adaptive RK45.

## Results

On declipping, dereverberation, and noise reduction, the proposed iSDE-2S achieves performance comparable to adaptive RK45 and outperforms EuM, PC, and RK2 with only 10 NFEs, whereas baseline solvers require 40 to over 90 NFEs to reach parity. For example, on dereverberation, adaptive RK45 averages 91 NFEs, while iSDE-2S matches its DistillMOS and SI-SDR metrics in just 10 NFEs, though a small PESQ gap of 0.08 remains. On bandwidth extension and MP3 decoding, the proposed solver performs on par with the second-order RK2 midpoint method because linear terms are less dominant than nonlinear ones in those specific tasks.

Ablating the stochasticity parameter $\kappa$ on noise reduction reveals that increasing $\kappa$ from 0 to 0.125 improves PESQ from 1.55 to 1.73 and DistillMOS to 3.63 with 10 NFEs, though higher values ($\kappa>0.125$) leave residual Gaussian noise that degrades quality.

| System / Condition | NFEs | PESQ | DistillMOS | SI-SDR (dB) |
|---|---|---|---|---|
| Degraded Signal (Noise Reduction) | - | 1.42 | 2.10 | 8.2 |
| EuM | 10 | 1.35 | 2.80 | 10.4 |
| RK2 (Midpoint) | 10 | 1.48 | 3.12 | 12.1 |
| Adaptive RK45 | ~44 | 1.75 | 3.65 | 16.8 |
| iSDE-2S (Ours) | 10 | 1.68 | 3.61 | 16.5 |

## Limitations

The solver relies on the linear SDE assumption and tractable analytical or numerical weight integration for the chosen interpolation schedules. While effective at 10 NFEs, certain tasks like dereverberation still exhibit a minor PESQ deficit compared to higher-order adaptive solvers running 40+ steps. Evaluation is currently constrained to 16 kHz single-channel audio tasks, leaving multi-channel or higher sampling rate applications untested.

## Why read this

Speech and audio researchers building conditional diffusion models should read this to understand how to adapt fast DPM-Solver mechanics to interpolating SDEs, bypassing the need for slow 40+ step sampling loops.

## Code

- https://github.com/sp-uhh/fast_solver_interpolating_sde

## Applications

Real-time or low-latency speech enhancement, dereverberation, bandwidth extension, and artifact removal on edge devices or telephony pipelines.

## Related

- (link related pages by id as the wiki grows)
