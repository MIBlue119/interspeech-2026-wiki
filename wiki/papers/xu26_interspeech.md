---
id: xu26_interspeech
category: enhancement-separation
labels: [streaming-real-time, robustness-noise]
institutions: ["Chongqing University of Posts and Telecommunications", "Brunel University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-122
pdf: https://www.isca-archive.org/interspeech_2026/xu26_interspeech.pdf
---

# A Sparsity-Aware Robust Nonlinear Active Noise Control for Impulsive Noise Environments

*Hengwei Xu, Hongqing Liu, Liming Shi, Lu Gan*

[PDF](https://www.isca-archive.org/interspeech_2026/xu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-122)

**Category:** `enhancement-separation` · **Labels:** `streaming-real-time`, `robustness-noise`

**TL;DR** — This paper proposes a sparsity-aware robust nonlinear active noise control algorithm that incorporates a reweighted zero-attracting regularization into the MOV-FsLMP framework to suppress parameter redundancy in functional link network expansions, achieving a 1–2 dB improvement in steady-state MSE and a >50% expansion in the stability margin.

## Key contributions

- Identified structural parameter redundancy in functional link network (FLN) expansions as a primary factor limiting robust active noise control (ANC) performance.
- Formulated a unified cost function integrating impulsive noise reduction (Lp-norm), output power constraints (MOV), and sparsity promotion (reweighted zero-attracting regularization).
- Derived a robust gradient-based update rule that dynamically acts as an online feature selector to prune redundant expansion coefficients.
- Theoretically and empirically demonstrated that suppressing redundant weights significantly expands the system stability margin (mu_max) under aggressive step sizes.

## Problem

Linear active noise control algorithms like FxLMS fail in practical devices due to severe nonlinear distortions introduced by electro-acoustic transducers operating near saturation limits. While functional link neural network (FLNN) filters and least mean p-power (LMP) criteria address nonlinearities and impulsive alpha-stable noise, they suffer from structural parameter redundancy because blind basis function expansions generate high-dimensional spaces where many terms contribute negligibly. This over-parameterization causes excess mean square error (MSE) through gradient noise accumulation and restricts the stable step-size range of adaptation, degrading convergence and tracking performance.

## Method

The method integrates a reweighted zero-attracting (RZA) log-sum penalty into the minimum-output-variance constrained filtered-s least mean p-power (MOV-FsLMP) framework. The baseline algorithm minimizes a composite cost function of the LMP criterion (using parameter p < alpha for impulsive robustness) and an MOV constraint controlled by regularization parameter lambda to prevent output saturation. The proposed cost function adds the RZA penalty term governed by regularization parameter rho_rza and weighting factor epsilon, which approximates the L0-norm by applying maximum penalty forces to near-zero coefficients while placing negligible bias on large dominant physical terms.

The weight update rule is derived using the steepest descent method. The total gradient vector combines the gradient of the baseline MOV-FsLMP and the vector form of the RZA term, whose i-th element incorporates sgn(wi) / (1 + epsilon*|wi|). This implements a variable-strength attractor that dynamically prunes redundant FLN coefficients online. The computational complexity increases from approximately 2L to 5L multiplications per iteration, but remains strictly linear O(L), making the overhead negligible for moderate expansion lengths (L < 100).

From a stability perspective, the suppression of redundant coefficients shrinks the effective input energy from E_base to E_prop. Because E_prop << E_base, the denominator in the stability bound condition is substantially reduced, theoretically explaining why the proposed method expands the stability region and accommodates larger step sizes without divergence.

## Experimental setup

Simulations were conducted over 50 independent Monte Carlo runs. The reference noise x(n) was generated from a symmetric alpha-stable (SaS) distribution with characteristic exponent alpha = 1.6 and dispersion gamma = 0.1, accompanied by a white Gaussian noise floor of variance 10^-4. The primary path synthesized nonlinear interactions with memory, and the secondary path S(z) was modeled as a non-minimum phase linear FIR filter z^-2 + 0.5*z^-3. Comparisons were made against standard FxLMS, FsLMS, and baseline MOV-FsLMP algorithms using a trigonometric FLN expansion of order P = 3 (expansion length L = M(2P+1)). Key parameters for the proposed algorithm were set to rho_rza = 2e-4 and epsilon = 20.

## Results

The proposed sparsity-aware algorithm consistently outperforms conventional linear and nonlinear baselines. Under optimal step-size configurations, it achieves a steady-state MSE improvement of approximately 1 to 2 dB compared to the baseline MOV-FsLMP and FsLMS algorithms by successfully eliminating the gradient noise floor caused by redundant FLN dimensions.

When evaluated under a critical large step size (mu = 0.02), the baseline MOV-FsLMP exhibits marginal stability with MSE fluctuating between -2 dB and 0.5 dB, whereas the proposed method maintains stable convergence between -6.5 dB and -3 dB. Furthermore, stability region analysis across varying step sizes reveals that the proposed algorithm extends the effective stability bound (divergence threshold) from approximately mu = 0.022 (baseline) to mu = 0.034, representing an expansion of over 50% in the usable step-size range.

## Limitations

The evaluation is restricted to simulated single-channel synthetic acoustic paths and alpha-stable noise environments rather than real-time hardware platforms with physical acoustic feedback loops. The scope is limited to functional link network expansions with moderate dimensionality (L < 100), and the efficacy on higher-dimensional Volterra filters or multi-channel acoustic scenarios requires future validation.

## Why read this

Speech and adaptive signal processing researchers working on nonlinear active noise control in harsh acoustic environments will find this paper a clear theoretical and practical treatment of how sparsity constraints can mitigate gradient noise and instability in over-parameterized adaptive filters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Smart headphones, hearing aids, and consumer electronic devices operating near transducer saturation limits in environments contaminated by impulsive noise.

## Institutions / 機構

Chongqing University of Posts and Telecommunications, Brunel University

## Related

- (link related pages by id as the wiki grows)
