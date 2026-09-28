---
id: zhang26h_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-691
pdf: https://www.isca-archive.org/interspeech_2026/zhang26h_interspeech.pdf
---

# Gender differences in the phonetic realization of the checked tone in Kaihui Xiang

*Yi Zhang, Aini Li*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26h_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26h_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-691)

**TL;DR** — This paper provides the first acoustic profile of the checked tone (T6) in Kaihui Xiang, revealing that it occupies a late stage of de-checking (rusheng shuhua) with complete coda loss, stable F0 contours, and leftward-shifted laryngealization. Female speakers exhibit attenuated duration contrasts and innovative phonatory dynamics, indicating they lead an ongoing sound change.

## Key contributions

- Establishes the first empirical acoustic profile of the checked tone (T6) in Kaihui Xiang across vowel duration, F0, and voice quality dimensions.
- Uncovers a spatial redistribution of phonatory cues where laryngealization shifts leftward to the syllable onset rather than acting as a final-phase glottal stop or creak.
- Identifies systematic gender-based asymmetries showing female speakers lead the de-checking trajectory through weaker temporal cues and advanced phonatory reorganization.
- Demonstrates that historical de-checking does not eliminate tonal category membership, but rather decouples tonal contrast from segmental closure while preserving F0 and duration.

## Problem

Checked syllables historically ending in oral or glottal stop codas are undergoing smoothing and attrition across Chinese languages, a process termed de-checking (rusheng shuhua). While varieties like Mandarin show complete merger, intermediate stages in Wu and Xiang are underexplored regarding their phonetic mechanisms and sociophonetic conditioning. Specifically, prior accounts present conflicting descriptions of coda retention in Kaihui Xiang, and the role of gender in driving structural attrition remains largely unknown.

## Method

The study analyzes 2,792 valid token recordings from 16 native Kaihui Xiang speakers (9 female, 7 male; aged 42–80) reading 104 monosyllabic target words embedded in the carrier sentence '/No21 fei55 kaN24 TARGET/'. Audio was recorded using a Zoom H4n Pro at 44.1 kHz/24-bit depth and processed via VoiceSauce to extract continuous parameters including log-transformed and z-scored F0, z-scored vowel duration, spectral tilt (H1*-H2*), and harmonic-to-noise ratio in the lower frequency range (HNR05). 

Statistical modeling uses Generalized Additive Mixed Models (GAMMs) with dummy-variable decomposition to capture non-linear temporal trajectories, main/interaction effects of Gender and Tone Type, and random smooths for speaker and syllable. Vowel duration is evaluated using a Linear Mixed-Effects Model (LMM) incorporating identical fixed and random effects. These choices isolate non-linear acoustic trajectories across normalized time steps while accounting for inter-speaker and lexical variation.

## Experimental setup

The study analyzes 2,792 tokens from 16 speakers after manual screening of 3,328 initial tokens across 104 monosyllabic target words. Continuous variables were z-scored per speaker. Analyses used R 4.5.1, employing mgcv for GAMMs and lmerTest for LMMs.

## Results

The checked tone (T6) exhibits a significantly shorter duration than unchecked tones (LMM estimate beta = -0.45, p < 0.001), with a significant Tone Type x Gender interaction (beta = 0.06, p = 0.025) showing that male speakers experience more pronounced durational truncation while female speakers maintain longer durations. F0 displays a stable falling contour across nine time points that remains invariant across genders (p = 0.972 for time-by-gender interaction). For voice quality, H1*-H2* exhibits a significant parametric interaction (beta = -0.36, p < 0.001) and smooth interaction (F = 4.03, p = 0.01), with females showing lower initial values indicating a compressed, leftward-shifted laryngealization at syllable onset. HNR05 shows a significant rising-falling trajectory (p < 0.001) where males exhibit higher mid-phase values indicating clearer modal voicing during the syllable nucleus compared to females.

| System / Condition | Duration (z) Effect | F0 Contour | H1*-H2* Onset Shift | HNR05 Mid-phase Peak |
|---|---|---|---|---|
| Male (Checked vs Unchecked) | Stronger reduction (-0.45) | Stable falling | Moderate initial dip | Clearer modal peak |
| Female (Checked vs Unchecked) | Weaker reduction | Stable falling | Stronger initial dip | Attenuated modal peak |

## Limitations

The study examines only a single carrier-sentence prosodic configuration, precluding evaluation of structural environment sensitivity on cue stability. The older demographic (ages 42–80) and absence of younger speakers prevent a direct apparent-time comparison, rendering the interpretation of ongoing sound change provisional.

## Why read this

Phoneticians and historical linguists studying sound change, tone evolution, and sociophonetic variation should read this to understand how coda loss and cue redistribution manifest across genders in endangered tone systems.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Fieldwork documentation and sociolinguistic archiving of recessive or endangered Chinese dialect varieties.

## Related

- (link related pages by id as the wiki grows)
