---
id: li26ha_interspeech
category: phonetics-linguistics
institutions: ["Australian National University"]
updated: 2026-09-29
confidence: full-paper
digest: v2
source: https://doi.org/10.21437/Interspeech.2026-2832
pdf: https://www.isca-archive.org/interspeech_2026/li26ha_interspeech.pdf
---

# Phonetic evidence for contrastive voicing in Nakanamanga coronal plosives

*Shubo Li*

[PDF](https://www.isca-archive.org/interspeech_2026/li26ha_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/li26ha_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-2832)

**Category:** `phonetics-linguistics`

**TL;DR** — This study provides the first quantitative acoustic evidence confirming a phonemic voicing contrast between coronal plosives in the Tongoa variety of Nakanamanga, demonstrating that /t”/ is a short-lag voiceless dental plosive and /ⁿ d/ is a fully voiced prenasalised postalveolar stop.

## Key contributions

- Conducted the first rigorous acoustic phonetic analysis of coronal plosives in Nakanamanga based on 443 tokens from 8 native speakers.
- Established precise VOT distributions, proving a massive difference between voiceless dental /t”/ (mean = 29 ms) and prenasalised postalveolar /ⁿ d/ (mean = -98 ms).
- Quantified closure durations and internal partitioning, revealing a nasal-to-oral closure ratio of 1.88:1 (65% nasal, 35% oral) for /ⁿ d/.
- Fitted linear mixed-effects models showing that the phonemic contrast remains highly significant even when controlling for word-level and speaker-level random effects.

## Problem

For Nakanamanga, an understudied Oceanic language of Vanuatu with roughly 10,000 speakers, historical reconstructions and dialect descriptions have long debated whether there is one or two coronal plosive phonemes. Previous descriptive work and sketch grammars remained inconclusive, largely relying on sparse orthographic evidence where the voiced segment is rare. This ambiguity clouds the historical understanding of sound shifts, progressive devoicing, and language contact in central Vanuatu relative to neighbouring languages like Namakura and Lelepa.

## Method

The study analyzed a custom wordlist of 12 disyllabic CV.CV lexical items featuring word-medial target coronal plosives following short or long /ɔ/ vowels. Speech data were collected from 8 native speakers (5 women, 3 men) on Tongoa Island and in Port Vila using a Zoom H6 recorder and RØDE NT3 cardioid microphone at 96 kHz/24-bit, framed inside a standard carrier phrase. Recordings were manually segmented in Praat after downsampling to 44.1 kHz/16-bit, and an EMU Speech Database was built for statistical analysis using the emuR package in R.

Linear mixed-effects models (lmerTest) were fitted with Voice Onset Time (VOT) and closure duration as response variables, incorporating fixed effects for Phoneme (/t”/ vs /ⁿ d/), SyllableCount, and VowelLength, alongside random intercepts for Speaker and Word to control for lexical and inter-speaker variance. VOT was measured from the initial release burst to periodicity onset, while closure duration for /ⁿ d/ was split into nasal and oral intervals using acoustic intensity drop midpoints.

## Experimental setup

The dataset comprises 443 analysed tokens (186 tokens for /t”/ and 257 tokens for /ⁿ d/) produced across 5 repetitions by 8 native speakers. Evaluation metrics consist of Voice Onset Time (VOT), total closure duration, and nasal-versus-oral closure intervals evaluated through means, standard deviations, and linear mixed-effects model t-tests.

## Results

Voiceless /t”/ exhibited consistent positive short-lag VOT with a mean of 29 ms (SD = 14) and a mean closure duration of 80 ms (SD = 18). In contrast, prenasalised /ⁿ d/ reliably displayed substantial prevoicing with a negative mean VOT of -98 ms (SD = 24) and a longer mean closure duration of 98 ms (SD = 24). Linear mixed models confirmed that the phoneme effect on VOT was massive, with /t”/ showing 124.88 ms longer VOT than /ⁿ d/ (p < .001), and a significant closure duration increase of -15.25 ms for /t”/ relative to /ⁿ d/ (p < .001). For /ⁿ d/, the nasal closure averaged 64 ms and the oral closure averaged 34 ms, resulting in a nasal-to-oral ratio of 1.88:1.

Syllable count showed minor effects (quadrisyllabic words increased VOT by 30.60 ms and slightly shortened closures), while vowel length had a negligible effect on VOT but slightly shortened subsequent closures (-8.07 ms for long vowels). The primary limitation is the reliance on intensity-based acoustic segmentation rather than direct airflow measures.

| Phoneme | Mean VOT (ms) | Mean Closure (ms) | Nasal Closure (ms) | Oral Closure (ms) |
|---|---|---|---|---|
| /t”/ (dental) | 29 | 80 | - | - |
| /ⁿ d/ (postalveolar) | -98 | 98 | 64 | 34 |

## Limitations

The study is restricted to the Tongoa variety of Nakanamanga and relies on a limited set of 12 lexical items due to morphological constraints and sparse minimal pairs. The dataset is restricted to 8 speakers and word-medial positions. Furthermore, nasal and oral closure boundaries were determined via acoustic intensity cues rather than direct aerodynamic airflow recordings, which can cause minor discrepancies compared to physiological studies.

## Why read this

Phoneticians and historical linguists working on Oceanic languages or voicing typology should read this paper to see how mixed-effects modeling provides robust acoustic validation for debated phonemic inventories in underdocumented languages.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Field linguistics, historical language reconstruction, acoustic phonetic analysis, and multi-dialect documentation of endangered Oceanic languages.

## Institutions / 機構

Australian National University

## Related

- (link related pages by id as the wiki grows)
