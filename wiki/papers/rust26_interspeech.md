---
id: rust26_interspeech
category: prosody
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2356
pdf: https://www.isca-archive.org/interspeech_2026/rust26_interspeech.pdf
---

# Dynamic Time Warping Reveals Prosodic Alignment in Caregiver–Child Interactions across Languages

*Olivier Rüst, Sabine Stoll*

[PDF](https://www.isca-archive.org/interspeech_2026/rust26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rust26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2356)

**TL;DR** — This paper investigates whether prosodic features of child-directed speech emerge from interactional alignment by measuring fundamental frequency contour similarity via Dynamic Time Warping in longitudinal corpora across English, Japanese, and Russian. Bayesian mixed-effects analyses reveal that caregiver-child pitch-contour similarity reliably decreases as child age increases across all three languages, supporting a social accommodation hypothesis.

## Key contributions

- Introduces an automated pipeline using Dynamic Time Warping (DTW) on fundamental frequency trajectories to quantify prosodic contour similarity in naturalistic caregiver-child interactions.
- Compares short-term temporal proximity ($\Delta t$) and developmental child-age predictors across typologically diverse corpora in English, Japanese, and Russian.
- Provides empirical evidence against pure priming accounts by demonstrating systematic, cross-linguistic decreases in pitch convergence as children grow older.
- Highlights language- and culture-specific modulation of interactional alignment, showing mixed short-term proximity effects ranging from positive in Russian to null in English and inverse in Japanese.

## Problem

While child-directed speech (CDS) and contingent caregiver speech are well known to exhibit exaggerated prosody, higher pitch, and simpler syntax that aid language acquisition, the underlying interactional mechanisms remain unclear. Prior work struggles to distinguish whether these acoustic properties arise from automatic linguistic priming between turns or socially motivated accommodation over developmental timescales. Addressing this gap matters because understanding how conversational dynamics shape linguistic input provides fundamental insights into human language acquisition and socio-communicative development.

## Method

The study analyzes longitudinal audio and video recordings from the ACQDIV database, specifically focusing on English (710 hours, 4 children), Japanese (351 hours, 4 children), and Russian (277 hours, 3 children) where interactions occur almost exclusively between the child and primary female caregivers. Following caregiver utterances occurring within a 2-second window after a child utterance onset were extracted, measuring temporal offset $\Delta t$. Fundamental frequency ($F_0$) values were extracted using Praat via Python's parselmouth package, with child pitch floors/ceilings set to 250–500 Hz and adult female floors/ceilings set to 150–500 Hz. Outlier octave jumps were removed, voiceless regions linearly extrapolated, and contours smoothed using Savitzky-Golay filtering.

To isolate shape from speaker-specific pitch height, each utterance's $F_0$ time series was mean-centered. Pairwise pitch contour similarity was then computed using Dynamic Time Warping via the dtw-python library to calculate length-normalized distances. The authors fit language-wise Bayesian multilevel linear regression models using brms in R, with normalized distance as the response variable, fixed effects for $\Delta t$ and child age (z-scored), and random intercepts per child. Models assumed a LogNormal likelihood with weakly informative priors ($N(0, 1)$ for fixed effects, Half-Student-$t$ with 3 degrees of freedom and scale 2.5 for random intercept standard deviations), running with a max tree depth of 15 and delta of 0.999.

## Experimental setup

Datasets comprise naturalistic language acquisition corpora from the ACQDIV database encompassing 710 hours (English), 351 hours (Japanese), and 277 hours (Russian), spanning child ages from 1;1 to 6;8 years. The approach does not compare performance against machine learning baselines, instead utilizing Bayesian mixed-effects regression models evaluated via 95% credible intervals (CrIs) and evidence ratios (ERs). Notable implementation details include R 4.3.1, brms, dtw-python[1.3.1], and parselmouth, with all chains achieving acceptable convergence ($\hat{R} \le 1.01$).

## Results

For short-term temporal proximity ($\Delta t$), Russian exhibits a positive association showing closer utterances have more similar pitch contours (95% CrI: [0.01, 0.04], ER > 284), whereas English shows no credible effect (95% CrI: [-0.01, 0.01]) and Japanese exhibits an unexpected negative association (95% CrI: [-0.05, -0.03]). Conversely, child age exhibits a robust positive association with pitch-contour distance across all three languages: English (95% CrI: [0.03, 0.05], ER = Inf), Japanese (95% CrI: [0.00, 0.02], ER = 299), and Russian (95% CrI: [0.03, 0.06], ER = Inf), demonstrating decreasing pitch similarity as children grow older.

The study does not report baseline performance comparisons or negative classification results, focusing entirely on statistical parameter estimation.

| Language | Temporal Proximity ($\Delta t$) Effect | Child Age Effect | Evidence Ratio (Age > 0) |
|---|---|---|---|
| English | Null effect (CrI: [-0.01, 0.01]) | Positive distance (CrI: [0.03, 0.05]) | Inf |
| Japanese | Inverse effect (CrI: [-0.05, -0.03]) | Positive distance (CrI: [0.00, 0.02]) | 299 |
| Russian | Positive proximity (CrI: [0.01, 0.04]) | Positive distance (CrI: [0.03, 0.06]) | Inf |

## Limitations

The study focuses exclusively on fundamental frequency contours and a limited sample of three languages and cultures, omitting other vital acoustic properties like voice onset time and speech rate, as well as structural and pragmatic variables. The utterance-level DTW measurement approach may dilute localized sub-utterance imitations or subtle phonetic convergence embedded inside longer caregiver utterances. Furthermore, naturalistic recording settings introduce potential unmodeled conversational confounders, and the cross-sectional language comparison cannot fully decouple cultural child-rearing norms from linguistic typology.

## Why read this

Speech researchers and developmental linguists seeking to understand the acoustic mechanisms behind child-directed speech should read this to see how computational time-series methods like Dynamic Time Warping can quantify interactional alignment across large longitudinal corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Analyzing human conversational dynamics, computational psycholinguistics, and designing socially adaptive interactive spoken dialogue systems.

## Related

- (link related pages by id as the wiki grows)
