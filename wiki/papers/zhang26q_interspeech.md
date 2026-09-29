---
id: zhang26q_interspeech
category: phonetics-linguistics
institutions: ["University of Macau", "Peking University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-1200
pdf: https://www.isca-archive.org/interspeech_2026/zhang26q_interspeech.pdf
---

# Age-related Differences in Acoustic Realization of Aspirated Fricatives in Shaxi Bai

*Xiaofang Zhang, Infat Lo, Yao Lu*

[PDF](https://www.isca-archive.org/interspeech_2026/zhang26q_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/zhang26q_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1200)

**Category:** `phonetics-linguistics`

**TL;DR** — This study analyzes the acoustic realization of aspirated fricatives in Shaxi Bai across 30 speakers, demonstrating that aspiration is encoded multidimensionally through temporal, spectral, and phonatory cues with notable intergenerational reorganization among young speakers.

## Key contributions

- Evaluated the relative acoustic contribution of temporal (initial duration ratio), spectral (spectral centroid difference), and phonatory (H1*-H2*) dimensions in Shaxi Bai aspirated versus unaspirated fricatives.
- Quantified age-related differences across 30 speakers divided into three age groups (older, middle-aged, young), revealing an ongoing reorganization or weakening of the aspiration contrast in young speakers.
- Provided speaker-level heatmap profiling demonstrating individual variability in cue-weighting (spectrally vs. temporally weighted profiles) rather than a uniform strategy.
- Systematically modeled token data using linear mixed-effects models with random intercepts for speaker and lexical item, establishing a robust statistical baseline for Sino-Tibetan fricative studies.

## Problem

Prior research on aspirated fricatives has typically treated their acoustic realization as monolithic or relied on qualitative descriptions, failing to systematically model the relative contributions of temporal, spectral, and phonatory dimensions within a unified statistical framework. Furthermore, existing studies rarely quantify intergenerational variation or sound change mechanisms using mixed-effects approaches across endangered or underdocumented dialects like Shaxi Bai. Understanding these dynamics is critical for capturing how phonetic dimensions shift during ongoing language evolution, as different cue-weighting profiles among speakers could dictate diachronic trajectories such as phonemic merger or reanalysis into affricates.

## Method

The study analyzes 960 total speech tokens (16 target words produced twice by 30 native speakers). Recordings were captured in Lijiang, China, using a Sony ECM-77B microphone, Eggforsingers 7050A, XENYX 302USB mixer, and XONAR U7 sound card, sampled at 44.1 kHz / 16-bit in Adobe Audition 2021. Annotation was performed in Praat across intervals for the fricative, aspiration, following vowel, and entire syllable.

Three acoustic dimensions were extracted: (1) Temporal, measured as the initial duration ratio (onset consonant duration including frication/aspiration divided by total syllable duration); (2) Spectral, measured via spectral centroid difference ($SC_{20\%} - SC_{80\%}$) to capture dynamic intra-fricative changes; and (3) Phonation, measured via formant-corrected $H_1^* - H_2^*$ using VoiceSauce over the stable voiced portion of the following vowel. All measures were standardized within speaker to mitigate interspeaker variability.

Linear mixed-effects models were fit in R (v4.4.2) using lme4, treating aspiration condition, fricative category, and their interactions as fixed effects, with random intercepts for speaker and lexical item. Estimated marginal means and pairwise contrasts were computed using emmeans to uncover systematic age-group and phoneme-specific behaviors.

## Experimental setup

The dataset comprises 960 tokens from 30 native Shaxi Bai speakers (16 male, 14 female; 14 older aged $\ge 56$, 13 middle-aged 36–55, 3 young 18–35) from Jianchuan County, Yunnan Province. The evaluation relies on linear mixed-effects models and estimated marginal means across temporal, spectral, and phonatory dimensions, comparing aspirated and unaspirated conditions across /f/, /s/, /x/, and /C/ fricative types.

## Results

Older and middle-aged groups exhibit significantly higher initial duration ratios for aspirated fricatives compared to unaspirated counterparts (e.g., old group effects ranging from 0.63 to 0.75***), whereas young speakers show a collapsed temporal contrast except for /s/ (0.86**). Spectral centroid differences are robust in older groups for /C/, /s/, and /f/ (e.g., middle group /s/ effect at 2.38***), but drop sharply in young speakers (down to 0.45 for /s/). Phonation measure $H_1^* - H_2^*$ shows weak and inconsistent effects restricted largely to /C/ (old group effect 1.03***), with young speakers displaying a reversed effect direction ($ -1.10^* $) for /C/ and negligible separation elsewhere.

| System / Condition | Temporal (Onset Ratio) | Spectral (CoG Diff) | Phonation (H1*-H2*) |
|---|---|---|---|
| Older Group (/s/) | 0.75*** | 2.06*** | Non-significant |
| Middle-Aged Group (/s/) | Positive | 2.38*** | Non-significant |
| Young Group (/s/) | 0.86** | 0.45 (NS) | Non-significant |
| Older Group (/C/) | Positive | Positive | 1.03*** |
| Young Group (/C/) | Non-significant | Non-significant | -1.10* |

## Limitations

The young speaker cohort is severely restricted in size (n = 3), requiring cautious interpretation of the dispersion and lack of temporal contrasts in that group. The study is limited to a single dialect (Shaxi Bai) and 16 target word lexical items, lacking perceptual listening tests to confirm whether acoustic differences are functionally active for listeners. Additionally, the phonation measure $H_1^* - H_2^*$ suffers from high interspeaker variance and inconsistent directional patterns.

## Why read this

Phoneticians and speech researchers studying sound change and multidimensional acoustic cues will find this a valuable template for decoupling temporal, spectral, and phonatory dimensions in fricatives using linear mixed-effects modeling.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Acoustic phonetic analysis, dialectology documentation, and historical sound change modeling.

## Institutions / 機構

University of Macau, Peking University

**Funding / 經費:** National Social Science Fund of China

## Related

- (link related pages by id as the wiki grows)
