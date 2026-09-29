---
id: orepic26_interspeech
category: tts
institutions: ["University of Zurich", "University of Neuchâtel"]
code: https://osf.io/6nxzw/
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1395
pdf: https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.pdf
---

# SELFIX: An Interactive System for Natural Self-Voice Approximation

*Pavo Orepic, Steven Moran, Volker Dellwo*

[PDF](https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/orepic26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1395)

**Category:** `tts`

**TL;DR** — SELFIX is a browser-based interactive system that uses perceptually motivated acoustic dimensions to model natural self-voice approximation, demonstrating that users consistently boost low-frequency energy by 6.68 dB while males additionally lower pitch and increase vocal-tract length.

## Key contributions

- Designed SELFIX, an interactive web-based framework integrating spectral filtering, source-filter theory, and psychoacoustic voice-quality parameters.
- Conducted a proof-of-concept user study (N = 25) using randomized, unlabeled sliders to eliminate starting-position and centering biases.
- Identified a universal requirement for low-frequency amplification (mean 6.68 dB boost at 600 Hz low-shelf) and dismissed a universal fixed trapezoid filter.
- Uncovered systematic gender-specific adjustments in identity-related parameters, with males lowering pitch (-0.74 semitones) and increasing VTL (ratio 1.01).

## Problem

People frequently experience discomfort and perceived unnaturalness when listening to recordings of their own voice due to the absence of bone-conduction filtering (internal skull/tissue vibrations) present during natural speech. Previous attempts relied on unguided spectral equalization or fixed transfer filters across vast acoustic spaces, failing to converge on universal solutions or map to perceptual dimensions. Overcoming this requires grounding voice transformation in perceptually relevant, low-dimensional acoustic features that capture both spectral shaping and voice identity.

## Method

The SELFIX client runs in a standard web browser communicating via FastAPI and Uvicorn. The backend audio processing pipeline combines source-filter manipulations via Parselmouth and spectral filtering via SciPy. Incoming audio is converted to mono, analyzed for global pitch, and processed through: (1) pitch and vocal-tract-length (VTL) modifications using PSOLA resynthesis, (2) source-filter decomposition via linear predictive coding (LPC), (3) optional source envelope modifications (e.g., HNR or jitter, unused here), (4) parametric spectral filtering using low-shelf and trapezoid-shaped responses, and (5) peak-controlling and soft-clipping for stable playback.

All parameters are constrained to physiologically plausible ranges, with 35 features available though the proof-of-concept utilized four: F0 shift, VTL scaling, a 600 Hz low-frequency shelving filter (LS), and Vurma's trapezoid filter (preserving 1.7–3.2 kHz). Sliders were presented with randomized initial positions (20-80% range) and a neutral-reference shift of ±5-10% to prevent anchoring biases. In Part 1, users adjusted single randomized sliders over 20 trials, rating match and confidence via visual analog scales (0-100). In Part 2, users freely manipulated all four sliders simultaneously across 3 trials to examine multi-parameter interactions.

## Experimental setup

Evaluated with 25 participants (13 male, 12 female) recording the utterance 'Hi, how are you?' on a Lenovo 21ML008YMZ laptop using integrated microphones and speakers. Metrics included final slider displacement relative to initial values, visual analog scale (VAS) match and confidence ratings, reaction times, number of interactions, and PCA/correlation variance structures. Implemented in Python using NumPy, SciPy, statsmodels, and scikit-learn.

## Results

In Part 1, participants significantly boosted the 600 Hz low-shelf filter by an average of 6.68 dB (t(124) = 6.77, p < 0.001, d = 0.61), whereas the trapezoid filter showed no significant group effect (t(124) = 0.33, p = 0.741). Male participants significantly lowered pitch by -0.74 semitones (t(64) = -3.79, p < 0.001) and increased VTL to 1.01 (t(64) = 3.84, p < 0.001), while females showed a non-significant pitch reduction and no VTL shift. Subjective match and confidence ratings were high (mean match 76.46 ± 19.39, confidence 76.08 ± 18.90). In Part 2, simultaneous multi-slider manipulation yielded significantly higher match ratings than Part 1 (t(24) = 4.36, p < 0.001, d = 0.87) with high inter-trial consistency (pairwise r >= 0.75).

| Parameter / Condition | Unit | Mean Adjustment (Overall / Male / Female) | Statistical Significance |
|---|---|---|---|
| 600 Hz Low-Shelf (LS) | dB | +6.68 dB (All) | t(124) = 6.77, p < 0.001 |
| Trapezoid Filter | % | 0 (No effect) | t(124) = 0.33, p = 0.741 |
| Pitch (F0) Shift | semitones | -0.74 (Male) / -0.28 (Female) | Male: t(64) = -3.79, p < 0.001 |
| Vocal Tract Length (VTL) | ratio | 1.01 (Male) / 1.00 (Female) | Male: t(64) = 3.84, p < 0.001 |

## Limitations

The study relies on a small sample size (N = 25) examining a single spoken utterance ('Hi, how are you?') captured exclusively through standard built-in laptop hardware in a non-studio environment. The evaluation is limited to four out of 35 possible SELFIX features, and gender-specific adjustments may intertwine perceptual familiarity with aspirational self-representation rather than pure acoustic matching.

## Why read this

Researchers and engineers building voice cloning, real-time voice modification, or clinical speech tools should read this to understand how low-dimensional, perceptually constrained interfaces capture natural self-voice perception better than unguided equalizers.

## Code

- https://osf.io/6nxzw/

## Applications

Perceptually calibrated AI voice cloning, real-time voice transformation tools, gender-affirming voice therapy support, and clinical interventions for auditory-verbal hallucinations or neuroprostheses.

## Institutions / 機構

University of Zurich, University of Neuchâtel

## Related

- [The Effect of Neck Skin Vibration on the Periauricular Acoustic Receiver](li26b_interspeech.md) — same problem · relatedness 1.9/3
- [LibriTTS-VI: A Public Corpus and Novel Methods for Efficient Voice Impression Control](ohmura26_interspeech.md) — same problem · relatedness 1.8/3
- [What Makes Us Hate Our Own Voice? Large-scale experiments on Playback–Imagery Gaps and Individual--Speech Feature Effects](fukuda26_interspeech.md) — complementary · relatedness 1.7/3
- [VoiceQualityGUI: A Tool for Word-Level Voice Quality Modifications](lameris26b_interspeech.md) — same problem · relatedness 1.7/3
- [Beyond One-Size-Fits-All: Personalized and Culturally Adaptive Emotional TTS via Interactive Optimization of Individual Emotion Perception Spaces](zhou26e_interspeech.md) — shared technique · relatedness 1.7/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
