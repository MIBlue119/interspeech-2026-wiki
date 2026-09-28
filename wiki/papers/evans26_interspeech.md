---
id: evans26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1561
pdf: https://www.isca-archive.org/interspeech_2026/evans26_interspeech.pdf
---

# Mapping Acceptable Pronunciation Range for te reo Māori through Perceptual, Acoustic, and Marker Evaluative Data

[PDF](https://www.isca-archive.org/interspeech_2026/evans26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/evans26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1561)

**TL;DR** — This paper maps acceptable pronunciation ranges for te reo Māori vowels by triangulating acoustic measures, phonetician transcriptions, and fluent speaker evaluations, revealing that acoustic variants acceptable as monophthongs are often penalized in diphthongs.

## Problem

Pronunciation pedagogy traditionally assumes a single canonical target, but speech naturally varies across speakers and generations. For endangered or revitalized languages like te reo Māori, acceptable pronunciation ranges remain undocumented, making it difficult to distinguish true errors from natural variation in language learning and computer-aided pronunciation training (CAPT).

## Method

The study analyzes audio recordings of a set text (pepeha) from 301 university students learning Māori in 2020 and 2021. The pipeline combines Munich Automatic Segmentation System (MAUS) forced alignment, manual phonetician transcriptions via Praat, binary syllable acceptability judgments from ~10 fluent Māori speakers (markers), and acoustic features (F0, F1, F2 formant trajectories extracted via FastTrack at 11 equidistant intervals). A bespoke visualization and analysis tool named FRED (Formant Research for EDucation) was built to integrate acoustic, perceptual, and marker evaluation data.

## Results

For monophthongs /a/ and /u/, canonical productions and common variants (such as [u] for /0/ and schwa for /5/) showed high marker acceptance rates with no statistically significant differences (Fisher's exact, p > 0.11). However, an asymmetry was found in diphthongs: while backed variants of /u/ were accepted as monophthongs, a backed second target in the diphthong /5u/ was heavily penalized by markers (p < 0.001). Furthermore, cross-substitutions between /5i/ and /5e/ were accepted at near-ceiling rates, indicating an ongoing vowel merger and suggesting fluent speakers treat diphthongs as holistic unit phonemes rather than independent vowel sequences.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and educators developing computer-aided pronunciation training (CAPT) platforms, pronunciation curricula, and assessment tools for endangered or revitalization languages.

## Limitations

Inter-rater reliability for the fluent speaker markers was not performed in this study (though planned for the future), and the student dataset lacked speaker sex/gender metadata.

## Related

- (link related pages by id as the wiki grows)
