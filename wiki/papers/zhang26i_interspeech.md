---
id: zhang26i_interspeech
category: phonetics-linguistics
institutions: ["City University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-693
pdf: https://www.isca-archive.org/interspeech_2026/zhang26i_interspeech.pdf
---

# Tense Voice, Not Falsetto: An F0-specific Physiological Byproduct of Extreme High-Pitch Tone in Kaihui Xiang

*Yi Zhang, Aini Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26i_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26i_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-693)

**Category:** `phonetics-linguistics`

**TL;DR** — A multidimensional acoustic analysis of Kaihui Xiang Chinese reveals that the extreme high-pitch tone (T4) is produced with a tense modal voice (characterized by flattened lower-frequency spectral tilt) rather than falsetto, and this tension is an F0-specific physiological byproduct.

## Key contributions

- Conducts the first systematic multidimensional acoustic description of the extreme high-pitch tone (T4) in Kaihui Xiang across a 6-tone system.
- Compares T4 against the entire tonal inventory using formant-corrected spectral tilts (H1*-H2*, H2*-H4*, H4*-H2k*, H2k*-H5k*), HNR, and CPP.
- Proves that T4 is a tense modal voice rather than falsetto, resolving prior conflicting auditory descriptions.
- Demonstrates that the phonatory tense quality is an F0-specific physiological byproduct, evidenced by the convergence of voice quality between T4 and T6 where their F0 levels overlap.

## Problem

The phonatory characteristics of extreme high-pitch tones in tonal languages remain largely underexplored, with prior studies focusing mostly on low-pitch targets (like vocal fry or creaky voice). In Xiang Chinese, the extreme high-pitch tone (T4) has traditionally been described anecdotally as falsetto, whereas limited preliminary acoustic data suggest tense modal voice. Disentangling physiological pitch mechanics from active phonological features is crucial for phonetic research, necessitating a systematic, large-scale acoustic investigation to resolve this debate.

## Method

The study utilized a controlled production experiment recording 16 native speakers of Kaihui Xiang (aged 42–80, 9 female, 7 male) producing 104 monosyllabic words distributed across all six lexical tones within a carrier sentence, yielding 3,328 tokens (reduced to 2,792 after filtering out noise and Mandarin-influenced artifacts). Audio was captured via a Zoom H4n Pro at 44.1 kHz, 24-bit. Acoustic features including F0, four formant-corrected spectral tilt parameters (H1*-H2*, H2*-H4*, H4*-H2k*, H2k*-H5k*), Harmonic-to-Noise Ratio (HNR across multiple bands), and Cepstral Peak Prominence (CPP) were extracted at nine equidistant time points using VoiceSauce and Praat following a dual-tier annotation approach (tonal vowel portion vs. entire rime).

Statistical modeling was performed using Generalized Additive Mixed Models (GAMMs) via the mgcv package in R. Normalized acoustic values were modeled as a function of Tone (with T4 as the reference level), incorporating normalized time as a nonlinear smooth term with tone-specific difference smooths, alongside random smooths for Speaker and Syllable. F0 values were log-transformed and z-scored within speakers to ensure cross-speaker comparability, and models were estimated using fast restricted maximum likelihood (fREML).

Key design choices include the use of formant-corrected harmonic amplitudes to eliminate vocal tract resonance interference from vowel formants and isolate glottal source characteristics. Furthermore, dual-tier time-normalized sampling captured dynamic contour trajectories and localized convergences (e.g., matching T4 and T6 at syllable onsets where F0 paths intersect), distinguishing static level shifts from time-varying contour differences.

## Experimental setup

Data comprised 2,792 valid tokens from 16 native speakers across 104 words covering all 6 tones of Kaihui Xiang. Evaluated metrics included log-transformed z-scored F0, four formant-corrected spectral tilt measures, band-specific HNR, and CPP. GAMMs were implemented in R using mgcv with restricted maximum likelihood.

## Results

GAMM results show that T4 occupies the highest register with a sustained upward F0 trajectory. For lower-frequency spectral tilt (H1*-H2*), all other tones exhibit significantly higher values than T4 ($eta$ ranging from 0.18 to 0.55, $p < 0.001$), confirming that T4 possesses the lowest values (flattened lower-frequency spectral tilt indicative of tense modal voice rather than falsetto's steep tilt). In direct comparisons where F0 converges between T4 and T6 at syllable onset, voice qualities are indistinguishable, proving the tension is an F0-specific physiological byproduct rather than a tone-specific phonological feature.

| System / Tone Contrast | H1*-H2* Beta ($eta$) | H1*-H2* p-value | H2*-H4* Beta ($eta$) | H2*-H4* p-value |
|---|---|---|---|---|
| T4 (Reference) | 0.0 | — | -0.11 | 0.031 |
| T1 vs T4 | +0.39 | < 0.001 | +0.25 | < 0.001 |
| T2 vs T4 | +0.41 | < 0.001 | +0.18 | < 0.001 |
| T3 vs T4 | +0.55 | < 0.001 | +0.06 | 0.012 |
| T5 vs T4 | +0.23 | < 0.001 | +0.22 | < 0.001 |
| T6 vs T4 | +0.18 | < 0.001 | 0.00 | 0.881 |

## Limitations

The study relies exclusively on acoustic measures without direct physiological tracking (such as electroglottography or high-speed videoendoscopy). The participant cohort is restricted to older adults (aged 42–80) due to language shift dynamics in the region, leaving age-related voice quality variations unquantified. Data collection was limited to a single sentence-medial carrier phrase environment, omitting continuous speech and diverse prosodic contexts.

## Why read this

Phoneticians and speech scientists studying voice quality, tone-phonation interactions, and physiological pitch mechanics should read this paper to see how GAMMs and formant-corrected spectral tilts can rigorously debunk auditory myths about falsetto in tone systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving speech synthesis and voice conversion systems for tonal languages by accurately modeling the physiological voice quality changes associated with extreme high-pitch tones.

## Institutions / 機構

City University of Hong Kong

**Funding / 經費:** CityU StartUp Grant

## Related

- (link related pages by id as the wiki grows)
