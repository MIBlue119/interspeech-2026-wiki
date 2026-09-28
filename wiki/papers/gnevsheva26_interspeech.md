---
id: gnevsheva26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-2861
pdf: https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.pdf
---

# Modelling diphthong dynamics: A GAMM-based analysis of Australian English diphthongs

[PDF](https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2861)

**TL;DR** — The paper applies Generalised Additive Mixed Models (GAMMs) to analyse full formant trajectories of five Australian English diphthongs across gender and geographic locations, demonstrating that dynamic trajectory modelling uncovers socially conditioned vowel variations invisible to traditional static onset-offset analyses.

## Problem

Traditional phonetic analyses of diphthongs typically rely on discrete temporal snapshots like the 20% onset and 80% offset, reducing complex spectral movements to static targets. This simplification discards crucial temporal and dynamic information regarding vowel shape and movement rates, potentially missing meaningful social and regional variations. Addressing this gap is vital because diphthongs in Australian English are undergoing active socio-stylistic shifts driven by factors like gender and urbanization.

## Method

The study utilises spontaneous speech corpora from Sydney (urban) and Braidwood (regional), including 31 regional speakers (16 women, 15 men) and 27 urban speakers (15 women, 12 men) matched by socio-economic index where possible. Fast Track default settings estimated F1 and F2 at 10% intervals for lexically stressed vowels in interobstruent content words, followed by modified Lobanov normalisation. Separate Generalised Additive Mixed Models (GAMMs) were fitted for each vowel using the mgcv package in R via the bam() function. The models incorporated parametric effects of Gender, Location, and their interaction, smooths for normalised time with by-factor smooths, covariate smooths for duration, and random factor smooths for speaker and lexical item alongside autoregressive error models to control for trajectory autocorrelation.

## Results

Gender exhibited a significant overall effect for all five examined diphthongs (FACE, FLEECE, PRICE, GOAT, and MOUTH), while Location was significant for three (FACE, FLEECE, and MOUTH). Women and urban speakers consistently showed more advanced realisations in ongoing sound changes (moving away from broader variants). For instance, traditional single-point analyses would have missed significant differences in the middle trajectory of PRICE F1 where onset points appear identical, or misinterpreted FLEECE F2 offsets where regional men exhibited more conservative, broader diphthongal trajectories. Model comparisons for FACE F1 showed significant effects for Gender (chi-square = 26.64, p < 0.001) and Location (chi-square = 10.91, p = 0.016), while FACE F2 showed significant effects for Gender (chi-square = 23.34, p < 0.001) and Location (chi-square = 27.26, p < 0.001).

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians, sociolinguists, and speech researchers studying acoustic phonetics, dialectology, and speech dynamics across diverse populations.

## Limitations

The study acknowledges interpretive limitations associated with model complexity and visual outputs restricted to 20-80% of normalised trajectories, as well as minor occupational score imbalances between regional and urban male cohorts.

## Related

- (link related pages by id as the wiki grows)
