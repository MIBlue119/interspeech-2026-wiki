---
id: xie26d_interspeech
category: phonetics
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2138
pdf: https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.pdf
---

# Acoustic Differences Between Citation and Sandhi Tones Across Three Generations in Xiamen Southern Min

*Huangyang Xie, Xiuwei Zeng, Weijun Zhang, Peggy Pik Ki Mok*

[PDF](https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/xie26d_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2138)

**TL;DR** — This study acoustically investigates citation and sandhi tones across three generations of Xiamen Southern Min speakers, uncovering subphonemic divergences obscured by the traditional "tone sandhi circle" and a striking generational split where teenagers enhance sandhi contrasts while seniors neutralize them.

## Key contributions

- Provides quantitative acoustic evidence (F0 height and slope) demonstrating that sandhi tones are not acoustically equivalent to their citation counterparts, challenging traditional auditory descriptions of Xiamen Southern Min.
- Reveals a typologically unusual generational split in sandhi realizations: teenagers significantly enhance the acoustic distinction between /44/ > [22a] and /24/ > [22b], whereas seniors near-completely neutralize them.
- Analyzes data from 49 native speakers across three distinct age groups (teenagers, middle-aged, seniors) using a rigorous picture-naming production experiment comprising monosyllabic and disyllabic tasks.
- Applies generalized additive mixed models (GAMMs) and linear mixed-effects models to comprehensively evaluate F0 trajectories across temporal duration, tone type, syllable position, and age.

## Problem

Traditional descriptions of tone sandhi systems, such as the "tone sandhi circle" in Xiamen Southern Min, rely heavily on auditory impressions that treat sandhi forms as structurally identical or phonetically equivalent to citation tones of the same category. Similar assumptions in Mandarin (e.g., Tone 3 sandhi equating to Tone 2) have been challenged by acoustic studies revealing systematic fine-grained phonetic differences. However, complex tone sandhi chains in varieties like Xiamen Min remain underexplored acoustically, and it is unclear how these phonetic realizations are maintained, shifted, or varied across different generations of speakers over time.

## Method

The study analyzes speech audio from 49 native Xiamen Southern Min speakers divided into teenagers (13-19 years), middle-aged adults (35-59 years), and seniors (61-87 years). Data was elicited through three picture-naming tasks: Task 1 targeted monosyllabic words with all 7 lexical citation tones, Task 2 used single pictures of disyllabic real words, and Task 3 used a two-picture combination paradigm requiring participants to combine morphemes and actively apply tone sandhi rules.

Audio recordings captured at 44,100 Hz were manually segmented in Praat, audited by two native raters (with a third arbiter for disagreements, yielding high interrater reliability kappa = 0.95), and filtered to remove 726 incorrect tokens and 59 severely creaky tokens, leaving 4,167 valid tokens. F0 was automatically tracked using ProsodyPro and Praat at 10 equidistant points per duration-normalized syllable, and z-score normalized per speaker. Statistical modeling utilized generalized additive mixed models (GAMMs) via the mgcv package and linear mixed-effects models in R, incorporating fixed effects for tone value, syllable position (S1 vs. S2), stimulus type, and age group, along with random participant intercepts and slopes.

## Experimental setup

The dataset comprises valid speech tokens from 49 native speakers (16 teenagers, 21 middle-aged, 12 seniors) across 3 production tasks totaling 91 baseline stimuli (36 monosyllabic, 30 single-picture disyllabic, 25 two-picture disyllabic). Performance metrics included F0 height ratios, rise/fall magnitudes, and F0 contour trajectories evaluated across 10 temporal points. Implementation involved Praat, ProsodyPro, and R packages (mgcv, itsadug, ggplot2), analyzing five unchecked tones (/44/, /24/, /53/, /21/, /22/) and their corresponding sandhi forms.

## Results

GAMM and linear mixed-effects models revealed significant main effects of tone type and interactions with age groups. For level tones, teenagers showed a significantly compressed citation tonal space with smaller F0/44/ / F0/22/ ratios (mean 1.06) compared to middle-aged (1.13) and senior speakers (1.15; ANOVA F(2, 45) = 11.13, p < 0.001). Rise magnitudes for /24/ also differed drastically, with teenagers averaging 30.8 Hz-ratio compared to 60.9 Hz for middle-aged and 69.0 Hz for seniors (F(2, 372) = 54.36, p < 0.001).

For sandhi contrasts, sandhi /53/ was higher in F0 than citation /53/ by approximately 15 Hz, and sandhi [21] exhibited a flatter slope than citation /21/. Crucially, while traditional literature groups /44/ > [22a] and /24/ > [22b] as a neutralized /22/, a significant interaction showed a generational split: teenagers produced a distinct F0[22a] / F0[22b] ratio (mean 1.07), middle-aged speakers showed an intermediate ratio (1.05), and seniors largely neutralized the contrast (mean 1.02; ANOVA F(2, 487) = 32.1, p < 0.001). The study does not evaluate automatic speech recognition or machine learning classification systems.

| Age Group | Citation F0/44/ / F0/22/ Ratio (Mean) | Tone /24/ Rise Magnitude (Mean) | Sandhi F0[22a] / F0[22b] Ratio (Mean) |
|---|---|---|---|
| Teenager | 1.06 | 30.8 | 1.07 |
| Middle-aged | 1.13 | 60.9 | 1.05 |
| Senior | 1.15 | 69.0 | 1.02 |

## Limitations

The study relies on controlled lab elicitation via picture naming using real words, which may not fully reflect spontaneous or connected conversational speech dynamics. The sample size of 49 speakers, while balanced across three age brackets, is relatively small and restricted to group-level inferences rather than deep individual longitudinal tracking. Furthermore, the acoustic analysis is constrained to unchecked tones in specific disyllabic contexts, omitting checked tone sandhi behaviors and broader syntactic environments.

## Why read this

Phoneticians and speech researchers studying tonal languages and sound change should read this paper to understand how subphonemic sandhi divergences deviate from traditional phonological descriptions and how generational shifts actively reshape tonal spaces. It provides methodological rigor in applying GAMMs to F0 contours for tracking ongoing sociophonetic evolution.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving text-to-speech (TTS) systems and acoustic pronunciation models for Southern Min and tone-sandhi-heavy Chinese dialects by incorporating realistic, age-sensitive fine-grained phonetic sandhi variations rather than rigid categorical rules.

## Related

- (link related pages by id as the wiki grows)
