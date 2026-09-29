---
id: ross26_interspeech
category: phonetics-linguistics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1526
pdf: https://www.isca-archive.org/interspeech_2026/ross26_interspeech.pdf
---

# Revisiting the NZE front vowel shift: evidence from New Zealand''s largest and most linguistically diverse city

*Brooke Ross, C. I. Watson, Elaine Ballard, Miriam Meyerhoff*

[PDF](https://www.isca-archive.org/interspeech_2026/ross26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/ross26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1526)

**Category:** `phonetics-linguistics`

**TL;DR** — This paper traces 100 years of sound change in New Zealand English (NZE) through an acoustic and statistical analysis of Auckland speakers, revealing a rise and subsequent fall of front vowels /e/ and /æ/ alongside early phonologically conditioned centralisation of /ɪ/.

## Key contributions

- Integrates modern (Auckland Voices corpus, n=67) and historical (Auckland Born corpus, n=8, born 1896-1914) speech data to analyze a century of sociophonetic change in Auckland.
- Performs linear mixed-effects modeling on F1 and F2 formant values (normalized via gender-based linear transformations) for the iconic short front vowels /e/, /æ/, and /ɪ/.
- Identifies a generational reversal in the Short Front Vowel Shift (SFVS), where younger Aucklanders exhibit lowered and retracted realisations of /e/ and /æ/ compared to older speakers.
- Demonstrates via a follow-up token-level analysis that historical /ɪ/ centralisation was initially conditioned by adjacent lateral consonants rather than uniform chain-shift pressure.

## Problem

Auckland, New Zealand’s largest and most demographically diverse urban center, has been largely excluded from historical sociophonetic narratives of New Zealand English (NZE), which have instead focused heavily on rural or South Island populations (such as the ONZE corpus). Furthermore, historical commentary from 1921 suggesting Auckland was a primary hub of early linguistic innovation has lacked verification via acoustic analysis. This leaves open questions regarding whether standard accounts of the Short Front Vowel Shift (SFVS)—where /e/ and /æ/ raising triggers /ɪ/ centralisation—apply uniformly across different regions and historical cohorts.

## Method

The study utilizes two datasets: the Auckland Voices corpus (67 interviews from 2017-2018 across two age groups: 16-25 and 40+, recorded using Zoom H5 and Marantz PMD 661 recorders with lavalier mics at 44.1 kHz / 24-bit) and the Auckland Born historical corpus (8 oral history speakers born 1896-1914, recorded 1980-2003, likely digitized from analog media at 44.1 kHz / 16-bit). Speech data was transcribed using ELAN and OCTRA, followed by forced alignment via the webMAUS English NZ service. First and second formants (F1, F2) were extracted at vowel targets under phrase stress using the forest function in R via the EmuR package, and manually verified using the Emu-Web-App, with tokens involved in the celery-salary merger excluded.

Statistical analysis was executed using linear mixed-effects models via the nlme package in R, treating age group and gender as fixed effects and individual speakers as random effects. To account for vocal tract differences, formant values underwent linear transformation by gender. Experiment 1 examined group and individual formant means for /e/, /æ/, and /ɪ/. Experiment 2 investigated individual token distributions of /ɪ/ for a historical speaker and evaluated centroid variations when excluding tokens adjacent to lateral consonants to test for phonetic conditioning.

## Experimental setup

The evaluation relies on two corpora: the modern Auckland Voices corpus comprising 67 speakers (38 younger, 29 older) and a preliminary historical subset of 8 speakers (4 women, 4 men). The primary metrics are F1 and F2 formant values measured in Bark scales, extracted from forced-aligned vowel targets. Statistical significance is evaluated via ANOVA comparisons of linear mixed-effects models incorporating age and gender predictors.

## Results

Mixed-effects models using the Older AV group as a reference reveal that both Historical and Younger AV groups possess significantly higher F1 and lower F2 values for /e/ (Historical F1: +0.93 bark, F2: -1.28 bark; Younger F1: +0.70 bark, F2: -0.98 bark) and /æ/ (Historical F1: +0.63 bark, F2: -0.72 bark; Younger F1: +0.84 bark, F2: -1.28 bark), demonstrating lower and retracted centroids compared to the peak-raised Older AV group. For /ɪ/, only the Younger AV group shows a statistically significant F1 increase (+0.29 bark) indicating a lower vowel. Experiment 2 demonstrates that removing lateral-adjacent tokens shifts historical /ɪ/ centroids forward in the vowel space (with lateral F2 values showing strong retraction around -1.08 to -1.23 bark differences), whereas lateral exclusion has minimal impact on modern groups.

| System / Condition | F1 /e/ (bark) | F2 /e/ (bark) | F1 /æ/ (bark) | F2 /æ/ (bark) | F1 /ɪ/ (bark) | F2 /ɪ/ (bark) |
|---|---|---|---|---|---|---|
| Older AV (Reference) | 3.98 | 12.00 | 4.06 | 11.44 | 4.04 | 11.29 |
| Younger AV Group | +0.70 | -0.98 | +0.84 | -1.28 | +0.29 | -0.10 |
| Historical Group | +0.93 | -1.28 | +0.63 | -0.72 | 0.00 | +0.24 |

## Limitations

The historical dataset represents a very small preliminary subset of only 8 speakers, requiring confirmation across a larger archival sample. Variations in historical recording media, cassette preservation, and unknown digitisation pipelines introduce potential artifacts into high-vowel formant measurements. Additionally, substantial inter- and intra-speaker variability in early NZE complicates direct mapping against modern sociophonetic baselines.

## Why read this

Speech researchers and sociophoneticians interested in vowel shifts and urban sound change should read this paper to see how archival historical audio can challenge canonical models of chain shifts like the Short Front Vowel Shift.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Sociophonetic analysis, historical linguistics documentation, and automated speech recognition adaptation for regional New Zealand English dialects.

## Institutions / 機構

University of Auckland, University of Oxford

**Funding / 經費:** Marsden Fund Council

## Related

- (link related pages by id as the wiki grows)
