---
id: rust26_interspeech
category: paralinguistic
updated: 2026-09-29
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2356
pdf: https://www.isca-archive.org/interspeech_2026/rust26_interspeech.pdf
---

# Dynamic Time Warping Reveals Prosodic Alignment in Caregiver–Child Interactions across Languages

[PDF](https://www.isca-archive.org/interspeech_2026/rust26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/rust26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2356)

**TL;DR** — Dynamic Time Warping analysis of longitudinal caregiver-child interactions across three languages reveals that pitch-contour similarity decreases as children grow older, supporting a social accommodation account for child-directed speech properties.

## Problem

While the acoustic and structural properties of child-directed speech (CDS) are well-documented, the underlying mechanisms driving these features remain unclear. Existing theories attribute them either to low-level linguistic priming or socially motivated accommodation, but lack cross-linguistic evaluation across developmental timescales. Resolving this gap helps explain how general interactional principles shape language acquisition input.

## Method

The study analyzes naturalistic longitudinal corpora from English, Japanese, and Russian taken from the ACQDIV database, comprising over 1,300 hours of audio and nearly a million child utterances. Following caregiver utterances within a 2-second window of a child utterance are extracted, and their fundamental frequency (F0) contours are compared to child utterances using Dynamic Time Warping (DTW) via Python's parselmouth and dtw-python libraries. Utterances are mean-centered to isolate contour shape from speaker height, and outliers/octave jumps are corrected via Savitzky-Golay filtering. Language-wise Bayesian multilevel linear regression models (implemented via brms in R with LogNormal likelihoods) predict normalized DTW distance using temporal distance (delta-t) and child age as fixed effects, alongside random intercepts per child.

## Results

Temporal distance (delta-t) showed a positive association with pitch-contour similarity in Russian (95% CrI: [0.01, 0.04]), no credible effect in English (95% CrI: [-0.01, 0.01]), and an inverse effect in Japanese (95% CrI: [-0.05, -0.03]). Child age exhibited a credible positive association with pitch-contour distance in English (95% CrI: [0.03, 0.05]), Japanese (95% CrI: [0.00, 0.02]), and Russian (95% CrI: [0.03, 0.06]), indicating decreasing pitch-contour similarity as children age. Evidence ratios (ER) for age effects were infinite or very high across all three languages, confirming developmental modulation consistent with social accommodation.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech engineers and computational linguists studying human conversational dynamics, child-language acquisition, and interactive spoken dialogue systems modeling stylistic adaptation.

## Limitations

The study focuses exclusively on fundamental frequency (F0) pitch contours and a limited set of three languages/cultures, potentially overlooking sub-utterance alignments, other acoustic features like speech rate, and culture-specific pragmatic norms.

## Related

- (link related pages by id as the wiki grows)
