---
id: walczak26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1936
pdf: https://www.isca-archive.org/interspeech_2026/walczak26_interspeech.pdf
---

# From onset to coda: spectral variation in normative Polish /s/ produced by children

*Joanna Walczak, Oliwia Skórzewska, Zuzanna Miodońska*

[PDF](https://www.isca-archive.org/interspeech_2026/walczak26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/walczak26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1936)

**Category:** `phonetics-linguistics`

**TL;DR** — This pilot study investigates word-position effects on the spectral properties of perceptually normative Polish /s/ produced by 102 preschool children, finding significant positional variations driven primarily by initial-medial contrasts across spectral centroid, flux, kurtosis, and skewness.

## Key contributions

- Quantified word-position acoustic variation (initial, medial, final) on 816 tokens of normative Polish /s/ from 5-8 year old children.
- Demonstrated that word-initial /s/ exhibits significantly lower spectral centroid, flux, and kurtosis compared to word-medial /s/ (Cohen's d up to 1.09).
- Revealed that medial-final contrasts are largely non-significant except for spectral skewness, positioning word-final /s/ as intermediate.
- Employed linear mixed-effects (LME) models controlling for stress, preceding/following phones, and parent word as random effects.

## Problem

Sibilant fricatives like Polish /s/ are shaped by linguistic and developmental factors, yet word-position effects remain underdescribed in children's speech. Prior approaches often overlook how prosodic organization, boundary-related timing, and coarticulatory demands alter spectral properties even in perceptually normative productions. This gap makes it difficult to fully understand child speech motor development and establish language-specific acoustic baselines.

## Method

The corpus consists of 816 tokens from 102 Polish-speaking children aged 5-8 years pronouncing 8 basic vocabulary words containing /s/ in initial, medial, and final positions. Audio was recorded via Panasonic WM61 electret microphones at 15 cm distance, sampled at 44.1 kHz with 16-bit resolution. Signals were manually segmented using 20 ms Hamming windows with a 10 ms overlap and 50 Hz spectral resolution STFT.

Five acoustic features were extracted per frame and averaged per token: first spectral moment / spectral centroid (CoG), spectral kurtosis (M4), spectral skewness (M3), and spectral flux. Linear mixed-effects (LME) models were fitted with word position as a fixed effect (initial as intercept), by-speaker random intercepts and slopes for stress, preceding phone, and following phone, and a random intercept for parent word. Pairwise contrasts were evaluated using estimated marginal means (EMMs) with Bonferroni adjustments.

## Experimental setup

The dataset comprised 816 /s/ tokens from 102 preschoolers from the PAVSig database, spanning 8 words. Statistical analyses were performed in R 4.4.2 using lme4, with signal processing in Matlab 2023b. Metrics included estimated marginal means of CoG, flux, kurtosis, and skewness, evaluated via Bonferroni-adjusted pairwise contrasts and Cohen's d effect sizes.

## Results

The initial-medial contrast yielded the largest effect sizes across all measures (d = 0.65-1.09, p < 0.001), with word-initial /s/ showing lower CoG, flux, and kurtosis than medial tokens. Initial-final differences were also significant (d = 0.47-0.56, p < 0.001), while medial-final differences were non-significant except for spectral skewness (d = 0.53, p = 0.02).

| Acoustic Feature | Initial vs Medial (d) | Initial vs Medial (p) | Initial vs Final (d) | Initial vs Final (p) | Medial vs Final (d) | Medial vs Final (p) |
| --- | --- | --- | --- | --- | --- | --- |
| Spectral Centroid | 0.82 | < 0.001 | 0.47 | 0.01 | 0.36 | 0.22 |
| Spectral Flux | 0.65 | < 0.001 | 0.48 | < 0.001 | 0.17 | 0.84 |
| Spectral Kurtosis | 0.75 | < 0.001 | 0.47 | < 0.001 | 0.27 | 0.27 |
| Spectral Skewness | 1.09 | < 0.001 | 0.56 | < 0.001 | 0.53 | 0.02 |

## Limitations

The study relies on a small, unbalanced lexical corpus of only 8 words, limiting generalizability. Age was treated merely as a sample descriptor rather than modeled as a covariate, and no adult control group was included for baseline comparison.

## Why read this

Phoneticians and speech researchers studying child language acquisition will learn how word boundary contexts systematically bias spectral moments of sibilants even in perceptually correct speech.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Speech-language pathology assessment tools, children's speech recognition systems, and developmental phonetics research.

## Institutions / 機構

Silesian University of Technology

**Funding / 經費:** National Science Centre, Poland, European Funds for Silesia, Just Transition Fund

## Related

- (link related pages by id as the wiki grows)
