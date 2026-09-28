---
id: marttila26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2043
pdf: https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.pdf
---

# Differentiable Pitch Matching with Auditory Models

[PDF](https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/marttila26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2043)

**TL;DR** — The paper introduces a differentiable auditory-model-based pitch distance metric to provide informative gradient feedback for frequency-related parameters in Differentiable Digital Signal Processing models without requiring external fundamental frequency estimators.

## Problem

Common distance metrics like Multi-Scale Spectral Loss (MSS) suffer from highly oscillatory loss landscapes with respect to sinusoidal frequencies, yielding uninformative gradients that force Differentiable Digital Signal Processing (DDSP) models to rely on external fundamental frequency estimators. While Spectral Optimal Transport (SOT) improves gradient behavior, both MSS and SOT struggle with complex or inharmonic signals where the perceived pitch lacks a prominent spectral peak, such as sounds featuring a missing fundamental or vocal performances. This limitation restricts DDSP application scope primarily to clean, monophonic, harmonic audio.

## Method

The authors propose the Auditory Pitch Distance (APD) metric, leveraging a fully differentiable computational auditory model called CARFAC (Cascade of Asymmetric Resonators with Fast-Acting Compression) implemented in JAX. The framework processes audio signals in overlapping frames to extract Stabilized Auditory Images (SAIs), which are further summarized into cochleagrams representing timbre energy and pitchograms representing periodicity. To decouple pitch from timbre and prevent numerical instability during missing fundamental conditions, a timbre-normalization scaling factor is applied to attenuate pitchogram regions containing high cochleagram energy. The final distance metric combines the 1-Wasserstein distance ($W_1$) on the timbre-normalized pitchogram magnitudes with an elementwise regularization term controlled by a weighting parameter $\lambda$.

## Results

The approach is evaluated on a simulated pitch-matching task using 8192-sample audio signals (at a 16 kHz sampling rate) across five distinct targets: pure sine waves at 160 Hz and 800 Hz, a harmonic signal with a missing fundamental at 250 Hz, a 16-harmonic square wave at 250 Hz, and a real singing voice vowel recording from VocalSet. Across coarse and fine frequency ranges spanning 1000 logarithmic steps around true pitch, the proposed metric yields smoother and more informative gradient landscapes than traditional Multi-Scale Spectral Loss and Spectral Optimal Transport baselines. The study demonstrates robustness against timbral variations and successfully handles missing fundamental scenarios without external $f_0$ extraction.

## Code

- https://github.com/google/carfac

## Applications

Speech and audio engineers building DDSP models for tasks like synthesizer sound matching, singing voice synthesis, and neural audio effects modeling.

## Limitations

The evaluation is currently limited to a synthetic pure-tone pitch-matching task and specific audio targets rather than full end-to-end generative model training.

## Related

- (link related pages by id as the wiki grows)
