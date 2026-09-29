---
id: du26b_interspeech
category: phonetics-linguistics
institutions: ["University of Cambridge"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1368
pdf: https://www.isca-archive.org/interspeech_2026/du26b_interspeech.pdf
---

# The role of phonation type in Chinese Jin tones: a study using acoustic metrics

*Xiaojing Du*

[PDF](https://www.isca-archive.org/interspeech_2026/du26b_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/du26b_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1368)

**Category:** `phonetics-linguistics`

**TL;DR** — This study examines tonal convergence and glottalisation in Huoji Jin Chinese, demonstrating that while fundamental frequency (f0) alone compresses the distinction between checked tone T5 and level tone T1 across various pitch trackers, incorporating phonation-sensitive acoustic cues successfully separates them.

## Key contributions

- Evaluated three distinct time-domain pitch trackers (Praat autocorrelation, YIN, REAPER) under harmonised low-f0 settings, showing that tracker discrepancies concentrate specifically at checked-tone rhyme offsets where periodic excitation degrades.
- Demonstrated that f0-only metric multidimensional scaling (MDS) spaces persistently place the historical checked tone (T5) closest to the level tone (T1) regardless of the tracking algorithm used.
- Incorporated voice-quality measures (band-limited harmonics-to-noise ratio HNR05 and formant-corrected spectral tilt H1*-H2*) into multi-cue MDS spaces, expanding the overall tonal dispersion and clearly separating T5 from T1.
- Provided a large-scale phonetic dataset of Huoji Jin Chinese comprising 5,950 citation-tone tokens collected from 17 native speakers across four localities.

## Problem

Lexical tone research traditionally treats fundamental frequency (f0) as the primary acoustic correlate, a methodological assumption that breaks down in checked tone contexts and non-modal phonation regimes. In Huoji Jin Chinese, historical checked tones (T5) undergo coda reduction and extreme laryngealisation at syllable offsets, yielding irregular excitation, period-doubling ambiguities, and tracker-dependent f0 artifacts. Consequently, relying exclusively on f0 compresses tonal space and makes T1 and T5 appear nearly indistinguishable, masking the true multi-cue nature of phonetic realization in contact-influenced Sinitic varieties.

## Method

The study analyzes a controlled speech corpus using a cross-algorithm pitch-tracking diagnostic and multi-dimensional acoustic feature extraction. Field recordings were segmented into tone-bearing units (TBUs), defined as the vowel nucleus plus post-vocalic voiced material while excluding non-voiced stop closures. To isolate algorithm-specific behaviors from true tonal targets, three waveform-based pitch estimators—Praat autocorrelation (To Pitch (ac)), YIN, and REAPER—were executed with harmonized search bounds (30 Hz floor, 500 Hz ceiling) and a 10 ms time step. None of these estimators rely on spectral harmonic templates; instead, they operate directly in the time domain via correlation, difference functions, or glottal closure instant (GCI) pulse timing.

Voice-quality and spectral features were extracted using VoiceSauce v1.37, overriding default settings by supplying manually verified Praat-based f0 and formant tracks to ensure accurate formant-corrected calculations. The extracted voice quality features include band-limited HNR05 (0–500 Hz) to index low-frequency aperiodicity and creaky phonation, and the formant-corrected harmonic amplitude difference H1*-H2* as a measure of spectral tilt. Metric multidimensional scaling (MDS) was then performed on z-scored features, progressively enriching the acoustic representation from f0-only metrics (onset, offset, mean, and delta f0) to combined models incorporating TBU duration, HNR05, and H1*-H2*.

## Experimental setup

Fieldwork data comprised 5,950 citation-tone tokens collected from 17 native speakers (aged 23–79 years) across four Huoji localities (Jiyuan, Jiaozuo, Wuzhi, Xinxiang) adjacent to Mandarin-speaking regions. Each speaker produced a fixed wordlist of 70 monosyllabic citation forms (14 lexical items per category across tones T1–T5) repeated five times, recorded via a USB cardioid condenser microphone at 24-bit / 48 kHz. Baseline comparisons evaluated three pitch tracker families (Praat autocorrelation, YIN, REAPER) and progressively enriched feature sets using metric multidimensional scaling (MDS) dispersion indices (mu_x).

## Results

In f0-only metric multidimensional scaling spaces, tracker choice modulates the magnitude of separation—with T1-T5 distance increasing progressively from Praat to YIN and REAPER—but T5 consistently remains the nearest neighbor to T1 across all three estimators. Adding TBU duration to the Praat f0 baseline yields only marginal dispersion improvements, whereas incorporating phonation-sensitive measures substantially enlarges the tonal space. Specifically, adding HNR05 and H1*-H2* shifts T5 distinctly away from T1, increasing the dispersion index mu_x along the first MDS dimension from approximately 2.02 (f0-only) to 6.94 (f0 + duration + HNR05), and reaching 8.12 for the full cue set (f0 + duration + HNR05 + H1*-H2*). A primary limitation of these findings is that the separation is demonstrated entirely through production-side acoustic analysis without direct perceptual validation from listeners.

| System / Acoustic Representation | Primary Feature Set | MDS Dispersion Index (mu_x) | T1-T5 Separation Behavior |
| :--- | :--- | :--- | :--- |
| Praat (ac) f0-only | Praat f0 (onset, offset, mean, delta) | ~2.02 | T5 remains closest neighbor to T1 |
| YIN f0-only | YIN f0 (onset, offset, mean, delta) | — | Larger distance than Praat; T5 still nearest to T1 |
| REAPER f0-only | REAPER f0 (onset, offset, mean, delta) | — | Largest f0-only distance; T5 still nearest to T1 |
| Praat f0 + Duration | Praat f0 + TBU Duration | Modest | Minimal improvement in category dispersion |
| Praat f0 + Duration + HNR05 | f0 + Duration + Band-limited HNR | ~6.94 | Expands space; shifts T5 away from T1 |
| Full Multi-Cue Model | f0 + Duration + HNR05 + H1*-H2* | ~8.12 | Maximum separation of T5 from T1 |

## Limitations

The evidence is strictly production-based and lacks a ground-truth physiological reference for offset-region f0 or direct perceptual experiments testing how human listeners integrate f0 and voice quality during tone identification. The dataset is limited to 17 speakers from a single dialect group (Huoji Jin Chinese), restricting immediate cross-dialectal generalization. Furthermore, computational feature extraction depends heavily on reliable vowel formant tracking, which degrades under severe laryngealisation or extreme energy reduction.

## Why read this

Speech researchers and phoneticians working on tone systems with creaky or checked phonation will learn why standard f0 trackers fail at syllable offsets and how to utilize phonation-sensitive spectral tilt and aperiodicity measures to recover hidden tonal distinctions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving automated tone recognition and speech technology systems for low-resource Sinitic languages, as well as acoustic analysis toolkits for dialectological fieldwork.

## Institutions / 機構

University of Cambridge

**Funding / 經費:** Cambridge Trust, China Scholarship Council

## Related

- (link related pages by id as the wiki grows)
