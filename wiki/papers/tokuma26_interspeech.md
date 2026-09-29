---
id: tokuma26_interspeech
category: phonetics-linguistics
labels: [multilingual]
institutions: ["Chuo University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-211
pdf: https://www.isca-archive.org/interspeech_2026/tokuma26_interspeech.pdf
---

# Perception of English /iː/–/ɪ/ by Japanese Listeners under Silent-Centre and Devoiced Vowel Conditions

*Shinichi Tokuma*

[PDF](https://www.isca-archive.org/interspeech_2026/tokuma26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/tokuma26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-211)

**Category:** `phonetics-linguistics` · **Labels:** `multilingual`

**TL;DR** — This study investigates how Japanese listeners perceive the English /iː/–/ɪ/ vowel contrast under silent-centre (SC) and devoiced vowel (DEV) conditions, revealing that L1 phonological biases heavily outweigh acoustic cues like aspiration or high-frequency devoicing remnants.

## Key contributions

- Extends the silent-centre (SC) vowel paradigm to include natural Japanese devoicing phonetic environments (/CVC/ with voiceless stops/fricatives).
- Compares standard SC manipulations against devoiced vowel (DEV) stimuli containing residual high-frequency spectral components.
- Isolates the perceptual role of aspiration using Aspiration Edited (AE) versus Aspiration Not Edited (ANE) stimulus variants.
- Demonstrates that lower-proficiency L2 learners fail to exploit spectral information from aspiration or devoicing, relying instead on L1 duration and clipping biases.

## Problem

Prior silent-centre vowel perception studies primarily focused on L1 listeners or specific L2 groups like Spanish and Polish learners, leaving the interaction between L1 Japanese phonology and English vowel perception unexplored. Specifically, previous SC experimental designs used consonantal environments that do not trigger native Japanese vowel devoicing and overlooked the acoustic role of aspiration. Because Japanese phonology uses vowel length, consonant gemination, and environment-specific devoicing, it is unclear how these native rules interfere with or govern the perception of English high-vowel contrasts.

## Method

The experiment utilized American English /CVC/ target words ('teat'/'tit' for SC conditions, 'peace'/'piss' for DEV conditions) recorded by a native General American speaker inside frame sentences at 44.1 kHz via Praat. For SC stimuli, the central vowel nucleus was removed, and total vowel transition durations were set to 10, 20, 30, and 40 ms with a 2 ms linear ramp filter to eliminate clipping clicks. Aspiration was manipulated by either editing out the aspiration phase (AE) or preserving it while modifying the subsequent vocal portion (ANE). For DEV stimuli ('peace'/'piss'), the vowel core was replaced with an extension of the final 20 ms aspiration segment, creating a six-stimulus voiced duration continuum ranging from original down to 0 ms in 20 ms steps.

Data collection involved 14 Japanese university students (CEFR B1 level, average TOEIC score 665) completing a two-alternative forced-choice identification task (120 total trials per participant) using Praat MFC objects over covered-ear headphones. Responses were analyzed using a Generalized Estimating Equation (GEE) model for Repeated Measures Logistic Regression, checking for significant main effects of vowel type, aspiration manipulation, and transition duration.

## Experimental setup

Evaluated on 14 Japanese undergraduate students from Chuo University with 6-7 years of formal English education and zero time living abroad. Stimuli comprised American English words 'teat', 'tit', 'peace', and 'piss' manipulated into 18 SC token types and 12 DEV token types. Metrics included percent correct identification rates and Repeated Measures Logistic Regression Wald chi-square statistics.

## Results

Full, unedited tokens yielded near-universal /iː/ responses due to a general L2 bias (Effect 1). For SC 'tit' and 'teat' tokens, shortening transition durations systematically increased /ɪ/ identification preferences, with AE tokens consistently showing higher /ɪ/ selection than ANE counterparts due to effective voiced durations falling below a 40 ms perceptual threshold. DEV tokens exhibited complex non-linear trends where % correct for 'peace' was inversely proportional to vowel duration, whereas 'piss' flattened around a 60% identification ceiling. GEE models confirmed significant effects of vowel type (Wald χ² = 37.402, p < 0.001), aspiration type (Wald χ² = 19.675, p < 0.001), and transition duration (Wald χ² = 13.857, p < 0.001) for SC tokens, alongside significant vowel type and voiced duration effects for DEV tokens.

| System / Condition | /iː/–/ɪ/ Contrast Metric | Key Finding / Trend ||
|---|---|---|
| Full Original Tokens | Identification Rate | Overwhelmingly perceived as /iː/ (bias towards long vowel) |
| SC Aspiration Edited (AE) | Identification Rate | Strong shift toward /ɪ/ as voiced duration drops below ~40ms threshold |
| SC Aspiration Not Edited (ANE) | Identification Rate | Higher preference for /iː/ at 30-40ms compared to AE conditions |
| DEV 'peace'/'piss' | Identification Rate | Inverse proportion to vowel duration for 'peace'; flattened curve for 'piss' |

## Limitations

Tested exclusively on a small cohort of 14 low-intermediate Japanese L2 learners (CEFR B1), limiting generalizability across proficiency levels. The study is restricted to American English high vowels /iː/ and /ɪ/ within specific voiceless plosive/fricative environments. The artificial manipulation of silent-centre and devoiced segments may not fully capture continuous natural speech dynamics.

## Why read this

Phoneticians and speech engineers working on cross-language L2 acquisition or accented speech perception will learn why acoustic cues like aspiration and high-frequency spectral remnants fail to help intermediate learners who are bottlenecked by native phonological filters.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Improving computer-assisted pronunciation training (CAPT) systems and targeted listening curricula for Japanese learners of English.

## Institutions / 機構

Chuo University

**Funding / 經費:** Chuo University Personal Research Grant

## Related

- (link related pages by id as the wiki grows)
