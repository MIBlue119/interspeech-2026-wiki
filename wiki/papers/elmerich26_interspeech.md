---
id: elmerich26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2560
pdf: https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.pdf
---

# NewAppVoice: Tools for Visualizing and Correcting Acoustic Measures

[PDF](https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/elmerich26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2560)

**TL;DR** — NewAppVoice is a standalone software tool providing synchronized multi-algorithm acoustic visualization and manual verification to improve formant and pitch extraction accuracy in under-documented languages.

## Problem

Phonetic analysis of under-documented languages with complex segmental inventories, such as Qiang and Tibetic varieties, frequently causes automatic acoustic extraction methods to produce systematic errors. Without established reference formant values, these errors are difficult to detect, while fully manual workflows are unscalable and many existing large-scale scripts lack interactive feedback for transparent correction.

## Method

Built using MATLAB App Designer and integrated Praat routines, NewAppVoice combines multiple algorithms for pitch (STRAIGHT, SHR, Praat autocorrelation) and formants (STRAIGHT, Praat Burg LPC) into a unified graphical interface. It reads audio files alongside annotated TextGrid files, allowing segment-based analysis, user-defined measurement points, and synchronized inspection of waveforms, spectrograms, and LPC/FFT spectra. The software is compiled into standalone macOS and Windows executables requiring no MATLAB license and is distributed under the GPL.

## Results

The paper demonstrates the software's utility through qualitative case studies on Baima Tibetan speech data, specifically analyzing words like /dzɑ̀/. It shows how simultaneous visualization of STRAIGHT and Praat outputs successfully exposes tracking anomalies, such as an F4 overestimation near 5000 Hz versus the spectral peak between 3500 and 4000 Hz, enabling targeted cross-algorithm correction.

## Code

- https://osf.io/y6zce/overview?view_only=8890aae1298b4550a273a0067dd68281

## Applications

Speech engineers, phoneticians, and linguists working on documentary phonetics, under-documented languages, and precise acoustic voice quality measurements.

## Related

- (link related pages by id as the wiki grows)
