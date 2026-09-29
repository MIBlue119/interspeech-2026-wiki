---
id: li26ja_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Hong Kong Polytechnic University", "City University of Hong Kong"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-3235
pdf: https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.pdf
---

# A Corpus-Based Study of Creaky Voice Production in English and Mandarin

*Meixian Li, Yao Yao, Charles Chang*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ja_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-3235)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study presents a cross-linguistic acoustic analysis of creaky voice production using parallel read-speech corpora of Mandarin and US English, demonstrating that men produce significantly creakier speech than women in both languages. This challenges the popular stereotype that creakiness is predominantly a female speech style.

## Key contributions

- Constructed parallel read-speech corpora comprising 61 US English speakers (28F) and 66 Mandarin Chinese speakers (34F) reading controlled emotion-neutral sentences.
- Measured four acoustic correlates of phonation (F0, H1-H2c, HNR35, CPP) across 5,874 vowel tokens over their 70% mid-portion using VoiceSauce and Praat.
- Utilized linear mixed-effects models incorporating talker and word random intercepts to control for linguistic and individual variability.
- Provided robust quantitative evidence that male speakers exhibit lower H1-H2c and HNR35 values than female speakers in both Mandarin and English, indicating greater glottal constriction.

## Problem

Creaky voice has been extensively studied in English—particularly regarding its negative socio-indexical evaluations in young women—yet cross-linguistic research on its actual production remains scarce and methodologically inconsistent. Prior perception studies often link creak to women, whereas recent production work on other languages like Canadian French suggests men are actually creakier. Furthermore, prior Mandarin studies yielded mixed results regarding gender differences due to variations in dialect focus, acoustic measures, and statistical aggregation. This work addresses these gaps by employing a unified crosslinguistic methodology to examine whether production patterns align with sociolinguistic stereotypes across typologically distinct languages.

## Method

The study analyzes read-speech audio collected via the Gorilla platform at 48 kHz, subsequently downsampled to 16 kHz mono WAV files and intensity-normalized to 70 dB. Forced alignment was performed using the Montreal Forced Aligner (MFA) with language-specific acoustic models and dictionaries, followed by manual inspection. Vowel intervals encompassing low, mid, and high vowels were extracted. Tokens with extreme durations (< 50 ms or > 500 ms) or un-trackable F0 in the 70% mid-portion were filtered out, leaving 3,002 Mandarin tokens and 2,872 English tokens.

Four acoustic measures were extracted over the 70% central portion of each vowel via VoiceSauce and Praat: F0 (analyzed with gender-specific tracking ranges of 70–450 Hz for females and 50–300 Hz for males), spectral tilt corrected amplitude difference (H1–H2c), harmonics-to-noise ratio from 0–3500 Hz (HNR35), and cepstral peak prominence (CPP). Linear mixed-effects models were fitted using lme4 in R with by-token mean acoustic values as dependent variables. Fixed effects included Language (English vs. Mandarin), Gender (Female vs. Male), VowelHeight (Low vs. Non-low), and the Language × Gender interaction, with random intercepts for Talker and Word alongside targeted random slopes.

## Experimental setup

The evaluation dataset consists of 61 US English speakers (28F, 33M; age 20-40) and 66 Mainland Mandarin speakers (34F, 32M; age 28-40) reading 5 controlled sentences (10-15 syllables each, matching length and syntactic structure). Acoustic measures were evaluated via linear mixed-effects models with Bonferroni-corrected estimated marginal means for post-hoc pairwise comparisons.

## Results

Linear mixed-effects modeling revealed that male speakers produced significantly lower H1–H2c values (β = 2.09, SE = 0.38, p < .001) and lower HNR35 values (β = 2.77, SE = 0.37, p < .001) than female speakers across both languages, indicating a higher degree of vocal fold aperiodicity and glottal constriction. A significant Language × Gender interaction for HNR35 (β = -0.95, SE = 0.37, p = .012) demonstrated that the gender gap in creakiness was substantially larger in Mandarin (estimated female-male difference of 7.26, p < .001) than in English (3.61, p < .0001), driven primarily by exceptionally low HNR35 values among Mandarin male speakers. Fundamental frequency (F0) showed only a main effect of gender without cross-language variation, while cepstral peak prominence (CPP) showed no significant main effect of gender or language, demonstrating that CPP is largely insensitive to these glottal irregularities.

## Limitations

The study relies on read speech rather than spontaneous conversational speech, which may restrict the natural negotiation of sociolinguistic meaning. English recordings were gathered remotely across diverse US locations, introducing potential device variability compared to the sound-treated lab environment used for Mandarin speakers. Furthermore, tokens with untrackable F0—which are disproportionately creaky—were filtered out prior to analysis, likely underestimating the absolute prevalence of creak in the datasets.

## Why read this

Phoneticians and sociophonetic researchers should read this paper to understand how production patterns of creaky voice decouple from popular gendered social perceptions across typologically distinct languages. It offers a rigorous template for cross-linguistic acoustic analysis using mixed-effects modeling on parallel corpora.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Cross-linguistic sociophonetic analysis, voice quality profiling in text-to-speech synthesis, and gender-biased social perception modeling in spoken language processing.

## Institutions / 機構

Hong Kong Polytechnic University, City University of Hong Kong

## Related

- [The role of phonation type in Chinese Jin tones: a study using acoustic metrics](du26b_interspeech.md) — shared technique · relatedness 1.9/3
- [Automatic identification of the onset of creaky voice according to F0 instability](puggaardrode26_interspeech.md) — complementary · relatedness 1.9/3
- [Lost in Phonation: Voice Quality Variation as an Evaluation Dimension for Speech Foundation Models](lameris26_interspeech.md) — complementary · relatedness 1.9/3
- [Gender differences in the phonetic realization of the checked tone in Kaihui Xiang](zhang26h_interspeech.md) — shared technique · relatedness 1.9/3
- [Acoustic correlates of voice quality settings: variation within and between individual speakers](paver26_interspeech.md) — same problem · relatedness 1.9/3

<sub>All 950k paper pairs scored by TypeSafe Jev (`scripts/related/`); relatedness 0 = unrelated … 3 = directly comparable.</sub>
