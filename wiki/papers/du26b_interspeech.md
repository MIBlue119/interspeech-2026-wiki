---
id: du26b_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1368
pdf: https://www.isca-archive.org/interspeech_2026/du26b_interspeech.pdf
---

# The role of phonation type in Chinese Jin tones: a study using acoustic metrics

[PDF](https://www.isca-archive.org/interspeech_2026/du26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1368)

**TL;DR** — This study examines acoustic cues for tonal distinctions in Jin Chinese, demonstrating that non-f0 phonation measures successfully separate historically checked tones from level tones when fundamental frequency trackers fail due to irregular excitation.

## Problem

In Huoji (Jin Chinese), historical checked tone categories undergo f0 compression and overlap with level tones, rendering late-vowel f0 tracker-dependent and locally unreliable due to non-modal phonation. Because traditional research assumes f0 is the primary acoustic correlate of lexical tone, it remains unclear how tonal contrast is maintained when periodicity degrades near the syllable end. This matters for understanding cue reweighting in dialect contact zones and for ensuring robust methodological practices in speech analysis under irregular excitation.

## Method

The authors collected 5,950 citation-tone tokens from 17 native Huoji speakers across four localities covering five lexical tones (T1–T5). They compared three waveform-based pitch estimators under harmonised low-f0 settings (Praat autocorrelation, YIN, REAPER) to diagnose algorithm-dependent behaviors at checked offsets. Voice quality features including TBU duration, band-limited harmonic-to-noise ratio (HNR05), and formants-corrected spectral tilt (H1 minus H2 asterisk) were extracted via VoiceSauce. Metric multidimensional scaling (MDS) was used to analyze how progressively enriched acoustic representations expand the tonal space and affect category separation.

## Results

Across f0-only spaces, T5 (the checked category) remained closest to T1, with dispersion and separation magnitude varying by tracker (Praat to YIN to REAPER). Adding TBU duration yielded modest changes, but incorporating phonation-sensitive metrics substantially expanded acoustic dispersion. Specifically, the dispersion index increased from approximately 2.02 for f0-only spaces to 6.94 with HNR05, and to 8.12 with the full feature set including H1 asterisk minus H2 asterisk, effectively separating T5 from T1.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, dialectologists, and speech engineers analyzing tone systems with non-modal phonation or developing robust automatic speech recognition and tone classification systems for low-resource or tone languages.

## Limitations

The study relies exclusively on production data without listener perception experiments to confirm how humans weigh these acoustic dimensions.

## Related

- (link related pages by id as the wiki grows)
