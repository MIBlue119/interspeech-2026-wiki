---
id: cai26_interspeech
category: health-clinical
institutions: ["Southern University of Science and Technology"]
code: https://www.haskinslaboratories.org/sws
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-143
pdf: https://www.isca-archive.org/interspeech_2026/cai26_interspeech.pdf
---

# Relative Importance of Formants to the Intelligibility of Vocoded Speech in Cochlear Implant Simulation

*Ying Cai, Yuting Ding, Xuefei Wang, Fei Chen*

[PDF](https://www.isca-archive.org/interspeech_2026/cai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-143)

**Category:** `health-clinical`

**TL;DR** — This paper investigates how individual formant trajectories (F1, F2, F3) contribute to the intelligibility of cochlear implant (CI) simulated speech using sine-wave vocoding, demonstrating that while F2 is generally most critical, CI processor settings like the number of frequency bands can flip this hierarchy.

## Key contributions

- Evaluated the individual perceptual contributions of the first three formants (F1, F2, F3) to Mandarin speech intelligibility under noise-vocoded CI simulation conditions.
- Demonstrated that F3 has the least perceptual impact, while F2 generally dominates intelligibility in wideband and high-resolution vocoded settings.
- Discovered that reducing the number of CI frequency bands from N=8 to N=4 fundamentally alters the perceptual weighting, making F1 more critical than F2.
- Showed that lowering the envelope cut-off frequency from 200 Hz to 100 Hz moderately affects formant weighting, eliminating significant differences between certain formant combinations.

## Problem

Modern cochlear implants (CIs) restore partial hearing via electrical pulse trains modulated by temporal envelopes across a limited number of electrodes (typically <=20), discarding temporal fine structure, phase, and fine spectral resolution. While patients manage reasonably well in quiet environments, understanding speech in adverse conditions remains poor due to this crude spectral transmission. Prior work examined acoustic cues in wideband speech, but little is known about how specific formant cues drive intelligibility under the structural constraints of CI signal processing.

## Method

The study utilized Mandarin sentences from the Mandarin Hearing in Noise Test (MHINT) corpus spoken by a male talker (F0 range 75–180 Hz). Sine-wave speech (SWS) was synthesized by extracting the trajectories of the first three formants (F1, F2, F3) via linear predictive coding (LPC) using a 16-ms Hanning window with 50% overlap. Four formant conditions were created: F1F2F3 (all formants), F1F2 (excluding F3), F1F3 (excluding F2), and F2F3 (excluding F1).

To simulate cochlear implant processing, these SWS sentences were passed through a noise-vocoder pipeline. The audio was first pre-emphasized with a first-order high-pass filter (1200 Hz cutoff) and split into N frequency bands using fourth-order Butterworth bandpass filters spanning 80 to 7600 Hz. Two band configurations were evaluated: N=4 (band edges: [80, 416, 1214, 3108, 7600 Hz]) and N=8 (band edges: [80, 212, 416, 730, 1214, 1960, 3108, 4876, 7600 Hz]).

Band outputs underwent full-wave rectification and low-pass filtering using a fourth-order Butterworth filter with envelope cutoff frequencies (f_cutoff) of either 100 Hz or 200 Hz to extract temporal envelopes. These envelopes modulated white noise filtered to the corresponding frequency bands, and the subband signals were summed and RMS-amplitude matched to the original input. Listeners repeated sentences in a sound booth, with performance scored by percentage of correctly recognized words.

## Experimental setup

Ten native Mandarin-speaking listeners with normal hearing (6 males, ages 19–25, mean 22) participated. Stimuli comprised MHINT sentences across 16 experimental conditions (4 formant conditions × 4 acoustic/vocoder settings: wideband, N=8 with f_cutoff=200 Hz, N=8 with f_cutoff=100 Hz, and N=4 with f_cutoff=200 Hz). Scores were converted to rational arcsine units (RAU) and analyzed via repeated-measures ANOVA and Bonferroni-corrected post-hoc tests.

## Results

In wideband and high-resolution vocoded conditions (N=8, f_cutoff=200 Hz), all-formant (F1F2F3) sentences achieved peak intelligibility (97.2% wideband). Removing F3 caused a minor drop (to 85.7% wideband), whereas removing F2 (F1F3 condition) caused the steepest drop in performance (31.4% wideband), confirming F2's dominance. 

However, reducing the vocoder spectral resolution to N=4 fundamentally shifted the hierarchy: under N=4, removing F1 (F2F3 condition) resulted in a much sharper drop in intelligibility than removing F2 (F1F3 condition), showing that limited spectral bands force a heavier reliance on F1. Lowering the envelope cutoff frequency to 100 Hz had a non-significant main effect (p=0.231), though it neutralized the performance difference between F1F2 and F2F3 conditions.

| System / Condition | F1F2F3 (%) | F1F2 (No F3) (%) | F1F3 (No F2) (%) | F2F3 (No F1) (%) |
|---|---|---|---|---|
| Wideband (Non-vocoded) | 97.2 | 85.7 | 50.7 | 31.4 |
| Vocoded (N=8, f_cutoff=200 Hz) | High | Moderate | Lowest | Moderate |
| Vocoded (N=8, f_cutoff=100 Hz) | High | Moderate | Low | Low |
| Vocoded (N=4, f_cutoff=200 Hz) | High | Moderate | Moderate | Lowest |

## Limitations

The study was restricted to quiet listening conditions, leaving the impact of background noise and reverberation on formant weighting unaddressed. Testing was performed exclusively on normal-hearing listeners using acoustic simulations rather than actual CI users, and experiments used Mandarin Chinese (a tonal language), meaning findings may not fully generalize to non-tonal languages like English.

## Why read this

Speech engineers and audiologists designing next-generation cochlear implant processing strategies should read this to understand how hardware constraints like electrode channel count distort the perceptual hierarchy of speech formants.

## Code

- https://www.haskinslaboratories.org/sws

## Applications

Optimization of cochlear implant speech processor algorithms, channel allocation strategies, and speech testing protocols.

## Institutions / 機構

Southern University of Science and Technology

**Funding / 經費:** National Key Research and Development Program of China, National Natural Science Foundation of China

## Related

- [Adaptation to Room Acoustics in Understanding Vocoded Speech: A Comparison Between Listeners With Varying Immersion Age](pratiwi26_interspeech.md) — same problem · relatedness 2.0/3
- [Bayesian Model-Based Assessment of Spatial and Source Priors in Sagittal-Plane Sound Localization](chen26fa_interspeech.md) — same problem · relatedness 1.8/3
- [Improving Cross-Dataset Speech Intelligibility Prediction for Hearing-Impaired Listeners with Few-Shot Adaptation](lin26h_interspeech.md) — same problem · relatedness 1.7/3
- [BeatGain - A Rhythmic Pattern Enhancement Algorithm for Music Listening with Cochlear Implants](lentz26_interspeech.md) — same problem · relatedness 1.6/3
- [Lightweight Convolutional Front-ends for Real-time Framewise Phoneme Recognition in Cochlear Implants](guo26d_interspeech.md) — same problem · relatedness 1.6/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
