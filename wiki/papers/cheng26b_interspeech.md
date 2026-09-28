---
id: cheng26b_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2202
pdf: https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.pdf
---

# Active Noise Control With a Gain Constraint for Micro-Loudspeakers

[PDF](https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cheng26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2202)

**TL;DR** — This paper proposes a fixed-filter active noise control method with frequency-response gain constraints to prevent low-frequency mechanical over-excursion in micro loudspeakers without adding group delay, achieving superior noise reduction performance.

## Problem

Compact devices using micro loudspeakers for active noise control (ANC) suffer from limited low-frequency reproduction capability, causing mechanical over-excursion and nonlinear distortion under unconstrained high-gain filters. Conventional workarounds like cascading high-pass filters introduce group delay and electronic latency that degrade noise reduction upper bounds, while low-frequency-only constraints trigger the Gibbs phenomenon and hurt performance in unconstrained bands.

## Method

The authors formulate a convex optimization framework for training fixed control filters that incorporates an infinity-norm constraint on low-frequency bins to limit loudspeaker over-excursion, paired with an l2-norm soft regularization term over the unconstrained target noise reduction band to mitigate the Gibbs phenomenon. This approach, termed ANC-FRC, is solved using standard convex optimization solvers. Experiments are conducted in an anechoic chamber using a dummy head, a primary loudspeaker emitting train or white noise, an error microphone in an artificial ear, and a smartphone reference microphone sampled at 48 kHz, setting the regularization factor to 0.2 and gain limit to 10 dB.

## Results

Evaluated on stationary white noise and non-stationary train noise from the Noisex-92 database across 10 independent Monte Carlo runs, the proposed ANC-FRC method is compared against unconstrained Wiener filters, cascading high-pass filters, and low-frequency-constrained filters (ANC-LF-FRC). In the 500-1000 Hz band, ANC-FRC achieves 11.01 dB average noise reduction for train noise (outperforming the high-pass baseline's 6.05 dB) and 11.03 dB for white noise. In the 1000-2000 Hz band, it yields 15.68 dB (train) and 16.09 dB (white), successfully avoiding low-frequency mechanical overload while preserving performance close to unconstrained Wiener baselines.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Engineers designing compact audio hardware, smartphones, smart glasses, or portable devices featuring micro loudspeakers will use this method to implement safe, low-latency active noise control.

## Limitations

The method requires pre-defined tuning parameters such as the gain limit threshold and the regularization factor.

## Related

- (link related pages by id as the wiki grows)
