---
id: wu26d_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1593
pdf: https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.pdf
---

# Articulatory Analysis of the Mandarin Alveolar–Retroflex Contrast Using Real-Time MRI

[PDF](https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/wu26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1593)

**TL;DR** — Using real-time MRI, this study quantifies the articulatory correlates of the Mandarin alveolar-retroflex contrast, demonstrating that retroflexion is primarily characterized by posterior constriction displacement and anterior cavity expansion rather than tongue-tip curling.

## Problem

Traditional phonological descriptions classify Mandarin sibilants as retroflex based on tongue-tip curling, but instrumental studies frequently show non-curling realizations, postalveolar constrictions, and tongue-body bunching. This discrepancy obscures the true phonetic implementation of the contrast, making it difficult to establish accurate targets for pronunciation instruction and second language learning. Resolving this requires an imaging-based approach that rigorously measures both vocal-tract geometry and cavity configurations across multiple phonetic contexts.

## Method

The authors analyzed midsagittal real-time magnetic resonance imaging (rtMRI) data from 4 native Mandarin speakers producing 96 monosyllabic items combining 8 consonants and 12 vowels. Using a custom MATLAB toolbox for grid-based air-tissue boundary segmentation, vocal tract aperture functions and anatomical dimensions were extracted at steady-state consonant frames. Four quantitative measures were computed: normalized constriction location, constriction length, front cavity pseudo-area, and back cavity pseudo-area. Linear mixed-effects models with Benjamini-Hochberg FDR adjustments were fitted to evaluate consonant class effects while controlling for speaker vocal tract length and vowel context.

## Results

Across 361 observations, retroflex consonants showed a statistically significant and robust posterior shift in constriction location (F(1, 361) = 1073.93, p < 0.001) and systematic anterior cavity expansion (F(1, 361) = 1433.47, p < 0.001) compared to alveolars. Constriction length showed variable interaction effects with significant shortening for tsh-tùh and s-ù pairs (q < 0.001) but not for ts-tù or l-ü. Back cavity measures failed to reliably discriminate between consonant classes (p = 0.232). Qualitative inspection of rtMRI frames further revealed frequent tongue-tip-down postures during retroflex production.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and speech language pathologists designing evidence-based pronunciation instruction and computer-assisted language learning tools for L2 learners acquiring Mandarin sibilants.

## Limitations

The study relies on a small sample of four speakers and manually selected steady-state frames rather than time-varying continuous trajectories.

## Related

- (link related pages by id as the wiki grows)
