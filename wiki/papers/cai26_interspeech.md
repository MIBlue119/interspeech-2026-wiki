---
id: cai26_interspeech
category: speech-enhancement
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-143
pdf: https://www.isca-archive.org/interspeech_2026/cai26_interspeech.pdf
---

# Relative Importance of Formants to the Intelligibility of Vocoded Speech in Cochlear Implant Simulation

[PDF](https://www.isca-archive.org/interspeech_2026/cai26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/cai26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-143)

**TL;DR** — This study evaluated how individual formant trajectories contribute to the intelligibility of cochlear implant-simulated vocoded speech, finding that F2 generally dominates perceptual weight followed by F1 and F3, though CI processing parameters like channel count can alter this hierarchy.

## Problem

Contemporary cochlear implant (CI) speech processors deliver limited spectral resolution and discard temporal fine structure, leading to poor speech comprehension in challenging environments. While acoustic cues like formants are vital for speech recognition, it remains unclear how individual formant contributions shift under the constraints of CI speech processing strategies. Understanding these perceptual weights can guide the optimization of CI speech processors to transmit critical spectral information more effectively.

## Method

The authors used a noise-vocoder simulation paradigm combined with sine-wave speech (SWS) to examine formant contributions among 10 normal-hearing Mandarin listeners. SWS sentences extracted via linear predictive coding retained combinations of the first three formants (F1, F2, F3) under four conditions: F1F2F3, F1F2 (dropping F3), F1F3 (dropping F2), and F2F3 (dropping F1). These stimuli were processed through a noise vocoder varying in the number of frequency bands (N = 4 or 8) and envelope cut-off frequencies (100 or 200 Hz). Participants performed sentence recognition tasks using 10-sentence Mandarin Hearing in Noise Test (MHINT) lists presented monaurally.

## Results

In wideband and standard vocoded conditions (N=8, 200 Hz cutoff), sentence recognition scores reached 97.2% for F1F2F3, dropped slightly to 85.7% when removing F3, and dropped severely to 50.7% (F1F3) and 31.4% (F2F3), demonstrating that F2 carries the highest relative importance and F3 the least. A two-way repeated-measures ANOVA revealed a significant overall effect for the number of frequency bands (F[1, 9] = 159.78, p < 0.0001), where N=8 outperformed N=4. Crucially, reducing the number of frequency bands to N=4 reversed the perceptual hierarchy, making F1 more critical than F2. Lowering the envelope cut-off frequency to 100 Hz had a minor overall effect but eliminated significant differences between certain formant pairs.

## Code

- https://www.haskinslaboratories.org/sws

## Applications

Engineers and researchers designing speech processing strategies, spectral allocation tables, and filter bank configurations for cochlear implant speech processors.

## Limitations

The study was conducted exclusively in quiet listening conditions using Mandarin Chinese, leaving open whether the findings generalize to noisy environments or non-tonal languages.

## Related

- (link related pages by id as the wiki grows)
