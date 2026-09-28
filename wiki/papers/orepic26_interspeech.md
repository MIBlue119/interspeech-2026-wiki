---
id: orepic26_interspeech
category: voice-conversion
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1395
pdf: https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.pdf
---

# SELFIX: An Interactive System for Natural Self-Voice Approximation

[PDF](https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1395)

**TL;DR** — SELFIX is an interactive, browser-based voice transformation system that constrains the acoustic search space for natural self-voice approximation using perceptually motivated dimensions, validated through a user study showing consistent parameter adjustments and high match ratings.

## Problem

People frequently experience discomfort upon hearing recorded versions of their own voice due to missing bone-conduction effects and skull-filtered acoustic transmission. Prior attempts using unguided spectral equalization or fixed filters failed to converge on a universal filter because they lacked perceptually meaningful parameterization and left the acoustic search space too vast. Developing a structured, scalable approach to model natural self-voice is essential for voice cloning, real-time communication tools, and clinical applications.

## Method

The SELFIX system combines a Python FastAPI backend with a client web interface running in standard browsers. The acoustic processing pipeline uses Parselmouth for PSOLA-based pitch and vocal-tract-length (VTL) modifications, linear predictive coding (LPC) for source-filter decomposition, SciPy for parametric spectral filtering (including a 600 Hz low-shelf filter and Vurma's trapezoid filter), and final peak-controlled soft clipping. In a proof-of-concept evaluation with 25 participants (13 male, 12 female) using a standard laptop microphone, users completed Part 1 (20 single-slider trials with randomized starting points and concealed acoustic functions) and Part 2 (3 multi-slider trials). Dependent measures included final slider displacements, time spent, interaction counts, and visual analog scale ratings for match and confidence.

## Results

Across 25 participants, the 600 Hz low-shelf filter showed significant low-frequency amplification (mean 6.68 dB boost, t(124) = 6.77, p < .001, d = 0.61), whereas the trapezoid filter showed no significant group effect (p = .741). Male participants additionally lowered pitch (mean -0.74 semitones, p < .001) and increased VTL (mean 1.01, p < .001), while females showed weaker, non-significant trends. Multi-slider manipulation in Part 2 significantly improved subjective match ratings compared to Part 1 (t(24) = 4.36, p < .001, d = 0.87), with high trial-to-trial configuration stability (pairwise r >= 0.75). Principal component analysis revealed a low-dimensional adjustment space where PC1 accounted for 48.5% of variance, capturing coordinated shifts across pitch, VTL, and low-frequency gain.

## Code

- https://osf.io/6nxzw/

## Applications

Speech engineers and researchers can use SELFIX to build perceptually calibrated AI voice cloning systems, real-time voice transformation tools, and diagnostic frameworks for clinical contexts such as gender-affirming therapy or auditory hallucinations.

## Limitations

The study relies on a relatively small sample size (N=25) and a single recorded utterance evaluated on standard laptop hardware without professional studio equipment.

## Related

- (link related pages by id as the wiki grows)
