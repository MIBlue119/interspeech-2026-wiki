---
id: powelldavies26_interspeech
category: phonetics
updated: 2026-09-28
confidence: full-paper
source: https://doi.org/10.21437/Interspeech.2026-1555
pdf: https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.pdf
---

# An investigation of post-stop breathiness in Australian English

[PDF](https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.pdf) · [ISCA page](https://www.isca-archive.org/interspeech_2026/powelldavies26_interspeech.html) · [DOI](https://doi.org/10.21437/Interspeech.2026-1555)

**TL;DR** — This study investigates post-stop breathiness during the release phase of voiceless onset stops in Australian English, revealing that over 40% of tokens exhibit complex phonation transitions influenced by sociolinguistic factors.

## Problem

Traditional descriptions of the stop voicing contrast in English varieties rely heavily on Voice Onset Time (VOT), overlooking finer release-phase complexities like phonatory shifts. Recent work has identified periods of breathiness following aspiration in English voiceless stops, similar to phenomena in languages like Bengali. Understanding how to segment and measure these post-aspiration breathy phases is crucial for capturing both within-speaker and between-speaker sociophonetic variation.

## Method

The authors analyze 1,638 wordlist tokens from the Talking About Tasmania corpus, spoken by 37 Tasmanian speakers and elicited across various phonetic environments. Using Praat and the Montreal Forced Aligner, the release phases are segmented into an initial aspiration tier and a secondary breathy voicing tier (defined as lasting at least two glottal cycles). Statistical evaluations are conducted via generalized linear mixed-effects models in R using lme4 and EMU-SDMS to examine the duration and occurrence frequency of these breathy segments relative to gender, age group, place of articulation, and syllable count.

## Results

Breathy phases occur in 42% of all analyzed tokens across the voiceless stops /p, t, k/. Female speakers exhibit breathy phases over 50% of the time, compared to less than 25% for male speakers, showing a statistically significant gender effect (p < 0.001). Place of articulation also significantly affects breathiness occurrence (p = 0.04), with velar stops showing lower rates. Aspiration-only mean durations are 73.8 ms for bilabial, 82.4 ms for alveolar, and 84.0 ms for velar stops, while combined VOT durations (including breathy intervals) reach 82.4 ms, 90.8 ms, and 90.6 ms respectively.

## Code

None released (as of this page's `updated` date). If you are an author with a repo, please claim this entry — see CONTRIBUTING.md.

## Applications

Phoneticians and sociolinguists studying English dialects, speech variation, and acoustic correlates of laryngeal phonation.

## Limitations

The dataset is restricted to wordlist data from a single regional Australian English corpus (Tasmania) with a specific vowel environment (/æ/).

## Related

- (link related pages by id as the wiki grows)
