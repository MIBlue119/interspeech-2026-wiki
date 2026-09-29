---
id: guan26_interspeech
category: phonetics-linguistics
institutions: ["University of Auckland"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1545
pdf: https://www.isca-archive.org/interspeech_2026/guan26_interspeech.pdf
---

# Effects of body position on vowel formants in New Zealand English

*Qing Guan, C. I. Watson, C. T. Justine Hui*

[PDF](https://www.isca-archive.org/interspeech_2026/guan26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/guan26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1545)

**Category:** `phonetics-linguistics`

**TL;DR** — This study investigates how static body position (supine, sitting, standing) affects vowel formants F1 and F2 in New Zealand English, finding small, non-uniform shifts that are most pronounced in high-front vowels for female speakers.

## Key contributions

- Quantifies posture-related acoustic variation across 11 New Zealand English vowels in a controlled within-speaker /hVd/ corpus.
- Demonstrates via linear mixed-effects modeling that position effects are vowel-dependent rather than a uniform whole-system shift.
- Reveals significant demographic interactions, showing clearer F1/F2 position offsets for female speakers, particularly younger females.
- Provides practical guidelines advocating for the documentation of recording body posture when merging datasets from upright labs and supine MRI setups.

## Problem

Acoustic analyses of vowels typically control for speaker demographics like age and sex while ignoring the subject's body position during recording. This oversight is problematic because speech collection environments vary wildly—ranging from upright field/lab booths to supine configurations in MRI scanners. Prior research on posture effects is inconclusive, reporting small, conflicting acoustic shifts across different languages and limited vowel sets without systematically modeling demographic interactions. This study addresses the gap by evaluating whether posture introduces systematic, vowel- and demographic-specific offsets in vowel formants.

## Method

The study analyzes a within-speaker isolated-word /hVd/ corpus featuring 11 distinct New Zealand English vowels (/i:/, /I/, /e/, /æ/, /3:/, /u:/, /U/, /o:/, /O/, /5/, /5:/). Speech was recorded across three static positions (sitting, standing, supine) inside a WhisperRoom SE 2000 Series sound-isolation enclosure using a Shure SM58 microphone maintained at a 20 cm distance. Automatic word alignment was executed via WebMAUS Basic with New Zealand English language models, followed by manual boundary correction in Praat. Formant tracks (F1 and F2) were extracted using the ASSP tracker and manually checked and corrected in EMU-R. 

Before statistical modeling, formant values in Hz were converted to Bark scale. Linear mixed-effects models were fitted separately for F1 (Bark) and F2 (Bark) using R (lmerTest package), designating Position (supine, sitting, standing) as the main predictor, Vowel, Age, and Sex as fixed effects, and Speaker as a random intercept. Starting from a full four-way interaction model, fixed-effect structures were simplified via backward elimination using likelihood-ratio tests. Estimated marginal means (EMMs) and pairwise contrasts (supine-sitting, supine-standing, sitting-standing) were calculated with Tukey adjustments to isolate specific vowel-level and age-by-sex differences.

## Experimental setup

The dataset comprises recordings from 9 native New Zealand English speakers (5 male, 4 female) split into two age groups: younger (20-25 years, n=5) and older (45-50 years, n=4). Each speaker produced 5 list orders of 11 /hVd/ words with 2 repeated words per list (13 tokens per list) across all three body positions. Evaluation metrics rely on estimated marginal means of F1 and F2 in Bark, evaluated via linear mixed-effects models with Tukey-adjusted p-values (threshold p < 0.05).

## Results

Aggregate vowel space polygons show substantial overlap across sitting, standing, and supine conditions, indicating minimal global vowel space distortion. However, linear mixed-effects modeling confirms significant interaction effects involving position, vowel, age, and sex. For F1, significant vowel-specific contrasts are exclusively found in the supine-sitting comparison for high/mid vowels /I/ (p=0.04), /i:/ (p=0.02), and /u:/ (p=0.05), with clear overall shifts concentrated in female speakers (p < 0.001 for supine-sitting). For F2, significant vowel-specific differences occur in the supine-standing comparison for high-front vowels /I/ (p=0.001), /i:/ (p=0.006), and /5:/ (p=0.04). Age-by-sex conditioned contrasts reveal that F2 position differences are statistically significant across all three position comparisons exclusively within the younger female group (p <= 0.001). Male speakers and older female groups show no statistically significant position contrasts.

| Condition / Contrast | F1 Significant Pairs (Tukey p < 0.05) | F2 Significant Pairs (Tukey p < 0.05) |
|---|---|---|
| Female Speakers | Supine vs Sitting, Supine vs Standing | N/A (conditioned on Age x Sex) |
| Male Speakers | None | None |
| Younger Female Group | N/A (conditioned on Sex) | Supine vs Sit, Supine vs Stand, Sit vs Stand |
| Vowel /i:/ | Supine vs Sitting | Supine vs Standing |
| Vowel /I/ | Supine vs Sitting | Supine vs Standing |

## Limitations

The study relies on a small sample size of only 9 speakers, limiting generalizability and statistical power, particularly when dividing cohorts into age and sex subsets. The analysis is restricted to a single dialect (New Zealand English) and an isolated /hVd/ word list, which may not generalize to continuous, read, or conversational speech. Furthermore, non-significant trends near the alpha threshold suggest potential false negatives due to sample constraints.

## Why read this

Phoneticians, speech scientists, and multi-modal researchers combining laboratory audio recordings with MRI speech datasets should read this paper to understand how body posture systematically biases formant measurements.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-modal speech data harmonization, MRI-based articulatory-acoustic phonetics, and acoustic vowel-space normalization.

## Institutions / 機構

University of Auckland

## Related

- (link related pages by id as the wiki grows)
