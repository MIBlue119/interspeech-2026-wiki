---
id: curetti26_interspeech
category: phonetics-linguistics
institutions: ["University of Nottingham", "University of Lancashire"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2534
pdf: https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.pdf
---

# Towards an understanding of prosodic cue weighting for turn-end classification in older adults with varying hearing abilities

*Lorenza Zaira Curetti, Hae-Sung Jeon, Lauren V. Hadley*

[PDF](https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/curetti26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2534)

**Category:** `phonetics-linguistics`

**TL;DR** — This exploratory study investigates how older adults with and without hearing loss use prosodic cues to judge turn completion in declarative questions, finding that typical hearing listeners rely on duration and intensity while listeners with hearing loss rely on pitch movement. Both groups successfully classified utterance ends above chance despite overall modest accuracy.

## Key contributions

- Demonstrated that older adults with hearing loss achieve above-chance turn-end classification based solely on prosody, with sensitivity comparable to listeners with typical hearing.
- Uncovered a cue-weighting shift: typical hearing listeners integrate word-final duration and intensity, whereas listeners with hearing loss rely primarily on pitch movement metrics.
- Identified a significant interaction for typical hearing listeners where short word durations make high intensity detrimental to turn-end accuracy, while long durations buffer against intensity variations.
- Provided empirical evidence that sensorineural hearing loss restructures the perceptual dimensions used for real-time conversational turn-taking rather than simply causing a uniform loss of prosodic sensitivity.

## Problem

Smooth conversational turn-taking relies on a listener's ability to predict when a speaker's turn is ending through phrase boundary prosody, yet individuals with sensorineural hearing loss often exhibit more variable turn-taking timing. Prior research establishes that hearing loss degrades spectral resolution and dynamic range, limiting access to pitch and intensity cues, while temporal-envelope sensitivity is often preserved. However, it remains unclear whether these sensory limitations cause poorer turn-end identification or drive a strategic reweighting of acoustic cues. This study addresses this gap by testing how hearing ability alters the perceptual reliance on temporal, amplitude, and pitch-related dimensions for turn-end categorization.

## Method

The experiment evaluated 112 online participants aged 55 to 75 split evenly into typical hearing (TH) and hearing loss (HL) groups based on the online Digit Triplet Test (DTT threshold of -17.1 dB SNR). Stimuli comprised 40 item pairs (80 total recordings) of declarative questions spoken by a male native speaker of Standard Southern British English, featuring finished items ending at intonational phrase (IP) boundaries and continuing items truncated at intermediate phrase (ip) boundaries. All stimuli were loudness-normalized to -23 LUFS and 5 ms-gated. Four acoustic features were extracted: target word duration (Ttw), mean target word intensity (dBtw), final rise duration (Trise), and final rise pitch excursion in semitones (STrise). Rank-based robust regression models (Rfit package) with backward elimination were fitted independently for each listener group and stimulus condition, using z-transformed predictors to evaluate accuracy interactions and main effects.

## Experimental setup

The study utilized 80 natural speech stimuli derived from 40 item pairs evaluated by 55 TH and 57 HL participants recruited via Prolific. Hearing status was screened via an online Digit Triplet Test (DTT) with adaptive SNR across 25 trials. Performance metrics included d-prime sensitivity, response bias (C), and item-level rank-based regression coefficients. Implementation utilized R v4.5.2, ProsodyPro in Praat, psycho, and Rfit packages.

## Results

Both groups performed significantly above chance (TH mean accuracy 61%, d'=0.28, p<0.001; HL mean accuracy 54%, d'=0.10, p=0.03) with no significant difference in overall sensitivity (p=0.12) or response bias (C=-0.08 vs -0.09). For continuing stimuli, prosodic predictors failed to reach significance for either group (R²=0.07 to 0.09). For finished stimuli, TH listeners showed a significant interaction between intensity and duration (dBtw × Ttw, β=0.036, p=0.007) alongside a negative main effect of intensity (β=-0.033, p=0.023), indicating that high intensity harmed accuracy only when target words were short (-1 SD). In contrast, HL listeners' accuracy for finished items was predicted exclusively by pitch rise metrics (Trise: β=-0.032, p=0.015; STrise: β=-0.028, p=0.029), reflecting a reliance on direct fundamental frequency trajectories rather than internalised durational expectations.

| System / Condition | d' Sensitivity | Accuracy (%) | Primary Cue Predictors | R² (Finished) |
|---|---|---|---|---|
| Typical Hearing (TH) | 0.28 | 61% | Intensity × Duration | 0.28 |
| Hearing Loss (HL) | 0.10 | 54% | Pitch Rise Duration & Excursion | 0.24 |

## Limitations

The study was conducted online without strict acoustic environment control, limiting precise sound pressure level calibration. Hearing groups were categorized using a threshold cutoff on a speech-in-noise test rather than continuous pure-tone audiograms, which may obscure graded severity effects. Overall task accuracy was modestly above chance (~54-61%), potentially reducing statistical power for subtle higher-order interactions.

## Why read this

Speech researchers and hearing scientists should read this to understand how sensory deficits drive adaptive cue-weighting shifts in real-time conversational processing rather than simple performance deficits. It highlights that rehabilitation and speech technology should account for altered perceptual weights during communicative interventions.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving hearing aid processing strategies, designing conversational agents that adapt prosodic feedback for hearing-impaired users, and developing targeted auditory training for turn-taking dynamics.

## Institutions / 機構

University of Nottingham, University of Lancashire

## Related

- [Less can be More: What Aspects of Speech Drive End-of-Turn Detection](sharon26_interspeech.md) — same problem · relatedness 2.0/3
- [Word Lengthening as a Function of Utterance Position: A Multi-Corpus Study](camara26b_interspeech.md) — same problem · relatedness 1.9/3
- [More than a feeling: Expressive style influences cortical speech tracking in subjective cognitive decline](ma26b_interspeech.md) — same problem · relatedness 1.9/3
- [Imitation Learning for Elder-Facing Speech Synthesis](han26d_interspeech.md) — same problem · relatedness 1.9/3
- [Disentangling Depression from Cognitive Decline in Elderly Speech Using Concurrent Clinical Assessments](jeon26_interspeech.md) — relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
