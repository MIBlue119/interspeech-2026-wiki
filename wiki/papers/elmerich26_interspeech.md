---
id: elmerich26_interspeech
category: phonetics-linguistics
labels: [low-resource]
institutions: ["CNRS", "Sorbonne Nouvelle University", "Foch Hospital", "Paris-Saclay University"]
code: https://osf.io/y6zce/overview?view_only=8890aae1298b4550a273a0067dd68281
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2560
pdf: https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.pdf
---

# NewAppVoice: Tools for Visualizing and Correcting Acoustic Measures

*Amélie Elmerich, Yao Dong, Louise McKeever, Katia Chirkova, Lise Crevier-Buchman, Claire Pillot-Loiseau, Angelique Amelot*

[PDF](https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2560)

**Category:** `phonetics-linguistics` · **Labels:** `low-resource`

**TL;DR** — NewAppVoice is a reproducible acoustic analysis software tool that integrates multiple formant-calculation algorithms, fundamental frequency estimators, and voice-quality measures with synchronized waveform and spectral visualization to facilitate manual inspection and correction of under-documented languages. It provides standalone executables for macOS and Windows, eliminating the need for a MATLAB license.

## Key contributions

- Integrates multiple cross-algorithm measurement routines (STRAIGHT, Praat/Burg LPC, and Subharmonic-to-Harmonic Ratio) inside a single synchronized visual interface.
- Provides real-time interactive visualization of acoustic signals, narrow/wideband spectrograms, FFT spectra, and multi-parameter trajectories (formants F1–F4, F0, energy, HNR, CPP).
- Implements editable results tables and derivative task-specific desktop applications (LPC and Harmonique apps) with slider-based manual adjustment.
- Freely distributes standalone executables for macOS and Windows via an OSF repository under the GNU General Public License (GPL).

## Problem

Automated acoustic analysis software often produces systematic extraction errors when applied to under-documented languages with complex segmental inventories, vowel uvularization, phonation contrasts, and tonal phenomena (such as varieties of Qiang and Tibetic). Traditional batch-processing scripts and automated pipelines lack continuous interactive visual feedback, making it difficult to detect algorithm failures without resorting to unscalable manual workflows or non-reproducible ad-hoc fixes. Existing tools like Praat, VoiceSauce, VoiceLab, and WaveSurfer either demand extensive scripting expertise, lack cross-algorithm verification, or separate automated extraction from visual validation.

## Method

NewAppVoice is implemented in MATLAB App Designer and compiled into standalone executables. It parses input .wav files alongside corresponding .TextGrid annotation files to support tier- and segment-based selective analysis. The user interface coordinates multiple algorithm outputs simultaneously: fundamental frequency (F0) is tracked using STRAIGHT, Praat's autocorrelation, and the Subharmonic-to-Harmonic Ratio (SHR) without post-processing smoothing. Formants F1–F4 and their bandwidths are computed via both STRAIGHT (point-based LPC) and Praat's Burg LPC algorithm, using an analysis frame length spanning three F0 periods.

Voice quality features include Harmonics-to-Noise Ratio (HNR05) computed from the amplitude spectrum in the 0–500 Hz band (using ±20 Hz windows around harmonics H1–H4), Cepstral Peak Prominence (CPP), and harmonic amplitudes corrected via established protocols (e.g., H1A1c, H2A2c, H1c–H2c). Spectral envelopes are derived via autocorrelation-based LPC (order 12 evaluated on a 2048-point frequency grid using 1.5 pitch period Hamming windows) and cross-referenced against raw FFT magnitude spectra. Edits made in the results table automatically propagate to dependent metrics to maintain internal consistency.

## Experimental setup

The platform was evaluated on phonetic datasets containing typologically rare features and complex segmental inventories, specifically under-documented Sino-Tibetan languages including varieties of Qiang (e.g., Mawo Qiang) and Tibetic languages (e.g., Baima Tibetan). The system compares outputs across Praat, VoiceSauce, and MATLAB Audio Signal Toolbox routines. The software runs locally as a standalone application on macOS and Windows without requiring a MATLAB runtime license.

## Results

The paper presents qualitative and methodological validation using concrete acoustic tokens, such as the Baima Tibetan word /dzɑ̀/ ('moon') produced by a male speaker and Mawo Qiang tokens. Demonstrations show that STRAIGHT and Praat Burg LPC algorithms can diverge significantly on complex vowels (e.g., overestimating F4 at ~5000 Hz instead of the true spectral peak at ~3600 Hz), which NewAppVoice successfully catches via multi-algorithm visualization and corrects inside the results table. The system does not automate error detection entirely; it relies on human expert verification driven by synchronized displays.

## Limitations

The framework relies heavily on manual visual inspection and correction, which limits processing scale compared to fully automated large-corpus pipelines. Current voice quality metrics are restricted to lower frequency bands (e.g., HNR05 limited to 0–500 Hz), and the system currently lacks native aerodynamic or electroglottographic (EGG) integration, though these are planned for future versions. Scope is primarily demonstrated on Sino-Tibetan phonetic documentary corpora.

## Why read this

Speech researchers, phoneticians, and speech technology engineers working on low-resource or under-documented languages will learn how to build transparent, cross-algorithm verification workflows that prevent systematic acoustic measurement errors in automated pipelines.

## Code

- https://osf.io/y6zce/overview?view_only=8890aae1298b4550a273a0067dd68281

## Applications

Field linguistics, documentary phonetics, clinical voice analysis, and acoustic phonetics research requiring high-precision formant and voice quality measurements.

## Institutions / 機構

CNRS, Sorbonne Nouvelle University, Foch Hospital, Paris-Saclay University

**Funding / 經費:** French National Research Agency

## Related

- [Smooth Formant Tracking with Differentiable Linear Prediction](luisi26_interspeech.md) — same problem · relatedness 2.0/3
- [Speech Playground: An Interactive Tool for Speech Analysis and Comparison](mcintosh26_interspeech.md) — same problem · relatedness 1.9/3
- [Automating Sociophonetic Research in Under-Resourced Languages: A Case Study of Speech Rate in Cook Islands Māori](cotosolano26_interspeech.md) — same problem · relatedness 1.9/3
- [Easper: An Accessible ASR Pipeline for Language Documentation](mahmudi26_interspeech.md) — same problem · relatedness 1.8/3
- [Mapping Acceptable Pronunciation Range for te reo Māori through Perceptual, Acoustic, and Marker Evaluative Data](evans26_interspeech.md) — complementary · relatedness 1.8/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
