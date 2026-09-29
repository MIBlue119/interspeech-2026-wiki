---
id: marttila26_interspeech
category: tts
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2043
pdf: https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.pdf
---

# Differentiable Pitch Matching with Auditory Models

*David Marttila, Joshua D. Reiss*

[PDF](https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2043)

**Category:** `tts`

**TL;DR** — The paper introduces a differentiable, perceptually-informed auditory pitch distance metric using computational auditory models to provide informative gradients for DDSP models without external fundamental frequency estimators, achieving up to 96.9% coarse gradient accuracy on complex synthetic signals.

## Key contributions

- Proposes a differentiable auditory pitch distance (L_APD) using the CARFAC auditory model implemented in JAX for end-to-end DDSP optimization.
- Introduces a timbre-normalized pitchogram representation via cochlear channel energy scaling that resolves issues associated with missing fundamentals.
- Evaluates frame-based Stabilized Auditory Images (SAIs) comparing autocorrelation (ACF) against triggered temporal integration (TTI) stabilization across multiple window sizes.
- Demonstrates superior coarse and fine gradient accuracy on challenging synthetic tones (such as missing fundamental and square waves) compared to standard Multi-Scale Spectral Loss and Spectral Optimal Transport baselines.

## Problem

Differentiable Digital Signal Processing (DDSP) audio synthesis models commonly rely on Multi-Scale Spectral Loss (MSS), which produces an oscillatory loss landscape with uninformative gradients for sinusoidal frequency parameters. Consequently, models depend on external fundamental frequency (f0) estimators, restricting them to monophonic, harmonic signals within the estimator's training distribution. While recent spectral optimal transport (SOT) losses improve gradient behavior, they still fail on sounds where perceived pitch lacks a prominent spectral peak, such as signals with a missing fundamental or inharmonic modal resonators. This work addresses the need for a general, perceptually-informed distance metric that provides reliable frequency gradients across diverse audio signals.

## Method

The method builds on the Cascade of Asymmetric Resonators with Fast-Acting Compression (CARFAC) auditory model, implemented in JAX to ensure full differentiability. CARFAC processes single-channel audio to output a multi-channel signal where the channel dimension corresponds to cochlear characteristic frequencies sampled at the audio rate. The architecture computes overlapping frames and derives Stabilized Auditory Images (SAIs) using either full symmetric autocorrelation (ACF) or triggered temporal integration (TTI) across frame sizes of 512 and 2048 samples.

To decouple pitch from timbre, the pipeline extracts cochleagrams (summing power across cochlear channel rows) and pitchograms (summing periodicity across columns). Because prominent spectral energy can bias pitchograms, the authors propose a timbre-normalization scaling: the pitchogram magnitude spectrum is modulated inversely using a linearly interpolated cochleagram of the frequency channels, suppressing high-energy regions to highlight missing fundamentals.

The final Auditory Pitch Distance (L_APD) combines the 1-Wasserstein distance (W1) computed over the timbre-normalized pitchogram magnitudes with a weighting parameter lambda, providing stable gradient flow during backpropagation through the non-linear cochlear filterbank.

## Experimental setup

Evaluated on 4 synthetic targets (160 Hz sine, 800 Hz sine, 250 Hz harmonic with missing fundamental, 250 Hz square wave) and 1 real vocal recording (female singer vowel 'a' from VocalSet) at a 16 kHz sampling rate. Compared against OrigMSS, SmoothMSS, SOT-2048, and SOT-512-LogF baselines. Evaluated using Coarse Gradient Accuracy (CGA) and Fine Gradient Accuracy (FGA) across 1000 logarithmic steps, alongside distance to target pitch in cents. The CARFAC configuration uses a reduced cochlear resolution of 1 Equivalent Rectangular Bandwidth (ERB) per channel to minimize computational cost and aliasing artifacts at 16 kHz.

## Results

TTI-2048 achieved the strongest performance across complex tones, obtaining 95.8% CGA and 76.8% FGA on the missing fundamental target, and 96.9% CGA on the square wave target, substantially outperforming OrigMSS (53.2% CGA, 32.3% FGA) and SOT variants. SOT-512-LogF performed exceptionally on pure sines (99.9% CGA on 800 Hz sine) but degraded on complex signals (52.9% CGA on missing fundamental). ACF-based variants successfully located the global loss minimum closer to the true pitch on the real vocal recording (18-66 cents error vs 1878-2916 cents for SOT/MSS), but suffered from lower gradient accuracy along the path.

The primary failure mode of the proposed auditory loss is its heavy computational overhead, requiring approximately 30x more compute time for gradient calculations compared to standard baseline formulations due to backpropagation through the multi-channel cochlear model.

| System | 160Hz Sine (CGA/FGA) | Missing Fund. (CGA/FGA) | Square Wave (CGA/FGA) | Vocal Vowel (CGA/FGA) |
|---|---|---|---|---|
| OrigMSS | 49.6 / 65.7 | 53.2 / 32.3 | 53.0 / 29.2 | 51.8 / 62.6 |
| SmoothMSS | 69.7 / 64.5 | 57.7 / 59.0 | 70.5 / 71.9 | 61.1 / 66.5 |
| SOT-512-LogF | 85.4 / 99.9 | 52.9 / 50.0 | 83.6 / 54.7 | 60.8 / 50.0 |
| TTI-2048 | 94.3 / 100.0 | 95.8 / 76.8 | 96.9 / 74.2 | 93.7 / 63.9 |

## Limitations

The proposed auditory loss incurs a significant computational penalty, taking roughly 30 times longer to compute gradients than standard spectral losses. It struggles to universally match the pitch of complex real-world recordings like vocal vowels without getting trapped in local minima. Evaluation is currently constrained to synthetic targets and a single vocal recording at a fixed 16 kHz sampling rate.

## Why read this

Speech and audio researchers working on DDSP and end-to-end generative models should read this to understand how computational auditory models can replace heuristic f0 extractors. It provides concrete insights into designing perceptual loss functions that handle missing fundamental phenomena via timbre-normalized pitchograms.

## Code

- https://github.com/davidmarttila/diff-pitch-match

## Applications

End-to-end training of DDSP-based neural speech and singing synthesis systems without external pitch estimators.

## Institutions / 機構

Queen Mary University of London

**Funding / 經費:** UK Research and Innovation

## Related

- (link related pages by id as the wiki grows)
