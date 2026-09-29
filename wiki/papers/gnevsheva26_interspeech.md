---
id: gnevsheva26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2861
pdf: https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.pdf
---

# Modelling diphthong dynamics: A GAMM-based analysis of Australian English diphthongs

*Ksenia Gnevsheva, Canaan Lan, Gerard Docherty, Catherine Travis*

[PDF](https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/gnevsheva26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2861)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper applies Generalised Additive Mixed Models (GAMMs) to spontaneous speech corpora to analyse full formant trajectories of five Australian English diphthongs across gender and location, revealing that traditional static onset/offset analyses miss critical non-parallel shape and timing changes.

## Key contributions

- Demonstrates that GAMM-based full-trajectory acoustic analysis uncovers socially-conditioned vowel dynamics (gender and regional variation) invisible to traditional 20%/80% target-point measurements.
- Compares spontaneous speech from 58 speakers across an urban center (Sydney, n=27) and an inner regional area (Braidwood, n=31), carefully matching for age and socio-economic index (AUSEI).
- Reveals significant main effects of gender across all five examined diphthongs (FACE, FLEECE, PRICE, GOAT, MOUTH) and location effects for three (FACE, FLEECE, MOUTH), with women and urban speakers leading sound changes.
- Exposes methodological flaws in static point analysis—such as misinterpreting FLEECE offset openings as conservative when full trajectory reveals a more monophthongal (innovative) shallow slope.

## Problem

Traditional sociophonetic analyses of diphthongs rely on discrete time points (typically 20% and 80% of vowel duration) to represent onset and offset targets, which discards substantial acoustic information regarding vowel shape and movement rates. Prior work using this reductionist approach assumes parallel formant trajectories across social groups, failing to capture complex, non-linear trajectories. Furthermore, while Australian English vowel shifts are well-documented in major cities, regional variation remains severely understudied. This limitation risks overlooking or misinterpreting socially meaningful phonetic variations driven by gender and geography.

## Method

The study analyzes spontaneous speech corpora from Sydney (Sydney Speaks, longitudinal sociolinguistic interviews) and Braidwood (Voices of Regional Australia, oral history interviews from the Black Summer bushfires podcast series). Audio was orthographically transcribed (manually for Sydney, using Azure AI Speech with local corrections for Braidwood), segmented, and time-aligned in LaBB-CAT. Acoustic measurements were extracted using Fast Track defaults, estimating F1 and F2 at 10% intervals for lexically stressed vowels in content words. Tokens were filtered using a 196-item stop-list, outlier removal (mid-point F1 > 1500 Hz or outside 2 SDs per vowel/speaker), modified Lobanov vowel normalisation, and restriction to interobstruent contexts to control for phonological environment.

Generalised Additive Mixed Models (GAMMs) were fitted per vowel category using the bam() function from the mgcv package in R. The models treated normalised F1 and F2 estimates at seven equidistant points (20% to 80% trajectory) as dependent variables. Fixed parametric effects included Gender, Location, and their interaction, all treatment-coded. The architecture employed smooth terms for normalised time (with by-factor smooths for group trajectories), a covariate smooth for vowel duration, and random factor smooths for speaker and lexical item. Autoregressive error models were incorporated to handle formant trajectory autocorrelation, with model comparisons performed using ML estimation via the itsadug package.

## Experimental setup

The dataset comprises 58 speakers (31 from Braidwood: 16 women, 15 men; 27 from Sydney: 15 women, 12 men) of Anglo-Celtic background, middle-aged or older (birth years 1947-1982 for regional, 1954-1971 for urban). Token counts vary by vowel: FACE (n=11,263), FLEECE (n=12,691), PRICE (n=5,859), GOAT (n=5,341), and MOUTH (n=3,493). The primary evaluation metrics are the statistical significance (p-values via chi-square model comparisons) of smooth and parametric terms in GAMMs for normalised F1 and F2 formant trajectories.

## Results

GAMM analyses revealed significant overall effects of Gender for all five diphthongs in F1 and F2 (e.g., FACE F1: χ²(10) = 26.64, p < .001; PRICE F1: χ²(10) = 12.38, p = .006; MOUTH F1: χ²(10) = 14.83, p < .001), with women consistently producing closer/fronter or more open variants depending on the phoneme, indicating they lead ongoing sound changes. Location effects were significant for FACE (F1: p = .016, F2: p < .001), FLEECE (F1: p = .001, F2: p < .001), and MOUTH F1 (p = .010), showing urban speakers leading rural speakers. Notable interactions included FLEECE F2 (χ²(7) = 7.50, p = .036), where regional men produced a more diphthongal (conservative) trajectory compared to all other groups. The approach fails to find significant location or interaction effects for PRICE F1/F2 and GOAT F1/F2 (except a weak GOAT F2 gender effect at p < .05, with no location effect at p = .070), demonstrating that regional variation does not uniformly impact all shifting vowels.

| Vowel | Gender Effect (F1/F2 p-val) | Location Effect (F1/F2 p-val) | Interaction Effect (F1/F2 p-val) |
|---|---|---|---|
| FACE | < .001 / < .001 | .016 / < .001 | .518 / .142 |
| FLEECE | < .001 / < .001 | .001 / < .001 | .088 / .036 |
| PRICE | .006 / < .001 | .117 / .558 | .673 / .806 |
| GOAT | .001 / < .05 | .307 / .070 | .899 / .137 |
| MOUTH | < .001 / < .001 | .010 / .923 | .379 / .824 |

## Limitations

The study is restricted to Anglo-Celtic speakers in specific age brackets (middle-aged or older), limiting generalizability across different ethnicities and age cohorts in Australia. The regional dataset relies heavily on oral history recordings from a single town (Braidwood) impacted by bushfires, which may introduce specific stylistic biases compared to urban sociolinguistic interviews. Furthermore, the analysis isolates vowels strictly to interobstruent environments to control phonological context, leaving coarticulatory effects with sonorants unmodelled.

## Why read this

Phoneticians, sociolinguists, and speech researchers should read this paper to understand why traditional static target measurements fail to capture dynamic sound changes. It provides a concrete methodological template for implementing GAMMs to analyze complex, non-linear formant trajectories in spontaneous speech corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sociophonetic analysis tools, automated dialectology assessment systems, and advanced phonetic research pipelines requiring fine-grained trajectory modeling rather than static target measurements.

## Institutions / 機構

Australian National University, University of Melbourne, Griffith University

**Funding / 經費:** Voices of Regional Australia, ARC Centre of Excellence for the Dynamics of Language

## Related

- (link related pages by id as the wiki grows)
