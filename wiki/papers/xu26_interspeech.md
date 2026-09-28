---
id: xu26_interspeech
category: speech-enhancement
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-122
pdf: https://www.isca-archive.org/interspeech_2026/xu26_interspeech.pdf
---

# A Sparsity-Aware Robust Nonlinear Active Noise Control for Impulsive Noise Environments

[PDF](https://www.isca-archive.org/interspeech_2026/xu26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xu26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-122)

**TL;DR** — A sparsity-aware nonlinear active noise control algorithm is proposed that integrates reweighted zero-attracting regularization into the minimum-output-variance constrained filtered-s least mean p-power framework, achieving a 1–2 dB improvement in steady-state mean square error.

## Problem

Functional link network (FLN) based active noise control algorithms effectively model nonlinear distortions but introduce structural parameter redundancy through blind basis expansion. This over-parameterization causes excess mean square error due to gradient noise accumulation and restricts the stability margins of the adaptation step size. Addressing this is crucial for maintaining efficient acoustic control in compact devices operating under impulsive noise environments.

## Method

The paper introduces a unified cost function combining a least mean p-power criterion for impulsive noise robustness, a minimum-output-variance constraint to prevent loudspeaker saturation, and a log-sum reweighted zero-attracting (RZA) regularization term acting as an online feature selector. The gradient-derived update rule selectively prunes negligible basis functions while preserving dominant physical nonlinearities with an overall computational complexity of O(L). The FLN expansion utilizes a trigonometric series of order P = 3, resulting in an expansion length of L = M(2P + 1).

## Results

Evaluated through Monte Carlo simulations under symmetric alpha-stable impulsive noise (characteristic exponent alpha = 1.6) against conventional FxLMS, FsLMS, and baseline MOV-FsLMP algorithms. The proposed method achieves a 1–2 dB improvement in steady-state mean square error, remains robust under critical large step sizes (mu = 0.02), and expands the stable step-size range by over 50% (up to mu approx 0.034 compared to the baseline's 0.022).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Audio and acoustic engineers developing smart speakers, headphones, or automotive cabin systems requiring robust active noise control under non-Gaussian impulsive noise and saturated electro-acoustic transducer conditions.

## Limitations

Evaluated via synthetic simulations rather than deployed hardware platforms with real-time acoustic paths.

## Related

- (link related pages by id as the wiki grows)
